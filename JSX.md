# JSX
JSX(JavaScript XML) is a syntax extension of JavaScript that allows developers to write HTML in their JS code. It is a
preprocessor step that adds XML syntax to JavaScript.

JSX provides us the syntactic sugar for the `React.createElement(type, props, ...children)` function. Such as
```js
export default function App() {
  return <h1 className="greeting">{"Hello, this is a JSX Code!"}</h1>;
}
```

Without JSX, the above code would look like:
```js
export default function App() {
    return React.createElement(
        "h1",
        { className: "greeting" },
        React.createElement("span", null, "Hello, this is a JSX Code!")
    );
}
```

## Rules of JSX
### Return a Single Root Element
If you are returning multiple elements from a component, wrap them in a single parent element. Otherwise, you will
receive the following error in your browser console:

```js
// Error: Adjacent JSX elements must be wrapped in an enclosing tag
export default function App() {
  return (
    <h1>Hello</h1>
    <h2>World</h2>
  );
}
```

To fix this, ensure that all returned elements are enclosed within a single parent element like a `<div>`, `<section>`,
or `<React.Fragment>`.
```js
export default function App() {
  return (
    <div>
      <h1>Hello</h1>
      <h2>World</h2>
    </div>
  );
}

// OR
export default function App() {
  return (
    <>
      <h1>Hello</h1>
      <h2>World</h2>
    </>
  );
}
```

#### Reason
Behind the scenes, JSX is transformed into plain javascript objects. It is not possible to return two or more objects 
from a function without wrapping into an array. This is the reason you can't simply return two or more JSX tags from a 
function without wrapping them into a single parent tag or a Fragment.

### All Tags Need to Be Closed

Unlike HTML, all tags in JSX need to be explicitly closed. This rule applies to self-closing tags as well (e.g., `<hr>`, `<br>`, and `<img>`). For example, the following are correct:

```jsx
<hr />
<img src="image.jpg" alt="image" />
```
If you forget to close a self-closing tag, it will result in a syntax error in JSX.

### Use camelCase Naming
It is suggested to use camelCase naming for attributes in JSX. For example, the common attributes of HTML elements such
as class, tabindex, will be used as className and tabIndex in JSX.
```jsx
<div className="container">Content</div>
<button tabIndex="0">Click Me</button>
```

#### Note:
There is an exception for `aria-*` and `data-*` attributes, which should always be written in lowercase. For example, 
`aria-label`, `data-id`, etc.
```jsx
<button aria-label="Close" data-id="123">Close</button>
```


    


## Loop inside JSX
You can use the `map()` function to loop through an array of items and return an array of elements. For example:

#### Using ES6 Arrow Function
```jsx
<tbody>
{/*Using ES6 Arrow Function*/}
{items.map((item) => (
    <SomeComponent key={item.id} name={item.name} />
))}

{/*Using ES6 Arrow Function with Destructuring*/}
{items.map(({ id, name }) => (
    <SomeComponent key={id} name={name} />
))}

{/*Using ES6 Arrow Function with Destructuring and Spread Operator*/}
{items.map(({ id, ...rest }) => (
    <SomeComponent key={id} {...rest} />
))}

{/*Using ES6 Arrow Function with Destructuring and Spread Operator with Custom Key*/}
{items.map(({ id, ...rest }) => (
    <SomeComponent key={`custom-${id}`} {...rest} />
))}


{/*Using ES6 Arrow Function with Destructuring and Spread Operator with Custom Key and Index*/}
{items.map(({ id, ...rest }, index) => (
    <SomeComponent key={`custom-${id}-${index}`} {...rest} />
))}
</tbody>
```

But we can not use `for` loop directly inside JSX. JSX tags transpiled into function calls, and the `for` loop is not a
function call. We can use statement inside expression.

#### This will not work
```jsx
<tbody>
{for (let i = 0; i < items.length; i++) {
    <SomeComponent key={items[i].id} name={items[i].name} />
}}
</tbody>
```

