import rawData from './p5_questions.json'
import generatedRaw from './generated_questions.json'

function sectionToDifficulty(section) {
  if (section === 'A') return 'easy'
  if (section === 'B') return 'medium'
  return 'hard'
}

function expandAnswer(answer, options) {
  if (!options || !answer) return answer
  const match = options.find(o => o.startsWith(answer + '.') || o.startsWith(answer + ' '))
  return match || answer
}

function transformReal(data) {
  const out = []
  for (const cat of data.categories) {
    for (const q of cat.questions) {
      out.push({
        id: q.id,
        paper: q.paper,
        section: q.section,
        category: cat.name,
        difficulty: sectionToDifficulty(q.section),
        question: q.text,
        options: q.type === 'mcq' ? q.options : undefined,
        answer: q.type === 'mcq' ? expandAnswer(q.answer, q.options) : q.answer,
        source: `Paper ${q.paper} · Section ${q.section}`,
        isGenerated: false,
      })
    }
  }
  return out
}

function transformGenerated(items) {
  return items.map(q => ({
    id: q.id,
    paper: null,
    section: q.section,
    category: q.category,
    difficulty: sectionToDifficulty(q.section),
    question: q.text,
    options: q.type === 'mcq' ? q.options : undefined,
    answer: q.type === 'mcq' ? expandAnswer(q.answer, q.options) : q.answer,
    source: `AI generated · based on ${q.basedOn}`,
    basedOn: q.basedOn,
    isGenerated: true,
  }))
}

const realQuestions = transformReal(rawData)
const aiQuestions = transformGenerated(generatedRaw)

export const seedQuestions = [...realQuestions, ...aiQuestions]

export const CATEGORIES = rawData.categories.map(c => c.name)

export const CATEGORY_COLORS = {
  'Place Value & Rounding':                    { bg: 'bg-teal-100',   border: 'border-teal-400',   text: 'text-teal-800',   btn: 'bg-teal-500 hover:bg-teal-600' },
  'Fractions & Mixed Numbers':                 { bg: 'bg-purple-100', border: 'border-purple-400', text: 'text-purple-800', btn: 'bg-purple-500 hover:bg-purple-600' },
  'Decimals & Decimal Computation':            { bg: 'bg-blue-100',   border: 'border-blue-400',   text: 'text-blue-800',   btn: 'bg-blue-500 hover:bg-blue-600' },
  'Primes, HCF & LCM':                        { bg: 'bg-orange-100', border: 'border-orange-400', text: 'text-orange-800', btn: 'bg-orange-500 hover:bg-orange-600' },
  'Algebra & Equations':                       { bg: 'bg-pink-100',   border: 'border-pink-400',   text: 'text-pink-800',   btn: 'bg-pink-500 hover:bg-pink-600' },
  'Word Problems (Rates, Ratio & Real-world)': { bg: 'bg-yellow-100', border: 'border-yellow-400', text: 'text-yellow-800', btn: 'bg-yellow-500 hover:bg-yellow-600' },
  'Area & Perimeter':                          { bg: 'bg-green-100',  border: 'border-green-400',  text: 'text-green-800',  btn: 'bg-green-500 hover:bg-green-600' },
  'Volume & 3-D Shapes':                       { bg: 'bg-cyan-100',   border: 'border-cyan-400',   text: 'text-cyan-800',   btn: 'bg-cyan-500 hover:bg-cyan-600' },
  'Circles':                                   { bg: 'bg-rose-100',   border: 'border-rose-400',   text: 'text-rose-800',   btn: 'bg-rose-500 hover:bg-rose-600' },
  '2-D Shape Properties':                      { bg: 'bg-indigo-100', border: 'border-indigo-400', text: 'text-indigo-800', btn: 'bg-indigo-500 hover:bg-indigo-600' },
  'Direction & Maps':                          { bg: 'bg-lime-100',   border: 'border-lime-400',   text: 'text-lime-800',   btn: 'bg-lime-500 hover:bg-lime-600' },
}

export const DIFFICULTY_LABELS = {
  easy:   { label: 'Easy',   section: 'Section A (MCQ)',        color: 'bg-green-500' },
  medium: { label: 'Medium', section: 'Section B (Short Ans)',  color: 'bg-yellow-500' },
  hard:   { label: 'Hard',   section: 'Section D/E (Long Ans)', color: 'bg-red-500' },
}
