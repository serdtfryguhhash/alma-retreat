"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Check,
  Star,
  Users,
  Heart,
  Calendar,
  CreditCard,
  ShieldCheck,
  Plane,
  ShieldX,
  ShoppingBag,
  Sparkles,
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const packages = [
  {
    name: "The Weekend Reset",
    duration: "3 Nights / 4 Days",
    price: "1,850",
    bestFor: "When you need a quick but powerful reset",
    schedule: "Thursday arrival \u2192 Sunday departure",
    popular: false,
    includes: [
      "3 nights luxury accommodation in ocean-view suite",
      "6 yoga/pilates sessions (2 per day)",
      "3 guided meditation sessions",
      "All meals + juices + snacks (plant-based, chef-prepared)",
      "Welcome ceremony + closing circle",
      "1 x 60-minute massage",
      "Spa, pool, jacuzzi, cinema access",
      "Private airport transfers",
    ],
    quote:
      "Perfect if you\u2019re short on time but desperate for a reset. You\u2019ll be amazed how different you feel in just 4 days.",
  },
  {
    name: "The Deep Dive",
    duration: "5 Nights / 6 Days",
    price: "2,950",
    bestFor: "Our most popular package \u2014 deep enough to truly transform",
    schedule: "Monday arrival \u2192 Saturday departure",
    popular: true,
    includes: [
      "5 nights luxury accommodation in ocean-view suite",
      "10 yoga/pilates sessions",
      "5 meditation + breathwork sessions",
      "All meals + juices + snacks (plant-based, chef-prepared)",
      "Welcome ceremony + closing circle",
      "1 sound healing session",
      "2 spa treatments (including 60-min massage)",
      "Spa, pool, jacuzzi, cinema access",
      "Half-day excursion to Port Andratx village",
      "Sunset boat trip along the coast",
      "Private airport transfers",
    ],
    quote:
      "This is where the magic happens. Five nights is the sweet spot \u2014 long enough to shed the stress, reconnect with yourself, and actually feel the transformation.",
  },
  {
    name: "The Full Transformation",
    duration: "7 Nights / 8 Days",
    price: "3,850",
    bestFor: "A full week to completely rebuild from the inside out",
    schedule: "Sunday arrival \u2192 Sunday departure",
    popular: false,
    includes: [
      "7 nights luxury accommodation in ocean-view suite",
      "14 yoga/pilates sessions",
      "7 meditation sessions",
      "All meals + juices + snacks (plant-based, chef-prepared)",
      "Welcome ceremony + closing circle",
      "2 sound healing sessions",
      "3 spa treatments total",
      "Private 1-on-1 session with lead instructor",
      "Full-day island excursion (Tramuntana mountains or Palma old town)",
      "Personalized wellness plan to take home",
      "Spa, pool, jacuzzi, cinema access",
      "Private airport transfers",
    ],
    quote:
      "This is for the woman who\u2019s ready to go all in. A full week to let go of everything that\u2019s been weighing you down and step into a completely new chapter.",
  },
];

const notIncluded = [
  { icon: Plane, text: "International flights" },
  { icon: ShieldX, text: "Travel insurance" },
  { icon: ShoppingBag, text: "Personal shopping" },
  {
    icon: Sparkles,
    text: "Additional spa treatments beyond included amount (available at extra cost)",
  },
];

const upcomingRetreats = [
  {
    dateRange: "March 20\u201322",
    month: "MAR",
    startDay: 20,
    endDay: 22,
    packageType: "Weekend Reset",
    price: "\u20AC1,850",
    spotsLeft: 2,
    duration: "3 nights",
  },
  {
    dateRange: "April 7\u201311",
    month: "APR",
    startDay: 7,
    endDay: 11,
    packageType: "Deep Dive",
    price: "\u20AC2,950",
    spotsLeft: 5,
    duration: "5 nights",
  },
  {
    dateRange: "April 25\u2013May 1",
    month: "APR",
    startDay: 25,
    endDay: 1,
    packageType: "Full Transformation",
    price: "\u20AC3,850",
    spotsLeft: 0,
    duration: "7 nights",
  },
  {
    dateRange: "May 15\u201317",
    month: "MAY",
    startDay: 15,
    endDay: 17,
    packageType: "Weekend Reset",
    price: "\u20AC1,850",
    spotsLeft: 8,
    duration: "3 nights",
  },
  {
    dateRange: "June 1\u20135",
    month: "JUN",
    startDay: 1,
    endDay: 5,
    packageType: "Deep Dive",
    price: "\u20AC2,950",
    spotsLeft: 4,
    duration: "5 nights",
  },
  {
    dateRange: "June 20\u201326",
    month: "JUN",
    startDay: 20,
    endDay: 26,
    packageType: "Full Transformation",
    price: "\u20AC3,850",
    spotsLeft: 6,
    duration: "7 nights",
  },
  {
    dateRange: "July 10\u201312",
    month: "JUL",
    startDay: 10,
    endDay: 12,
    packageType: "Weekend Reset",
    price: "\u20AC1,850",
    spotsLeft: 10,
    duration: "3 nights",
  },
  {
    dateRange: "August 4\u20138",
    month: "AUG",
    startDay: 4,
    endDay: 8,
    packageType: "Deep Dive",
    price: "\u20AC2,950",
    spotsLeft: 3,
    duration: "5 nights",
  },
];

