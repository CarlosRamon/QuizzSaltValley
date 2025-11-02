import { motion } from 'framer-motion'

const SuccessScreen = ({ score, totalQuestions, mainScore, bonusScore, earnedBadge, earnedBonus, onRestart }) => {
  const allCorrect = score === totalQuestions

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-2xl w-full text-center"
    >
      {earnedBadge ? (
        <>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mb-6"
          >
            <div className="text-6xl md:text-8xl mb-4">🎉</div>
            <h2 className="text-3xl md:text-4xl font-bold text-salt-black mb-2">
              Parabéns!
            </h2>
            <p className="text-lg md:text-xl text-gray-700">
              Você acertou todas as perguntas!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <div className="bg-gradient-to-r from-gorn-pink via-salt-yellow to-gorn-cyan rounded-xl p-6 md:p-8 shadow-lg mb-6">
              <p className="text-sm md:text-base text-gray-700 mb-3 font-medium">
                Seu selo Salt Valley:
              </p>
              <motion.h3
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
                className="text-4xl md:text-6xl font-bold text-salt-black tracking-wider mb-2"
              >
                SALT2025
              </motion.h3>
              <p className="text-xs md:text-sm text-gray-600 mt-3">
                Use esta palavra-chave no app oficial do Go!RN
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 md:p-6 mb-6">
              <p className="text-sm md:text-base text-gray-700 mb-3">
                <strong>Você conquistou o selo da Salt Valley!</strong>
                <br />
                Você acertou {mainScore} de {mainScore === 5 ? '5' : '5'} perguntas principais.
              </p>
              {earnedBonus && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                  className="bg-gradient-to-r from-gorn-pink/20 to-gorn-cyan/20 border-2 border-gorn-pink rounded-lg p-4 mt-4"
                >
                  <p className="text-lg font-bold text-gorn-pink mb-2">
                    🎁 Prêmio Extra Conquistado!
                  </p>
                  <p className="text-sm text-gray-700">
                    Você também acertou a pergunta bônus e conquistou um prêmio extra!
                  </p>
                </motion.div>
              )}
              <p className="text-sm md:text-base text-gray-600 mt-4">
                Continue explorando o ecossistema de inovação potiguar e conecte-se com pessoas, ideias e oportunidades no Go!RN.
              </p>
            </div>
          </motion.div>
        </>
      ) : (
        <>
          <div className="text-5xl md:text-6xl mb-4">📊</div>
          <h2 className="text-2xl md:text-3xl font-bold text-salt-black mb-4">
            Quiz Concluído!
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-6">
            Você acertou <strong>{score}</strong> de <strong>{totalQuestions}</strong> perguntas.
          </p>
          <div className="bg-yellow-50 rounded-lg p-6 mb-6">
            <p className="text-base md:text-lg text-gray-700 mb-2">
              Você acertou <strong>{mainScore || score}</strong> de <strong>5</strong> perguntas principais.
            </p>
            <p className="text-base md:text-lg text-gray-700">
              Tente novamente para conquistar o selo <strong>SALT2025</strong> e use no app oficial do Go!RN!
            </p>
            {mainScore === 5 && !earnedBadge && (
              <p className="text-sm text-gray-600 mt-2">
                Você acertou todas as 5 perguntas principais! Conquiste o selo respondendo todas corretamente em uma única tentativa.
              </p>
            )}
          </div>
        </>
      )}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onRestart}
        className="bg-salt-black text-white px-8 py-4 rounded-xl font-bold text-lg md:text-xl hover:bg-gray-800 transition-colors shadow-lg"
      >
        🎮 Jogar Novamente
      </motion.button>
    </motion.div>
  )
}

export default SuccessScreen

