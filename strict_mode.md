# React Strict Mode

## What is Strict Mode in React?

`React.StrictMode` is a useful component for highlighting potential problems in an application. Just like `<Fragment>`, 
`<StrictMode>` does not render any extra DOM elements. It activates additional checks and warnings for its descendants.
These checks apply for development mode only.

```javascript
import { StrictMode } from "react";

function App() {
  return (
    <div>
      <Header />
      <StrictMode>
        <div>
          <ComponentOne />
          <ComponentTwo />
        </div>
      </StrictMode>
      <Header />
    </div>
  );
}
```

In the example above, the strict mode checks apply to `<ComponentOne>` and `<ComponentTwo>` components only, i.e., part 
of the application only.

**Note:** Frameworks such as NextJS have this flag enabled by default.

## What is the Benefit of Strict Mode?

Strict Mode is helpful in the following cases:

- To find bugs caused by impure rendering where the components will re-render twice.
- To find bugs caused by missing cleanup of effects where the components will re-run effects one extra time.
- Identifying components with unsafe lifecycle methods.
- Warning about legacy string ref API usage.
- Detecting unexpected side effects.
- Detecting legacy context API usage.
- Warning about deprecated `findDOMNode` usage.

## Why Does Strict Mode Render Twice in React?

StrictMode renders components twice in development mode (not production) in order to detect any problems with your code
and warn you about those problems. This is used to detect accidental side effects in the render phase. If you used the
`create-react-app` development tool, it automatically enables StrictMode by default.

```jsx
const root = createRoot(document.getElementById("root"));
root.render(
    <StrictMode>
        <App />
    </StrictMode>
);
```
If you want to disable this behavior, you can simply remove strict mode.

```jsx
const root = createRoot(document.getElementById("root"));
root.render(<App />);
```

To detect side effects, the following functions are invoked twice:

* Function component bodies, excluding the code inside event handlers.
* Functions passed to `useState`, `useMemo`, or `useReducer` (any other Hook).
* Class component's `constructor`, `render`, and `shouldComponentUpdate` methods.
* Class component static `getDerivedStateFromProps` method.
* State updater functions.

### References
* [reactjs-interview-questions - github](www.github.com/sudheerj/reactjs-interview-questions)