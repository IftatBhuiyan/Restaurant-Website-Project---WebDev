export default function PageHeader({ title, subtitle }) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-normal text-charcoal md:text-4xl">{title}</h1>
      {subtitle ? (
        <p className="mt-2 max-w-2xl text-base text-charcoal/75">{subtitle}</p>
      ) : null}
    </div>
  );
}
