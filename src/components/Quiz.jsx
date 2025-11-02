import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Confetti from './Confetti'
import SuccessScreen from './SuccessScreen'
import QuizQuestion from './QuizQuestion'
import DragAndDropChallenge from './DragAndDropChallenge'

// Perguntas do quiz sobre inovação, comunidade e tecnologia - inspiradas no tema GoRN
const questions = [
  {
    id: 1,
    question: 'Segundo o tema do GoRN 2025, o que é essencial para inovar?',
    options: [
      { id: 'a', text: 'Tecnologia de ponta e investimentos massivos' },
      { id: 'b', text: 'Conectar pessoas, ideias, educação e oportunidades', isCorrect: true },
      { id: 'c', text: 'Competição acirrada entre empresas' },
    ],
  },
  {
    id: 2,
    question: 'O GoRN é o maior evento de inovação e tecnologia do RN. Qual o principal objetivo do evento?',
    options: [
      { id: 'a', text: 'Impulsionar o ecossistema de inovação potiguar através de conexões e oportunidades', isCorrect: true },
      { id: 'b', text: 'Vender produtos tecnológicos' },
      { id: 'c', text: 'Competir com outros eventos do Brasil' },
    ],
  },
  {
    id: 3,
    question: 'No ecossistema de inovação, o que mais importa para fortalecer parcerias e conectar o RN às tendências globais?',
    options: [
      { id: 'a', text: 'Ter apenas grandes empresas multinacionais' },
      { id: 'b', text: 'Focar apenas em startups e investidores' },
      { id: 'c', text: 'Integração entre startups, empresas, universidades, governo e ambientes de inovação', isCorrect: true },
    ],
  },
  {
    id: 4,
    question: 'O que caracteriza uma startup?',
    options: [
      { id: 'a', text: 'Uma empresa tradicional que opera em mercado consolidado' },
      { id: 'b', text: 'Uma organização temporária em busca de um modelo de negócio escalável e repetível', isCorrect: true },
      { id: 'c', text: 'Uma multinacional de tecnologia com grande número de funcionários' },
      { id: 'd', text: 'Uma empresa pública de capital aberto' },
    ],
  },
  {
    id: 5,
    question: 'Qual estratégia ajuda uma startup a validar seu modelo de negócio antes de buscar investimentos grandes?',
    options: [
      { id: 'a', text: 'Contratar vários funcionários rapidamente' },
      { id: 'b', text: 'Criar um produto final completo antes de testar' },
      { id: 'c', text: 'Utilizar MVPs (Mínimos Produtos Viáveis) e feedback de usuários', isCorrect: true },
      { id: 'd', text: 'Aumentar o preço para medir a demanda' },
    ],
  },
  {
    id: 6,
    question: 'Em mercados emergentes como o do Rio Grande do Norte, qual fator é mais desafiador para mensurar o Product-Market Fit?',
    options: [
      { id: 'a', text: 'Falta de concorrência direta' },
      { id: 'b', text: 'Limitações de infraestrutura e menor maturidade do ecossistema de inovação', isCorrect: true },
      { id: 'c', text: 'Excesso de investimento internacional' },
      { id: 'd', text: 'Saturação de produtos tecnológicos' },
    ],
    isBonus: true,
  },
]

