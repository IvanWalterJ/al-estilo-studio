import { NavBar } from "@/components/ui/NavBar";
import { Hero } from "@/components/sections/Hero";
import { Promise } from "@/components/sections/Promise";
import { Pain } from "@/components/sections/Pain";
import { Solution } from "@/components/sections/Solution";
import { Portfolio } from "@/components/sections/Portfolio";
import { SocialProof } from "@/components/sections/SocialProof";
import { Location } from "@/components/sections/Location";
import { Booking } from "@/components/sections/Booking";
import { Footer } from "@/components/sections/Footer";
import { BookingModalProvider } from "@/components/providers/BookingModalProvider";
import { BookingModal } from "@/components/ui/BookingModal";

export default function Home() {
  return (
    <BookingModalProvider>
      <NavBar />
      <main>
        <Hero />
        <Promise />
        <Pain />
        <Solution />
        <Portfolio />
        <SocialProof />
        <Location />
        <Booking />
      </main>
      <Footer />
      <BookingModal />
    </BookingModalProvider>
  );
}
