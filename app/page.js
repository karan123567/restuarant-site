import GalleryMasonry from "@/components/sections/GalleryMasonry";
import HeroSection from "@/components/sections/HeroSection";
import MenuGrid from "@/components/sections/MenuGrid";
import ReservationForm from "@/components/sections/Reservationform";
import Footer from "@/components/shared/Footer";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <MenuGrid />
      <GalleryMasonry />
      <ReservationForm />
      <Footer />
    </main>  
  );
}
