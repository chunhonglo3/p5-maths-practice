import katex from 'katex'

// Convert a captured token to LaTeX.
// All a/b patterns become \dfrac{a}{b} — never inline slash notation.
function toLatex(raw) {
  let s = raw

  // Operators & superscripts (handle before fraction conversion)
  s = s.replace(/×/g, '\\times ')
  s = s.replace(/÷/g, '\\div ')
  s = s.replace(/−/g, '-')
  s = s.replace(/cm²/g, '\\text{cm}^{2}')
  s = s.replace(/m²/g,  '\\text{m}^{2}')
  s = s.replace(/cm³/g, '\\text{cm}^{3}')
  s = s.replace(/m³/g,  '\\text{m}^{3}')
  s = s.replace(/²/g, '^{2}')
  s = s.replace(/³/g, '^{3}')

  // Mixed numbers first: "3 1/4" → "3\dfrac{1}{4}"
  // Numerator/denominator can be digits or a single letter (algebraic: y, P, r …)
  s = s.replace(/(\d+)\s+([A-Za-z]|\d+)\/([A-Za-z]|\d+)/g, '$1\\dfrac{$2}{$3}')
  // Remaining fractions: "1/4", "y/36", "3/p" → "\dfrac{…}{…}"
  s = s.replace(/([A-Za-z]|\d+)\/([A-Za-z]|\d+)/g, '\\dfrac{$1}{$2}')

  return s
}

function renderKatex(latex) {
  try {
    return katex.renderToString(latex, { throwOnError: false, displayMode: false })
  } catch {
    return null
  }
}

// Tokenise text into plain-text and math segments.
//
// Math segments captured:
//   • Mixed numbers:  "3 1/4",  "10 5/7"  (digit-space-fraction)
//   • Pure fractions: "1/4",    "17/39"
//   • Algebraic:      "y/36",   "3/p",    "Y/2"  (letter/digit or digit/letter)
//   • Operators:      ×  ÷
//   • Superscripts:   ²  ³  cm²  m²  cm³  m³
//
// Deliberately excluded: identifiers like "P3-A1" (contain dashes / uppercase
// block letters, not matched by the single-[A-Za-z] numerator/denominator rule).
const FRAC = '(?:\\d+\\s+)?(?:[A-Za-z]|\\d+)\\/(?:[A-Za-z]|\\d+)'
const OPS  = '[×÷]'
const SUP  = 'cm[²³]|m[²³]|[²³]'
const MATH_RE = new RegExp(`(${FRAC}|${OPS}|${SUP})`, 'g')

export function MathText({ children, className = '' }) {
  if (!children) return null
  const text = String(children)
  const parts = []
  let last = 0
  let m

  MATH_RE.lastIndex = 0
  while ((m = MATH_RE.exec(text)) !== null) {
    if (m.index > last) parts.push({ t: 'text', v: text.slice(last, m.index) })
    parts.push({ t: 'math', v: m[0] })
    last = m.index + m[0].length
  }
  if (last < text.length) parts.push({ t: 'text', v: text.slice(last) })

  return (
    <span className={className}>
      {parts.map((p, i) => {
        if (p.t === 'text') return <span key={i}>{p.v}</span>
        const html = renderKatex(toLatex(p.v))
        return html
          ? <span key={i} dangerouslySetInnerHTML={{ __html: html }} />
          : <span key={i}>{p.v}</span>
      })}
    </span>
  )
}
