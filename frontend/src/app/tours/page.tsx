'use client';

import React, { useState, useEffect } from 'react';
import Container from '@/components/Container';
import TourCard from '@/components/TourCard';
import { API_BASE } from '@/lib/config';
import { Tour } from '@/types';

export default function ToursPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedDuration, setSelectedDuration] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  
  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const response = await fetch(`${API_BASE}/itineraries`);
      if (response.ok) {
        const itineraries = await response.json();
        
        // Transform itineraries to Tour format
        const transformedTours: Tour[] = itineraries.map((itinerary: any) => ({
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
      console.error('Error fetching tours:', error);
    } finally {
      setLoading(false);
    }
  };

  const regions = ['all', ...Array.from(new Set(tours.map(tour => tour.region)))];
  
  const filteredTours = tours.filter(tour => {
    if (selectedRegion !== 'all' && tour.region !== selectedRegion) return false;
    
    if (selectedDuration !== 'all') {
      const days = parseInt(tour.duration.split(' ')[0]);
      if (selectedDuration === 'short' && days > 5) return false;
      if (selectedDuration === 'medium' && (days < 6 || days > 9)) return false;
      if (selectedDuration === 'long' && days < 10) return false;
    }
    
    // Since we don't have price data from backend, skip price filtering for now
    // if (priceRange !== 'all') {
    //   if (priceRange === 'budget' && tour.price > 700) return false;
    //   if (priceRange === 'mid' && (tour.price < 700 || tour.price > 1200)) return false;
    //   if (priceRange === 'luxury' && tour.price < 1200) return false;
    // }
    
    return true;
  });
  
  return (
    <main className="pt-24 pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0B6E65] to-[#095850] text-white py-16">
        <Container>
          <h1 className="font-['Poppins'] text-5xl font-bold mb-4">
            Explore Our Itineraries
          </h1>
          <p className="text-xl text-[#EAD8C4]">
            Find your perfect Sri Lankan adventure from our curated collection
          </p>
        </Container>
      </div>
      
      {/* Filters Section */}
      <div className="bg-white shadow-md py-6">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Region Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Region
              </label>
              <select 
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B6E65] focus:border-transparent"
              >
                {regions.map(region => (
                  <option key={region} value={region}>
                    {region === 'all' ? 'All Regions' : region}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Duration Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration
              </label>
              <select 
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B6E65] focus:border-transparent"
              >
                <option value="all">All Durations</option>
                <option value="short">Short (1-5 days)</option>
                <option value="medium">Medium (6-9 days)</option>
                <option value="long">Long (10+ days)</option>
              </select>
            </div>
            
            {/* Price Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>
              <select 
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B6E65] focus:border-transparent"
              >
                <option value="all">All Prices</option>
                <option value="budget">Budget (Under $700)</option>
                <option value="mid">Mid-Range ($700-$1200)</option>
                <option value="luxury">Luxury ($1200+)</option>
              </select>
            </div>
          </div>
        </Container>
      </div>
      
      {/* Tours Grid */}
      <Container className="py-12">
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredTours.length}</span> itineraries
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0B6E65]"></div>
            <span className="ml-3 text-gray-600">Loading itineraries...</span>
          </div>
        ) : filteredTours.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No itineraries found</h3>
            <p className="text-gray-500">Try adjusting your filters to see more results</p>
          </div>
        )}
      </Container>
    </main>
  );
}
