import AppBarComponent from "@/components/appBar";
import VideoBanner from "@/components/VideoBanner";
import Section from "@/components/section";
import TestimonialsSection from "@/components/TestimonialsSection";
import SectionDivider from "@/components/SectionDivider";
import FooterBanner from "@/components/footerBanner";

export default function Home() {
  return (
    <div>
      <AppBarComponent />
      <VideoBanner />
      <Section
        title="¡Juega a Quién es Quién y encuentra tu caricatura!"
        paragraph1={`Si visitaste nuestro stand y te hiciste un retrato con nuestro robot, ¡ahora es el momento de encontrar a tu alter ego en versión caricatura!<br />
Juega a nuestro “Quién es Quién”, identifica tu caricatura entre la multitud y descarga a tu gemelo digital.`}
        paragraph2="Aviso: hay muchas probabilidades de que te rías al ver tu propia cara en versión pixel-perfect."
        buttonText="Juega ahora →"
        secondaryButtonText="Juega en 3D →"
        buttonLink="/whoIsWho"
        imageSrc="/robotImage.png"
        imageAlt="Team collaboration - Woman and man working together on laptop"
        imagePosition="right"
      />
      <TestimonialsSection />
      <FooterBanner />
    </div>
  );
}
