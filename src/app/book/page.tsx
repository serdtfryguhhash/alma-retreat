"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, Instagram, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const faqs = [
  {
    question: "Do I need to be experienced in yoga or pilates?",
    answer:
      "Absolutely not! Our sessions are designed for all levels, from complete beginners to advanced practitioners. Our instructors offer modifications for every pose, so you'll never feel out of your depth. Whether it's your first downward dog or your ten-thousandth, you're welcome here.",
  },
  {
    question: "I'm coming alone - will I feel awkward?",
    answer:
      "Not even for a second. Over 60% of our guests come solo, and it's honestly the best way to experience Alma. Within hours of arriving, you'll feel like you've known these women for years. Our welcome ceremony is designed to break the ice, and by dinner on night one, you'll have a whole new girl gang.",
  },
  {
    question: "What should I pack?",
    answer:
      "Think comfortable, breathable clothes for practice - leggings, tanks, sports bras. A light jacket for evenings (it can get cool on the terrace after sunset). Swimwear for the pool and beach. A nice outfit if you want to feel cute at dinner (totally optional - we love barefoot vibes too). We provide yoga mats, blocks, and all props.",
  },
  {
    question: "What are the meals like?",
    answer:
      "Three words: absolutely incredible. Our private chef prepares three gourmet meals a day, primarily plant-based with pescatarian options available. Think colourful Buddha bowls, fresh Mediterranean salads, homemade sourdough, smoothie bowls, and desserts that taste too good to be healthy. Fresh juices and snacks are available all day. We accommodate all dietary needs - just let us know when you book.",
  },
  {
    question: "Is alcohol available?",
    answer:
      "We encourage a mindful approach to alcohol during the retreat. We don't include alcohol in the packages, but we're not a dry retreat. Wine is available at dinner if you'd like. We also offer incredible mocktails, kombucha, and herbal tonics.",
  },
  {
    question: "How do I get to the villa?",
    answer:
      "Fly into Palma de Mallorca Airport (PMI). We handle everything from there - your private transfer will be waiting to whisk you to Camp de Mar (about 35 minutes). Just send us your flight details and we'll sort the rest.",
  },
  {
    question: "What's the cancellation policy?",
    answer:
      "Life happens - we get it. Free cancellation up to 60 days before your retreat. Cancel 30–60 days out and you'll receive a 50% refund. Within 30 days, we're unable to offer refunds, but you can transfer your booking to a friend or move to a future date.",
  },
  {
    question: "Can I extend my stay?",
    answer:
      "We love that you already don't want to leave! Subject to availability, you can extend at a nightly rate. Many of our guests add an extra night or two to explore Mallorca on their own after the retreat ends.",
  },
  {
    question: "Is this retreat women-only?",
    answer:
      "Yes! Alma Retreat is designed as a women's-only wellness experience. We find this creates a uniquely supportive, open, and empowering environment where everyone can truly be themselves.",
  },
  {
    question: "What's the WiFi situation?",
    answer:
      "The villa has high-speed WiFi throughout. That said, we gently encourage a bit of a digital detox - your Instagram can wait, but this sunset can't.",
  },
];

