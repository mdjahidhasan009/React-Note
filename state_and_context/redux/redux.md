# Flux
Flux is an application design paradigm used as a replacement for the more traditional MVC pattern. It is not a framework
or a library but a new kind of architecture that complements React and the concept of Unidirectional Data Flow. Facebook
uses this pattern internally when working with React.

The workflow between dispatcher, stores and views components with distinct inputs and outputs as follows:

<img src="images/flux.png" alt="flux" />

Source: [reactjs-interview-questions - github](https://github.com/sudheerj/reactjs-interview-questions)




# Redux
Redux is a predictable state container for JavaScript apps based on the Flux design pattern. Redux can be used together 
with React, or with any other view library. It is tiny (about 2kB) and has no dependencies.

## Core principal of Redux
* **Single source of truth**: The state of your whole application is stored in an object tree within a single store. The
  single state tree makes it easier to keep track of changes over time and debug or inspect the application.
* **State is read-only**: The only way to change the state is to emit an action, an object describing what happened. 
  This ensures that neither the views nor the network callbacks will ever write directly to the state.
* **Changes are made with pure functions**: To specify how the state tree is transformed by actions, you write reducers.
  Reducers are just pure functions that take the previous state and an action as parameters, and return the next state. 

## Compromises of using Redux over Flux

Instead of saying downsides, we can say that there are a few compromises of using Redux over Flux. These are as follows:
* **You will need to learn to avoid mutations:** Flux is un-opinionated about mutating data, but Redux doesn't like
  mutations, and many packages complementary to Redux assume you never mutate the state. You can enforce this with 
  dev-only packages like `redux-immutable-state-invariant`, Immutable.js, or instructing your team to write non-mutating
  code.
* **You're going to have to carefully pick your packages:** While Flux explicitly doesn't try to solve problems such as
  undo/redo, persistence, or forms, Redux has extension points such as middleware and store enhancers, and it has 
  spawned a rich ecosystem.  This rich ecosystem can be a double-edged sword.  While it offers many solutions, it
  requires careful consideration and selection of the right packages for your specific needs.  This can sometimes lead
  to analysis paralysis or the inclusion of unnecessary dependencies.
* **There is no nice Flow integration yet:** Flux currently lets you do very impressive static type checks, which Redux 
  doesn't support yet.  While TypeScript support is generally considered very good in the Redux ecosystem, Flow
  integration is lacking.  This can be a significant drawback for teams relying heavily on Flow for static typing.

### Further Considerations:
* **Boilerplate:** Redux is often criticized for requiring more boilerplate code compared to Flux, especially for simple
  use cases. While this can be mitigated to some extent with tools like Redux Toolkit, it's still a factor to consider.
* **Learning Curve:** Redux, with its concepts of reducers, actions, and the single store, can have a steeper learning 
  curve compared to Flux, especially for developers new to functional programming paradigms.
* **Debugging Complexity:** While Redux DevTools are excellent, debugging complex state changes in a large Redux
  application can sometimes be challenging.  Tracing the flow of actions and state updates can require careful 
  examination of the action history.
* **Performance:** While generally performant, Redux can introduce performance bottlenecks if not used carefully.  For 
  example, excessive re-renders due to unnecessary component updates can impact performance.  Proper use of memoization
  techniques and `shouldComponentUpdate` (or its equivalents) is crucial for optimizing Redux applications.


## Adding Multiple Middlewares to Redux

To add multiple middlewares to your Redux store, use the `applyMiddleware()` function.  Pass the desired middlewares as 
arguments to `applyMiddleware()`.

**Example:**

```javascript
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from 'redux-thunk'; // Example middleware
import logger from 'redux-logger'; // Another example middleware

const createStoreWithMiddleware = applyMiddleware(
        ReduxThunk,
        logger // Add other middlewares here
)(createStore);

// Now use createStoreWithMiddleware instead of createStore when creating your store.
const store = createStoreWithMiddleware(rootReducer); // Assuming rootReducer is defined.
```

## Setting the Initial State in Redux
Set the initial state of your Redux store by passing it as the second argument to createStore().

Example:

```js
import { createStore, combineReducers } from 'redux';

const rootReducer = combineReducers({
  todos: todosReducer, // Your reducers
  visibilityFilter: visibilityFilterReducer,
  // ... other reducers
});

const initialState = {
  todos: [{ id: 123, name: "example", completed: false }],
  visibilityFilter: 'SHOW_ALL' // Example initial state
};

const store = createStore(rootReducer, initialState);
```

**Explanation:**

* The `initialState` object defines the initial values for the different parts of your Redux state tree.  The keys in 
  this object should match the keys used in your `combineReducers()` call.
* `createStore(rootReducer, initialState)`: This creates the Redux store, using `rootReducer` to handle state updates 
  and initializing the state with `initialState`.


## Accessing the Redux Store Outside a Component

The standard and recommended way to interact with the Redux store from outside a React component is by exporting the
store instance from the module where it's created and then importing it wherever needed.  This avoids polluting the 
global scope and keeps your code organized.

Here's a breakdown of how to do this, along with explanations and best practices:

#### 1. Creating and Exporting the Store:

In the file where you create your Redux store (often `store.js` or `configureStore.js`), you'll use `createStore` (or 
more commonly, `configureStore` from Redux Toolkit).  After creating the store, you export it as the default export.

