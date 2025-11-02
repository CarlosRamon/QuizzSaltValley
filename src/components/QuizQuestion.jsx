import { motion } from 'framer-motion'

const QuizQuestion = ({ question, selectedAnswer, showResult, onAnswer }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      <h2 className="text-xl md:text-2xl font-bold text-salt-black mb-6 text-center md:text-left">
        {question.question}
      </h2>

      <div className="space-y-3 md:space-y-4">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === option.id
          const isCorrect = option.isCorrect
          const showCorrect = showResult && isCorrect
          const showWrong = showResult && isSelected && !isCorrect

          return (
            <motion.button
              key={option.id}
              onClick={() => onAnswer(option.id)}
              disabled={showResult}
              whileHover={!showResult ? { scale: 1.02 } : {}}
              whileTap={!showResult ? { scale: 0.98 } : {}}
              className={`
                w-full p-4 md:p-5 rounded-xl font-medium text-left
                transition-all duration-200
                ${
                  showCorrect
                    ? 'bg-green-500 text-white shadow-lg'
                    : showWrong
                    ? 'bg-red-500 text-white shadow-lg'
                    : isSelected
                    ? 'bg-gradient-to-r from-gorn-pink to-gorn-cyan text-white shadow-md'
                    : 'bg-gray-100 text-salt-black hover:bg-gradient-to-r hover:from-gorn-pink/10 hover:to-gorn-cyan/10 hover:shadow-md'
                }
                ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}
              `}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm md:text-base">{option.text}</span>
                {showResult && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-2xl"
                  >
                    {showCorrect ? '✓' : showWrong ? '✗' : ''}
                  </motion.span>
                )}
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

export default QuizQuestion

