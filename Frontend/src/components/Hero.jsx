import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Hero() {
  const navigate = useNavigate()

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 py-28">
      
      {/* Background glow */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-300/30 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-indigo-300/30 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 mx-auto max-w-3xl text-center px-6"
      >
        {/* Badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700"
        >
          AI-Powered Job Discovery
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-6 text-5xl font-extrabold tracking-tight text-blue-900 sm:text-6xl"
        >
          Wevolve
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-lg text-gray-600 leading-relaxed"
        >
          Discover jobs that truly match your skills, interests, and career goals —
          not just keywords.
        </motion.p>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300 }}
          onClick={() => navigate('/developer')}
          className="mt-10 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-500/30"
        >
          Get Started
          <span className="text-xl">→</span>
        </motion.button>
      </motion.div>
    </section>
  )
}
