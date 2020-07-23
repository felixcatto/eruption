import { connect } from 'react-redux';
import TodoList from './TodoList';
import { addNewTodo, changeTodoStatus, setTodosVisibility, loadTodos } from './reduxDump';

const mapStateToProps = ({ todoList, todoListState, filterState }) => ({
  todoList,
  todoListState,
  filterState,
});

const mapDispatchToProps = { addNewTodo, changeTodoStatus, setTodosVisibility, loadTodos };

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
