import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Diferentes tipos de desafios simples para mobile
const challengeTypes = [
  {
    id: 1,
    title: 'Conecte os elementos!',
    description: 'Toque nos itens para adicionar à conexão',
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
    description: 'Toque nos itens na ordem correta',
    items: [
      { id: 'startups', text: '1 🏢 Startups', order: 1 },
      { id: 'empresas', text: '2 💼 Empresas', order: 2 },
      { id: 'universidades', text: '3 🎓 Universidades', order: 3 },
      { id: 'governo', text: '4 🏛️ Governo', order: 4 },
    ],
    isOrder: true,
  },
  {
    id: 3,
    title: 'Combine os pares!',
    description: 'Toque em cada item e depois no seu par',
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
  const [selectedItem, setSelectedItem] = useState(null)
  const [slots, setSlots] = useState(
    challenge.slots?.map(slot => ({ ...slot, items: [] })) || 
    (challenge.isOrder ? [{ id: 'order', items: [] }] : [])
  )
  const [remainingItems, setRemainingItems] = useState([...challenge.items])
  const [isComplete, setIsComplete] = useState(false)

  const handleItemClick = (item) => {
    if (isComplete) return

    // Para desafios de ordem, apenas adiciona na sequência
    if (challenge.isOrder) {
      const newSlots = [...slots]
      const orderSlot = newSlots[0]
      
      // Verifica se o item já foi adicionado
      if (orderSlot.items.find(existing => existing.id === item.id)) {
        return
      }

      // Adiciona o item
      orderSlot.items.push(item)
      
      const newRemainingItems = remainingItems.filter(i => i.id !== item.id)
      setRemainingItems(newRemainingItems)
      setSlots(newSlots)

      // Verifica se está completo e correto
      if (newRemainingItems.length === 0) {
        const isCorrect = orderSlot.items.every((it, index) => it.order === index + 1)
        if (isCorrect) {
          setIsComplete(true)
          playSound('correct')
          setTimeout(() => {
            onComplete()
          }, 1000)
        } else {
          // Resetar se incorreto
          playSound('wrong')
          setTimeout(() => {
            setRemainingItems([...challenge.items])
            setSlots([{ id: 'order', items: [] }])
          }, 500)
        }
      }
    } else {
      // Para desafios de slot, seleciona o item
      if (selectedItem?.id === item.id) {
        setSelectedItem(null)
      } else {
        setSelectedItem(item)
      }
    }
  }

  const handleSlotClick = (slotId) => {
    if (!selectedItem || isComplete) return

    const slot = slots.find(s => s.id === slotId)
    if (!slot) return

    const acceptCount = challenge.slots.find(s => s.id === slotId)?.acceptCount || 1

    if (slot.items.length < acceptCount) {
      const newSlots = slots.map(s => {
        if (s.id === slotId) {
          return { ...s, items: [...s.items, selectedItem] }
        }
        return s
      })

      const newRemainingItems = remainingItems.filter(item => item.id !== selectedItem.id)
      setRemainingItems(newRemainingItems)
      setSlots(newSlots)
      setSelectedItem(null)

      // Verifica se está completo
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
          playSound('wrong')
          setTimeout(() => {
            setRemainingItems([...challenge.items])
            setSlots(challenge.slots.map(slot => ({ ...slot, items: [] })))
          }, 500)
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
      } else {
        oscillator.frequency.value = 300
        oscillator.type = 'sawtooth'
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
        // Desafio de ordem - toque simples
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <AnimatePresence>
              {remainingItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleItemClick(item)}
                  className="bg-gradient-to-br from-gorn-pink/20 to-gorn-cyan/20 border-2 border-dashed border-gorn-pink/50 rounded-xl p-4 hover:scale-105 active:scale-95 transition-all text-center font-medium text-sm md:text-base cursor-pointer"
                >
                  {item.text}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>

          <div className="min-h-[120px] border-2 border-dashed rounded-xl p-4 bg-gray-50 border-gray-300 transition-all">
            <p className="text-xs text-gray-500 mb-2 text-center">Itens na ordem correta:</p>
            <div className="flex flex-wrap gap-2 justify-center min-h-[60px]">
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
        // Desafio de slots - toque para selecionar e depois toque no destino
        <div className="space-y-6">
          {/* Itens disponíveis */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">
              {selectedItem ? 'Selecione o destino abaixo' : 'Toque em um item para selecionar:'}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <AnimatePresence>
                {remainingItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, scale: 0, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0, rotate: 10 }}
                    transition={{ delay: index * 0.1, type: 'spring' }}
                    onClick={() => handleItemClick(item)}
                    className={`rounded-xl p-4 font-medium text-sm md:text-base transition-all active:scale-95 ${
                      selectedItem?.id === item.id
                        ? 'bg-gradient-to-br from-gorn-pink to-gorn-cyan text-white shadow-lg scale-105 ring-4 ring-gorn-pink/30'
                        : 'bg-gradient-to-br from-gorn-pink/20 to-gorn-cyan/20 border-2 border-dashed border-gorn-pink/50 hover:scale-105 hover:shadow-lg'
                    }`}
                  >
                    {item.text}
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Slots de destino */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-700 mb-3">Toque no destino correto:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {slots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => handleSlotClick(slot.id)}
                  disabled={!selectedItem || slot.items.length >= slot.acceptCount}
                  className={`min-h-[120px] border-2 border-dashed rounded-xl p-4 transition-all active:scale-95 ${
                    slot.items.length === slot.acceptCount && isComplete
                      ? 'bg-gradient-to-br from-green-100 to-green-50 border-green-400 cursor-default'
                      : selectedItem && slot.items.length < slot.acceptCount
                      ? 'bg-gray-100 border-gorn-pink hover:border-gorn-cyan hover:bg-gray-200 cursor-pointer'
                      : 'bg-gray-50 border-gray-300 cursor-not-allowed opacity-50'
                  }`}
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
                </button>
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
