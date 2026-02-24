export interface Tour {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  price: number;
  duration: string;
  image: string;
  images?: string[];
  region: string;
  highlights?: string[];
  itinerary?: ItineraryDay[];
  included?: string[];
  excluded?: string[];
  rating?: number;
  reviewCount?: number;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities?: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  country: string;
  rating: number;
  comment: string;
  image?: string;
  date: string;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  image: string;
  bio?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
  phone?: string;
}

export interface BookingForm {
  name: string;
  email: string;
  phone: string;
  travelDate: string;
  guests: number;
  tourId: string;
  message?: string;
}
