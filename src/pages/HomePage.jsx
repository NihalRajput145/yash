import React from 'react';
import PageTransition from '../components/common/PageTransition';
import Hero from '../components/home/Hero';
import FeaturedCollection from '../components/home/FeaturedCollection';
import CuratedShowcase from '../components/home/CuratedShowcase';
import LookbookCampaignSection from '../components/home/LookbookCampaignSection';
import BrandPhilosophy from '../components/home/BrandPhilosophy';
import AtelierProcess from '../components/home/AtelierProcess';

export default function HomePage() {
  return (
    <PageTransition>
      {/* 1. Full-screen Hero */}
      <Hero />

      {/* 2. Featured Collection (Asymmetric alternating layout) */}
      <FeaturedCollection />

      {/* 3. Product Showcase (2-column editorial layout) */}
      <CuratedShowcase />

      {/* 4. Lookbook / Visual Campaign (Full-width magazine spread) */}
      <LookbookCampaignSection />

      {/* 5. Brand Statement (Whitespace & typography) */}
      <BrandPhilosophy />

      {/* 6. Craftsmanship & Atelier Standards */}
      <AtelierProcess />
    </PageTransition>
  );
}
