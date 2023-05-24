import React from 'react';
import Header from '~/components/layout/Header';
import Footer from '~/components/layout/Footer';
import HeroSection from '~/components/ui/HeroSection';
import Cards from '~/components/ui/Cards';

function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <Cards />
      <Footer />
    </>
  );
}

export default Home;