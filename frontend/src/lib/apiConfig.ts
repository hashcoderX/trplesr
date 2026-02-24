// Environment variables configuration
// Create a .env.local file in the root of your frontend project with:
// NEXT_PUBLIC_API_URL=http://localhost:8000/api

/**
 * API Integration Guide for Triple SR Travelers
 * 
 * This file provides instructions for connecting the Next.js frontend
 * to the Laravel backend API.
 * 
 * SETUP STEPS:
 * 
 * 1. Backend Setup (Laravel):
 *    - Navigate to the backend folder: cd c:\xampp\htdocs\TSR\backend
 *    - Start the Laravel development server: php artisan serve
 *    - The API will be available at: http://localhost:8000
 * 
 * 2. Frontend Setup (Next.js):
 *    - Create a .env.local file in the frontend root directory
 *    - Add: NEXT_PUBLIC_API_URL=http://localhost:8000/api
 *    - Start the Next.js dev server: npm run dev
 *    - The frontend will be available at: http://localhost:3000
 * 
 * 3. Laravel API Routes to Implement:
 *    Create these routes in routes/api.php:
 * 
 *    // Tours
 *    Route::get('/tours', [TourController::class, 'index']);
 *    Route::get('/tours/{id}', [TourController::class, 'show']);
 * 
 *    // Bookings
 *    Route::post('/bookings', [BookingController::class, 'store']);
 * 
 *    // Contact
 *    Route::post('/contact', [ContactController::class, 'store']);
 * 
 *    // Testimonials
 *    Route::get('/testimonials', [TestimonialController::class, 'index']);
 * 
 *    // Newsletter
 *    Route::post('/newsletter/subscribe', [NewsletterController::class, 'subscribe']);
 * 
 * 4. CORS Configuration:
 *    In Laravel backend, update config/cors.php:
 *    'allowed_origins' => ['http://localhost:3000'],
 * 
 * 5. Database Setup:
 *    - Create migrations for: tours, bookings, contacts, testimonials
 *    - Run: php artisan migrate
 *    - Seed sample data: php artisan db:seed
 * 
 * 6. Using the API in Components:
 *    
 *    Example - Fetching tours:
 *    ```typescript
 *    import apiService from '@/lib/api';
 *    
 *    const tours = await apiService.getTours();
 *    ```
 * 
 *    Example - Creating a booking:
 *    ```typescript
 *    const response = await apiService.createBooking({
 *      tour_id: '1',
 *      name: 'John Doe',
 *      email: 'john@example.com',
 *      phone: '+1234567890',
 *      travel_date: '2024-12-01',
 *      guests: 2,
 *      message: 'Looking forward to the trip!'
 *    });
 *    ```
 * 
 * 7. Replace Mock Data:
 *    - Update components to use apiService instead of mockData
 *    - Handle loading states and errors
 *    - Add proper error boundaries
 * 
 * NEXT STEPS:
 * 1. Create Laravel controllers and models
 * 2. Set up database migrations
 * 3. Implement API endpoints
 * 4. Test API with Postman or similar tool
 * 5. Update frontend components to use real API
 * 6. Add authentication if needed
 * 7. Deploy to production servers
 */

export const API_ENDPOINTS = {
  TOURS: '/tours',
  TOUR_DETAILS: (id: string) => `/tours/${id}`,
  BOOKINGS: '/bookings',
  CONTACT: '/contact',
  TESTIMONIALS: '/testimonials',
  NEWSLETTER: '/newsletter/subscribe',
};

export const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000';
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
