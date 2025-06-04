import GridCanvas from "@/components/grid-canvas";
import Introduction from "@/components/introduction";
import FreelanceWorkSection from "@/components/freelance-work-section";
import PetProjectsSection from "@/components/pet-projects-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <GridCanvas />
      <Introduction />
      <FreelanceWorkSection />
      <PetProjectsSection />
      <Footer />
    </>
  );
}
