import { useState } from 'react';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showScore, setShowScore] = useState(false);

  const handleGenerate = async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);
    setQuizAnswers({});
    setShowScore(false);

    try {
      // Use relative path for Vercel deployment
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data from server');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSelect = (questionIndex, option) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionIndex]: option
    }));
  };

  const calculateScore = () => {
    if (!result) return 0;
    let correct = 0;
    result.quiz.forEach((q, index) => {
      if (quizAnswers[index] === q.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  return (
    <div className="container">
      <header className="app-header">
        <h1>AI Study Buddy 🧠</h1>
        <p>Transformă orice text într-o lecție simplă și un quiz rapid.</p>
      </header>

      <main>
        <div className="input-section">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Lipește textul lecției aici..."
            rows={8}
            className="text-input"
          />
          <button
            onClick={handleGenerate}
            disabled={loading || !inputText.trim()}
            className="generate-btn"
          >
            {loading ? 'Se generează...' : 'Generează Lecția'}
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {result && (
          <div className="results-container">
            <section className="summary-section">
              <h2>📖 Rezumat</h2>
              <p>{result.summary}</p>
            </section>

            <section className="explanation-section">
              <h2>💡 Explicații</h2>
              <div className="explanation-content">
                {result.explanation}
              </div>
            </section>

            <section className="quiz-section">
              <h2>✍️ Quiz</h2>
              <div className="quiz-grid">
                {result.quiz.map((q, qIndex) => (
                  <div key={qIndex} className="quiz-card">
                    <h3>Întrebarea {qIndex + 1}</h3>
                    <p>{q.question}</p>
                    <div className="options-list">
                      {q.options.map((option, oIndex) => (
                        <button
                          key={oIndex}
                          className={`option-btn ${quizAnswers[qIndex] === option ? 'selected' : ''} ${showScore && option === q.correctAnswer ? 'correct' : ''
                            } ${showScore && quizAnswers[qIndex] === option && option !== q.correctAnswer ? 'wrong' : ''
                            }`}
                          onClick={() => !showScore && handleOptionSelect(qIndex, option)}
                          disabled={showScore}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {!showScore ? (
                <button
                  className="check-score-btn"
                  onClick={() => setShowScore(true)}
                  disabled={Object.keys(quizAnswers).length < result.quiz.length}
                >
                  Verifică Răspunsurile
                </button>
              ) : (
                <div className="score-display">
                  Scor: {calculateScore()} / {result.quiz.length}
                </div>
              )}
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

