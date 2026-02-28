'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Container from './Container';
import TourCard from './TourCard';
import Button from './Button';
import { API_BASE } from '@/lib/config';
import { Tour } from '@/types';

export default function PopularTours() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const url = `${API_BASE}/itineraries`;
      // Log the URL we are fetching for easier diagnostics in production
      if (typeof window !== 'undefined') {
        console.debug('[PopularTours] Fetching:', url);
      }
      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-store',
        headers: {
          Accept: 'application/json',
        },
      });
      if (response.ok) {
        const itineraries = await response.json();
        
        // Transform itineraries to Tour format
        const transformedTours: Tour[] = itineraries.slice(0, 3).map((itinerary: any) => ({
          id: itinerary.id.toString(),
          title: itinerary.title,
          description: itinerary.description || '',
          shortDescription: itinerary.description ? itinerary.description.substring(0, 150) + '...' : '',
          price: 0, // Default price since not stored in backend
          duration: `${itinerary.day_count} Days / ${itinerary.night_count} Nights`,
          image: itinerary.images && itinerary.images.length > 0 ? itinerary.images[0] : '/images/default-tour.jpg',
          images: itinerary.images || [],
          region: itinerary.destinations && itinerary.destinations.length > 0 
            ? itinerary.destinations[0].city + ', ' + itinerary.destinations[0].country 
            : 'Sri Lanka',
          rating: 4.5, // Default rating
          reviewCount: 0, // Default review count
        }));
        
        setTours(transformedTours);
      }
    } catch (error) {
      // Provide clearer diagnostics in console and keep UI graceful
      const message = (error as any)?.message || (error as any)?.toString?.() || 'Unknown error';
      console.error('Error fetching itineraries from API:', message, {
        apiBase: API_BASE,
        endpoint: `${API_BASE}/itineraries`,
        fullError: error,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-[#F6F4F2]">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-['Poppins'] text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Popular Itineraries
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Loading amazing experiences...
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-64 bg-gray-300"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-6 bg-gray-300 rounded mb-4"></div>
                  <div className="h-20 bg-gray-300 rounded mb-4"></div>
                  <div className="h-12 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    );
  }
  
  return (
    <section className="py-20 bg-[#F6F4F2]">
      <Container>
        <div className="text-center mb-12">
          <h2 className="font-['Poppins'] text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Popular Itineraries
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Handpicked experiences showcasing the best of Sri Lanka's culture, nature, and adventure
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
        
        <div className="text-center">
          <Link href="/tours">
            <Button size="lg">
              View All Itineraries
            </Button>
          </Link>
        </div>
        {/* If network failed, show a subtle message */}
        <div className="text-center">
          <p className="text-gray-500 text-sm">If itineraries dont load, please check your network and try again.</p>
        </div>
      </Container>
    </section>
  );
}
