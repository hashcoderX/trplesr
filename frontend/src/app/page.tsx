import Hero from '@/components/Hero';
import PopularTours from '@/components/PopularTours';
import ExploreServices from '@/components/ExploreServices';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';

export default function Home() {
  return (
    <main>
      <Hero />
      <PopularTours />
      <ExploreServices />
      <WhyChooseUs />
      <Testimonials />
    </main>
  );
}
// ChatWidget is globally injected via layout
