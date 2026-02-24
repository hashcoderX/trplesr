'use client';

import React from 'react';
import Link from 'next/link';
import { Tour } from '@/types';

interface TourCardProps {
  tour: Tour;
}

export default function TourCard({ tour }: TourCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={tour.image} 
          alt={tour.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        {tour.price > 0 && (
          <div className="absolute top-4 right-4 bg-[#0B6E65] text-white px-3 py-1 rounded-full text-sm font-semibold">
            ${tour.price}
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{tour.duration}</span>
        </div>
        
        <h3 className="font-['Poppins'] text-xl font-semibold text-gray-900 mb-2">
          {tour.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-2">
          {tour.shortDescription}
        </p>
        
        {tour.rating && (
          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-4 h-4 ${i < Math.floor(tour.rating!) ? 'fill-current' : 'fill-gray-300'}`} viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-600">({tour.reviewCount} reviews)</span>
          </div>
        )}
        
        <Link href={`/tours/${tour.id}`}>
          <button className="w-full bg-[#0B6E65] text-white py-3 rounded-xl font-medium hover:bg-[#095850] transition-colors duration-300">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}
