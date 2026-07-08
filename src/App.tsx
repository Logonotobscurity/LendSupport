import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  Copy,
  Check,
  Share2,
  ArrowRight,
  ArrowUpRight,
  Bitcoin,
  CreditCard,
  Building2,
  Shield,
  Clock,
  Heart,
} from 'lucide-react'
import { CountdownTimer } from './components/CountdownTimer'
import { StackedFeed } from './components/StackedFeed'
import { ThankYouModal } from './components/ThankYouModal'
import { ImageMarquee } from './components/ImageMarquee'

/* ────────────────────────────────────────────────────── */
/*  Constants                                             */
/* ────────────────────────────────────────────────────── */

const ease = [0.25, 0.46, 0.45, 0.94] as const

const SEO = {
  title: "Support Oluwamayowa 'Logo' Adebola — Restore. Rebuild. Rise.",
  description:
    "Help restore the life of a community pillar. Support Oluwamayowa 'Logo' Adebola's housing recovery after a ceiling collapse (₦750,000) and his time-sensitive UK Global Talent Visa medical fund ($1,000). 100% transparent — every naira accounted for.",
  image: 'https://i.ibb.co/VXZ5Fy2/IMG-20231101-233922-794.jpg',
  url: 'https://supportlogo.org',
  siteName: 'Support Logo',
  twitterHandle: '@supportlogo',
  keywords:
    'support Logo, Oluwamayowa Adebola, emergency housing fund Nigeria, UK Global Talent Visa, community fundraiser, ceiling collapse, donation campaign, Nigerian educator, community pillar',
}

/* ────────────────────────────────────────────────────── */
/*  CopyButton (with modal trigger)                       */
/* ────────────────────────────────────────────────────── */

interface CopyButtonProps {
  text: string
  label: string
  onCopied: (label: string) => void
}

const CopyButton = ({ text, label, onCopied }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    onCopied(label)
    setTimeout(() => setCopied(false), 2500)
  }
  return (
    <button
      onClick={handleCopy}
      className="ml-2 p-1.5 rounded-lg transition-all hover:bg-white/10 group relative"
      title={`Copy ${label}`}
    >
      {copied ? (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 15 }}
        >
          <Check size={14} className="text-accent" />
        </motion.div>
      ) : (
        <Copy
          size={14}
          className="text-white/40 group-hover:text-white/80 transition-colors"
        />
      )}
    </button>
  )
}

/* ────────────────────────────────────────────────────── */
/*  App                                                   */
/* ────────────────────────────────────────────────────── */

