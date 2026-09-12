"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Product = {
  name: string;
  category: string;
  description: string;
  brands: string[];
  images: string[];
  imageFit?: "contain" | "cover";
  featured?: boolean;
  imageBackground?: string;
};

const categories = [
  "All",
  "Soft Drinks",
  "Water",
  "Energy Drinks",
  "Malt Drinks",
  "Juices & Yogurts",
  "Milk & Dairy",
  "Alcoholic Beverages",
];

const products: Product[] = [
  {
    name: "Soft Drinks",
    category: "Soft Drinks",
    description:
      "Fast-moving carbonated drinks for retail shelves, restaurants, events and everyday refreshment.",
    brands: ["Coca-Cola", "Fanta", "Sprite", "Pepsi", "Mirinda"],
    images: [
      "https://www.thewarehouse.co.nz/dw/image/v2/BDMG_PRD/on/demandware.static/-/Sites-twl-master-catalog/default/dw34398970/images/hi-res/54/BF/R340657_40.jpg",
      "https://ng.coca-colahellenic.com/en/our-24-7-portfolio/explore-our-brands-and-products/_jcr_content/root/teaser_417793428_cop_1068068576.coreimg.jpeg/1598384597190/fanta-orange-60cl-pet.jpeg",
      "https://shop.ojaoba.com/cdn/shop/files/Sprite_Lime-Lemon_Flavor_60cl.jpg?v=1764875494&width=800",
    ],
    imageFit: "contain",
    imageBackground: "bg-white",
    featured: true,
  },

  {
    name: "Bottled Water",
    category: "Water",
    description:
      "Everyday hydration supplied for shops, offices, hospitality businesses and events.",
    brands: ["EVA Table Water", "Bottled Water", "Bulk Supply"],
    images: [
      "https://www.chomart.com/storage/images/eva-bottled-water-75cl-x-12-gxxmr32465.webp",
    ],
    imageFit: "contain",
    imageBackground: "bg-white",
    featured: true,
  },

  {
    name: "Energy Drinks",
    category: "Energy Drinks",
    description:
      "Popular energy drink options for customers looking for an extra boost throughout the day.",
    brands: ["Monster Energy", "Monster Original", "Bulk Cases"],
    images: [
      "https://f.nooncdn.com/p/pzsku/Z8D6B8199B84538D52A4BZ/45/_/1776168380/680d3b6a-5737-4155-902d-7713dafc7d7d.jpg",
    ],
    imageFit: "contain",
    imageBackground: "bg-white",
    featured: true,
  },

  {
    name: "Malt Drinks",
    category: "Malt Drinks",
    description:
      "Malt beverages suitable for supermarkets, neighbourhood stores, restaurants and events.",
    brands: ["Amstel Malta", "Maltina", "Non-Alcoholic Malt"],
    images: [
      "https://www.osiafrik.com/cdn/shop/files/B43A438D-5FC9-4C30-A9A1-CE072439204F_800x.jpg?v=1732057911",
    ],
    imageFit: "contain",
    imageBackground: "bg-white",
    featured: true,
  },

  {
    name: "Juices & Yogurts",
    category: "Juices & Yogurts",
    description:
      "Refreshing juice and yoghurt options for everyday retail and hospitality demand.",
    brands: ["Hollandia", "5 Alive", "Diva Yogurt"],
    images: [
      "https://hollandiadairyng.com/assets/imgs/products-dp/prdts_yoghurt_plainSweetened.png",
      "https://hollandiadairyng.com/assets/imgs/products-dp/prdts_yoghurt_strawberry.png",
    ],
    imageFit: "contain",
    imageBackground: "bg-white",
  },

  {
    name: "Milk & Dairy",
    category: "Milk & Dairy",
    description:
      "Liquid and evaporated milk options for homes, retailers, cafés and food businesses.",
    brands: ["Hollandia Yoghurt", "Full Cream Milk", "Evaporated Milk"],
    images: [
      "https://hollandiadairyng.com/assets/imgs/products-dp/prdts_yoghurt_plainSweetened.png",
      "https://hollandiadairyng.com/assets/imgs/products-dp/prdts_fullCream_evaporated.png",
    ],
    imageFit: "contain",
    imageBackground: "bg-white",
  },

  {
    name: "Alcoholic Beverages",
    category: "Alcoholic Beverages",
    description:
      "Beverage supply options for licensed hospitality businesses, retailers and approved events.",
    brands: ["Heineken", "Beer", "Wine & Spirits"],
    images: [
      "https://www.heineken.com/media/ds4hpzy0/hnk-can-330ml.png",
    ],
    imageFit: "contain",
    imageBackground: "bg-[#f4f7f5]",
  },
];

