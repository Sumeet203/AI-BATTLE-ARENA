import MarkdownRenderer from './MarkdownRenderer'

function SolutionCard({ title, score, maxScore = 10, model, content, isWinner }) {
  const isHighScore = score >= 8

  return (
    <article className="solution-card" style={{
      borderColor: isWinner ? 'var(--color-success)' : undefined
    }}>
      <div className="card-header">
        <div className="card-title-row">
          <h3 className="card-title">{title}</h3>
          
          <span className={`score-badge ${isHighScore ? 'high' : ''}`}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>star</span>
            {score}/{maxScore}
          </span>
          
          <span className="model-tag">{model}</span>
        </div>
      </div>

      <div className="card-body">
        <MarkdownRenderer content={content} />
      </div>
    </article>
  )
}

export default SolutionCard
