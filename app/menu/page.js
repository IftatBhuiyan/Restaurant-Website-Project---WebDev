import MenuCard from "@/components/MenuCard";
import Cart from "@/components/Cart";
import Section from "@/components/ui/Section";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import { menuItems } from "@/data/menuItems";

export default function MenuPage() {
  return (
    <Section>
      <Card>
        <PageHeader
          title="Menu"
          subtitle="Choose a meal and add it to your cart. All prices are in USD."
        />

        <div className="grid gap-6 xl:grid-cols-[1fr_320px] xl:items-start">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {menuItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
          <div className="xl:sticky xl:top-24">
            <Cart />
          </div>
        </div>
      </Card>
    </Section>
  );
}
