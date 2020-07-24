import React, { useState } from 'react';
import { uniqueId } from 'lodash';
import { Link } from '@reach/router';

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

export const makeActions = actionStrings => {
  const actions = actionStrings.reduce((acc, actionString) => {
    const [, action] = actionString.split('/');
    return {
      ...acc,
      [action]: actionString,
    };
  }, {});

  return new Proxy(actions, {
    get(target, key) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        return target[key];
      }
      throw new Error(`There is no key [${key}] in enum`);
    },
  });
};

export const NavLink = ({ activeClassName, ...restProps }) => {
  const isActive = ({ isCurrent }) => (isCurrent ? { className: activeClassName } : {});
  return <Link getProps={isActive} {...restProps} />;
};

export const filterStates = makeEnum(['all', 'completed', 'incomplete']);
export const todoListStates = makeEnum(['idle', 'loading', 'success']);
