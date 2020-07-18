import './index.scss';
import s from './index.module.scss';
import { SpinnerSvg } from './components/svgIcons';
import React, { useEffect } from 'react';
import { render } from 'react-dom';
import cn from 'classnames';
import { useMergedState, getTodos } from './utils.js';

const filterStates = {
  ALL: 'all',
  COMPLETED: 'completed',
  INCOMPLETE: 'incomplete',
};

const todoListStates = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
};

const App = props => {
  const [state, setState] = useMergedState({
    todoList: [],
    todoListState: todoListStates.IDLE,
    filterState: filterStates.ALL,
  });
  const { filterState, todoListState, todoList } = state;
  console.log(state);

  useEffect(() => {
    setState({ todoListState: todoListStates.LOADING });
    getTodos(2000).then(todoList => setState({ todoList, todoListState: todoListStates.SUCCESS }));
  }, []);

  let filterTodoFunc;
  if (filterState === filterStates.ALL) {
    filterTodoFunc = () => true;
  } else if (filterState === filterStates.INCOMPLETE) {
    filterTodoFunc = todo => !todo.isCompleted;
  } else if (filterState === filterStates.COMPLETED) {
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
    <div className="container app__container pt-20">
      <h1 className="mb-30">ToDo list App</h1>
      <div className="row">
        <div className="col-6">
          <div className="d-flex mb-20">
            <input type="text" className="form-control form-control__inline mr-20" />
            <button className="btn btn-primary">Add ToDo</button>
          </div>
          <div className="mb-15">
            {todoListState === todoListStates.LOADING ? (
              <SpinnerSvg className="spinner_usual" />
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
              className={cn(filterButtonClass(filterStates.ALL), 'mr-15')}
              onClick={changeFilter(filterStates.ALL)}
            >
              all
            </div>
            <div
              className={cn(filterButtonClass(filterStates.COMPLETED), 'mr-15')}
              onClick={changeFilter(filterStates.COMPLETED)}
            >
              completed
            </div>
            <div
              className={filterButtonClass(filterStates.INCOMPLETE)}
              onClick={changeFilter(filterStates.INCOMPLETE)}
            >
              incomplete
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

render(<App />, document.getElementById('root'));