export default function BookPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    retreat: "",
    dates: "",
    traveling: "",
    about: "",
    heardFrom: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const inputClasses =
    "w-full rounded-lg border border-[#C8A96E]/30 bg-white px-4 py-3 text-sm text-[#2D2A26] placeholder:text-[#2D2A26]/40 outline-none transition-all duration-300 focus:border-[#5B7B5E] focus:ring-2 focus:ring-[#5B7B5E]/20";

  const selectClasses =
    "w-full rounded-lg border border-[#C8A96E]/30 bg-white px-4 py-3 text-sm text-[#2D2A26] outline-none transition-all duration-300 focus:border-[#5B7B5E] focus:ring-2 focus:ring-[#5B7B5E]/20 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23C8A96E%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:18px] bg-[right_12px_center] bg-no-repeat";

  const labelClasses =
    "block text-sm font-medium tracking-wide text-[#2D2A26]/70 mb-2";

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 bg-gradient-to-b from-[#5B7B5E]/5 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="mx-auto max-w-2xl text-center"
          >
            <motion.div
              variants={fadeInUp}
              custom={0}
              className="mx-auto mb-6 h-[2px] w-16 bg-gradient-to-r from-[#C8A96E] to-[#E8D5A8]"
            />
            <motion.h1
              variants={fadeInUp}
              custom={1}
              className="font-[family-name:var(--font-playfair)] text-4xl font-semibold tracking-tight text-[#2D2A26] md:text-5xl lg:text-6xl"
            >
              Your Journey Starts Here
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              custom={2}
              className="mt-6 text-lg leading-relaxed text-[#2D2A26]/60 md:text-xl"
            >
              Fill out the form below and we&apos;ll get back to you within 24 hours
              with availability and next steps
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-[#5B7B5E]/20 bg-white p-12 text-center shadow-sm md:p-16"
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#5B7B5E]/10">
                <CheckCircle className="h-8 w-8 text-[#5B7B5E]" />
              </div>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-semibold text-[#2D2A26] md:text-4xl">
                Thank You, {formData.firstName}!
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-[#2D2A26]/60">
                We&apos;ve received your enquiry and we&apos;re so excited you&apos;re
                considering Alma. One of our team will be in touch within 24 hours with
                availability and everything you need to know.
              </p>
              <p className="mt-6 text-sm text-[#2D2A26]/40">
                In the meantime, follow us on{" "}
                <a
                  href="https://instagram.com/almaretreatmallorca"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5B7B5E] underline underline-offset-4 transition-colors hover:text-[#4A6A4D]"
                >
                  Instagram
                </a>{" "}
                for a taste of what&apos;s to come.
              </p>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
              className="rounded-2xl border border-[#C8A96E]/15 bg-white p-8 shadow-sm md:p-12"
            >
              {/* Name Row */}
              <div className="grid gap-6 md:grid-cols-2">
                <motion.div variants={fadeInUp} custom={0}>
                  <label htmlFor="firstName" className={labelClasses}>
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Your first name"
                    className={inputClasses}
                  />
                </motion.div>
                <motion.div variants={fadeInUp} custom={1}>
                  <label htmlFor="lastName" className={labelClasses}>
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Your last name"
                    className={inputClasses}
                  />
                </motion.div>
              </div>

              {/* Email & Phone Row */}
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <motion.div variants={fadeInUp} custom={2}>
                  <label htmlFor="email" className={labelClasses}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={inputClasses}
                  />
                </motion.div>
                <motion.div variants={fadeInUp} custom={3}>
                  <label htmlFor="phone" className={labelClasses}>
                    Phone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+44 7700 000000"
                    className={inputClasses}
                  />
                </motion.div>
              </div>

              {/* Retreat Selection */}
              <motion.div variants={fadeInUp} custom={4} className="mt-6">
                <label htmlFor="retreat" className={labelClasses}>
                  Which retreat interests you?
                </label>
                <select
                  id="retreat"
                  name="retreat"
                  required
                  value={formData.retreat}
                  onChange={handleChange}
                  className={`${selectClasses} ${
                    !formData.retreat ? "text-[#2D2A26]/40" : ""
                  }`}
                >
                  <option value="" disabled>
                    Select a retreat
                  </option>
                  <option value="weekend-reset">Weekend Reset</option>
                  <option value="deep-dive">Deep Dive</option>
                  <option value="full-transformation">Full Transformation</option>
                </select>
              </motion.div>

              {/* Preferred Dates */}
              <motion.div variants={fadeInUp} custom={5} className="mt-6">
                <label htmlFor="dates" className={labelClasses}>
                  Preferred dates
                </label>
                <select
                  id="dates"
                  name="dates"
                  required
                  value={formData.dates}
                  onChange={handleChange}
                  className={`${selectClasses} ${
                    !formData.dates ? "text-[#2D2A26]/40" : ""
                  }`}
                >
                  <option value="" disabled>
                    Select your preferred dates
                  </option>
                  <option value="spring-2026">Spring 2026</option>
                  <option value="summer-2026">Summer 2026</option>
                  <option value="late-summer-2026">Late Summer 2026</option>
                  <option value="autumn-2026">Autumn 2026</option>
                </select>
              </motion.div>

              {/* Traveling */}
              <motion.div variants={fadeInUp} custom={6} className="mt-6">
                <label htmlFor="traveling" className={labelClasses}>
                  Are you traveling solo or with someone?
                </label>
                <select
                  id="traveling"
                  name="traveling"
                  required
                  value={formData.traveling}
                  onChange={handleChange}
                  className={`${selectClasses} ${
                    !formData.traveling ? "text-[#2D2A26]/40" : ""
                  }`}
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option value="solo">Solo</option>
                  <option value="friend">With a friend</option>
                  <option value="partner">With a partner</option>
                  <option value="group">Group of 3+</option>
                </select>
              </motion.div>

              {/* About You */}
              <motion.div variants={fadeInUp} custom={7} className="mt-6">
                <label htmlFor="about" className={labelClasses}>
                  Tell us about yourself
                </label>
                <textarea
                  id="about"
                  name="about"
                  rows={4}
                  value={formData.about}
                  onChange={handleChange}
                  placeholder="Any dietary requirements, injuries, yoga experience, or anything else we should know?"
                  className={`${inputClasses} resize-none`}
                />
              </motion.div>

              {/* How Did You Hear */}
              <motion.div variants={fadeInUp} custom={8} className="mt-6">
                <label htmlFor="heardFrom" className={labelClasses}>
                  How did you hear about us?
                </label>
                <select
                  id="heardFrom"
                  name="heardFrom"
                  value={formData.heardFrom}
                  onChange={handleChange}
                  className={`${selectClasses} ${
                    !formData.heardFrom ? "text-[#2D2A26]/40" : ""
                  }`}
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option value="instagram">Instagram</option>
                  <option value="google">Google</option>
                  <option value="friend">Friend</option>
                  <option value="blog">Blog</option>
                  <option value="other">Other</option>
                </select>
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={fadeInUp} custom={9} className="mt-10">
                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-3 rounded-full bg-[#5B7B5E] px-8 py-4 text-base font-medium tracking-wide text-white transition-all duration-300 hover:bg-[#4A6A4D] hover:shadow-lg active:scale-[0.98]"
                >
                  <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  Request Availability
                </button>
              </motion.div>
            </motion.form>
          )}
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="border-t border-[#C8A96E]/10 bg-[#F5F2ED]/50 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.div
              variants={fadeInUp}
              custom={0}
              className="mx-auto mb-6 h-[2px] w-12 bg-gradient-to-r from-[#C8A96E] to-[#E8D5A8]"
            />
            <motion.h2
              variants={fadeInUp}
              custom={1}
              className="font-[family-name:var(--font-playfair)] text-3xl font-semibold tracking-tight text-[#2D2A26] md:text-4xl"
            >
              Prefer to chat? We&apos;d love to hear from you.
            </motion.h2>

            <motion.div
              variants={fadeInUp}
              custom={2}
              className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
            >
              {/* Email */}
              <a
                href="mailto:hello@almaretreat.com"
                className="group flex flex-col items-center gap-3 rounded-xl p-6 transition-all duration-300 hover:bg-white/60"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#5B7B5E]/10 transition-colors duration-300 group-hover:bg-[#5B7B5E]/15">
                  <Mail className="h-5 w-5 text-[#5B7B5E]" />
                </div>
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#C8A96E]">
                  Email
                </span>
                <span className="text-sm text-[#2D2A26]/70 transition-colors duration-300 group-hover:text-[#2D2A26]">
                  hello@almaretreat.com
                </span>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/almaretreatmallorca"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 rounded-xl p-6 transition-all duration-300 hover:bg-white/60"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#5B7B5E]/10 transition-colors duration-300 group-hover:bg-[#5B7B5E]/15">
                  <Instagram className="h-5 w-5 text-[#5B7B5E]" />
                </div>
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#C8A96E]">
                  Instagram
                </span>
                <span className="text-sm text-[#2D2A26]/70 transition-colors duration-300 group-hover:text-[#2D2A26]">
                  @almaretreatmallorca
                </span>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/34971222323"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 rounded-xl p-6 transition-all duration-300 hover:bg-white/60"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#5B7B5E]/10 transition-colors duration-300 group-hover:bg-[#5B7B5E]/15">
                  <Phone className="h-5 w-5 text-[#5B7B5E]" />
                </div>
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#C8A96E]">
                  WhatsApp
                </span>
                <span className="text-sm text-[#2D2A26]/70 transition-colors duration-300 group-hover:text-[#2D2A26]">
                  +34 971 22 23 23
                </span>
              </a>

              {/* Location */}
              <div className="flex flex-col items-center gap-3 rounded-xl p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#5B7B5E]/10">
                  <MapPin className="h-5 w-5 text-[#5B7B5E]" />
                </div>
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#C8A96E]">
                  Location
                </span>
                <span className="text-center text-sm text-[#2D2A26]/70">
                  Camp de Mar, Andratx
                  <br />
                  Mallorca, Spain
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.div
              variants={fadeInUp}
              custom={0}
              className="mx-auto mb-6 h-[2px] w-12 bg-gradient-to-r from-[#C8A96E] to-[#E8D5A8]"
            />
            <motion.h2
              variants={fadeInUp}
              custom={1}
              className="font-[family-name:var(--font-playfair)] text-3xl font-semibold tracking-tight text-[#2D2A26] md:text-4xl"
            >
              Questions? We&apos;ve Got You
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
            custom={2}
            className="mt-12"
          >
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b border-[#C8A96E]/15 last:border-b-0"
                >
                  <AccordionTrigger className="py-5 text-left font-[family-name:var(--font-playfair)] text-base font-medium text-[#2D2A26] hover:no-underline hover:text-[#5B7B5E] md:text-lg [&[data-state=open]]:text-[#5B7B5E]">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-relaxed text-[#2D2A26]/60 md:text-base md:leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-[#C8A96E]/10 bg-[#F5F2ED]/50 py-16 md:py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
          custom={0}
          className="mx-auto max-w-2xl px-6 text-center lg:px-8"
        >
          <p className="text-lg leading-relaxed text-[#2D2A26]/60 md:text-xl">
            Still have questions? Email us at{" "}
            <a
              href="mailto:hello@almaretreat.com"
              className="font-medium text-[#5B7B5E] underline underline-offset-4 transition-colors duration-300 hover:text-[#4A6A4D]"
            >
              hello@almaretreat.com
            </a>{" "}
            - we reply within 24 hours.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
