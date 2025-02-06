# Component 
* A React component is a function or class that optionally accepts inputs (called props) and returns a React element 
  (or a tree of elements). 
* Components are reusable and composable, allowing you to break the UI into independent(building block of UI), reusable
  pieces.

## Component Creation
### Function Component
```jsx
function Greeting(props) {
    return <h1>Hello, {props.name}!</h1>;
}
```

### Class Component
```jsx
class Greeting extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}!</h1>;
    }
}
```

## Component Key Points
* **Reusable**: Components can be reused across the application.
* **Composable**: Components can contain other components.
* Can have state (if it's a class component or uses hooks in a function component).
* Can have lifecycle methods (e.g., `componentDidMount`, `useEffect`).


## Class Component vs Function Component
After react 16.8, we can use hooks in function component to use state and lifecycle methods. So, we can use function
component instead of class component. 

But only in class component we can use `Error Boundaries` to catch error in child component native way. 
```js
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    
    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }
    componentDidCatch(error, info) {
        // Example "componentStack":
        // in ComponentThatThrows (created by App)
        // in ErrorBoundary (created by App)
        // in div (created by App)
        // in App
        logErrorToMyService(error, info.componentStack);
    }
    
    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return this.props.fallback;
        }
        
        return this.props.children;
    }
}
```
And wrap this component with ErrorBoundary component
```jsx
<ErrorBoundary fallback={<p>Something went wrong</p>}>
  <Profile />
</ErrorBoundary>
```

**But now we have [react-error-boundary](https://www.npmjs.com/package/react-error-boundary) package to handle error in 
functional component.** So we can use functional component instead of class component.

> Note when using react-error-boundary: ErrorBoundary is a client component. We can only pass props to it that are 
> serializable or use it in files that have a "use client"; directive.

```js
"use client";

import { ErrorBoundary } from "react-error-boundary";

<ErrorBoundary fallback={<div>Something went wrong</div>}>
  <ExampleApplication />
</ErrorBoundary>;
```


# Pure Component in React

## What is a Pure Component?
A **Pure Component** in React is a class component that implements `shouldComponentUpdate` with a shallow comparison of
state and props. It helps in optimizing performance by preventing unnecessary re-renders.

## Key Features
- Automatically performs a **shallow comparison** on `state` and `props`.
- Prevent re-renders if there are no changes in `state` or `props`.
- Improves performance for large applications.

## Syntax
A Pure Component extends `React.PureComponent` instead of `React.Component`:

```jsx
import React, { PureComponent } from 'react';

class Example extends PureComponent {
  state = {
    count: 0
  };

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    console.log("Rendered!");
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

export default Example;
```

## Difference Between `Component` and `PureComponent`
| Feature               | React Component                              | React PureComponent                           |
|-----------------------|----------------------------------------------|-----------------------------------------------|
| Re-renders            | Always re-renders when `setState` is called. | Only re-renders if `state` or `props` change. |
| Performance           | Less optimized.                              | More optimized for performance.               |
| shouldComponentUpdate | Not implemented by default.                  | Implements shallow comparison.                |

## Shallow Comparison Explanation
- For **primitives** (e.g., numbers, strings, booleans), a shallow comparison checks if values are the same.
- For **objects and arrays**, it only checks references, not deep equality.

Example:
```jsx
const obj1 = { name: "Alice" };
const obj2 = { name: "Alice" };

console.log(obj1 === obj2); // false (different references)
```
If you modify an object inside `setState` without changing its reference, React's `PureComponent` won't detect changes.

## When to Use Pure Components?
- When dealing with **simple immutable props and state**.
- When optimizing performance in **large-scale applications**.
- When avoiding **unnecessary re-renders**.

## When Not to Use Pure Components?
- When dealing with **nested objects or arrays** in state (as shallow comparison may not detect deep changes).
- When state frequently updates and does not benefit from optimizations.

## Functional Component Alternative: `React.memo`
For functional components, `React.memo` provides similar behavior:

Syntax:
```jsx
const MemoizedComponent = memo(SomeComponent, arePropsEqual?);
```

Example:
```jsx
const Example = React.memo(({ count }) => {
  console.log("Rendered!");
  return <p>Count: {count}</p>;
});
```

## Conclusion
- **Pure Components** optimize performance by reducing unnecessary re-renders.
- They use **shallow comparison** to determine if an update is needed.
- Use them wisely to improve efficiency in React applications.
















# Element
* A React element is a plain JavaScript object that describes what you want to see on the screen.
* It is an immutable representation of a DOM node or a component instance.
* Elements are lightweight and are created using `React.createElement()` or JSX.

## How is it created?
#### Using `React.createElement()`
```jsx
const element = React.createElement('h1', { className: 'greeting' }, 'Hello, world!');
```

#### Using JSX(Syntax Sugar of `React.createElement()`)
```js
const element = <h1 className="greeting">Hello, world!</h1>;
```

Its look like 
```js
{
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
}
```

## Element Key Points
* **Immutable**: Once created, you cannot change its properties.
* **Lightweight**: It is just a description of what should be rendered.
* Represents a single DOM node or component instance.


## Key Differences

| Aspect             | React Element                                     | React Component                                  |
|--------------------|---------------------------------------------------|--------------------------------------------------|
| Definition         | A plain object describing what to render.         | A function or class that returns elements.       |
| Creation           | Created using `React.createElement()` or JSX.     | Defined as a function or class.                  |
| Mutability         | Immutable (cannot be changed after creation).     | Can manage state and update over time.           |
| Reusability        | Not reusable directly.                            | Reusable and composable.                         |
| State              | Cannot have state.                                | Can have state (class components or hooks).      |
| Lifecycle Methods  | No lifecycle methods.                             | Can have lifecycle methods.                      |
| Example            | `<h1>Hello</h1>`                                  | `function Greeting() { return <h1>Hello</h1>; }` |

## Relationship Between Elements and Components

A component returns a React element (or a tree of elements) when it is rendered.

When you use a component in JSX, React calls the component and converts it into an element:

```jsx
// Component
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// Usage (creates an element)
const element = <Greeting name="Alice" />;
```

### References
* [reactjs-interview-questions - github](https://github.com/sudheerj/reactjs-interview-questions?tab=readme-ov-file#what-is-react)