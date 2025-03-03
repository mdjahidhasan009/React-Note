# React
React is an open-source frontend JavaScript **library** that is used for building **user interfaces**, especially for 
**single-page applications**. It is used for **handling view layer** for web and mobile apps. React was created by 
Jordan walke, a software engineer working at Facebook. React was first deployed on Facebook's News Feed in 2011 and on
Instagram in 2012.

## Key Features
* Uses **JSX syntax**, a syntax **extension of JS** that allows developers to **write HTML in their JS code**.
* It uses **virtualDOM** instead of real DOM considering that real DOM manipulation are expensive.
* Supports **server-side rendering** which is useful for Search Engine Optimizations(SEO) and faster initial page loads.
* Follows **unidirectional or one-way** data flow or data binding.
* Uses **reusable/composable** UI components to develop the **view**.


## Advantages
* Increase the application's performance with **virtualDOM**.
* JSX makes code **readable** and **easy to debug**.
* It render in both **client** and **server** side. SEO friendly.
* Easy to **integrate** with other frameworks like **Angular**, **Backbone**.
* **Reusable** components.
* **One-way data binding**.
* **Simplicity** and **scalability**.
* Easy to write unit and integration tests.

## Disadvantages
* React is just a **view library** not a full **framework**. We need to use other libraries for **state management**, 
  **routing** etc.
* The library is **complex** and **hard to learn**.
* Integrating React into a traditional MVC framework requires **complex configuration**.
* Code complexity increases with inline templating and **JSX**.
* Too many smaller components can lead to over engineering and boilerplate.


# Enable Production Mode
You should use Webpack's `DefinePlugin` method to set `NODE_ENV` to `production`, by which it strip out things like 
`propType` validation and extra warnings. Apart from this, if you minify the code, for example, Uglify's dead-code
elimination to strip out development only code and comments, it will drastically reduce the size of your bundle.

# Mixin
*Mixins* are a way to totally separate components to have a common functionality. Mixins **should not be used** and can 
be replaced with *higher-order components* or *decorators*.

One of the most commonly used mixins is `PureRenderMixin`. You might be using it in some components to prevent 
unnecessary re-renders when the props and state are shallowly equal to the previous props and state:
```jsx
const PureRenderMixin = require("react-addons-pure-render-mixin");

const Button = React.createClass({
  mixins: [PureRenderMixin],
  // ...
});
```

## React vs ReactDOM

The `react` package contains `React.createElement()`, `React.Component`, `React.Children`, and other helpers related to
elements and component classes. These are the isomorphic or universal helpers needed to build components.

The `react-dom` package contains `ReactDOM.render()`, and in `react-dom/server`, we have server-side rendering support 
with `ReactDOMServer.renderToString()` and `ReactDOMServer.renderToStaticMarkup()`.

---

## Why ReactDOM is separated from React?

The React team extracted all DOM-related features into a separate library called `ReactDOM`. React v0.14 was the first
release where the libraries were split.

By looking at some of the packages like `react-native`, `react-art`, `react-canvas`, and `react-three`, it became clear
that the essence of React is not tied to browsers or the DOM.

To support rendering in multiple environments, the React team split the main React package into two: `react` and
`react-dom`. This allows developers to write components that can be shared between the web version of React and React
Native.


## Get react version at runtime
```jsx
const REACT_VERSION = React.version;

ReactDOM.render(
  <div>{`React version: ${REACT_VERSION}`}</div>,
  document.getElementById("app")
);
```



## Composition over Inheritance in React: A Detailed Explanation

In React, the recommended approach for code reuse between components is **composition over inheritance**.  While
inheritance is a common pattern in object-oriented programming, it often leads to problems in React, particularly as 
applications grow in complexity.  Composition, on the other hand, provides a more flexible and maintainable way to share 
functionality.

### Why Inheritance is Not Preferred in React (with Example)

Let's illustrate the problems with inheritance in React using a concrete example. Imagine we're building a UI library
with different button components.

