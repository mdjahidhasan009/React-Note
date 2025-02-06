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








### References
* [reactjs-interview-questions - github](https://github.com/sudheerj/reactjs-interview-questions?tab=readme-ov-file#what-is-react)