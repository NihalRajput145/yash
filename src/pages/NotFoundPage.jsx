import React from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/common/PageTransition';

export default function NotFoundPage() {
  return (
    <PageTransition className="pt-36 pb-32 bg-[#faf8f5] text-noir text-center px-6">
      <div className="max-w-md mx-auto space-y-6">
        <span className="text-[10px] tracking-[0.35em] uppercase text-stone-500 font-sans block">
          Error 404 · Atelier Archive
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-light uppercase tracking-tight">
          PIECE NOT FOUND.
        </h1>
        <p className="text-sm text-stone-600 font-serif italic leading-relaxed">
          The silhouette or archive plate you seek may have concluded its edition or shifted within our catalog.
        </p>
        <div className="pt-4">
          <Link
            to="/shop"
            className="inline-block px-8 py-4 bg-noir text-[#faf8f5] text-xs-caps tracking-[0.28em] hover:bg-stone-800 transition-colors"
          >
            Explore The Collection
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}
