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

### When error boundary does not catch error
* Inside event handlers
* Asynchronous code (e.g., `setTimeout` or `requestAnimationFrame` callbacks)
* During server-side rendering
* In the error boundary itself

**As of React 16, errors that were not caught by any error boundary will result in unmounting of the whole React
component tree.** Because in a product like Messenger leaving the broken UI visible could lead to somebody sending a
message to the wrong person. Similarly, it is worse for a payments app to display a wrong amount than to render nothing.

### Where needs to put ErrorBoundary
* Put the ErrorBoundary component at the top of the component tree to catch errors in any child component.
* You can also wrap individual components with ErrorBoundary to catch errors in specific parts of the UI.

### Component Stack Trace at error boundary
Apart from error messages and javascript stack, React16 will display the component stack trace with file names and line
numbers using error boundary concept. 

Example
```
►React caught an error thrown by BuggyCounter. You should fix this error in your code.                           react-dom.development.js:7708
React will try to recreate this component tree from scratch using the error boundary you provided, ErrorBoundary.

Error: I crashed!

The error is located at:             in BuggyCounter (at App.js:26)
                                     in ErrorBoundary (at App.js:21)

                                     in div (at App.js:8)
                                     in App (at index.js:5)
```


# Naming a component
* Component names should always start with a **capital letter**.
* React treats components starting with lowercase letters as **DOM tags** means HTML tags / SVG.
* So while started with lowercase letter, it will be treated as HTML tag and while started with uppercase letter, it will
  be treated as React component.

```jsx
// Correct
function Greeting() {
  return <h1>Hello, World!</h1>;
}

// Incorrect
function greeting() {
  return <h1>Hello, World!</h1>;
}
```

But we can define a component as lowercase(which is not recommended as it will create confusion) and while importing it
we can use it as uppercase letter.

```jsx
// Define as lowercase
function myComponent {
  render() {
    return <div />;
  }
}

export default myComponent;
```

```jsx
// Import as uppercase
import MyComponent from "./myComponent";
```

## Exception on naming a component
### Higher Order Component
**Higher-Order Components (HOCs)** are an exception to this rule. They are named with a lowercase letter because they
are not components themselves but functions that return components.

**Correct**
```jsx
function withUser(Component) {
  return function WithUserComponent(props) {
    return <Component {...props} user={user} />;
  };
}
```
**Incorrect**
```jsx
function WithUser(Component) {
  return function WithUserComponent(props) {
    return <Component {...props} user={user} />;
  };
}
```

