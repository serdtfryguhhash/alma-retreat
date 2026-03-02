"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Bed,
  Flower2,
  UtensilsCrossed,
  Droplets,
  Brain,
  Car,
  Waves,
  Film,
  ChevronDown,
  ArrowRight,
  Star,
  Quote,
  PlayCircle,
  Heart,
  MessageCircle,
  Instagram,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const inclusions = [
  {
    icon: Bed,
    title: "Luxury Accommodation",
    desc: "Your own beautifully designed suite in our Camp de Mar mansion, with ocean views and marble finishes.",
  },
  {
    icon: Flower2,
    title: "Daily Yoga & Pilates",
    desc: "Two expertly-led sessions per day \u2014 sunrise flow and afternoon sculpt \u2014 suitable for all levels.",
  },
  {
    icon: UtensilsCrossed,
    title: "Gourmet Plant-Based Meals",
    desc: "Three chef-prepared meals daily plus fresh juices, smoothies, and snacks all day. All dietary needs accommodated.",
  },
  {
    icon: Droplets,
    title: "Spa & Wellness",
    desc: "Access to our stone plunge pool, rooftop jacuzzi, and one 60-minute massage included per stay.",
  },
  {
    icon: Brain,
    title: "Meditation & Breathwork",
    desc: "Guided sessions to quiet the mind and deepen your practice.",
  },
  {
    icon: Car,
    title: "Airport Transfers",
    desc: "Private transfer from Palma airport to the villa and back \u2014 you don\u2019t lift a finger.",
  },
  {
    icon: Waves,
    title: "Beach Access",
    desc: "Private pathway through Mediterranean pines down to the crystal-clear waters of Camp de Mar.",
  },
  {
    icon: Film,
    title: "Cinema & Chill",
    desc: "Our starlit cinema room is yours for movie nights, sound baths, or just unwinding with your new friends.",
  },
];

const packages = [
  {
    name: "The Weekend Reset",
    duration: "3 nights / 4 days",
    price: "\u20AC1,850",
    desc: "Perfect for a quick recharge. Arrive Thursday, leave Sunday with a whole new energy.",
    highlight: false,
  },
  {
    name: "The Deep Dive",
    duration: "5 nights / 6 days",
    price: "\u20AC2,950",
    desc: "Our most popular retreat. Enough time to truly unwind, deepen your practice, and fall in love with island life.",
    highlight: true,
  },
  {
    name: "The Full Transformation",
    duration: "7 nights / 8 days",
    price: "\u20AC3,850",
    desc: "A full week to completely reset your body, mind, and spirit. You\u2019ll leave feeling like a different person.",
    highlight: false,
  },
];

const schedule = [
  { time: "7:00 AM", label: "Sunrise meditation on the terrace" },
  { time: "7:30 AM", label: "Morning yoga flow (75 min)" },
  { time: "9:00 AM", label: "Nourishing breakfast with fresh juices" },
  { time: "10:30 AM", label: "Free time: pool, beach, spa, or explore Andratx" },
  { time: "1:00 PM", label: "Light Mediterranean lunch" },
  { time: "3:00 PM", label: "Afternoon Pilates sculpt (60 min)" },
  { time: "4:30 PM", label: "Breathwork or sound healing session" },
  { time: "5:30 PM", label: "Free time: jacuzzi, beach, reading" },
  { time: "7:30 PM", label: "Gourmet dinner under the stars" },
  { time: "9:00 PM", label: "Cinema night or guided journaling" },
];

const testimonials = [
  {
    text: "I came to Alma feeling completely burnt out and left feeling like I\u2019d been given a whole new body. The villa is unreal \u2014 I couldn\u2019t stop taking photos. The food alone is worth the trip.",
    name: "Sophie L.",
    location: "London",
  },
  {
    text: "This was supposed to be a solo trip but I left with 8 new best friends. The instructors are world-class, the location is paradise, and every single detail is thought of. I\u2019m already booked for next year.",
    name: "Emma K.",
    location: "Amsterdam",
  },
  {
    text: "I\u2019ve done retreats in Bali, Tulum, and Costa Rica \u2014 Alma blows them all out of the water. The villa is next-level luxury and you can tell every meal and class is crafted with so much love.",
    name: "Charlotte M.",
    location: "New York",
  },
];

