'use client';

import React, { useState, useRef } from 'react';
import Container from '@/components/Container';
import Button from '@/components/Button';
import ReCAPTCHA from 'react-google-recaptcha';

export default function ContactPage() {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaToken) {
      alert('Please complete the reCAPTCHA to verify you are human.');
      return;
    }
    // TODO: Connect to Laravel API
    console.log('Contact form submitted:', { ...contactForm, captchaToken });
    alert('Thank you for your message! We will get back to you shortly.');
    setContactForm({ name: '', email: '', phone: '', message: '' });
    setCaptchaToken(null);
    recaptchaRef.current?.reset();
  };
  
  const handleWhatsApp = () => {
    window.open('https://wa.me/940777897147', '_blank');
  };
  
  return (
    <main className="pt-24 pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0B6E65] to-[#095850] text-white py-16">
        <Container>
          <h1 className="font-['Poppins'] text-5xl font-bold mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-[#EAD8C4]">
            We're here to help plan your perfect Sri Lankan adventure
          </p>
        </Container>
      </div>
      
      <Container className="py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="font-['Poppins'] text-3xl font-bold text-gray-900 mb-6">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input 
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B6E65] focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input 
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B6E65] focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input 
                  type="tel"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B6E65] focus:border-transparent"
                  placeholder="+1 234 567 8900"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Message *
                </label>
                <textarea 
                  rows={6}
                  required
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B6E65] focus:border-transparent"
                  placeholder="Tell us about your travel plans..."
                />
              </div>
              
              {/* reCAPTCHA */}
              <div>
                {siteKey ? (
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={siteKey}
                    onChange={(token: string | null) => setCaptchaToken(token)}
                    onExpired={() => setCaptchaToken(null)}
                  />
                ) : (
                  <p className="text-sm text-red-600">reCAPTCHA site key is not configured. Set NEXT_PUBLIC_RECAPTCHA_SITE_KEY.</p>
                )}
              </div>

              <Button type="submit" size="lg" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
          
          {/* Contact Information */}
          <div>
            <h2 className="font-['Poppins'] text-3xl font-bold text-gray-900 mb-6">
              Contact Information
            </h2>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#0B6E65]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#0B6E65]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Office Address</h3>
                  <p className="text-gray-600">
                    Triple SR Travelers (PVT) LTD<br/>
                    33/3, Bakmeeruppa, Wellarawa<br/>
                    Chilaw, Sri Lanka
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#0B6E65]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#0B6E65]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                  <p className="text-gray-600">
                    <a href="tel:+940777897147" className="hover:text-[#0B6E65]">077 789 7147</a>
                    <br/>
                    <a href="tel:+940770678032" className="hover:text-[#0B6E65]">077 067 8032</a>
                    <br/>
                    <a href="tel:+940773715301" className="hover:text-[#0B6E65]">077 371 5301</a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#0B6E65]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#0B6E65]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600">
                    <a href="mailto:hello@triplesrtravelers.com" className="hover:text-[#0B6E65]">hello@triplesrtravelers.com</a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#0B6E65]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#0B6E65]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                  <p className="text-gray-600">
                    Monday - Friday: 9:00 AM - 6:00 PM<br/>
                    Saturday: 9:00 AM - 2:00 PM<br/>
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
            
            {/* Quick Contact Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleWhatsApp}
                className="w-full bg-green-500 text-white py-4 rounded-xl font-medium hover:bg-green-600 transition-colors flex items-center justify-center gap-3"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>Chat on WhatsApp</span>
              </button>
              
              <a 
                href="tel:+940777897147"
                className="w-full bg-[#0B6E65] text-white py-4 rounded-xl font-medium hover:bg-[#095850] transition-colors flex items-center justify-center gap-3"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Call Us Now</span>
              </a>
            </div>
          </div>
        </div>
        
        {/* Map Section */}
        <div className="mt-16">
          <h2 className="font-['Poppins'] text-3xl font-bold text-gray-900 mb-6 text-center">
            Find Us Here
          </h2>
          <div className="rounded-2xl overflow-hidden shadow-lg h-[450px]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.826!2d79.8025!3d7.5614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2c9b9b9b9b9b9%3A0x9b9b9b9b9b9b9b9b!2sChilaw%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </Container>
      
      {/* FAQ Section */}
      <div className="bg-[#F6F4F2] py-16 mt-16">
        <Container>
          <h2 className="font-['Poppins'] text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              
              {
                question: 'Do you offer customized tours?',
                answer: 'Yes! We specialize in creating personalized itineraries based on your interests, budget, and time frame. Contact us to discuss your dream tour.',
              },
              {
                question: 'Are your guides English-speaking?',
                answer: 'All our guides are fluent in English and many speak additional languages. Let us know your language preference when booking.',
              },
              {
                question: 'What payment methods do you accept?',
                answer: 'We accept credit cards, bank transfers. A deposit is required to confirm your booking, with the balance due before tour commencement.',
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="font-['Poppins'] font-semibold text-lg text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </main>
  );
}
