import { transaction } from 'mobx';
import { uniqueId } from 'lodash';
import { getTodos, filterStates, asyncStates } from '../lib/utils';

export const todoListStore = () => ({
  data: [],
  status: asyncStates.idle,
  errors: null,

  addNewTodo(text) {
    this.data.push({
      id: uniqueId(),
      text,
      isCompleted: false,
    });
  },

  changeTodoStatus(todoId) {
    const todo = this.data.find(el => el.id === todoId);
    todo.isCompleted = !todo.isCompleted;
  },

  async loadTodos(ms) {
    this.data = [];
    this.status = asyncStates.pending;
    this.errors = null;

    const items = await getTodos(ms);
    transaction(() => {
      this.data = items;
      this.status = asyncStates.resolved;
      this.errors = null;
    });
  },
});

export const filterStateStore = () => ({
  value: filterStates.all,
  changeFilter(filterButtonState) {
    this.value = filterButtonState;
  },
});