#### This will work
```jsx
<tbody>
{(() => {
    const elements = [];
    for (let i = 0; i < items.length; i++) {
        elements.push(<SomeComponent key={items[i].id} name={items[i].name} />);
    }
    return elements;
})()}
</tbody>
```
Alternative approach is to create a separate function to render the items.
```jsx
function renderItems(items) {
  const elements = [];
  for (let i = 0; i < items.length; i++) {
    elements.push(<SomeComponent key={items[i].id} name={items[i].name} />);
  }
  return elements;
}

<tbody>{renderItems(items)}</tbody>;
```


## Access variables in props attribute
You can access variables in the `props` attribute by using `{}`. For example:
```jsx
<img className="icon" src={"images/" + this.props.icon} />
```

Using ES6 template literals:
```jsx
<img className="icon" src={`images/${this.props.icon}`} />
```


# New JSX Transform vs Old Transform

## How is the New JSX Transform Different from the Old Transform?
The **new JSX transform** doesn’t require React to be in scope. This means you **don’t need to import React** for simple 
scenarios.

### Example: Old JSX Transform
```javascript
import React from "react";

function App() {
  return <h1>Good morning!!</h1>;
}
```
Now, JSX transform converts the above code into regular JavaScript as shown below:

```javascript
import React from "react";

function App() {
  return React.createElement("h1", null, "Good morning!!");
}
```

### Example: New JSX Transform
The new JSX transform **doesn't require importing React**.

```javascript
function App() {
  return <h1>Good morning!!</h1>;
}
```

Under the hood, the JSX transform compiles this code into:

```javascript
import { jsx as _jsx } from "react/jsx-runtime";

function App() {
  return _jsx("h1", { children: "Good morning!!" });
}
```

### Key Takeaways
- The **new JSX transform** eliminates the need to import React in files that only use JSX.
- The transformation now uses `react/jsx-runtime`, making the output more optimized.
- **Note:** You **still need to import React** to use Hooks (`useState`, `useEffect`, etc.).
- The new transform was introduced in **React 17** and is backward compatible.





# Binding Methods and Passing Parameters in JSX Callbacks

In React class components, methods and event handlers need to be properly bound to the component instance to ensure `this` refers to the component within the callback. Here's how to achieve this and how to pass parameters to event handlers.

## Binding Methods/Event Handlers

### 1. Binding in the Constructor

* This is the traditional approach.
* Explicitly binds the method to the component instance in the constructor.

```jsx
class User extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log("SingOut triggered");
  }

  render() {
    return <button onClick={this.handleClick}>SingOut</button>;
  }
}
```

### 2. Public Class Fields Syntax (Arrow Functions):

* This approach leverages class properties and arrow functions.
* Arrow functions automatically bind `this` to the component instance.
* Enabled by default in Create React App.

```jsx
class User extends React.Component {
  handleClick = () => {
    console.log("SingOut triggered", this);
  };

  render() {
    return <button onClick={this.handleClick}>SingOut</button>;
  }
}
```

### 3. Arrow Functions in Callbacks:

* You can define arrow functions directly within the `onClick` (or other event) handler.
* This creates a new function on each render, which can impact performance, especially when passing callbacks as props 
  to child components.

```jsx
class User extends React.Component {
  handleClick() {
    console.log('SingOut triggered');
  }

  render() {
    return <button onClick={() => this.handleClick()}>SignOut</button>;
  }
}
```

**Note** <br/>
For performance reasons, especially when passing callbacks to child components, `.bind()` or public class fields syntax
are preferred over arrow functions in callbacks.



## Passing Parameters to Event Handlers
### 1. Arrow Function Wrapping:
Use an arrow function to wrap the event handler and pass parameters.
```jsx
<button onClick={() => this.handleClick(id)} />
```

### 2. `bind()` Method:
Use the `.bind()` method to pre-bind the parameter to the event handler.
```jsx
<button onClick={this.handleClick.bind(this, id)} />
```

### 3. Arrow Function as Handler
You can define the handler itself as an arrow function that returns another function.
```jsx
<button onClick={this.handleClick(id)} />;

handleClick = (id) => () => {
  console.log("Hello, your ticket number is", id);
};
```


### References
* [reactjs-interview-questions - github](https://github.com/sudheerj/reactjs-interview-questions?tab=readme-ov-file#what-is-react)