```javascript
// Button.js (Base Class - Using Inheritance)
class Button extends React.Component {
  render() {
    return (
            <button className={`base-button ${this.props.className || ''}`} onClick={this.props.onClick}>
              {this.props.children}
            </button>
    );
  }
}

// PrimaryButton.js (Inherits from Button)
class PrimaryButton extends Button {
  render() {
    return (
            <button className={`primary-button ${this.props.className || ''}`} onClick={this.props.onClick}>
              {this.props.children}
            </button>
    );
  }
}

// DangerButton.js (Inherits from Button)
class DangerButton extends Button {
  render() {
    return (
            <button className={`danger-button ${this.props.className || ''}`} onClick={this.props.onClick}>
              {this.props.children}
            </button>
    );
  }
}

// Usage
<PrimaryButton onClick={() => console.log("Primary")}>Click me</PrimaryButton>
<DangerButton onClick={() => console.log("Danger")}>Don't click me</DangerButton>
```
**Now, let's see how the problems arise:**
* **Tight Coupling:** If we change the base `Button` class (e.g., add a new prop or change the styling), it might 
  unintentionally affect `PrimaryButton` and `DangerButton`, even if they didn't rely on that specific change. For 
  example, if we add a `disabled` prop to the base `Button` and forget to handle it in the derived classes, they might 
  break.
* **Brittle Inheritance:** Imagine we later introduce a `SubmitButton` that also inherits from `Button`, but it needs 
  slightly different click behavior. We modify the base `Button`'s `onClick` handler to accommodate `SubmitButton`, but 
  this unintentionally breaks the click behavior of `PrimaryButton` and `DangerButton`. The inheritance hierarchy 
  becomes brittle and hard to manage.
* **Inflexible Hierarchies:** Suppose we want a button that is both primary *and* disabled. With inheritance, we'd need
  to create a `PrimaryDisabledButton` that inherits from both `PrimaryButton` and a new `DisabledButton` (leading to 
  more complexity or even multiple inheritance issues). With composition, we could simply compose the `PrimaryButton` 
  and a `Disabled` component.
* **Unnecessary Props/State:** If the base `Button` class had props or state related to, say, icons, but `DangerButton` 
  didn't need icons, `DangerButton` would still inherit those props, cluttering its interface.
* **Potential for Conflicts:** (Less relevant in this simple example, but more likely in larger component trees) If we
  had multiple levels of inheritance, there could be naming conflicts (e.g., if two parent classes had a prop with the
  same name).
* **Performance Concerns:** While usually minor, inheritance can have a slight performance impact.

**The Composition Approach (Preferred):**

#### The Composition Approach (Preferred):
```js
// Button.js (Reusable Component - Using Composition)
function Button(props) {
  const className = `base-button ${props.className || ''} ${props.primary ? 'primary-button' : ''} ${props.danger ? 'danger-button' : ''}`;
  return (
    <button className={className} onClick={props.onClick} disabled={props.disabled}>
      {props.children}
    </button>
  );
}

// Usage (Composition)
<Button primary onClick={() => console.log("Primary")}>Click me</Button>
<Button danger onClick={() => console.log("Danger")}>Don't click me</Button>
<Button primary disabled onClick={() => console.log("Primary Disabled")}>Click me (Disabled)</Button>
```
With composition, we pass `primary` or `danger` as props to the `Button` component, making it much more flexible and 
avoiding all the pitfalls of inheritance.  We can easily combine styles and behaviors without creating a complex 
inheritance tree.  If we need a new button variant, we simply pass different props to the `Button` component.  Changes 
to the `Button` component are less likely to break other parts of the application because the coupling is much looser.






### Props and Composition: The React Way

React provides two powerful mechanisms for code reuse: props and composition.  Both offer the flexibility needed to 
customize a component's appearance and behavior in a clear and safe manner.

**Props:** Props are used to pass data from a parent component to a child component.  They allow you to configure the
child component's appearance and behavior.

