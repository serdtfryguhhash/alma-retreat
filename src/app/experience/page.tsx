"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Brain,
  Wind,
  Music,
  Flower2,
  Snowflake,
  BookOpen,
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const yogaStyles = [
  "Vinyasa Flow",
  "Hatha",
  "Yin",
  "Restorative",
  "Ashtanga-Inspired",
];

const pilatesFocus = [
  "Core Strength",
  "Flexibility",
  "Posture",
  "Body Awareness",
  "Injury Prevention",
];

const wellnessOfferings = [
  {
    icon: Brain,
    title: "Guided Meditation",
    description: "Daily morning meditation to set your intention",
  },
  {
    icon: Wind,
    title: "Breathwork",
    description: "Pranayama and holotropic breathwork sessions",
  },
  {
    icon: Music,
    title: "Sound Healing",
    description: "Crystal singing bowls in our starlit cinema room",
  },
  {
    icon: Flower2,
    title: "Spa Treatments",
    description:
      "One complimentary 60-min massage; additional treatments available",
  },
  {
    icon: Snowflake,
    title: "Cold Plunge Therapy",
    description: "Our stone-walled plunge pool for nervous system reset",
  },
  {
    icon: BookOpen,
    title: "Journaling & Reflection",
    description: "Guided evening journaling sessions",
  },
];

export default function ExperiencePage() {
  return (
    <div className="bg-[#FAF8F5]">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1600&q=80"
          alt="Yoga practice at sunrise"
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
                More Than a Retreat - A Complete Reset
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-white/80 md:text-xl">
                Every element of your stay has been thoughtfully designed to
                nurture your body, calm your mind, and feed your soul
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Yoga Section */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeInLeft}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80"
                alt="Yoga session on ocean-view terrace"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeInRight}
            >
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C8A96E]">
                Yoga
              </span>
              <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl font-semibold leading-snug text-[#2D2A26] md:text-4xl">
                Yoga That Meets You Where You Are
              </h2>
              <div className="mt-6 gold-line" />
              <p className="mt-8 text-base leading-relaxed text-[#2D2A26]/70 md:text-lg">
                Whether you&apos;re flowing through your thousandth vinyasa or
                stepping onto the mat for the very first time, our instructors
                create space for every body and every level. Morning sessions are
                dynamic and energizing - think sun salutations with the actual
                sun rising over the sea. Evening sessions are slow, restorative,
                and deeply grounding. You&apos;ll practice on our open-air terrace
                with the sound of waves as your soundtrack.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {yogaStyles.map((style) => (
                  <span
                    key={style}
                    className="rounded-full border border-[#5B7B5E]/20 bg-[#5B7B5E]/5 px-4 py-2 text-sm font-medium text-[#5B7B5E]"
                  >
                    {style}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="section-divider" />
      </div>

      {/* Pilates Section */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeInLeft}
              className="order-2 lg:order-1"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C8A96E]">
                Pilates
              </span>
              <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl font-semibold leading-snug text-[#2D2A26] md:text-4xl">
                Sculpt, Strengthen, Lengthen
              </h2>
              <div className="mt-6 gold-line" />
              <p className="mt-8 text-base leading-relaxed text-[#2D2A26]/70 md:text-lg">
                Our Pilates sessions are designed to complement your yoga
                practice - building the deep core strength and body awareness
                that transforms how you move both on and off the mat. Using a
                mix of mat work and small props, our certified instructors will
                challenge you in the best way possible. You&apos;ll feel muscles you
                didn&apos;t know you had - and you&apos;ll love it.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {pilatesFocus.map((focus) => (
                  <span
                    key={focus}
                    className="rounded-full border border-[#C8A96E]/20 bg-[#C8A96E]/5 px-4 py-2 text-sm font-medium text-[#C8A96E]"
                  >
                    {focus}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeInRight}
              className="relative order-1 aspect-[4/3] overflow-hidden rounded-2xl lg:order-2"
            >
              <Image
                src="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80"
                alt="Pilates session in the studio"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="section-divider" />
      </div>

      {/* Wellness Section */}
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
              Wellness
            </span>
            <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl font-semibold text-[#2D2A26] md:text-4xl">
              Healing Beyond the Mat
            </h2>
            <div className="mx-auto mt-6 gold-line" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {wellnessOfferings.map((offering) => {
              const Icon = offering.icon;
              return (
                <motion.div
                  key={offering.title}
                  variants={fadeInUp}
                  className="group rounded-2xl border border-[#C8A96E]/10 bg-white/60 p-8 transition-all duration-500 hover:border-[#C8A96E]/30 hover:bg-white hover:shadow-lg hover:shadow-[#C8A96E]/5"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#5B7B5E]/10 transition-colors duration-300 group-hover:bg-[#5B7B5E]/15">
                    <Icon className="h-6 w-6 text-[#5B7B5E]" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-[#2D2A26]">
                    {offering.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#2D2A26]/60">
                    {offering.description}
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

      {/* Food Section */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeInLeft}
            >
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C8A96E]">
                Cuisine
              </span>
              <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl font-semibold leading-snug text-[#2D2A26] md:text-4xl">
                Food That Nourishes Every Part of You
              </h2>
              <div className="mt-6 gold-line" />
              <p className="mt-8 text-base leading-relaxed text-[#2D2A26]/70 md:text-lg">
                Forget everything you think you know about &lsquo;retreat
                food.&rsquo; Our private chef creates extraordinary plant-based
                meals using the freshest local Mallorcan ingredients -
                think heirloom tomatoes still warm from the garden, just-caught
                fish from the local market (for those who want it), and desserts
                that will make you forget they&apos;re healthy. Three full meals a
                day, plus smoothies, cold-pressed juices, and snacks available
                whenever you want them. Dietary requirements aren&apos;t just
                accommodated - they&apos;re celebrated.
              </p>
              <div className="mt-8 rounded-xl border border-[#C8A96E]/15 bg-[#C8A96E]/5 p-6">
                <p className="text-sm font-medium text-[#2D2A26]/80">
                  We cater to:{" "}
                  <span className="text-[#2D2A26]/60">
                    Vegan, Vegetarian, Pescatarian, Gluten-Free, Dairy-Free, and
                    more. Just tell us what you need.
                  </span>
                </p>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeInRight}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80"
                alt="Beautifully plated healthy cuisine"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
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
              Ready to Experience It All?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-[#2D2A26]/60">
              From sunrise yoga to gourmet dinners under the stars, every moment
              of your retreat has been crafted to help you reset, recharge, and
              rediscover yourself.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/retreats"
                className="inline-flex items-center justify-center rounded-full bg-[#5B7B5E] px-10 py-4 text-base font-medium tracking-wide text-white transition-all duration-300 hover:bg-[#4A6A4D] hover:shadow-lg hover:shadow-[#5B7B5E]/20"
              >
                View Retreats & Pricing
              </Link>
              <Link
                href="/villa"
                className="inline-flex items-center justify-center rounded-full border border-[#C8A96E]/30 px-10 py-4 text-base font-medium tracking-wide text-[#2D2A26]/70 transition-all duration-300 hover:border-[#C8A96E]/60 hover:text-[#2D2A26]"
              >
                Explore the Villa
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
