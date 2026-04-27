import { useState } from 'react'
import { CATEGORIES, CATEGORY_COLORS, seedQuestions } from '../data/questions'

const DIFFICULTY_OPTIONS = [
  { value: 'all',    label: 'All',    sublabel: 'All Levels' },
  { value: 'easy',   label: 'Easy',   sublabel: 'Section A' },
  { value: 'medium', label: 'Medium', sublabel: 'Section B' },
  { value: 'hard',   label: 'Hard',   sublabel: 'Section D/E' },
]

const QUIZ_COUNTS = [5, 10, 20, 30]

// Short display name for category chips
const SHORT_NAME = {
  'Place Value & Rounding':                    'Place Value',
  'Fractions & Mixed Numbers':                 'Fractions',
  'Decimals & Decimal Computation':            'Decimals',
  'Primes, HCF & LCM':                        'Primes/HCF/LCM',
  'Algebra & Equations':                       'Algebra',
  'Word Problems (Rates, Ratio & Real-world)': 'Word Problems',
  'Area & Perimeter':                          'Area & Perimeter',
  'Volume & 3-D Shapes':                       'Volume & 3-D',
  'Circles':                                   'Circles',
  '2-D Shape Properties':                      '2-D Shapes',
  'Direction & Maps':                          'Direction & Maps',
}

function countFor(cats, diff) {
  return seedQuestions.filter(q =>
    (cats.length === 0 || cats.includes(q.category)) &&
    (diff === 'all' || q.difficulty === diff)
  ).length
}

export default function HomeScreen({ onStart }) {
  const [selectedCategories, setSelectedCategories] = useState([])
  const [difficulty, setDifficulty] = useState('all')
  const [quizCount, setQuizCount] = useState(10)

  function toggleCategory(cat) {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    )
  }

  const allSelected = selectedCategories.length === 0
  const available = countFor(selectedCategories, difficulty)

  function go(mode) {
    onStart(mode, { categories: selectedCategories, difficulty, count: quizCount })
  }

  return (
    <div className="min-h-dvh bg-gradient-to-b from-amber-50 to-orange-50 p-4 sm:p-6 md:p-8 pb-10">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-orange-600 mb-1 tracking-tight">
            P5 Maths Practice
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Hong Kong Primary 5 · Past Paper Questions
          </p>
        </div>

        {/* Topic Picker */}
        <div className="bg-white rounded-3xl shadow-md p-4 sm:p-6 mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-700 mb-3">Topic</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategories([])}
              className={`px-3 sm:px-4 py-2.5 rounded-full font-bold text-sm border-2 transition-all touch-manipulation ${
                allSelected
                  ? 'bg-orange-500 text-white border-orange-500'
                  : 'bg-white text-orange-600 border-orange-400'
              }`}
            >
              All Topics
            </button>
            {CATEGORIES.map(cat => {
              const c = CATEGORY_COLORS[cat] || {}
              const active = selectedCategories.includes(cat)
              return (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={`px-3 sm:px-4 py-2.5 rounded-full font-bold text-sm border-2 transition-all touch-manipulation ${
                    active
                      ? `${c.btn} text-white border-transparent`
                      : `bg-white ${c.text} ${c.border}`
                  }`}
                >
                  {SHORT_NAME[cat] || cat}
                </button>
              )
            })}
          </div>
        </div>

        {/* Difficulty Picker */}
        <div className="bg-white rounded-3xl shadow-md p-4 sm:p-6 mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-700 mb-3">Difficulty</h2>
          <div className="grid grid-cols-4 gap-2">
            {DIFFICULTY_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => setDifficulty(opt.value)}
                className={`py-3 px-1 rounded-2xl font-bold border-2 transition-all text-center touch-manipulation ${
                  difficulty === opt.value
                    ? 'bg-orange-500 text-white border-orange-500 shadow-md scale-105'
                    : 'bg-white text-gray-600 border-gray-200'
                }`}
              >
                <div className="text-sm sm:text-base">{opt.label}</div>
                <div className="text-xs text-current opacity-70 mt-0.5 hidden sm:block">{opt.sublabel}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Available count */}
        <p className="text-center text-gray-500 mb-4 font-semibold text-sm sm:text-base">
          {available} question{available !== 1 ? 's' : ''} available
        </p>

        {/* Practice + Print */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button
            onClick={() => go('practice')}
            disabled={available === 0}
            className="bg-teal-500 hover:bg-teal-600 disabled:bg-gray-300 active:scale-95 text-white font-black text-base sm:text-xl py-4 sm:py-5 rounded-3xl shadow-lg transition-all touch-manipulation"
          >
            Practice
          </button>
          <button
            onClick={() => go('print')}
            disabled={available === 0}
            className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 active:scale-95 text-white font-black text-base sm:text-xl py-4 sm:py-5 rounded-3xl shadow-lg transition-all touch-manipulation"
          >
            Print Sheet
          </button>
        </div>

        {/* Quiz mode */}
        <div className="bg-white rounded-3xl shadow-md p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-700 mb-1">Practice Quiz</h2>
          <p className="text-xs sm:text-sm text-gray-500 mb-4">
            Answer all questions first, then see your score.
          </p>
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="font-semibold text-gray-600 text-sm">Questions:</span>
            {QUIZ_COUNTS.map(n => (
              <button
                key={n}
                onClick={() => setQuizCount(n)}
                disabled={n > available}
                className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl font-black border-2 transition-all touch-manipulation text-sm sm:text-base ${
                  quizCount === n
                    ? 'bg-orange-500 text-white border-orange-500 scale-110'
                    : n > available
                      ? 'bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed'
                      : 'bg-white text-gray-700 border-gray-300'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
          <button
            onClick={() => go('quiz')}
            disabled={available === 0}
            className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 active:scale-95 text-white font-black text-lg sm:text-xl py-4 rounded-2xl shadow-lg transition-all touch-manipulation"
          >
            Start Quiz · {Math.min(quizCount, available)} questions
          </button>
        </div>

      </div>
    </div>
  )
}
