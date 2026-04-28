import { useState } from 'react'
import { CATEGORY_COLORS, DIFFICULTY_LABELS } from '../data/questions'
import { MathText } from '../utils/mathRenderer'

export default function PracticeMode({ questions, categoryColors = CATEGORY_COLORS, onHome }) {
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const [score, setScore] = useState({ correct: 0, answered: 0 })

  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-dvh bg-amber-50 flex flex-col items-center justify-center gap-4 p-6">
        <p className="text-xl font-bold text-gray-700">No questions match your selection.</p>
        <button onClick={onHome} className="bg-orange-500 text-white font-bold px-8 py-3 rounded-2xl touch-manipulation">
          Go Back
        </button>
      </div>
    )
  }

  const q = questions[index]
  const isMCQ = Array.isArray(q.options) && q.options.length > 0
  const colors = categoryColors[q.category] || {}
  const diffInfo = DIFFICULTY_LABELS[q.difficulty] || {}
  const isLast = index === questions.length - 1

  function handleOptionClick(opt) {
    if (revealed) return
    setSelectedOption(opt)
    setRevealed(true)
    setScore(s => ({ correct: s.correct + (opt === q.answer ? 1 : 0), answered: s.answered + 1 }))
  }

  function handleReveal() {
    if (!revealed) {
      setRevealed(true)
      setScore(s => ({ ...s, answered: s.answered + 1 }))
    }
  }

  function next() {
    setIndex(i => i + 1)
    setRevealed(false)
    setSelectedOption(null)
  }

  return (
    <div className="min-h-dvh bg-gradient-to-b from-amber-50 to-orange-50 p-3 sm:p-6 md:p-8 pb-8">
      <div className="max-w-2xl mx-auto">

        {/* Top bar */}
        <div className="flex items-center justify-between mb-4 gap-2">
          <button
            onClick={onHome}
            className="text-gray-500 font-bold py-2 pr-2 touch-manipulation shrink-0"
          >
            ← Home
          </button>
          <div className="flex items-center gap-2 min-w-0">
            <span className="bg-white rounded-full px-3 py-1 text-xs sm:text-sm font-bold text-gray-600 shadow whitespace-nowrap">
              {index + 1} / {questions.length}
            </span>
            <span className="bg-teal-500 text-white rounded-full px-3 py-1 text-xs sm:text-sm font-bold shadow whitespace-nowrap">
              {score.correct}/{score.answered} correct
            </span>
          </div>
        </div>

        {/* Question card */}
        <div className={`bg-white rounded-3xl shadow-md p-4 sm:p-6 mb-4 border-l-8 ${colors.border || 'border-gray-300'} animate-pop`}>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            <span className={`${colors.bg} ${colors.text} text-xs font-bold px-2.5 py-1 rounded-full`}>
              {q.category}
            </span>
            <span className={`${diffInfo.color} text-white text-xs font-bold px-2.5 py-1 rounded-full`}>
              {diffInfo.section}
            </span>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
              q.isGenerated
                ? 'bg-violet-50 text-violet-600 border-violet-300'
                : 'bg-gray-50 text-gray-500 border-gray-300'
            }`}>
              {q.source}
            </span>
          </div>

          {/* Question */}
          <p className="text-lg sm:text-xl font-bold text-gray-800 leading-relaxed mb-5 whitespace-pre-wrap">
            <MathText>{q.question}</MathText>
          </p>

          {/* MCQ options */}
          {isMCQ && (
            <div className="grid gap-2">
              {q.options.map(opt => {
                const isSelected = selectedOption === opt
                const isCorrect = opt === q.answer
                let style = 'bg-gray-50 border-gray-200 text-gray-700'
                if (revealed) {
                  if (isCorrect)       style = 'bg-green-100 border-green-500 text-green-800'
                  else if (isSelected) style = 'bg-red-100 border-red-400 text-red-800'
                  else                 style = 'bg-gray-50 border-gray-200 text-gray-400'
                } else if (isSelected) {
                  style = 'bg-teal-100 border-teal-500 text-teal-800'
                }
                return (
                  <button
                    key={opt}
                    onClick={() => handleOptionClick(opt)}
                    disabled={revealed}
                    className={`text-left px-4 py-3 rounded-2xl border-2 font-semibold text-base transition-all touch-manipulation ${style}`}
                  >
                    <MathText>{opt}</MathText>
                  </button>
                )
              })}
            </div>
          )}

          {/* Reveal for open-ended */}
          {!isMCQ && !revealed && (
            <button
              onClick={handleReveal}
              className="w-full py-4 bg-amber-400 hover:bg-amber-500 text-white font-bold rounded-2xl text-lg transition-all touch-manipulation"
            >
              Reveal Answer
            </button>
          )}

          {/* Answer box */}
          {revealed && (
            <div className="mt-4 bg-green-50 border-2 border-green-300 rounded-2xl p-4 animate-pop">
              <p className="text-green-800 font-bold text-base sm:text-lg">
                Answer: <MathText>{q.answer}</MathText>
              </p>
            </div>
          )}
        </div>

        {/* Next / Done */}
        {!isLast ? (
          <button
            onClick={next}
            className="w-full bg-teal-500 hover:bg-teal-600 active:scale-95 text-white font-black text-xl py-4 rounded-3xl shadow-lg transition-all touch-manipulation"
          >
            Next Question
          </button>
        ) : (
          <div className="bg-white rounded-3xl shadow-md p-6 text-center">
            <p className="text-2xl font-black text-gray-800">All done!</p>
            <p className="text-lg text-gray-600 mt-1">
              You got <span className="text-teal-600 font-bold">{score.correct}</span> out of{' '}
              <span className="font-bold">{score.answered}</span> correct.
            </p>
            <button
              onClick={onHome}
              className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-2xl touch-manipulation"
            >
              Back to Home
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
