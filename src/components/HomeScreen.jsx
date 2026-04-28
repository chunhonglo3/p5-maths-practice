import { useState, useEffect } from 'react'
import { CATEGORIES, CATEGORY_COLORS, seedQuestions } from '../data/questions'
import { SCIENCE_CATEGORIES, SCIENCE_CATEGORY_COLORS, SCIENCE_SHORT_NAMES, scienceQuestions } from '../data/science_questions'
import { ENGLISH_CATEGORIES, ENGLISH_CATEGORY_COLORS, ENGLISH_SHORT_NAMES, englishQuestions } from '../data/english_questions'

const DIFFICULTY_OPTIONS = [
  { value: 'all',    label: 'All',    sublabel: 'All Levels' },
  { value: 'easy',   label: 'Easy',   sublabel: 'Section A' },
  { value: 'medium', label: 'Medium', sublabel: 'Section B' },
  { value: 'hard',   label: 'Hard',   sublabel: 'Section D/E' },
]

const QUIZ_COUNTS = [5, 10, 20, 30]

const MATHS_SHORT_NAMES = {
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
  'Setting Up Calculations':                   'Setting Up',
}

const SUBJECTS = [
  { id: 'maths',   label: 'Maths',   activeClass: 'bg-orange-500 text-white border-orange-500',   inactiveClass: 'text-orange-600 border-orange-400' },
  { id: 'science', label: 'Science', activeClass: 'bg-emerald-500 text-white border-emerald-500', inactiveClass: 'text-emerald-600 border-emerald-400' },
  { id: 'english', label: 'English', activeClass: 'bg-blue-500 text-white border-blue-500',       inactiveClass: 'text-blue-600 border-blue-400' },
]

const SUBJECT_META = {
  maths: {
    title: 'P5 Maths Practice',
    subtitle: 'Hong Kong Primary 5 · Past Paper Questions',
    titleColor: 'text-orange-600',
    categories: CATEGORIES,
    categoryColors: CATEGORY_COLORS,
    shortNames: MATHS_SHORT_NAMES,
    allQuestions: seedQuestions,
    topicAllActive: 'bg-orange-500 text-white border-orange-500',
    topicAllInactive: 'bg-white text-orange-600 border-orange-400',
    difficultyActive: 'bg-orange-500 text-white border-orange-500 shadow-md scale-105',
    quizCountActive: 'bg-orange-500 text-white border-orange-500 scale-110',
    quizBtnClass: 'bg-amber-500 hover:bg-amber-600',
  },
  science: {
    title: 'P5 Science Practice',
    subtitle: 'Hong Kong Primary 5 · Term 3 Revision',
    titleColor: 'text-emerald-600',
    categories: SCIENCE_CATEGORIES,
    categoryColors: SCIENCE_CATEGORY_COLORS,
    shortNames: SCIENCE_SHORT_NAMES,
    allQuestions: scienceQuestions,
    topicAllActive: 'bg-emerald-500 text-white border-emerald-500',
    topicAllInactive: 'bg-white text-emerald-600 border-emerald-400',
    difficultyActive: 'bg-emerald-500 text-white border-emerald-500 shadow-md scale-105',
    quizCountActive: 'bg-emerald-500 text-white border-emerald-500 scale-110',
    quizBtnClass: 'bg-emerald-500 hover:bg-emerald-600',
  },
  english: {
    title: 'P5 English Practice',
    subtitle: 'Hong Kong Primary 5 · Term 3 Revision',
    titleColor: 'text-blue-600',
    categories: ENGLISH_CATEGORIES,
    categoryColors: ENGLISH_CATEGORY_COLORS,
    shortNames: ENGLISH_SHORT_NAMES,
    allQuestions: englishQuestions,
    topicAllActive: 'bg-blue-500 text-white border-blue-500',
    topicAllInactive: 'bg-white text-blue-600 border-blue-400',
    difficultyActive: 'bg-blue-500 text-white border-blue-500 shadow-md scale-105',
    quizCountActive: 'bg-blue-500 text-white border-blue-500 scale-110',
    quizBtnClass: 'bg-blue-500 hover:bg-blue-600',
  },
}

function countFor(allQuestions, cats, diff) {
  return allQuestions.filter(q =>
    (cats.length === 0 || cats.includes(q.category)) &&
    (diff === 'all' || q.difficulty === diff)
  ).length
}

export default function HomeScreen({ onStart, subject, onSubjectChange }) {
  const [selectedCategories, setSelectedCategories] = useState([])
  const [difficulty, setDifficulty] = useState('all')
  const [quizCount, setQuizCount] = useState(10)

  // Reset selections whenever subject changes
  useEffect(() => {
    setSelectedCategories([])
    setDifficulty('all')
  }, [subject])

  const meta = SUBJECT_META[subject]
  const { title, subtitle, titleColor, categories, categoryColors, shortNames, allQuestions,
          topicAllActive, topicAllInactive, difficultyActive, quizCountActive, quizBtnClass } = meta

  function toggleCategory(cat) {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    )
  }

  const allSelected = selectedCategories.length === 0
  const available = countFor(allQuestions, selectedCategories, difficulty)

  function go(mode) {
    onStart(mode, { categories: selectedCategories, difficulty, count: quizCount })
  }

  return (
    <div className="min-h-dvh bg-gradient-to-b from-amber-50 to-orange-50 p-4 sm:p-6 md:p-8 pb-10">
      <div className="max-w-3xl mx-auto">

        {/* Subject tab bar */}
        <div className="flex gap-2 mb-6 justify-center">
          {SUBJECTS.map(s => (
            <button
              key={s.id}
              onClick={() => onSubjectChange(s.id)}
              className={`px-6 py-2.5 rounded-full font-black text-sm sm:text-base border-2 transition-all touch-manipulation ${
                subject === s.id ? s.activeClass : `bg-white ${s.inactiveClass}`
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className={`text-3xl sm:text-4xl font-black mb-1 tracking-tight ${titleColor}`}>
            {title}
          </h1>
          <p className="text-base sm:text-lg text-gray-600">{subtitle}</p>
        </div>

        {/* Topic Picker */}
        <div className="bg-white rounded-3xl shadow-md p-4 sm:p-6 mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-700 mb-3">Topic</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategories([])}
              className={`px-3 sm:px-4 py-2.5 rounded-full font-bold text-sm border-2 transition-all touch-manipulation ${
                allSelected ? topicAllActive : topicAllInactive
              }`}
            >
              All Topics
            </button>
            {categories.map(cat => {
              const c = categoryColors[cat] || {}
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
                  {shortNames[cat] || cat}
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
                  difficulty === opt.value ? difficultyActive : 'bg-white text-gray-600 border-gray-200'
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
                    ? quizCountActive
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
            className={`w-full disabled:bg-gray-300 active:scale-95 text-white font-black text-lg sm:text-xl py-4 rounded-2xl shadow-lg transition-all touch-manipulation ${quizBtnClass}`}
          >
            Start Quiz · {Math.min(quizCount, available)} questions
          </button>
        </div>

      </div>
    </div>
  )
}
