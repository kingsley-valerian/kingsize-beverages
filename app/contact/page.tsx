"use client";

import Link from "next/link";

const contactOptions = [
  {
    label: "Call KINGSIZE",
    title: "+234 816 339 1254",
    description:
      "Speak with us about wholesale supply, availability, quantities and delivery.",
    href: "tel:+2348163391254",
    action: "Call now",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-6 w-6"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    title: "+234 816 339 1254",
    description:
      "Send us a quick message and tell us what drinks your business needs.",
    href: "https://wa.me/2348163391254?text=Hello%20KINGSIZE%20BEVERAGES%2C%20I%27d%20like%20to%20make%20a%20wholesale%20enquiry.",
    action: "Chat on WhatsApp",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-6 w-6"
      >
        <path d="M20 11.5a8.5 8.5 0 0 1-12.68 7.38L3 20l1.18-4.17A8.5 8.5 0 1 1 20 11.5Z" />
        <path d="M8.5 8.5c.2-.45.42-.47.72-.48h.3c.2 0 .4.08.52.32l.62 1.42c.1.24.07.43-.08.62l-.42.52c-.13.16-.18.3-.08.5.22.45.57.86 1.02 1.2.48.37 1 .64 1.58.83.2.07.35.04.48-.11l.55-.65c.14-.17.31-.21.53-.12l1.35.64c.22.1.34.22.35.4.01.2-.04.72-.25 1-.21.28-.73.55-1.02.59-.29.04-.67.02-1.08-.1a9.2 9.2 0 0 1-3.04-1.63 10.3 10.3 0 0 1-2.18-2.37c-.45-.67-.73-1.28-.82-1.72-.09-.44-.02-.79.03-.94Z" />
      </svg>
    ),
  },
  {
    label: "Email",
    title: "kingsleyvalerian6@gmail.com",
    description:
      "For detailed wholesale enquiries, business requests and supply discussions.",
    href: "mailto:kingsleyvalerian6@gmail.com?subject=KINGSIZE%20Wholesale%20Enquiry",
    action: "Send an email",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-6 w-6"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
  },
];

