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




### References
* [reactjs-interview-questions - github](https://github.com/sudheerj/reactjs-interview-questions)