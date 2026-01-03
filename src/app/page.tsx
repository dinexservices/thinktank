"use client"
import React, { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';


import AboutEvent from '@/components/AboutEvent';
import EventHighlights from '@/components/EventHighlights';
import SponsorsMarquee from '@/components/SponsorsMarquee';
import EventSchedule from '@/components/EventSchedule';
import SponsorForm from '@/components/SponsorForm';

import RegistrationForm from '@/components/RegistrationForm';
import Footer from '@/components/Footer';
import VenueLocation from '@/components/VenueLocation';
import { Lightbulb, Users, Target, Laptop, Tv } from 'lucide-react';

const App: React.FC = () => {
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        <div>
          <Hero />
        </div>
        <div>
          <AboutEvent />
        </div>

        <div>
          <EventHighlights />
        </div>
        <div>
          <SponsorsMarquee />
        </div>
        <div>
          <EventSchedule />
        </div>
        {/* Section 2: About */}



        {/* Section 5.5: Venue Location */}
        <VenueLocation />

        {/* Section 6: Sponsor CTA */}
        <section className="py-16 bg-blue-600">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8">Ready to Sponsor?</h2>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-12">
                Get high-impact on-ground visibility and direct interaction with the next generation of industry leaders.
              </p>
              <button
                onClick={() => setIsSponsorModalOpen(true)}
                className="inline-block bg-white text-blue-600 font-black px-12 py-5 rounded-2xl text-xl hover:bg-blue-50 transition-all shadow-2xl"
              >
                Request Sponsorship Deck
              </button>
            </div>
          </div>
        </section>

        {/* Sponsor Modal */}
        {isSponsorModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <SponsorForm onClose={() => setIsSponsorModalOpen(false)} />
          </div>
        )}
      </main>

    </div>
  );
};

export default App;
