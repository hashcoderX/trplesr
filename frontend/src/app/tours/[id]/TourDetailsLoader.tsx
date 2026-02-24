'use client';

import React, { useEffect, useState } from 'react';
import Container from '@/components/Container';
import { API_BASE } from '@/lib/config';
import TourDetailsClient from './TourDetailsClient';

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

export default function TourDetailsLoader({ id }: { id: string }) {
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch(`${API_BASE}/itineraries/${id}`, { cache: 'no-store' });
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        setItinerary(data);
      } catch (e: any) {
        setError(e?.message || 'Failed to load itinerary');
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [id]);

  if (loading) {
    return (
      <main className="pt-24 pb-20">
        <Container>
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Loading Itinerary...</h1>
            <p className="text-gray-600">Fetching latest details from our server.</p>
          </div>
        </Container>
      </main>
    );
  }

  if (error || !itinerary) {
    return (
      <main className="pt-24 pb-20">
        <Container>
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Itinerary Not Found</h1>
            <p className="text-gray-600">The itinerary you're looking for doesn't exist or couldn't be loaded.</p>
          </div>
        </Container>
      </main>
    );
  }

  return <TourDetailsClient itinerary={itinerary} />;
}
