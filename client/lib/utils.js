import { useState } from 'react';
import { uniqueId } from 'lodash';

const todosFromApi = [
  {
    id: uniqueId(),
    text: 'hello, i am first ToDo',
    isCompleted: false,
  },
  {
    id: uniqueId(),
    text: 'vasa eto boroda',
    isCompleted: false,
  },
  {
    id: uniqueId(),
    text: 'Molten boulder',
    isCompleted: true,
  },
];

export const useMergedState = initialState => {
  const [state, setState] = useState(initialState);
  const setMergedState = newState =>
    setState({
      ...state,
      ...newState,
    });
  return [state, setMergedState];
};

export const getTodos = ms =>
  new Promise(resolve => {
    setTimeout(() => resolve(todosFromApi), ms);
  });

export const makeEnum = args =>
  new Proxy(
    args.reduce((acc, key) => ({ ...acc, [key]: key }), {}),
    {
      get(target, key) {
        if (Object.prototype.hasOwnProperty.call(target, key)) {
          return target[key];
        }
        throw new Error(`There is no key [${key}] in enum`);
      },
    }
  );