### Objects of Components
When exporting an object of components, it's common to use lowercase keys for the components. This is because the object
is a collection of components, not a single component.
```jsx
import React from 'react';

const MyComponent = () => <div>This is MyComponent!</div>;
const AnotherComponent = () => <div>This is AnotherComponent!</div>;

const components = {
  MyComponent: MyComponent,
  AnotherComponent: AnotherComponent,
};

class MyParentComponent extends React.Component {
  render() {
    return (
      <div>
        <components.MyComponent /> {/* React.createElement(components.MyComponent) */}
        <components.AnotherComponent /> {/* React.createElement(components.AnotherComponent) */}
      </div>
    );
  }
}

export default function App() {
  return (
    <div>
      <MyParentComponent />
    </div>
  );
}
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





# Controlled vs Uncontrolled Components in React
In react, components that handle from data or user interactions can be categorized into two types: **Controlled** and 
**Uncontrolled** components. The key difference is how the component manages its state and interact with DOM.

## Controlled Components
A **Controlled Component** is a component that date in handled by **React State**. 

### Key Features
* The value of the input is controlled by React state.
* Changes to the input are handled via `onChange` event handlers.
* The component re-renders whenever the state changes.

```jsx
function ControlledInput() {
  const [value, setValue] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
    />
  );
}
```

### When to Use
* When you need full control over the input value.
* When you want to validate or transform the input before updating the state.
* When the input value depends on other parts of the application state.


## Uncontrolled Components
An **Uncontrolled Component** is a component that manages its state by **DOM directly**. Instead of managing the input
value via React state, you use a **ref** to directly access the DOM element and retrieve its value when needed. For 
class component we can use `React.createRef()` and for functional component we can use `useRef()` hook.

We can set default values to uncontrolled component using `defaultValue` attribute.

```jsx
function UncontrolledInput() {
  const inputRef = React.useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Input value: " + inputRef.current.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={inputRef} defaultValue="Hello" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

Class component, we can use `React.createRef()` to create ref. `componentDidMount` lifecycle method to fetch initial 
data and set the input value.

```jsx
class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
  }

  componentDidMount() {
    // Fetch initial data when the component mounts
    fetch("/api/user")
            .then((response) => response.json())
            .then((data) => {
              this.input.current.value = data.name;
            });
  }

  render() {
    return (
            <form>
              <label>
                {"Name:"}
                <input type="text" ref={this.input} />
              </label>
            </form>
    );
  }
}
```

### When to Use
* When you want to avoid **unnecessary re-renders**.
* When you need to integrate with **non-React libraries** that directly manipulate the DOM.
* When the input value is only needed at specific times (e.g., form submission).


## Key Differences

| Feature              | Controlled Component                              | Uncontrolled Component                                        |
|----------------------|---------------------------------------------------|---------------------------------------------------------------|
| **State Management** | Managed by React state.                           | Managed by the DOM.                                           |
| **Value Control**    | Value is controlled via `value` prop.             | Value is accessed via `ref`.                                  |
| **Re-renders**       | Re-renders on state changes.                      | Does not re-render on input changes.                          |
| **Event Handling**   | Requires `onChange` handler.                      | No need for `onChange` handler.                               |
| **Form Submission**  | Can get value from React state.                   | Must use `ref` to get value.                                  |
| **Use Case**         | When you need full control over input.            | When you want to avoid re-renders or use native DOM handling. |
| **Performance**      | May trigger frequent re-renders.                  | More performant for large forms.                              |
| **Example**          | `<input value={state} onChange={handleChange} />` | `<input ref={inputRef} />`                                    |


# Higher-Order Components (HOC) in React
A **Higher Order Component (HOC)** is a pattern in React that allows you to **re-use component logic**. It is a function
that takes a component and returns a new component with additional props. This pattern is derived from react's 
compositional nature.

We can call them **pure components** because they are just functions that can accept dynamically provided child 
component but they don't modify or copy the original component.

```jsx
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

### Key Features
* **Reusability**: HOCs allow you to reuse component logic across multiple components.
* **Composability**: You can compose multiple HOCs to enhance a component.
* **Props Injection and Manipulation**: HOCs can inject props or manipulate existing props.
* **State abstraction, manipulation and Lifecycle Methods**: HOCs can manage state, manipulate props, and implement 
  lifecycle methods.
* **Cross-Cutting Concerns**: HOCs are useful for implementing cross-cutting concerns like logging, authentication, etc.


Example: **HOC Class Component**

`withUser` is a HOC that fetches user data and passes it as a prop to the wrapped component.
```jsx
import React from "react";

// Higher-Order Component (HOC)
const withUser = (WrappedComponent) => {
  // Return a new component
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        user: null,
      };
    }

    componentDidMount() {
      // Simulate fetching user data
      setTimeout(() => {
        this.setState({
          user: { name: "John Doe", age: 30 },
        });
      }, 1000);
    }

    render() {
      // Pass the user data as an additional prop to the wrapped component
      return <WrappedComponent user={this.state.user} {...this.props} />;
    }
  };
};

export default withUser;
```
`UserPorfile` a regular component that displays user data.
```jsx
import React from "react";

const UserProfile = ({ user }) => {
  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
          <div>
            <h1>User Profile</h1>
            <p>Name: {user.name}</p>
            <p>Age: {user.age}</p>
          </div>
  );
};

