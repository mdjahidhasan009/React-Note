# `react-router`
React Router is a powerful routing library built on top of React that helps you add new screens and flows to your 
application incredibly quickly, all while keeping the URL in sync with what's being displayed on the page.

## Add Google Analytics to React Router
```jsx
history.listen(function (location) {
  window.ga("set", "page", location.pathname + location.search);
  window.ga("send", "pageview", location.pathname + location.search);
});
```

## React Router vs history library
React Router is a routing library built on top of the `history` library. The history library is a standalone library 
that can be used to manipulate the browser's history stack and hash history.  It also provides memory history which is
useful for environments that don't have global history, such as mobile app development (React Native) and unit testing 
with Node.


## React Router Components: A Quick Reference (v6)
### Routers

React Router v6 offers several router components, each creating a specific history instance:
*   `<BrowserRouter>`: Uses the HTML5 history API (`pushState`) for navigation.  The most common choice for web 
  applications.  Keeps the URL clean (e.g., `/about`).  Creates a `browserHistory` instance.
*   `<HashRouter>`: Uses the hash portion of the URL (e.g., `/#/about`).  Useful for older browsers or when server-side
  configuration is limited.  Creates a `hashHistory` instance.
*   `<MemoryRouter>`: Stores the history in memory.  Useful for testing or non-browser environments.  Creates a 
  `memoryHistory` instance.
*   `<StaticRouter>`: Provides static routing for server-side rendering (SSR). Creates a `staticHistory` instance.

These router components make the properties and methods of the associated `history` instance available through the 
context in the `router` object.  This allows components to access and manipulate the navigation history.

### Navigation

*   `<Link>`: Creates a link for navigation.  Uses the `to` prop to specify the destination URL.  (e.g., 
  `<Link to="/about">About</Link>`)
*   `<NavLink>`: A special `<Link>` that adds an active class (or the class you specify with `activeClassName`) when the
  link's `to` prop matches the current URL.  Useful for styling active navigation items. (e.g.,
  `<NavLink to="/about" activeClassName="active">About</NavLink>`)

### Route Matching and Rendering

*   `<Route>`: Defines a route and the component to render when the URL matches the `path` prop.  (e.g., 
  `<Route path="/about" element={<About />} />`)  Note the use of the `element` prop in v6, which takes a JSX element.
*   `<Routes>`: Replaces `<Switch>` from v5.  It renders the *first* matching `<Route>` within it.  Essential for 
  preventing multiple routes from rendering at the same time.  (e.g., 
  `<Routes><Route path="/about" element={<About />} /><Route path="/" element={<Home />} /></Routes>`)
*   `<Navigate>`: Replaces `<Redirect>` from v5. Redirects the user to a different URL.  Uses the `to` prop to specify 
  the destination. (e.g., `<Navigate from="/old-route" to="/new-route" />`)

### Authentication (Custom Component)

*   `<PrivateRoute>`:  A custom component (not a standard React Router component) used to protect routes.  It checks if 
  the user is authenticated. If not, it redirects them to a login page.  This is implemented using a combination of 
  `<Route>`, authentication logic, and `<Navigate>`.

### Key Differences Summarized (v6)

*   `<Router>` Components: React Router v6 provides specific router components (`<BrowserRouter>`, `<HashRouter>`, etc.)
  each associated with a different type of history.
*   `<Routes>` vs. `<Switch>`: `<Routes>` in v6 replaces `<Switch>` in v5.  It serves the same purpose of rendering only 
  the first matching route.
*   `<Navigate>` vs. `<Redirect>`: `<Navigate>` in v6 replaces `<Redirect>` in v5.
*   `<Route>` `element` prop: In v6, the `component` prop of `<Route>` is replaced by the `element` prop, which takes a 
  JSX element (e.g., `<Route path="/about" element={<About />} />`).


## `push()` vs. `replace()` in History API

The `push()` and `replace()` methods of the History API are used for navigation, but they affect the browser history 
stack differently.
*   **`push()`:** Adds a new entry to the browser's history stack. This means the user can click the "Back" button to 
  navigate to the previous location.  It's like adding a new page to a stack of pages.
*   **`replace()`:** Replaces the current entry in the history stack with the new one. This means the user *cannot* go
  back to the previous location using the "Back" button. It's like replacing the top page on a stack with a new one.


## Programmatic Navigation and Query Parameters in React Router v4 and v6

This note covers programmatic navigation and handling query parameters in React Router v4.

## Programmatic Navigation in React Router v4 and v6

