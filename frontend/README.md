# Triple SR Travelers - Tourism Website

A modern, responsive tourism website for **Triple SR Travelers**, an inbound tourism company in Sri Lanka. Built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4 on the frontend, with Laravel backend API.

## 🌟 Features

### Frontend Features
- **Modern Design**: Clean, minimal travel-focused design with premium feel
- **Fully Responsive**: Optimized for mobile, tablet, and desktop devices
- **Fast Performance**: Built with Next.js 16 for optimal loading speeds
- **SEO Optimized**: Semantic HTML and proper meta tags for search engines

### Pages Included
1. **Homepage** - Hero, popular tours, why choose us, testimonials
2. **Tours Page** - Grid layout with advanced filtering
3. **Tour Details** - Detailed info, itinerary, booking form, WhatsApp integration
4. **About Page** - Mission, vision, team, company story
5. **Contact Page** - Contact form, map, FAQ section

## 🎨 Design System

### Color Palette
- **Primary (Deep Teal)**: `#0B6E65`
- **Secondary (Warm Sand)**: `#EAD8C4`
- **Accent (Soft Ivory)**: `#F6F4F2`

### Typography
- **Headings**: Poppins (300, 400, 500, 600, 700)
- **Body Text**: Inter (300, 400, 500, 600)

## 🚀 Getting Started

### Frontend Setup

1. **Install dependencies** (if not done)
   ```bash
   npm install
   ```

2. **Create environment file**
   ```bash
   cp .env.local.example .env.local
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Backend Setup (Laravel)

1. **Start Laravel server**
   ```bash
   cd ../backend
   php artisan serve
   ```

2. **API will be available at**
   ```
   http://localhost:8000
   ```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js pages
│   │   ├── page.tsx           # Homepage
│   │   ├── tours/             # Tours listing & details
│   │   ├── about/             # About page
│   │   ├── contact/           # Contact page
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Reusable components
│   │   ├── Button.tsx
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── ...
│   ├── lib/                   # Utilities and services
│   │   ├── api.ts            # API service
│   │   └── mockData.ts       # Mock data
│   └── types/                 # TypeScript types
│       └── index.ts
└── public/                    # Static assets
```

## 🔌 API Integration

Currently using **mock data**. To connect to Laravel backend:

1. **Update `.env.local`**:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   ```

2. **Use API service**:
   ```typescript
   import apiService from '@/lib/api';
   const tours = await apiService.getTours();
   ```

3. **Laravel endpoints needed**:
   - `GET /api/tours` - List tours
   - `GET /api/tours/{id}` - Tour details
   - `POST /api/bookings` - Create booking
   - `POST /api/contact` - Contact form
   - `GET /api/testimonials` - Testimonials

See `src/lib/apiConfig.ts` for full API documentation.

## 🛠️ Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 📱 Key Features

- **Responsive Navigation** - Sticky navbar with mobile menu
- **Tour Filtering** - Filter by region, duration, price
- **Interactive Itinerary** - Expandable day-by-day details
- **Booking Forms** - Simple, validated booking system
- **WhatsApp Integration** - Quick contact throughout site
- **Google Maps** - Embedded location map

## 🌐 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Set environment variables
4. Deploy

### Manual
1. Build: `npm run build`
2. Start: `npm run start`
3. Deploy to your server

## 📞 Contact

- Email: info@triplesrtravelers.com
- Phone: +94 11 234 5678
- WhatsApp: +94 11 234 5678

## 📄 License

© 2024 Triple SR Travelers. All rights reserved.