export default UserProfile;
```

`UserProfileWithUser` is the enhanced component created by wrapping `UserProfile` with `withUser` HOC.
```jsx
import React from "react";
import withUser from "./withUser"; // Import the HOC
import UserProfile from "./UserProfile"; // Import the regular component

// Wrap the UserProfile component with the HOC
const UserProfileWithUser = withUser(UserProfile);

// Use the enhanced component
const App = () => {
  return (
          <div>
            <UserProfileWithUser />
          </div>
  );
};

export default App;
```

**HOC Functional Component**
```jsx
import React, { useState, useEffect } from 'react';

// Functional Higher-Order Component (HOC)
const withUser = (WrappedComponent) => {
  // Return a functional component instead of a class
  return function WithUserComponent(props) {
    const [user, setUser] = useState(null);

    useEffect(() => {
      // Simulate fetching user data
      setTimeout(() => {
        setUser({ name: "John Doe", age: 30 });
      }, 1000);
    }, []); // Empty dependency array means this runs once on mount

    // Pass the user data as an additional prop to the wrapped component
    return <WrappedComponent user={user} {...props} />;
  };
};

// UserProfile component (unchanged)
const UserProfile = ({ user }) => {
  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
          <div>
            <h1>User Profile</h1>
            <p>Name: {user.name}</p>
            <p>Age: {user.age}</p>
          </div>
  );
};

// App component using the HOC
const App = () => {
  // Create the enhanced component
  const UserProfileWithUser = withUser(UserProfile);

  return (
          <div>
            <UserProfileWithUser />
          </div>
  );
};

export default App;
```


# Switching Component

A switching component is a component that renders one of many components. We need to use object to map prop values to
components.

For example, a switching component to display different pages based on `page` prop:
```jsx
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import ServicesPage from "./ServicesPage";
import ContactPage from "./ContactPage";

const PAGES = {
  home: HomePage,
  about: AboutPage,
  services: ServicesPage,
  contact: ContactPage,
};

const Page = (props) => {
  const Handler = PAGES[props.page] || ContactPage;

  return <Handler {...props} />;
};

// The keys of the PAGES object can be used in the prop types to catch dev-time errors.
Page.propTypes = {
  page: PropTypes.oneOf(Object.keys(PAGES)).isRequired,
};
```


## `displayName` Property
The displayName in react is used to assign a custom name to a component for debugging purposes. It is a special 
property that helps in observing the component tree in developer tools by changing the default names to custom names.

```js
function withSubscription(WrappedComponent) {
  class WithSubscription extends React.Component {
    /* ... */
  }
  WithSubscription.displayName = `WithSubscription(${getDisplayName(
    WrappedComponent
  )})`;
  return WithSubscription;
}
function getDisplayName(WrappedComponent) {
  return (
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  );
}
```






















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


## React `createElement` and `cloneElement`

## `React.createElement()`
The `React.createElement()` function is used to create a **React element** without using JSX. It takes three main
arguments:

### Syntax:
```jsx
React.createElement(type, props, ...children)
```

### Parameters:
- `type`: The type of element (string for HTML tags or component reference for React components).
- `props`: An object containing properties and attributes.
- `children`: The child elements or text content.

### Example:
```jsx
const element = React.createElement(
  "h1",
  { className: "title" },
  "Hello, React!"
);
ReactDOM.render(element, document.getElementById("root"));
```

### When to Use?
- When JSX is **not available**.
- When generating elements dynamically.

---

## `React.cloneElement()`
The `React.cloneElement()` function is used to **clone and modify** an existing React element.

### Syntax:
```jsx
React.cloneElement(element, [props], [...children])
```

### Parameters:
- `element`: The React element to clone.
- `props`: Additional properties to override or extend.
- `children`: New children to replace existing ones.

### Example:
```jsx
const Button = (props) => <button {...props}>{props.children}</button>;

