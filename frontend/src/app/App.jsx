import { useState, useRef, useEffect, useCallback } from 'react'
import SolutionCard from '../components/SolutionCard'
import JudgeCard from '../components/JudgeCard'
import SkeletonLoader from '../components/SkeletonLoader'

/* ─── Mock data for demonstration ────────────────────────────── */
const MOCK_RESPONSE = {
  problem: 'Write code for Factorial Function in JS',
  solution_1: `## Recursive Approach

A clean, mathematically pure implementation using recursion.

**Key points:**
- Leverages the mathematical definition of factorial
- Handles the base case explicitly
- Elegant and readable for educational purposes

\`\`\`javascript
function factorial(n) {
  // Base case: 0! = 1 and 1! = 1
  if (n === 0 || n === 1) {
    return 1;
  }
  // Recursive step: n! = n * (n-1)!
  return n * factorial(n - 1);
}

// Example usage
console.log(factorial(5));  // 120
\`\`\`

This approach is elegant and directly mirrors the mathematical definition of factorial.`,

  solution_2: `## Iterative Approach

A memory-efficient implementation using a loop.

**Key points:**
- No risk of stack overflow for large inputs
- Constant O(1) space complexity
- Slightly more verbose but production-safe

\`\`\`javascript
const factorial = (n) => {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
};

// Example usage
console.log(factorial(5));  // 120
\`\`\`

This iterative approach avoids stack overflow issues that can occur with very large inputs in the recursive version.`,

  judge: {
    solution_1_score: 9,
    solution_2_score: 8,
    winner: 1,
    summary: 'Based on the analysis, Solution 1 provides a more elegant and mathematically pure recursive approach, which is often preferred for factorial calculations unless performance at extremely high values is critical.',
    solution_1_reasoning: 'Concise, clean recursive implementation. Directly maps to mathematical definition.',
    solution_2_reasoning: 'Iterative approach is memory efficient and avoids stack overflow risk for large inputs.',
    final_verdict: 'Use Solution 1 for standard applications requiring clarity and elegance.',
  },
}

const EXAMPLE_PROMPTS = [
  'Write a binary search in Python',
  'Implement a debounce function',
  'Create a linked list in Java',
]

function App() {
  // chatTurns holds an array of { id, problem, isGenerating, result: { solution_1, solution_2, judge } }
  const [chatTurns, setChatTurns] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const feedEndRef = useRef(null)
  const inputRef = useRef(null)

  // Scroll feed to bottom on new message or state change
  useEffect(() => {
    feedEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatTurns])

  // Dark mode class on html element
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  const sendMessage = useCallback(async (text) => {
    const question = text.trim()
    if (!question || isGenerating) return

    const turnId = Date.now().toString()
    setChatTurns(prev => [...prev, { id: turnId, problem: question, isGenerating: true, result: null }])
    setInputValue('')
    setIsGenerating(true)

    try {
      // Simulated delay (remove when connecting real backend)
      await new Promise(resolve => setTimeout(resolve, 2200))
      const data = { ...MOCK_RESPONSE, problem: question }

      setChatTurns(prev => prev.map(t => 
        t.id === turnId ? { ...t, isGenerating: false, result: data } : t
      ))
    } catch (err) {
      console.error('Battle Arena error:', err)
      setChatTurns(prev => prev.map(t => 
        t.id === turnId ? { ...t, isGenerating: false, error: 'Failed to generate solutions.' } : t
      ))
    } finally {
      setIsGenerating(false)
    }
  }, [isGenerating])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(inputValue)
    }
  }

  return (
    <div className="app-layout">
      {/* Header */}
      <header className="header">
        <div className="logo-section">
          <div className="logo-icon">
            <span className="material-symbols-outlined">gavel</span>
          </div>
          <h1>AI Battle Arena</h1>
        </div>
        <div className="header-actions">
          <button
            className="dark-toggle"
            onClick={() => setDarkMode(v => !v)}
            title="Toggle dark mode"
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </header>

      {/* Main Chat Feed */}
      <main className="chat-feed">
        <div className="feed-container">
          
          {/* Empty State */}
          {chatTurns.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">
                <span className="material-symbols-outlined">forum</span>
              </div>
              <div>
                <h2>No battle yet</h2>
                <p>Ask a programming question. Two AI models will compete to give you the best solution.</p>
              </div>
              <div className="example-pills">
                {EXAMPLE_PROMPTS.map((p, i) => (
                  <button
                    key={i}
                    className="example-pill"
                    onClick={() => {
                      setInputValue(p)
                      inputRef.current?.focus()
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Render Turns */}
          {chatTurns.map((turn) => (
            <div key={turn.id} className="chat-turn">
              {/* User Message */}
              <div className="user-message-container">
                <div className="user-bubble">{turn.problem}</div>
              </div>

              {/* AI Response Block */}
              {turn.isGenerating ? (
                <div className="ai-response-block">
                  <div className="thinking-dots">
                    <span className="dot" />
                    <span className="dot" />
                    <span className="dot" />
                  </div>
                  <SkeletonLoader />
                </div>
              ) : turn.error ? (
                <div className="ai-response-block" style={{ color: 'var(--color-error)' }}>
                  {turn.error}
                </div>
              ) : turn.result && (
                <div className="ai-response-block">
                  <SolutionCard
                    title="Solution 1"
                    score={turn.result.judge.solution_1_score}
                    model="GPT-4o"
                    content={turn.result.solution_1}
                    isWinner={turn.result.judge.winner === 1}
                  />
                  
                  <SolutionCard
                    title="Solution 2"
                    score={turn.result.judge.solution_2_score}
                    model="Claude 3.5"
                    content={turn.result.solution_2}
                    isWinner={turn.result.judge.winner === 2}
                  />

                  <JudgeCard judge={turn.result.judge} />
                </div>
              )}
            </div>
          ))}

          <div ref={feedEndRef} />
        </div>
      </main>

      {/* Fixed Bottom Input */}
      <div className="input-container">
        <div className="input-box">
          <textarea
            ref={inputRef}
            className="chat-input"
            placeholder="Ask a programming question..."
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            disabled={isGenerating}
          />
          <button
            className="send-btn"
            onClick={() => sendMessage(inputValue)}
            disabled={isGenerating || !inputValue.trim()}
            title="Send (Enter)"
          >
            <span className="material-symbols-outlined">arrow_upward</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
