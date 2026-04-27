import { DIFFICULTY_LABELS } from '../data/questions'
import { MathText } from '../utils/mathRenderer'

export default function PrintMode({ questions, onHome, selectedCategories, selectedDifficulty }) {
  const topicLabel = selectedCategories.length === 0 ? 'All Topics' : selectedCategories.join(', ')
  const diffLabel = selectedDifficulty === 'all' ? 'All Levels' : DIFFICULTY_LABELS[selectedDifficulty]?.label

  return (
    <div>
      {/* Screen toolbar — hidden when printing */}
      <div className="no-print bg-purple-600 text-white sticky top-0 z-10 shadow-md">
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <button
            onClick={onHome}
            className="font-bold hover:underline shrink-0 py-1 touch-manipulation"
          >
            ← Home
          </button>
          {/* Topic label: hidden on very small screens to prevent overflow */}
          <span className="font-semibold text-xs sm:text-sm text-purple-200 truncate hidden sm:block">
            {questions.length} q · {topicLabel} · {diffLabel}
          </span>
          <span className="font-semibold text-xs text-purple-200 sm:hidden shrink-0">
            {questions.length} questions
          </span>
          <button
            onClick={() => window.print()}
            className="bg-white text-purple-600 font-black px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base hover:bg-purple-50 transition-all touch-manipulation shrink-0"
          >
            Print
          </button>
        </div>
      </div>

      {/* Scrollable preview on screen, full page when printing */}
      <div className="print-container max-w-3xl mx-auto p-4 sm:p-8 bg-white">

        {/* ── QUESTION SHEET ──────────────────────────────────────── */}
        <div className="text-center mb-6">
          <h1 className="text-xl sm:text-2xl font-black text-gray-800">
            Primary 5 Mathematics Practice Paper
          </h1>
          <p className="text-sm text-gray-600 mt-1">Topic: {topicLabel} · Level: {diffLabel}</p>
          {/* Name/date row — stack on mobile, inline on larger screens */}
          <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-gray-500 mt-4 border-t border-b border-gray-200 py-2 gap-1 sm:gap-0">
            <span>Name: _________________________</span>
            <span>Date: _____________</span>
            <span>Score: _____ / {questions.length}</span>
          </div>
        </div>

        {questions.map((q, i) => {
          const diffInfo = DIFFICULTY_LABELS[q.difficulty] || {}
          const isMCQ = Array.isArray(q.options) && q.options.length > 0
          const workingLines = q.difficulty === 'hard' ? 6 : q.difficulty === 'medium' ? 4 : 0

          return (
            <div key={q.id} className="mb-6 pb-4 border-b border-gray-200">
              <div className="flex gap-2 items-start">
                <span className="font-black text-lg text-gray-800 min-w-[2rem] shrink-0">{i + 1}.</span>
                <div className="flex-1 min-w-0">
                  <div className="flex gap-1.5 mb-1 flex-wrap items-center">
                    <span className="text-xs text-gray-500 font-semibold border border-gray-300 px-2 py-0.5 rounded">
                      {q.category}
                    </span>
                    <span className="text-xs text-gray-500 font-semibold border border-gray-300 px-2 py-0.5 rounded">
                      {diffInfo.section}
                    </span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${
                      q.isGenerated ? 'text-violet-500 border-violet-300' : 'text-gray-400 border-gray-200'
                    }`}>
                      {q.source}
                    </span>
                  </div>

                  <p className="text-base font-semibold text-gray-800 mb-2 leading-snug">
                    <MathText>{q.question}</MathText>
                  </p>

                  {isMCQ && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 mb-2">
                      {q.options.map(opt => (
                        <div key={opt} className="flex items-center gap-2 text-sm text-gray-700">
                          <span className="w-4 h-4 rounded-full border border-gray-400 inline-block shrink-0" />
                          <MathText>{opt}</MathText>
                        </div>
                      ))}
                    </div>
                  )}

                  {workingLines > 0 && (
                    <div className="mt-2">
                      {Array.from({ length: workingLines }).map((_, li) => (
                        <div key={li} className="border-b border-dashed border-gray-300 h-7 mb-1" />
                      ))}
                    </div>
                  )}

                  {!isMCQ && (
                    <div className="mt-2 border border-gray-300 rounded h-8 flex items-center px-2 text-xs text-gray-400">
                      Answer: ___________________________
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}

        {/* ── ANSWER KEY ──────────────────────────────────────────── */}
        <div className="page-break">
          <div className="text-center mb-6">
            <h1 className="text-xl sm:text-2xl font-black text-gray-800">Answer Key</h1>
            <p className="text-sm text-gray-600 mt-1">Topic: {topicLabel} · Level: {diffLabel}</p>
            <p className="text-xs text-red-500 font-semibold mt-1">For teacher / parent use only</p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {questions.map((q, i) => (
              <div key={q.id} className="flex gap-3 text-sm border-b border-gray-100 pb-2">
                <span className="font-black text-gray-700 min-w-[2rem] shrink-0">{i + 1}.</span>
                <div className="min-w-0">
                  <p className="text-gray-500 text-xs mb-0.5 leading-snug">
                    <MathText>
                      {q.question.length > 80 ? q.question.slice(0, 80) + '…' : q.question}
                    </MathText>
                  </p>
                  <p className="font-bold text-teal-700">
                    Answer: <MathText>{q.answer}</MathText>
                  </p>
                  <p className="text-gray-400 text-xs">{q.source}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
