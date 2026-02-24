'use client';

import React, { useState } from 'react';
import Container from '@/components/Container';
import Button from '@/components/Button';
import { API_BASE } from '@/lib/config';

interface Itinerary {
  id: number;
  title: string;
  description: string;
  day_count: number;
  night_count: number;
  images: string[];
  day_plans: {
    day: number;
    activities: string;
    images: string[];
  }[];
  destinations: {
    id: number;
    name: string;
    city: string;
    country: string;
  }[];
  hotels: {
    id: number;
    name: string;
    location: string;
  }[];
}

interface TourDetailsClientProps {
  itinerary: Itinerary;
}

export default function TourDetailsClient({ itinerary }: TourDetailsClientProps) {
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    travelDate: '',
    guests: 1,
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE}/custom-quotes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...bookingForm,
          itinerary_id: itinerary.id,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit quote request');
      }

      const data = await response.json();
      alert('Thank you for your booking request! We will contact you shortly.');
      // Reset form
      setBookingForm({
        name: '',
        email: '',
        phone: '',
        travelDate: '',
        guests: 1,
        message: '',
      });
    } catch (error) {
      console.error('Error submitting quote:', error);
      alert('There was an error submitting your request. Please try again.');
    }
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Hi, I'm interested in the ${itinerary.title} itinerary. Please provide me with a custom quote.`);
    window.open(`https://wa.me/940777897147?text=${message}`, '_blank');
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === itinerary.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? itinerary.images.length - 1 : prev - 1
    );
  };

  return (
    <main className="pt-24 pb-20">
      {/* Hero Section with Image Carousel */}
      <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
        {itinerary.images && itinerary.images.length > 0 ? (
          <>
            <div className="absolute inset-0">
              <img
                src={itinerary.images[currentImageIndex]}
                alt={itinerary.title}
                className="w-full h-full object-cover transition-all duration-700 ease-in-out"
              />
            </div>
            {itinerary.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {itinerary.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B6E65] to-[#095850]"></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <Container className="absolute bottom-0 left-0 right-0 pb-8">
          <div className="text-white">
            <div className="flex flex-wrap gap-4 mb-4">
              <span className="bg-[#0B6E65] px-4 py-2 rounded-full text-sm font-semibold">
                {itinerary.destinations.length > 0
                  ? `${itinerary.destinations[0].city}, ${itinerary.destinations[0].country}`
                  : 'Sri Lanka'
                }
              </span>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                <span className="font-semibold">4.8</span>
                <span className="text-gray-300">(24 reviews)</span>
              </div>
            </div>
            <h1 className="font-['Poppins'] text-5xl sm:text-6xl font-bold mb-6 leading-tight">
              {itinerary.title}
            </h1>
            <div className="flex flex-wrap gap-8 text-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold">{itinerary.day_count} Days</div>
                  <div className="text-sm text-gray-300">{itinerary.night_count} Nights</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold">{itinerary.destinations.length} Destinations</div>
                  <div className="text-sm text-gray-300">Curated Experience</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Description */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#0B6E65] rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="font-['Poppins'] text-3xl font-bold text-gray-900">
                  Itinerary Overview
                </h2>
              </div>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {itinerary.description}
                </p>
              </div>
            </section>

            {/* Day by Day Itinerary */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-[#0B6E65] rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h2 className="font-['Poppins'] text-3xl font-bold text-gray-900">
                  Day by Day Activities
                </h2>
              </div>

              <div className="space-y-6">
                {itinerary.day_plans
                  .sort((a, b) => a.day - b.day)
                  .map((day) => (
                    <div key={day.day} className="group">
                      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                        <button
                          onClick={() => setExpandedDay(expandedDay === day.day ? null : day.day)}
                          className="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center gap-6">
                            <div className="relative">
                              <div className="w-16 h-16 bg-gradient-to-br from-[#0B6E65] to-[#095850] rounded-2xl flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-xl">{day.day}</span>
                              </div>
                              <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#F6B846] rounded-full flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            </div>
                            <div className="text-left">
                              <h3 className="font-['Poppins'] font-semibold text-xl text-gray-900 mb-1">
                                Day {day.day}
                              </h3>
                              <p className="text-gray-600 text-sm">
                                {day.activities.split('\n').length} activities planned
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            {day.images && day.images.length > 0 && (
                              <div className="flex -space-x-2">
                                {day.images.slice(0, 3).map((image, idx) => (
                                  <div key={idx} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                                    <img src={image} alt={`Day ${day.day} activity ${idx + 1}`} className="w-full h-full object-cover" />
                                  </div>
                                ))}
                                {day.images.length > 3 && (
                                  <div className="w-8 h-8 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center">
                                    <span className="text-xs text-gray-600">+{day.images.length - 3}</span>
                                  </div>
                                )}
                              </div>
                            )}
                            <svg
                              className={`w-6 h-6 text-gray-500 transition-transform duration-300 ${
                                expandedDay === day.day ? 'rotate-180' : ''
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </button>

                        {expandedDay === day.day && (
                          <div className="px-8 pb-6 border-t border-gray-100 bg-gradient-to-br from-gray-50 to-white">
                            <div className="pt-6">
                              <div className="prose prose-gray max-w-none mb-6">
                                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                                  {day.activities}
                                </div>
                              </div>

                              {day.images && day.images.length > 0 && (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                  {day.images.map((image, idx) => (
                                    <div key={idx} className="relative group/image">
                                      <div className="aspect-square rounded-xl overflow-hidden shadow-md">
                                        <img
                                          src={image}
                                          alt={`Day ${day.day} activity ${idx + 1}`}
                                          className="w-full h-full object-cover group-hover/image:scale-110 transition-transform duration-300"
                                        />
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </section>

            {/* Destinations */}
            {itinerary.destinations && itinerary.destinations.length > 0 && (
              <section className="mb-16">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-[#0B6E65] rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h2 className="font-['Poppins'] text-3xl font-bold text-gray-900">
                    Destinations You'll Visit
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {itinerary.destinations.map((destination) => (
                    <div key={destination.id} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-[#0B6E65] rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900 mb-1">
                            {destination.name}
                          </h3>
                          <p className="text-gray-600">
                            {destination.city}, {destination.country}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Hotels */}
            {itinerary.hotels && itinerary.hotels.length > 0 && (
              <section className="mb-16">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-[#0B6E65] rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h2 className="font-['Poppins'] text-3xl font-bold text-gray-900">
                    Accommodations
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {itinerary.hotels.map((hotel) => (
                    <div key={hotel.id} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-[#F6B846] rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900 mb-1">
                            {hotel.name}
                          </h3>
                          <p className="text-gray-600">
                            {hotel.location}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl p-8 border border-gray-200">
                <div className="text-center mb-8 pb-6 border-b border-gray-200">
                  <div className="text-5xl font-bold text-[#0B6E65] mb-2">
                    Contact Us
                  </div>
                  <p className="text-gray-600 text-lg">for pricing & availability</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B6E65] focus:border-transparent transition-all duration-200 bg-white shadow-sm"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={bookingForm.email}
                      onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B6E65] focus:border-transparent transition-all duration-200 bg-white shadow-sm"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B6E65] focus:border-transparent transition-all duration-200 bg-white shadow-sm"
                      placeholder="+94 XX XXX XXXX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Preferred Travel Date
                    </label>
                    <input
                      type="date"
                      value={bookingForm.travelDate}
                      onChange={(e) => setBookingForm({...bookingForm, travelDate: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B6E65] focus:border-transparent transition-all duration-200 bg-white shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Number of Travelers
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={bookingForm.guests}
                      onChange={(e) => setBookingForm({...bookingForm, guests: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B6E65] focus:border-transparent transition-all duration-200 bg-white shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Special Requests
                    </label>
                    <textarea
                      rows={4}
                      value={bookingForm.message}
                      onChange={(e) => setBookingForm({...bookingForm, message: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B6E65] focus:border-transparent transition-all duration-200 bg-white shadow-sm resize-none"
                      placeholder="Any special requirements or questions..."
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Request Custom Quote
                    </div>
                  </Button>
                </form>

                <div className="mt-6">
                  <button
                    onClick={handleWhatsApp}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-3 shadow-lg"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <span>Quick WhatsApp Inquiry</span>
                  </button>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500">
                    ✓ Free consultation<br/>
                    ✓ Custom itinerary planning<br/>
                    ✓ Best price guarantee
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}