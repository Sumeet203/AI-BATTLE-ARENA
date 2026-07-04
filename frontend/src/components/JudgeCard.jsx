function JudgeCard({ judge }) {
  const {
    solution_1_score = 0,
    solution_2_score = 0,
    solution_1_reasoning = '',
    solution_2_reasoning = '',
    winner = 1,
    summary = '',
    final_verdict = '',
  } = judge

  const winnerLabel = winner === 1 ? 'Solution 1' : 'Solution 2'
  const maxScore = 10

  return (
    <article className="judge-card">
      <div className="judge-header">
        <div className="judge-title-row">
          <span className="material-symbols-outlined">gavel</span>
          <h3>Judge Recommendation</h3>
        </div>
        <div className="winner-badge">
          🏆 {winnerLabel} Wins!
        </div>
      </div>

      <div className="judge-body">
        {summary && <p className="judge-summary">{summary}</p>}

        <div className="reasoning-grid">
          <div className={`reasoning-box ${winner === 1 ? 'winner-box' : ''}`}>
            <div className="reasoning-box-title">
              <span className="material-symbols-outlined">
                {winner === 1 ? 'check_circle' : 'info'}
              </span>
              Solution 1
            </div>
            <p>{solution_1_reasoning}</p>
            <div className="score-row">
              <span className="score-label">Score</span>
              <div className="score-bar-bg">
                <div
                  className={`score-bar-fill ${winner === 1 ? 'green' : 'gray'}`}
                  style={{ width: `${(solution_1_score / maxScore) * 100}%` }}
                />
              </div>
              <span className="score-num">{solution_1_score}/{maxScore}</span>
            </div>
          </div>

          <div className={`reasoning-box ${winner === 2 ? 'winner-box' : ''}`}>
            <div className="reasoning-box-title">
              <span className="material-symbols-outlined">
                {winner === 2 ? 'check_circle' : 'info'}
              </span>
              Solution 2
            </div>
            <p>{solution_2_reasoning}</p>
            <div className="score-row">
              <span className="score-label">Score</span>
              <div className="score-bar-bg">
                <div
                  className={`score-bar-fill ${winner === 2 ? 'green' : 'gray'}`}
                  style={{ width: `${(solution_2_score / maxScore) * 100}%` }}
                />
              </div>
              <span className="score-num">{solution_2_score}/{maxScore}</span>
            </div>
          </div>
        </div>

        {final_verdict && (
          <div className="final-verdict">
            <strong>Verdict: </strong>
            {final_verdict}
          </div>
        )}
      </div>
    </article>
  )
}

export default JudgeCard