### React Router v4
React Router v4 offers several ways to navigate programmatically within components:

1.  **`withRouter()` Higher-Order Component:**
    The `withRouter()` HOC injects the `history` object as a prop to the wrapped component. This object provides 
   `push()` and `replace()` methods for navigation.

    ```javascript
    import { withRouter } from "react-router-dom"; // or 'react-router-native'

    const Button = withRouter(({ history }) => (
      <button
        type="button"
        onClick={() => {
          history.push("/new-location");
        }}
      >
        Click Me!
      </button>
    ));
    ```

2.  **`<Route>` Component and Render Props:**
    The `<Route>` component also passes the `history` prop, allowing access to navigation methods through render props.
    ```javascript
    import { Route } from "react-router-dom";

    const Button = () => (
      <Route
        render={({ history }) => (
          <button
            type="button"
            onClick={() => {
              history.push("/new-location");
            }}
          >
            Click Me!
          </button>
        )}
      />
    );
    ```

3.  **Context (Not Recommended):**
    Using context for navigation is generally discouraged as it's considered an unstable API.
    ```javascript
    const Button = (props, context) => (
      <button
        type="button"
        onClick={() => {
          context.history.push("/new-location");
        }}
      >
        Click Me!
      </button>
    );

    Button.contextTypes = {
      history: React.PropTypes.shape({
        push: React.PropTypes.func.isRequired,
      }),
    };
    ```

### React Router v6
    
React router v6 uses the `useNavigate` hook for programmatic navigation.  It's a cleaner and more concise way to 
navigate programmatically.

```jsx
import { useNavigate } from 'react-router-dom';

function MyComponent() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/new-location'); // Basic navigation
        navigate('/new-location?param1=value1&param2=value2'); // With query parameters
        navigate('/new-location', { state: { data: someData }}); // With state
    };

    return (
        <button onClick={handleClick}>Navigate</button>
    );
}
```

## Handling Query Parameters

### React Router v4

React Router v4 removed built-in query string parsing.  The recommended approach is to use a dedicated library like `query-string`:

```javascript
const queryString = require("query-string");
const parsed = queryString.parse(props.location.search);

// Accessing individual parameters:
const name = parsed.name;
const id = parsed.id;
```

Alternatively, you can use the native `URLSearchParams` API:

```js
const params = new URLSearchParams(props.location.search);
const name = params.get("name");
const id = params.get("id");
```
Remember to include a polyfill for `URLSearchParams` if you need to support older browsers like IE11.  For example, you 
could use the `url-search-params-polyfill` package.  This will ensure that `URLSearchParams` is available even in 
browsers that don't natively support it.

### React Router v6

In React Router v6, you can use the `useSearchParams` hook to access query parameters:

```jsx
import { useSearchParams } from 'react-router-dom';

function MyComponent() {
    const [searchParams] = useSearchParams();

    const name = searchParams.get("name");
    const id = searchParams.get("id");

    return (
        // JSX
    );
}
```

**Key Differences between v4 and v6:**

*   **Navigation:** v6 primarily uses the `useNavigate` hook, while v4 uses `withRouter` or render props with the
  `<Route>` component.
*   **Query Parameters:** Query parameters are handled the same way in both v4 and v6 (using `URLSearchParams`), but the
  way you get the `location` object to access them is different (using `useLocation` in v6).
*   **State:** Passing state is done similarly in both versions (using the `state` option), but the way you access the
  state is different (using `useLocation` in v6).


## Passing Parameters with `history.push()` in React Router v4 and v6

This note explains how to pass parameters using `history.push()` in React Router v4 and v6, detailing the `pathname`, 
`search`, and `state` properties.

### React Router v4

In React Router v4, you can pass parameters to the `history.push()` method using an object with the following 
properties:

*   **`pathname`:** The URL path to navigate to (e.g., `"/template"`).
*   **`search`:** The query string (e.g., `"?name=sudheer"`).  This is the standard way to pass query parameters.
*   **`state`:** An object containing any additional data you want to pass.  This data is available in the
  `location.state` property of the component you navigate to.  It's useful for passing data that shouldn't appear in the
  URL.

**Example (v4):**

```javascript
this.props.history.push({
  pathname: "/template",
  search: "?name=sudheer",
  state: { detail: response.data },
});
```

In the component at `/template`, you can access these parameters like this:
```jsx
// Accessing query parameters:
const queryParams = new URLSearchParams(this.props.location.search);
const name = queryParams.get("name"); // "sudheer"

// Accessing state:
const detail = this.props.location.state.detail; // response.data
```

