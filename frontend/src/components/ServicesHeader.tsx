import React from 'react';
import Container from './Container';

interface ServicesHeaderProps {
  title: string;
  subtitle?: string;
  accent?: string;
}

export default function ServicesHeader({ title, subtitle, accent }: ServicesHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-[#0B6E65] to-[#095850] text-white py-10 mb-8 rounded-xl shadow-md">
      <Container>
        <h1 className="font-['Poppins'] text-3xl font-bold mb-2">{title}</h1>
        {subtitle && <p className="text-white/90 max-w-2xl leading-relaxed">{subtitle}</p>}
        {accent && <div className="mt-4 inline-block bg-white/10 backdrop-blur px-3 py-1 rounded-full text-sm tracking-wide">{accent}</div>}
      </Container>
    </div>
  );
}
