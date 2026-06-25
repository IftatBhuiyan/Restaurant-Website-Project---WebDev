export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 md:py-10 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <h2 className="text-lg font-normal text-charcoal">Business Hours</h2>
            <p className="mt-2 text-sm text-charcoal/75">Mon–Fri: 10am – 10pm</p>
            <p className="text-sm text-charcoal/75">Sat–Sun: 11am – 11pm</p>
          </div>
          <div>
            <h2 className="text-lg font-normal text-charcoal">Follow Us</h2>
            <div className="mt-2 flex flex-wrap gap-4 text-sm">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-brand underline-offset-2 hover:underline"
              >
                Facebook
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-brand underline-offset-2 hover:underline"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
