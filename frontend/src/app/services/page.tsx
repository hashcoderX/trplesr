import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import ServicesHeader from '@/components/ServicesHeader';

const cards = [
  { href: '/services/hotels', title: 'Hotels', desc: 'Top stays, boutique gems, and seaside resorts', emoji: '🏨' },
  { href: '/services/things-to-do', title: 'Things to Do', desc: 'Attractions, tours, and outdoor adventures', emoji: '🧭' },
  { href: '/services/restaurants', title: 'Restaurants', desc: 'Local eats, cafes, and hidden gems', emoji: '🍽️' },
  { href: '/services/rental-cars', title: 'Rental Cars', desc: 'Compact to vans—compare and book', emoji: '🚗' },
];

export default function ServicesIndexPage() {
  return (
    <section className="py-6">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Services' }]} />
      <ServicesHeader
        title="Explore Services"
        subtitle="Everything you need to plan the perfect Sri Lankan journey."
        accent="Hotels • Activities • Restaurants • Rentals"
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="group bg-white rounded-xl p-5 shadow hover:shadow-md transition border border-gray-100">
            <div className="text-3xl mb-3">{c.emoji}</div>
            <h3 className="font-semibold text-lg mb-1 group-hover:text-[#0B6E65]">{c.title}</h3>
            <p className="text-gray-600 text-sm">{c.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
