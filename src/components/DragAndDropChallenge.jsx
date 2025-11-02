import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Diferentes tipos de desafios de arrastar e soltar
const challengeTypes = [
  {
    id: 1,
    title: 'Conecte os elementos!',
    description: 'Arraste cada conceito para seu correspondente',
    items: [
      { id: 'pessoas', text: '👥 Pessoas', correctSlot: 'conexao' },
      { id: 'ideias', text: '💡 Ideias', correctSlot: 'conexao' },
      { id: 'educacao', text: '📚 Educação', correctSlot: 'conexao' },
      { id: 'oportunidades', text: '🚀 Oportunidades', correctSlot: 'conexao' },
    ],
    slots: [
      { id: 'conexao', label: '🔗 Conexão', acceptCount: 4 },
    ],
  },
  {
    id: 2,
    title: 'Organize o ecossistema!',
    description: 'Arraste na ordem correta',
    items: [
      { id: 'startups', text: '🏢 Startups', order: 1 },
      { id: 'empresas', text: '💼 Empresas', order: 2 },
      { id: 'universidades', text: '🎓 Universidades', order: 3 },
      { id: 'governo', text: '🏛️ Governo', order: 4 },
    ],
    isOrder: true,
  },
  {
    id: 3,
    title: 'Combine os pares!',
    description: 'Arraste cada conceito para seu par correto',
    items: [
      { id: 'inovacao', text: '💭 Inovação', correctSlot: 'tecnologia' },
      { id: 'empreendedorismo', text: '🌟 Empreendedorismo', correctSlot: 'ecossistema' },
    ],
    slots: [
      { id: 'tecnologia', label: '🔧 Tecnologia', acceptCount: 1 },
      { id: 'ecossistema', label: '🌱 Ecossistema', acceptCount: 1 },
    ],
  },
]

