import React from 'react';
import Container from '@/components/Container';
import TourDetailsClient from './TourDetailsClient';
import TourDetailsLoader from './TourDetailsLoader';
import { API_BASE } from '@/lib/config';

export const dynamic = 'force-static';

type Itinerary = {
  id: number;
  title: string;
  description: string;
  day_count: number;
  night_count: number;
  images: string[];
  day_plans: { day: number; activities: string; images: string[] }[];
  destinations: { id: number; name: string; city: string; country: string }[];
  hotels: { id: number; name: string; location: string }[];
};

const API_LIST = `${API_BASE}/itineraries`;
const API_ITEM = (id: string) => `${API_BASE}/itineraries/${id}`;

export async function generateStaticParams() {
  try {
    const res = await fetch(API_LIST, { cache: 'force-cache' });
    if (!res.ok) throw new Error(`List status ${res.status}`);
    const data = (await res.json()) as Itinerary[];
    return (Array.isArray(data) ? data : [])
      .map((it) => ({ id: String(it.id) }))
      .filter((p) => p.id);
  } catch {
    // No crash: return empty to avoid build failure
    return [];
  }
}

export default async function TourDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let itinerary: Itinerary | null = null;
  try {
    const url = API_ITEM(id);
    console.log('[TourDetails] Fetching', url);
    const res = await fetch(url, { cache: 'force-cache', headers: { Accept: 'application/json' } });
    console.log('[TourDetails] Status', res.status);
    if (res.ok) itinerary = await res.json();
  } catch {}

  if (!itinerary) {
    // Fallback to client-side loader to avoid blocking navigation in dev or when build-time fetch fails
    return <TourDetailsLoader id={id} />;
  }

  // Use the styled client component for consistent design
  return <TourDetailsClient itinerary={itinerary} />;
}

// End of static page
