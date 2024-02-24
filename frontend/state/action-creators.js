import axios from 'axios'
import * as types from './action-types'

export function moveClockwise() {
  return { type: types.MOVE_CLOCKWISE }
}

export function moveCounterClockwise() {
  return { type: types.MOVE_COUNTERCLOCKWISE }
}

export function selectAnswer(answer_id) {
  return { type: types.SET_SELECTED_ANSWER, payload: answer_id }
}

export function setMessage(message) {
  return { type: types.SET_INFO_MESSAGE, payload: message }
}

export function setQuiz(quiz) {
  return { type: types.SET_QUIZ_INTO_STATE, payload: quiz }
}

export function inputChange({ inputId, value }) {
  return { type: types.INPUT_CHANGE, payload: { inputId, value } }
}

export function resetForm() {
  return { type: types.RESET_FORM }
}

export function fetchQuiz() {
  return function (dispatch) {
    dispatch(setQuiz(null))
    axios.get('http://localhost:9000/api/quiz/next')
      .then(res => {
        dispatch(setQuiz(res.data))
      })
      .catch(err => {
        const errToDisplay = err.response ? err.response.data.message : err.message
        dispatch(setMessage(errToDisplay))
      })
  }
}

export function postAnswer({ quiz_id, answer_id }) {
  return function (dispatch) {
    axios.post('http://localhost:9000/api/quiz/answer', { quiz_id, answer_id })
      .then(res => {
        dispatch(selectAnswer(null))
        dispatch(setMessage(res.data.message))
      })
      .catch(err => {
        const errToDisplay = err.response ? err.response.data.message : err.message
        dispatch(setMessage(errToDisplay))
      })
      .finally(() => {
        dispatch(fetchQuiz())
      })
  }
}

export function postQuiz({
  newQuestion,
  newTrueAnswer,
  newFalseAnswer,
}) {
  return function (dispatch) {
    axios.post('http://localhost:9000/api/quiz/new', {
      question_text: newQuestion,
      true_answer_text: newTrueAnswer,
      false_answer_text: newFalseAnswer,
    })
      .then(res => {
        dispatch(setMessage(`Congrats: "${res.data.question}" is a great question!`))
        dispatch(resetForm())
      })
      .catch(err => {
        const errToDisplay = err.response ? err.response.data.message : err.message
        dispatch(setMessage(errToDisplay))
      })
  }
}