export default function RetreatsPage() {
  return (
    <div className="bg-[#FAF8F5]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#5B7B5E]/5 to-[#FAF8F5] py-28 md:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mx-auto gold-line mb-6" />
            <h1 className="font-[family-name:var(--font-playfair)] text-5xl font-semibold leading-tight text-[#2D2A26] md:text-6xl lg:text-7xl">
              Find Your Perfect Retreat
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-[#2D2A26]/60 md:text-xl">
              Every package is fully all-inclusive. No hidden costs, no surprise
              extras. Just pure, uninterrupted bliss.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid gap-8 lg:grid-cols-3"
          >
            {packages.map((pkg) => (
              <motion.div
                key={pkg.name}
                variants={fadeInUp}
                className={`relative flex flex-col overflow-hidden rounded-3xl border transition-all duration-500 hover:shadow-xl ${
                  pkg.popular
                    ? "border-[#C8A96E]/40 bg-white shadow-lg shadow-[#C8A96E]/10"
                    : "border-[#C8A96E]/10 bg-white/60 hover:border-[#C8A96E]/30"
                }`}
              >
                {/* Popular Badge */}
                {pkg.popular && (
                  <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#C8A96E] to-[#E8D5A8] px-4 py-2.5">
                    <Star className="h-4 w-4 text-white" fill="white" />
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">
                      Most Popular
                    </span>
                    <Star className="h-4 w-4 text-white" fill="white" />
                  </div>
                )}

                <div className="flex flex-1 flex-col p-8 md:p-10">
                  {/* Header */}
                  <div className="mb-8">
                    <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-[#2D2A26]">
                      {pkg.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-[#5B7B5E]">
                      {pkg.duration}
                    </p>
                    <p className="mt-4 text-sm italic text-[#2D2A26]/50">
                      {pkg.bestFor}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm text-[#2D2A26]/50">From</span>
                      <span className="font-[family-name:var(--font-playfair)] text-4xl font-semibold text-[#2D2A26]">
                        &euro;{pkg.price}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-[#2D2A26]/40">
                      per person
                    </p>
                  </div>

                  {/* Schedule */}
                  <div className="mb-8 rounded-xl border border-[#5B7B5E]/10 bg-[#5B7B5E]/5 px-5 py-3">
                    <p className="text-sm font-medium text-[#5B7B5E]">
                      {pkg.schedule}
                    </p>
                  </div>

                  {/* Includes */}
                  <div className="mb-8 flex-1">
                    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#C8A96E]">
                      What&apos;s included
                    </p>
                    <ul className="space-y-3">
                      {pkg.includes.map((item, index) => (
                        <li key={index} className="flex gap-3">
                          <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#5B7B5E]" />
                          <span className="text-sm leading-relaxed text-[#2D2A26]/70">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Quote */}
                  <div className="mb-8 rounded-xl border border-[#C8A96E]/10 bg-[#C8A96E]/5 p-5">
                    <p className="font-[family-name:var(--font-playfair)] text-sm italic leading-relaxed text-[#2D2A26]/60">
                      &ldquo;{pkg.quote}&rdquo;
                    </p>
                  </div>

                  {/* CTA Button */}
                  <Link
                    href="/book"
                    className={`flex items-center justify-center rounded-full px-8 py-4 text-base font-medium tracking-wide transition-all duration-300 ${
                      pkg.popular
                        ? "bg-[#5B7B5E] text-white hover:bg-[#4A6A4D] hover:shadow-lg hover:shadow-[#5B7B5E]/20"
                        : "border border-[#5B7B5E]/30 text-[#5B7B5E] hover:bg-[#5B7B5E] hover:text-white"
                    }`}
                  >
                    Book This Retreat
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="section-divider" />
      </div>

      {/* What's NOT Included */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C8A96E]">
              Transparency
            </span>
            <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl font-semibold text-[#2D2A26] md:text-4xl">
              What&apos;s Not Included
            </h2>
            <div className="mx-auto mt-6 gold-line" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="mx-auto mt-12 grid max-w-2xl gap-4 sm:grid-cols-2"
          >
            {notIncluded.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.text}
                  variants={fadeInUp}
                  className="flex items-start gap-4 rounded-xl border border-[#2D2A26]/5 bg-white/40 p-5"
                >
                  <Icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#2D2A26]/30" strokeWidth={1.5} />
                  <span className="text-sm text-[#2D2A26]/60">
                    {item.text}
                  </span>
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

      {/* Important Details */}
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
              Good to Know
            </span>
            <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl font-semibold text-[#2D2A26] md:text-4xl">
              Important Details
            </h2>
            <div className="mx-auto mt-6 gold-line" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2"
          >
            <motion.div
              variants={fadeInUp}
              className="rounded-2xl border border-[#C8A96E]/10 bg-white/60 p-8"
            >
              <Users className="mb-4 h-6 w-6 text-[#5B7B5E]" strokeWidth={1.5} />
              <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-[#2D2A26]">
                Intimate Group Size
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#2D2A26]/60">
                Maximum 10 guests per retreat. This means personalized
                attention, space to breathe, and a truly intimate experience.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="rounded-2xl border border-[#C8A96E]/10 bg-white/60 p-8"
            >
              <Heart className="mb-4 h-6 w-6 text-[#5B7B5E]" strokeWidth={1.5} />
              <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-[#2D2A26]">
                Solo Travelers Welcome
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#2D2A26]/60">
                Over 60% of our guests come alone &mdash; and leave with lifelong
                friends. You&apos;ll feel right at home from the moment you
                arrive.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="rounded-2xl border border-[#C8A96E]/10 bg-white/60 p-8"
            >
              <Users className="mb-4 h-6 w-6 text-[#5B7B5E]" strokeWidth={1.5} />
              <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-[#2D2A26]">
                Couples & Friends
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#2D2A26]/60">
                Bring your best friend, your sister, or your mum. Shared suites
                available at a discount.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="rounded-2xl border border-[#C8A96E]/10 bg-white/60 p-8"
            >
              <CreditCard className="mb-4 h-6 w-6 text-[#5B7B5E]" strokeWidth={1.5} />
              <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-[#2D2A26]">
                Booking & Payment
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#2D2A26]/60">
                A &euro;500 deposit secures your spot. Full payment due 30 days
                before arrival.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="rounded-2xl border border-[#C8A96E]/10 bg-white/60 p-8 sm:col-span-2"
            >
              <ShieldCheck className="mb-4 h-6 w-6 text-[#5B7B5E]" strokeWidth={1.5} />
              <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-[#2D2A26]">
                Cancellation Policy
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#2D2A26]/60">
                Free cancellation up to 60 days out. 50% refund 30&ndash;60 days.
                No refunds within 30 days. We understand life happens &mdash;
                speak to us and we&apos;ll always try to find a solution.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="section-divider" />
      </div>

      {/* Upcoming Retreats — Availability Calendar */}
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
              2026 Calendar
            </span>
            <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl font-semibold text-[#2D2A26] md:text-4xl">
              Upcoming Retreats
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[#2D2A26]/60">
              Secure your spot before it&apos;s gone. Our retreats fill up fast.
            </p>
            <div className="mx-auto mt-6 gold-line" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {upcomingRetreats.map((retreat) => {
              const isSoldOut = retreat.spotsLeft === 0;
              const isUrgent = retreat.spotsLeft > 0 && retreat.spotsLeft < 4;
              return (
                <motion.div
                  key={retreat.dateRange}
                  variants={fadeInUp}
                  className={`group relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-500 ${
                    isSoldOut
                      ? "border-[#2D2A26]/10 bg-white/40"
                      : "border-[#C8A96E]/15 bg-white hover:border-[#C8A96E]/40 hover:shadow-lg hover:shadow-[#C8A96E]/8"
                  }`}
                >
                  {/* SOLD OUT overlay */}
                  {isSoldOut && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/70 backdrop-blur-[2px]">
                      <span className="rounded-full border-2 border-[#2D2A26]/20 px-6 py-2 font-[family-name:var(--font-playfair)] text-lg font-bold uppercase tracking-widest text-[#2D2A26]/40 -rotate-12">
                        Sold Out
                      </span>
                    </div>
                  )}

                  {/* Urgency badge */}
                  {isUrgent && (
                    <div className="urgency-pulse bg-red-500/90 px-3 py-1.5 text-center">
                      <span className="text-xs font-bold tracking-wide text-white">
                        Only {retreat.spotsLeft} {retreat.spotsLeft === 1 ? "spot" : "spots"} left!
                      </span>
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-6">
                    {/* Calendar date header */}
                    <div className="mb-4 flex items-center gap-4">
                      <div className="flex h-16 w-16 flex-shrink-0 flex-col items-center justify-center rounded-xl bg-[#5B7B5E]/10">
                        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#5B7B5E]">
                          {retreat.month}
                        </span>
                        <span className="font-[family-name:var(--font-playfair)] text-xl font-bold text-[#2D2A26]">
                          {retreat.startDay}
                        </span>
                      </div>
                      <div>
                        <p className="font-[family-name:var(--font-playfair)] text-base font-semibold text-[#2D2A26]">
                          {retreat.dateRange}
                        </p>
                        <p className="text-xs text-[#2D2A26]/50">{retreat.duration}</p>
                      </div>
                    </div>

                    {/* Package type */}
                    <div className="mb-3 inline-flex self-start rounded-full border border-[#C8A96E]/20 bg-[#C8A96E]/8 px-3 py-1">
                      <span className="text-xs font-medium text-[#C8A96E]">
                        {retreat.packageType}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                      <span className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-[#2D2A26]">
                        {retreat.price}
                      </span>
                      <span className="ml-1 text-xs text-[#2D2A26]/40">/ person</span>
                    </div>

                    {/* Spots remaining indicator */}
                    {!isSoldOut && (
                      <div className="mb-5">
                        <div className="flex items-center justify-between text-xs">
                          <span className={`font-medium ${isUrgent ? "text-red-500" : "text-[#5B7B5E]"}`}>
                            {retreat.spotsLeft} of 10 spots left
                          </span>
                        </div>
                        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#2D2A26]/5">
                          <div
                            className={`h-full rounded-full transition-all duration-700 ${
                              isUrgent ? "bg-red-400" : "bg-[#5B7B5E]/60"
                            }`}
                            style={{ width: `${((10 - retreat.spotsLeft) / 10) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* CTA */}
                    <div className="mt-auto">
                      {isSoldOut ? (
                        <button
                          disabled
                          className="flex w-full items-center justify-center rounded-full border border-[#2D2A26]/10 px-4 py-2.5 text-sm font-medium text-[#2D2A26]/30"
                        >
                          Sold Out
                        </button>
                      ) : (
                        <Link
                          href="/book"
                          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#5B7B5E] px-4 py-2.5 text-sm font-medium tracking-wide text-white transition-all duration-300 hover:bg-[#4A6A4D] hover:shadow-md"
                        >
                          <Calendar className="h-3.5 w-3.5" />
                          Book This Date
                        </Link>
                      )}
                    </div>
                  </div>
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

      {/* CTA Section */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-semibold text-[#2D2A26] md:text-4xl lg:text-5xl">
              Book Your Spot
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-[#2D2A26]/60">
              Spaces are limited to 10 guests per retreat. Don&apos;t wait until
              the perfect moment &mdash; the perfect moment is right now.
            </p>
            <Link
              href="/book"
              className="mt-10 inline-flex items-center justify-center rounded-full bg-[#5B7B5E] px-10 py-4 text-base font-medium tracking-wide text-white transition-all duration-300 hover:bg-[#4A6A4D] hover:shadow-lg hover:shadow-[#5B7B5E]/20"
            >
              Book Now
            </Link>
            <p className="mt-6 text-sm text-[#2D2A26]/40">
              Have questions?{" "}
              <a
                href="mailto:hello@almaretreat.com"
                className="text-[#C8A96E] underline decoration-[#C8A96E]/30 underline-offset-4 transition-colors hover:text-[#B89A5E]"
              >
                Get in touch
              </a>{" "}
              &mdash; we&apos;d love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
