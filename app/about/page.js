import Section from "@/components/ui/Section";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";

export default function AboutPage() {
  return (
    <Section>
      <Card>
        <PageHeader title="About The Corner Grill" />
        <div className="space-y-4 text-base leading-relaxed text-charcoal/80">
          <p>
            The Corner Grill began as a small local spot with a simple goal:
            good food, fair price, and a calm place for people to eat together.
          </p>
          <p>
            We keep the menu focused and simple so guests can quickly pick
            favorites.
          </p>
        </div>
      </Card>
    </Section>
  );
}
