import { useState } from 'react'
import { CATEGORY_COLORS, DIFFICULTY_LABELS } from '../data/questions'
import { MathText } from '../utils/mathRenderer'

export default function QuizMode({ questions, categoryColors = CATEGORY_COLORS, onHome }) {
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

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

  // ── Results screen ──────────────────────────────────────────────────────────
  if (submitted) {
    const mcqQuestions = questions.filter(q => Array.isArray(q.options) && q.options.length > 0)
    const mcqCorrect = mcqQuestions.filter(q => answers[q.id] === q.answer).length
    const total = mcqQuestions.length
    const pct = total > 0 ? Math.round((mcqCorrect / total) * 100) : 0

    const grade = pct >= 90 ? { label: 'Excellent!',           color: 'text-teal-600' }
      : pct >= 70 ? { label: 'Well done!',             color: 'text-green-600' }
      : pct >= 50 ? { label: 'Keep trying!',            color: 'text-yellow-600' }
      :             { label: 'More practice needed',    color: 'text-red-500' }

    return (
      <div className="min-h-dvh bg-gradient-to-b from-amber-50 to-orange-50 p-3 sm:p-6 md:p-8 pb-10">
        <div className="max-w-2xl mx-auto">

          {/* Score card */}
          <div className="bg-white rounded-3xl shadow-md p-6 sm:p-8 text-center mb-6">
            <p className={`text-3xl sm:text-4xl font-black mb-2 ${grade.color}`}>{grade.label}</p>
            <p className="text-7xl font-black text-gray-800 my-4">{pct}%</p>
            <p className="text-lg sm:text-xl text-gray-600">
              {mcqCorrect} / {total} multiple-choice correct
            </p>
            {questions.length > total && (
              <p className="text-sm text-gray-400 mt-1">
                {questions.length - total} open-ended — check your working below
              </p>
            )}
          </div>

          {/* Review */}
          <div className="space-y-3">
            {questions.map((q, i) => {
              const isMCQ = Array.isArray(q.options) && q.options.length > 0
              const userAnswer = answers[q.id]
              const correct = isMCQ ? userAnswer === q.answer : null
              const colors = categoryColors[q.category] || {}

              return (
                <div
                  key={q.id}
                  className={`bg-white rounded-2xl p-4 border-l-4 shadow-sm ${
                    isMCQ ? (correct ? 'border-green-500' : 'border-red-400') : 'border-blue-400'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`text-base font-black min-w-[1.5rem] shrink-0 ${
                      isMCQ ? (correct ? 'text-green-600' : 'text-red-500') : 'text-blue-500'
                    }`}>
                      {i + 1}.
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap gap-1 mb-1.5">
                        <span className={`${colors.bg} ${colors.text} text-xs font-bold px-2 py-0.5 rounded-full`}>
                          {q.category}
                        </span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${
                          q.isGenerated ? 'text-violet-500 border-violet-300 bg-violet-50' : 'text-gray-400 border-gray-200'
                        }`}>
                          {q.source}
                        </span>
                      </div>
                      <p className="font-semibold text-gray-800 mb-2 text-sm leading-snug">
                        <MathText>{q.question}</MathText>
                      </p>
                      {isMCQ ? (
                        <div className="space-y-0.5">
                          <p className={`text-sm font-bold ${correct ? 'text-green-700' : 'text-red-600'}`}>
                            Your answer: <MathText>{userAnswer || '(not answered)'}</MathText>
                          </p>
                          {!correct && (
                            <p className="text-sm font-bold text-green-700">
                              Correct: <MathText>{q.answer}</MathText>
                            </p>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-0.5">
                          <p className="text-sm text-gray-500">Your working: {userAnswer || '(blank)'}</p>
                          <p className="text-sm font-bold text-teal-700">
                            Answer: <MathText>{q.answer}</MathText>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <button
            onClick={onHome}
            className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl touch-manipulation"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  // ── Question screen ─────────────────────────────────────────────────────────
  const q = questions[currentIndex]
  const isMCQ = Array.isArray(q.options) && q.options.length > 0
  const colors = categoryColors[q.category] || {}
  const diffInfo = DIFFICULTY_LABELS[q.difficulty] || {}
  const userAnswer = answers[q.id]
  const answeredCount = Object.keys(answers).length
  const allAnswered = questions.every(q2 => answers[q2.id] !== undefined && answers[q2.id] !== '')

  function setAnswer(id, val) {
    setAnswers(prev => ({ ...prev, [id]: val }))
  }

  function goTo(idx) {
    setCurrentIndex(Math.max(0, Math.min(questions.length - 1, idx)))
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
              {currentIndex + 1} / {questions.length}
            </span>
            <span className="bg-amber-500 text-white rounded-full px-3 py-1 text-xs sm:text-sm font-bold shadow whitespace-nowrap">
              {answeredCount}/{questions.length} done
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4">
          <div
            className="bg-amber-400 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${(answeredCount / questions.length) * 100}%` }}
          />
        </div>

        {/* Question card */}
        <div className={`bg-white rounded-3xl shadow-md p-4 sm:p-6 mb-4 border-l-8 ${colors.border || 'border-gray-300'} animate-pop`}>
          <div className="flex flex-wrap gap-1.5 mb-3">
            <span className={`${colors.bg} ${colors.text} text-xs font-bold px-2.5 py-1 rounded-full`}>
              {q.category}
            </span>
            <span className={`${diffInfo.color} text-white text-xs font-bold px-2.5 py-1 rounded-full`}>
              {diffInfo.section}
            </span>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
              q.isGenerated ? 'bg-violet-50 text-violet-600 border-violet-300' : 'bg-gray-50 text-gray-500 border-gray-300'
            }`}>
              {q.source}
            </span>
          </div>

          <p className="text-lg sm:text-xl font-bold text-gray-800 leading-relaxed mb-5 whitespace-pre-wrap">
            <MathText>{q.question}</MathText>
          </p>

          {isMCQ ? (
            <div className="grid gap-2">
              {q.options.map(opt => (
                <button
                  key={opt}
                  onClick={() => setAnswer(q.id, opt)}
                  className={`text-left px-4 py-3 rounded-2xl border-2 font-semibold text-base transition-all touch-manipulation ${
                    userAnswer === opt
                      ? 'bg-amber-100 border-amber-500 text-amber-800'
                      : 'bg-gray-50 border-gray-200 text-gray-700'
                  }`}
                >
                  <MathText>{opt}</MathText>
                </button>
              ))}
            </div>
          ) : (
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Your answer:</label>
              <input
                type="text"
                inputMode="text"
                value={userAnswer || ''}
                onChange={e => setAnswer(q.id, e.target.value)}
                placeholder="Type your answer here…"
                className="w-full border-2 border-gray-300 focus:border-amber-400 rounded-2xl px-4 py-3 text-base sm:text-lg font-semibold outline-none transition-all"
              />
            </div>
          )}
        </div>

        {/* Prev / Next */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={() => goTo(currentIndex - 1)}
            disabled={currentIndex === 0}
            className="flex-1 bg-white border-2 border-gray-300 disabled:opacity-40 text-gray-700 font-bold py-3 rounded-2xl touch-manipulation text-base"
          >
            ← Prev
          </button>
          {currentIndex < questions.length - 1 ? (
            <button
              onClick={() => goTo(currentIndex + 1)}
              className="flex-1 bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-2xl touch-manipulation text-base"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={() => setSubmitted(true)}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-black py-3 rounded-2xl touch-manipulation text-base"
            >
              Submit
            </button>
          )}
        </div>

        {/* Question navigator — dots for ≤20, mini-numbers for more */}
        <div className="flex flex-wrap gap-1.5 justify-center">
          {questions.map((q2, i) => (
            <button
              key={q2.id}
              onClick={() => goTo(i)}
              className={`w-9 h-9 rounded-full text-xs font-bold transition-all touch-manipulation ${
                i === currentIndex
                  ? 'bg-orange-500 text-white scale-110 shadow'
                  : answers[q2.id]
                    ? 'bg-teal-400 text-white'
                    : 'bg-white border-2 border-gray-300 text-gray-500'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Submit shortcut when all done */}
        {allAnswered && (
          <button
            onClick={() => setSubmitted(true)}
            className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-black text-lg py-4 rounded-3xl shadow-lg animate-pop touch-manipulation"
          >
            Submit Quiz — See Results
          </button>
        )}

      </div>
    </div>
  )
}