// Número mínimo de perguntas para conquistar o selo
const MIN_QUESTIONS_FOR_BADGE = 5

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [answeredQuestions, setAnsweredQuestions] = useState([])
  const [showChallenge, setShowChallenge] = useState(true)
  const [challengeCompleted, setChallengeCompleted] = useState(false)
  const [badgeEarned, setBadgeEarned] = useState(false)

  // Reiniciar o jogo
  const resetGame = () => {
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setGameCompleted(false)
    setAnsweredQuestions([])
    setShowChallenge(true)
    setChallengeCompleted(false)
    setBadgeEarned(false)
  }

  // Quando o desafio é completado
  const handleChallengeComplete = () => {
    setChallengeCompleted(true)
    setShowChallenge(false)
  }

  // Verificar resposta
  const handleAnswer = (optionId) => {
    if (showResult) return // Previne múltiplos cliques

    const option = questions[currentQuestion].options.find(opt => opt.id === optionId)
    setSelectedAnswer(optionId)
    setShowResult(true)

    // Tocar som de acerto ou erro
    playSound(option?.isCorrect ? 'correct' : 'wrong')

    if (option?.isCorrect) {
      setScore(score + 1)
    }

    // Adicionar à lista de perguntas respondidas
    setAnsweredQuestions([...answeredQuestions, {
      questionId: questions[currentQuestion].id,
      isCorrect: option?.isCorrect || false,
    }])

    // Verificar se conquistou o selo (acertou todas as 5 primeiras perguntas)
    const nextQuestionIndex = currentQuestion + 1
    
    // Se completou a 5ª pergunta, verifica se conquistou o selo
    if (nextQuestionIndex === MIN_QUESTIONS_FOR_BADGE) {
      const mainQuestionsScore = answeredQuestions
        .filter((_, idx) => idx < MIN_QUESTIONS_FOR_BADGE - 1)
        .filter(q => q.isCorrect).length
      const totalMainScore = mainQuestionsScore + (option?.isCorrect ? 1 : 0)
      
      if (totalMainScore === MIN_QUESTIONS_FOR_BADGE) {
        setBadgeEarned(true)
      }
    }

    // Avançar para próxima pergunta após 1.5 segundos
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setShowResult(false)
        setShowChallenge(true)
        setChallengeCompleted(false)
      } else {
        // Jogo completo
        setGameCompleted(true)
      }
    }, 1500)
  }

  // Efeito de som simples (usando Web Audio API)
  const playSound = (type) => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      if (type === 'correct') {
        oscillator.frequency.value = 523.25 // Nota C5
        oscillator.type = 'sine'
      } else {
        oscillator.frequency.value = 200 // Tom mais grave para erro
        oscillator.type = 'sawtooth'
      }

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.2)
    } catch (e) {
      // Falha silenciosa se Web Audio API não estiver disponível
      console.log('Audio não disponível')
    }
  }

  // Se o jogo foi completado, mostrar tela de sucesso
  if (gameCompleted) {
    // Calcular score das perguntas principais (5 primeiras)
    const mainScore = answeredQuestions
      .filter((_, idx) => idx < MIN_QUESTIONS_FOR_BADGE)
      .filter(q => q.isCorrect).length
    const bonusScore = answeredQuestions
      .filter((_, idx) => idx >= MIN_QUESTIONS_FOR_BADGE)
      .filter(q => q.isCorrect).length
    
    const earnedBadge = mainScore === MIN_QUESTIONS_FOR_BADGE
    const earnedBonus = bonusScore > 0 && answeredQuestions[answeredQuestions.length - 1]?.isCorrect
    
    return (
      <>
        {earnedBadge && <Confetti />}
        <SuccessScreen 
          score={score} 
          totalQuestions={questions.length}
          mainScore={mainScore}
          bonusScore={bonusScore}
          earnedBadge={earnedBadge}
          earnedBonus={earnedBonus}
          onRestart={resetGame} 
        />
      </>
    )
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100
  const correctProgress = (score / questions.length) * 100

  return (
    <div className="w-full max-w-2xl">
      {/* Barra de progresso */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm md:text-base font-medium text-salt-black">
            Pergunta {currentQuestion + 1} de {questions.length}
          </span>
          <span className="text-sm md:text-base font-medium text-salt-black">
            {score} / {questions.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-gorn-pink to-gorn-cyan rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2 mt-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-gorn-cyan to-gorn-pink rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${correctProgress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <p className="text-xs text-gray-600 mt-1 text-center">Acertos: {score}</p>
      </div>

      {/* Mini desafio de arrastar e soltar antes da pergunta */}
      <AnimatePresence mode="wait">
        {showChallenge && !challengeCompleted ? (
          <motion.div
            key={`challenge-${currentQuestion}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <DragAndDropChallenge
              onComplete={handleChallengeComplete}
              challengeIndex={currentQuestion}
            />
          </motion.div>
        ) : (
          <motion.div
            key={`question-${currentQuestion}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {questions[currentQuestion].isBonus && badgeEarned && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-gorn-pink via-salt-yellow to-gorn-cyan rounded-xl p-4 mb-4 text-center"
              >
                <p className="text-white font-bold text-lg">
                  🎁 Pergunta Bônus - Prêmio Extra!
                </p>
                <p className="text-white/90 text-sm mt-1">
                  Você já conquistou o selo! Esta pergunta vale um prêmio extra.
                </p>
              </motion.div>
            )}
            <QuizQuestion
              question={questions[currentQuestion]}
              selectedAnswer={selectedAnswer}
              showResult={showResult}
              onAnswer={handleAnswer}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Quiz

