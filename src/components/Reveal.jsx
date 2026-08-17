import { motion } from 'framer-motion'

const variants = {
  hidden: (d) => ({ opacity: 0, y: d === 'up' ? 28 : 0, x: d === 'left' ? 28 : d === 'right' ? -28 : 0 }),
  visible: { opacity: 1, y: 0, x: 0 },
}

export default function Reveal({ children, delay = 0, direction = 'up', className = '', once = true }) {
  return (
    <motion.div
      className={className}
      custom={direction}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