```jsx
// store.js (or configureStore.js)
import { configureStore } from '@reduxjs/toolkit'; // Or import createStore from 'redux' if not using Redux Toolkit
import rootReducer from './reducers'; // Your combined reducers

const store = configureStore({  // or const store = createStore(rootReducer);
  reducer: rootReducer,
  // Other middleware or enhancers can be added here
});

export default store;
```

#### 2. Importing and Using the Store:

In any module where you need to access the store (outside of a React component), you simply import the store.  You can 
then use it to dispatch actions or get the current state.

```jsx
// some-other-module.js
import store from './store';

// Get the current state
const currentState = store.getState();
console.log(currentState);

// Dispatch an action
import { someAction } from './actions';
store.dispatch(someAction());

// Subscribe to changes (less common outside components)
const unsubscribe = store.subscribe(() => {
  const newState = store.getState();
  console.log('State changed:', newState);
});

// Remember to unsubscribe when you're done to prevent memory leaks
// unsubscribe();
```

#### 3. Best Practices and Considerations:

* **Avoid Direct Mutations:** Even when accessing the store outside a component, *never* directly mutate the state. 
  Always dispatch actions to update the state. This is crucial for maintaining the unidirectional data flow and ensuring 
  predictable behavior.
* **Use Selectors (Recommended):** For accessing specific parts of the state, especially within components but also
  beneficial outside, it's highly recommended to use selector functions. Selectors provide a way to abstract the state
  structure and make your code more maintainable.
* **Minimize Direct Subscriptions:** Directly subscribing to the store outside of React components should be done
  sparingly. It's generally better to manage subscriptions within your React components using `useSelector` and 
  `useDispatch` hooks (from `react-redux`) or the `connect` higher-order component. This integrates with React's 
  lifecycle and avoids potential issues with updates and memory leaks. If you *do* subscribe outside a component, make 
  absolutely sure to unsubscribe when no longer needed.
* **Dependency Injection (Advanced):** For more complex applications, you might consider dependency injection. This 
  involves passing the store instance as a dependency to the modules that need it, making your code more testable and
  decoupled.
* **Testing:** When testing modules that interact with the store, you can easily mock the store or create a test store 
  specifically for your tests.

#### 4. Example: Interacting with the Store in a Utility Function:
```jsx
// utils.js
import store from './store';

export function formatData(itemId) {
  const state = store.getState();
  const item = state.items[itemId]; // Using a selector is even better here
  if (item) {
    return `Formatted: ${item.name}`;
  }
  return 'Item not found';
}

// In a component or other module:
import { formatData } from './utils';

const formatted = formatData(123);
console.log(formatted);
```



## Redux State Update Function (Reducer) 
Redux state update functions are called "reducers" because they conceptually resemble the `reduce` function in 
functional programming. Just like `reduce` combines elements of an array into a single value, a Redux reducer combines
previous state and an action into a new state. It "reduces" the state over time based on the actions that occur. Each 
reducer call takes the current state and an action, "reduces" them together according to the action's logic, and returns 
the accumulated (updated) state.

**Example of a Redux Reducer:**
```javascript
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};
```

## Which State Belongs in Redux vs. React Component?

Deciding whether to manage state with Redux or within a React component depends largely on the nature of the state and
how it's used in your application.  Generally, consider these guidelines:

