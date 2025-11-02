import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const Confetti = () => {
  const [confettiPieces, setConfettiPieces] = useState([])

  useEffect(() => {
    // Criar 50 pedaços de confete
    const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800
    const pieces = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 1 + Math.random() * 2,
      yEnd: windowHeight + 100,
      xOffset: (Math.random() - 0.5) * 100,
      color: ['#F9C526', '#000000', '#FFFFFF', '#FFD700', '#FFA500'][
        Math.floor(Math.random() * 5)
      ],
    }))
    setConfettiPieces(pieces)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute w-3 h-3 rounded-full"
          style={{
            backgroundColor: piece.color,
            left: `${piece.x}%`,
            top: '-10px',
          }}
          initial={{ y: 0, rotate: 0 }}
          animate={{
            y: piece.yEnd,
            rotate: 360,
            x: piece.xOffset,
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}

export default Confetti

