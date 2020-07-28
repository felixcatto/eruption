import React from 'react';
// import { observable, autorun, toJS } from 'mobx';
import { observer, useLocalStore } from 'mobx-react-lite';
import 'mobx-react-lite/batchingForReactDom';

// var todoStore = observable({
//   /* some observable state */
//   todos: [],

//   /* a derived value */
//   get completedCount() {
//     return this.todos.filter(todo => todo.isCompleted).length;
//   },
// });

// autorun(() => {
//   console.log('Completed %d of %d items', todoStore.completedCount, todoStore.todos.length);
// });

// window.todoStore = todoStore
// window.toJS = toJS

// todoStore.todos.push({ text: 'vasa', isCompleted: false })
// todoStore.todos.push({ text: 'fedya', isCompleted: true })

const HighLvl = observer(() => {
  const person = useLocalStore(() => ({ name: 'John' }));
  const personInfo = useLocalStore(() => ({ phone: '908 548 31 54', gold: '100500' }));
  console.log('mobx');
  return (
    <div>
      <h2>My name is {person.name}</h2>
      <div>gold: {personInfo.gold}</div>
      <div>phone: {personInfo.phone}</div>
      <button
        className="btn btn-primary"
        onClick={() => (person.name = person.name === 'John' ? 'Vasa' : 'John')}
      >
        Change name
      </button>
      <button
        className="btn btn-primary"
        onClick={() => (personInfo.gold = Math.round(Math.random() * 1000))}
      >
        Change gold
      </button>
      <div className="mt-30">
        <MiddleLvl personInfo={personInfo} />
      </div>
    </div>
  );
});

const MiddleLvl = props => <LowLvl {...props}/>;

const LowLvl = observer(({ personInfo }) => {
  console.log('LowLvl');
  return (
    <div>
      <div>LowLvl gold: {personInfo.gold}</div>
      <button
        className="btn btn-info"
        onClick={() => (personInfo.gold = Math.round(Math.random() * 1000))}
      >
        Change gold
      </button>
    </div>
  );
});

export default HighLvl;
