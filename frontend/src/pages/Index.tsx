import { useState, useEffect } from "react";
import Header from "@/components/Header";
import HeroWithStats from "@/components/HeroWithStats";
import MostPopularContent from "@/components/MostPopularContent";
import CategorySection from "@/components/CategorySection";
import ResourceCenter from "@/components/ResourceCenter";
import PopularContent from "@/components/PopularContent";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <PageLoader message="Loading Sunbird..." />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroWithStats />
        <MostPopularContent />
        <CategorySection />
        <ResourceCenter />
        <PopularContent />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
