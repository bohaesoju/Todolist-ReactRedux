import React, { Component } from 'react'
import TodoInput from '../components/TodoInput'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

//액션 생성 함수들을 한꺼번에 불러옵니다
import * as InputActions from '../modules/input'
import * as TodosActions from '../modules/todos'

class TodoInputContainer extends Component {

  id = 1
  getId = () => {
      return ++this.id;
  } 
  
  handleChange = (e) => {
      const { value } = e.target;
      const { InputActions } = this.props;
      InputActions.setInput(value);  
  }

  handleInsert = () => {
      const { InputActions, TodosActions, value } = this.props;
      const todo = {
          id: this.getId(),
          text: value,
          done: false
      };
      TodosActions.insert(todo);
      InputActions.setInput('');
  }

  render() {
      const { value } = this.props;
      const { handleChange, handleInsert } = this;
    return (
      <div>
          <TodoInput 
            onChange={handleChange}
            onInsert={handleInsert}
            value={value} />
      </div>
    )
  }
}

export default connect(
    (state) => ({
        value: state.input.get('value')
    }),
    (dispatch) => ({
        InputActions: bindActionCreators(InputActions, dispatch),
        TodosActions: bindActionCreators(TodosActions, dispatch),
    })
)(TodoInputContainer);