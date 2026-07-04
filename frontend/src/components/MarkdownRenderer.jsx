import { useState } from 'react'
import CodeBlock from './CodeBlock'

/**
 * Renders a markdown-like string.
 * Supports: # headings, **bold**, `inline code`, ```code blocks```, bullet lists.
 */
function MarkdownRenderer({ content }) {
  if (!content) return null

  // Split out code blocks first
  const parts = content.split(/(```[\s\S]*?```)/g)

  return (
    <div>
      {parts.map((part, idx) => {
        if (part.startsWith('```')) {
          const firstNewline = part.indexOf('\n')
          const lang = part.slice(3, firstNewline).trim() || 'javascript'
          const code = part.slice(firstNewline + 1, part.lastIndexOf('```')).trim()
          return <div key={idx} style={{ marginTop: 12, marginBottom: 12 }}><CodeBlock code={code} language={lang} /></div>
        }
        // Inline rendering
        return <InlineMarkdown key={idx} text={part} />
      })}
    </div>
  )
}

function InlineMarkdown({ text }) {
  const lines = text.split('\n')
  const elements = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Headings
    if (line.startsWith('### ')) {
      elements.push(<h4 key={i} style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text-primary)', marginTop: 14, marginBottom: 6 }}>{parseInline(line.slice(4))}</h4>)
    } else if (line.startsWith('## ')) {
      elements.push(<h3 key={i} style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-text-primary)', marginTop: 16, marginBottom: 8 }}>{parseInline(line.slice(3))}</h3>)
    } else if (line.startsWith('# ')) {
      elements.push(<h2 key={i} style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text-primary)', marginTop: 16, marginBottom: 8 }}>{parseInline(line.slice(2))}</h2>)
    }
    // Bullet list
    else if (line.startsWith('- ') || line.startsWith('* ')) {
      const listItems = []
      while (i < lines.length && (lines[i].startsWith('- ') || lines[i].startsWith('* '))) {
        listItems.push(<li key={i} style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--color-text-secondary)', paddingLeft: 4 }}>{parseInline(lines[i].slice(2))}</li>)
        i++
      }
      elements.push(<ul key={`ul-${i}`} style={{ listStyle: 'disc', paddingLeft: 20, marginTop: 8, marginBottom: 8 }}>{listItems}</ul>)
      continue
    }
    // Empty line
    else if (line.trim() === '') {
      elements.push(<div key={i} style={{ height: 8 }} />)
    }
    // Regular paragraph
    else {
      elements.push(<p key={i} style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--color-text-secondary)', margin: '4px 0' }}>{parseInline(line)}</p>)
    }
    i++
  }

  return <div>{elements}</div>
}

function parseInline(text) {
  // Handle **bold**, *italic*, `inline code`
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>{part.slice(2, -2)}</strong>
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={i}>{part.slice(1, -1)}</em>
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={i} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, background: 'rgba(99,102,241,0.08)', color: 'var(--color-primary)', padding: '1px 6px', borderRadius: 4 }}>
          {part.slice(1, -1)}
        </code>
      )
    }
    return part
  })
}

export default MarkdownRenderer
