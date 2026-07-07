import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface CountdownTimerProps {
  targetDate: Date
  label: string
  format: 'hours' | 'days'
}

export function CountdownTimer({
  targetDate,
  label,
  format,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  })

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date()
      const diff = Math.max(
        0,
        Math.floor((targetDate.getTime() - now.getTime()) / 1000),
      )
      if (format === 'hours') {
        const hh = String(Math.floor(diff / 3600)).padStart(2, '0')
        const mm = String(Math.floor((diff % 3600) / 60)).padStart(2, '0')
        const ss = String(diff % 60).padStart(2, '0')
        setTimeLeft({ days: '00', hours: hh, minutes: mm, seconds: ss })
      } else {
        const dd = String(Math.floor(diff / 86400)).padStart(2, '0')
        const hh = String(Math.floor((diff % 86400) / 3600)).padStart(2, '0')
        const mm = String(Math.floor((diff % 3600) / 60)).padStart(2, '0')
        setTimeLeft({ days: dd, hours: hh, minutes: mm, seconds: '00' })
      }
    }
    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [targetDate, format])

  const units =
    format === 'hours'
      ? [
          { value: timeLeft.hours, label: 'HRS' },
          { value: timeLeft.minutes, label: 'MIN' },
          { value: timeLeft.seconds, label: 'SEC' },
        ]
      : [
          { value: timeLeft.days, label: 'DAYS' },
          { value: timeLeft.hours, label: 'HRS' },
          { value: timeLeft.minutes, label: 'MIN' },
        ]

  return (
    <div className="flex flex-col items-center gap-3">
      {label && (
        <span
          className="uppercase tracking-[0.08em] text-text-inverse-secondary"
          style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.8px' }}
        >
          {label}
        </span>
      )}
      <div className="flex items-center gap-2">
        {units.map((u, i) => (
          <div key={u.label} className="flex items-center gap-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center"
            >
              <span
                className="font-mono font-bold text-text-inverse tabular-nums"
                style={{ fontSize: '48px', lineHeight: '48px' }}
              >
                {u.value}
              </span>
              <span
                className="text-text-inverse-secondary uppercase mt-1"
                style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.8px' }}
              >
                {u.label}
              </span>
            </motion.div>
            {i < units.length - 1 && (
              <span
                className="text-text-inverse-secondary font-light self-start"
                style={{ fontSize: '36px', lineHeight: '48px' }}
              >
                :
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
