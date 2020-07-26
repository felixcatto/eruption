import { connect } from 'react-redux';
import TodoList from './TodoList';
import { addNewTodo, changeTodoStatus, changeFilter, loadTodos } from './reduxDump';

const mapStateToProps = ({ todoList, filterState }) => ({
  todoList,
  filterState,
});

const mapDispatchToProps = { addNewTodo, changeTodoStatus, changeFilter, loadTodos };

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
