import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, Share2, ArrowRight } from 'lucide-react'

interface ThankYouModalProps {
  isOpen: boolean
  onClose: () => void
  copiedItem: string
}

/* ─── Particle burst (lightweight confetti) ─── */
function Particles() {
  const particles = Array.from({ length: 18 }, (_, i) => {
    const angle = (i / 18) * 360
    const distance = 60 + Math.random() * 80
    const size = 4 + Math.random() * 6
    const duration = 0.6 + Math.random() * 0.4
    const colors = ['#00E887', '#5DF6B4', '#FFD700', '#FF6B6B', '#A78BFA', '#60A5FA']
    const color = colors[i % colors.length]
    return { angle, distance, size, duration, color, id: i }
  })

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => {
        const rad = (p.angle * Math.PI) / 180
        const x = Math.cos(rad) * p.distance
        const y = Math.sin(rad) * p.distance
        return (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            animate={{ opacity: 0, x, y, scale: 0 }}
            transition={{ duration: p.duration, ease: 'easeOut' }}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              left: '50%',
              top: '40%',
              marginLeft: -p.size / 2,
              marginTop: -p.size / 2,
            }}
          />
        )
      })}
    </div>
  )
}

export function ThankYouModal({ isOpen, onClose, copiedItem }: ThankYouModalProps) {
  const handleEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose],
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleEsc])

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Support Logo — Restore. Rebuild. Rise.',
          text: "I just copied the account details to support Logo's emergency fund. Join me in helping!",
          url: window.location.href,
        })
        .catch(() => {})
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="pointer-events-auto relative w-full max-w-md rounded-3xl overflow-hidden"
              style={{
                background: 'linear-gradient(180deg, #181818 0%, #0D0D0D 100%)',
              }}
            >
              {/* Glow effect at top */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(0,232,135,0.25), transparent 70%)',
                }}
              />

              {/* Particle burst */}
              <Particles />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X size={14} className="text-white/60" />
              </button>

              {/* Content */}
              <div className="relative px-8 pt-12 pb-8 text-center">
                {/* Animated heart icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: 'spring',
                    damping: 12,
                    stiffness: 200,
                    delay: 0.15,
                  }}
                  className="w-16 h-16 rounded-2xl gradient-accent mx-auto mb-6 flex items-center justify-center"
                >
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                  >
                    <Heart size={28} className="text-dark" fill="currentColor" />
                  </motion.div>
                </motion.div>

                {/* Heading */}
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-white font-bold mb-2"
                  style={{ fontSize: '24px', lineHeight: '32px', letterSpacing: '-0.5px' }}
                >
                  Thank you for caring!
                </motion.h3>

                {/* Subheading */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-2"
                  style={{ fontSize: '15px', lineHeight: '24px', color: 'rgba(255,255,255,0.6)' }}
                >
                  <span className="text-accent font-medium">{copiedItem}</span>{' '}
                  has been copied to your clipboard.
                </motion.p>

                {/* Emotional nudge */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-8"
                  style={{ fontSize: '14px', lineHeight: '22px', color: 'rgba(255,255,255,0.45)' }}
                >
                  Your donation — no matter the size — brings Logo one step
                  closer to a safe home and a life-changing opportunity.
                  Every naira counts. Every dollar matters.
                </motion.p>

                {/* Reminder box */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="rounded-xl p-4 mb-6 border border-white/[0.08] text-left"
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  <div
                    className="uppercase mb-2 text-accent"
                    style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.8px' }}
                  >
                    Quick Reminder
                  </div>
                  <p style={{ fontSize: '13px', lineHeight: '20px', color: 'rgba(255,255,255,0.55)' }}>
                    When making your transfer, please add{' '}
                    <span className="text-white font-medium">&ldquo;HOUSING&rdquo;</span> or{' '}
                    <span className="text-white font-medium">&ldquo;UK MEDICAL&rdquo;</span>{' '}
                    in the remarks so we know which fund to allocate it to.
                  </p>
                </motion.div>

                {/* Action buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col gap-3"
                >
                  <button
                    onClick={handleShare}
                    className="w-full py-3 rounded-full gradient-accent text-dark flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-accent/25 transition-all"
                    style={{ fontSize: '14px', fontWeight: 600, letterSpacing: '0.2px' }}
                  >
                    <Share2 size={15} />
                    Share This Campaign
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full py-3 rounded-full bg-white/[0.06] text-white/70 hover:bg-white/[0.1] hover:text-white flex items-center justify-center gap-2 transition-all border border-white/[0.06]"
                    style={{ fontSize: '14px', fontWeight: 500 }}
                  >
                    Continue Donating <ArrowRight size={14} />
                  </button>
                </motion.div>

                {/* Bottom note */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mt-6"
                  style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}
                >
                  100% of your donation goes directly to Oluwamayowa.
                </motion.p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
