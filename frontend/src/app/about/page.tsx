import React from 'react';
import Container from '@/components/Container';
import Image from 'next/image';

const teamMembers = [
  {
    id: '1',
    name: 'Mr. R.S.B. Hewawissa',
    title: 'Founder & CEO',
    image: '/team/ruwan.png',
    bio: '10+ years experience in tourism industry',
  },
  {
    id: '2',
    name: 'Mr. K. S. Amarajeewa',
    title: 'Tour Operations Manager',
    image: '/team/sumith.png',
    bio: 'Expert in cultural and heritage tours',
  },
  {
    id: '3',
    name: 'Mr. B. M. T. P. Balasuriya',
    title: 'Tour Operations Manager',
    image: '/team/tharidu.png',
    bio: 'Licensed naturalist with 10 years experience',
  },
  {
    id: '4',
    name: 'Major Damith Bandara Hewawissa',
    title: 'Consultation',
    image: '/team/hewavissa.png',
    bio: 'Dedicated to exceptional customer service',
  },
  {
    id: '5',
    name: 'H.W.S Hewavitharana',
    title: 'IT Consultancy & Web Designer',
    image: '/team/sudharma.png',
    bio: 'Dedicated to exceptional customer IT service',
  },
];

export default function AboutPage() {
  return (
    <main className="pt-24 pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0B6E65] to-[#095850] text-white py-16">
        <Container>
          <h1 className="font-['Poppins'] text-5xl font-bold mb-4">
            About Triple SR Travelers
          </h1>
          <p className="text-xl text-[#EAD8C4]">
            Your trusted partner for unforgettable Sri Lankan adventures
          </p>
        </Container>
      </div>
      
      {/* Mission & Vision */}
      <Container className="py-16">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="w-16 h-16 bg-[#0B6E65]/10 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-[#0B6E65]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="font-['Poppins'] text-3xl font-bold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              At Triple SR Travelers, our mission is to create unforgettable journeys by offering high-quality travel solutions, personalized services, and seamless bookings. We strive to showcase the beauty and diversity of Sri Lanka while ensuring every traveler experiences the warmth of Sri Lankan hospitality.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="w-16 h-16 bg-[#0B6E65]/10 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-[#0B6E65]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h2 className="font-['Poppins'] text-3xl font-bold text-gray-900 mb-4">
              Our Vision
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              To become Sri Lanka's most trusted and innovative travel partner, delivering authentic experiences that connect people with culture, nature, and adventure while promoting sustainable and responsible tourism that benefits local communities and preserves our natural heritage.
            </p>
          </div>
        </div>
        
        {/* Story Section */}
        <div className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-['Poppins'] text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                 At Triple SR Travelers (Pvt) Ltd, we believe that travel is more than just moving from one destination to another—it is about discovering cultures, creating unforgettable memories, and building connections that last a lifetime. Established with a vision to showcase the beauty and diversity of Sri Lanka to the world, our company is driven by a passion for tourism, professionalism, and a commitment to delivering exceptional experiences for every traveler.
                </p>
                <p>
                  Located at 33/3, Bakmeeruppa, Wellarawa, our headquarters serves as the heart of our operations. From here, our dedicated team works tirelessly to design, plan, and execute travel solutions that cater to both local and international travelers. Whether it’s exploring Whether it’s exploring Sri Lanka’s pristine beaches, hiking through misty mountains, experiencing cultural festivals, or booking luxury accommodations, Triple SR Travelers is your trusted partner in crafting journeys that matter.
                </p>
                <p>
                 Our journey is also supported by Mr. Sudharma Hewavitharana, the creative force behind our online presence. As our web designer and service provider, he ensures that our digital platforms remain modern, user-friendly, and informative—making it easy for customers around the world to connect with us, explore our services, and book their dream trips with confidence.
                </p>
              </div>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="/images/office.png"
                alt="Sri Lanka Landscape"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        
        {/* Values Section */}
        <div className="mb-16">
          <h2 className="font-['Poppins'] text-4xl font-bold text-gray-900 text-center mb-12">
            Our Values
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Authenticity',
                description: 'We provide genuine Sri Lankan experiences that connect you with local culture and traditions.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                ),
              },
              {
                title: 'Sustainability',
                description: 'We practice responsible tourism that protects the environment and supports local communities.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                title: 'Excellence',
                description: 'We maintain the highest standards in service quality and customer satisfaction.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                ),
              },
              {
                title: 'Safety',
                description: 'Your safety and security are our top priorities on every journey.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
              },
            ].map((value, index) => (
              <div key={index} className="bg-[#F6F4F2] p-6 rounded-xl text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#0B6E65] text-white mb-4">
                  {value.icon}
                </div>
                <h3 className="font-['Poppins'] text-xl font-semibold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Team Section */}
        <div>
          <h2 className="font-['Poppins'] text-4xl font-bold text-gray-900 text-center mb-4">
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Passionate professionals dedicated to making your Sri Lankan adventure extraordinary
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-64">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-['Poppins'] text-xl font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[#0B6E65] font-medium mb-2">{member.title}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
      
      {/* CTA Section */}
      <div className="bg-gradient-to-r from-[#0B6E65] to-[#095850] py-16">
        <Container>
          <div className="text-center text-white">
            <h2 className="font-['Poppins'] text-4xl font-bold mb-4">
              Ready to Start Your Adventure?
            </h2>
            <p className="text-xl text-[#EAD8C4] mb-8">
              Let us help you create memories that will last a lifetime
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/tours"
                className="px-8 py-4 bg-white text-[#0B6E65] rounded-xl font-medium hover:bg-[#EAD8C4] transition-colors inline-block"
              >
                Explore Itineraries
              </a>
              <a 
                href="/contact"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-medium hover:bg-white hover:text-[#0B6E65] transition-colors inline-block"
              >
                Contact Us
              </a>
            </div>
          </div>
        </Container>
      </div>
    </main>
  );
}