const originalButton = <Button className="primary">Click Me</Button>;
const clonedButton = React.cloneElement(originalButton, { disabled: true });

ReactDOM.render(clonedButton, document.getElementById("root"));
```

### When to Use?
- When **modifying** an existing component without re-rendering.
- When **injecting additional props** into child components dynamically.

---

## Key Differences

| Feature               | `React.createElement`                     | `React.cloneElement`                                 |
|-----------------------|-------------------------------------------|------------------------------------------------------|
| **Purpose**           | Creates a new React element.              | Clones and modifies an existing element.             |
| **Props Handling**    | Accepts fresh props.                      | Merges new props with existing ones.                 |
| **Children Handling** | Accepts children separately.              | Can replace or keep existing children.               |
| **Use Case**          | Used when creating elements from scratch. | Used when modifying existing components dynamically. |

These functions are **powerful tools** for dynamic UI creation and component manipulation in React.

## `label` Element Example
As `for` is a reserved keyword in JavaScript, we use `htmlFor` in React to associate a label with an input element.
```jsx
<label htmlFor="name">Name:</label>
<input id="name" type="text" />
```
After converting into React element, it will be like
```jsx
React.createElement("label", { htmlFor: "name" }, "Name:");
React.createElement("input", { id: "name", type: "text" });
```
In HTML, it will be like after converting into HTML from React element
```html
<label for="name">Name:</label>
<input id="name" type="text" />
```

## State of element
### `focus`
The `focus` method is used to give focus to an element. It is a DOM method that can be called on a DOM node or a React
element reference. Like if we use `focus` in a input element then it will focus on that input element when page loads.
And if we type anything then it will be typed in that input element.

#### Focus an element on load
**Class Component**
```jsx
class App extends React.Component {
  componentDidMount() {
    this.nameInput.focus();
  }

