
## Understanding React, React-DOM, and JSX Transpiler

In the context of building user interfaces for the web, it's important to understand the roles of React, React-DOM, and JSX transpilers. However, for simplicity, everything is often referred to as "React."

### React

React is a JavaScript library for building user interfaces. It allows developers to create reusable UI components that manage their own state.

### React-DOM

React-DOM is a separate library that provides DOM-specific methods that enable React components to interact with the DOM. It is responsible for rendering React components to the DOM, as well as handling tasks like creating portals.

### JSX Transpiler

JSX (JavaScript XML) is a syntax extension for JavaScript that allows developers to write HTML-like code within JavaScript. Since browsers do not understand JSX, it must be transpiled into regular JavaScript using tools like Babel. The transpilation process converts JSX syntax into `React.createElement` function calls.

### Practical Use

While understanding these distinctions can be useful, in practice, you often use all three without even noticing. For example, when writing React code, you typically write JSX, which is then transpiled by Babel, and React-DOM handles the rendering to the DOM.

### Simplified View

For simplicity and ease of understanding, it's common to refer to the combined use of these technologies simply as "React." This approach helps to focus on building user interfaces without getting bogged down by the underlying technical distinctions.

### Example

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

const App = () => <h1>Hello, world!</h1>;

ReactDOM.render(<App />, document.getElementById('root'));
```

In the example above:
- `React` is used to create the component.
- `ReactDOM` is used to render the component to the DOM.
- JSX syntax is used to define the component, which is transpiled by Babel.

### Source:
* [Advanced React](https://www.advanced-react.com/)