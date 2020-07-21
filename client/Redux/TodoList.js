import React, { useEffect } from 'react';
import cn from 'classnames';
import { Formik, Field, Form } from 'formik';
import { filterStates, todoListStates } from '../lib/utils';
import s from '../reactStateInline/TodoList.module.scss';
import { SpinnerSvg } from '../components/svgIcons';

const TodoList = props => {
  const { filterState, todoListState, todoList } = props;
  console.log(props);

  useEffect(() => {
    if (todoListState === todoListStates.idle) {
      props.loadTodos(2000);
    }
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
  const todoItemsCount = filteredTodos.length;

  const filterButtonClass = filterButtonState =>
    cn(s.filterButton, {
      [s.filterButton_active]: filterButtonState === filterState,
    });
  const todoClass = todo =>
    cn('fa', 'mr-10', {
      'fa-check': todo.isCompleted,
      'fa-dove': !todo.isCompleted,
    });

  const changeFilter = filterButtonState => () => props.setTodosVisibility(filterButtonState);
  const changeTodoStatus = id => () => props.changeTodoStatus(id);
  const addNewTodo = (values, fm) => {
    fm.resetForm();
    props.addNewTodo(values.newTodoText);
  };

  return (
    <div className="row">
      <div className="col-6">
        <Formik initialValues={{ newTodoText: '' }} onSubmit={addNewTodo}>
          <Form className="d-flex mb-20">
            <Field
              type="text"
              className="form-control form-control__inline mr-20"
              name="newTodoText"
            />
            <button className="btn btn-primary" type="submit">
              Add ToDo
            </button>
          </Form>
        </Formik>
        <div className="mb-15">
          {todoListState === todoListStates.loading ? (
            <SpinnerSvg modifier="bold" />
          ) : (
            filteredTodos.map(todo => (
              <div key={todo.id}>
                <div className={s.todoRow} onClick={changeTodoStatus(todo.id)}>
                  <i className={todoClass(todo)}></i>
                  <div>{todo.text}</div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="mb-5">Count: {todoItemsCount}</div>
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