### React Router v6

In React Router v6, the approach is slightly different, but the core concepts remain the same.  You can use the `useNavigate` hook for programmatic navigation.

*   `pathname`: The URL path.
*   `search`: The query string.
*   `state`: The state object.

**Example (v6):**

```javascript
import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/template?name=sudheer', { state: { detail: response.data } });
  };

  return (
    <button onClick={handleClick}>Navigate</button>
  );
}
```

In the component at `/template`, you can access these parameters using the `useLocation` hook:

```javascript
import { useLocation } from 'react-router-dom';

function TemplateComponent() {
  const location = useLocation();

  // Accessing query parameters (same as v4):
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("name"); // "sudheer"

  // Accessing state:
  const detail = location.state.detail; // response.data

  return (
      // ...
  )
}
```
**Key Differences between v4 and v6:**

*   **Navigation Hook:** v6 uses the `useNavigate` hook for programmatic navigation, while v4 often uses `withRouter` or
  render props.
*   **State Access:** In both versions, you access the state via `location.state`, but in v6, you get the `location` 
  object using the `useLocation` hook.  Query parameter access is the same using `URLSearchParams`.

**Summary:**

*   `pathname` specifies the URL path.
*   `search` is used for query parameters.
*   `state` allows passing additional data that is not part of the URL.  It's accessed via `location.state`.  Use 
  `URLSearchParams` to access query parameters.  The method of programmatic navigation and accessing location
  information differs slightly between v4 and v6.



## Accessing History in React Router v4 and v6
### React Router v4

In React Router v4, you can create and manage your own history object. This is typically done to have more control over
the history stack or to use a custom history implementation.

1.  **Create a History Module:**
    Create a module (e.g., `history.js`) that exports a history object:
    ```javascript
    import { createBrowserHistory } from "history";

    export default createBrowserHistory({
      /* pass a configuration object here if needed */
    });
    ```

2.  **Use the `<Router>` Component:**
    Instead of using built-in routers like `<BrowserRouter>`, use the `<Router>` component and pass your custom history 
    object as a prop:
    ```javascript
    import { Router } from "react-router-dom";
    import history from "./history";
    import App from "./App";
    import ReactDOM from 'react-dom/client'; // Import createRoot if you are using React 18 or above.

    const root = ReactDOM.createRoot(document.getElementById('holder')); // createRoot for react 18 or above
    root.render(
      <Router history={history}>
        <App />
      </Router>
    );

    // For react below 18
    // ReactDOM.render(
    //   <Router history={history}>
    //     <App />
    //   </Router>,
    //   document.getElementById('holder')
    // );
    ```

3.  **Use the History Object:**
    You can then import and use the history object in any component:
    ```javascript
    import history from "./history";

    // ... inside a component ...
    history.push("/go-here");
    ```

### React Router v6

In React Router v6, you typically don't need to create and manage your own history object.  React Router v6 provides 
access to the history through the `useNavigate` and `useLocation` hooks.  Under the hood, it uses its own internal 
history management.

1.  **Use the `useNavigate` Hook:**

    The `useNavigate` hook returns a function that you can use to navigate.  This function internally uses the history 
    object.

    ```javascript
    import { useNavigate } from 'react-router-dom';

    function MyComponent() {
      const navigate = useNavigate();

      const handleClick = () => {
        navigate('/new-location'); // Programmatic navigation
      };

      return (
        <button onClick={handleClick}>Navigate</button>
      );
    }
    ```

2.  **Accessing Location Information (Including Path, Search, and State):**
    You can use the `useLocation` hook to access the current location information, which indirectly gives you 
    information about the navigation history.

    ```javascript
    import { useLocation } from 'react-router-dom';

    function MyComponent() {
        const location = useLocation();
        const pathname = location.pathname; // Current path
        const search = location.search;   // Current query string
        const state = location.state;     // Current location state

        // ...
    }
    ```

**Key Differences between v4 and v6:**

*   **History Management:**  In v4, you often create and manage your own history object.  In v6, React Router handles 
  history internally, and you interact with it through hooks.
*   **Navigation:** v4 uses `history.push()` directly (often accessed via `withRouter` or render props).  v6 uses the 
  `useNavigate` hook.
*   **Location Information:** In v4, location information (including path, search, and state) is often accessed through
  props passed to the component. In v6, you access it using the `useLocation` hook.  While the underlying concepts are 
  similar, the mechanism for accessing this information is different.


### References
* [reactjs-interview-questions - github](https://github.com/sudheerj/reactjs-interview-questions)