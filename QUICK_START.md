# 🚀 Quick Start Guide - Triple SR Travelers

## Development Environment - Currently Running!

### ✅ What's Running:
- **Frontend**: http://localhost:3000 (Next.js is LIVE!)
- **Backend**: http://localhost:8000/api (Laravel - ready to start)

---

## 🌐 View the Website NOW

Open your browser and go to:
```
http://localhost:3000
```

### Pages to Explore:
1. **Homepage**: http://localhost:3000/
2. **All Tours**: http://localhost:3000/tours
3. **Tour Details**: http://localhost:3000/tours/1
4. **About Us**: http://localhost:3000/about
5. **Contact**: http://localhost:3000/contact

---

## 🛠️ Development Commands

### Frontend (Next.js)
```powershell
# Navigate to frontend
cd c:\xampp\htdocs\TSR\frontend

# Start dev server (if not already running)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Backend (Laravel)
```powershell
# Navigate to backend
cd c:\xampp\htdocs\TSR\backend

# Start Laravel server
php artisan serve

# Run migrations
php artisan migrate

# Create a new controller
php artisan make:controller TourController

# Create a new model
php artisan make:model Tour -m
```

---

## 🔌 Connecting Frontend to Backend

### Step 1: Start Backend Server
```powershell
cd c:\xampp\htdocs\TSR\backend
php artisan serve
```
Backend will be available at: http://localhost:8000

### Step 2: Configure Frontend
Create `.env.local` file in `frontend` folder:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### Step 3: Create Laravel API Routes
Edit `backend/routes/api.php`:
```php
use App\Http\Controllers\TourController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\ContactController;

Route::get('/tours', [TourController::class, 'index']);
Route::get('/tours/{id}', [TourController::class, 'show']);
Route::post('/bookings', [BookingController::class, 'store']);
Route::post('/contact', [ContactController::class, 'store']);
```

### Step 4: Update Frontend to Use API
In your React components, replace mock data:
```typescript
// Before (using mock data):
import { mockTours } from '@/lib/mockData';

// After (using real API):
import apiService from '@/lib/api';
const { data: tours } = await apiService.getTours();
```

---

## 📂 Project Structure

```
TSR/
├── frontend/              # Next.js Application
│   ├── src/
│   │   ├── app/          # Pages (page.tsx files)
│   │   ├── components/   # React Components
│   │   ├── lib/          # Utilities & API
│   │   └── types/        # TypeScript Types
│   ├── public/           # Static files
│   └── package.json
│
├── backend/              # Laravel Application  
│   ├── app/
│   │   ├── Http/
│   │   │   └── Controllers/
│   │   └── Models/
│   ├── database/
│   │   └── migrations/
│   ├── routes/
│   │   └── api.php       # API Routes
│   └── composer.json
│
└── PROJECT_SUMMARY.md    # Complete project documentation
```

---

## 🎨 Design Customization

### Colors (in Tailwind)
- Primary: `bg-[#0B6E65]` or `text-[#0B6E65]`
- Secondary: `bg-[#EAD8C4]` or `text-[#EAD8C4]`
- Accent: `bg-[#F6F4F2]` or `text-[#F6F4F2]`

### Fonts
- Headings: `font-['Poppins']`
- Body: Default (Inter is set globally)

### Common Components
- Button: `<Button variant="primary|secondary|outline" size="sm|md|lg">`
- Container: `<Container>` for consistent page width
- Tour Card: `<TourCard tour={tourData} />`

---

## 🐛 Troubleshooting

### Frontend won't start?
```powershell
# Kill any running Node processes
Stop-Process -Name node -Force

# Clear Next.js cache
cd c:\xampp\htdocs\TSR\frontend
Remove-Item -Recurse -Force .next

# Restart
npm run dev
```

### Backend won't start?
```powershell
# Check if port 8000 is in use
netstat -ano | findstr :8000

# Try different port
php artisan serve --port=8001
```

### CSS not loading?
```powershell
# Clear browser cache or try incognito mode
# Restart dev server
```

---

## 📱 Testing Checklist

### Desktop Testing
- [ ] Homepage loads correctly
- [ ] Navigation menu works
- [ ] Tour cards display properly
- [ ] Filters work on tours page
- [ ] Tour details page shows full information
- [ ] Booking form accepts input
- [ ] Contact form works
- [ ] Footer links are correct

### Mobile Testing (resize browser)
- [ ] Hamburger menu appears
- [ ] Mobile menu opens/closes
- [ ] Cards stack vertically
- [ ] Forms are usable
- [ ] Images scale properly
- [ ] Text is readable

### Functionality Testing
- [ ] Tour filtering updates results
- [ ] Itinerary accordion expands/collapses
- [ ] WhatsApp buttons open correctly
- [ ] Forms validate input
- [ ] Testimonial carousel navigates
- [ ] All links work

---

## 🚀 Deployment Checklist

### Before Deploying Frontend
- [ ] Update environment variables for production
- [ ] Build production bundle (`npm run build`)
- [ ] Test production build locally (`npm start`)
- [ ] Optimize images
- [ ] Update contact information
- [ ] Test all forms

### Before Deploying Backend
- [ ] Configure production database
- [ ] Update `.env` file
- [ ] Run migrations on production
- [ ] Configure CORS settings
- [ ] Set up SSL certificate
- [ ] Test all API endpoints

---

## 📞 Need Help?

### File Locations
- **API Service**: `frontend/src/lib/api.ts`
- **Mock Data**: `frontend/src/lib/mockData.ts`
- **Type Definitions**: `frontend/src/types/index.ts`
- **Components**: `frontend/src/components/`
- **Pages**: `frontend/src/app/`

### Common Tasks
1. **Add a new page**: Create `page.tsx` in `src/app/[pagename]/`
2. **Add a component**: Create `ComponentName.tsx` in `src/components/`
3. **Update colors**: Modify Tailwind classes in components
4. **Change content**: Update mock data in `src/lib/mockData.ts`

---

## ✨ You're All Set!

The website is **fully functional** and ready to use. Open http://localhost:3000 to see it in action!

**Current Status**: 
- ✅ Frontend: LIVE at http://localhost:3000
- ⏳ Backend: Ready to start at http://localhost:8000

**Next Step**: 
Start building the Laravel API endpoints to replace mock data with real database-driven content!
