import { useState, useMemo } from 'react'
import { seedQuestions } from './data/questions'
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

export default function App() {
  const [screen, setScreen] = useState('home')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [quizCount, setQuizCount] = useState(10)

  const filteredQuestions = useMemo(() => {
    let qs = seedQuestions
    if (selectedCategories.length > 0) qs = qs.filter(q => selectedCategories.includes(q.category))
    if (selectedDifficulty !== 'all')  qs = qs.filter(q => q.difficulty === selectedDifficulty)
    return shuffle(qs)
  }, [selectedCategories, selectedDifficulty, screen])

  const quizQuestions = useMemo(() => filteredQuestions.slice(0, quizCount), [filteredQuestions, quizCount])

  function go(mode, { categories, difficulty, count }) {
    setSelectedCategories(categories)
    setSelectedDifficulty(difficulty)
    if (count !== undefined) setQuizCount(count)
    setScreen(mode)
  }

  if (screen === 'practice') {
    return <PracticeMode questions={filteredQuestions} onHome={() => setScreen('home')} />
  }
  if (screen === 'quiz') {
    return <QuizMode questions={quizQuestions} onHome={() => setScreen('home')} />
  }
  if (screen === 'print') {
    return (
      <PrintMode
        questions={filteredQuestions}
        onHome={() => setScreen('home')}
        selectedCategories={selectedCategories}
        selectedDifficulty={selectedDifficulty}
      />
    )
  }

  return <HomeScreen onStart={go} />
}
