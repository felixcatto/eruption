import { connect } from 'react-redux';
import TodoList from './TodoList';
import { addNewTodo, changeTodoStatus, setTodosVisibility, loadTodos } from './reduxDump';

const mapStateToProps = state => state;

const mapDispatchToProps = { addNewTodo, changeTodoStatus, setTodosVisibility, loadTodos };

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
