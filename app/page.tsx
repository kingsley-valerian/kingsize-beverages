"use client";

import {
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import Link from "next/link";

type Category = {
  name: string;
  eyebrow: string;
  label: string;
  image: string;
  imageFit: "cover" | "contain";
  productLabel?: string;
  secondaryImage?: string;
};

const categories: Category[] = [
  {
    name: "Soft Drinks",
    eyebrow: "01 / Everyday refreshment",
    label: "Coca-Cola, Fanta, Sprite, Pepsi, Mirinda and more.",
    image:
      "https://images.unsplash.com/photo-1629203849820-fdd70d49c38e?auto=format&fit=crop&w=1200&q=90",
    imageFit: "cover" as const,
  },
  {
    name: "Water",
    eyebrow: "02 / Pure hydration",
    label: "EVA table water for homes, offices, businesses and events.",
    image:
      "https://www.chomart.com/storage/images/eva-bottled-water-75cl-x-12-gxxmr32465.webp",
    imageFit: "contain" as const,
    productLabel: "EVA TABLE WATER",
  },
  {
    name: "Energy Drinks",
    eyebrow: "03 / Keep moving",
    label: "Popular energy drinks for retail, hospitality and events.",
    image:
      "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=1200&q=90",
    imageFit: "cover" as const,
  },
  {
    name: "Juices & Yogurts",
    eyebrow: "04 / Fresh choices",
    label: "Juices, yogurt drinks and refreshing everyday favourites.",
    image:
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=1200&q=90",
    imageFit: "cover" as const,
  },
  {
    name: "Malt Drinks",
    eyebrow: "05 / Rich & satisfying",
    label:
      "Amstel Malta and other popular malt beverages for shops, hospitality and events.",
    image:
      "https://i.ebayimg.com/images/g/SrUAAeSwULxpLEsZ/s-l1200.jpg",
    imageFit: "contain" as const,
    productLabel: "AMSTEL MALTA",
  },
  {
    name: "Milk & Dairy",
    eyebrow: "06 / Everyday essentials",
    label:
      "Hollandia yoghurt and full cream evaporated milk for everyday consumption and business supply.",
    image:
      "https://hollandiadairyng.com/assets/imgs/products-dp/prdts_yoghurt_plainSweetened.png",
    secondaryImage:
      "https://hollandiadairyng.com/assets/imgs/products-dp/prdts_fullCream_evaporated.png",
    imageFit: "contain" as const,
    productLabel: "HOLLANDIA",
  },
];

const mobileNavItems = [
  {
    label: "Products",
    href: "/products",
    number: "01",
    accent: "text-sky-300",
    activeBg: "bg-sky-400/10",
    border: "border-sky-300/30",
    indicator: "bg-sky-300",
  },
  {
    label: "For Business",
    href: "#business",
    number: "02",
    accent: "text-red-400",
    activeBg: "bg-red-500/10",
    border: "border-red-400/30",
    indicator: "bg-red-400",
  },
  {
    label: "About",
    href: "#about",
    number: "03",
    accent: "text-emerald-300",
    activeBg: "bg-emerald-400/10",
    border: "border-emerald-300/30",
    indicator: "bg-emerald-300",
  },
  {
    label: "Contact",
    href: "/contact",
    number: "04",
    accent: "text-amber-300",
    activeBg: "bg-amber-400/10",
    border: "border-amber-300/30",
    indicator: "bg-amber-300",
  },
];

const products = [
  {
    name: "Soft Drinks",
    category: "Popular brands",
    description:
      "Stock everyday favourites customers already recognise and ask for.",
    brands: "Coca-Cola • Fanta • Sprite • Pepsi • Mirinda",
    image:
      "https://images.unsplash.com/photo-1629203849820-fdd70d49c38e?auto=format&fit=crop&w=1200&q=90",
  },
  {
    name: "Water & Hydration",
    category: "Everyday essentials",
    description:
      "Keep your shelves, tables and events supplied with bottled water.",
    brands: "Bottled water • Still water • Event supply",
    image:
      "https://www.chomart.com/storage/images/eva-bottled-water-75cl-x-12-gxxmr32465.webp",
  },
  {
    name: "Energy & Malt",
    category: "Fast-moving drinks",
    description:
      "Give customers more choice with popular energy and malt beverages.",
    brands: "Amstel Malta • Energy drinks • Selected beverages",
    image:
      "https://i.ebayimg.com/images/g/SrUAAeSwULxpLEsZ/s-l1200.jpg",
  },
];

const businessTypes = [
  {
    title: "Retail",
    number: "01",
    text: "Keep your shelves stocked with fast-moving beverage products your customers already know.",
    image:
      "https://images.unsplash.com/photo-1629203849820-fdd70d49c38e?auto=format&fit=crop&w=1400&q=90",
  },
  {
    title: "Hospitality",
    number: "02",
    text: "Give restaurants, cafés, hotels and hospitality businesses a dependable beverage supply partner.",
    image:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1400&q=90",
  },
  {
    title: "Events",
    number: "03",
    text: "From intimate gatherings to large events, get the drinks you need to keep people refreshed.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=90",
  },
];

const reasons = [
  {
    number: "01",
    title: "Wide beverage selection",
    text: "From everyday soft drinks and water to energy drinks, malt, juices and dairy beverages.",
  },
  {
    number: "02",
    title: "Wholesale focused",
    text: "We are built around the needs of businesses buying beverages for resale, service or events.",
  },
  {
    number: "03",
    title: "Straightforward ordering",
    text: "Tell us what you need, discuss quantities and delivery requirements, then confirm your order.",
  },
  {
    number: "04",
    title: "Business-ready support",
    text: "A dependable supply partner should make restocking easier, not create more work.",
  },
];

const orderingSteps = [
  {
    number: "01",
    title: "Tell us what you need",
    text: "Share the beverages, brands and quantities your business requires.",
  },
  {
    number: "02",
    title: "Get your quote",
    text: "We'll review your requirements and discuss current availability and pricing.",
  },
  {
    number: "03",
    title: "Confirm your order",
    text: "Agree on quantities, delivery details and the order requirements.",
  },
  {
    number: "04",
    title: "Receive your supply",
    text: "Your beverages are prepared for the agreed fulfilment arrangement.",
  },
];

const lifestyleImages = [
  {
    src: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1800&q=90",
    alt: "People enjoying time together",
    className: "lg:col-span-7 lg:row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=90",
    alt: "People sharing a social moment",
    className: "lg:col-span-5",
  },
  {
    src: "https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=1200&q=90",
    alt: "Refreshing beverage",
    className: "lg:col-span-5",
  },
];

function Arrow({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

export default function Home() {
  const categoryRef = useRef<HTMLDivElement>(null);

  const categoryDragging = useRef(false);
  const categoryDragStartX = useRef(0);
  const categoryDragStartScrollLeft = useRef(0);

  const [scrolled, setScrolled] = useState(false);
  const [mobileNavCompact, setMobileNavCompact] = useState(false);
  const [activeBusiness, setActiveBusiness] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Products");
  const [activeProduct, setActiveProduct] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;

      setScrolled(y > 40);
      setMobileNavCompact(y > 120);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const scrollCategories = (direction: "left" | "right") => {
    if (!categoryRef.current) return;

    categoryRef.current.scrollBy({
      left: direction === "right" ? 390 : -390,
      behavior: "smooth",
    });
  };

  const handleCategoryMouseDown = (
    event: ReactMouseEvent<HTMLDivElement>
  ) => {
    if (!categoryRef.current) return;

    if (event.button !== 0) return;

    categoryDragging.current = true;
    categoryDragStartX.current = event.clientX;
    categoryDragStartScrollLeft.current = categoryRef.current.scrollLeft;

    categoryRef.current.classList.add("cursor-grabbing");
    categoryRef.current.classList.add("dragging");

    event.preventDefault();
  };

  const handleCategoryMouseMove = (
    event: ReactMouseEvent<HTMLDivElement>
  ) => {
    if (!categoryDragging.current || !categoryRef.current) return;

    const distance = event.clientX - categoryDragStartX.current;

    categoryRef.current.scrollLeft =
      categoryDragStartScrollLeft.current - distance;
  };

  const stopCategoryDragging = () => {
    if (!categoryRef.current) return;

    categoryDragging.current = false;

    categoryRef.current.classList.remove("cursor-grabbing");
    categoryRef.current.classList.remove("dragging");
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <main className="min-w-0 overflow-x-hidden bg-white text-[#09294b]">
      <style jsx global>{`
        @keyframes kingsizeFloat {
          0%,
          100% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-12px);
          }
        }

        @keyframes kingsizeFloatSlow {
          0%,
          100% {
            transform: translateY(0px) rotate(3deg);
          }

          50% {
            transform: translateY(-18px) rotate(1deg);
          }
        }

        @keyframes kingsizeMarquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        @keyframes kingsizePulse {
          0%,
          100% {
            opacity: 0.45;
          }

          50% {
            opacity: 1;
          }
        }

        .kingsize-float {
          animation: kingsizeFloat 5s ease-in-out infinite;
        }

        .kingsize-float-slow {
          animation: kingsizeFloatSlow 7s ease-in-out infinite;
        }

        .kingsize-pulse {
          animation: kingsizePulse 2.5s ease-in-out infinite;
        }

        .kingsize-marquee {
          animation: kingsizeMarquee 28s linear infinite;
        }

        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .category-drag-rail {
          cursor: grab;
        }

        .category-drag-rail.dragging {
          cursor: grabbing;
        }

        .category-drag-rail.dragging * {
          cursor: grabbing !important;
          user-select: none !important;
        }

        .category-drag-rail img {
          -webkit-user-drag: none;
          user-select: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .kingsize-float,
          .kingsize-float-slow,
          .kingsize-pulse,
          .kingsize-marquee {
            animation: none;
          }

          html {
            scroll-behavior: auto;
          }
        }
      `}</style>

      {/* =========================================================
          NAVIGATION
      ========================================================== */}

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-black/10 bg-white/95 shadow-sm backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-500 sm:px-8 lg:h-[74px] lg:px-10 ${
            mobileNavCompact ? "h-[58px]" : "h-[74px]"
          }`}
        >
          {/* MOBILE/RESPONSIVE LOGO */}
          <Link
            href="/"
            onClick={closeMenu}
            className={`relative z-[60] flex shrink-0 items-center overflow-hidden transition-all duration-500 ${
              mobileNavCompact
                ? "pointer-events-none w-0 -translate-x-3 opacity-0"
                : "w-[82px] sm:w-[92px]"
            } lg:pointer-events-auto lg:w-auto lg:translate-x-0 lg:opacity-100`}
            aria-label="Kingsize Beverages home"
          >
            <img
              src="/brand/kingsize-logo.png"
              alt="KINGSIZE BEVERAGES"
              className={`block h-auto w-[82px] object-contain transition-all duration-500 sm:w-[92px] lg:w-[106px] ${
                scrolled
                  ? ""
                  : "drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
              }`}
              draggable={false}
            />
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav
            className={`hidden items-center gap-7 lg:flex ${
              scrolled ? "text-gray-800" : "text-white"
            }`}
          >
            <Link
              href="/products"
              className="text-sm font-bold transition hover:text-[#c8102e]"
            >
              Products
            </Link>

            <Link
              href="#business"
              className="text-sm font-bold transition hover:text-[#c8102e]"
            >
              For Business
            </Link>

            <Link
              href="#about"
              className="text-sm font-bold transition hover:text-[#c8102e]"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="text-sm font-bold transition hover:text-[#c8102e]"
            >
              Contact
            </Link>
          </nav>

          {/* DESKTOP QUOTE CTA */}
          <Link
            href="/quote"
            className="ml-2 hidden h-10 shrink-0 items-center justify-center rounded-full bg-[#c8102e] px-5 text-sm font-bold text-white shadow-lg shadow-red-900/10 transition hover:-translate-y-0.5 hover:bg-[#9f0d24] sm:inline-flex lg:ml-3"
          >
            Request a Quote
          </Link>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            aria-label={
              menuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className={`relative z-[60] flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-300 lg:hidden ${
              menuOpen
                ? "border-white/20 bg-white text-[#061d36]"
                : scrolled
                  ? "border-black/10 bg-white text-[#061d36] shadow-sm"
                  : "border-white/30 bg-white/10 text-white backdrop-blur-md"
            }`}
          >
            {menuOpen ? (
              <CloseIcon />
            ) : (
              <svg
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* SOLID MOBILE NAVIGATION DRAWER */}
        <div
          className={`fixed inset-0 z-50 bg-[#061d36] text-white transition-all duration-500 lg:hidden ${
            menuOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-3 opacity-0"
          }`}
        >
          <div className="flex min-h-full flex-col overflow-y-auto bg-[#061d36] px-6 pb-8 pt-[92px]">
            {/* DRAWER BRAND HEADER */}
            <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/40">
                  KINGSIZE BEVERAGES
                </p>
                <p className="mt-1 text-sm font-semibold text-white/70">
                  Wholesale beverage supply
                </p>
              </div>

              <span className="h-2.5 w-2.5 rounded-full bg-[#c8102e]" />
            </div>

            {/* MOBILE NAVIGATION ITEMS */}
            <nav className="flex-1">
              {mobileNavItems.map((item) => {
                const active = activeNav === item.label;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => {
                      setActiveNav(item.label);
                      setMenuOpen(false);
                    }}
                    className={`group relative flex items-center gap-4 border-b border-white/10 px-2 py-5 transition-all duration-300 ${
                      active ? item.activeBg : "hover:bg-white/[0.04]"
                    }`}
                  >
                    <span
                      className={`absolute left-0 top-1/2 h-9 w-1 -translate-y-1/2 rounded-r-full transition-all duration-300 ${
                        active
                          ? `${item.indicator} scale-y-100`
                          : "scale-y-0"
                      }`}
                    />

                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[10px] font-black transition-all ${
                        active
                          ? `${item.accent} ${item.border} ${item.activeBg}`
                          : "border-white/10 text-white/25 group-hover:border-white/20 group-hover:text-white/50"
                      }`}
                    >
                      {item.number}
                    </span>

                    <span
                      className={`flex-1 text-[1.65rem] font-black tracking-[-0.04em] transition-colors ${
                        active
                          ? "text-white"
                          : "text-white/65 group-hover:text-white"
                      }`}
                    >
                      {item.label}
                    </span>

                    <span
                      className={`transition-all duration-300 group-hover:translate-x-1 ${
                        active
                          ? item.accent
                          : "text-white/25 group-hover:text-white/70"
                      }`}
                    >
                      <Arrow size={20} />
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* QUOTE CTA */}
            <div className="mt-8">
              <Link
                href="/quote"
                onClick={() => {
                  setMenuOpen(false);
                }}
                className="flex w-full items-center justify-between rounded-2xl bg-[#c8102e] px-6 py-5 text-base font-black text-white shadow-[0_14px_35px_rgba(200,16,46,0.25)] transition-all duration-300 hover:bg-[#a80d27]"
              >
                <span>Request a wholesale quote</span>
                <Arrow />
              </Link>
            </div>

            {/* SMALL FOOTER DETAIL */}
            <div className="mt-6 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.18em] text-white/30">
              <span>Retail</span>
              <span>Hospitality</span>
              <span>Events</span>
            </div>
          </div>
        </div>
      </header>

      {/* =========================================================
          HERO
      ========================================================== */}

      <section className="relative min-h-[760px] overflow-hidden bg-[#09294b] text-white sm:min-h-[850px]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=2400&q=90"
            alt="People enjoying drinks together"
            className="h-full w-full object-cover object-center opacity-55"
            draggable={false}
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#061d36] via-[#09294b]/80 to-[#09294b]/25" />

          <div className="absolute inset-0 bg-gradient-to-t from-[#061d36] via-transparent to-black/20" />
        </div>

        <div className="absolute -right-48 top-16 h-[580px] w-[580px] rounded-full border border-white/10" />

        <div className="absolute -right-16 top-40 h-[390px] w-[390px] rounded-full border border-white/10" />

        <div className="absolute bottom-20 left-[-80px] h-[220px] w-[220px] rounded-full border border-[#e31b3b]/20" />

        <div className="relative mx-auto flex min-h-[760px] max-w-7xl items-end px-5 pb-16 pt-32 sm:min-h-[850px] sm:px-8 sm:pb-20 lg:items-center lg:pb-0">
          <div className="grid w-full items-center gap-14 lg:grid-cols-[1fr_.82fr]">
            <div className="max-w-3xl">
              <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
                <span className="kingsize-pulse h-2 w-2 rounded-full bg-[#e31b3b]" />

                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/90 sm:text-xs">
                  Wholesale beverage supply
                </span>
              </div>

              <h1 className="max-w-4xl text-[clamp(3.2rem,7vw,6.9rem)] font-black leading-[0.88] tracking-[-0.06em]">
                Your drinks.
                <br />
                <span className="text-[#e31b3b]">Our supply.</span>
              </h1>

              <p className="mt-7 max-w-xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
                KINGSIZE supplies beverages for retailers, hospitality
                businesses, offices, events and organisations that need to
                keep people refreshed.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#products"
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-black text-[#09294b] transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  Explore beverages

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    <Arrow />
                  </span>
                </Link>

                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 px-7 py-4 text-sm font-black text-white backdrop-blur-sm transition duration-300 hover:bg-white hover:text-[#09294b]"
                >
                  Get wholesale pricing
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-xs font-bold text-white/55">
                <span className="flex items-center gap-2">
                  <CheckIcon />
                  Retail supply
                </span>

                <span className="flex items-center gap-2">
                  <CheckIcon />
                  Hospitality
                </span>

                <span className="flex items-center gap-2">
                  <CheckIcon />
                  Events
                </span>
              </div>
            </div>

            <div className="relative hidden h-[520px] lg:block">
              <div className="kingsize-float-slow absolute right-3 top-1/2 w-[380px] -translate-y-1/2 overflow-hidden rounded-[2.2rem] border border-white/20 bg-white/10 p-2 shadow-2xl backdrop-blur-sm">
                <div className="relative h-[500px] overflow-hidden rounded-[1.8rem]">
                  <img
                    src="https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=1200&q=90"
                    alt="Refreshing beverage"
                    className="h-full w-full object-cover"
                    draggable={false}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-[#09294b]">
                    KINGSIZE
                  </div>

                  <div className="absolute inset-x-5 bottom-5 rounded-2xl bg-white p-5 text-[#09294b] shadow-xl">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[.16em] text-[#c8102e]">
                          BEVERAGE SUPPLY
                        </p>

                        <h3 className="mt-2 text-xl font-black sm:text-2xl">
                          Keep business refreshed.
                        </h3>
                      </div>

                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#c8102e] text-white">
                        <Arrow />
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="kingsize-float absolute bottom-7 left-0 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl">
                <p className="text-[9px] font-black uppercase tracking-[.2em] text-white/40">
                  Who we serve
                </p>

                <p className="mt-1 text-sm font-bold">
                  Retail • Hospitality • Events
                </p>
              </div>

              <div className="absolute right-[-15px] top-20 rounded-full bg-[#c8102e] px-5 py-3 text-xs font-black text-white shadow-xl">
                Wholesale
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-[9px] font-black uppercase tracking-[.28em] text-white/40 sm:flex">
          <span className="h-px w-8 bg-white/30" />
          Scroll to explore
          <span className="h-px w-8 bg-white/30" />
        </div>
      </section>

      {/* =========================================================
          BRAND STRIP
      ========================================================== */}

      <section className="overflow-hidden border-b border-gray-100 bg-white py-5">
        <div className="flex min-w-max kingsize-marquee">
          <div className="flex items-center">
            {[
              "Coca-Cola",
              "Fanta",
              "Sprite",
              "Pepsi",
              "Mirinda",
              "Malt Drinks",
              "Energy Drinks",
              "Water",
              "Juices",
              "Yogurts",
              "Milk",
              "Event Supply",
            ].map((brand, index) => (
              <div
                key={`${brand}-${index}`}
                className="flex items-center"
              >
                <span className="px-7 text-sm font-black uppercase tracking-[.12em] text-[#09294b]/35">
                  {brand}
                </span>

                <span className="h-1.5 w-1.5 rounded-full bg-[#c8102e]" />
              </div>
            ))}
          </div>

          <div className="flex items-center">
            {[
              "Coca-Cola",
              "Fanta",
              "Sprite",
              "Pepsi",
              "Mirinda",
              "Malt Drinks",
              "Energy Drinks",
              "Water",
              "Juices",
              "Yogurts",
              "Milk",
              "Event Supply",
            ].map((brand, index) => (
              <div
                key={`${brand}-duplicate-${index}`}
                className="flex items-center"
              >
                <span className="px-7 text-sm font-black uppercase tracking-[.12em] text-[#09294b]/35">
                  {brand}
                </span>

                <span className="h-1.5 w-1.5 rounded-full bg-[#c8102e]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          CATEGORY RAIL
      ========================================================== */}

      <section id="products" className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-black uppercase tracking-[.2em] text-[#c8102e]">
                Explore the range
              </p>

              <h2 className="mt-3 text-4xl font-black tracking-[-.04em] text-[#09294b] sm:text-6xl">
                Drinks for every kind of business.
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
                A broad selection of beverage categories to help businesses
                stock, serve and sell what their customers want.
              </p>
            </div>

            <div className="hidden gap-2 sm:flex">
              <button
                type="button"
                onClick={() => scrollCategories("left")}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 text-[#09294b] transition hover:border-[#c8102e] hover:text-[#c8102e]"
                aria-label="Previous categories"
              >
                ←
              </button>

              <button
                type="button"
                onClick={() => scrollCategories("right")}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 text-[#09294b] transition hover:border-[#c8102e] hover:text-[#c8102e]"
                aria-label="Next categories"
              >
                →
              </button>
            </div>
          </div>
        </div>

        <div
          ref={categoryRef}
          onMouseDown={handleCategoryMouseDown}
          onMouseMove={handleCategoryMouseMove}
          onMouseUp={stopCategoryDragging}
          onMouseLeave={stopCategoryDragging}
          onDragStart={(event) => event.preventDefault()}
          className="category-drag-rail hide-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto select-none px-5 pb-5 sm:px-8 lg:px-[max(2rem,calc((100vw-1280px)/2))]"
        >
          {categories.map((category) => (
            <article
              key={category.name}
              className="group relative min-w-[82vw] snap-start overflow-hidden rounded-[2rem] bg-gray-100 sm:min-w-[340px] lg:min-w-[365px]"
            >
              <div
                className={`relative aspect-[.88] overflow-hidden ${
                  category.imageFit === "contain"
                    ? "bg-gradient-to-br from-[#f8fafc] via-white to-[#eef2f7]"
                    : "bg-gray-100"
                }`}
              >
                {category.secondaryImage ? (
                  <div className="absolute inset-0 grid grid-cols-2 gap-2 p-5">
                    <div className="relative flex items-center justify-center overflow-hidden rounded-2xl bg-white shadow-sm">
                      <img
                        src={category.image}
                        alt="Hollandia Yoghurt"
                        className="h-full w-full object-contain p-4 transition duration-700 group-hover:scale-105"
                        draggable={false}
                      />
                    </div>

                    <div className="relative flex items-center justify-center overflow-hidden rounded-2xl bg-white shadow-sm">
                      <img
                        src={category.secondaryImage}
                        alt="Hollandia Full Cream Evaporated Milk"
                        className="h-full w-full object-contain p-4 transition duration-700 group-hover:scale-105"
                        draggable={false}
                      />
                    </div>
                  </div>
                ) : (
                  <img
                    src={category.image}
                    alt={category.name}
                    className={`h-full w-full transition duration-700 group-hover:scale-105 ${
                      category.imageFit === "contain"
                        ? "object-contain p-10"
                        : "object-cover"
                    }`}
                    draggable={false}
                  />
                )}
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

              {category.productLabel && (
                <div className="absolute left-5 top-5 rounded-full bg-white/95 px-3 py-2 text-[9px] font-black uppercase tracking-[.14em] text-[#09294b] shadow-lg">
                  {category.productLabel}
                </div>
              )}

              <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-7">
                <p className="text-[10px] font-black uppercase tracking-[.18em] text-white/50">
                  {category.eyebrow}
                </p>

                <h3 className="mt-2 text-2xl font-black sm:text-3xl">
                  {category.name}
                </h3>

                <p className="mt-2 max-w-xs text-sm leading-6 text-white/65">
                  {category.label}
                </p>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-white/50">
                    Wholesale supply
                  </span>

                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#09294b] transition duration-300 group-hover:bg-[#c8102e] group-hover:text-white">
                    <Arrow />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* =========================================================
          PRODUCT SHOWCASE
      ========================================================== */}

      <section className="bg-[#f5f6f7] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[.2em] text-[#c8102e]">
                Stock what people know
              </p>

              <h2 className="mt-3 text-4xl font-black tracking-[-.04em] text-[#09294b] sm:text-6xl">
                Familiar brands.
                <br />
                Easy supply.
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-7 text-gray-500 lg:justify-self-end sm:text-base">
              KINGSIZE is a wholesale beverage supplier. Product availability,
              brands and quantities can vary, so tell us what your business
              needs and we can discuss current supply.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {products.map((product, index) => (
              <article
                key={product.name}
                onMouseEnter={() => setActiveProduct(index)}
                className={`group overflow-hidden rounded-[2rem] bg-white transition duration-500 ${
                  activeProduct === index
                    ? "-translate-y-2 shadow-2xl"
                    : "shadow-sm"
                }`}
              >
                <div
                  className={`relative aspect-[1.05] overflow-hidden ${
                    product.name === "Water & Hydration" ||
                    product.name === "Energy & Malt"
                      ? "bg-gradient-to-br from-[#f8fafc] via-white to-[#eef2f7]"
                      : "bg-gray-100"
                  }`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`h-full w-full transition duration-700 group-hover:scale-105 ${
                      product.name === "Water & Hydration" ||
                      product.name === "Energy & Malt"
                        ? "object-contain p-10"
                        : "object-cover"
                    }`}
                    draggable={false}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

                  <div className="absolute left-5 top-5 rounded-full bg-white/95 px-3 py-2 text-[10px] font-black uppercase tracking-wider text-[#09294b]">
                    0{index + 1}
                  </div>
                </div>

                <div className="p-6 sm:p-7">
                  <p className="text-xs font-bold uppercase tracking-[.16em] text-[#c8102e]">
                    {product.category}
                  </p>

                  <h3 className="mt-2 text-2xl font-black text-[#09294b]">
                    {product.name}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-500">
                    {product.description}
                  </p>

                  <p className="mt-4 text-xs font-bold leading-5 text-gray-400">
                    {product.brands}
                  </p>

                  <Link
                    href="/quote"
                    className="group/link mt-6 inline-flex items-center gap-2 text-sm font-black text-gray-900 transition hover:text-[#c8102e]"
                  >
                    Request supply

                    <span className="transition-transform group-hover/link:translate-x-1">
                      <Arrow />
                    </span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          WHY KINGSIZE
      ========================================================== */}

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[.2em] text-[#c8102e]">
                Why KINGSIZE
              </p>

              <h2 className="mt-4 max-w-xl text-4xl font-black leading-[1.02] tracking-[-.04em] text-[#09294b] sm:text-6xl">
                Beverage supply should be simple.
              </h2>

              <p className="mt-6 max-w-lg text-base leading-8 text-gray-500">
                Your business has enough to think about. Getting the drinks
                you need should be straightforward.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {["Retail", "Hospitality", "Events"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#09294b]/10 bg-[#f5f6f7] px-4 py-2 text-xs font-black uppercase tracking-wider text-[#09294b]"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <Link
                href="/quote"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#09294b] px-6 py-4 text-sm font-black text-white transition hover:-translate-y-1 hover:bg-[#c8102e]"
              >
                Talk to KINGSIZE
                <Arrow />
              </Link>
            </div>

            <div className="border-y border-gray-200">
              {reasons.map((reason) => (
                <div
                  key={reason.number}
                  className="group grid gap-5 border-b border-gray-200 py-7 last:border-b-0 sm:grid-cols-[70px_1fr_auto] sm:items-start"
                >
                  <span className="text-sm font-black text-[#c8102e]">
                    {reason.number}
                  </span>

                  <div>
                    <h3 className="text-xl font-black text-[#09294b] sm:text-2xl">
                      {reason.title}
                    </h3>

                    <p className="mt-2 max-w-xl text-sm leading-7 text-gray-500">
                      {reason.text}
                    </p>
                  </div>

                  <span className="hidden text-gray-300 transition group-hover:translate-x-1 group-hover:text-[#c8102e] sm:block">
                    <Arrow />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          PEOPLE / LIFESTYLE
      ========================================================== */}

      <section id="about" className="bg-[#f5f6f7] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-[.82fr_1.18fr]">
            <div className="max-w-xl lg:sticky lg:top-28">
              <p className="text-xs font-black uppercase tracking-[.2em] text-[#c8102e]">
                More than a drink
              </p>

              <h2 className="mt-4 text-4xl font-black leading-[1.02] tracking-[-.04em] text-[#09294b] sm:text-6xl">
                Drinks are part of the moment.
              </h2>

              <p className="mt-7 text-base leading-8 text-gray-500">
                A cold drink after a long day. A stocked restaurant table. A
                busy shop shelf. A celebration with hundreds of guests.
              </p>

              <p className="mt-4 text-base leading-8 text-gray-500">
                Behind all of those moments is a business that needs reliable
                access to the right beverages.
              </p>

              <p className="mt-4 text-base leading-8 text-gray-500">
                That is where KINGSIZE comes in.
              </p>

              <Link
                href="#business"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#09294b] px-6 py-4 text-sm font-black text-white transition hover:-translate-y-1 hover:bg-[#c8102e]"
              >
                See how we help businesses
                <Arrow />
              </Link>
            </div>

            <div className="grid gap-4 sm:gap-5 lg:grid-cols-12 lg:grid-rows-2">
              {lifestyleImages.map((image, index) => (
                <div
                  key={image.src}
                  className={`group relative overflow-hidden rounded-[1.75rem] bg-gray-200 sm:rounded-[2rem] ${image.className}`}
                >
                  <div
                    className={`relative ${
                      index === 0
                        ? "aspect-[1.05] sm:aspect-[1.25]"
                        : "aspect-[1.25]"
                    } h-full min-h-full`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading={index === 0 ? "eager" : "lazy"}
                      draggable={false}
                      className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-[1.035]"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70" />

                    {index === 0 && (
                      <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/95 p-5 text-[#09294b] shadow-xl backdrop-blur-sm sm:bottom-7 sm:left-7 sm:right-7">
                        <p className="text-[10px] font-black uppercase tracking-[.18em] text-[#c8102e]">
                          KINGSIZE IN THE REAL WORLD
                        </p>

                        <p className="mt-2 text-lg font-black sm:text-xl">
                          Supplying the drinks behind everyday moments.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          BUSINESS
      ========================================================== */}

      <section
        id="business"
        className="bg-[#09294b] py-20 text-white sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[.2em] text-[#e31b3b]">
              Built around your business
            </p>

            <h2 className="mt-4 text-4xl font-black leading-[1.02] tracking-[-.04em] sm:text-6xl">
              Different businesses.
              <br />
              One dependable supply partner.
            </h2>

            <p className="mt-6 max-w-2xl leading-7 text-white/60">
              Whether you sell drinks, serve drinks or organise experiences,
              we're here to make beverage supply simpler.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-[.75fr_1.25fr]">
            <div className="relative z-20 flex flex-col gap-2">
              {businessTypes.map((business, index) => {
                const isActive = activeBusiness === index;

                return (
                  <button
                    key={business.title}
                    type="button"
                    aria-pressed={isActive}
                    aria-label={`Show ${business.title} business information`}
                    onClick={() => setActiveBusiness(index)}
                    onFocus={() => setActiveBusiness(index)}
                    className={`group relative z-20 flex min-h-[76px] w-full cursor-pointer touch-manipulation items-center justify-between rounded-2xl p-5 text-left outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#e31b3b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09294b] ${
                      isActive
                        ? "bg-white text-[#09294b] shadow-lg"
                        : "bg-white/5 text-white hover:bg-white/10 active:scale-[0.99]"
                    }`}
                  >
                    <div className="flex items-center gap-5">
                      <span
                        className={`text-xs font-black ${
                          isActive
                            ? "text-[#c8102e]"
                            : "text-white/30"
                        }`}
                      >
                        {business.number}
                      </span>

                      <span className="text-xl font-black">
                        {business.title}
                      </span>
                    </div>

                    <span
                      className={`transition-transform duration-300 ${
                        isActive
                          ? "translate-x-1 text-[#c8102e]"
                          : "text-white/30 group-hover:translate-x-1 group-hover:text-white/60"
                      }`}
                    >
                      <Arrow />
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="relative z-10 min-h-[430px] overflow-hidden rounded-[2rem] bg-black/20 sm:min-h-[500px]">
              {businessTypes.map((business, index) => (
                <img
                  key={business.title}
                  src={business.image}
                  alt={business.title}
                  loading={index === 0 ? "eager" : "lazy"}
                  draggable={false}
                  className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
                    activeBusiness === index
                      ? "scale-100 opacity-100"
                      : "pointer-events-none scale-105 opacity-0"
                  }`}
                />
              ))}

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9">
                <p className="text-xs font-bold uppercase tracking-[.2em] text-white/50">
                  {businessTypes[activeBusiness].title}
                </p>

                <p className="mt-3 max-w-xl text-xl font-bold leading-8 text-white sm:text-2xl">
                  {businessTypes[activeBusiness].text}
                </p>

                <Link
                  href="/quote"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-black text-white transition hover:text-[#e31b3b]"
                >
                  Discuss your supply needs
                  <Arrow />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          HOW IT WORKS
      ========================================================== */}

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[.2em] text-[#c8102e]">
                Simple supply
              </p>

              <h2 className="mt-4 text-4xl font-black leading-[1.02] tracking-[-.04em] text-[#09294b] sm:text-6xl">
                From request
                <br />
                to fulfilment.
              </h2>

              <p className="mt-6 max-w-md text-sm leading-7 text-gray-500 sm:text-base">
                Tell us what your business needs and we'll work with you on
                the next step.
              </p>

              <div className="mt-8 hidden rounded-2xl bg-[#f5f6f7] p-5 sm:block">
                <p className="text-[10px] font-black uppercase tracking-[.18em] text-[#c8102e]">
                  Wholesale ordering
                </p>

                <p className="mt-2 text-sm font-bold leading-6 text-[#09294b]">
                  A straightforward process designed around your business
                  requirements.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-[27px] top-8 hidden h-[calc(100%-64px)] w-px bg-gray-200 sm:block" />

              <div className="divide-y divide-gray-200 border-y border-gray-200">
                {orderingSteps.map((step) => (
                  <div
                    key={step.number}
                    className="group relative grid gap-5 py-7 transition sm:grid-cols-[56px_1fr_auto] sm:items-start sm:py-8 sm:hover:px-3"
                  >
                    <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-[#09294b]/10 bg-white text-sm font-black text-[#c8102e] shadow-sm">
                      {step.number}
                    </div>

                    <div>
                      <h3 className="text-xl font-black text-[#09294b] sm:text-2xl">
                        {step.title}
                      </h3>

                      <p className="mt-2 max-w-xl text-sm leading-7 text-gray-500">
                        {step.text}
                      </p>
                    </div>

                    <span className="hidden text-gray-300 transition group-hover:translate-x-1 group-hover:text-[#c8102e] sm:block">
                      <Arrow />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SERVICE / TRUST BAND
      ========================================================== */}

      <section className="border-y border-gray-100 bg-[#f5f6f7] py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-xs font-black uppercase tracking-[.16em] text-[#c8102e]">
                Retail
              </p>

              <p className="mt-3 text-lg font-black text-[#09294b]">
                Keep your shelves stocked.
              </p>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Beverage supply for shops and businesses serving everyday
                customers.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-xs font-black uppercase tracking-[.16em] text-[#c8102e]">
                Hospitality
              </p>

              <p className="mt-3 text-lg font-black text-[#09294b]">
                Keep tables and guests refreshed.
              </p>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Beverage support for restaurants, cafés, hotels and hospitality
                businesses.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-xs font-black uppercase tracking-[.16em] text-[#c8102e]">
                Events
              </p>

              <p className="mt-3 text-lg font-black text-[#09294b]">
                Plan your beverage supply.
              </p>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Supply conversations for celebrations, gatherings and organised
                events.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CTA
      ========================================================== */}

      <section className="relative overflow-hidden bg-[#c8102e] text-white">
        <div className="absolute -right-24 -top-48 h-[600px] w-[600px] rounded-full border-[90px] border-white/5" />

        <div className="absolute -bottom-36 -left-32 h-[400px] w-[400px] rounded-full border border-white/10" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="max-w-5xl">
            <p className="text-xs font-black uppercase tracking-[.2em] text-white/60">
              Let's work together
            </p>

            <h2 className="mt-4 text-5xl font-black leading-[.91] tracking-[-.05em] sm:text-7xl lg:text-8xl">
              Ready to keep
              <br />
              your business stocked?
            </h2>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <p className="max-w-xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
                Tell KINGSIZE what your business needs and let's start a
                conversation about wholesale beverage supply.
              </p>

              <Link
                href="/quote"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-black text-[#c8102e] transition hover:-translate-y-1 hover:shadow-2xl"
              >
                Request a wholesale quote

                <span className="transition-transform group-hover:translate-x-1">
                  <Arrow />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================== */}

      <footer className="bg-[#061d36] text-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
          <div className="grid gap-12 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <img
                src="/brand/kingsize-logo.png"
                alt="KINGSIZE BEVERAGES"
                className="block h-auto w-[125px] object-contain"
                draggable={false}
              />

              <p className="mt-5 max-w-md text-sm leading-7 text-white/45">
                Wholesale beverage supply for retailers, hospitality
                businesses, offices, events and organisations.
              </p>

              <Link
                href="/quote"
                className="mt-6 inline-flex items-center gap-2 text-sm font-black text-white transition hover:text-[#e31b3b]"
              >
                Start a wholesale conversation
                <Arrow />
              </Link>
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[.18em] text-white/30">
                Explore
              </p>

              <div className="mt-5 flex flex-col gap-3 text-sm text-white/60">
                <Link
                  href="/products"
                  className="transition hover:text-white"
                >
                  Products
                </Link>

                <Link
                  href="#business"
                  className="transition hover:text-white"
                >
                  For Business
                </Link>

                <Link
                  href="#about"
                  className="transition hover:text-white"
                >
                  About KINGSIZE
                </Link>
              </div>
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[.18em] text-white/30">
                Business
              </p>

              <div className="mt-5 flex flex-col gap-3 text-sm text-white/60">
                <Link
                  href="/quote"
                  className="transition hover:text-white"
                >
                  Request a Quote
                </Link>

                <Link
                  href="/contact"
                  className="transition hover:text-white"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-3 pt-7 text-xs text-white/30 sm:flex-row">
            <p>
              © {new Date().getFullYear()} KINGSIZE BEVERAGES. All rights
              reserved.
            </p>

            <p>Wholesale beverage supply & distribution</p>
          </div>
        </div>
      </footer>
    </main>
  );
}