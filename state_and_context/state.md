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



### References
* [reactjs-interview-questions - github](https://github.com/sudheerj/reactjs-interview-questions?tab=readme-ov-file#what-is-react)