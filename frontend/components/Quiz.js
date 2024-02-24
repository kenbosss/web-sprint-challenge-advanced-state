import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Quiz(props) {
  const {
    fetchQuiz,
    selectAnswer,
    selectedAnswer,
    postAnswer,
    quiz,
  } = props

  useEffect(() => {
    !quiz && fetchQuiz()
  }, [])

  return (
    <div id="wrapper">
      {
        quiz ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
              <div className={`answer${selectedAnswer === quiz.answers[0].answer_id ? ' selected' : ''}`} onClick={() => selectAnswer(quiz.answers[0].answer_id)}>
                {quiz.answers[0].text}
                <button>
                  {selectedAnswer === quiz.answers[0].answer_id ? 'SELECTED' : 'Select'}
                </button>
              </div>

              <div className={`answer${selectedAnswer === quiz.answers[1].answer_id ? ' selected' : ''}`} onClick={() => selectAnswer(quiz.answers[1].answer_id)}>
                {quiz.answers[1].text}
                <button>
                  {selectedAnswer === quiz.answers[1].answer_id ? 'SELECTED' : 'Select'}
                </button>
              </div>
            </div>

            <button id="submitAnswerBtn" disabled={!selectedAnswer} onClick={() => postAnswer({ quiz_id: quiz.quiz_id, answer_id: selectedAnswer })}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

export default connect(st => st, actionCreators)(Quiz)