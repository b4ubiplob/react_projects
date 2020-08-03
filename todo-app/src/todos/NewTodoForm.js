import React, { useState } from "react";
import { connect } from 'react-redux';
import "./NewTodoForm.css";
import { addTodoRequest } from "./thunks";

const NewTodoForm = ({todos, onCreatePressed}) => {
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="new-todo-form">
      <input
        className="new-todo-input"
        type="text"
        value={inputValue}
        placeholder="Enter a new Todo"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button 
        onClick={() => {
          const isDuplicateText = todos.some(todo => todo.text === inputValue);
          if (!isDuplicateText) {
            onCreatePressed(inputValue);
            setInputValue("");
          }
        }}
        className="new-todo-button">Create Todo</button>
    </div>
  );
};

const mapStateToProps = state => ({
  todos : state.todos,
});

const mapDispatchtoProps = dispatch => ({
  onCreatePressed : text => dispatch(addTodoRequest(text))
});

export default connect(mapStateToProps, mapDispatchtoProps)(NewTodoForm);
