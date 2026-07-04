import { useState, useRef, useEffect } from 'react'

/**
 * Renders a syntax-highlighted code block from the Stitch design system.
 * Supports JavaScript/Python/generic highlighting via simple token coloring.
 */
function CodeBlock({ code, language = 'javascript', onCopy }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
      const el = document.createElement('textarea')
      el.value = code
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
    onCopy?.()
  }

  // Very lightweight syntax highlighter
  const highlight = (text) => {
    const tokens = []
    let i = 0
    while (i < text.length) {
      // Single-line comment
      if (text[i] === '/' && text[i + 1] === '/') {
        const end = text.indexOf('\n', i)
        const slice = end === -1 ? text.slice(i) : text.slice(i, end)
        tokens.push(<span key={i} className="tok-cmt">{slice}</span>)
        i += slice.length
        continue
      }
      // String literals
      if (text[i] === '"' || text[i] === "'" || text[i] === '`') {
        const q = text[i]
        let j = i + 1
        while (j < text.length && text[j] !== q) {
          if (text[j] === '\\') j++
          j++
        }
        j++
        tokens.push(<span key={i} className="tok-str">{text.slice(i, j)}</span>)
        i = j
        continue
      }
      // Numbers
      if (/\d/.test(text[i]) && (i === 0 || /\W/.test(text[i - 1]))) {
        let j = i
        while (j < text.length && /[\d._]/.test(text[j])) j++
        tokens.push(<span key={i} className="tok-num">{text.slice(i, j)}</span>)
        i = j
        continue
      }
      // Keywords / identifiers
      if (/[a-zA-Z_$]/.test(text[i])) {
        let j = i
        while (j < text.length && /[\w$]/.test(text[j])) j++
        const word = text.slice(i, j)
        const keywords = new Set([
          'function','return','const','let','var','if','else','for','while',
          'do','break','continue','switch','case','default','class','new',
          'this','typeof','instanceof','void','delete','throw','try','catch',
          'finally','import','export','from','of','in','async','await','=>',
          'true','false','null','undefined','static','extends','super',
          'yield','get','set','with','debugger',
        ])
        const builtins = new Set(['console','Math','Array','Object','String','Number','Boolean','Promise','JSON','Date','Error','Map','Set','Symbol','Proxy','Reflect','parseInt','parseFloat','isNaN','isFinite','decodeURI','encodeURI','setTimeout','setInterval','clearTimeout','clearInterval','fetch'])
        if (keywords.has(word)) {
          tokens.push(<span key={i} className="tok-kw">{word}</span>)
        } else if (builtins.has(word)) {
          tokens.push(<span key={i} className="tok-fn">{word}</span>)
        } else if (j < text.length && text[j] === '(') {
          tokens.push(<span key={i} className="tok-fn">{word}</span>)
        } else {
          tokens.push(<span key={i}>{word}</span>)
        }
        i = j
        continue
      }
      tokens.push(<span key={i}>{text[i]}</span>)
      i++
    }
    return tokens
  }

  return (
    <div className="code-block-wrapper">
      <div className="code-block-header">
        <span className="code-lang-tag">{language}</span>
        <button
          id={`copy-code-${Math.random().toString(36).slice(2, 7)}`}
          className={`copy-code-btn${copied ? ' copied' : ''}`}
          onClick={handleCopy}
          title="Copy code"
        >
          <span className="material-symbols-outlined">{copied ? 'check' : 'content_copy'}</span>
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className="code-scroll-area">
        <code className="code-inner">{highlight(code)}</code>
      </div>
    </div>
  )
}

export default CodeBlock
