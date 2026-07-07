/* ────────────────────────────────────────────────────── */
/*  ImageMarquee — mobile-only infinite scroll gallery    */
/* ────────────────────────────────────────────────────── */

const IMAGES = [
  {
    src: 'https://i.ibb.co/VXZ5Fy2/IMG-20231101-233922-794.jpg',
    alt: "Oluwamayowa 'Logo' Adebola — Community educator",
    caption: 'Logo — Educator & Mentor',
  },
  {
    src: 'https://i.ibb.co/tPW64BYj/1000071959.avif',
    alt: 'Ceiling collapse — full room view',
    caption: 'Ceiling collapse — full damage',
  },
  {
    src: 'https://i.ibb.co/YFZqMnz4/1000071960.avif',
    alt: 'Close-up of collapsed POP ceiling',
    caption: 'Structural damage close-up',
  },
  {
    src: 'https://i.ibb.co/MktMPZPz/1000071958.avif',
    alt: 'Interior debris from ceiling collapse',
    caption: 'Debris — second home destroyed',
  },
]

/* Duplicate for seamless loop */
const TRACK = [...IMAGES, ...IMAGES, ...IMAGES]

export function ImageMarquee() {
  return (
    <div
      className="md:hidden overflow-hidden relative"
      style={{ background: '#0e0e0c', paddingTop: '24px', paddingBottom: '24px' }}
    >
      {/* Left fade */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12"
        style={{ background: 'linear-gradient(to right, #0e0e0c, transparent)' }}
      />
      {/* Right fade */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12"
        style={{ background: 'linear-gradient(to left, #0e0e0c, transparent)' }}
      />

      {/* Scrolling track */}
      <div
        className="flex gap-3 w-max"
        style={{ animation: 'img-marquee 28s linear infinite' }}
      >
        {TRACK.map((img, i) => (
          <div
            key={i}
            className="flex-none rounded-2xl overflow-hidden relative"
            style={{
              width: '200px',
              height: '240px',
              border: '1px solid rgba(255,255,255,0.08)',
              flexShrink: 0,
            }}
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            {/* Caption overlay */}
            <div
              className="absolute bottom-0 left-0 right-0 px-3 py-2"
              style={{
                background: 'linear-gradient(to top, rgba(0,0,0,0.75), transparent)',
              }}
            >
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.70)',
                  display: 'block',
                  lineHeight: '16px',
                }}
              >
                {img.caption}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
