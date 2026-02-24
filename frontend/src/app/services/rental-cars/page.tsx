'use client';

import { useState, useEffect } from 'react';
import Container from '@/components/Container';
import Breadcrumbs from '@/components/Breadcrumbs';
import ServicesHeader from '@/components/ServicesHeader';
import { API_BASE } from '@/lib/config';

type Rental = {
  id: number;
  car_type: string;
  brand: string;
  model: string;
  seats: number;
  price_per_day: number;
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

export default function RentalCarsPage() {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchRentals(currentPage);
  }, [currentPage]);

  const fetchRentals = async (page: number = 1) => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/services/rentals?page=${page}&per_page=9`);
      if (!res.ok) throw new Error('Failed to load rentals');
      const json = await res.json();
      setRentals(json.data ?? []);
      setPagination(json.pagination ?? null);
    } catch (error) {
      console.error('Error fetching rentals:', error);
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
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: 'Rental Cars' }]} />
      <ServicesHeader
        title="Find Rental Cars Near You"
        subtitle="Compare car rental options, prices, and pick-up points."
        accent={pagination ? `${pagination.total} available classes` : 'Loading...'}
      />

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0B6E65]"></div>
          <span className="ml-3 text-gray-600">Loading rental cars...</span>
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rentals.map((r) => (
              <div key={r.id} className="bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden">
                <div className="aspect-[16/10] bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={r.image_url}
                    alt={r.model}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop';
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{r.brand} {r.model}</h3>
                  <p className="text-gray-500 text-sm">{r.car_type} • {r.seats} seats</p>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="text-[#0B6E65] font-semibold">${r.price_per_day}/day</span>
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
              Showing {pagination.from}-{pagination.to} of {pagination.total} rental cars
            </div>
          )}
        </>
      )}
    </section>
  );
}
