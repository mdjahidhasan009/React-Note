# State
The state `object` is where you store property values that belong to the component. When the `state` object changes, the
component re-renders.

## Function Components and State
Function components don't have a `state` property. However, you can use the `useState` hook to add state to function
components. `useState` returns an array with two elements: the current state value and a function that lets you update 
it.

Syntax:
```jsx
const [state, setState] = useState(initialState);
```

Example:
```jsx
import React, { useState } from "react";

const Example = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};
```

## Class Components and State
Class components have a `state` property that is an object. You can update the `state` object by calling the `setState`
method. When the `state` object changes, the component re-renders.

Syntax:
```jsx
class Example extends React.Component {
  state = {
    count: 0
  };

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}
```

### Set state with dynamic key
If you are using ES6 or the Babel transpiler to transform your JSX code then you can accomplish this with computed 
property names.
```jsx
this.setState({ [key]: value });
```

Example:
```jsx
//eslint-disable-next-line
handleInputChange(event) {
  this.setState({ [event.target.id]: event.target.value })
}
```


## state vs props

| Feature                | State                                           | Props                                           |
|------------------------|-------------------------------------------------|-------------------------------------------------|
| **Definition**         | Managed by the component itself.                | Passed from a parent component.                 |
| **Mutability**         | Can be modified using `setState()`.             | Read-only (immutable).                          |
| **Scope**              | Local to the component (component's memory).    | Passed down to child components.                |
| **Trigger Re-render?** | Yes, updating state triggers re-render.         | No, props themselves do not trigger re-renders. |
| **Usage**              | Used for managing internal component data.      | Used for passing data and configurations.       |
| **Reusability**        | Components using state alone are not reusable.  | Helps in making components reusable.            |





# Lift State Up
Lifting state up is a technique in React where you move the state from a child component to its parent component. This
is useful when multiple components need to share the same state. By lifting the state up to the closest common ancestor,
you can share the state between components without having to pass it down through multiple levels of the component tree.


## Automatic Batching in React 18 and Beyond

React optimizes performance by preventing components from re-rendering after *every* single state update. It achieves 
this by grouping multiple state updates within an event handler into a single re-render cycle. This process is known as 
**batching**.

Older versions of React only supported batching for browser events. React 18 introduced **automatic batching**, which 
extends this capability to asynchronous actions, timeouts, intervals, and native events. This means that even if state
updates occur outside of a direct event handler (e.g., within a `fetch` callback or a `setTimeout` function), React will
still batch them together for a single re-render.

**Example of Automatic Batching:**

```javascript
import { useState } from "react";

export default function BatchingState() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("batching");

  console.log("Application Rendered"); // Will only log once per click

  const handleUsers = () => {
    fetch("[https://jsonplaceholder.typicode.com/users/1](https://jsonplaceholder.typicode.com/users/1)")
      .then(() => {
        // Automatic Batching: re-renders only once, even with two state updates.
        setCount(count + 1);
        setMessage("users fetched");
      });
  };

  return (
    <>
      <h1>{count}</h1>
      <p>{message}</p> {/* Added message display */}
      <button onClick={handleUsers}>Click Me!</button>
    </>
  );
}
```
In this example, even though `setCount` and `setMessage` are called separately within the `fetch` callback, React's
automatic batching ensures that the component only re-renders *once*. This significantly improves performance by
reducing the number of DOM updates.  The console log will only appear once per click, demonstrating the single 
re-render. I've added the display of the `message` state to the JSX so you can directly see the update.

## Preventing Automatic Batching with `flushSync`

While automatic batching is generally desirable, there might be situations where you need to force a re-render after 
each state update. For example, you might have state updates that depend on each other, or you might need to update the 
DOM immediately for visual feedback.

For these specific use cases, React provides the `flushSync` method from the `react-dom` API. `flushSync` forces React
to immediately update the DOM, bypassing automatic batching.

## Example of `flushSync` Usage:
```jsx
import { useState } from "react";
import { flushSync } from "react-dom";

function MyComponent() {
  const [clicked, setClicked] = useState(false);
  const [count, setCount] = useState(0);

  const handleClick = () => {
    flushSync(() => {
      setClicked(!clicked); // Component will re-render *immediately*
    });

    setCount(count + 1); // Component will re-render *again* (due to separate update)
  };

  return (
    <div>
      <button onClick={handleClick}>Click me</button>
      <p>Clicked: {clicked.toString()}</p>
      <p>Count: {count}</p>
    </div>
  );
}
```
In this example, the `flushSync` call ensures that the `clicked` state update is immediately reflected in the DOM. The 
subsequent `setCount` call then triggers *another* re-render.  So, in this specific case, the component re-renders 
*twice*.  Use `flushSync` sparingly, as it can negate the performance benefits of automatic batching.  It's generally 
reserved for situations where immediate DOM updates are absolutely necessary.

**Key Considerations:**

* Automatic batching is the default behavior in React 18 and later.
* `flushSync` should be used only when you absolutely need to force a synchronous update. Overuse can degrade 
  performance.
* For most common scenarios, relying on automatic batching will provide the best performance.




# Updating Objects, Nested Objects, and Arrays in React State

In React, state should be treated as immutable. This means you should avoid directly modifying objects and arrays within the state. Instead, create new copies and update the state with these copies.

## Updating Objects Inside State

Directly mutating objects in state can lead to unexpected behavior and UI inconsistencies.

**Incorrect Approach (Direct Mutation):**

```jsx
import { useState } from "react";

export default function Profile() {
  const [user, setUser] = useState({
    firstName: "John",
    lastName: "Abraham",
    age: 30,
  });

  function handleFirstNameChange(e) {
    // This will not trigger a re-render so the UI won't update
    user.firstName = e.target.value; // Direct mutation - Avoid this!
  }

  function handleLastNameChange(e) {
    // This will not trigger a re-render so the UI won't update
    user.lastName = e.target.value; // Direct mutation - Avoid this!
  }

  function handleAgeChange(e) {
    // This will not trigger a re-render so the UI won't update  
    user.age = e.target.value; // Direct mutation - Avoid this!
  }

  return (
          <>
            {/* ... input fields ... */}
            <p>
              Profile: {user.firstName} {user.lastName} ({user.age})
            </p>
          </>
  );
}
```

### Correct Approach (Creating a New Object):

Use the spread syntax (`...`) to create a shallow copy of the object and update the necessary properties.

```javascript
import { useState } from "react";

export default function Profile() {
  const [user, setUser] = useState({
    firstName: "John",
    lastName: "Abraham",
    age: 30,
  });

  function handleProfileChange(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  return (
          <>
            <label>
              First name:
              <input name="firstName" value={user.firstName} onChange={handleProfileChange} />
            </label>
            <label>
              Last name:
              <input name="lastName" value={user.lastName} onChange={handleProfileChange} />
            </label>
            <label>
              Age:
              <input name="age" value={user.age} onChange={handleProfileChange} />
            </label>
            <p>
              Profile: {user.firstName} {user.lastName} ({user.age})
            </p>
          </>
  );
}
```

## Updating Nested Objects Inside State

The spread syntax performs a shallow copy. For nested objects, you need to create new copies of each nested level.

**Example:**

```javascript
const user = {
  name: "John",
  age: 32,
  address: {
    country: "Singapore",
    postalCode: 440004,
  },
};

// Incorrect (Direct Nested Mutation):
// user.address.country = "Germany"; // Avoid this!

// Correct (Creating New Nested Objects):
setUser({
  ...user,
  address: {
    ...user.address,
    country: "Germany",
  },
});
```


### Deeply Nested Objects:

For deeply nested objects, consider using libraries like Immer to simplify immutable updates.

## Updating Arrays Inside State

Similar to objects, arrays should be treated as immutable.

**Incorrect Approach (Direct Mutation):**

```javascript
const [todos, setTodos] = useState([]);

function handleClick(id, name) {
  todos.push({ id: id + 1, name: name }); // Direct mutation - Avoid this!
  setTodos(todos); //state won't update
}
```

### Correct Approach (Creating a New Array):

Use the spread syntax or array methods like `slice`, `map`, or `filter` to create a new array.

```javascript
const [todos, setTodos] = useState([]);

function handleClick(id, name) {
  setTodos([
    ...todos,
    { id: id + 1, name: name },
  ]);
}
```


## Avoid Direct Array Mutations:

* `arr[index] = newValue`
* `arr.push()`
* `arr.pop()`
* `arr.shift()`
* `arr.unshift()`
* `arr.splice()`

## Use Immutable Array Operations:

* Spread syntax (`...`)
* `arr.slice()`
* `arr.map()`
* `arr.filter()`
* `arr.concat()`

## Key Takeaways:

* Always create new copies of objects and arrays when updating state.
* Use the spread syntax for shallow copies.
* For nested objects, create copies at each level.
* Use immutable array operations.
* Consider using Immer for complex state updates.


# Using Immer for State Updates in React

Immer is a library that simplifies immutable state updates by leveraging a "copy-on-write" mechanism. It uses JavaScript proxies to track modifications to immutable states, making state management more intuitive and less verbose.

**Immer's Core Concepts:**

* **Current State:** The actual, immutable state.
* **Draft State:** A mutable proxy of the current state. All changes are made to this draft.
* **Next State:** The new, immutable state created after all mutations are applied to the draft.

**How to Use Immer:**

1.  **Installation:**
    ```bash
    npm install use-immer
    ```
2.  **Import and Use `useImmer`:**
  * Replace `useState` with `useImmer`.
  * Import `useImmer` from the `use-immer` library.
3.  **Update State with the Setter Function:**
  * The setter function provided by `useImmer` takes a callback function.
  * Inside the callback, you can directly mutate the `draft` state.
  * Immer will create a new immutable state based on the changes made to the draft.

**Example: Updating Nested Objects:**

```jsx
import { useImmer } from "use-immer";

function UserProfile() {
  const [user, setUser] = useImmer({
    name: "John",
    age: 32,
    address: {
      country: "Singapore",
      postalCode: 440004,
    },
  });

  function handleUpdateCountry() {
    setUser((draft) => {
      draft.address.country = "Germany";
    });
  }

  return (
          <div>
            <p>Name: {user.name}</p>
            <p>Country: {user.address.country}</p>
            <button onClick={handleUpdateCountry}>Update Country</button>
          </div>
  );
}

export default UserProfile;
```

## Benefits of Using Immer:

* **Simplified State Updates:** Immer allows you to write mutable-looking code, while ensuring immutability behind the scenes.
* **Reduced Boilerplate:** It eliminates the need for manual object and array copying, making your code cleaner and more concise.
* **Improved Readability:** The mutation syntax is more intuitive, especially for complex nested objects.
* **Performance Optimization:** Immer efficiently tracks changes, minimizing unnecessary re-renders.
* **Deep Updates Made Easy:** very deep nested state changes are simplified.

## Key Points:

* Immer uses JavaScript proxies to efficiently track changes.
* You directly mutate the `draft` state within the setter function's callback.
* Immer automatically generates a new, immutable state.
* Immer is very useful when dealing with complex state objects.






# Callback Function in `setState()`

The primary purpose of providing a callback function as the second argument to `setState()` is to execute code *after* the state has been updated and the component has re-rendered.

**Why Use a Callback?**

* **Asynchronous `setState()`:** `setState()` is asynchronous. This means that when you call it, the state update doesn't happen immediately. React batches state updates for performance reasons.
* **Guaranteed Execution After Re-render:** The callback function is guaranteed to be executed after React has applied the state changes and re-rendered the component.
* **Handling Side Effects:** It's useful for performing side effects that depend on the updated state, such as making API calls, manipulating the DOM, or logging values.

**Example:**

```jsx
import React, { Component } from 'react';

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        };
    }

    increment = () => {
        this.setState(
            (prevState) => ({
                count: prevState.count + 1,
            }),
            () => {
                console.log('Count updated:', this.state.count);
                // Perform other actions that depend on the updated count here.
                // For example, an API call.
                if(this.state.count === 5){
                    console.log("Count is now 5!");
                }
            }
        );
    };

    render() {
        return (
            <div>
                <p>Count: {this.state.count}</p>
                <button onClick={this.increment}>Increment</button>
            </div>
        );
    }
}

export default Counter;
```

## Explanation:

* **`increment()` Function:**
    * When the "Increment" button is clicked, the `increment()` function is called.
    * `this.setState()` is used to update the `count` state.
    * The first argument to `setState()` is a function that receives the previous state and returns the new state. This
      is the recommended way to update state based on previous state values.
    * The second argument is the callback function.
* **Callback Execution:**
    * After React updates the `count` state and re-renders the component, the callback function is executed.
    * Inside the callback, `console.log('Count updated:', this.state.count)` logs the updated count value.
    * An if statement shows that other code can be ran, after the state has been updated.
* **Why Not Just Use `console.log(this.state.count)` After `setState()`?**
    * If you placed `console.log(this.state.count)` immediately after the `setState()` call, it would likely log the 
      previous count value because `setState()` is asynchronous. The callback ensures that the log occurs after the
      update.

## Recommendation:

* While callback functions are useful, React's lifecycle methods (e.g., `componentDidUpdate`) or the `useEffect` hook in
  functional components are generally preferred for handling side effects that depend on state updates. They provide 
  more structured and predictable ways to manage these actions.
* Using callbacks directly in the `setState` function can lead to deeply nested callbacks, or "callback hell". Lifecycle
  methods and `useEffect` reduce this problem.







# reselect
Reselect is a selector library (for Redux) which uses memoization concept. It was originally written to compute derived
data from Redux-like applications state, but it can't be tied to any architecture or library.

Reselect keeps a copy of the last inputs/outputs of the last call, and recomputes the result only if one of the inputs
changes. If the same inputs are provided twice in a row, Reselect returns the cached output. It's memoization and cache
are fully customizable.

**React Toolkit also includes a `createSelector` function that is based on Reselect.**

* Selectors can compute derived data, allowing Redux to store the minimal possible state.
* Selectors are efficient. A selector is not recomputed unless one of its arguments changes.
* Selectors are composable. They can be used as input to other selectors.

```js
import { createSelector } from "reselect";

const shopItemsSelector = (state) => state.shop.items;
const taxPercentSelector = (state) => state.shop.taxPercent;

const subtotalSelector = createSelector(shopItemsSelector, (items) =>
  items.reduce((acc, item) => acc + item.value, 0)
);

const taxSelector = createSelector(
  subtotalSelector,
  taxPercentSelector,
  (subtotal, taxPercent) => subtotal * (taxPercent / 100)
);

export const totalSelector = createSelector(
  subtotalSelector,
  taxSelector,
  (subtotal, tax) => ({ total: subtotal + tax })
);

let exampleState = {
  shop: {
    taxPercent: 8,
    items: [
      { name: "apple", value: 1.2 },
      { name: "orange", value: 0.95 },
    ],
  },
};

console.log(subtotalSelector(exampleState)); // 2.15
console.log(taxSelector(exampleState)); // 0.172
console.log(totalSelector(exampleState)); // { total: 2.322 }
```

### References
* [reactjs-interview-questions - github](https://github.com/sudheerj/reactjs-interview-questions?tab=readme-ov-file#what-is-react)