const businessNeeds = [
  "Wholesale beverage supply",
  "Bulk orders",
  "Retail & supermarket supply",
  "Restaurant & hospitality supply",
  "Event & catering supply",
  "Reseller & distributor enquiries",
];

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      {/* HEADER */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#071426]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <Link href="/" className="shrink-0">
            <img
              src="/brand/kingsize-logo.png"
              alt="KINGSIZE BEVERAGES"
              className="h-auto w-[94px] object-contain sm:w-[106px]"
            />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            <Link
              href="/"
              className="text-sm font-medium text-white/75 transition hover:text-white"
            >
              Home
            </Link>

            <Link
              href="/products"
              className="text-sm font-medium text-white/75 transition hover:text-white"
            >
              Products
            </Link>

            <Link
              href="/#business"
              className="text-sm font-medium text-white/75 transition hover:text-white"
            >
              Who We Supply
            </Link>

            <Link
              href="/#about"
              className="text-sm font-medium text-white/75 transition hover:text-white"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="text-sm font-medium text-white"
            >
              Contact
            </Link>
          </nav>

          <Link
            href="/quote"
            className="hidden items-center gap-2 rounded-full bg-[#e21d2f] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-red-950/20 transition hover:-translate-y-0.5 hover:bg-[#c91829] sm:inline-flex"
          >
            Request a Quote
            <ArrowIcon />
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#071426] pt-[76px]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=2000&q=85"
            alt=""
            className="h-full w-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071426] via-[#071426]/95 to-[#071426]/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071426] via-transparent to-transparent" />
        </div>

        <div className="relative mx-auto grid min-h-[610px] max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:px-10 lg:py-24">
          <div className="max-w-2xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/70 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e21d2f]" />
              KINGSIZE BEVERAGES
            </div>

            <h1 className="text-5xl font-semibold leading-[1.02] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
              Let&apos;s talk about
              <span className="block text-[#e21d2f]">your supply.</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-white/65 sm:text-lg">
              Need beverages for your store, restaurant, event, office or
              resale business? Talk directly with KINGSIZE and let&apos;s work
              out what you need.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/quote"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#e21d2f] px-6 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#c91829]"
              >
                Request a Quote
                <ArrowIcon />
              </Link>

              <a
                href="https://wa.me/2348163391254?text=Hello%20KINGSIZE%20BEVERAGES%2C%20I%27d%20like%20to%20make%20a%20wholesale%20enquiry."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-4 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
              >
                Chat on WhatsApp
                <ArrowIcon />
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[500px] lg:ml-auto">
            <div className="absolute -right-5 top-8 h-28 w-28 rounded-full bg-[#e21d2f]/25 blur-3xl" />
            <div className="absolute -bottom-8 left-5 h-32 w-32 rounded-full bg-blue-500/15 blur-3xl" />

            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/10 p-3 shadow-2xl backdrop-blur-md">
              <div className="relative overflow-hidden rounded-[24px]">
                <img
                  src="https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=1200&q=85"
                  alt="Beverages ready for supply"
                  className="h-[390px] w-full object-cover sm:h-[450px]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#071426]/80 via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5 right-5">
                  <div className="rounded-2xl border border-white/15 bg-[#071426]/75 p-5 backdrop-blur-xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
                      Wholesale supply
                    </p>
                    <p className="mt-2 text-xl font-semibold text-white">
                      Built around what your business needs.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-xl sm:left-0">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                Talk to us
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                +234 816 339 1254
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT OPTIONS */}
      <section className="bg-white px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e21d2f]">
              Get in touch
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-5xl">
              Choose how you want to reach us.
            </h2>

            <p className="mt-5 text-base leading-7 text-slate-500">
              Whether you want a quick WhatsApp conversation or a detailed
              wholesale enquiry, KINGSIZE is ready to hear from you.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {contactOptions.map((option) => (
              <a
                key={option.label}
                href={option.href}
                target={option.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  option.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="group rounded-[28px] border border-slate-200 bg-white p-7 shadow-[0_12px_40px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_20px_55px_rgba(15,23,42,0.09)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#071426] text-white">
                  {option.icon}
                </div>

                <p className="mt-7 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                  {option.label}
                </p>

                <h3 className="mt-2 break-words text-lg font-semibold text-slate-950">
                  {option.title}
                </h3>

                <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-500">
                  {option.description}
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#e21d2f]">
                  {option.action}
                  <span className="transition-transform group-hover:translate-x-1">
                    <ArrowIcon />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* BUSINESS ENQUIRY */}
      <section className="bg-[#f5f7fa] px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e21d2f]">
              Wholesale enquiries
            </p>

            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.035em] text-slate-950 sm:text-5xl">
              Tell us what your business needs.
            </h2>

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-500">
              KINGSIZE supplies a broad range of beverage categories for
              businesses that need dependable access to drinks in practical
              wholesale quantities.
            </p>

            <Link
              href="/quote"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#071426] px-6 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#0d203a]"
            >
              Start a wholesale enquiry
              <ArrowIcon />
            </Link>
          </div>

          <div className="rounded-[30px] border border-slate-200 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:p-9">
            <p className="text-sm font-semibold text-slate-950">
              We can help with
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {businessNeeds.map((need) => (
                <div
                  key={need}
                  className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e21d2f] text-white">
                    <CheckIcon />
                  </span>

                  <span className="text-sm font-medium leading-5 text-slate-700">
                    {need}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-7 rounded-2xl bg-[#071426] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40">
                Good to know
              </p>
              <p className="mt-2 text-sm leading-6 text-white/70">
                Product availability, brands, pack sizes, quantities and
                pricing can vary. Send us your requirements and we&apos;ll
                discuss the best available options.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LIFESTYLE SECTION */}
      <section className="overflow-hidden bg-white px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_.9fr] lg:items-center">
          <div className="relative min-h-[470px] overflow-hidden rounded-[32px]">
            <img
              src="https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1400&q=85"
              alt="People enjoying drinks together"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#071426]/75 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 right-6">
              <div className="max-w-sm rounded-2xl border border-white/15 bg-[#071426]/75 p-5 backdrop-blur-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
                  More than products
                </p>
                <p className="mt-2 text-xl font-semibold leading-tight text-white">
                  We help keep everyday moments supplied.
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e21d2f]">
              KINGSIZE BEVERAGES
            </p>

            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.035em] text-slate-950 sm:text-5xl">
              From everyday retail to big occasions.
            </h2>

            <p className="mt-6 text-base leading-7 text-slate-500">
              Different businesses need different things. A supermarket may
              need consistent fast-moving stock. A restaurant may need
              selected beverage categories. An event planner may need volume
              for a specific occasion.
            </p>

            <p className="mt-4 text-base leading-7 text-slate-500">
              That&apos;s why our wholesale approach starts with your
              requirements, not a one-size-fits-all catalogue.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 p-5">
                <p className="text-sm font-semibold text-slate-950">
                  Practical supply
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Focused on what businesses actually need to keep moving.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-5">
                <p className="text-sm font-semibold text-slate-950">
                  Flexible enquiries
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Tell us your category, quantity and delivery requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#071426] px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e21d2f]">
            Ready when you are
          </p>

          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] text-white sm:text-5xl lg:text-6xl">
            Let&apos;s get your next order moving.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/55 sm:text-lg">
            Send your requirements through our wholesale enquiry form or
            contact KINGSIZE directly on WhatsApp.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#e21d2f] px-7 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#c91829]"
            >
              Request a Quote
              <ArrowIcon />
            </Link>

            <a
              href="https://wa.me/2348163391254?text=Hello%20KINGSIZE%20BEVERAGES%2C%20I%27d%20like%20to%20make%20a%20wholesale%20enquiry."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              WhatsApp KINGSIZE
              <ArrowIcon />
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#040c18] px-5 pb-8 pt-14 text-white sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-[1.2fr_.8fr_.8fr]">
            <div>
              <Link href="/">
                <img
                  src="/brand/kingsize-logo.png"
                  alt="KINGSIZE BEVERAGES"
                  className="h-auto w-[120px] object-contain"
                />
              </Link>

              <p className="mt-5 max-w-sm text-sm leading-6 text-white/45">
                Wholesale beverage supply for retailers, hospitality
                businesses, events, resellers and organisations.
              </p>

              <a
                href="https://wa.me/2348163391254?text=Hello%20KINGSIZE%20BEVERAGES%2C%20I%27d%20like%20to%20make%20a%20wholesale%20enquiry."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-[#e21d2f]"
              >
                WhatsApp: +234 816 339 1254
                <ArrowIcon />
              </a>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/35">
                Explore
              </p>

              <div className="mt-5 grid gap-3">
                <Link
                  href="/"
                  className="text-sm text-white/60 transition hover:text-white"
                >
                  Home
                </Link>

                <Link
                  href="/products"
                  className="text-sm text-white/60 transition hover:text-white"
                >
                  Products
                </Link>

                <Link
                  href="/#business"
                  className="text-sm text-white/60 transition hover:text-white"
                >
                  Who We Supply
                </Link>

                <Link
                  href="/quote"
                  className="text-sm text-white/60 transition hover:text-white"
                >
                  Request a Quote
                </Link>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/35">
                Contact
              </p>

              <div className="mt-5 grid gap-3">
                <a
                  href="tel:+2348163391254"
                  className="break-words text-sm text-white/60 transition hover:text-white"
                >
                  +234 816 339 1254
                </a>

                <a
                  href="mailto:kingsleyvalerian6@gmail.com"
                  className="break-words text-sm text-white/60 transition hover:text-white"
                >
                  kingsleyvalerian6@gmail.com
                </a>

                <a
                  href="https://wa.me/2348163391254"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 transition hover:text-white"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/30 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} KINGSIZE BEVERAGES. All rights
              reserved.
            </p>

            <p>Wholesale beverage supply.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}