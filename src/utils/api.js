const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY

// Calls Claude to generate 3 questions similar to the given question.
// Returns an array of question objects matching the seed data schema.
export async function generateSimilarQuestions(referenceQuestion) {
  if (!API_KEY) {
    throw new Error('No API key found. Add VITE_ANTHROPIC_API_KEY to your .env file.')
  }

  const prompt = `You are helping a 10-year-old student prepare for the Hong Kong Primary 5 Mathematics exam (Red Square Exam Intensive style).

Generate exactly 3 new questions similar to this reference question:

Category: ${referenceQuestion.category}
Exam section: ${referenceQuestion.section || referenceQuestion.difficulty}
Question: ${referenceQuestion.question}
${referenceQuestion.options ? 'Type: Multiple choice (4 options labelled A/B/C/D)' : 'Type: Open-ended (short or long answer)'}

Rules:
- Match the same category, difficulty, and question type
- Use numbers and values appropriate for P5 HK maths
- For MCQ: provide exactly 4 options labelled A, B, C, D; mark the correct answer with the full option text
- Include a brief explanation (1-2 sentences)
- Make the questions varied but at the same skill level

Respond with ONLY a valid JSON array (no markdown, no extra text):
[
  {
    "id": "gen_<random 6-char alphanumeric>",
    "category": "<same category>",
    "difficulty": "<same difficulty>",
    "question": "<question text>",
    "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
    "answer": "<full correct option text, e.g. 'B. 42'>",
    "explanation": "<brief explanation>"
  }
]

For open-ended questions omit the "options" field and set "answer" to the numeric/text answer.`

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-allow-browser': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 1500,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err.error?.message || `API error ${response.status}`)
  }

  const data = await response.json()
  const text = data.content?.[0]?.text || ''

  try {
    const parsed = JSON.parse(text)
    if (!Array.isArray(parsed)) throw new Error('Expected an array')
    return parsed
  } catch {
    throw new Error('Claude returned unexpected format. Try again.')
  }
}
