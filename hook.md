# Hook
In react hook is a special function that lets you "hook into" React features like **state**, **lifecycle method**, 
**context**, and more without writing a class or component or higher order component. Hooks are a new addition in 
React 16.8 that lets you use state and other React features without writing a class.

Hooks make functional components more powerful and flexible, allowing you to write cleaner and more reusable code.

Hook cover most of the case of class component lifecycle methods and also provide a way to use state and other React
features without writing a class. Also it cover almost all the case where we need **render props** and **higher order 
components**.


### `useState`
### `useEffect`
### `useContext`
`useContext` is a hook that allows you to consume a context value from a parent component. It lets you subscribe to
React context without introducing nesting.

Some use case of context api is
* **Theme customization**: The useContext hook can be used to manage and apply custom themes for an application. That
  means it allows users to personalize the appearance of the application.
* **Support localization**: The context hook is helpful to implement localization by providing translated strings to 
  components based on the user's language/locale preference.
* **User authentication**: It can be used to manage user authentication or session status and display user specific 
  information with in components.

### `useReducer`
`useReducer` is a hook that is used for state management in React. It is an alternative to `useState`. It is usually
preferable to `useState` when you have complex state logic that involves multiple sub-values or when the next state
depends on the previous one.
### `useMemo`
`useMemo` is a hook that is used for memoization in React. It is used to optimize performance by memoizing the result
of a function so that it is not recomputed on every render. It is similar to `useEffect` but it is used to memoize
values instead of side effects.
### `useRef`

Some use cases of `useRef` are:
* **Accessing DOM elements**: The useRef hook can be used to access DOM elements directly within functional components.
  This is useful for managing focus, text selection, or media playback.
* **Storing mutable values**: useRef can store mutable values that persist across renders without causing re-renders. 
  This is useful for storing values that don't trigger re-renders but need to be accessed between renders.

**In class component it `React.createRef()` is used to create a ref and `this.myRef.current` is used to access the
ref value.**

### `useCallback`
`useCallback` is a hook that is used to memoize functions in React. It is used to optimize performance by memoizing
functions so that they are not recreated on every render. It is similar to `useMemo` but it is used to memoize functions
instead of values.
### `useImperativeHandle`
`useImperativeHandle` is a hook that is used to customize the instance value that is exposed to parent components when
using `React.forwardRef`. It allows you to specify which values should be exposed to the parent component when using
`ref`.
### `useLayoutEffect`
### `useDebugValue`

## Hooks vs Lifecycle Methods in Class Components
Hooks doesn't cover all use cases of classes but there is a plan to add them soon. Currently there are no Hook 
equivalents to the uncommon `getSnapshotBeforeUpdate` and `componentDidCatch` lifecycles yet.

### References
* [reactjs-interview-questions - github](https://github.com/sudheerj/reactjs-interview-questions)
