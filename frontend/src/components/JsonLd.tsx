"use client";

import React from 'react';

type Props = {
  siteUrl?: string;
};

export default function JsonLd({ siteUrl }: Props) {
  const host = siteUrl || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const org = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Triple SR Travelers',
    url: host,
    logo: `${host}/images/main_logo.png`,
  };
  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Triple SR Travelers',
    url: host,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${host}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
    </>
  );
}
