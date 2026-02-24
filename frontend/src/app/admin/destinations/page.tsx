'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { API_BASE } from '@/lib/config';

interface Destination {
  id: number;
  name: string;
  country: string;
  city: string;
  description: string;
  images: string[];
}

export default function DestinationsAdmin() {
  const { token } = useAuth();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Destination | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    city: '',
    description: '',
    images: [] as File[],
  });

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/destinations`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setDestinations(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('country', formData.country);
    data.append('city', formData.city);
    data.append('description', formData.description);
    formData.images.forEach((img) => data.append('images[]', img));

    try {
      const url = editing ? `${API_BASE}/admin/destinations/${editing.id}` : `${API_BASE}/admin/destinations`;
      const method = editing ? 'PATCH' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      });
      if (res.ok) {
        fetchDestinations();
        setShowForm(false);
        setEditing(null);
        setFormData({ name: '', country: '', city: '', description: '', images: [] });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure?')) {
      try {
        await fetch(`${API_BASE}/admin/destinations/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchDestinations();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const startEdit = (dest: Destination) => {
    setEditing(dest);
    setFormData({
      name: dest.name,
      country: dest.country,
      city: dest.city,
      description: dest.description,
      images: [],
    });
    setShowForm(true);
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-8 flex items-center justify-center relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-[#0B6E65] to-[#095850] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-3xl"></div>
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
              <h1 className="text-4xl font-bold mt-12 bg-gradient-to-r from-[#0B6E65] to-[#095850] bg-clip-text text-transparent">Manage Destinations</h1>
              <p className="text-gray-600 mt-2 text-lg">Create and manage travel destinations for your itineraries</p>
            </div>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-[#0B6E65] to-[#095850] text-white px-8 py-4 rounded-2xl font-semibold hover:from-[#095850] hover:to-[#07433D] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105"
          >
            <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Destination
          </button>
        </div>

        {showForm && (
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8 mb-12 animate-in slide-in-from-top-5 duration-500">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-[#0B6E65] to-[#095850] rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{editing ? 'Edit' : 'Add'} Destination</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    placeholder="Destination Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-[#0B6E65] focus:ring-4 focus:ring-[#0B6E65]/10 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
                  <input
                    type="text"
                    placeholder="Country"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    required
                    className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-[#0B6E65] focus:ring-4 focus:ring-[#0B6E65]/10 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    required
                    className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-[#0B6E65] focus:ring-4 focus:ring-[#0B6E65]/10 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <textarea
                    placeholder="Describe this destination"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-[#0B6E65] focus:ring-4 focus:ring-[#0B6E65]/10 transition-all duration-300 bg-white/50 backdrop-blur-sm resize-none"
                    rows={4}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Images</label>
                  <div className="relative">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => setFormData({ ...formData, images: Array.from(e.target.files || []) })}
                      className="w-full p-4 border-2 border-dashed border-gray-300 rounded-2xl focus:border-[#0B6E65] focus:ring-4 focus:ring-[#0B6E65]/10 transition-all duration-300 bg-white/50 backdrop-blur-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[#0B6E65] file:text-white hover:file:bg-[#095850]"
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-4 pt-6">
                <button type="submit" className="bg-gradient-to-r from-[#0B6E65] to-[#095850] text-white px-8 py-4 rounded-2xl font-semibold hover:from-[#095850] hover:to-[#07433D] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 flex-1">
                  <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {editing ? 'Update' : 'Create'} Destination
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditing(null);
                    setFormData({ name: '', country: '', city: '', description: '', images: [] });
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

        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-[#0B6E65] to-[#095850]">
              <tr>
                <th className="px-8 py-5 text-left text-sm font-bold text-white uppercase tracking-wider">Destination</th>
                <th className="px-8 py-5 text-left text-sm font-bold text-white uppercase tracking-wider">Location</th>
                <th className="px-8 py-5 text-left text-sm font-bold text-white uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/50">
              {destinations.map((dest, index) => (
                <tr key={dest.id} className="hover:bg-gradient-to-r hover:from-[#0B6E65]/5 hover:to-[#095850]/5 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2" style={{ animationDelay: `${index * 100}ms` }}>
                  <td className="px-8 py-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#0B6E65] to-[#095850] rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-gray-900">{dest.name}</div>
                        <div className="text-sm text-gray-500">{dest.description?.substring(0, 50)}...</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-gray-900 font-medium">{dest.city}</div>
                    <div className="text-gray-500 text-sm">{dest.country}</div>
                  </td>
                  <td className="px-8 py-6 space-x-3">
                    <button
                      onClick={() => startEdit(dest)}
                      className="bg-gradient-to-r from-[#0B6E65] to-[#095850] text-white px-6 py-3 rounded-xl font-medium hover:from-[#095850] hover:to-[#07433D] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
                    >
                      <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(dest.id)}
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
          {destinations.length === 0 && (
            <div className="text-center py-16">
              <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No destinations yet</h3>
              <p className="text-gray-500">Start by adding your first destination</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}