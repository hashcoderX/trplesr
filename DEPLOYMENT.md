# Deployment Guide (cPanel / Apache)

This guide covers deploying the Laravel backend and the Next.js frontend to your cPanel host (Apache 2.4 on Linux).

## Overview
- Backend (Laravel) runs under a document root pointing to `backend/public`
- Frontend (Next.js) is exported to static files and served under your main domain (e.g., `public_html`)
- Frontend talks to Backend via `NEXT_PUBLIC_API_BASE_URL`

---

## Backend (Laravel)

### 1) Upload Files
- Upload the `backend/` folder to your home directory, e.g. `/home/<cpanel-user>/backend`
- Ensure `backend/public/.htaccess` exists (provided in repo)

### 2) Point a Subdomain to Laravel `public`
- In cPanel → Domains, create a subdomain, e.g. `api.example.com`
- Set its document root to `/home/<cpanel-user>/backend/public`

### 3) Environment Setup
- Create `.env` in `backend/` based on `backend/.env.example.production`
- Set values:
  - `APP_URL=https://api.example.com`
  - Database: `DB_HOST`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`
  - `SANCTUM_STATEFUL_DOMAINS=example.com,www.example.com`
  - `SESSION_DOMAIN=.example.com`

### 4) Dependencies & Permissions
- In cPanel Terminal (or SSH):
```
cd ~/backend
composer install --no-dev --optimize-autoloader
php artisan key:generate
php artisan storage:link
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
```
- Ensure `storage/` and `bootstrap/cache/` are writable: `chmod -R 755 storage bootstrap/cache`

### 5) PHP Version
- Use PHP 8.2+ if available in cPanel (MultiPHP Manager)

---

## Frontend (Next.js)

### 1) Configure Environment
- Create `.env.production` based on `frontend/.env.example.production`
- Set values:
  - `NEXT_PUBLIC_API_BASE_URL=https://api.example.com`
  - `NEXT_PUBLIC_SITE_URL=https://www.example.com`
  - `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX` (optional)

### 2) Build (Static Export)
- On your local machine:
```
cd frontend
npm install
npm run build
```
- With Next.js 16 and `output: "export"`, `npm run build` creates `frontend/out/` with static files. `next export` is deprecated and no longer used.

### 3) Upload Static Files
- Upload the contents of `frontend/out/` to your cPanel `public_html` (or the domain’s document root)
- Ensure that `robots.txt` and `sitemap.xml` routes are present (Next.js app router generates them)

---

## Post-Deployment Checklist
- Backend API: visit `https://api.example.com/api/up` (or any health endpoint) to confirm
- Frontend: visit `https://www.example.com/`
- Confirm CORS works for chat and other API calls
- GA4: check Realtime in Google Analytics after browsing the site
- Search Console: submit sitemap at `https://www.example.com/sitemap.xml`

---

## Notes
- If composer is unavailable on your host, install dependencies locally and upload the `vendor/` folder
- For long-running jobs, use cron: `* * * * * php /home/<user>/backend/artisan schedule:run >> /dev/null 2>&1`
- Adjust `backend/config/cors.php` to include your live origins if needed

## Support
If you want, I can tailor these steps for your exact domain and set up GA4 and Search Console together once DNS points to the server.

---

# VPS Deployment (Ubuntu + Nginx)

This section covers deploying to a typical VPS (Ubuntu 22.04+), using Nginx as a reverse proxy, PHP-FPM for Laravel, and a systemd service for the Next.js frontend.

## Prerequisites
- Ubuntu 22.04+ with sudo access
- DNS pointed to your VPS (A record):
  - `triplesrtravelers.com` and `www.triplesrtravelers.com` → frontend
  - `api.triplesrtravelers.com` → backend
- Open ports: 80 (HTTP), 443 (HTTPS)

## Install Stack
```bash
sudo apt update
sudo apt install -y nginx certbot python3-certbot-nginx \
  php8.2-fpm php8.2-cli php8.2-mysql php8.2-xml php8.2-curl php8.2-mbstring php8.2-zip \
  mysql-client git

# Node.js via nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh"
nvm install 18
nvm use 18

# Composer
cd ~
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
```

