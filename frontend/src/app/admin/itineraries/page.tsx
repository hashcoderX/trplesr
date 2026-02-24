'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { API_BASE } from '@/lib/config';

interface Destination {
  id: number;
  name: string;
  city: string;
  country: string;
}

interface Hotel {
  id: number;
  name: string;
  location: string;
}

interface Itinerary {
  id: number;
  title: string;
  description: string;
  day_count: number;
  night_count: number;
  day_plans: { day: number; activities: string; images: string[] }[];
  images: string[];
  destinations: Destination[];
  hotels: Hotel[];
}

export default function ItinerariesAdmin() {
  const { token } = useAuth();
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Itinerary | null>(null);
  const [viewing, setViewing] = useState<Itinerary | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    day_count: 0,
    night_count: 0,
    day_plans: [] as { day: number; activities: string; images: File[] }[],
    destination_ids: [] as number[],
    hotel_ids: [] as number[],
    images: [] as File[],
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const count = Math.max(0, Number(formData.day_count) || 0);
    if (count >= 0) {
      setFormData(prev => {
        const prevPlans = prev.day_plans || [];
        const nextPlans = Array.from({ length: count }, (_, i) => {
          const existing = prevPlans[i];
          return {
            day: i + 1,
            activities: existing?.activities ?? '',
            images: existing?.images ?? [],
          };
        });
        return { ...prev, day_plans: nextPlans };
      });
    }
  }, [formData.day_count]);

  const fetchData = async () => {
    try {
      const [itinsRes, destsRes, hotelsRes] = await Promise.all([
        fetch(`${API_BASE}/admin/itineraries`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${API_BASE}/admin/destinations`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${API_BASE}/admin/hotels`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      if (itinsRes.ok) setItineraries(await itinsRes.json());
      if (destsRes.ok) setDestinations(await destsRes.json());
      if (hotelsRes.ok) setHotels(await hotelsRes.json());
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('day_count', formData.day_count.toString());
    data.append('night_count', formData.night_count.toString());
    formData.destination_ids.forEach(id => data.append('destination_ids[]', id.toString()));
    formData.hotel_ids.forEach(id => data.append('hotel_ids[]', id.toString()));
    formData.images.forEach((img) => data.append('images[]', img));
    formData.day_plans.forEach((plan, index) => {
      data.append(`day_plans[${index}][day]`, plan.day.toString());
      data.append(`day_plans[${index}][activities]`, plan.activities);
      if (plan.images && plan.images.length > 0) {
        plan.images.forEach((img) => data.append(`day_plans[${index}][images][]`, img));
      }
    });

    try {
      const url = editing ? `${API_BASE}/admin/itineraries/${editing.id}` : `${API_BASE}/admin/itineraries`;
      const method = 'POST';
      if (editing) {
        data.append('_method', 'PUT');
      }
      
      console.log('Making request to:', url);
      console.log('Method:', method);
      console.log('Token exists:', !!token);
      
      const res = await fetch(url, {
        method,
        headers: { 
          Authorization: `Bearer ${token}`,
          // Don't set Content-Type for FormData
        },
        body: data,
      });
      
      console.log('Response status:', res.status);
      console.log('Response ok:', res.ok);
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error('Request failed:', res.status, res.statusText, errorText);
        alert(`Error: ${res.status} ${res.statusText}\n${errorText}`);
        return;
      }
      
      if (res.ok) {
        fetchData();
        setShowForm(false);
        setEditing(null);
        setFormData({ title: '', description: '', day_count: 0, night_count: 0, day_plans: [], destination_ids: [], hotel_ids: [], images: [] });
      }
    } catch (error) {
      console.error('Network error:', error);
      alert(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure?')) {
      try {
        await fetch(`${API_BASE}/admin/itineraries/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchData();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const startEdit = (itinerary: Itinerary) => {
    setEditing(itinerary);
    setFormData({
      title: itinerary.title,
      description: itinerary.description,
      day_count: itinerary.day_count || 0,
      night_count: itinerary.night_count || 0,
      day_plans: itinerary.day_plans ? itinerary.day_plans.map(plan => ({ ...plan, images: [] })) : [],
      destination_ids: itinerary.destinations.map(d => d.id),
      hotel_ids: itinerary.hotels.map(h => h.id),
      images: [],
    });
    setShowForm(true);
  };

  const toggleDestination = (id: number) => {
    setFormData(prev => ({
      ...prev,
      destination_ids: prev.destination_ids.includes(id)
        ? prev.destination_ids.filter(i => i !== id)
        : [...prev.destination_ids, id]
    }));
  };

  const toggleHotel = (id: number) => {
    setFormData(prev => ({
      ...prev,
      hotel_ids: prev.hotel_ids.includes(id)
        ? prev.hotel_ids.filter(i => i !== id)
        : [...prev.hotel_ids, id]
    }));
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-100 p-8 flex items-center justify-center relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-[#0B6E65] to-[#095850] rounded-full blur-3xl"></div>
      </div>
      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="flex justify-between items-center mb-12 bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="flex items-center space-x-4">
            <Link
              href="/admin/dashboard"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 hover:scale-105 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Dashboard
            </Link>
            <div>
              <h1 className="text-4xl font-bold mt-12 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Manage Itineraries</h1>
              <p className="text-gray-600 mt-2 text-lg">Create and manage travel itineraries with destinations and hotels</p>
            </div>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-[#0B6E65] to-[#095850] text-white px-8 py-4 rounded-2xl font-semibold hover:from-[#095850] hover:to-[#07433D] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105"
          >
            <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Itinerary
          </button>
        </div>

        {showForm && (
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8 mb-12 animate-in slide-in-from-top-5 duration-500">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{editing ? 'Edit' : 'Add'} Itinerary</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    placeholder="Itinerary Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-purple-600 focus:ring-4 focus:ring-purple-600/10 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Day Count</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.day_count}
                    onChange={(e) => {
                      const raw = e.currentTarget.value;
                      const num = Number(raw);
                      const next = Number.isNaN(num) ? 0 : Math.max(1, num);
                      setFormData({ ...formData, day_count: next });
                    }}
                    required
                    className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-purple-600 focus:ring-4 focus:ring-purple-600/10 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Night Count</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.night_count}
                    onChange={(e) => setFormData({ ...formData, night_count: parseInt(e.target.value) || 0 })}
                    required
                    className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-purple-600 focus:ring-4 focus:ring-purple-600/10 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <textarea
                    placeholder="Describe this itinerary"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-purple-600 focus:ring-4 focus:ring-purple-600/10 transition-all duration-300 bg-white/50 backdrop-blur-sm resize-none"
                    rows={4}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Destinations</label>
                  <div className="grid grid-cols-2 gap-3 p-4 bg-gray-50 rounded-2xl">
                    {destinations.map(dest => (
                      <label key={dest.id} className="flex items-center p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.destination_ids.includes(dest.id)}
                          onChange={() => toggleDestination(dest.id)}
                          className="mr-3 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-gray-900 font-medium">{dest.name}</span>
                        <span className="text-gray-500 text-sm ml-2">({dest.city})</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Hotels</label>
                  <div className="grid grid-cols-2 gap-3 p-4 bg-gray-50 rounded-2xl">
                    {hotels.map(hotel => (
                      <label key={hotel.id} className="flex items-center p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.hotel_ids.includes(hotel.id)}
                          onChange={() => toggleHotel(hotel.id)}
                          className="mr-3 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-gray-900 font-medium">{hotel.name}</span>
                        <span className="text-gray-500 text-sm ml-2">({hotel.location})</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Images</label>
                  <div className="relative">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => setFormData({ ...formData, images: Array.from(e.target.files || []) })}
                      className="w-full p-4 border-2 border-dashed border-gray-300 rounded-2xl focus:border-purple-600 focus:ring-4 focus:ring-purple-600/10 transition-all duration-300 bg-white/50 backdrop-blur-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                    />
                  </div>
                </div>
                {formData.day_plans.map((plan, index) => (
                  <div key={index} className="md:col-span-2 border-t pt-6 mt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Day {plan.day}</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Activities</label>
                        <textarea
                          placeholder={`Describe activities for Day ${plan.day}`}
                          value={plan.activities}
                          onChange={(e) => {
                            const newPlans = [...formData.day_plans];
                            newPlans[index].activities = e.target.value;
                            setFormData({ ...formData, day_plans: newPlans });
                          }}
                          className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-purple-600 focus:ring-4 focus:ring-purple-600/10 transition-all duration-300 bg-white/50 backdrop-blur-sm resize-none"
                          rows={3}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Images</label>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => {
                            const newPlans = [...formData.day_plans];
                            newPlans[index].images = Array.from(e.target.files || []);
                            setFormData({ ...formData, day_plans: newPlans });
                          }}
                          className="w-full p-4 border-2 border-dashed border-gray-300 rounded-2xl focus:border-purple-600 focus:ring-4 focus:ring-purple-600/10 transition-all duration-300 bg-white/50 backdrop-blur-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 pt-6">
                <button type="submit" className="bg-gradient-to-r from-[#0B6E65] to-[#095850] text-white px-8 py-4 rounded-2xl font-semibold hover:from-[#095850] hover:to-[#07433D] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 flex-1">
                  <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {editing ? 'Update' : 'Create'} Itinerary
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditing(null);
                    setFormData({ title: '', description: '', day_count: 0, night_count: 0, day_plans: [], destination_ids: [], hotel_ids: [], images: [] });
                  }}
                  className="bg-gray-600 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-gray-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105"
                >
                  <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {viewing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">{viewing.title}</h2>
                  </div>
                  <button
                    onClick={() => setViewing(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Duration */}
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Duration</h3>
                    <p className="text-gray-600">{viewing.day_count} Days / {viewing.night_count} Nights</p>
                  </div>

                  {/* Description */}
                  {viewing.description && (
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                      <p className="text-gray-600">{viewing.description}</p>
                    </div>
                  )}

                  {/* Images */}
                  {viewing.images && viewing.images.length > 0 && (
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Images</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {viewing.images.map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={image}
                              alt={`Itinerary image ${index + 1}`}
                              className="w-full h-32 object-cover rounded-xl"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Day Plans */}
                  {viewing.day_plans && viewing.day_plans.length > 0 && (
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Day by Day Plan</h3>
                      <div className="space-y-4">
                        {viewing.day_plans.map((plan) => (
                          <div key={plan.day} className="bg-white rounded-xl p-4 shadow-sm">
                            <h4 className="font-semibold text-gray-900 mb-2">Day {plan.day}</h4>
                            <p className="text-gray-600 mb-3">{plan.activities}</p>
                            {plan.images && plan.images.length > 0 && (
                              <div className="grid grid-cols-3 gap-2">
                                {plan.images.map((image, imgIndex) => (
                                  <img
                                    key={imgIndex}
                                    src={image}
                                    alt={`Day ${plan.day} image ${imgIndex + 1}`}
                                    className="w-full h-20 object-cover rounded-lg"
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Destinations */}
                  {viewing.destinations && viewing.destinations.length > 0 && (
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Destinations</h3>
                      <div className="flex flex-wrap gap-2">
                        {viewing.destinations.map((dest) => (
                          <span key={dest.id} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                            {dest.name} - {dest.city}, {dest.country}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Hotels */}
                  {viewing.hotels && viewing.hotels.length > 0 && (
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Hotels</h3>
                      <div className="flex flex-wrap gap-2">
                        {viewing.hotels.map((hotel) => (
                          <span key={hotel.id} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                            {hotel.name} - {hotel.location}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end mt-8">
                  <button
                    onClick={() => setViewing(null)}
                    className="bg-gray-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-700 transition-all duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-purple-600 to-pink-600">
              <tr>
                <th className="px-8 py-5 text-left text-sm font-bold text-white uppercase tracking-wider">Itinerary</th>
                <th className="px-8 py-5 text-left text-sm font-bold text-white uppercase tracking-wider">Duration</th>
                <th className="px-8 py-5 text-left text-sm font-bold text-white uppercase tracking-wider">Destinations</th>
                <th className="px-8 py-5 text-left text-sm font-bold text-white uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/50">
              {itineraries.map((itinerary, index) => (
                <tr key={itinerary.id} className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2" style={{ animationDelay: `${index * 100}ms` }}>
                  <td className="px-8 py-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-gray-900">{itinerary.title}</div>
                        <div className="text-sm text-gray-500">{itinerary.description?.substring(0, 50)}...</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-gray-900 font-medium">{itinerary.day_count} Days</div>
                    <div className="text-gray-500 text-sm">{itinerary.night_count} Nights</div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-wrap gap-1">
                      {itinerary.destinations.slice(0, 3).map(dest => (
                        <span key={dest.id} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                          {dest.name}
                        </span>
                      ))}
                      {itinerary.destinations.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{itinerary.destinations.length - 3} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-6 space-x-3">
                    <button
                      onClick={() => setViewing(itinerary)}
                      className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
                    >
                      <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View
                    </button>
                    <button
                      onClick={() => startEdit(itinerary)}
                      className="bg-gradient-to-r from-[#0B6E65] to-[#095850] text-white px-6 py-3 rounded-xl font-medium hover:from-[#095850] hover:to-[#07433D] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
                    >
                      <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(itinerary.id)}
                      className="bg-red-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
                    >
                      <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {itineraries.length === 0 && (
            <div className="text-center py-16">
              <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No itineraries yet</h3>
              <p className="text-gray-500">Start by creating your first travel itinerary</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}