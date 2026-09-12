"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";

const categories = [
  "Soft Drinks",
  "Water",
  "Energy Drinks",
  "Malt Drinks",
  "Juices & Yogurts",
  "Milk & Dairy",
  "Alcoholic Beverages",
];

const businessTypes = [
  "Retail / Supermarket",
  "Restaurant / Hospitality",
  "Event / Catering",
  "Reseller / Distributor",
  "Office / Organization",
  "Other",
];

function Arrow({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12h13M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m5 12 4 4L19 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function QuotePage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [businessType, setBusinessType] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [quantity, setQuantity] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");

  const enquirySummary = useMemo(() => {
    if (selectedCategories.length === 0) {
      return "No product categories selected";
    }

    return selectedCategories.join(", ");
  }, [selectedCategories]);

  function toggleCategory(category: string) {
    setSelectedCategories((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category]
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage("");
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      fullName: String(formData.get("fullName") || "").trim(),
      businessName: String(formData.get("businessName") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      businessType,
      categories: selectedCategories,
      quantity: quantity.trim(),
      deliveryLocation: deliveryLocation.trim(),
      requirements: String(formData.get("requirements") || "").trim(),
    };

    if (!businessType) {
      setErrorMessage("Please select your business type.");
      setIsSubmitting(false);
      return;
    }

    if (selectedCategories.length === 0) {
      setErrorMessage("Please select at least one product category.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "We could not send your enquiry."
        );
      }

      setSubmitted(true);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error("Quote submission error:", error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#f7f8fa] text-[#07182e]">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex h-[78px] max-w-[1440px] items-center px-5 sm:px-8 lg:px-12">
            <Link href="/">
              <img
                src="/brand/kingsize-logo.png"
                alt="KINGSIZE BEVERAGES"
                className="w-[100px] object-contain sm:w-[110px]"
              />
            </Link>
          </div>
        </header>

        <section className="relative flex min-h-[calc(100vh-78px)] items-center overflow-hidden">
          <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#d71920]/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative mx-auto w-full max-w-[850px] px-5 py-20 text-center sm:px-8">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#d71920] text-white shadow-[0_20px_60px_rgba(215,25,32,0.25)]">
              <CheckIcon />
            </div>

            <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-[#d71920]">
              Enquiry received
            </p>

            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#07182e] sm:text-6xl">
              Thanks for choosing KINGSIZE.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
              Your wholesale enquiry has been sent successfully. A member of
              the KINGSIZE team can review your requirements and confirm
              availability, quantities and pricing.
            </p>

            <div className="mx-auto mt-10 max-w-xl rounded-[28px] border border-slate-200 bg-white p-6 text-left shadow-[0_20px_70px_rgba(7,24,46,0.07)]">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                Your enquiry
              </p>

              <div className="mt-5 space-y-4">
                <div>
                  <p className="text-xs text-slate-400">Business type</p>
                  <p className="mt-1 text-sm font-semibold text-[#07182e]">
                    {businessType || "Not specified"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Product categories
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#07182e]">
                    {enquirySummary}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Estimated quantity
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#07182e]">
                    {quantity || "Not specified"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Delivery location
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#07182e]">
                    {deliveryLocation || "Not specified"}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#07182e] px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
              >
                Browse catalogue
                <Arrow size={17} />
              </Link>

              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-[#07182e] transition hover:bg-slate-50"
              >
                Back to homepage
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f8fa] text-[#07182e]">
      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-[78px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link href="/">
            <img
              src="/brand/kingsize-logo.png"
              alt="KINGSIZE BEVERAGES"
              className="w-[100px] object-contain sm:w-[110px]"
            />
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/products"
              className="hidden text-sm font-semibold text-slate-600 transition hover:text-[#d71920] sm:block"
            >
              Catalogue
            </Link>

            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold text-[#07182e] transition hover:bg-slate-50"
            >
              <span className="hidden sm:inline">Back home</span>
              <span className="sm:hidden">Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#07182e]">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#d71920]/15 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d71920]">
              Wholesale enquiry
            </p>

            <h1 className="mt-4 text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-white sm:text-6xl">
              Tell us what your business needs.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Give us a few details about your beverage requirements and we'll
              have a clearer picture of how to support your order.
            </p>
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:px-12 lg:py-20">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            {/* MAIN FORM */}
            <div className="space-y-6">
              {/* ERROR */}
              {errorMessage && (
                <div
                  role="alert"
                  className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700"
                >
                  {errorMessage}
                </div>
              )}

              {/* CONTACT */}
              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_15px_50px_rgba(7,24,46,0.05)] sm:p-8">
                <div className="mb-7">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#d71920]">
                    01
                  </span>

                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#07182e]">
                    Your details
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Tell us who we're speaking with so we can respond to your
                    enquiry.
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#07182e]">
                      Full name
                    </span>

                    <input
                      required
                      type="text"
                      name="fullName"
                      placeholder="Your full name"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#d71920] focus:bg-white focus:ring-4 focus:ring-[#d71920]/10"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#07182e]">
                      Business name
                    </span>

                    <input
                      required
                      type="text"
                      name="businessName"
                      placeholder="Your business name"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#d71920] focus:bg-white focus:ring-4 focus:ring-[#d71920]/10"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#07182e]">
                      Phone / WhatsApp
                    </span>

                    <input
                      required
                      type="tel"
                      name="phone"
                      placeholder="e.g. 080..."
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#d71920] focus:bg-white focus:ring-4 focus:ring-[#d71920]/10"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#07182e]">
                      Email address
                    </span>

                    <input
                      required
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#d71920] focus:bg-white focus:ring-4 focus:ring-[#d71920]/10"
                    />
                  </label>
                </div>
              </div>

              {/* BUSINESS TYPE */}
              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_15px_50px_rgba(7,24,46,0.05)] sm:p-8">
                <div className="mb-7">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#d71920]">
                    02
                  </span>

                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#07182e]">
                    Tell us about your business
                  </h2>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {businessTypes.map((type) => {
                    const selected = businessType === type;

                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setBusinessType(type)}
                        className={`rounded-2xl border p-4 text-left transition ${
                          selected
                            ? "border-[#07182e] bg-[#07182e] text-white shadow-lg"
                            : "border-slate-200 bg-slate-50 text-[#07182e] hover:border-slate-300 hover:bg-white"
                        }`}
                      >
                        <span className="flex items-center justify-between gap-3">
                          <span className="text-sm font-semibold">
                            {type}
                          </span>

                          {selected && (
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#d71920]">
                              <CheckIcon />
                            </span>
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* PRODUCTS */}
              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_15px_50px_rgba(7,24,46,0.05)] sm:p-8">
                <div className="mb-7">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#d71920]">
                    03
                  </span>

                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#07182e]">
                    What would you like to supply?
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Select as many categories as you need.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {categories.map((category) => {
                    const selected = selectedCategories.includes(category);

                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() => toggleCategory(category)}
                        className={`flex items-center justify-between rounded-2xl border p-4 text-left transition ${
                          selected
                            ? "border-[#d71920] bg-[#d71920]/5"
                            : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white"
                        }`}
                      >
                        <span
                          className={`text-sm font-semibold ${
                            selected ? "text-[#d71920]" : "text-[#07182e]"
                          }`}
                        >
                          {category}
                        </span>

                        <span
                          className={`flex h-6 w-6 items-center justify-center rounded-full border transition ${
                            selected
                              ? "border-[#d71920] bg-[#d71920] text-white"
                              : "border-slate-300 bg-white"
                          }`}
                        >
                          {selected && <CheckIcon />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ORDER DETAILS */}
              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_15px_50px_rgba(7,24,46,0.05)] sm:p-8">
                <div className="mb-7">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#d71920]">
                    04
                  </span>

                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#07182e]">
                    Order requirements
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Give us an estimate. You can always discuss exact
                    quantities with the team.
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#07182e]">
                      Estimated quantity
                    </span>

                    <input
                      required
                      type="text"
                      value={quantity}
                      onChange={(event) => setQuantity(event.target.value)}
                      placeholder="e.g. 20 cases, 100 packs"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#d71920] focus:bg-white focus:ring-4 focus:ring-[#d71920]/10"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#07182e]">
                      Delivery location
                    </span>

                    <input
                      required
                      type="text"
                      value={deliveryLocation}
                      onChange={(event) =>
                        setDeliveryLocation(event.target.value)
                      }
                      placeholder="City / area"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#d71920] focus:bg-white focus:ring-4 focus:ring-[#d71920]/10"
                    />
                  </label>
                </div>

                <label className="mt-5 block">
                  <span className="mb-2 block text-sm font-semibold text-[#07182e]">
                    Additional requirements
                  </span>

                  <textarea
                    name="requirements"
                    rows={6}
                    placeholder="Tell us about specific brands, pack sizes, delivery timing or anything else we should know..."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#d71920] focus:bg-white focus:ring-4 focus:ring-[#d71920]/10"
                  />
                </label>
              </div>

              {/* SUBMIT */}
              <div className="rounded-[28px] bg-[#07182e] p-6 sm:p-8">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      Ready to send your enquiry?
                    </h2>

                    <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
                      Submit your requirements and we'll use the information
                      provided to understand what you're looking for.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-[#d71920] px-7 py-4 text-sm font-bold text-white shadow-[0_15px_40px_rgba(215,25,32,0.25)] transition hover:-translate-y-0.5 hover:bg-[#b9141b] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send enquiry
                        <span className="transition group-hover:translate-x-1">
                          <Arrow size={18} />
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* SIDE PANEL */}
            <aside className="lg:sticky lg:top-8 lg:h-fit">
              <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_20px_70px_rgba(7,24,46,0.08)]">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=85"
                    alt="Beverages ready for supply"
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#07182e]/80 via-transparent to-transparent" />

                  <div className="absolute bottom-5 left-5">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/60">
                      KINGSIZE
                    </p>

                    <p className="mt-1 text-xl font-semibold text-white">
                      Built for wholesale.
                    </p>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                    What happens next
                  </p>

                  <div className="mt-6 space-y-5">
                    {[
                      {
                        number: "01",
                        title: "We review",
                        text: "Your requirements are reviewed so we understand what you need.",
                      },
                      {
                        number: "02",
                        title: "We confirm",
                        text: "Availability, brands, pack sizes and quantities can then be discussed.",
                      },
                      {
                        number: "03",
                        title: "We quote",
                        text: "You receive the information needed to move forward with your order.",
                      },
                    ].map((item) => (
                      <div key={item.number} className="flex gap-4">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-[#07182e]">
                          {item.number}
                        </span>

                        <div>
                          <h3 className="text-sm font-semibold text-[#07182e]">
                            {item.title}
                          </h3>

                          <p className="mt-1 text-xs leading-5 text-slate-500">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 rounded-2xl border border-[#d71920]/10 bg-[#d71920]/5 p-4">
                    <p className="text-xs leading-5 text-slate-600">
                      <span className="font-semibold text-[#d71920]">
                        Good to know:
                      </span>{" "}
                      You don't need to know exact product quantities before
                      contacting us. Give us your best estimate and we can
                      discuss the details.
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </form>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#061426] text-white">
        <div className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/">
              <img
                src="/brand/kingsize-logo.png"
                alt="KINGSIZE BEVERAGES"
                className="w-[110px]"
              />
            </Link>

            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} KINGSIZE BEVERAGES. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: #f7f8fa;
        }

        ::selection {
          background: #d71920;
          color: white;
        }
      `}</style>
    </main>
  );
}