## Clone Repos
```bash
sudo mkdir -p /var/www && sudo chown -R $USER:$USER /var/www
cd /var/www
git clone https://github.com/hashcoderX/triplesrapi.git triplesrapi
git clone https://github.com/hashcoderX/triplesrfrontend.git triplesrfrontend
```

## Backend (Laravel API)
```bash
cd /var/www/triplesrapi
cp .env.example.production .env

# Edit .env
sed -i "s|APP_ENV=production|APP_ENV=production|" .env
sed -i "s|APP_DEBUG=false|APP_DEBUG=false|" .env
sed -i "s|APP_URL=.*|APP_URL=https://api.triplesrtravelers.com|" .env
# Set DB_* credentials according to your MySQL
# Set SANCTUM_STATEFUL_DOMAINS and SESSION_DOMAIN if needed
# Add reCAPTCHA secret:
echo "RECAPTCHA_SECRET=6LeiukIsAAAAAFlFmjpf22xADXclI7_WhZV4e8la" | tee -a .env

composer install --no-dev --optimize-autoloader
php artisan key:generate
php artisan migrate --force
php artisan storage:link
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### Nginx for Backend
Use the sample config in `backend/deploy/nginx.backend.conf.sample`. Copy to `/etc/nginx/sites-available/triplesrapi` and enable:
```bash
sudo cp /var/www/triplesrapi/deploy/nginx.backend.conf.sample /etc/nginx/sites-available/triplesrapi
sudo ln -s /etc/nginx/sites-available/triplesrapi /etc/nginx/sites-enabled/triplesrapi
sudo nginx -t && sudo systemctl reload nginx
```

### SSL for Backend
```bash
sudo certbot --nginx -d api.triplesrtravelers.com --redirect --agree-tos -m you@example.com
```

## Frontend (Next.js)
```bash
cd /var/www/triplesrfrontend
cp .env.local .env.local.bak 2>/dev/null || true
cat > .env.local << 'EOF'
NEXT_PUBLIC_API_BASE_URL=https://api.triplesrtravelers.com
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LeiukIsAAAAABedBtK63DHQlFxE9X7pIUYEjLy9
EOF

npm ci
npm run build
```

### Run Frontend via systemd
Use the sample unit in `frontend/deploy/triplesr-frontend.service`:
```bash
sudo cp /var/www/triplesrfrontend/deploy/triplesr-frontend.service /etc/systemd/system/triplesr-frontend.service
sudo systemctl daemon-reload
sudo systemctl enable --now triplesr-frontend
sudo systemctl status triplesr-frontend --no-pager
```

### Nginx for Frontend
Use the sample config in `frontend/deploy/nginx.frontend.conf.sample`. Copy to `/etc/nginx/sites-available/triplesrfrontend` and enable:
```bash
sudo cp /var/www/triplesrfrontend/deploy/nginx.frontend.conf.sample /etc/nginx/sites-available/triplesrfrontend
sudo ln -s /etc/nginx/sites-available/triplesrfrontend /etc/nginx/sites-enabled/triplesrfrontend
sudo nginx -t && sudo systemctl reload nginx
```

### SSL for Frontend
```bash
sudo certbot --nginx -d triplesrtravelers.com -d www.triplesrtravelers.com --redirect --agree-tos -m you@example.com
```

## Optional: Laravel Queue Worker
If you use queues/scheduled jobs, create a systemd unit using `php artisan queue:work` and a cron entry for scheduler:
```bash
echo "* * * * * cd /var/www/triplesrapi && php artisan schedule:run >> /dev/null 2>&1" | sudo tee /etc/cron.d/triplesrapi
```

## Verify
- Frontend: visit `https://triplesrtravelers.com`
- Backend: visit `https://api.triplesrtravelers.com` and an API route (e.g., `/api/services/hotels`)
- Ensure images load from `/storage` and CORS allows frontend → backend calls

## Troubleshooting
- Check logs: `sudo journalctl -u triplesr-frontend -n 200 --no-pager`, `/var/log/nginx/*.log`
- Ensure `APP_URL` and `NEXT_PUBLIC_API_BASE_URL` use HTTPS
- If reCAPTCHA fails, verify site key/secret and domain registration in Google Admin Console
