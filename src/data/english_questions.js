import rawData from './p5_english_questions.json'

const DIFFICULTY_BY_CATEGORY = {
  'Vocabulary':            'easy',
  'Articles':              'easy',
  'Adverbs of Frequency':  'easy',
  'Verb Tenses':           'medium',
  'Prepositions':          'medium',
  'Phrasal Verbs':         'medium',
  'Word Forms':            'medium',
  'Synonyms':              'medium',
  'Antonyms':              'medium',
  'Sequencing':            'medium',
  'Proofreading':          'medium',
  'Reading Comprehension': 'hard',
}

export const englishQuestions = rawData.categories.flatMap(cat =>
  cat.questions.map(q => ({
    id: q.id,
    paper: q.paper,
    section: q.section,
    category: cat.name,
    difficulty: DIFFICULTY_BY_CATEGORY[cat.name] || 'medium',
    question: q.text,
    options: q.options,
    answer: q.answer,
    source: `Paper ${q.paper} · Section ${q.section}`,
    isGenerated: false,
  }))
)

export const ENGLISH_CATEGORIES = rawData.categories.map(c => c.name)

export const ENGLISH_CATEGORY_COLORS = {
  'Vocabulary':            { bg: 'bg-blue-100',    border: 'border-blue-400',    text: 'text-blue-800',    btn: 'bg-blue-500 hover:bg-blue-600' },
  'Verb Tenses':           { bg: 'bg-indigo-100',  border: 'border-indigo-400',  text: 'text-indigo-800',  btn: 'bg-indigo-500 hover:bg-indigo-600' },
  'Prepositions':          { bg: 'bg-violet-100',  border: 'border-violet-400',  text: 'text-violet-800',  btn: 'bg-violet-500 hover:bg-violet-600' },
  'Articles':              { bg: 'bg-sky-100',     border: 'border-sky-400',     text: 'text-sky-800',     btn: 'bg-sky-500 hover:bg-sky-600' },
  'Phrasal Verbs':         { bg: 'bg-purple-100',  border: 'border-purple-400',  text: 'text-purple-800',  btn: 'bg-purple-500 hover:bg-purple-600' },
  'Word Forms':            { bg: 'bg-teal-100',    border: 'border-teal-400',    text: 'text-teal-800',    btn: 'bg-teal-500 hover:bg-teal-600' },
  'Synonyms':              { bg: 'bg-emerald-100', border: 'border-emerald-400', text: 'text-emerald-800', btn: 'bg-emerald-500 hover:bg-emerald-600' },
  'Antonyms':              { bg: 'bg-green-100',   border: 'border-green-400',   text: 'text-green-800',   btn: 'bg-green-500 hover:bg-green-600' },
  'Sequencing':            { bg: 'bg-amber-100',   border: 'border-amber-400',   text: 'text-amber-800',   btn: 'bg-amber-500 hover:bg-amber-600' },
  'Proofreading':          { bg: 'bg-orange-100',  border: 'border-orange-400',  text: 'text-orange-800',  btn: 'bg-orange-500 hover:bg-orange-600' },
  'Adverbs of Frequency':  { bg: 'bg-cyan-100',    border: 'border-cyan-400',    text: 'text-cyan-800',    btn: 'bg-cyan-500 hover:bg-cyan-600' },
  'Reading Comprehension': { bg: 'bg-rose-100',    border: 'border-rose-400',    text: 'text-rose-800',    btn: 'bg-rose-500 hover:bg-rose-600' },
}

export const ENGLISH_SHORT_NAMES = {
  'Vocabulary':            'Vocabulary',
  'Verb Tenses':           'Verb Tenses',
  'Prepositions':          'Prepositions',
  'Articles':              'Articles',
  'Phrasal Verbs':         'Phrasal Verbs',
  'Word Forms':            'Word Forms',
  'Synonyms':              'Synonyms',
  'Antonyms':              'Antonyms',
  'Sequencing':            'Sequencing',
  'Proofreading':          'Proofreading',
  'Adverbs of Frequency':  'Adverbs',
  'Reading Comprehension': 'Reading',
}
