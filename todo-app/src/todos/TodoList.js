import React, {useEffect} from "react";
import NewTodoForm from "./NewTodoForm";
import {connect} from "react-redux";
import TodoListItem from "./TodoListItem";
import "./TodoList.css";
import { loadTodos, removeTodoRequest, completeTodoRequest } from "./thunks";

const TodoList = ({ todos = [], onRemovePressed, onMarkAsCompleted, isLoading, startLoadingTodos }) => {
  useEffect(() => {
    startLoadingTodos();
  }, []);
  const loadingMessage = <div>Loading Todos...</div>
  const content =  (
    <div className="list-wrapper">
      <NewTodoForm />
      {todos.map((todo) => (
        <TodoListItem todo={todo} onRemovePressed={onRemovePressed} 
          onMarkAsCompleted={onMarkAsCompleted}/>
      ))}
    </div>
  );
  return isLoading ? loadingMessage : content;  
};

const mapStateToProps = state => ({
  isLoading : state.isLoading,
  todos : state.todos
});

const mapDispatchToProps = dispatch => ({
  startLoadingTodos : () => dispatch(loadTodos()),
  onRemovePressed: id => dispatch(removeTodoRequest(id)),
  onMarkAsCompleted : id => dispatch(completeTodoRequest(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