const DragAndDropChallenge = ({ onComplete, challengeIndex = 0 }) => {
  const challenge = challengeTypes[challengeIndex % challengeTypes.length]
  const [draggedItem, setDraggedItem] = useState(null)
  const [slots, setSlots] = useState(
    challenge.slots?.map(slot => ({ ...slot, items: [] })) || 
    (challenge.isOrder ? [{ id: 'order', items: [] }] : [])
  )
  const [remainingItems, setRemainingItems] = useState([...challenge.items])
  const [isComplete, setIsComplete] = useState(false)

  const handleDragStart = (e, item) => {
    setDraggedItem(item)
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('text/html', item.id)
    }
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'move'
    }
  }

  const handleDrop = (e, slotId) => {
    e.preventDefault()
    
    if (!draggedItem) return

    const slot = slots.find(s => s.id === slotId)
    if (!slot) return

    // Verificar se já foi completado
    if (isComplete) return

    // Para desafios de ordem
    if (challenge.isOrder) {
      const newSlots = [...slots]
      const orderSlot = newSlots[0]
      
      if (!orderSlot.items.find(item => item.id === draggedItem.id)) {
        orderSlot.items.push(draggedItem)
        
        const newRemainingItems = remainingItems.filter(item => item.id !== draggedItem.id)
        setRemainingItems(newRemainingItems)
        setSlots(newSlots)
        setDraggedItem(null)

        // Verificar se está completo e correto
        if (newRemainingItems.length === 0) {
          const isCorrect = orderSlot.items.every((item, index) => item.order === index + 1)
          if (isCorrect) {
            setIsComplete(true)
            playSound('correct')
            setTimeout(() => {
              onComplete()
            }, 1000)
          } else {
            // Resetar se incorreto
            setTimeout(() => {
              setRemainingItems([...challenge.items])
              setSlots([{ id: 'order', items: [] }])
            }, 500)
          }
        }
      }
    } else {
      // Para desafios de slot
      const acceptCount = challenge.slots.find(s => s.id === slotId)?.acceptCount || 1
      
      if (slot.items.length < acceptCount) {
        const newSlots = slots.map(s => {
          if (s.id === slotId) {
            return { ...s, items: [...s.items, draggedItem] }
          }
          return s
        })

        const newRemainingItems = remainingItems.filter(item => item.id !== draggedItem.id)
        setRemainingItems(newRemainingItems)
        setSlots(newSlots)
        setDraggedItem(null)

        // Verificar se está completo
        if (newRemainingItems.length === 0) {
          const isCorrect = challenge.slots.every(s => {
            const slotItems = newSlots.find(ns => ns.id === s.id)?.items || []
            return slotItems.length === s.acceptCount && 
                   slotItems.every(item => item.correctSlot === s.id)
          })
          
          if (isCorrect) {
            setIsComplete(true)
            playSound('correct')
            setTimeout(() => {
              onComplete()
            }, 1000)
          } else {
            // Resetar se incorreto
            setTimeout(() => {
              setRemainingItems([...challenge.items])
              setSlots(challenge.slots.map(slot => ({ ...slot, items: [] })))
            }, 500)
          }
        }
      }
    }
  }

  const playSound = (type) => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      if (type === 'correct') {
        oscillator.frequency.value = 659.25 // Nota E5
        oscillator.type = 'sine'
      }

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.3)
    } catch (e) {
      console.log('Audio não disponível')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6"
    >
      <div className="text-center mb-6">
        <motion.h3
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gorn-pink to-gorn-cyan bg-clip-text text-transparent mb-2"
        >
          🎮 {challenge.title}
        </motion.h3>
        <p className="text-sm md:text-base text-gray-600">{challenge.description}</p>
      </div>

      {challenge.isOrder ? (
        // Desafio de ordem
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <AnimatePresence>
              {remainingItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ delay: index * 0.1 }}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                  onDragEnd={handleDragEnd}
                  className="bg-gradient-to-br from-gorn-pink/20 to-gorn-cyan/20 border-2 border-dashed border-gorn-pink/50 rounded-xl p-4 cursor-move hover:scale-105 hover:shadow-lg transition-all text-center font-medium text-sm md:text-base touch-none"
                >
                  {item.text}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'order')}
            className={`min-h-[120px] border-2 border-dashed rounded-xl p-4 ${
              isComplete
                ? 'bg-gradient-to-br from-green-100 to-green-50 border-green-400'
                : 'bg-gray-50 border-gray-300'
            } transition-all`}
          >
            <p className="text-xs text-gray-500 mb-2 text-center">Arraste aqui na ordem correta</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {slots[0]?.items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className={`bg-gradient-to-r from-gorn-pink to-gorn-cyan text-white rounded-lg px-4 py-2 font-medium text-sm md:text-base shadow-md`}
                >
                  {index + 1}. {item.text}
                </motion.div>
              ))}
            </div>
            {isComplete && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-center mt-2 text-green-600 font-bold"
              >
                ✓ Correto!
              </motion.div>
            )}
          </div>
        </div>
      ) : (
        // Desafio de slots
        <div className="space-y-6">
          {/* Itens disponíveis */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">Arraste os itens:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <AnimatePresence>
                {remainingItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0, rotate: 10 }}
                    transition={{ delay: index * 0.1, type: 'spring' }}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                    onDragEnd={handleDragEnd}
                    className="bg-gradient-to-br from-gorn-pink/20 to-gorn-cyan/20 border-2 border-dashed border-gorn-pink/50 rounded-xl p-4 cursor-move hover:scale-105 hover:shadow-lg transition-all text-center font-medium text-sm md:text-base touch-none"
                    whileDrag={{ scale: 1.1, zIndex: 50 }}
                  >
                    {item.text}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Slots de destino */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-700 mb-3">Solte aqui:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {slots.map((slot) => (
                <div
                  key={slot.id}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, slot.id)}
                  className={`min-h-[120px] border-2 border-dashed rounded-xl p-4 ${
                    slot.items.length === slot.acceptCount && isComplete
                      ? 'bg-gradient-to-br from-green-100 to-green-50 border-green-400'
                      : 'bg-gray-50 border-gray-300'
                  } transition-all`}
                >
                  <p className="text-sm font-medium text-gray-700 mb-3 text-center">
                    {slot.label}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center min-h-[60px]">
                    {slot.items.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="bg-gradient-to-r from-gorn-pink to-gorn-cyan text-white rounded-lg px-3 py-2 font-medium text-sm shadow-md"
                      >
                        {item.text}
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {isComplete && (
            <motion.div
              initial={{ scale: 0, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="inline-block text-4xl mb-2"
              >
                🎉
              </motion.div>
              <p className="text-green-600 font-bold text-lg">Desafio completo! Prosseguindo...</p>
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  )
}

export default DragAndDropChallenge
