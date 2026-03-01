"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Waves,
  Droplets,
  Sparkles,
  BedDouble,
  ChefHat,
  Sun,
  Star,
  TreePalm,
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const features = [
  {
    icon: Waves,
    title: "Infinity Pool",
    description:
      "Vanishing-edge pool overlooking the bay with a dramatic waterfall feature",
  },
  {
    icon: Droplets,
    title: "Spa & Plunge Pool",
    description:
      "Stone-walled spa area with a cold plunge pool for post-practice recovery",
  },
  {
    icon: Sparkles,
    title: "Rooftop Jacuzzi",
    description:
      "Soak under the stars with panoramic views of Camp de Mar bay",
  },
  {
    icon: BedDouble,
    title: "Ocean View Suites",
    description:
      "5 luxurious bedroom suites, each with Mediterranean views and en-suite bathrooms",
  },
  {
    icon: ChefHat,
    title: "Gourmet Kitchen",
    description:
      "State-of-the-art chef\u2019s kitchen where our culinary team prepares your daily meals",
  },
  {
    icon: Sun,
    title: "Yoga Terrace",
    description:
      "Open-air terrace with sea breezes \u2014 your practice space with the best view on the island",
  },
  {
    icon: Star,
    title: "Starlit Cinema",
    description:
      "Private cinema room with fibre-optic starlit ceiling for movie nights and sound baths",
  },
  {
    icon: TreePalm,
    title: "Private Beach Path",
    description:
      "Winding stone stairway through Mediterranean pines to the turquoise cove below",
  },
];

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
    alt: "Villa exterior with pool",
  },
  {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
    alt: "Elegant living space",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    alt: "Villa front view",
  },
  {
    src: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600&q=80",
    alt: "Luxury poolside",
  },
  {
    src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
    alt: "Modern villa at dusk",
  },
  {
    src: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&q=80",
    alt: "Interior suite",
  },
];

export default function VillaPage() {
  return (
    <div className="bg-[#FAF8F5]">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=80"
          alt="Modern luxury villa in Camp de Mar, Mallorca"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10" />
        <div className="absolute inset-0 flex items-end pb-20">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="max-w-2xl"
            >
              <div className="gold-line mb-6" />
              <h1 className="font-[family-name:var(--font-playfair)] text-5xl font-semibold leading-tight text-white md:text-6xl lg:text-7xl">
                Your Home Away From Home
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-white/80 md:text-xl">
                A masterpiece of modern architecture perched above the
                Mediterranean in Camp de Mar, Mallorca
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Villa Description */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C8A96E]">
              The Villa
            </span>
            <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl font-semibold leading-snug text-[#2D2A26] md:text-4xl lg:text-5xl">
              Where Luxury Meets Serenity
            </h2>
            <div className="mx-auto mt-6 gold-line" />
            <p className="mt-8 text-lg leading-relaxed text-[#2D2A26]/70">
              The moment you walk through the doors, you&apos;ll understand why
              our guests never want to leave. Floor-to-ceiling windows frame
              panoramic views of the Mediterranean. Sunlight dances across
              Italian marble floors. Every room has been designed to feel like a
              sanctuary &mdash; because that&apos;s exactly what it is.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="section-divider" />
      </div>

      {/* Villa Features Grid */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="mb-16 text-center"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C8A96E]">
              Amenities
            </span>
            <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl font-semibold text-[#2D2A26] md:text-4xl">
              Everything You Could Dream Of
            </h2>
            <div className="mx-auto mt-6 gold-line" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={fadeInUp}
                  className="group rounded-2xl border border-[#C8A96E]/10 bg-white/60 p-8 transition-all duration-500 hover:border-[#C8A96E]/30 hover:bg-white hover:shadow-lg hover:shadow-[#C8A96E]/5"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#5B7B5E]/10 transition-colors duration-300 group-hover:bg-[#5B7B5E]/15">
                    <Icon className="h-6 w-6 text-[#5B7B5E]" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-[#2D2A26]">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#2D2A26]/60">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="section-divider" />
      </div>

      {/* Image Gallery */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="mb-16 text-center"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C8A96E]">
              Gallery
            </span>
            <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl font-semibold text-[#2D2A26] md:text-4xl">
              A Glimpse Inside
            </h2>
            <div className="mx-auto mt-6 gold-line" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`image-hover group relative overflow-hidden rounded-2xl ${
                  index === 0 || index === 5
                    ? "sm:col-span-1 lg:row-span-1"
                    : ""
                } ${index === 0 ? "aspect-[4/3]" : index === 1 ? "aspect-[4/3]" : index === 2 ? "aspect-[4/3]" : index === 3 ? "aspect-[4/3]" : index === 4 ? "aspect-[4/3]" : "aspect-[4/3]"}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="section-divider" />
      </div>

      {/* CTA Section */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="text-center"
          >
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-semibold text-[#2D2A26] md:text-4xl lg:text-5xl">
              Ready to See It for Yourself?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-[#2D2A26]/60">
              Your sanctuary in Mallorca is waiting. Secure your spot at our
              next retreat and experience the villa that everyone is talking
              about.
            </p>
            <Link
              href="/book"
              className="mt-10 inline-flex items-center justify-center rounded-full bg-[#5B7B5E] px-10 py-4 text-base font-medium tracking-wide text-white transition-all duration-300 hover:bg-[#4A6A4D] hover:shadow-lg hover:shadow-[#5B7B5E]/20"
            >
              Book Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