  render() {
    return (
            <div>
              <input defaultValue={"Won't focus"} />
              <input
                      ref={(input) => (this.nameInput = input)}
                      defaultValue={"Will focus"}
              />
            </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
```

**Functional Component**
```jsx
import React, { useEffect, useRef } from "react";

const App = () => {
  const inputElRef = useRef(null);

  useEffect(() => {
    inputElRef.current.focus();
  }, []);

  return (
          <div>
            <input defaultValue={"Won't focus"} />
            <input ref={inputElRef} defaultValue={"Will focus"} />
          </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
```













# Attribute
* Attributes are key-value pairs that are used to provide additional information about an element.
* In React, attributes are passed to components as **props**.
* They are used to configure and customize elements.
* Attributes can be standard HTML attributes (e.g., `id`, `className`) or custom attributes.

In react those jsx are turned into javascript object eventually and that object is called `React Element`. That's why 
we can't use `class` as attribute name because it is a reserved keyword in javascript. We have to use `className` 
instead of `class`.

```jsx
const element = <div id="container" className="main">Hello, React!</div>;
```

It will be converted into 
```js
{
  type: 'div',
  props: {
    id: 'container',
    className: 'main',
    children: 'Hello, React!'
  }
}
```

## Style Attribute
The `style` attribute in React is used to apply inline styles to elements. It accepts an object where keys are camelCased
CSS properties and values are strings. It is more efficient and prevents XSS attacks compared to using `innerHTML`.

```jsx
const divStyle = {
  color: "blue",
  backgroundImage: "url(" + imgUrl + ")",
};

function HelloWorldComponent() {
  return <div style={divStyle}>Hello World!</div>;
}
```

Style keys are camelCased in order to be consistent with accessing the properties on DOM nodes in JavaScript 
(e.g. `node.style.backgroundImage`).

### Combine multiple inline styles objects
You can use spread operator in regular React:
```jsx
<button style={{ ...styles.panel.button, ...styles.panel.submitButton }}>
    {"Submit"}
</button>
```
If you're using React Native then you can use the array notation:
```jsx
<button style={[styles.panel.button, styles.panel.submitButton]}>
    {"Submit"}
</button>
```

### Vendor Prefixes in CSS
Vendor prefixes are prefixes added to CSS properties (and sometimes other web technologies) by browser vendors (like 
Mozilla, Google, Microsoft, etc.) to experiment with or implement new, non-standard features.  They are a way for
browser makers to try out new CSS properties *before* they are officially standardized and supported by all browsers.

**Using vendor prefixes in React inline styles:**
```jsx
<div
  style={{
    transform: "rotate(90deg)",
    WebkitTransform: "rotate(90deg)", // note the capital 'W' here
    msTransform: "rotate(90deg)", // 'ms' is the only lowercase vendor prefix
  }}
/>
```
* `transform: "rotate(90deg)"`: This is the standard CSS property for rotating an element. It rotates the element 90 
  degrees clockwise.  Modern browsers should support this unprefixed version.
* `WebkitTransform: "rotate(90deg)"`: This is the vendor-prefixed version of the transform property for browsers that
  use the WebKit engine (like Chrome and Safari).  Older versions of these browsers might require this prefix. The 
  Webkit prefix is capitalized in the JavaScript object because it's being used as a property name.
* `msTransform: "rotate(90deg)"`: This is the vendor-prefixed version for Internet Explorer and older versions of 
  Microsoft Edge.  The ms prefix is lowercase, but again, it's capitalized (msTransform) when used as a property in the
  JavaScript object.

#### Why those are not need now?
* **Standardization**: Many CSS properties that required vendor prefixes in the past are now standardized and don't 
  require prefixes in modern browsers.
* **Autoprefixer**: Tools like Autoprefixer automatically add necessary vendor prefixes to your CSS during the build 
  process, so you don't need to worry about them in your source code.
* **Browsers**: Modern browsers have caught up with CSS standards, and many properties no longer require prefixes.


## DOM Attributes support
In the past, React used to ignore unknown DOM attributes. If you wrote JSX with an attribute that React doesn't
recognize, React would just skip it.

For example, let's take a look at the below attribute:
```jsx
<div mycustomattribute={"something"} />
```
Would render an empty div to the DOM with React v15:
```jsx
<div />
```
In React v16 any unknown attributes will end up in the DOM:
```jsx
<div mycustomattribute="something" />
```
This is useful for supplying browser-specific non-standard attributes, trying new DOM APIs, and integrating with 
opinionated third-party libraries.


## Conditionally apply class attributes
#### Using Ternary Operator
```jsx
function Button({ isPrimary }) {
  return <button className={isPrimary ? "primary" : "secondary"}>Click Me</button>;
}
```

#### Using Logical AND Operator
```jsx
function Button({ isPrimary }) {
  return <button className={isPrimary && "primary"}>Click Me</button>;
}
```

#### Using Template Literals
```jsx
function Button({ isPrimary }) {
  return <button className={`button ${isPrimary ? "primary" : "secondary"}`}>Click Me</button>;
}
```







# Fragment
A **Fragment** is a built-in component in React that allows you to group multiple children without adding extra nodes to
the DOM. We can use `<Fragment></Fragment>` or `<> </>` to wrap multiple elements.

```jsx
function Story({ title, description, date }) {
  return (
    <Fragment>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>{date}</p>
    </Fragment>
  );
}
```

## Key Points
* Fragments are bit faster and use less memory than `<div>` elements as it does not create any extra DOM nodes. This
  only has a real benefit on very large and deep trees.
* Fragments can have keys, and they will be passed to their children.
* Some CSS properties like *Flexbox* and *Grid* properties have a special parent-child relationship, and adding an extra
  `<div>` may affect the layout. Fragments can be used to avoid this issue.
* The DOM inspector will be less cluttered.







### References
* [reactjs-interview-questions - github](https://github.com/sudheerj/reactjs-interview-questions?tab=readme-ov-file#what-is-react)