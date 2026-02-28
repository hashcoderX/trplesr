// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred');
      }

      return {
        data,
        message: data.message,
        status: response.status,
      };
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Tours API
  async getTours(filters?: {
    region?: string;
    duration?: string;
    priceRange?: string;
  }) {
    const params = new URLSearchParams();
    if (filters?.region) params.append('region', filters.region);
    if (filters?.duration) params.append('duration', filters.duration);
    if (filters?.priceRange) params.append('price_range', filters.priceRange);
    
    const queryString = params.toString();
    const endpoint = `/tours${queryString ? `?${queryString}` : ''}`;
    
    return this.request(endpoint);
  }

  async getTourById(id: string) {
    return this.request(`/tours/${id}`);
  }

  // Booking API
  async createBooking(bookingData: {
    tour_id: string;
    name: string;
    email: string;
    phone: string;
    travel_date: string;
    guests: number;
    message?: string;
  }) {
    return this.request('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  }

  // Contact API
  async sendContactMessage(contactData: {
    name: string;
    email: string;
    phone?: string;
    message: string;
  }) {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  }

  // Testimonials API
  async getTestimonials() {
    return this.request('/testimonials');
  }

  // Newsletter subscription
  async subscribeNewsletter(email: string) {
    return this.request('/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }
}

export const apiService = new ApiService();
export default apiService;
