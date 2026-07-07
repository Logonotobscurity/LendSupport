import { motion } from 'framer-motion'

interface ProgressBarProps {
  percentage: number
  variant?: 'accent' | 'muted'
}

export function ProgressBar({ percentage, variant = 'accent' }: ProgressBarProps) {
  return (
    <div className="w-full h-1.5 bg-black/[0.06] rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${percentage}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`h-full rounded-full ${
          variant === 'accent' ? 'gradient-accent' : 'bg-dark'
        }`}
      />
    </div>
  )
}