**Composition:** Composition involves wrapping one component within another.  The inner component can then receive data 
and callbacks via props, and the outer component can control the overall structure and layout.

**Example:**

```javascript
// Welcome.js (Reusable Component)
function Welcome(props) {
  return (
    <div>
      <h1>Hello, {props.name}!</h1>
      <p>{props.message}</p>
    </div>
  );
}

// App.js (Using Composition)
function App() {
  return (
    <div>
      <Welcome name="Alice" message="Welcome to our website!" />
      <Welcome name="Bob" message="Glad to see you here!" />
    </div>
  );
}

// AnotherComponent.js (Using different Composition)
function AnotherComponent() {
  return (
    <div>
      <h2>User Information</h2>
      <Welcome name="Charlie" message="You've been a member since 2020." />
    </div>
  )
}
```
In this example, the `Welcome` component is reusable.  We use composition in `App` and `AnotherComponent` to reuse
`Welcome` with different props.

### Reusing Non-UI Functionality
For reusing non-UI related logic (functions, objects, classes) between components, the recommended approach is to 
extract that logic into a separate JavaScript module.  Components can then import and use the module's functionality
without inheritance.

**Example:**

```javascript
// utils.js (Separate Module)
export function formatDate(date) {
  // ... date formatting logic ...
  return formattedDate;
}

export const someValue = 42;

export class MyClass {
  // ... class logic ...
}

// MyComponent.js
import { formatDate, someValue, MyClass } from './utils';

function MyComponent() {
  const formattedDate = formatDate(new Date());
  return (
    <div>
      <p>Today's date: {formattedDate}</p>
      <p>Some value: {someValue}</p>
      <MyClass />
    </div>
  );
}
```
This approach keeps your components focused on UI logic and makes the shared utility functions easily testable and
maintainable.

### Conclusion
Summary
Composition over inheritance is a core principle in React.  Use props and composition for reusing UI components and 
extract non-UI logic into separate modules. This leads to more flexible, maintainable, and less coupled code, especially
as your React applications grow in size and complexity.  It promotes better component organization and makes refactoring
and testing much easier.



## What are the advantages of React over Vue.js?

React has the following advantages over Vue.js:

- Gives more flexibility in large apps developing.
- Easier to test.
- Suitable for mobile apps creating.
- More information and solutions available.

**Note:** The above list of advantages are purely opinionated and it vary based on the professional experience. But
they are helpful as base parameters.

---

## What is the difference between React and Angular?

Let's see the difference between React and Angular in a table format.

| React                                                                                       | Angular                                                                                                                            |
|---------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------|
| React is a library and has only the View layer                                              | Angular is a framework and has complete MVC functionality                                                                          |
| React handles rendering on the server side                                                  | AngularJS renders only on the client side but Angular 2 and above renders on the server side                                       |
| React uses JSX that looks like HTML in JS which can be confusing                            | Angular follows the template approach for HTML, which makes code shorter and easy to understand                                    |
| React Native, which is a React type to build mobile applications are faster and more stable | Ionic, Angular's mobile native app is relatively less stable and slower                                                            |
| In React, data flows only in one way and hence debugging is easy                            | In Angular, data flows both way i.e it has two-way data binding between children and parent and hence debugging is often difficult |

**Note:** The above list of differences are purely opinionated and it vary based on the professional experience. But they are helpful as base parameters.




# Is it possible to use React without rendering HTML?

Yes, it is possible. Below are the possible options:

```javascript
render() {
  return false
}
```

```javascript
render() {
  return true
}
```

```javascript
render() {
  return null
}
```

**React version >= 16.0.0:**

```javascript
render() {
  return []
}
```

```javascript
render() {
  return ""
}
```

**React version >= 16.2.0:**

```javascript
render() {
  return <React.Fragment></React.Fragment>
}
```

```javascript
render() {
  return <></>
}
```

**React version >= 18.0.0:**

```javascript
render() {
  return undefined
}




### References
* [reactjs-interview-questions - github](https://github.com/sudheerj/reactjs-interview-questions)