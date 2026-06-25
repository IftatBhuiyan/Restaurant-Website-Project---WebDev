import ContactForm from "@/components/ContactForm";
import Section from "@/components/ui/Section";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";

export default function ContactPage() {
  return (
    <Section>
      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
        <Card>
          <PageHeader
            title="Contact"
            subtitle="Visit us or send a quick message. We will reply soon."
          />
          <p className="mb-4 text-sm text-charcoal/75">
            Location: Times Square, New York, NY
          </p>
          <div className="overflow-hidden rounded-lg border border-border">
            <iframe
              title="The Corner Grill map"
              src="https://www.google.com/maps?q=Times+Square,+New+York,+NY&output=embed"
              loading="lazy"
              className="aspect-video min-h-[220px] w-full border-0"
            />
          </div>
        </Card>
        <ContactForm />
      </div>
    </Section>
  );
}
