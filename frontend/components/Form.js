import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Form(props) {
  const { postQuiz, inputChange, form } = props

  const onChange = evt => {
    const { id, value } = evt.target
    inputChange({ inputId: id, value })
  }

  const onSubmit = evt => {
    evt.preventDefault()
    postQuiz(form)
  }

  const isDisabled = () => {
    return Object.values(form).some(value => !value.trim().length)
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} value={form.newQuestion} onChange={onChange} id="newQuestion" placeholder="Enter question" />
      <input maxLength={50} value={form.newTrueAnswer} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" />
      <input maxLength={50} value={form.newFalseAnswer} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" />
      <button disabled={isDisabled()} id="submitNewQuizBtn">Submit new quiz</button>
    </form>
  )
}

export default connect(st => st, actionCreators)(Form)