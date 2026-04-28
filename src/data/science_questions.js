import rawData from './p5_science_questions.json'

function typeToSection(type) {
  if (type === 'true_false' || type === 'fill_blank') return 'A'
  if (type === 'short_answer' || type === 'matching') return 'B'
  return 'D' // long_answer
}

function sectionToDifficulty(section) {
  if (section === 'A') return 'easy'
  if (section === 'B') return 'medium'
  return 'hard'
}

export const scienceQuestions = rawData.categories.flatMap(cat =>
  cat.questions.map(q => {
    const section = typeToSection(q.type)
    let options
    let answer = q.answer

    if (q.type === 'true_false') {
      options = ['T. True', 'F. False']
      answer = q.answer === 'T' ? 'T. True' : 'F. False'
    }

    return {
      id: q.id,
      paper: q.paper,
      section,
      category: cat.name,
      difficulty: sectionToDifficulty(section),
      question: q.text,
      options,
      answer,
      source: `Paper ${q.paper} · Section ${q.section}`,
      isGenerated: false,
    }
  })
)

export const SCIENCE_CATEGORIES = rawData.categories.map(c => c.name)

export const SCIENCE_CATEGORY_COLORS = {
  "Earth's Rotation & Day/Night":  { bg: 'bg-sky-100',    border: 'border-sky-400',    text: 'text-sky-800',    btn: 'bg-sky-500 hover:bg-sky-600' },
  "Earth's Revolution & Seasons":  { bg: 'bg-amber-100',  border: 'border-amber-400',  text: 'text-amber-800',  btn: 'bg-amber-500 hover:bg-amber-600' },
  'Time Zones':                    { bg: 'bg-teal-100',   border: 'border-teal-400',   text: 'text-teal-800',   btn: 'bg-teal-500 hover:bg-teal-600' },
  'The Moon & Lunar Cycle':        { bg: 'bg-violet-100', border: 'border-violet-400', text: 'text-violet-800', btn: 'bg-violet-500 hover:bg-violet-600' },
  'Solar & Lunar Eclipses':        { bg: 'bg-rose-100',   border: 'border-rose-400',   text: 'text-rose-800',   btn: 'bg-rose-500 hover:bg-rose-600' },
}

export const SCIENCE_SHORT_NAMES = {
  "Earth's Rotation & Day/Night":  'Rotation & Day/Night',
  "Earth's Revolution & Seasons":  'Revolution & Seasons',
  'Time Zones':                    'Time Zones',
  'The Moon & Lunar Cycle':        'Moon & Lunar Cycle',
  'Solar & Lunar Eclipses':        'Solar & Lunar Eclipses',
}
