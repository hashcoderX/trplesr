'use client';

import React, { useMemo, useState } from 'react';
import Container from './Container';
import { mockTestimonials } from '@/lib/mockData';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % mockTestimonials.length);
  };
  
  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + mockTestimonials.length) % mockTestimonials.length);
  };
  
  const currentTestimonial = mockTestimonials[currentIndex];

  // Stabilize date formatting across SSR/CSR to avoid hydration mismatches
  const formattedDate = useMemo(() => {
    const dateStr = currentTestimonial?.date;
    if (!dateStr) return '';
    // Parse as UTC to avoid timezone shifts between server and client
    const d = new Date(`${dateStr}T00:00:00Z`);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    }).format(d);
  }, [currentTestimonial?.date]);
  
  return (
    <section className="py-20 bg-[#0B6E65]">
      <Container>
        <div className="text-center mb-12">
          <h2 className="font-['Poppins'] text-4xl sm:text-5xl font-bold text-white mb-4">
            What Our Travelers Say
          </h2>
          <p className="text-xl text-[#EAD8C4]">
            Real experiences from real adventurers
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-2xl">
            <div className="flex items-center mb-6">
              {currentTestimonial.image && (
                <img 
                  src={currentTestimonial.image} 
                  alt={currentTestimonial.name}
                  className="w-16 h-16 rounded-full mr-4"
                />
              )}
              <div>
                <h3 className="font-['Poppins'] text-xl font-semibold text-gray-900">
                  {currentTestimonial.name}
                </h3>
                <p className="text-gray-600">{currentTestimonial.country}</p>
              </div>
              <div className="ml-auto flex text-yellow-400">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
            </div>
            
            <blockquote className="text-lg text-gray-700 leading-relaxed mb-6">
              "{currentTestimonial.comment}"
            </blockquote>
            
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">{formattedDate}</p>
              
              <div className="flex gap-2">
                <button 
                  onClick={prevTestimonial}
                  className="p-2 rounded-full bg-[#0B6E65] text-white hover:bg-[#095850] transition-colors"
                  aria-label="Previous testimonial"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={nextTestimonial}
                  className="p-2 rounded-full bg-[#0B6E65] text-white hover:bg-[#095850] transition-colors"
                  aria-label="Next testimonial"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {mockTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? 'bg-white w-8' : 'bg-white/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