export default function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const [copiedLabel, setCopiedLabel] = useState('')

  const handleCopied = useCallback((label: string) => {
    setCopiedLabel(label)
    setModalOpen(true)
  }, [])

  /* ── SEO Meta Tags ── */
  useEffect(() => {
    document.title = SEO.title

    const setMeta = (
      attr: 'name' | 'property',
      key: string,
      content: string,
    ) => {
      let el = document.head.querySelector<HTMLMetaElement>(
        `meta[${attr}="${key}"]`,
      )
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, key)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    // Standard SEO
    setMeta('name', 'description', SEO.description)
    setMeta('name', 'keywords', SEO.keywords)
    setMeta('name', 'author', 'Support Logo Community')
    setMeta('name', 'robots', 'index, follow, max-snippet:-1, max-image-preview:large')

    // Open Graph
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:url', SEO.url)
    setMeta('property', 'og:title', SEO.title)
    setMeta('property', 'og:description', SEO.description)
    setMeta('property', 'og:image', SEO.image)
    setMeta('property', 'og:image:width', '1200')
    setMeta('property', 'og:image:height', '630')
    setMeta('property', 'og:image:alt', "Oluwamayowa 'Logo' Adebola — Community educator")
    setMeta('property', 'og:site_name', SEO.siteName)
    setMeta('property', 'og:locale', 'en_US')

    // Twitter Card
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:site', SEO.twitterHandle)
    setMeta('name', 'twitter:creator', SEO.twitterHandle)
    setMeta('name', 'twitter:title', SEO.title)
    setMeta('name', 'twitter:description', SEO.description)
    setMeta('name', 'twitter:image', SEO.image)
    setMeta('name', 'twitter:image:alt', "Oluwamayowa 'Logo' Adebola")

    // Additional SEO
    setMeta('name', 'theme-color', '#FAF9F6')
    setMeta('name', 'apple-mobile-web-app-title', SEO.siteName)
    setMeta('name', 'application-name', SEO.siteName)

    // Set canonical if not already present
    if (!document.head.querySelector('link[rel="canonical"]')) {
      const link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      link.setAttribute('href', window.location.href)
      document.head.appendChild(link)
    }
  }, [])

  /* ── Countdown Dates ── */
  const housingEnd = new Date()
  housingEnd.setHours(housingEnd.getHours() + 46)
  const medicalEnd = new Date()
  medicalEnd.setDate(medicalEnd.getDate() + 8)

  return (
    <div className="min-h-screen font-sans">
      {/* ═══════════════════════════════════════════════ */}
      {/*  THANK YOU MODAL                                */}
      {/* ═══════════════════════════════════════════════ */}
      <ThankYouModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        copiedItem={copiedLabel}
      />

      {/* ═══════════════════════════════════════════════ */}
      {/*  NAV                                            */}
      {/* ═══════════════════════════════════════════════ */}
      <nav
        className="sticky top-0 z-50 backdrop-blur-xl border-b"
        style={{
          background: 'rgba(14,14,12,0.85)',
          borderColor: 'rgba(255,255,255,0.08)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="#" className="font-bold tracking-[-0.02em] text-white" style={{ fontSize: '16px' }}>
            Support<span className="text-gradient-accent ml-0.5">Logo</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {['Story', 'Progress', 'Donate'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="transition-colors"
                style={{ fontSize: '14px', fontWeight: 500, color: 'rgba(255,255,255,0.50)' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.50)')}
              >
                {item}
              </a>
            ))}
            <a
              href="#donate"
              className="gradient-accent text-dark px-5 py-2 rounded-full transition-all hover:shadow-lg hover:shadow-accent/20"
              style={{ fontSize: '14px', fontWeight: 600, letterSpacing: '0.2px' }}
            >
              Give Now
            </a>
          </div>
          {/* Mobile CTA */}
          <a
            href="#donate"
            className="md:hidden gradient-accent text-dark px-4 py-1.5 rounded-full"
            style={{ fontSize: '13px', fontWeight: 600 }}
          >
            Give Now
          </a>
        </div>
      </nav>

      <main>
        {/* ═══════════════════════════════════════════════ */}
        {/*  HERO — Dark obsidian, full-bleed              */}
        {/* ═══════════════════════════════════════════════ */}
        <section
          className="relative overflow-hidden"
          style={{ background: 'linear-gradient(160deg, #0e0e0c 0%, #181818 60%, #0e0e0c 100%)' }}
        >
          {/* Ambient glow top-right */}
          <div
            className="absolute top-0 right-0 w-[700px] h-[700px] pointer-events-none"
            style={{ background: 'radial-gradient(circle at 70% 20%, rgba(0,232,135,0.10), transparent 65%)' }}
          />
          {/* Ambient glow bottom-left */}
          <div
            className="absolute bottom-0 left-0 w-[500px] h-[500px] pointer-events-none"
            style={{ background: 'radial-gradient(circle at 20% 80%, rgba(155,120,232,0.07), transparent 60%)' }}
          />

          <div className="max-w-7xl mx-auto px-6 pt-20 md:pt-28 pb-16 md:pb-24">
            {/* ── Eyebrow ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="flex items-center gap-3 mb-10"
            >
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span
                className="uppercase"
                style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '1.4px', color: 'rgba(255,255,255,0.45)' }}
              >
                Urgent Community Campaign
              </span>
              <span
                className="px-2.5 py-1 rounded-full border"
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.6px',
                  color: '#00E887',
                  borderColor: 'rgba(0,232,135,0.25)',
                  background: 'rgba(0,232,135,0.08)',
                }}
              >
                TWO GOALS · FULL TRANSPARENCY
              </span>
            </motion.div>

            {/* ── Main grid ── */}
            <div className="grid md:grid-cols-[1fr_420px] gap-14 md:gap-20 items-start">
              {/* LEFT — copy */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease }}
              >
                {/* H1 */}
                <h1
                  className="font-extrabold text-white"
                  style={{
                    fontSize: 'clamp(36px, 5.5vw, 76px)',
                    lineHeight: '1.04',
                    letterSpacing: '-2.5px',
                  }}
                >
                  Help restore the life
                  <br />
                  of a community
                  <br />
                  <span style={{
                    background: 'linear-gradient(135deg, #00E887 0%, #5DF6B4 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    educator.
                  </span>
                </h1>

                {/* Name line */}
                <p
                  className="mt-5"
                  style={{ fontSize: '18px', fontWeight: 500, color: 'rgba(255,255,255,0.50)', letterSpacing: '0.1px' }}
                >
                  Oluwamayowa <span style={{ color: 'rgba(255,255,255,0.85)' }}>&ldquo;Logo&rdquo;</span> Adebola
                </p>

                {/* Narrative */}
                <p
                  className="mt-6 max-w-[520px]"
                  style={{ fontSize: '17px', lineHeight: '29px', color: 'rgba(255,255,255,0.55)', fontWeight: 400 }}
                >
                  After a violent attack forced him from his home and a ceiling
                  collapse destroyed his replacement, Logo has one narrow window
                  left — to complete his{' '}
                  <span style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>
                    UK Global Talent Visa medicals
                  </span>
                  . Two goals. Every naira tracked.
                </p>

                {/* KPI strip */}
                <div
                  className="flex flex-wrap gap-0 mt-10 rounded-2xl overflow-hidden border"
                  style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}
                >
                  {[
                    { value: '₦675K+', label: 'Housing raised', accent: true },
                    { value: '$450', label: 'Medical raised', accent: false },
                    { value: '49', label: 'Supporters', accent: false },
                  ].map((k, i) => (
                    <div
                      key={k.label}
                      className="flex-1 px-6 py-5"
                      style={{
                        borderRight: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                        minWidth: '100px',
                      }}
                    >
                      <div
                        className="font-bold font-mono tabular-nums"
                        style={{
                          fontSize: '24px',
                          color: k.accent ? '#00E887' : '#ffffff',
                          lineHeight: '28px',
                        }}
                      >
                        {k.value}
                      </div>
                      <div
                        style={{ fontSize: '12px', fontWeight: 500, color: 'rgba(255,255,255,0.38)', marginTop: '3px' }}
                      >
                        {k.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA row */}
                <div className="flex flex-wrap items-center gap-3 mt-8">
                  <a
                    href="#donate"
                    className="gradient-accent text-dark px-8 py-3.5 rounded-full inline-flex items-center gap-2 hover:shadow-xl transition-all"
                    style={{ fontSize: '15px', fontWeight: 700, letterSpacing: '0.2px', boxShadow: '0 0 0 0 rgba(0,232,135,0)' }}
                    onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,232,135,0.30)')}
                    onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 0 0 rgba(0,232,135,0)')}
                  >
                    Donate Now <ArrowRight size={16} />
                  </a>
                  <a
                    href="#story"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border transition-all"
                    style={{
                      fontSize: '15px',
                      fontWeight: 500,
                      color: 'rgba(255,255,255,0.55)',
                      borderColor: 'rgba(255,255,255,0.12)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = '#ffffff'
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = 'rgba(255,255,255,0.55)'
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                    }}
                  >
                    Read His Story <ArrowUpRight size={15} />
                  </a>
                </div>

                {/* Trust bar */}
                <div className="flex items-center gap-5 mt-8">
                  {[
                    { icon: Shield, text: 'Verified Campaign' },
                    { icon: Clock, text: '8-day medical window' },
                    { icon: Heart, text: 'Every naira tracked' },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-1.5">
                      <Icon size={13} style={{ color: '#00E887' }} />
                      <span style={{ fontSize: '12px', fontWeight: 500, color: 'rgba(255,255,255,0.38)' }}>
                        {text}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* RIGHT — photo card */}
              <motion.div
                initial={{ opacity: 0, y: 50, rotate: 0.8 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 1.1, delay: 0.2, ease }}
                className="relative hidden md:block"
              >
                {/* Card frame */}
                <div
                  className="rounded-3xl overflow-hidden"
                  style={{
                    border: '1px solid rgba(255,255,255,0.10)',
                    boxShadow: '0 40px 100px rgba(0,0,0,0.60)',
                  }}
                >
                  <div className="relative">
                    <img
                      src="https://i.ibb.co/VXZ5Fy2/IMG-20231101-233922-794.jpg"
                      alt="Oluwamayowa 'Logo' Adebola — Community educator, mentor, and UK Global Talent Visa recipient"
                      className="w-full aspect-[4/5] object-cover"
                      loading="eager"
                    />
                    {/* Photo overlay gradient */}
                    <div
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(to top, rgba(14,14,12,0.85) 0%, transparent 50%)' }}
                    />
                    {/* Name overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="text-white font-bold" style={{ fontSize: '20px', letterSpacing: '-0.3px' }}>
                        Oluwamayowa Adebola
                      </div>
                      <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.50)', marginTop: '3px' }}>
                        Community Educator · Family Tutor
                      </div>
                    </div>
                  </div>

                  {/* Stats strip */}
                  <div
                    className="px-6 py-4 flex items-center justify-between"
                    style={{ background: 'rgba(24,24,24,0.98)', borderTop: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.38)', letterSpacing: '0.6px', textTransform: 'uppercase' }}>
                        Total Raised
                      </div>
                      <div className="font-bold text-white font-mono" style={{ fontSize: '22px', lineHeight: '26px' }}>
                        ₦675,000+
                      </div>
                    </div>
                    <div className="text-right">
                      <div style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.38)', letterSpacing: '0.6px', textTransform: 'uppercase' }}>
                        Supporters
                      </div>
                      <div className="font-bold text-white font-mono" style={{ fontSize: '22px', lineHeight: '26px' }}>
                        49
                      </div>
                    </div>
                    <div
                      className="w-10 h-10 rounded-full gradient-accent flex items-center justify-center"
                    >
                      <Heart size={17} className="text-dark" fill="currentColor" />
                    </div>
                  </div>
                </div>

                {/* Floating verified badge */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9, duration: 0.6, ease }}
                  className="absolute -left-6 top-1/3 rounded-2xl px-4 py-3"
                  style={{
                    background: 'rgba(14,14,12,0.92)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full gradient-accent flex items-center justify-center">
                      <Shield size={13} className="text-dark" />
                    </div>
                    <div>
                      <div className="text-white" style={{ fontSize: '13px', fontWeight: 600 }}>
                        Verified
                      </div>
                      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.40)' }}>
                        Community Campaign
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating urgency badge */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1, duration: 0.6, ease }}
                  className="absolute -right-5 bottom-32 rounded-xl px-4 py-2.5"
                  style={{
                    background: 'rgba(14,14,12,0.92)',
                    border: '1px solid rgba(0,232,135,0.20)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#00E887' }}>
                      8 days left
                    </span>
                  </div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.40)', marginTop: '1px' }}>
                    Medical window closes
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════ */}
        {/*  PROGRESS — Dark obsidian, SHELTER·HEAL·TRAVEL */}
        {/* ═══════════════════════════════════════════════ */}
        <section
          id="progress"
          className="relative overflow-hidden"
          style={{ background: '#0e0e0c' }}
        >
          {/* Ambient glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,232,135,0.07), transparent 70%)' }}
          />

          <div className="max-w-7xl mx-auto px-6 pt-20 md:pt-28 pb-24 md:pb-32 relative">

            {/* ── Massive vertical display ── */}
            <div className="text-center mb-20 md:mb-24 overflow-hidden select-none">
              {['SHELTER.', 'HEAL.', 'TRAVEL.'].map((word, i) => (
                <motion.div
                  key={word}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <span
                    className="block font-extrabold leading-none tracking-tighter"
                    style={{
                      fontSize: 'clamp(64px, 12vw, 128px)',
                      color: i === 1
                        ? '#00E887'
                        : 'rgba(255,255,255,0.08)',
                      letterSpacing: '-4px',
                      lineHeight: '0.92',
                    }}
                  >
                    {word}
                  </span>
                </motion.div>
              ))}
              <p
                className="mt-6 mx-auto"
                style={{ fontSize: '15px', color: 'rgba(255,255,255,0.35)', maxWidth: '420px', lineHeight: '24px' }}
              >
                Two goals. One community. Every naira and dollar tracked in real time.
              </p>
            </div>

            {/* ── Two dark goal cards ── */}
            <div className="grid md:grid-cols-2 gap-5">

              {/* ── Card 1: Shelter / Housing ── */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease }}
                className="rounded-3xl p-8 flex flex-col relative overflow-hidden"
                style={{
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                  border: '1px solid rgba(255,255,255,0.10)',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'linear-gradient(145deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.04) 100%)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)')}
              >
                {/* Card glow */}
                <div
                  className="absolute top-0 right-0 w-[300px] h-[200px] pointer-events-none"
                  style={{ background: 'radial-gradient(circle at 80% 0%, rgba(0,232,135,0.10), transparent 70%)' }}
                />

                {/* Goal tag */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl gradient-accent flex items-center justify-center">
                      <Building2 size={16} className="text-dark" />
                    </div>
                    <div>
                      <div className="text-white" style={{ fontSize: '17px', fontWeight: 700 }}>
                        Shelter Fund
                      </div>
                      <div style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
                        Goal 01
                      </div>
                    </div>
                  </div>
                  <span
                    className="px-2.5 py-1 rounded-full"
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#00E887',
                      background: 'rgba(0,232,135,0.10)',
                      border: '1px solid rgba(0,232,135,0.20)',
                    }}
                  >
                    HOUSING
                  </span>
                </div>

                {/* Countdown timer */}
                <div
                  className="rounded-2xl p-5 mb-6"
                  style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.8px', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginBottom: '12px' }}>
                    Time remaining
                  </div>
                  <CountdownTimer
                    targetDate={housingEnd}
                    label=""
                    format="hours"
                  />
                </div>

                {/* KPIs */}
                <div className="flex gap-4 mb-6">
                  {[
                    { label: 'Raised', value: '₦675,000', accent: true },
                    { label: 'Goal', value: '₦750,000', accent: false },
                    { label: 'Progress', value: '90%', accent: false },
                  ].map(k => (
                    <div key={k.label} className="flex-1">
                      <div style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.30)', letterSpacing: '0.6px', textTransform: 'uppercase', marginBottom: '4px' }}>
                        {k.label}
                      </div>
                      <div
                        className="font-mono font-bold"
                        style={{ fontSize: '16px', color: k.accent ? '#00E887' : '#ffffff' }}
                      >
                        {k.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Progress bar */}
                <div className="mb-2">
                  <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '90%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="h-full rounded-full gradient-accent"
                    />
                  </div>
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.30)', marginBottom: '20px' }}>
                  Only ₦75,000 left — almost there!
                </div>

                <a
                  href="#donate"
                  className="gradient-accent text-dark rounded-full inline-flex items-center justify-center gap-2 mt-auto transition-all"
                  style={{ fontSize: '14px', fontWeight: 700, padding: '12px 24px' }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,232,135,0.30)')}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
                >
                  Donate to Shelter <ArrowRight size={15} />
                </a>
              </motion.div>

              {/* ── Card 2: Heal & Travel / UK Medical ── */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.12, ease }}
                className="rounded-3xl p-8 flex flex-col relative overflow-hidden"
                style={{
                  background: 'linear-gradient(145deg, rgba(155,120,232,0.08) 0%, rgba(255,255,255,0.02) 100%)',
                  border: '1px solid rgba(155,120,232,0.20)',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'linear-gradient(145deg, rgba(155,120,232,0.12) 0%, rgba(255,255,255,0.04) 100%)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'linear-gradient(145deg, rgba(155,120,232,0.08) 0%, rgba(255,255,255,0.02) 100%)')}
              >
                {/* Card glow */}
                <div
                  className="absolute top-0 right-0 w-[300px] h-[200px] pointer-events-none"
                  style={{ background: 'radial-gradient(circle at 80% 0%, rgba(155,120,232,0.12), transparent 70%)' }}
                />

                {/* Goal tag */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: 'rgba(155,120,232,0.20)' }}
                    >
                      <Shield size={16} style={{ color: '#d0bfff' }} />
                    </div>
                    <div>
                      <div className="text-white" style={{ fontSize: '17px', fontWeight: 700 }}>
                        Heal &amp; Travel Fund
                      </div>
                      <div style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
                        Goal 02
                      </div>
                    </div>
                  </div>
                  <span
                    className="px-2.5 py-1 rounded-full"
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#d0bfff',
                      background: 'rgba(155,120,232,0.12)',
                      border: '1px solid rgba(155,120,232,0.25)',
                    }}
                  >
                    UK MEDICAL
                  </span>
                </div>

                {/* Countdown timer */}
                <div
                  className="rounded-2xl p-5 mb-6"
                  style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.8px', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginBottom: '12px' }}>
                    Time remaining
                  </div>
                  <CountdownTimer
                    targetDate={medicalEnd}
                    label=""
                    format="days"
                  />
                </div>

                {/* KPIs */}
                <div className="flex gap-4 mb-6">
                  {[
                    { label: 'Raised', value: '$450', accent: true },
                    { label: 'Goal', value: '$1,000', accent: false },
                    { label: 'Progress', value: '45%', accent: false },
                  ].map(k => (
                    <div key={k.label} className="flex-1">
                      <div style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.30)', letterSpacing: '0.6px', textTransform: 'uppercase', marginBottom: '4px' }}>
                        {k.label}
                      </div>
                      <div
                        className="font-mono font-bold"
                        style={{ fontSize: '16px', color: k.accent ? '#d0bfff' : '#ffffff' }}
                      >
                        {k.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Progress bar */}
                <div className="mb-2">
                  <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '45%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="h-full rounded-full"
                      style={{ background: 'linear-gradient(90deg, #9b78e8, #d0bfff)' }}
                    />
                  </div>
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.30)', marginBottom: '20px' }}>
                  $550 still needed · Window closes in 8 days
                </div>

                <a
                  href="#donate"
                  className="rounded-full inline-flex items-center justify-center gap-2 mt-auto transition-all text-white"
                  style={{
                    fontSize: '14px',
                    fontWeight: 700,
                    padding: '12px 24px',
                    background: 'rgba(155,120,232,0.20)',
                    border: '1px solid rgba(155,120,232,0.35)',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(155,120,232,0.30)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(155,120,232,0.20)')}
                >
                  Donate to UK Medical <ArrowRight size={15} />
                </a>
              </motion.div>
            </div>


          </div>
        </section>

        {/* ═══════════════════════════════════════════════ */}
        {/*  IMAGE MARQUEE — mobile only                    */}
        {/* ═══════════════════════════════════════════════ */}
        <ImageMarquee />

        {/* ═══════════════════════════════════════════════ */}
        {/*  STORY — Sticky-left editorial, chapters       */}
        {/* ═══════════════════════════════════════════════ */}
        <section
          id="story"
          className="relative overflow-hidden"
          style={{ background: 'linear-gradient(180deg, #181818 0%, #0e0e0c 100%)' }}
        >
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(0,232,135,0.06), transparent 70%)' }}
          />

          <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 relative">

            {/* ── Section label ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
              className="flex items-center gap-3 mb-20"
            >
              <div className="w-8 h-[1px] bg-accent" />
              <span
                className="uppercase"
                style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '1.2px', color: '#00E887' }}
              >
                His Story
              </span>
            </motion.div>

            {/* ── Editorial split ── */}
            <div className="grid md:grid-cols-[380px_1fr] gap-14 md:gap-20 items-start">

              {/* LEFT — sticky heading */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease }}
                className="md:sticky md:top-24"
              >
                <h2
                  className="font-extrabold text-white"
                  style={{
                    fontSize: 'clamp(36px, 4vw, 56px)',
                    lineHeight: '1.05',
                    letterSpacing: '-2px',
                  }}
                >
                  The man
                  <br />
                  behind the
                  <br />
                  <span style={{
                    background: 'linear-gradient(135deg, #00E887 0%, #5DF6B4 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>mission.</span>
                </h2>

                <p
                  className="mt-6"
                  style={{ fontSize: '15px', lineHeight: '25px', color: 'rgba(255,255,255,0.45)', maxWidth: '320px' }}
                >
                  Educator. Mentor. Community pillar. His story is one of
                  quiet dedication — and sudden catastrophe.
                </p>

                {/* Quick-stats column */}
                <div className="mt-10 space-y-4">
                  {[
                    { num: '3+', label: 'Years mentoring' },
                    { num: '100s', label: 'Students impacted' },
                    { num: '2', label: 'Crises in 6 months' },
                  ].map(s => (
                    <div key={s.label} className="flex items-center gap-4">
                      <span
                        className="font-bold font-mono"
                        style={{ fontSize: '28px', color: '#00E887', minWidth: '56px' }}
                      >
                        {s.num}
                      </span>
                      <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.40)', fontWeight: 500 }}>
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* RIGHT — numbered chapters */}
              <div className="space-y-16">

                {/* ── Chapter 01 ── */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease }}
                >
                  <div className="flex items-start gap-6 mb-6">
                    <span
                      className="font-extrabold font-mono leading-none select-none flex-none"
                      style={{ fontSize: '80px', color: 'rgba(255,255,255,0.05)', letterSpacing: '-3px', marginTop: '-8px' }}
                    >
                      01
                    </span>
                    <div className="pt-2">
                      <div
                        style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.2px', color: '#00E887', textTransform: 'uppercase', marginBottom: '8px' }}
                      >
                        The Educator
                      </div>
                      <h3 className="text-white font-bold" style={{ fontSize: '24px', lineHeight: '32px', letterSpacing: '-0.5px' }}>
                        A community built on patience &amp; care.
                      </h3>
                    </div>
                  </div>
                  <p style={{ fontSize: '16px', lineHeight: '28px', color: 'rgba(255,255,255,0.55)', paddingLeft: '0' }}>
                    Oluwamayowa &ldquo;Logo&rdquo; Adebola is a dedicated family
                    tutor who has spent years training and mentoring countless
                    individuals — from the very young to working professionals.
                    His community spans cities, careers, and generations. He is
                    a loving brother and a trusted friend to everyone he meets.
                    He teaches not for recognition, but because he genuinely
                    believes in people.
                  </p>
                </motion.div>

                {/* ── Chapter 02 ── */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease }}
                >
                  <div className="flex items-start gap-6 mb-6">
                    <span
                      className="font-extrabold font-mono leading-none select-none flex-none"
                      style={{ fontSize: '80px', color: 'rgba(255,255,255,0.05)', letterSpacing: '-3px', marginTop: '-8px' }}
                    >
                      02
                    </span>
                    <div className="pt-2">
                      <div
                        style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.2px', color: 'rgba(255,100,100,0.80)', textTransform: 'uppercase', marginBottom: '8px' }}
                      >
                        The Crises
                      </div>
                      <h3 className="text-white font-bold" style={{ fontSize: '24px', lineHeight: '32px', letterSpacing: '-0.5px' }}>
                        Attacked, displaced, then struck again.
                      </h3>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <p style={{ fontSize: '16px', lineHeight: '28px', color: 'rgba(255,255,255,0.55)' }}>
                      Everything began to unravel when Logo was violently attacked
                      in his home. Forced to flee for his safety, he lost his
                      apartment and his deposit — with no refund. He rebuilt his
                      footing and moved into a second house, determined to recover.
                    </p>
                    <p style={{ fontSize: '16px', lineHeight: '28px', color: 'rgba(255,255,255,0.55)' }}>
                      Then the ceiling collapsed. Without warning, the Plaster of
                      Paris ceiling caved in, destroying the space and his
                      belongings beneath it.{' '}
                      <span className="text-white font-medium">
                        He has been sleeping at friends&rsquo; homes ever since —
                        surviving on the kindness of his community.
                      </span>
                    </p>
                  </div>

                  {/* Damage photo gallery */}
                  <div className="mt-8 grid grid-cols-2 gap-3">
                    <div
                      className="col-span-2 rounded-2xl overflow-hidden"
                      style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                      <img
                        src="https://i.ibb.co/tPW64BYj/1000071959.avif"
                        alt="Severe damage — collapsed ceiling covering the living space"
                        className="w-full object-cover"
                        style={{ aspectRatio: '16/7' }}
                        loading="lazy"
                      />
                    </div>
                    <div
                      className="rounded-2xl overflow-hidden"
                      style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                      <img
                        src="https://i.ibb.co/YFZqMnz4/1000071960.avif"
                        alt="Close-up of collapsed POP ceiling and structural damage"
                        className="w-full aspect-square object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div
                      className="rounded-2xl overflow-hidden"
                      style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                      <img
                        src="https://i.ibb.co/MktMPZPz/1000071958.avif"
                        alt="Interior view showing extent of ceiling collapse debris"
                        className="w-full aspect-square object-cover"
                        loading="lazy"
                      />
                    </div>
                    {/* Caption */}
                    <div className="col-span-2 flex items-center gap-2 mt-1">
                      <div className="w-1 h-1 rounded-full bg-accent" />
                      <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.30)', fontWeight: 500 }}>
                        Actual photos from the ceiling collapse — Oluwamayowa&rsquo;s second home
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* ── Chapter 03 ── */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease }}
                >
                  <div className="flex items-start gap-6 mb-6">
                    <span
                      className="font-extrabold font-mono leading-none select-none flex-none"
                      style={{ fontSize: '80px', color: 'rgba(255,255,255,0.05)', letterSpacing: '-3px', marginTop: '-8px' }}
                    >
                      03
                    </span>
                    <div className="pt-2">
                      <div
                        style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.2px', color: '#00E887', textTransform: 'uppercase', marginBottom: '8px' }}
                      >
                        The Opportunity
                      </div>
                      <h3 className="text-white font-bold" style={{ fontSize: '24px', lineHeight: '32px', letterSpacing: '-0.5px' }}>
                        A narrow window left open.
                      </h3>
                    </div>
                  </div>
                  <p style={{ fontSize: '16px', lineHeight: '28px', color: 'rgba(255,255,255,0.55)' }}>
                    Despite everything, his talent has been recognised. Logo is in
                    the final stages of his{' '}
                    <span className="text-white font-medium">UK Global Talent Visa</span>.
                    But to complete it, he must fulfill mandatory medical
                    prerequisites — TB screenings, document authentication, travel
                    logistics — within exactly{' '}
                    <span style={{ color: '#00E887', fontWeight: 600 }}>8 days</span>.
                    If he misses this window, the visa opportunity disappears
                    entirely. This is his last chance, and it requires your help.
                  </p>

                  {/* Urgency callout */}
                  <div
                    className="mt-6 p-5 rounded-2xl flex items-start gap-4"
                    style={{
                      background: 'rgba(0,232,135,0.06)',
                      border: '1px solid rgba(0,232,135,0.15)',
                    }}
                  >
                    <Clock size={18} style={{ color: '#00E887', flexShrink: 0, marginTop: '2px' }} />
                    <p style={{ fontSize: '14px', lineHeight: '22px', color: 'rgba(255,255,255,0.60)' }}>
                      The UK medical window{' '}
                      <span className="text-white font-semibold">closes in 8 days</span>.
                      {' '}After that, the Global Talent Visa process must restart entirely
                      — a process that took years of work to reach.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════ */}
        {/*  TRANSPARENCY — Cream                          */}
        {/* ═══════════════════════════════════════════════ */}
        <section className="bg-cream py-24 md:py-32 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
              className="mb-16"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[1px] bg-accent" />
                <span
                  className="uppercase text-accent"
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    letterSpacing: '0.8px',
                  }}
                >
                  100% Transparency
                </span>
              </div>
              <h2
                className="text-text-primary font-bold"
                style={{ fontSize: '36px', lineHeight: '44px' }}
              >
                Where every naira
                <br className="hidden md:block" /> and dollar goes.
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Housing breakdown */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease }}
                className="bg-white rounded-2xl p-8 border border-border-light"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center">
                    <Building2 size={18} className="text-dark" />
                  </div>
                  <div>
                    <div
                      className="text-text-primary"
                      style={{ fontSize: '20px', fontWeight: 600 }}
                    >
                      Housing Fund
                    </div>
                    <div
                      className="text-text-tertiary"
                      style={{ fontSize: '13px', fontWeight: 500 }}
                    >
                      ₦750,000 Total
                    </div>
                  </div>
                </div>
                <div className="space-y-0">
                  {[
                    {
                      label:
                        'POP ceiling reinstatement & structural safety',
                      amount: '₦400,000',
                    },
                    {
                      label: 'Replacing damaged belongings & furniture',
                      amount: '₦200,000',
                    },
                    {
                      label: 'Immediate rent & survival upkeep',
                      amount: '₦150,000',
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={`flex items-start justify-between gap-6 py-5 ${
                        i < 2 ? 'border-b border-border-light' : ''
                      }`}
                    >
                      <span
                        className="text-text-secondary"
                        style={{ fontSize: '14px', lineHeight: '22px' }}
                      >
                        {item.label}
                      </span>
                      <span
                        className="font-mono text-text-primary whitespace-nowrap"
                        style={{ fontSize: '14px', fontWeight: 600 }}
                      >
                        {item.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* UK Medical breakdown */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease }}
                className="bg-white rounded-2xl p-8 border border-border-light"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-dark flex items-center justify-center">
                    <Shield size={18} className="text-accent" />
                  </div>
                  <div>
                    <div
                      className="text-text-primary"
                      style={{ fontSize: '20px', fontWeight: 600 }}
                    >
                      UK Medical Fund
                    </div>
                    <div
                      className="text-text-tertiary"
                      style={{ fontSize: '13px', fontWeight: 500 }}
                    >
                      $1,000 Total
                    </div>
                  </div>
                </div>
                <div className="space-y-0">
                  {[
                    {
                      label:
                        'Mandatory UK Visa medical screenings + TB tests',
                      amount: '$600',
                    },
                    {
                      label:
                        'Processing fees, document authentication',
                      amount: '$250',
                    },
                    {
                      label: 'Emergency travel logistics',
                      amount: '$150',
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={`flex items-start justify-between gap-6 py-5 ${
                        i < 2 ? 'border-b border-border-light' : ''
                      }`}
                    >
                      <span
                        className="text-text-secondary"
                        style={{ fontSize: '14px', lineHeight: '22px' }}
                      >
                        {item.label}
                      </span>
                      <span
                        className="font-mono text-text-primary whitespace-nowrap"
                        style={{ fontSize: '14px', fontWeight: 600 }}
                      >
                        {item.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════ */}
        {/*  DONATE — Dark section                         */}
        {/* ═══════════════════════════════════════════════ */}
        <section
          id="donate"
          className="gradient-dark-card py-24 md:py-32 px-6 relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/4 w-[600px] h-[400px] gradient-glow opacity-20 pointer-events-none" />
          <div className="max-w-6xl mx-auto relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
              className="text-center mb-16"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-8 h-[1px] bg-accent" />
                <span
                  className="uppercase text-accent"
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    letterSpacing: '0.8px',
                  }}
                >
                  Contribute
                </span>
                <div className="w-8 h-[1px] bg-accent" />
              </div>
              <h2
                className="text-text-inverse font-bold"
                style={{ fontSize: '36px', lineHeight: '44px' }}
              >
                How to give
              </h2>
              <p
                className="text-text-inverse-secondary mt-4 max-w-md mx-auto"
                style={{ fontSize: '16px', lineHeight: '28px' }}
              >
                Choose the most convenient method for you.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-5">
              {/* ── Card / Paystack ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease }}
                className="rounded-2xl p-7 flex flex-col border border-border-dark hover:border-border-dark-elevated transition-colors"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                }}
              >
                <div className="w-11 h-11 rounded-xl gradient-accent flex items-center justify-center mb-6">
                  <CreditCard size={18} className="text-dark" />
                </div>
                <h4
                  className="text-text-inverse mb-1"
                  style={{ fontSize: '20px', fontWeight: 600 }}
                >
                  Card / Paystack
                </h4>
                <p
                  className="text-text-inverse-secondary mb-8 flex-grow"
                  style={{ fontSize: '14px', lineHeight: '22px' }}
                >
                  Secure online payment via cards, bank transfer, or USSD.
                </p>
                <div className="space-y-3">
                  <button
                    className="w-full py-3 gradient-accent text-dark rounded-full transition-all hover:shadow-lg hover:shadow-accent/20"
                    style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      letterSpacing: '0.2px',
                    }}
                  >
                    Donate to Housing (₦)
                  </button>
                  <button
                    className="w-full py-3 bg-white/10 text-text-inverse rounded-full border border-border-dark hover:bg-white/15 transition-colors"
                    style={{ fontSize: '14px', fontWeight: 600 }}
                  >
                    Donate to UK Medical ($)
                  </button>
                </div>
              </motion.div>

              {/* ── Direct Bank Transfer ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1, ease }}
                className="rounded-2xl p-7 flex flex-col border border-border-dark hover:border-border-dark-elevated transition-colors relative overflow-hidden"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                }}
              >
                <div className="w-11 h-11 rounded-xl bg-accent/15 flex items-center justify-center mb-6">
                  <Building2 size={18} className="text-accent" />
                </div>
                <h4
                  className="text-text-inverse mb-1"
                  style={{ fontSize: '20px', fontWeight: 600 }}
                >
                  Bank Transfer
                </h4>
                <p
                  className="text-text-inverse-secondary mb-6"
                  style={{ fontSize: '14px', lineHeight: '22px' }}
                >
                  Local bank deposit in Nigeria.
                </p>

                <div className="rounded-xl p-4 space-y-4 mb-6 flex-grow border border-border-dark bg-white/[0.02]">
                  {[
                    { label: 'Bank', value: 'Opay' },
                    { label: 'Account Name', value: 'Oluwamayowa Logo' },
                  ].map((item) => (
                    <div key={item.label}>
                      <div
                        className="text-text-inverse-secondary uppercase mb-1"
                        style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          letterSpacing: '0.8px',
                        }}
                      >
                        {item.label}
                      </div>
                      <div
                        className="text-text-inverse"
                        style={{ fontSize: '14px', fontWeight: 500 }}
                      >
                        {item.value}
                      </div>
                    </div>
                  ))}
                  <div>
                    <div
                      className="text-text-inverse-secondary uppercase mb-1"
                      style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '0.8px',
                      }}
                    >
                      Account Number
                    </div>
                    <div
                      className="font-mono flex items-center text-text-inverse"
                      style={{ fontSize: '18px', fontWeight: 600 }}
                    >
                      8143066320
                      <CopyButton
                        text="8143066320"
                        label="Account Number (8143066320)"
                        onCopied={handleCopied}
                      />
                    </div>
                  </div>
                </div>
                <p
                  className="text-text-inverse-secondary"
                  style={{ fontSize: '12px' }}
                >
                  Add &ldquo;HOUSING&rdquo; or &ldquo;UK MEDICAL&rdquo; in
                  transfer remarks.
                </p>
              </motion.div>

              {/* ── Bitcoin ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2, ease }}
                className="rounded-2xl p-7 flex flex-col border border-border-dark hover:border-border-dark-elevated transition-colors"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                }}
              >
                <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                  <Bitcoin size={18} className="text-text-inverse" />
                </div>
                <h4
                  className="text-text-inverse mb-1"
                  style={{ fontSize: '20px', fontWeight: 600 }}
                >
                  Bitcoin
                </h4>
                <p
                  className="text-text-inverse-secondary mb-6"
                  style={{ fontSize: '14px', lineHeight: '22px' }}
                >
                  Send BTC directly to this address.
                </p>

                <div className="rounded-xl p-4 mb-6 flex-grow border border-border-dark bg-white/[0.02] flex flex-col justify-center">
                  <div
                    className="text-text-inverse-secondary uppercase mb-2"
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '0.8px',
                    }}
                  >
                    BTC Address
                  </div>
                  <div
                    className="font-mono text-text-inverse-secondary bg-dark rounded-lg p-3 border border-border-dark flex items-start justify-between gap-2"
                    style={{ fontSize: '12px' }}
                  >
                    <span className="break-all">
                      bc1qptggmqt7ux5xfcgyjdqw6pfw3fdul9sek074sf
                    </span>
                    <CopyButton
                      text="bc1qptggmqt7ux5xfcgyjdqw6pfw3fdul9sek074sf"
                      label="BTC Address"
                      onCopied={handleCopied}
                    />
                  </div>
                </div>
                <p
                  className="text-text-inverse-secondary"
                  style={{ fontSize: '12px' }}
                >
                  Only send Bitcoin (BTC) to this address.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* ═══════════════════════════════════════════════ */}
      {/*  TESTIMONIALS & DONATIONS                       */}
      {/* ═══════════════════════════════════════════════ */}
      <StackedFeed />

      {/* ═══════════════════════════════════════════════ */}
      {/*  FOOTER — Cream                                 */}
      {/* ═══════════════════════════════════════════════ */}
      <footer className="bg-cream border-t border-border-light py-20 md:py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p
            className="text-text-primary font-bold mb-4"
            style={{
              fontSize: 'clamp(30px, 4vw, 48px)',
              lineHeight: '1.15',
              letterSpacing: '-1.5px',
            }}
          >
            &ldquo;He taught us when we had nothing, now let&apos;s give him
            something.&rdquo;
          </p>
          <p
            className="text-text-secondary mb-12"
            style={{ fontSize: '18px' }}
          >
            ❤️
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator
                    .share({
                      title: 'Support Logo — Restore. Rebuild. Rise.',
                      text: 'Help restore the life of a community pillar. Housing recovery + UK Talent Visa fund.',
                      url: window.location.href,
                    })
                    .catch(console.error)
                } else {
                  navigator.clipboard.writeText(window.location.href)
                  alert('Link copied to clipboard!')
                }
              }}
              className="flex items-center gap-2 px-6 py-3 rounded-full border border-border-light hover:border-text-tertiary hover:bg-white transition-all text-text-primary"
              style={{ fontSize: '14px', fontWeight: 600 }}
            >
              <Share2 size={16} /> Share Campaign
            </button>
            <a
              href="#donate"
              className="gradient-accent text-dark px-8 py-3 rounded-full inline-flex items-center gap-2 hover:shadow-lg hover:shadow-accent/25 transition-all"
              style={{ fontSize: '14px', fontWeight: 600 }}
            >
              Donate Now <ArrowRight size={16} />
            </a>
          </div>

          <p
            className="text-text-tertiary"
            style={{ fontSize: '12px', fontWeight: 500, lineHeight: '18px' }}
          >
            Progress bars updated daily. Thank you for standing with
            Oluwamayowa during this difficult time.
          </p>
        </div>
      </footer>
    </div>
  )
}