*   **Redux:**  Use Redux for state that is:
  * **Shared across many components:** If multiple, unrelated components need access to the same data, Redux is a good 
    choice.  This avoids prop drilling and keeps data consistent.
  * **Persisted across page refreshes:** If the data needs to be maintained even if the user refreshes the page, Redux 
    (often combined with `redux-persist`) is appropriate.
  * **Modified by many components:**  If many different components can update the state, Redux provides a centralized 
    and predictable way to manage those updates.
  * **Complex or frequently updated:**  For complex state logic or data that changes frequently, Redux's mechanisms for
    managing updates and optimizing performance are beneficial.
  * **Examples:** User authentication status, global settings, data fetched from an API, shared UI state (e.g., a 
    modal's open/close status if shared).
* **React Component:** Use React component state (using `useState`, `useReducer`) for state that is:
  * **Local to a component:** If the data is only used within a single component and doesn't need to be shared, 
    component state is sufficient.
  * **UI-related and transient:** If the data is only relevant to the component's UI and doesn't need to be persisted or
    shared (e.g., form input values before submission, a toggle's visual state, local UI interactions), component state 
    is usually the best option.
  * **Simple and infrequently updated:**  For very simple state that doesn't change often, component state can be easier 
    to manage than Redux.
  * **Examples:** Form input values (before submission), local UI state (e.g., a dropdown's open/close status), 
    temporary data used for display.

**In short:**  Think of Redux as a global state management solution for data shared across your application. Use 
component state for data that is local to a component and related to its UI.


## Accessing the Redux Store: The Preferred Way

The best way to access the Redux store within a React component is by using the `connect()` function (or the more modern 
hooks, `useSelector` and `useDispatch`, which are built upon `connect` internally). `connect()` creates a new component 
that wraps around your existing one, a pattern called Higher-Order Components. This allows you to map parts of the Redux 
state and action creators to your component's props, which are then passed in automatically as the store updates.

**Example using `connect()`:**

```javascript
import { connect } from "react-redux";
import { setVisibilityFilter } from "../actions";
import Link from "../components/Link";

const mapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(setVisibilityFilter(ownProps.filter)),
});

const FilterLink = connect(mapStateToProps, mapDispatchToProps)(Link);

export default FilterLink;
```
The Redux developers strongly recommend using `connect()` (or the hooks) over directly accessing the store via the 
context API (`this.context.store`).  This is because `connect()` has built-in performance optimizations and is less
prone to bugs.

**Example of Direct Store Access (Discouraged):**
```jsx
function MyComponent {
  someMethod() {
    doSomethingWith(this.context.store); // Avoid this approach
  }
}
```


## Redux Selectors: Deriving and Memoizing State

Redux selectors are functions that take the Redux state as an argument and return specific data to be used by components.  They provide a way to encapsulate the logic for accessing and transforming state, offering several key benefits.

**Basic Example:**

```javascript
const getUserData = (state) => state.user.data;
```
This simple selector retrieves user data from the state.

### Benefits of Using Selectors

Selectors offer two primary advantages:
**Deriving Data:** Selectors can compute derived data, allowing Redux to store only the minimal necessary state. For 
example, you might store a list of items and a filter, and then use a selector to derive the *visible* items:
```javascript
const getVisibleTodos = (state) => {
  const { todos, visibilityFilter } = state;
  switch (visibilityFilter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);
    default:
      return todos;
  }
};
```
Storing only the `todos` and `visibilityFilter` and deriving the visible todos with a selector keeps the state minimal
and avoids redundant data.

**Memoization (Performance Optimization):** Selectors are not recomputed unless one of their arguments (usually the
state) changes. This is achieved through memoization. If the input state hasn't changed, the selector will return the
cached result, avoiding unnecessary recalculations. This can significantly improve performance, especially when dealing 
with complex calculations or large datasets. Libraries like `reselect` make it easy to create memoized selectors.

**Example with `reselect`:**
```js
import { createSelector } from 'reselect';

const getTodos = (state) => state.todos;
const getVisibilityFilter = (state) => state.visibilityFilter;

const getVisibleTodos = createSelector(
  [getTodos, getVisibilityFilter], // Input selectors (dependencies)
  (todos, visibilityFilter) => {      // Output selector (computes derived data)
    switch (visibilityFilter) {
      case 'SHOW_ALL':
        return todos;
      case 'SHOW_COMPLETED':
        return todos.filter(t => t.completed);
      case 'SHOW_ACTIVE':
        return todos.filter(t => !t.completed);
      default:
        return todos;
    }
  }
);
```
In this `reselect` example, `getVisibleTodos` is a memoized selector. It will only recompute the visible todos if either
the `todos` or `visibilityFilter` parts of the state have changed.

**Further Benefits:**
* **Abstraction:** Selectors abstract the way state is accessed, making your components less dependent on the specific 
  structure of the state. If the state structure changes, you only need to update the selectors, not every component
  that uses the data.
* **Testability:** Selectors are easily testable. You can write unit tests to ensure they correctly derive data from the
  state.
* **Reusability:** Selectors can be reused across multiple components.

By using selectors, you can keep your components lean, improve performance through memoization, and make your Redux code
more maintainable and testable.


## Actions in Redux

Actions are plain JavaScript objects that carry information (or payloads) from your application to the Redux store. They
are the *only* way to update the store's state.  Every action *must* have a `type` property, which is a string constant
indicating the type of action being performed.

**Example: Adding a Todo Item**

```javascript
{
  type: ADD_TODO, // String constant defining action type
          text: 'Add todo item' // Payload with todo text
}
```
The `type` property is crucial; it's what reducers use to determine how to update the state.  The rest of the action 
object (the payload) can contain any data needed to perform the update.


## The Purpose of Constants in Redux

Constants in Redux offer several advantages:
* **Improved Code Maintainability:** Constants make it easy to find all usages of a specific action or functionality 
  throughout your project.  IDEs can leverage these constants to quickly locate where an action type is used.
* **Preventing Typos and Bugs:** Using constants helps prevent bugs caused by typos in action type strings. If you 
  misspell a constant, you'll immediately get a `ReferenceError`, making it easy to catch the error. Without constants, 
  a typo in an action type string could lead to unexpected behavior that is much harder to debug.
* **Centralized Management:**  Constants are typically stored in a single file (e.g., `constants.js` or 
  `actionTypes.js`), providing a centralized place to manage all your action types.  This keeps your code organized and 
  makes it easier to update action names if needed.

**Usage in Redux:**
Constants are used in two main places within a Redux application:
*   **Action Creation (e.g., `actions.js`):**
    ```javascript
    import { ADD_TODO } from "./actionTypes";

    export function addTodo(text) {
      return { type: ADD_TODO, text };
    }
    ```
*   **Reducers (e.g., `reducer.js`):**
    ```javascript
    import { ADD_TODO } from "./actionTypes";

    export default (state = [], action) => {
      switch (action.type) {
        case ADD_TODO:
          return [
            ...state,
            {
              text: action.text,
              completed: false,
            },
          ];
        default:
          return state;
      }
    };
    ```
By using constants in both action creators and reducers, you ensure consistency and prevent errors caused by
inconsistent action type strings.




## Dispatching Actions within Reducers: An Anti-Pattern

Dispatching an action within a reducer is generally considered an anti-pattern. Reducers should be pure functions,
meaning they are without side effects and simply process the incoming action payload to return a new state object. 
Dispatching actions within a reducer can lead to unintended consequences, such as:

* **Chained Actions and Infinite Loops:** Dispatching an action inside a reducer can trigger another action, potentially
  leading to a chain of actions or even an infinite loop if not carefully managed. This makes debugging and 
  understanding the state changes much more difficult.
    * **Example (Anti-Pattern):**
      ```javascript
      // reducers.js (AVOID THIS)
      const myReducer = (state, action) => {
        switch (action.type) {
          case 'ACTION_A':
            // ... update state ...
            return { ...state, someValue: 'new' };
          case 'ACTION_B':
            // ... update state ...
            return { ...state, anotherValue: 'updated' };
          case 'ACTION_C':
            // ... update state ...
            return { ...state, yetAnotherValue: 'changed' };
          case 'ACTION_A_TRIGGER': // Dispatching within reducer!
            dispatch({ type: 'ACTION_B' }); // Triggers ACTION_B
            return state;
          default:
            return state;
        }
      };
      ```
      In this example, `ACTION_A_TRIGGER` dispatches `ACTION_B`.  If `ACTION_B` were to then dispatch `ACTION_A` 
      (directly or indirectly), you'd have an infinite loop.

* **Unpredictable State Updates:** The order in which actions are dispatched and processed becomes less predictable when
  reducers dispatch actions. This can make it harder to reason about the state of your application and introduce subtle
  bugs.
    * **Example (Illustrative):** Imagine `ACTION_A` and `ACTION_B` both modify `state.count`. If `ACTION_A` dispatches 
      `ACTION_B` within the reducer, the final value of `state.count` depends on the *internal* execution order within 
      the reducer, not the order in which the actions were originally dispatched. This can lead to unexpected behavior.
* **Difficult Testing:** Testing reducers becomes more complex when they dispatch actions, as you need to mock or 
  control the subsequent actions that are dispatched.
    * **Example:**  Testing `myReducer` (from the Chained Actions example) would require you to not only provide the 
      initial action (`ACTION_A_TRIGGER`) but also mock the store or dispatcher to capture or stub the subsequent
      `ACTION_B` dispatch. This adds significant complexity to the test.
* **Violation of Unidirectional Data Flow:** Redux promotes a unidirectional data flow. Dispatching actions in a reducer
  breaks this flow, making it harder to track how state changes occur.  Data should flow 
  `Action -> Middleware -> Reducer -> Store -> View`.  Dispatching in the reducer creates a "backflow" that's hard to 
  reason about.

Instead of dispatching actions within a reducer, consider handling such logic in other parts of your application, such
as:

* **Middleware:** Middleware is a more appropriate place to handle side effects, including dispatching other actions. 
  Middleware allows you to intercept actions before they reach the reducer and perform asynchronous operations or 
  dispatch additional actions based on the original action.
    * **Example (Using Middleware - Correct Approach):**
      ```javascript
      // middleware.js
      const myMiddleware = store => next => action => {
        if (action.type === 'ACTION_A_TRIGGER') {
          // Do something (e.g., async operation)
          setTimeout(() => {
            store.dispatch({ type: 'ACTION_B', payload: 'data from async operation' });
          }, 1000);
        }
        return next(action); // Important: pass the action to the next middleware/reducer
      };
  
      // store.js
      const store = configureStore({
          reducer: myReducer,
          middleware: [myMiddleware]
      })
      ```

* **Event Handlers/Components:** If the need to dispatch an action is based on some event or user interaction, it's best
  to handle that logic within your React components or event handlers and dispatch the appropriate action from there.
    * **Example:**
      ```javascript
      // component.js
      const MyComponent = () => {
        const dispatch = useDispatch();
  
        const handleClick = () => {
          dispatch({ type: 'ACTION_A_TRIGGER' });
        };
  
        return <button onClick={handleClick}>Trigger Action</button>;
      };
      ```

* **Action Creators (with Thunks or Sagas):** For more complex asynchronous flows, you can use action creators combined 
  with middleware like Redux Thunk or Redux Saga. These tools allow you to dispatch actions conditionally or after 
  completing asynchronous operations. (See the previous full example with Thunk and custom middleware.)

In summary, keep your reducers pure and focused on updating the state based on the current action. Handle side effects 
and dispatching of other actions in middleware, components, or action creators.



## mapStateToProps() vs. mapDispatchToProps()

`mapStateToProps()` and `mapDispatchToProps()` are two essential functions used with the `connect()` higher-order component from `react-redux` to connect your React components to the Redux store. They serve distinct purposes:

**`mapStateToProps(state, ownProps)`:**

*   This function is responsible for mapping the Redux store's state to the props of your React component.  It receives the current Redux state as its first argument.  Optionally, it receives `ownProps` (the props passed to the connected component) as the second argument, which can be useful for filtering or selecting data based on the component's props.
*   It should return a plain object.  The keys of this object will become props in your connected component, and the values will be the corresponding values from the state.
*   `mapStateToProps()` is called whenever the Redux store's state changes.  This ensures that your component receives updated data whenever the relevant parts of the state are modified.

```javascript
const mapStateToProps = (state, ownProps) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter, ownProps.filter), // Example using ownProps
  };
};
```

#### mapDispatchToProps(dispatch, ownProps)
* This function is responsible for mapping action creators to props in your React component. It receives the `dispatch` 
  function (used to dispatch actions) as its first argument. Like `mapStateToProps`, it can also receive `ownProps` as 
  the second argument.
* It should return a plain object. The keys of this object will become props in your connected component, and the values
  will be functions that dispatch actions.
* These functions, when called, will dispatch the corresponding action to the Redux store, potentially causing a state 
  update.

```jsx
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id));
    },
    filterTodos: (filter) => dispatch(setVisibilityFilter(filter)) // Example using ownProps
  };
};
```

#### Object Shorthand for `mapDispatchToProps` (Recommended):

It is recommended to always use the “object shorthand” form for `mapDispatchToProps` when you are simply passing action
creators directly:
```jsx
const mapDispatchToProps = {
  onTodoClick, // Shorthand for: onTodoClick: (id) => dispatch(toggleTodo(id))
  setVisibilityFilter,
};
```
Redux internally wraps this object shorthand in a function similar to: `(...args) => dispatch(actionCreator(...args))`.
This wrapper function is then passed as a prop to your component. This shorthand makes your code cleaner and easier to 
read.


**Different ways to write mapDispatchToProps():**

There are a few ways of binding action creators to dispatch() in mapDispatchToProps(). Below are the possible options:
```jsx
const mapDispatchToProps = (dispatch) => ({
  action: () => dispatch(action()),
});

const mapDispatchToProps = (dispatch) => ({
  action: bindActionCreators(action, dispatch),
});

const mapDispatchToProps = { action }; // Shorthand for the first option
```

**Use of the ownProps parameter:**

If the ownProps parameter is specified, React Redux will pass the props that were passed to the connected component into
your connect functions. So, if you use a connected component:

```jsx
import ConnectedComponent from "./containers/ConnectedComponent";
<ConnectedComponent user={"john"} />;
```
The `ownProps` inside your `mapStateToProps()` and `mapDispatchToProps()` functions will be an object:
```js
{
  user: "john"
}
```
You can use this object to decide what to return from those functions.

**Key Differences Summarized:**

| Feature          | `mapStateToProps()`                               | `mapDispatchToProps()`                                  |
|------------------|---------------------------------------------------|---------------------------------------------------------|
| Purpose          | Maps state to props                               | Maps dispatch to props                                  |
| Arguments        | `state`, `ownProps`                               | `dispatch`, `ownProps`                                  |
| Return Value     | Object whose keys become props, values from state | Object whose keys become props, values dispatch actions |
| When Called      | When state changes                                | Initially and potentially when props change             |
| Use Cases        | Accessing data from the store                     | Dispatching actions to update the store                 |
| Shorthand        | Not applicable                                    | Recommended when passing action creators directly       |





## Structuring Redux Top-Level Directories
A common and effective way to structure Redux applications involves organizing files into top-level directories.A 
typical structure looks like this:
* **`components`:** Contains presentational (or "dumb") components. These components are UI-focused and unaware of 
  Redux. They receive data and callbacks as props.
* **`containers`:** Contains container (or "smart") components. These components are connected to the Redux store using
  `connect()` (or hooks). They subscribe to Redux state updates, dispatch actions, and pass data and callbacks as props 
  to presentational components.
* **`actions`:** Holds all action creators. Files within this directory often correspond to specific parts of the
  application's functionality.
* **`reducers`:** Contains all reducers.  Files are usually named to match the corresponding keys in the application's
  state tree.
* **`store`:**  Contains the code for initializing the Redux store.

### Components vs. Containers in React-Redux

* **Component:** A component (functional or class-based) that focuses on the presentation of UI elements. It is unaware 
  of Redux and receives data and event handlers as props.  It is often reusable.
* **Container:** A component that is connected to the Redux store.  It uses `connect()` (or hooks) to subscribe to 
  relevant parts of the state and dispatch actions.  Containers often act as intermediaries, fetching data, transforming
  it if necessary, and passing it down as props to presentational components.  They often do not render any DOM 
  themselves, but rather delegate the rendering to the components they wrap.






## How to Reset State in Redux

The standard and recommended way to reset the Redux state is by using a root reducer to intercept a specific action 
(like `USER_LOGOUT`) and reset the state.

### Why a Root Reducer?
Reducers should be pure functions. They receive the current state and an action, and they return a *new* state. When a 
reducer receives `undefined` as its state, it should return the *initial state*. This behavior is crucial for Redux's 
initialization and for resetting the state.

`combineReducers()` combines multiple reducers into a single reducer but doesn't directly allow intercepting specific
actions for a full state reset.  The root reducer addresses this.

### How it Works

1.  **`appReducer`:** The combined reducer created using `combineReducers()`. It manages the state for different parts 
  of your application.
2.  **`rootReducer`:** The top-level reducer that wraps `appReducer`. It intercepts the `USER_LOGOUT` (or any other
  reset) action.
3.  **Resetting the State:** On `USER_LOGOUT`, `rootReducer` sets the `state` argument to `undefined`. This triggers
  *all* reducers within `appReducer` to return their initial states.
4.  **Delegation:** For other actions, `rootReducer` calls `appReducer(state, action)` to let the combined reducers 
  handle updates.

### Example (with explanation)

```jsx
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage'; // If using redux-persist

// Individual reducers (example)
const userReducer = (state = {name: null}, action) => { /* ... */
};
const itemsReducer = (state = [], action) => { /* ... */
};

// Combine reducers
const appReducer = combineReducers({
  user: userReducer,
  items: itemsReducer,
  // ... other reducers
});

// Root reducer
const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    // For redux-persist: Clear persisted state
    if (state) { // Check if state exists to avoid errors on initial load
      Object.keys(state).forEach(key => {
        storage.removeItem(`persist:${key}`);
      });
    }

    state = undefined; // This triggers reducers to return their initial state
  }

  return appReducer(state, action);
};

export default rootReducer;
```

**Key Improvements and Explanations:**
* **`redux-persist` Handling:** The example demonstrates how to clear the persisted state if you are using 
  `redux-persist`. This is *essential* to prevent the state from being rehydrated from storage when the user logs back 
  in.
* **Check for `state` Existence:** The `if (state)` check within the `USER_LOGOUT` block prevents errors on the initial 
  load when the state is `undefined`.
* **Clear Each Key:** The `Object.keys(state).forEach` loop clears the persisted state for each key, ensuring that all
  parts of the state are reset.
* **Storage Module:**  Import the appropriate storage module from `redux-persist` (e.g., `localStorage`, 
  `sessionStorage`, `AsyncStorage`).

#### How to Use
```jsx
import { createStore } from 'redux';
import rootReducer from './reducers'; // Import your root reducer

const store = createStore(rootReducer);

export default store;
```
This ensures that when `USER_LOGOUT` is dispatched, the Redux state is reset. This is the standard way to handle state
resets in Redux.

### Without `redux-persist`
```jsx
import { combineReducers } from 'redux';

// Individual reducers (example)
const userReducer = (state = { name: null }, action) => { /* ... */ };
const itemsReducer = (state = [], action) => { /* ... */ };

// Combine reducers
const appReducer = combineReducers({
  user: userReducer,
  items: itemsReducer,
  // ... other reducers
});

// Root reducer (without redux-persist)
const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined; // This triggers reducers to return their initial state
  }

  return appReducer(state, action);
};

export default rootReducer;
```
The key difference is the removal of the `redux-persist` related import and the code within the `USER_LOGOUT` block that 
clears the persisted state.  Since we're not using redux-persist, there's no persisted state to clear.  The `state = 
undefined;` line remains, as it's the core mechanism for resetting the in-memory Redux state.






## React Context vs. React Redux

Both React Context and React Redux are mechanisms for managing and sharing data throughout a React application, but they 
differ significantly in their scope, features, and intended use cases.

### React Context

* **Purpose:** Primarily designed for sharing data that is considered "global" to a component tree, such as theme, 
  locale, or user authentication status. It avoids prop drilling by allowing components to directly access context 
  values without passing them down through intermediate components.
* **Scope:** Suitable for data that doesn't change frequently and is relevant to a specific part of the component tree.
  Context can be scoped to specific providers, limiting its reach.
* **Features:** Provides a way to create a context object, a provider component to supply values to the context, and a 
  consumer or hook (`useContext`) to access those values.
* **Limitations:** Not optimized for frequent updates. Rerenders can be less efficient than with Redux, especially in 
  large applications with frequent state changes. Lacks built-in mechanisms for managing complex state updates,
  middleware, or dev tooling.
  * **Rerendering Mechanism:** When a Context value changes, *all* components that consume that Context value (directly
    or indirectly, even if they don't use the specific changed part of the value) are potentially rerendered. This is a 
    key difference from Redux, which has sophisticated optimizations to minimize rerenders. This means that even if only
    a small part of your Context value changes, many components might unnecessarily rerender, which can lead to 
    performance bottlenecks, especially if these components are complex or have expensive rendering logic.
  * **Lack of Optimization:** React Context, by itself, doesn't provide built-in mechanisms to optimize rerenders. It 
    doesn't have `shouldComponentUpdate` (or `React.memo` or similar memoization techniques) built-in at the Context 
    level. You would have to implement these optimizations yourself if you use Context for frequent updates. Redux, on 
    the other hand, has `connect` (and the newer hooks `useSelector` and `useDispatch`) that use memoization and other 
    techniques to ensure that components only rerender when the specific data they depend on has actually changed. This 
    is a crucial performance advantage.
  * **Prop Drilling vs. Context:** While Context avoids prop drilling, using it for frequently changing data can lead 
    to a different kind of performance problem: unnecessary rerenders. Prop drilling, while sometimes tedious, can be 
    more performant if the data being drilled down changes frequently, as only the components that *actually use* that
    data will rerender.
  * **Context and Component Updates:** Even if you use `React.memo` or `shouldComponentUpdate` with Context, you need to
    be very careful about how you structure your Context values. If your Context value is an object, even if a 
    *property* within that object changes, React will often still trigger rerenders because the object itself has 
    changed (even if the property you're using hasn't). This can be tricky to optimize and requires careful attention.
  * **Dev Tooling:** Redux has excellent dev tooling (Redux DevTools) that allows you to easily inspect state changes,
    time-travel debug, and profile performance. Context doesn't have comparable built-in tooling for debugging 
    performance issues related to updates.

### React Redux

* **Purpose:** Designed for managing application-wide state in a predictable and centralized manner. It's particularly
  useful for complex applications with frequent state updates and intricate data flows.
* **Scope:** Manages the entire application state in a single store, making it accessible to any connected component.
* **Features:** Provides a centralized store to hold the application state, actions to describe state changes, reducers
  to update the state in response to actions, and the `connect` higher-order component (or hooks like `useSelector` and 
  `useDispatch`) to connect components to the store. Offers middleware for handling side effects and asynchronous
  operations, and excellent developer tooling (Redux DevTools) for debugging and time-travel debugging.
* **Advantages:** Optimized for performance with mechanisms to prevent unnecessary rerenders. Provides a structured and
  predictable way to manage state updates, making it easier to reason about and debug complex applications.

#### Key Differences Summarized

| Feature          | React Context                                | React Redux                                                 |
|------------------|----------------------------------------------|-------------------------------------------------------------|
| Primary Use Case | Sharing "global" data (theme, locale, etc.)  | Managing application-wide state                             |
| Scope            | Limited to specific component trees          | Application-wide                                            |
| Update Frequency | Suitable for less frequent updates           | Optimized for frequent updates                              |
| Features         | Basic context creation and consumption       | Centralized store, actions, reducers, middleware, dev tools |
| Performance      | Can be less efficient for frequent updates   | Optimized for performance                                   |
| Complexity       | Simpler to set up for basic use cases        | More structured and powerful for complex apps               |

#### In essence

* Use **React Context** for theming, localization, and other data that is relatively static and shared across a portion
  of your UI.
* Use **React Redux** for managing the core, frequently changing data of your application, especially when dealing with
  complex state updates and asynchronous operations.

**It's important to note:** React Redux uses Context internally. However, this implementation detail is hidden from the 
user. You don't directly interact with the underlying Context API when using React Redux. React Redux provides a
higher-level abstraction for state management.



















## Redux DevTools: A Time-Traveling Debugger for Redux
Redux DevTools is a powerful debugging tool for Redux applications. It provides a live-editing, time-travel debugging 
environment with features like hot reloading, action replay, and a customizable UI.  For ease of use, the Redux DevTools 
Extension for Chrome and Firefox is a popular choice, simplifying integration into your project.

## Features of Redux DevTools

Redux DevTools offers a range of features to enhance the debugging experience:

* **State and Action Inspection:**  Inspect every state update and the corresponding action payload that caused the
  change.  This allows you to see exactly how your application's state is evolving over time.
* **Time Travel Debugging (Action Replay):**  Go back in time by "canceling" (or "reverting") actions. This lets you see
  what your application state was at any point in the past, making it easier to pinpoint the source of bugs.
* **Hot Reloading with Action Re-evaluation:** If you modify your reducer code, Redux DevTools will re-evaluate each
  "staged" action, allowing you to see the effect of your code changes on the application's state without having to
  manually replay the actions.
* **Error Detection:** If a reducer throws an error, Redux DevTools will show you exactly which action caused the error 
  and what the error message was. This greatly simplifies the process of tracking down reducer-related bugs.
* **Persistent Debug Sessions:** Using the `persistState()` store enhancer, you can save your debugging sessions across 
  page reloads.  This is incredibly useful for debugging complex issues that might take multiple sessions to track down.

**Further Enhancements and Considerations:**
* **Customizable UI:** Redux DevTools offers a customizable UI, allowing you to tailor the debugging experience to your
  preferences.
* **Integration with other tools:** Redux DevTools can often be integrated with other debugging and profiling tools.
* **Performance considerations:** While generally performant, using Redux DevTools in production might have a small
  performance overhead.  It's best practice to disable it in production builds.
* **Advanced features:**  Redux DevTools offers more advanced features like filtering actions, importing/exporting 
  state, and more, which can further streamline the debugging process.






## Similarities Between Redux and RxJS
While Redux and RxJS serve very different purposes, they share some conceptual similarities stemming from the reactive
programming paradigm:

* **Reactive Nature:** Both Redux and RxJS embrace the reactive paradigm. Redux's store reacts to dispatched actions, 
  updating its state accordingly.  RxJS provides Observables, which react to emitted values and trigger actions or side 
  effects.
* **Data Streams:**  Both deal with the concept of data streams. In Redux, actions can be seen as a stream of events 
  that modify the state. In RxJS, Observables represent streams of data or events that can be transformed and 
  manipulated.
* **Centralized State/Data Management:** Redux provides a centralized store for managing application state. RxJS, while
  not inherently about state management in the same way, offers tools to manage asynchronous data flows and can be used
  to coordinate data from various sources.
* **Functional Programming:** Both libraries often work well with functional programming principles. Redux encourages 
  pure reducers, and RxJS provides operators that enable functional transformations of data streams.

**Key Differences:**
It's crucial to remember that the similarities are high-level.  Redux is primarily for state management in applications
(often UI), while RxJS is a library for reactive programming, primarily for handling asynchronous operations and event
streams.  They are often used together, with RxJS handling asynchronous actions and Redux managing the resulting state 
updates.

### References
* [reactjs-interview-questions - github](https://github.com/sudheerj/reactjs-interview-questions)