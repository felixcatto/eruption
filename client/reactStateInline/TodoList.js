import { SpinnerSvg } from '../components/svgIcons';
import React, { useEffect } from 'react';
import cn from 'classnames';
import { useMergedState, getTodos, makeEnum } from '../lib/utils.js';
import s from './TodoList.module.scss';
import { useFormik } from 'formik';

const filterStates = makeEnum(['all', 'completed', 'incomplete']);
const todoListStates = makeEnum(['idle', 'loading', 'success']);

const TodoList = props => {
  const [state, setState] = useMergedState({
    todoList: [],
    todoListState: todoListStates.idle,
    filterState: filterStates.all,
  });
  const { filterState, todoListState, todoList } = state;
  console.log(state);

  const formik = useFormik({
    initialValues: { newTodoText: '' },
    onSubmit: values => {
      console.log(values);
    },
  });

  useEffect(() => {
    setState({ todoListState: todoListStates.loading });
    getTodos(2000).then(todoList => setState({ todoList, todoListState: todoListStates.success }));
  }, []);

  let filterTodoFunc;
  if (filterState === filterStates.all) {
    filterTodoFunc = () => true;
  } else if (filterState === filterStates.incomplete) {
    filterTodoFunc = todo => !todo.isCompleted;
  } else if (filterState === filterStates.completed) {
    filterTodoFunc = todo => todo.isCompleted;
  }
  const filteredTodos = todoList.filter(filterTodoFunc);

  const filterButtonClass = filterButtonState =>
    cn(s.filterButton, {
      [s.filterButton_active]: filterButtonState === filterState,
    });
  const todoClass = todo =>
    cn('fa', 'mr-10', {
      'fa-check': todo.isCompleted,
      'fa-dove': !todo.isCompleted,
    });

  const changeFilter = filterButtonState => () => setState({ filterState: filterButtonState });
  const changeTodoStatus = id => () => {
    const todo = todoList.find(el => el.id === id);
    todo.isCompleted = !todo.isCompleted;
    setState({ todoList });
  };

  return (
    <div className="row">
      <div className="col-6">
        <form className="d-flex mb-20" onSubmit={formik.handleSubmit}>
          <input
            type="text"
            className="form-control form-control__inline mr-20"
            {...formik.getFieldProps('newTodoText')}
          />
          <button className="btn btn-primary" type="submit">
            Add ToDo
          </button>
        </form>
        <div className="mb-15">
          {todoListState === todoListStates.loading ? (
            <SpinnerSvg modifier="bold" />
          ) : (
            filteredTodos.map(todo => (
              <div key={todo.id} className={s.todoRow} onClick={changeTodoStatus(todo.id)}>
                <i className={todoClass(todo)}></i>
                <div>{todo.text}</div>
              </div>
            ))
          )}
        </div>
        <div className="d-flex">
          <div
            className={cn(filterButtonClass(filterStates.all), 'mr-15')}
            onClick={changeFilter(filterStates.all)}
          >
            all
          </div>
          <div
            className={cn(filterButtonClass(filterStates.completed), 'mr-15')}
            onClick={changeFilter(filterStates.completed)}
          >
            completed
          </div>
          <div
            className={filterButtonClass(filterStates.incomplete)}
            onClick={changeFilter(filterStates.incomplete)}
          >
            incomplete
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
