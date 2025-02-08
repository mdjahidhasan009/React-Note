# Class Component Lifecycle

## `componentDidMount`
Called after the component is mounted to the DOM. This is a good place to make network requests or initialize the state
of the component.

```jsx
componentDidMount() {
  // Make a network request
  fetch("https://api.example.com/data")
    .then(response => response.json())
    .then(data => this.setState({ data }));
}
```

## `componentDidUpdate`
Called after the component updates. This is a good place to perform network requests when the props or state change.

```jsx
componentDidUpdate(prevProps, prevState) {
  if (this.props.userID !== prevProps.userID) {
    this.fetchData(this.props.userID);
  }
}
```

## `componentWillUnmount`
Called before the component is removed from the DOM. This is a good place to clean up any resources used by the component.

```jsx
componentWillUnmount() {
  // Clean up resources
  window.removeEventListener("resize", this.handleResize);
}
```

## `shouldComponentUpdate`
Called before the component updates. This method should return `true` if the component should update, or `false` if it
should not. By default, this method returns `true`.

```jsx
shouldComponentUpdate(nextProps, nextState) {
  if (this.props.userID !== nextProps.userID) {
    return true;
  }
  return false;
}
```

## `getDerivedStateFromProps`
Called before the component updates when new props are received. This method should return an object to update the state,
or `null` to indicate that the new props do not require any state updates.

```jsx
static getDerivedStateFromProps(props, state) {
  if (props.userID !== state.userID) {
    return { userID: props.userID };
  }
  return null;
}
```

## `getSnapshotBeforeUpdate`
Called before the component updates. This method should return a value to be passed to `componentDidUpdate`, or `null` if
no value is needed.

```jsx
getSnapshotBeforeUpdate(prevProps, prevState) {
  if (prevProps.list.length < this.props.list.length) {
    return this.listRef.scrollHeight;
  }
  return null;
}

componentDidUpdate(prevProps, prevState, snapshot) {
  if (snapshot !== null) {
    this.listRef.scrollTop = this.listRef.scrollHeight - snapshot;
  }
}
```

## `componentDidCatch`
Called when an error occurs during rendering, in a lifecycle method, or in the constructor of any child component.

```jsx
componentDidCatch(error, info) {
  this.setState({ error, info });
}
```

* `error` - The error object which is thrown.
* `info` - An object with a `componentStack` key containing information about which component threw the error.

## `static getDerivedStateFromError`
Called after an error has been thrown by a descendant component. This method should return an object to update the state.

```jsx
static getDerivedStateFromError(error) {
  return { error };
}
```

## `componentWillReceiveProps`
Called when the component receives new props. This method is deprecated and should not be used in new code.

```jsx
componentWillReceiveProps(nextProps) {
  if (this.props.userID !== nextProps.userID) {
    this.fetchData(nextProps.userID);
  }
}
```

## `componentWillUpdate`
Called before the component updates. This method is deprecated and should not be used in new code.

```jsx
componentWillUpdate(nextProps, nextState) {
  if (this.props.userID !== nextProps.userID) {
    this.fetchData(nextProps.userID);
  }
}
```

## `componentWillMount`
Called before the component is mounted to the DOM. This method is deprecated and should not be used in new code.

```jsx
componentWillMount() {
  // Make a network request
  fetch("https://api.example.com/data")
    .then(response => response.json())
    .then(data => this.setState({ data }));
}
```







The component lifecycle has three distinct lifecycle phases:

*   **Mounting:** The component is ready to mount in the browser DOM. This phase covers initialization from `constructor()`, `getDerivedStateFromProps()`, `render()`, and `componentDidMount()` lifecycle methods.

*   **Updating:** In this phase, the component gets updated in two ways: sending the new props and updating the state either from `setState()` or `forceUpdate()`. This phase covers `getDerivedStateFromProps()`, `shouldComponentUpdate()`, `render()`, `getSnapshotBeforeUpdate()`, and `componentDidUpdate()` lifecycle methods.

*   **Unmounting:** In this last phase, the component is not needed and gets unmounted from the browser DOM. This phase includes the `componentWillUnmount()` lifecycle method.

It's worth mentioning that React internally has a concept of phases when applying changes to the DOM. They are separated as follows:

*   **Render:** The component will render without any side effects. This applies to Pure components, and in this phase, React can pause, abort, or restart the render.

*   **Pre-commit:** Before the component actually applies the changes to the DOM, there is a moment that allows React to read from the DOM through `getSnapshotBeforeUpdate()`.

*   **Commit:** React works with the DOM and executes the final lifecycles respectively: `componentDidMount()` for mounting, `componentDidUpdate()` for updating, and `componentWillUnmount()` for unmounting.


<img src="./images/life_cycle.png" alt="life_cycle" />

<img src="./images/life_cycle2.png" alt="life_cycle" />

Source: [reactjs-interview-questions - github](https://github.com/sudheerj/reactjs-interview-questions?tab=readme-ov-file#what-is-react)


---

# Before React 16.3

- **componentWillMount**: Executed before rendering and is used for App level configuration in your root component.

- **componentDidMount**: Executed after first rendering and here all AJAX requests, DOM or state updates, and set up event listeners should occur.

- **componentWillReceiveProps**: Executed when particular prop updates to trigger state transitions.

- **shouldComponentUpdate**: Determines if the component will be updated or not. By default it returns `true`. If you are sure that the component doesn't need to render after state or props are updated, you can return `false` value. It is a great place to improve performance as it allows you to prevent a re-render if component receives new prop.

- **componentWillUpdate**: Executed before re-rendering the component when there are props & state changes confirmed by `shouldComponentUpdate()` which returns `true`.

- **componentDidUpdate**: Mostly it is used to update the DOM in response to prop or state changes.

- **componentWillUnmount**: It will be used to cancel any outgoing network requests, or remove all event listeners associated with the component.

# React 16.3+

- **getDerivedStateFromProps**: Invoked right before calling `render()` and is invoked on **every** render. This exists for rare use cases where you need a derived state. Worth reading if you need derived state.

- **componentDidMount**: Executed after first rendering and where all AJAX requests, DOM or state updates, and set up event listeners should occur.

- **shouldComponentUpdate**: Determines if the component will be updated or not. By default, it returns `true`. If you are sure that the component doesn't need to render after the state or props are updated, you can return a `false` value. It is a great place to improve performance as it allows you to prevent a re-render if component receives a new prop.

- **getSnapshotBeforeUpdate**: Executed right before rendered output is committed to the DOM. Any value returned by this will be passed into `componentDidUpdate()`. This is useful to capture information from the DOM i.e. scroll position.

- **componentDidUpdate**: Mostly it is used to update the DOM in response to prop or state changes. This will not fire if `shouldComponentUpdate()` returns `false`.

- **componentWillUnmount**: It will be used to cancel any outgoing network requests, or remove all event listeners associated with the component.




### References
* [reactjs-interview-questions - github](https://github.com/sudheerj/reactjs-interview-questions?tab=readme-ov-file#what-is-react)
