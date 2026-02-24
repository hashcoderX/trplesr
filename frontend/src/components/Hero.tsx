'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Button from './Button';

export default function Hero() {
  // Image slides (free images from Unsplash)
  const slides = useMemo(() => [
    {
      src: '/images/1536044065.jpg',
      alt: 'Kandy Perahera Cultural Parade',
    },
    {
      // Cultural parade to represent Kandy Perahera (illustrative)
      src: '/images/blog-upcountry.jpg',
      alt: 'Kandy Perahera Cultural Parade',
    },
    
    
  ], []);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 6000);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <div className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden pt-32">
      {/* Background Slider */}
      <div className="absolute inset-0 z-0">
        <div
          className="h-full w-full flex transition-transform duration-[1200ms] ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((s, i) => (
            <div key={i} className="min-w-full h-full relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.src}
                alt={s.alt}
                className="absolute inset-0 w-full h-full object-cover"
                loading={i === 0 ? 'eager' : 'lazy'}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            </div>
          ))}
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          <h1 className="font-['Poppins'] text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Discover the Magic of{' '}
            <span className="text-[#EAD8C4]">Sri Lanka</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-200 mb-8 leading-relaxed">
            Unforgettable journeys through culture, nature, and adventure. 
            Experience authentic Sri Lanka with expert guides and personalized service.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/tours">
              <Button size="lg" className="w-full sm:w-auto">
                Browse Itineraries
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white/10 backdrop-blur-sm text-white border-white hover:bg-white hover:text-[#0B6E65]">
                Request Custom Itinerary
              </Button>
            </Link>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap gap-8 text-white">
            <div>
              <div className="text-3xl font-bold text-[#EAD8C4]">500+</div>
              <div className="text-sm text-gray-300">Happy Travelers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#EAD8C4]">15+</div>
              <div className="text-sm text-gray-300">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#EAD8C4]">4.9★</div>
              <div className="text-sm text-gray-300">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full transition-all ${
              i === index ? 'w-6 bg-white' : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
