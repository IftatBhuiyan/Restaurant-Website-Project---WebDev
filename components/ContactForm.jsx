"use client";

import { useState } from "react";
import Button from "@/components/Button";

const bookingTimes = [
  "11:00 AM",
  "12:30 PM",
  "2:00 PM",
  "5:30 PM",
  "7:00 PM",
  "8:30 PM",
];

const partySizes = ["1 guest", "2 guests", "3 guests", "4 guests", "5+ guests"];

const inputClass =
  "w-full rounded-xl border border-border bg-cream px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/15";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    event.target.reset();
  };

  return (
    <form
      className="rounded-2xl border border-border bg-surface p-6 shadow-sm md:p-8"
      onSubmit={handleSubmit}
    >
      <p className="section-label">Reservation request</p>
      <h2 className="mt-2 text-2xl text-charcoal">Tell us when you are coming</h2>
      <p className="mt-2 text-sm text-ink-muted">
        We will confirm by email. This form is a class-project demo — no real
        booking backend yet.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="date" className="mb-1.5 block text-sm font-medium">
            Date
          </label>
          <input id="date" name="date" type="date" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="time" className="mb-1.5 block text-sm font-medium">
            Preferred time
          </label>
          <select id="time" name="time" required className={inputClass}>
            <option value="">Select a time</option>
            {bookingTimes.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="party" className="mb-1.5 block text-sm font-medium">
            Party size
          </label>
          <select id="party" name="party" required className={inputClass}>
            <option value="">Guests</option>
            {partySizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
            Name
          </label>
          <input id="name" name="name" required className={inputClass} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
            Email
          </label>
          <input id="email" name="email" type="email" required className={inputClass} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="notes" className="mb-1.5 block text-sm font-medium">
            Special requests
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            placeholder="Allergies, celebrations, seating preference..."
            className={`${inputClass} resize-y`}
          />
        </div>
      </div>

      <Button type="submit" className="mt-6 w-full sm:w-auto">
        Request Table
      </Button>

      {submitted ? (
        <p className="mt-4 text-sm font-medium text-brand" role="status">
          Thanks — your request was received. We will reply soon (demo only).
        </p>
      ) : null}
    </form>
  );
}
