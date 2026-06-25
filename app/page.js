import Hero from "@/components/Hero";
import GallerySlider from "@/components/GallerySlider";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Section>
        <Card>
          <h2 className="text-2xl font-normal text-charcoal">Welcome</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-charcoal/80">
            Welcome to The Corner Grill. This site uses React and Next.js while
            keeping the same pages and features from the original HTML version.
          </p>
        </Card>
      </Section>
      <Section>
        <Card>
          <GallerySlider />
        </Card>
      </Section>
    </>
  );
}
