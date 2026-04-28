import { useState, useMemo } from 'react'
import { seedQuestions, CATEGORY_COLORS } from './data/questions'
import { scienceQuestions, SCIENCE_CATEGORY_COLORS } from './data/science_questions'
import { englishQuestions, ENGLISH_CATEGORY_COLORS } from './data/english_questions'
import HomeScreen from './components/HomeScreen'
import PracticeMode from './components/PracticeMode'
import QuizMode from './components/QuizMode'
import PrintMode from './components/PrintMode'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const ALL_QUESTIONS = {
  maths: seedQuestions,
  science: scienceQuestions,
  english: englishQuestions,
}

const ALL_CATEGORY_COLORS = {
  maths: CATEGORY_COLORS,
  science: SCIENCE_CATEGORY_COLORS,
  english: ENGLISH_CATEGORY_COLORS,
}

export default function App() {
  const [screen, setScreen] = useState('home')
  const [subject, setSubject] = useState('maths')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [quizCount, setQuizCount] = useState(10)

  const filteredQuestions = useMemo(() => {
    let qs = ALL_QUESTIONS[subject]
    if (selectedCategories.length > 0) qs = qs.filter(q => selectedCategories.includes(q.category))
    if (selectedDifficulty !== 'all')  qs = qs.filter(q => q.difficulty === selectedDifficulty)
    return shuffle(qs)
  }, [subject, selectedCategories, selectedDifficulty, screen])

  const quizQuestions = useMemo(() => filteredQuestions.slice(0, quizCount), [filteredQuestions, quizCount])

  function go(mode, { categories, difficulty, count }) {
    setSelectedCategories(categories)
    setSelectedDifficulty(difficulty)
    if (count !== undefined) setQuizCount(count)
    setScreen(mode)
  }

  const categoryColors = ALL_CATEGORY_COLORS[subject]

  if (screen === 'practice') {
    return <PracticeMode questions={filteredQuestions} categoryColors={categoryColors} onHome={() => setScreen('home')} />
  }
  if (screen === 'quiz') {
    return <QuizMode questions={quizQuestions} categoryColors={categoryColors} onHome={() => setScreen('home')} />
  }
  if (screen === 'print') {
    return (
      <PrintMode
        questions={filteredQuestions}
        onHome={() => setScreen('home')}
        selectedCategories={selectedCategories}
        selectedDifficulty={selectedDifficulty}
        subject={subject}
      />
    )
  }

  return (
    <HomeScreen
      onStart={go}
      subject={subject}
      onSubjectChange={newSubject => {
        setSubject(newSubject)
        setSelectedCategories([])
        setSelectedDifficulty('all')
      }}
    />
  )
}
