'use client';

import { useState, useEffect } from 'react';
import Container from '@/components/Container';
import Breadcrumbs from '@/components/Breadcrumbs';
import ServicesHeader from '@/components/ServicesHeader';
import { API_BASE } from '@/lib/config';

type Restaurant = {
  id: number;
  name: string;
  location: string;
  rating: number;
  cuisine: string;
  price_level: string;
  image_url: string;
};

type PaginationData = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number | null;
  to: number | null;
};

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchRestaurants(currentPage);
  }, [currentPage]);

  const fetchRestaurants = async (page: number = 1) => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/services/restaurants?page=${page}&per_page=9`);
      if (!res.ok) throw new Error('Failed to load restaurants');
      const json = await res.json();
      setRestaurants(json.data ?? []);
      setPagination(json.pagination ?? null);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-6">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: 'Restaurants' }]} />
      <ServicesHeader
        title="Restaurants & More to Explore"
        subtitle="Find the best local food, cafes, and hidden gems."
        accent={pagination ? `${pagination.total} recommended spots` : 'Loading...'}
      />

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0B6E65]"></div>
          <span className="ml-3 text-gray-600">Loading restaurants...</span>
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {restaurants.map((r) => (
              <div key={r.id} className="bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden">
                <div className="aspect-[16/10] bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={r.image_url}
                    alt={r.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=300&fit=crop';
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{r.name}</h3>
                  <p className="text-gray-500 text-sm">{r.location} • {r.cuisine}</p>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="text-amber-600 font-medium">★ {r.rating.toFixed(1)}</span>
                    <span className="text-gray-600">{r.price_level}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {pagination && pagination.last_page > 1 && (
            <div className="flex justify-center items-center mt-12 space-x-2">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>

              {/* Page Numbers */}
              <div className="flex space-x-1">
                {Array.from({ length: pagination.last_page }, (_, i) => i + 1)
                  .filter(page => {
                    const current = pagination.current_page;
                    return page === 1 || page === pagination.last_page || (page >= current - 1 && page <= current + 1);
                  })
                  .map((page, index, array) => (
                    <div key={page} className="flex items-center">
                      {index > 0 && array[index - 1] !== page - 1 && (
                        <span className="px-2 text-gray-400">...</span>
                      )}
                      <button
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                          page === currentPage
                            ? 'bg-[#0B6E65] text-white'
                            : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    </div>
                  ))}
              </div>

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === pagination.last_page}
                className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
                <svg className="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}

          {/* Pagination Info */}
          {pagination && (
            <div className="text-center mt-4 text-sm text-gray-600">
              Showing {pagination.from}-{pagination.to} of {pagination.total} restaurants
            </div>
          )}
        </>
      )}
    </section>
  );
}
