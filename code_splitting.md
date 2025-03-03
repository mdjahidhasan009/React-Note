# Code-Splitting
Code-splitting is a feature supported by bundlers like Webpack and Browserify that allows you to create multiple bundles
that can be dynamically loaded at runtime. This can significantly improve the initial load time of your application. 
React projects commonly support code-splitting through the dynamic `import()` feature.

Essentially, instead of one large bundle containing all your application's code, you break it into smaller, more 
manageable chunks. These chunks are then loaded only when they are needed.

**Example:**

Let's say you have a module, `moduleA.js`:

```javascript
// moduleA.js
const moduleA = "Hello";

export { moduleA };
```

You can use dynamic `import()` in your `App.js` component to load this module only when a specific action (like a button
click) occurs:

**Functional Component Example (App.js):**

```javascript
// App.js
export default function App() {
  function handleClick() {
    import("./moduleA")
      .then(({ moduleA }) => {
        // Use moduleA
        console.log(moduleA); // Example: Logs "Hello" to the console
      })
      .catch((err) => {
        // Handle failure
        console.error("Failed to load moduleA:", err);
      });
  };

  return (
    <div>
      <button onClick={handleClick}>Load</button>
    </div>
  );
}
```

**Class Component Example (App.js):**

```javascript
import React, { Component } from "react";

class App extends Component {
  handleClick = () => {
    import("./moduleA")
      .then(({ moduleA }) => {
        // Use moduleA
        console.log(moduleA); // Example: Logs "Hello" to the console
      })
      .catch((err) => {
        // Handle failure
        console.error("Failed to load moduleA:", err);
      });
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Load</button>
      </div>
    );
  }
}

export default App;
```

**Explanation:**

* `import("./moduleA")`: This is the dynamic import. It returns a Promise.
* `.then(({ moduleA }) => { ... })`:  When the module is successfully loaded, the `then` block executes.  The object
  destructured using `({ moduleA })` retrieves the exported `moduleA` from the loaded module.
* `.catch((err) => { ... })`:  If there's an error loading the module, the `catch` block executes, allowing you to 
  handle the error gracefully (e.g., display an error message to the user).
* The bundler (Webpack, etc.) will create a separate chunk for `moduleA.js` and its dependencies. This chunk will only
  be downloaded when the "Load" button is clicked, reducing the initial bundle size and improving page load performance.

**Benefits of Code-Splitting:**

*   **Improved Initial Load Time:**  Users don't have to download code they don't immediately need.
*   **Reduced Bundle Size:** Smaller initial bundle size leads to faster download times.
*   **Better User Experience:**  Faster initial load results in a more responsive and enjoyable experience for users.
*   **Efficient Resource Utilization:**  Code is only loaded when it's required, saving bandwidth and resources.

#### Another example of code-splitting using React.lazy and Suspense:

```javascript
import React, { Suspense } from "react";

const OtherComponent = React.lazy(() => import("./OtherComponent"));

const MyComponent = () => (
  <div>
    <Suspense fallback={<div>Loading...</div>}>
      <OtherComponent />
    </Suspense>
  </div>
);
```

In this example, `OtherComponent` is loaded lazily when it's needed. The `Suspense` component allows you to show a loading
indicator while the component is being loaded.

Route based code splitting
```jsx
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { Suspense, lazy } from "react";

const Home = lazy(() => import("./routes/Home"));
const About = lazy(() => import("./routes/About"));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
      </Switch>
    </Suspense>
  </Router>
);
```

### References
* [reactjs-interview-questions - github](https://github.com/sudheerj/reactjs-interview-questions)