const instagramPosts = [
  {
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80",
    alt: "Morning yoga session on a sunlit terrace",
    likes: 324,
    comments: 18,
  },
  {
    image: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=600&q=80",
    alt: "Fresh healthy breakfast bowl with tropical fruits",
    likes: 287,
    comments: 12,
  },
  {
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
    alt: "Pilates session in a bright studio",
    likes: 412,
    comments: 24,
  },
  {
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
    alt: "Crystal clear Mediterranean beach at golden hour",
    likes: 536,
    comments: 31,
  },
  {
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80",
    alt: "Meditation practice at sunset",
    likes: 298,
    comments: 15,
  },
  {
    image: "https://images.unsplash.com/photo-1540539234-c14a20fb7c7b?w=600&q=80",
    alt: "Luxury infinity pool overlooking mountains",
    likes: 471,
    comments: 27,
  },
];

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */
export default function Home() {
  return (
    <>
      {/* ============================================================ */}
      {/*  1. HERO                                                      */}
      {/* ============================================================ */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Background image */}
        <Image
          src="https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=1600&q=80"
          alt="Yoga by the ocean at sunrise"
          fill
          priority
          className="object-cover"
        />
        {/* Static dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        {/* Animated shifting gradient overlay */}
        <div className="hero-gradient-animated absolute inset-0" />

        {/* Floating bokeh particles (CSS only) */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="bokeh-particle bokeh-1 absolute left-[10%] top-[20%] h-32 w-32 rounded-full bg-[#C8A96E]/15" />
          <div className="bokeh-particle bokeh-2 absolute left-[70%] top-[15%] h-48 w-48 rounded-full bg-white/8" />
          <div className="bokeh-particle bokeh-3 absolute left-[50%] top-[60%] h-24 w-24 rounded-full bg-[#5B7B5E]/15" />
          <div className="bokeh-particle bokeh-1 absolute left-[85%] top-[70%] h-36 w-36 rounded-full bg-[#C8A96E]/10" />
          <div className="bokeh-particle bokeh-2 absolute left-[25%] top-[75%] h-20 w-20 rounded-full bg-white/10" />
          <div className="bokeh-particle bokeh-3 absolute left-[40%] top-[30%] h-40 w-40 rounded-full bg-[#5B7B5E]/10" />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-8"
          >
            <motion.p
              variants={fadeInUp}
              className="text-sm font-medium uppercase tracking-[0.3em] text-[#C8A96E]"
            >
              Camp de Mar, Mallorca
            </motion.p>

            <motion.h1
              variants={fadeInUp}
              className="font-[family-name:var(--font-playfair)] text-5xl font-semibold leading-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
            >
              Breathe. Move.
              <br />
              Transform.
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mx-auto max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl"
            >
              Luxury yoga &amp; pilates retreats in a breathtaking Mallorca
              mansion overlooking the Mediterranean
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row"
            >
              <Link
                href="/retreats"
                className="inline-flex items-center gap-2 rounded-full bg-[#5B7B5E] px-8 py-4 text-sm font-medium tracking-wide text-white transition-all duration-300 hover:bg-[#4A6A4D] hover:shadow-lg"
              >
                Explore Retreats
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#experience"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-8 py-4 text-sm font-medium tracking-wide text-white transition-all duration-300 hover:border-white hover:bg-white/10"
              >
                <PlayCircle className="h-5 w-5" />
                Watch Our Story
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll-down indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="scroll-indicator flex flex-col items-center gap-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/40">
              Scroll
            </span>
            <div className="flex flex-col items-center gap-0.5">
              <ChevronDown className="h-4 w-4 text-white/50" />
              <ChevronDown className="-mt-2 h-4 w-4 text-white/30" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* ============================================================ */}
      {/*  2. INTRO / ABOUT                                             */}
      {/* ============================================================ */}
      <section className="overflow-hidden bg-[#FAF8F5] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Gold divider */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="mb-16 flex justify-center"
          >
            <div className="gold-line" />
          </motion.div>

          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Text */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={stagger}
              className="space-y-6"
            >
              <motion.h2
                variants={fadeInUp}
                className="font-[family-name:var(--font-playfair)] text-3xl font-semibold leading-snug text-[#2D2A26] sm:text-4xl lg:text-5xl"
              >
                This Is the Escape
                <br />
                You&apos;ve Been Craving
              </motion.h2>

              <motion.div variants={fadeInUp} className="space-y-5 text-[#2D2A26]/70 leading-relaxed">
                <p>
                  You give so much of yourself every single day. To your work, your
                  relationships, to everyone around you. And somewhere along the
                  way, you forgot to pause. To breathe. To ask yourself what{" "}
                  <em>you</em> actually need.
                </p>
                <p>
                  This isn&apos;t just a retreat &mdash; it&apos;s a full reset. Picture
                  yourself waking up to Mediterranean sunlight pouring through
                  floor-to-ceiling windows, the sound of waves just below. Your
                  mornings start with sunrise yoga on a terrace overlooking the
                  sea. Your afternoons are spent by the infinity pool with a fresh
                  juice in hand. Your evenings end with gourmet plant-based dinners
                  under the stars, surrounded by women who just <em>get it</em>.
                </p>
                <p>
                  Every detail at Alma has been designed with you in mind &mdash;
                  from the luxury suites with marble finishes to the carefully
                  curated classes led by world-class instructors. You don&apos;t
                  need to plan a thing. Just arrive, let go, and let us take care
                  of the rest.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Link
                  href="/experience"
                  className="inline-flex items-center gap-2 text-sm font-medium tracking-wide text-[#5B7B5E] transition-colors hover:text-[#4A6A4D]"
                >
                  Discover the experience
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <div className="image-hover overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80"
                  alt="Luxury villa infinity pool overlooking the Mediterranean"
                  width={800}
                  height={600}
                  className="h-[500px] w-full object-cover lg:h-[600px]"
                />
              </div>
              {/* Floating accent card */}
              <div className="absolute -bottom-6 -left-6 rounded-xl bg-white p-5 shadow-lg lg:-bottom-8 lg:-left-8">
                <p className="font-[family-name:var(--font-playfair)] text-sm italic text-[#2D2A26]/60">
                  &ldquo;The villa that takes
                  <br />
                  your breath away&rdquo;
                </p>
                <div className="mt-2 gold-line" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  3. WHAT'S INCLUDED                                           */}
      {/* ============================================================ */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="mb-16 text-center"
          >
            <motion.div variants={fadeInUp} className="mb-4 flex justify-center">
              <div className="gold-line" />
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="font-[family-name:var(--font-playfair)] text-3xl font-semibold text-[#2D2A26] sm:text-4xl lg:text-5xl"
            >
              Everything You Need, Nothing You Don&apos;t
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {inclusions.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                className="group rounded-2xl border border-[#C8A96E]/10 bg-[#FAF8F5] p-6 transition-all duration-300 hover:border-[#C8A96E]/30 hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#5B7B5E]/10 text-[#5B7B5E] transition-colors duration-300 group-hover:bg-[#5B7B5E]/20">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-[family-name:var(--font-playfair)] text-lg font-semibold text-[#2D2A26]">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#2D2A26]/60">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  4. RETREAT PACKAGES                                          */}
      {/* ============================================================ */}
      <section className="bg-[#FAF8F5] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="mb-16 text-center"
          >
            <motion.div variants={fadeInUp} className="mb-4 flex justify-center">
              <div className="gold-line" />
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="font-[family-name:var(--font-playfair)] text-3xl font-semibold text-[#2D2A26] sm:text-4xl lg:text-5xl"
            >
              Choose Your Retreat
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="mx-auto mt-4 max-w-xl text-[#2D2A26]/60"
            >
              From long weekends to full transformative weeks &mdash; find the
              getaway that fits your life.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="grid gap-8 lg:grid-cols-3"
          >
            {packages.map((pkg) => (
              <motion.div
                key={pkg.name}
                variants={fadeInUp}
                className={`relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:shadow-lg ${
                  pkg.highlight
                    ? "border-[#C8A96E]/40 bg-white shadow-md"
                    : "border-[#C8A96E]/10 bg-white"
                }`}
              >
                {pkg.highlight && (
                  <div className="absolute top-0 right-0 rounded-bl-xl bg-[#C8A96E] px-4 py-1.5 text-xs font-medium tracking-wide text-white">
                    Most Popular
                  </div>
                )}
                <div className="flex flex-1 flex-col p-8">
                  {/* Gold accent line */}
                  <div className="mb-6 h-[2px] w-10 bg-gradient-to-r from-[#C8A96E] to-[#E8D5A8]" />

                  <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-[#2D2A26]">
                    {pkg.name}
                  </h3>
                  <p className="mt-1 text-sm tracking-wide text-[#C8A96E]">
                    {pkg.duration}
                  </p>

                  <p className="mt-6 text-[#2D2A26]/60 leading-relaxed">
                    {pkg.desc}
                  </p>

                  <div className="mt-auto pt-8">
                    <p className="text-sm text-[#2D2A26]/40">From</p>
                    <p className="font-[family-name:var(--font-playfair)] text-3xl font-semibold text-[#2D2A26]">
                      {pkg.price}
                    </p>
                    <p className="text-sm text-[#2D2A26]/40">per person</p>

                    <Link
                      href="/retreats"
                      className={`mt-6 flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300 ${
                        pkg.highlight
                          ? "bg-[#5B7B5E] text-white hover:bg-[#4A6A4D]"
                          : "border border-[#5B7B5E] text-[#5B7B5E] hover:bg-[#5B7B5E] hover:text-white"
                      }`}
                    >
                      Learn More
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mt-10 text-center text-sm text-[#2D2A26]/50"
          >
            All packages are all-inclusive: accommodation, meals, classes,
            transfers, and spa access.
          </motion.p>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  5. A DAY AT ALMA                                             */}
      {/* ============================================================ */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="mb-16 text-center"
          >
            <motion.div variants={fadeInUp} className="mb-4 flex justify-center">
              <div className="gold-line" />
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="font-[family-name:var(--font-playfair)] text-3xl font-semibold text-[#2D2A26] sm:text-4xl lg:text-5xl"
            >
              A Day in Your New Life
            </motion.h2>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="relative mx-auto max-w-3xl"
          >
            {/* Center line */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-[#C8A96E]/40 via-[#C8A96E]/20 to-transparent md:left-1/2 md:-translate-x-px" />

            {schedule.map((item, i) => (
              <motion.div
                key={item.time}
                variants={fadeInUp}
                className={`relative mb-8 flex items-start gap-8 last:mb-0 md:gap-0 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 top-2 z-10 flex h-3 w-3 -translate-x-1/2 items-center justify-center md:left-1/2">
                  <div className="h-3 w-3 rounded-full border-2 border-[#C8A96E] bg-white" />
                </div>

                {/* Content */}
                <div
                  className={`ml-10 w-full md:ml-0 md:w-[calc(50%-2rem)] ${
                    i % 2 === 0 ? "md:pr-0 md:text-right" : "md:pl-0 md:text-left"
                  }`}
                >
                  <div
                    className={`rounded-xl border border-[#C8A96E]/10 bg-[#FAF8F5] p-4 transition-all duration-300 hover:border-[#C8A96E]/25 hover:shadow-sm`}
                  >
                    <span className="font-[family-name:var(--font-playfair)] text-sm font-semibold text-[#C8A96E]">
                      {item.time}
                    </span>
                    <p className="mt-1 text-sm text-[#2D2A26]/70">{item.label}</p>
                  </div>
                </div>

                {/* Spacer for opposite side on desktop */}
                <div className="hidden md:block md:w-[calc(50%-2rem)]" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  6. TESTIMONIALS                                              */}
      {/* ============================================================ */}
      <section className="bg-[#FAF8F5] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="mb-16 text-center"
          >
            <motion.div variants={fadeInUp} className="mb-4 flex justify-center">
              <div className="gold-line" />
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="font-[family-name:var(--font-playfair)] text-3xl font-semibold text-[#2D2A26] sm:text-4xl lg:text-5xl"
            >
              What Our Guests Say
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="grid gap-8 md:grid-cols-3"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="relative rounded-2xl border border-[#C8A96E]/10 bg-white p-8 transition-all duration-300 hover:shadow-md"
              >
                {/* Quote icon */}
                <Quote className="mb-4 h-8 w-8 text-[#C8A96E]/30" />

                {/* Stars */}
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className="h-4 w-4 fill-[#C8A96E] text-[#C8A96E]"
                    />
                  ))}
                </div>

                <p className="mb-6 text-[#2D2A26]/70 leading-relaxed italic">
                  &ldquo;{t.text}&rdquo;
                </p>

                <div className="border-t border-[#C8A96E]/10 pt-4">
                  <p className="font-[family-name:var(--font-playfair)] font-semibold text-[#2D2A26]">
                    {t.name}
                  </p>
                  <p className="text-sm text-[#2D2A26]/50">{t.location}</p>
                </div>

                {/* Gold accent corner */}
                <div className="absolute top-0 right-0 h-16 w-16 overflow-hidden rounded-tr-2xl">
                  <div className="absolute top-0 right-0 h-[2px] w-10 bg-gradient-to-l from-[#C8A96E] to-transparent" />
                  <div className="absolute top-0 right-0 h-10 w-[2px] bg-gradient-to-b from-[#C8A96E] to-transparent" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  7. INSTAGRAM SOCIAL FEED                                     */}
      {/* ============================================================ */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="mb-14 text-center"
          >
            <motion.div variants={fadeInUp} className="mb-4 flex justify-center">
              <div className="gold-line" />
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="font-[family-name:var(--font-playfair)] text-3xl font-semibold text-[#2D2A26] sm:text-4xl lg:text-5xl"
            >
              Follow Our Journey
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="mt-3 text-base text-[#C8A96E] font-medium"
            >
              @almaretreatmallorca
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {instagramPosts.map((post, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="insta-card aspect-square shadow-sm"
              >
                <Image
                  src={post.image}
                  alt={post.alt}
                  width={600}
                  height={600}
                  className="h-full w-full object-cover"
                />
                <div className="insta-overlay">
                  <div className="flex items-center gap-1.5 text-white">
                    <Heart className="h-5 w-5 fill-white" />
                    <span className="text-sm font-semibold">{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white">
                    <MessageCircle className="h-5 w-5 fill-white" />
                    <span className="text-sm font-semibold">{post.comments}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mt-10 text-center"
          >
            <a
              href="https://instagram.com/almaretreatmallorca"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border border-[#2D2A26]/15 bg-white px-8 py-3.5 text-sm font-medium tracking-wide text-[#2D2A26] shadow-sm transition-all duration-300 hover:border-[#2D2A26]/30 hover:shadow-md"
            >
              <Instagram className="h-5 w-5" />
              Follow Us on Instagram
            </a>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  8. FINAL CTA                                                 */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden py-32 lg:py-40">
        {/* Background image */}
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80"
          alt="Mallorca Mediterranean coastline"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="relative z-10 mx-auto max-w-3xl px-6 text-center"
        >
          <motion.div variants={fadeInUp} className="mb-6 flex justify-center">
            <div className="h-[2px] w-10 bg-gradient-to-r from-[#C8A96E] to-[#E8D5A8]" />
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="font-[family-name:var(--font-playfair)] text-3xl font-semibold text-white sm:text-4xl lg:text-5xl"
          >
            Your Transformation
            <br />
            Starts Here
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/80"
          >
            Spaces are limited to just 10 guests per retreat to keep the
            experience intimate and personal. Book your spot now.
          </motion.p>

          <motion.div variants={fadeInUp} className="mt-10">
            <Link
              href="/retreats"
              className="inline-flex items-center gap-2 rounded-full bg-[#5B7B5E] px-10 py-4 text-base font-medium tracking-wide text-white transition-all duration-300 hover:bg-[#4A6A4D] hover:shadow-lg"
            >
              Book Your Retreat
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="mt-6 text-sm text-white/50"
          >
            Questions?{" "}
            <a
              href="mailto:hello@almaretreat.com"
              className="text-[#C8A96E] underline underline-offset-4 transition-colors hover:text-[#E8D5A8]"
            >
              hello@almaretreat.com
            </a>
          </motion.p>
        </motion.div>
      </section>
    </>
  );
}
