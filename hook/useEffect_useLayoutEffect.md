# Differences Between useEffect and useLayoutEffect

## What are the Differences Between useEffect and useLayoutEffect Hooks?

`useEffect` and `useLayoutEffect` are both React hooks that synchronize a component with an external system, such as a 
browser API or a third-party library. However, there are key differences:

### 1. Timing

- `useEffect` runs **after the browser has finished painting**.
- `useLayoutEffect` runs **synchronously before the browser paints**.
- This means `useLayoutEffect` can be used to measure and update layout synchronously.

### 2. Browser Paint

- `useEffect` allows the browser to paint **before running the effect**, which may cause visual flickers.
- `useLayoutEffect` runs **before the browser paints**, preventing flickers in UI updates.

### 3. Execution Order

- The execution order of multiple `useEffect` hooks is determined by React and may not be predictable.
- `useLayoutEffect` hooks **run in the order they are defined**, making them more predictable.

### 4. Error Handling

- `useEffect` has a built-in mechanism for handling errors, preventing application crashes.
- `useLayoutEffect` does **not** have this mechanism, meaning errors during execution may crash the entire app.

### 5. DOM Element Availability

- **`useEffect`**: The DOM elements are **available but may not be fully painted**.
- **`useLayoutEffect`**: The DOM elements are **fully available before the effect runs**, making it ideal for layout 
  measurements.

### 6. `document.getElementById` Inside useEffect and useLayoutEffect

- `document.getElementById` **works inside both** `useEffect` and `useLayoutEffect`.
- However, if you need to **read or measure** the DOM immediately after rendering, use `useLayoutEffect` to ensure the 
  element is fully available.
- If you simply need to interact with the element after rendering is complete, `useEffect` is sufficient.

### When to Use Which?

- \*\*Use \*\***`useEffect`** as much as possible because it is more performant and less prone to errors.
- \*\*Use \*\***`useLayoutEffect`** only when measuring or updating layout before the paint, and when `useEffect` isn't
  sufficient.


### References
* [reactjs-interview-questions - github](www.github.com/sudheerj/reactjs-interview-questions)