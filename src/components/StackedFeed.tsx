const testimonials = [
  {
    quote:
      "Logo taught me coding from scratch. He never gave up on me. Now I'm a developer.",
    author: 'Adeola',
  },
  {
    quote:
      'The mentorship changed my life. I went from zero to landing my first tech job.',
    author: 'Chioma',
  },
  {
    quote:
      "Logo's patience and clarity made complex concepts simple. Highly recommended.",
    author: 'Tunde',
  },
  {
    quote:
      'I was lost in my career. Logo helped me find direction and build real skills.',
    author: 'Zainab',
  },
  {
    quote: "The best investment I made was in myself through Logo's program.",
    author: 'Emeka',
  },
  {
    quote:
      'From bootcamp dropout to confident developer. Logo made it possible.',
    author: 'Fatima',
  },
  {
    quote: 'The real-world projects taught me more than any course ever could.',
    author: 'Kwame',
  },
  {
    quote:
      "Logo's community support kept me motivated through the tough parts.",
    author: 'Amara',
  },
  {
    quote:
      'He treats every student like family. That kind of care is rare these days.',
    author: 'Ngozi',
  },
  {
    quote:
      'I still use the fundamentals Logo drilled into me every single day at work.',
    author: 'Yusuf',
  },
  {
    quote:
      'Logo believed in me before I believed in myself. I owe my career to him.',
    author: 'Ifeoma',
  },
  {
    quote:
      'The most generous teacher I have ever met. He gives without expecting anything back.',
    author: 'Segun',
  },
  {
    quote:
      'He turned my curiosity into a real profession. Forever grateful for his guidance.',
    author: 'Halima',
  },
  {
    quote:
      'Logo made learning feel possible again after I had almost given up.',
    author: 'Chidi',
  },
  {
    quote:
      'Patient, brilliant, and endlessly kind. Our community is better because of him.',
    author: 'Bola',
  },
  {
    quote:
      'He mentored me for free when I had nothing. Now it is our turn to give back.',
    author: 'Uche',
  },
]

type Fund = 'Housing' | 'UK Medical'

const donations: {
  donor: string
  amount: string
  fund: Fund
  time: string
}[] = [
  { donor: 'Anonymous', amount: '₦25,000', fund: 'Housing', time: '2 min ago' },
  { donor: 'Sarah M.', amount: '₦50,000', fund: 'Housing', time: '5 min ago' },
  { donor: 'Daniel U.', amount: '$40', fund: 'UK Medical', time: '9 min ago' },
  { donor: 'James K.', amount: '₦15,000', fund: 'Housing', time: '12 min ago' },
  { donor: 'Blessing O.', amount: '₦100,000', fund: 'Housing', time: '18 min ago' },
  { donor: 'Anonymous', amount: '$100', fund: 'UK Medical', time: '21 min ago' },
  { donor: 'Patricia L.', amount: '₦30,000', fund: 'Housing', time: '24 min ago' },
  { donor: 'Kelechi A.', amount: '$25', fund: 'UK Medical', time: '27 min ago' },
  { donor: 'David N.', amount: '₦75,000', fund: 'Housing', time: '31 min ago' },
  { donor: 'Grace A.', amount: '₦20,000', fund: 'Housing', time: '38 min ago' },
  { donor: 'Michael T.', amount: '$60', fund: 'UK Medical', time: '44 min ago' },
  { donor: 'Anonymous', amount: '₦10,000', fund: 'Housing', time: '52 min ago' },
]

function FundBadge({ fund }: { fund: Fund }) {
  const isHousing = fund === 'Housing'
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${
        isHousing
          ? 'bg-accent/10 border-accent/20 text-accent'
          : 'bg-white/5 border-border-dark-elevated text-text-inverse-secondary'
      }`}
      style={{ fontSize: '12px', fontWeight: 500 }}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isHousing ? 'bg-accent' : 'bg-text-inverse-secondary'
        }`}
      />
      {fund}
    </span>
  )
}

export function StackedFeed() {
  return (
    <section className="gradient-dark-card py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-20">
        {/* ─── Testimonials ─── */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-[1px] bg-accent" />
            <span
              className="uppercase text-accent"
              style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.8px' }}
            >
              Standing With Logo
            </span>
          </div>
          <h2
            className="text-text-inverse font-bold"
            style={{ fontSize: '36px', lineHeight: '44px' }}
          >
            Voices from the community
          </h2>

          <div className="group overflow-hidden relative w-full mt-4">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-20 z-10 bg-gradient-to-r from-dark to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-20 z-10 bg-gradient-to-l from-dark to-transparent" />
            <div className="flex gap-5 animate-marquee will-change-transform w-max group-hover:[animation-play-state:paused]">
              {[...testimonials, ...testimonials].map((t, i) => (
                <figure
                  key={i}
                  className="flex-none w-[340px] p-6 rounded-2xl border border-border-dark flex flex-col gap-4"
                  style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)' }}
                >
                  <blockquote
                    className="text-text-inverse leading-relaxed flex-grow"
                    style={{ fontSize: '14px', lineHeight: '22px', fontWeight: 400 }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full gradient-accent flex items-center justify-center">
                      <span className="text-dark" style={{ fontSize: '11px', fontWeight: 700 }}>
                        {t.author[0]}
                      </span>
                    </div>
                    <span
                      className="text-text-inverse-secondary"
                      style={{ fontSize: '13px', fontWeight: 500 }}
                    >
                      {t.author}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Recent Donations ─── */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-[1px] bg-accent" />
              <span
                className="uppercase text-accent"
                style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.8px' }}
              >
                Recent Donations
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-text-inverse-secondary" style={{ fontSize: '12px', fontWeight: 500 }}>
                Live
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-border-dark overflow-hidden max-h-[420px] flex flex-col"
            style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)' }}
          >
            {/* Header */}
            <div className="hidden md:grid grid-cols-[1fr_120px_140px_100px] gap-6 py-3.5 px-6 border-b border-border-dark flex-none">
              {['Donor', 'Amount', 'Fund', 'Time'].map((h, i) => (
                <span
                  key={h}
                  className={`text-text-inverse-secondary uppercase ${i === 3 ? 'text-right' : ''}`}
                  style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.8px' }}
                >
                  {h}
                </span>
              ))}
            </div>
            {/* Rows */}
            <div className="flex-1 overflow-y-auto flex flex-col custom-scrollbar">
              {donations.map((d, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[1fr_auto] md:grid-cols-[1fr_120px_140px_100px] gap-3 md:gap-6 py-4 px-6 border-b border-border-dark items-center flex-none hover:bg-white/[0.02] last:border-b-0 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-dark-subtle flex items-center justify-center flex-none">
                      <span className="text-text-inverse-secondary" style={{ fontSize: '12px', fontWeight: 600 }}>
                        {d.donor === 'Anonymous' ? '?' : d.donor[0]}
                      </span>
                    </div>
                    <span
                      className="text-text-inverse"
                      style={{ fontSize: '14px', fontWeight: 500 }}
                    >
                      {d.donor}
                    </span>
                  </div>
                  <span
                    className="text-accent font-mono text-right md:text-left"
                    style={{ fontSize: '14px', fontWeight: 600 }}
                  >
                    {d.amount}
                  </span>
                  <div className="hidden md:block">
                    <FundBadge fund={d.fund} />
                  </div>
                  <span
                    className="hidden md:block text-text-inverse-secondary text-right"
                    style={{ fontSize: '13px' }}
                  >
                    {d.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
