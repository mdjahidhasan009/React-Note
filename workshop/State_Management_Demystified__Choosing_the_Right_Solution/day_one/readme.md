# State Management Patterns in React

## Centralized State Management

Centralized state management involves using external libraries to manage the application's state in a single, 
centralized store. This approach is beneficial for large applications where multiple components need access to shared
state.

### Redux Example

```javascript
// actions.js
export const increment = () => ({ type: 'INCREMENT' });
export const decrement = () => ({ type: 'DECREMENT' });

// reducer.js
const initialState = { count: 0 };
const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
};

// store.js
import { createStore } from 'redux';
import counterReducer from './reducer';
const store = createStore(counterReducer);

// App.js
import React from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from './actions';
import store from './store';

const Counter = () => {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
};

const App = () => (
  <Provider store={store}>
    <Counter />
  </Provider>
);

export default App;
```

### Zustand Example
```js
// store.js
import create from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

// Counter.js
import React from 'react';
import useStore from './store';

const Counter = () => {
  const { count, increment, decrement } = useStore();
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

export default Counter;
```

### Recoil Example
```js
// atoms.js
import { atom } from 'recoil';

export const countState = atom({
  key: 'countState',
  default: 0,
});

// Counter.js
import React from 'react';
import { useRecoilState } from 'recoil';
import { countState } from './atoms';

const Counter = () => {
  const [count, setCount] = useRecoilState(countState);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
};

export default Counter;
```

## Colocation Pattern (Keeping State Close to Where It Is Used)
The colocation pattern involves managing state within the component that directly uses it, promoting encapsulation and 
reducing unnecessary prop drilling.
```js
import React, { useState } from 'react';

const Toggle = () => {
  const [isOn, setIsOn] = useState(false);
  const toggle = () => setIsOn((prev) => !prev);
  return (
    <button onClick={toggle}>
      {isOn ? 'Switch Off' : 'Switch On'}
    </button>
  );
};

export default Toggle;
```

## Colocation Pattern

## Colocation Pattern

Colocation, at its core, is about keeping related code (state, logic, components) close together. The goal is to improve 
maintainability, readability, and reduce the cognitive load when working on a specific part of the application.

**Feature as a Unit:** This feature likely comprises:
* A main component that orchestrates the feature's functionality.
* Multiple child components that contribute to the feature.
* State that's specific to the feature's operation.
* Logic (event handlers, data transformations) that controls the feature's behavior.

**Context API as a Grouping Mechanism:** By wrapping the feature in a Context API provider, you're effectively
encapsulating the feature's state and logic within a specific scope. The context acts as a container for the feature's
dependencies, ensuring that the child components within the feature have easy access to the state they need.

**Reusability Enhances Colocation:** The fact that you've made the feature reusable reinforces the colocation pattern. 
You can now use this encapsulated feature in different parts of your application without having to scatter the state and
logic across multiple locations. The feature, along with its context and components, becomes a self-contained, reusable
unit.

**Why This is a Powerful Approach:**

* **Improved Modularity:** The feature is a modular unit that can be easily moved, reused, and tested.
* **Reduced Complexity:** The complexity of managing the feature's state is contained within the context provider, 
  making the individual components simpler to understand and maintain.
* **Simplified Communication:** Child components within the feature can easily communicate and share state through the 
  context without prop drilling.
* **Testability:** The feature can be tested in isolation by mocking the context provider.

## State Reducers Pattern (Managing Complex State Transitions)

The state reducers pattern involves using a reducer function to manage complex state transitions, often with the 
`useReducer` hook in React.
```js
import React, { useReducer } from 'react';

const initialState = { count: 0 };

const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
};

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>Decrement</button>
    </div>
  );
};

export default Counter;
```

This approach is beneficial for managing state with complex transitions or when the next state depends on the previous
state.

## Event-Driven State Management (Using Pub-Sub, RxJS, or Event Emitters)
Event-driven state management in React involves components communicating through events, allowing for a decoupled 
architecture where components can publish and subscribe to events without direct dependencies. This pattern enhances 
scalability and maintainability, especially in complex applications.

In the Pub-Sub pattern, components can publish events to a centralized event bus, and other components can subscribe to
these events to react accordingly. This decouples the components, promoting a more modular architecture.

```js
// eventBus.js
import { EventEmitter } from 'events';
const eventBus = new EventEmitter();
export default eventBus;

// PublisherComponent.js
import React from 'react';
import eventBus from './eventBus';

const PublisherComponent = () => {
  const handleClick = () => {
    eventBus.emit('customEvent', { data: 'Hello from Publisher' });
  };
  return <button onClick={handleClick}>Publish Event</button>;
};

export default PublisherComponent;

// SubscriberComponent.js
import React, { useEffect } from 'react';
import eventBus from './eventBus';

const SubscriberComponent = () => {
  useEffect(() => {
    const handleEvent = (payload) => {
      console.log(payload.data);
    };
    eventBus.on('customEvent', handleEvent);
    return () => {
      eventBus.off('customEvent', handleEvent);
    };
  }, []);
  return <div>Subscriber Component</div>;
};

export default SubscriberComponent;
```

## React Query / SWR Pattern (Efficient data fetching and caching)
Efficient data fetching and caching are crucial for building responsive and performant React applications. Two popular 
libraries that facilitate these tasks are React Query and SWR.
### React Query
React Query is a powerful library that simplifies data fetching, caching, synchronization, and more in React 
applications. It provides hooks to manage server-state seamlessly.

```js
import React from 'react';
import { useQuery } from 'react-query';

const fetchUser = async () => {
  const response = await fetch('/api/user');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const UserProfile = () => {
  const { data, error, isLoading } = useQuery('user', fetchUser);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.email}</p>
    </div>
  );
};

export default UserProfile;
```

### SWR
SWR (stale-while-revalidate) is a React hook library for data fetching that emphasizes simplicity and efficiency. It
returns cached data first (stale), then fetches updated data (revalidate), ensuring the UI remains responsive
```js
import React from 'react';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

const UserProfile = () => {
  const { data, error } = useSWR('/api/user', fetcher);
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.email}</p>
    </div>
  );
};

export default UserProfile;
```

## Separate The Network and State

Separating client-side (local) state from server-side (remote) state in React applications is a widely recommended 
practice, especially for large and growing codebases. This approach enhances maintainability, scalability, and 
performance.

**Benefits of Separating Client and Server State:**

* **Clear Separation of Concerns:** Managing client and server state separately allows components to handle local 
  interactions independently from data fetching logic. This separation leads to cleaner, more modular code.
* **Improved Performance:** By isolating server state management, you can implement efficient caching and background 
  data synchronization strategies, reducing unnecessary network requests and enhancing application responsiveness.
* **Enhanced Maintainability:** Decoupling these states simplifies debugging and testing, as each aspect of state 
  management can be addressed in isolation. This modularity makes the codebase easier to understand and maintain.
* **Scalability:** As applications grow, having a clear distinction between client and server state management 
  facilitates scaling. It allows teams to work on different parts of the application without causing conflicts.

**Implementing Separate State Management:**

* **Client State Management:** For managing local state, libraries like **Zustand** offer a lightweight and flexible 
  solution. Zustand allows you to create global state stores with minimal boilerplate, making it suitable for handling 
  UI-related state that doesn't require synchronization with a server.
* **Server State Management:** For server-side state, tools like **React Query** provide powerful features for data 
  fetching, caching, synchronization, and background updates. React Query abstracts away the complexities of managing 
  server state, allowing components to focus on rendering logic.
