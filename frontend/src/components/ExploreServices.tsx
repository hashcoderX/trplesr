import Link from 'next/link';
import Container from './Container';

const services = [
  {
    href: '/services/hotels',
    title: 'Save your favorite Hotels',
    desc: 'Bookmark and compare top stays across Sri Lanka.',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 21V7a2 2 0 0 1 2-2h10a4 4 0 0 1 4 4v12"/>
        <path d="M3 10h18"/>
        <path d="M7 14v2M11 14v2"/>
      </svg>
    ),
  },
  {
    href: '/services/things-to-do',
    title: 'Things to do, places to go',
    desc: 'Curated activities and attractions you will love.',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2l3 7h7l-5.5 4 2 7L12 17l-6.5 3 2-7L2 9h7z"/>
      </svg>
    ),
  },
  {
    href: '/services/restaurants',
    title: 'Restaurants & more to explore',
    desc: 'Find great food spots, cafes, and hidden gems.',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M8 2v10"/>
        <path d="M5 12h6"/>
        <path d="M18 2v8a3 3 0 0 1-3 3h-1"/>
      </svg>
    ),
  },
  {
    href: 'https://www.rentway.lk', 
    title: 'Find rental cars near you',
    desc: 'Compare prices and pick-up points across the island.',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 13l2-5a2 2 0 0 1 2-1h8a2 2 0 0 1 2 1l2 5"/>
        <circle cx="7.5" cy="17.5" r="2.5"/>
        <circle cx="16.5" cy="17.5" r="2.5"/>
      </svg>
    ),
  },
];

export default function ExploreServices() {
  return (
    <section className="py-16 bg-[#F6F4F2]">
      <Container>
        <div className="text-center mb-10">
          <h2 className="font-['Poppins'] text-3xl sm:text-4xl font-bold text-gray-900">
            Plan more than a tour
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Hotels, activities, food, and rides — everything you need for a perfect trip.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group block rounded-2xl bg-white p-6 shadow hover:shadow-lg transition-shadow border border-gray-100"
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-[#0B6E65]/10 text-[#0B6E65]">
                {s.icon}
              </div>
              <h3 className="mt-4 font-['Poppins'] text-lg font-semibold text-gray-900 group-hover:text-[#0B6E65]">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">{s.desc}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#0B6E65]">
                Explore
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14"/>
                  <path d="M13 5l7 7-7 7"/>
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