/*
|--------------------------------------------------------------------------
| IMAGE HANDLING
|--------------------------------------------------------------------------
| External product hosts can sometimes block direct browser requests.
| We first try the wsrv.nl image proxy and, if that fails, we try the
| original image directly.
|--------------------------------------------------------------------------
*/

function proxiedImageUrl(url: string) {
  return `https://wsrv.nl/?url=${encodeURIComponent(
    url
  )}&w=1200&output=webp&q=88`;
}

function ProductImage({
  src,
  alt,
  className,
  fallbackLabel,
}: {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel: string;
}) {
  const [attempt, setAttempt] = useState(0);

  const imageSources = [
    proxiedImageUrl(src),
    src,
  ];

  if (attempt >= imageSources.length) {
    return (
      <div
        className={`flex h-full w-full items-center justify-center bg-white ${
          className ?? ""
        }`}
        role="img"
        aria-label={alt}
      >
        <div className="px-4 text-center">
          <p className="text-sm font-semibold text-slate-400">
            {fallbackLabel}
          </p>

          <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-slate-300">
            Image unavailable
          </p>
        </div>
      </div>
    );
  }

  return (
    <img
      key={`${src}-${attempt}`}
      src={imageSources[attempt]}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setAttempt((current) => current + 1)}
      className={className}
    />
  );
}

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

function SearchIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="11"
        cy="11"
        r="6.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="m16 16 5 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 6h16M7 12h10M10 18h4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
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

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "All" || product.category === activeCategory;

      const searchText = `${product.name} ${product.category} ${
        product.description
      } ${product.brands.join(" ")}`.toLowerCase();

      const matchesSearch =
        search.trim() === "" ||
        searchText.includes(search.trim().toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  const resetCatalogue = () => {
    setSearch("");
    setActiveCategory("All");
  };

  return (
    <main className="min-h-screen bg-[#f7f8fa] text-[#07182e]">
      {/* HEADER */}
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-xl"
            : "bg-white/90 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-[78px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link href="/" className="flex items-center">
            <img
              src="/brand/kingsize-logo.png"
              alt="KINGSIZE BEVERAGES"
              className="h-auto w-[92px] object-contain sm:w-[106px]"
            />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            <Link
              href="/"
              className="text-sm font-medium text-slate-600 transition hover:text-[#d71920]"
            >
              Home
            </Link>

            <Link
              href="/products"
              className="text-sm font-semibold text-[#07182e]"
            >
              Products
            </Link>

            <Link
              href="/#business"
              className="text-sm font-medium text-slate-600 transition hover:text-[#d71920]"
            >
              Who We Supply
            </Link>

            <Link
              href="/#about"
              className="text-sm font-medium text-slate-600 transition hover:text-[#d71920]"
            >
              About
            </Link>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/contact"
              className="rounded-full px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Contact
            </Link>

            <Link
              href="/quote"
              className="group flex items-center gap-2 rounded-full bg-[#d71920] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(215,25,32,0.18)] transition hover:-translate-y-0.5 hover:bg-[#b9141b]"
            >
              Request a Quote
              <Arrow size={16} />
            </Link>
          </div>

          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-[#07182e] lg:hidden"
          >
            <span className="flex flex-col gap-1.5">
              <span className="h-[2px] w-5 bg-current" />
              <span className="h-[2px] w-5 bg-current" />
              <span className="h-[2px] w-3.5 bg-current" />
            </span>
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-[#07182e] text-white lg:hidden">
          <div className="flex h-[78px] items-center justify-between px-5 sm:px-8">
            <Link href="/" onClick={() => setMenuOpen(false)}>
              <img
                src="/brand/kingsize-logo.png"
                alt="KINGSIZE BEVERAGES"
                className="w-[92px] brightness-0 invert"
              />
            </Link>

            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20"
            >
              <span className="relative block h-5 w-5">
                <span className="absolute left-0 top-1/2 h-[2px] w-5 rotate-45 bg-white" />
                <span className="absolute left-0 top-1/2 h-[2px] w-5 -rotate-45 bg-white" />
              </span>
            </button>
          </div>

          <div className="flex h-[calc(100vh-78px)] flex-col justify-between px-6 pb-8 pt-10 sm:px-10">
            <nav className="flex flex-col">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="border-b border-white/10 py-5 text-3xl font-semibold"
              >
                Home
              </Link>

              <Link
                href="/products"
                onClick={() => setMenuOpen(false)}
                className="border-b border-white/10 py-5 text-3xl font-semibold"
              >
                Products
              </Link>

              <Link
                href="/#business"
                onClick={() => setMenuOpen(false)}
                className="border-b border-white/10 py-5 text-3xl font-semibold"
              >
                Who We Supply
              </Link>

              <Link
                href="/#about"
                onClick={() => setMenuOpen(false)}
                className="border-b border-white/10 py-5 text-3xl font-semibold"
              >
                About
              </Link>

              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="border-b border-white/10 py-5 text-3xl font-semibold"
              >
                Contact
              </Link>
            </nav>

            <Link
              href="/quote"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between rounded-2xl bg-[#d71920] px-5 py-4 font-semibold"
            >
              Request a Quote
              <Arrow />
            </Link>
          </div>
        </div>
      )}

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#07182e] pt-[78px]">
        <div className="absolute -right-32 top-0 h-[500px] w-[500px] rounded-full bg-[#d71920]/20 blur-3xl" />

        <div className="absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative mx-auto grid min-h-[560px] max-w-[1440px] items-center gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:px-12 lg:py-24">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
              <span className="h-2 w-2 rounded-full bg-[#d71920]" />
              KINGSIZE Catalogue
            </div>

            <h1 className="max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
              The drinks your customers already{" "}
              <span className="text-[#d71920]">ask for.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Explore beverage categories KINGSIZE can help supply to
              retailers, hospitality businesses, event teams and growing
              businesses.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#catalogue"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#07182e] transition hover:-translate-y-0.5"
              >
                Explore catalogue
                <Arrow size={17} />
              </a>

              <Link
                href="/quote"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Request wholesale supply
              </Link>
            </div>
          </div>

          {/* HERO PRODUCT WALL */}
          <div className="relative mx-auto w-full max-w-[560px]">
            <div className="absolute -left-4 top-10 z-10 hidden rounded-2xl border border-white/10 bg-white px-4 py-3 shadow-2xl sm:block">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                Wholesale
              </p>

              <p className="mt-1 text-sm font-semibold text-[#07182e]">
                Built for volume
              </p>
            </div>

            <div className="absolute -right-3 bottom-10 z-20 rounded-2xl border border-white/10 bg-[#d71920] px-4 py-3 shadow-2xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/70">
                Supply
              </p>

              <p className="mt-1 text-sm font-semibold text-white">
                Made simpler
              </p>
            </div>

            <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/10 p-2 shadow-2xl">
              <div className="relative overflow-hidden rounded-[26px] bg-white">
                <div className="grid grid-cols-3 gap-2 p-3 sm:p-4">
                  {products[0].images.map((image, index) => {
                    const labels = [
                      "Coca-Cola 60cl PET",
                      "Fanta Orange 60cl PET",
                      "Sprite 60cl PET",
                    ];

                    return (
                      <div
                        key={image}
                        className="flex min-h-[300px] items-center justify-center overflow-hidden rounded-[20px] bg-[#f7f8fa] sm:min-h-[360px]"
                      >
                        <ProductImage
                          src={image}
                          alt={labels[index]}
                          fallbackLabel={
                            index === 0
                              ? "Coca-Cola"
                              : index === 1
                              ? "Fanta"
                              : "Sprite"
                          }
                          className="h-full max-h-[360px] w-full object-contain p-5 transition duration-700 hover:scale-105"
                        />
                      </div>
                    );
                  })}
                </div>

                <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/15 bg-[#07182e]/80 p-5 backdrop-blur-xl">
                  <div className="flex items-end justify-between gap-5">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/60">
                        Beverage supply
                      </p>

                      <p className="mt-1 text-lg font-semibold text-white">
                        Retail • Hospitality • Events
                      </p>
                    </div>

                    <div className="hidden h-11 w-11 items-center justify-center rounded-full bg-white text-[#07182e] sm:flex">
                      <Arrow size={18} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 divide-x divide-slate-200 sm:grid-cols-4">
          <div className="px-5 py-6 sm:px-8">
            <p className="text-2xl font-semibold tracking-tight text-[#07182e]">
              07
            </p>

            <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
              Product categories
            </p>
          </div>

          <div className="px-5 py-6 sm:px-8">
            <p className="text-2xl font-semibold tracking-tight text-[#07182e]">
              Bulk
            </p>

            <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
              Wholesale focused
            </p>
          </div>

          <div className="px-5 py-6 sm:px-8">
            <p className="text-2xl font-semibold tracking-tight text-[#07182e]">
              Flexible
            </p>

            <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
              Supply options
            </p>
          </div>

          <div className="px-5 py-6 sm:px-8">
            <p className="text-2xl font-semibold tracking-tight text-[#07182e]">
              Local
            </p>

            <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
              Business focused
            </p>
          </div>
        </div>
      </section>

      {/* CATALOGUE */}
      <section
        id="catalogue"
        className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d71920]">
              Our catalogue
            </p>

            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.035em] text-[#07182e] sm:text-5xl">
              Real products. Wholesale supply.
            </h2>

            <p className="mt-5 text-base leading-7 text-slate-500">
              Browse the beverage categories below and tell us what your
              business needs. We can then confirm available brands, pack
              sizes, quantities and pricing.
            </p>
          </div>

          <div className="relative w-full lg:max-w-[340px]">
            <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <SearchIcon />
            </div>

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products..."
              className="w-full rounded-full border border-slate-200 bg-white py-3.5 pl-11 pr-5 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#d71920] focus:ring-4 focus:ring-[#d71920]/10"
            />
          </div>
        </div>

        {/* CATEGORY FILTER */}
        <div className="mt-10 overflow-x-auto pb-2">
          <div className="flex min-w-max gap-2">
            {categories.map((category) => {
              const active = category === activeCategory;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition ${
                    active
                      ? "border-[#07182e] bg-[#07182e] text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-[#07182e]"
                  }`}
                >
                  {category === "All" && <FilterIcon />}
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product, index) => {
            const isLarge =
              product.featured &&
              index === 0 &&
              filteredProducts.length > 1;

            return (
              <article
                key={product.name}
                className={`group overflow-hidden rounded-[28px] border border-slate-200 bg-white transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(7,24,46,0.10)] ${
                  isLarge ? "sm:col-span-2 xl:col-span-2" : ""
                }`}
              >
                {/* PRODUCT VISUAL */}
                <div
                  className={`relative overflow-hidden ${
                    isLarge
                      ? "min-h-[390px] sm:min-h-[460px]"
                      : "min-h-[320px]"
                  } ${product.imageBackground ?? "bg-white"}`}
                >
                  {product.images.length > 1 ? (
                    <div
                      className={`grid h-full min-h-[320px] ${
                        isLarge ? "grid-cols-3" : "grid-cols-2"
                      } gap-2 p-3 sm:p-4`}
                    >
                      {product.images.map((image, imageIndex) => (
                        <div
                          key={`${product.name}-${imageIndex}`}
                          className="relative flex min-h-[300px] items-center justify-center overflow-hidden rounded-[22px] bg-white"
                        >
                          <ProductImage
                            src={image}
                            alt={`${product.name} product ${
                              imageIndex + 1
                            }`}
                            fallbackLabel={
                              product.category === "Juices & Yogurts"
                                ? imageIndex === 0
                                  ? "Hollandia"
                                  : "Yogurt"
                                : "Milk"
                            }
                            className="h-full max-h-[430px] w-full object-contain p-4 transition duration-700 group-hover:scale-[1.03]"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex h-full min-h-[320px] items-center justify-center p-6">
                      <ProductImage
                        src={product.images[0]}
                        alt={product.name}
                        fallbackLabel={
                          product.category === "Water"
                            ? "EVA"
                            : product.category === "Energy Drinks"
                            ? "Monster"
                            : product.category === "Malt Drinks"
                            ? "Amstel"
                            : product.category === "Alcoholic Beverages"
                            ? "Beer"
                            : product.name
                        }
                        className={`h-full max-h-[440px] w-full transition duration-700 group-hover:scale-105 ${
                          product.imageFit === "cover"
                            ? "object-cover"
                            : "object-contain"
                        }`}
                      />
                    </div>
                  )}

                  {/* CATEGORY LABEL */}
                  <div className="absolute left-5 top-5 rounded-full border border-white/30 bg-[#07182e]/75 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md">
                    {product.category}
                  </div>

                  {/* PRODUCT COUNT */}
                  <div className="absolute right-5 top-5 rounded-full border border-slate-200 bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#07182e] shadow-sm">
                    {product.images.length}{" "}
                    {product.images.length === 1 ? "product" : "products"}
                  </div>

                  {/* BOTTOM GRADIENT */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#07182e]/45 to-transparent" />

                  {/* TITLE */}
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="text-2xl font-semibold tracking-tight text-white drop-shadow-sm">
                          {product.name}
                        </p>

                        <p className="mt-1 text-xs font-medium uppercase tracking-[0.13em] text-white/70">
                          Wholesale category
                        </p>
                      </div>

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#07182e] shadow-lg transition duration-300 group-hover:bg-[#d71920] group-hover:text-white">
                        <Arrow size={18} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  <p className="text-sm leading-6 text-slate-500">
                    {product.description}
                  </p>

                  <div className="mt-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                      Brands / examples
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {product.brands.map((brand) => (
                        <span
                          key={brand}
                          className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600"
                        >
                          {brand}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="/quote"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#07182e] transition group-hover:text-[#d71920]"
                  >
                    Ask about supply
                    <Arrow size={16} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="rounded-[28px] border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <p className="text-xl font-semibold text-[#07182e]">
              No matching products found.
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Try another search term or select a different category.
            </p>

            <button
              type="button"
              onClick={resetCatalogue}
              className="mt-6 rounded-full bg-[#07182e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#d71920]"
            >
              Reset catalogue
            </button>
          </div>
        )}

        {/* SUPPLY NOTE */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-xs leading-5 text-slate-500">
            <span className="font-semibold text-[#07182e]">
              Supply note:
            </span>{" "}
            Product examples and brands shown are for catalogue guidance.
            Availability, brands, pack sizes, quantities and pricing can vary.
            Contact KINGSIZE to confirm current wholesale availability.
          </p>
        </div>
      </section>

      {/* WHO WE SUPPLY */}
      <section className="bg-[#07182e]">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d71920]">
                Supply built around you
              </p>

              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] text-white sm:text-5xl">
                One supplier.
                <br />
                Different business needs.
              </h2>

              <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
                Whether you're restocking a neighbourhood store, running a
                hospitality business or preparing for a major event, your
                requirements aren't the same. That's why we keep the supply
                conversation flexible.
              </p>

              <Link
                href="/quote"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#07182e] transition hover:-translate-y-0.5"
              >
                Discuss your requirements
                <Arrow size={17} />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  number: "01",
                  title: "Retail",
                  text: "Stock up on fast-moving beverages for your shelves and customers.",
                },
                {
                  number: "02",
                  title: "Hospitality",
                  text: "Support restaurants, lounges, hotels and food businesses with regular supply.",
                },
                {
                  number: "03",
                  title: "Events",
                  text: "Plan beverage quantities around weddings, corporate events and celebrations.",
                },
              ].map((item) => (
                <div
                  key={item.number}
                  className="rounded-[26px] border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:bg-white/[0.08]"
                >
                  <span className="text-xs font-bold tracking-[0.18em] text-[#d71920]">
                    {item.number}
                  </span>

                  <h3 className="mt-12 text-xl font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED LIFESTYLE */}
      <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="grid overflow-hidden rounded-[34px] bg-white shadow-[0_20px_80px_rgba(7,24,46,0.08)] lg:grid-cols-[1fr_0.9fr]">
          <div className="relative min-h-[360px] overflow-hidden lg:min-h-[560px]">
            <ProductImage
              src="https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?auto=format&fit=crop&w=1400&q=85"
              alt="People enjoying refreshing drinks"
              fallbackLabel="KINGSIZE"
              className="absolute inset-0 h-full w-full object-cover transition duration-700 hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#07182e]/70 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 rounded-2xl border border-white/20 bg-[#07182e]/70 px-5 py-4 backdrop-blur-xl sm:bottom-8 sm:left-8">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/60">
                KINGSIZE
              </p>

              <p className="mt-1 text-sm font-semibold text-white">
                Drinks that move with your business.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-14">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d71920]">
              More than a catalogue
            </p>

            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.035em] text-[#07182e]">
              The right products are only part of the equation.
            </h2>

            <p className="mt-5 text-base leading-7 text-slate-500">
              Wholesale works best when the supplier understands what your
              business is trying to achieve. KINGSIZE is focused on helping
              businesses source the beverages they need without making the
              process unnecessarily complicated.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Clear supply conversations",
                "Flexible business requirements",
                "Bulk-focused ordering",
                "Straightforward quotation process",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#d71920] text-white">
                    <CheckIcon />
                  </span>

                  <span className="text-sm font-semibold text-[#07182e]">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/#about"
              className="mt-9 inline-flex items-center gap-2 text-sm font-bold text-[#07182e] transition hover:text-[#d71920]"
            >
              Learn about KINGSIZE
              <Arrow size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* PRODUCT BRAND STRIP */}
      <section className="overflow-hidden border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d71920]">
                Brands customers recognise
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Examples of products that may form part of your wholesale
                requirements.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                "Coca-Cola",
                "Fanta",
                "Sprite",
                "EVA",
                "Amstel Malta",
                "Hollandia",
                "Monster Energy",
                "Heineken",
              ].map((brand) => (
                <span
                  key={brand}
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-600"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#d71920]">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10" />

        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-black/10" />

        <div className="relative mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-8 px-5 py-16 sm:px-8 lg:flex-row lg:items-center lg:px-12 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/65">
              Ready to stock up?
            </p>

            <h2 className="mt-3 text-4xl font-semibold leading-tight tracking-[-0.035em] text-white sm:text-5xl">
              Tell us what your business needs.
            </h2>

            <p className="mt-4 max-w-xl text-base leading-7 text-white/75">
              Share the products, quantities and timing you're working with.
              We'll help you take it from there.
            </p>
          </div>

          <Link
            href="/quote"
            className="group flex shrink-0 items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-bold text-[#07182e] shadow-xl transition hover:-translate-y-1"
          >
            Request a wholesale quote

            <span className="transition group-hover:translate-x-1">
              <Arrow size={18} />
            </span>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#061426] text-white">
        <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:px-12">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_.7fr_.7fr_.8fr]">
            <div>
              <img
                src="/brand/kingsize-logo.png"
                alt="KINGSIZE BEVERAGES"
                className="w-[125px]"
              />

              <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">
                Wholesale beverage supply for retailers, hospitality
                businesses, events and growing businesses.
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">
                Explore
              </p>

              <div className="mt-5 flex flex-col gap-3 text-sm text-slate-400">
                <Link href="/" className="transition hover:text-white">
                  Home
                </Link>

                <Link
                  href="/products"
                  className="transition hover:text-white"
                >
                  Products
                </Link>

                <Link
                  href="/#business"
                  className="transition hover:text-white"
                >
                  Who We Supply
                </Link>

                <Link href="/#about" className="transition hover:text-white">
                  About
                </Link>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">
                Categories
              </p>

              <div className="mt-5 flex flex-col gap-3 text-sm text-slate-400">
                <span>Soft Drinks</span>
                <span>Water</span>
                <span>Energy Drinks</span>
                <span>Malt Drinks</span>
                <span>Juices & Yogurts</span>
                <span>Milk & Dairy</span>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">
                Business
              </p>

              <div className="mt-5 flex flex-col gap-3 text-sm text-slate-400">
                <span>Retail Supply</span>
                <span>Hospitality</span>
                <span>Event Supply</span>

                <Link
                  href="/quote"
                  className="font-semibold text-white transition hover:text-[#d71920]"
                >
                  Request a Quote →
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} KINGSIZE BEVERAGES. All rights
              reserved.
            </p>

            <p>Wholesale beverage supply.</p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        ::selection {
          background: #d71920;
          color: white;
        }

        body {
          margin: 0;
          background: #f7f8fa;
        }
      `}</style>
    </main>
  );
}