```jsx
const Component = () => {

    const submit = () => {};

    useEffect(() => {
        // call the function here
        submit();
    // it's declared outside of the useEffect
    // so should be in the dependencies
    }, [submit]);
    
    return ...
}
```
As we are using `submit` function on `useEffect` we need to add it to the dependencies array. But at every re-render 
`submit` function will be created and as for object or function it will be a new reference. So, it will be called at every
re-render it will be created. So after re-render value of submit will be changed so `useEffect` will be called again and 
again. So, it will be an infinite loop. So, we need to use `useCallback` to prevent this.

```jsx
const Component = () => {

    const submit = useCallback(() => {}, []);

    useEffect(() => {
        // call the function here
        submit();
    }, [submit]);
    
    return ...
}
```
As, `submit` is now a memoized function it will not be created at every re-render. If we put dependency in `useCallback` 
then it will be created on that dependency change. So, for now it will be created only once.

We can do the same thing with `useMemo`
```jsx
const submit = useMemo(() => {
    return () => {
        // this is out submit function - it's returned from the function that is passed to memo
    };
}, []);
```


# React.memo
`React.memo` is a higher-order component that memorizes the component. It's similar to `PureComponent` but for functional
components. It's used to prevent unnecessary re-renders of a component by memorizing the component's props. When the 
parent component re-renders, `React.memo` will compare the previous and current props. If the props have not changed, 
the component will not re-render. Similarly, the component under it will not re-render. **It's similar to 
`shouldComponentUpdate` in class components.**

## Basic Usage

```jsx
const MyComponent = React.memo(function MyComponent(props) {
  /* only re-renders if props change */
});
``` 

## Common Pitfall

In this example, `React.memo` will not prevent the re-render of `MyComponent`.

```jsx
const Child = ({ data, onChange }) => {};
const ChildMemo = React.memo(Child);

const Component = () => {
    // object and function declared inline
    const data = {....}
    const onChange = () => {...}
    
    // will change with every re-render
    return <ChildMemo data={data} onChange={onChange} />
}
```

### Explanation

In this case, `ChildMemo` will re-render at every render as the `data` object and `onChange` function declared inline
will be created at every render. So, it will be a new reference at every render. That's why `ChildMemo` will get new 
reference at every re-render and the `ChlidMemo` will be rerender every time.

## Solution

We can fix this issue using `useMemo` and `useCallback`.

```jsx
const Child = ({ data, onChange }) => {};
const ChildMemo = React.memo(Child);

const Component = () => {
    // data and onChange now have stable reference
    const data = useMemo(() => ({ ...some_object }), []); // some object
    const onChange = useCallback(() => {}, []); // some callback

    // re-renders of ChildMemo will be prevented
    return <ChildMemo data={data} onChange={onChange} />
}
```

### Explanation

By using `useMemo` and `useCallback`, we can prevent unnecessary re-renders of the `ChildMemo` component.

* `useMemo` - Returns a memoized value. It only recalculates the value when one of the dependencies has changed. This
  helps to keep the reference of the object stable.
* `useCallback` - Returns a memoized callback. It only changes if one of the dependencies has changed. This helps to 
  keep the reference of the function stable.

## Summary

- `React.memo` is used to memorize functional components.
- It prevents unnecessary re-renders by comparing previous and current props.
- Be cautious with inline object and function declarations as they create new references on each render.
- Use `useMemo` and `useCallback` to keep references stable and prevent unnecessary re-renders.

## React.memo and props from props
`React.memo` is a higher-order component that memorizes the component. It's similar to `PureComponent` but for 
functional components. It's used to prevent unnecessary re-renders of a component by memorizing the component's props. 
However, there are certain nuances and pitfalls in using `React.memo` effectively.

In this example, `React.memo` will not prevent the re-render of `ChildMemo`:

```jsx
const Child = ({ data, onChange }) => {};
const ChildMemo = React.memo(Child);

const Component = (props) => {
  return <ChildMemo {...props} />;
};

const ComponentInBetween = (props) => {
  return <Component {...props} />;
};

const InitialComponent = (props) => {
  // this one will have state and will trigger re-render of Component
  return (
    <ComponentInBetween {...props} data={{ id: '1' }} />
  );
};
```

In this case, the `InitialComponent` breaks the memoization of the `ChildMemo` component since it passes a non-memoized `data` prop to it. This is especially problematic when dealing with deeply nested components spread across different files.

### Rules for Effective Usage of React.memo

#### Rule 1: Never spread props coming from other components

Instead of this:

```jsx
const Component = (props) => {
  return <ChildMemo {...props} />;
};
```

Use explicit props like this:

```jsx
const Component = (props) => {
  return <ChildMemo some={props.some} other={props.other} />;
};
```

#### Rule 2: Avoid passing non-primitive props from other components

Even with explicit props, memoization will break if any of those props are non-memoized objects or functions. Those will
break memoization and cause unnecessary re-renders.

```jsx
const Component = (props) => {
  return <ChildMemo some={props.some} other={props.other} />;
};
```
Instead, memoize the non-primitive props:

```jsx
const Component = (props) => {
  const some = useMemo(() => props.some, [props.some]);
  const other = useMemo(() => props.other, [props.other]);
  return <ChildMemo some={some} other={other} />;
};
```

#### Rule 3: Avoid passing non-primitive values from custom hooks

Custom hooks are convenient but can hide whether data or functions have stable references.

Consider this:

```jsx
const Component = () => {
  const { submit } = useForm();
  return <ChildMemo onChange={submit} />;
};
```

The `submit` function is hidden in the `useForm` custom hook and might break memoization.

Example `useForm` hook:

```jsx
const useForm = () => {
  // lots and lots of code to control the form state
  const submit = () => {
    // do something on submit, like data validation
  };
  return {
    submit,
  };
};
```

By passing the `submit` function to `ChildMemo`, its memoization is broken.

### Summary

- `React.memo` is used to memorize functional components.
- It prevents unnecessary re-renders by comparing previous and current props.
- Follow these rules to ensure effective memoization:
    - Never spread props from other components.
    - Avoid passing non-primitive props from other components.
    - Avoid passing non-primitive values from custom hooks.



# `useMemo` vs `useCallback`
* `useMemo` is used to memoize the **value** and `useCallback` is used to memoize the **function**.
* `useCallback` re-creates the **function** passed to it with each render, while `useMemo` only re-creates the **value** 
   returned by the function passed to it when its dependencies change.

Sometime people think `useMemo` is better than `useCallback` as `useCallback` re-create the function at every render and
`useMemo` only re-create the value when dependency changes. But, it's not true. `useCallback` is used to memoize the 
function and `useMemo` is used to memoize the value. So, it's better to use `useCallback` when we need to memoize the 
function and `useMemo` when we need to memoize the value.

The only time that I can think of where it would actually matter, in theory, is when we pass as the first argument not 
the function itself, but a result of another function execution hardcoded inline. Basically this:
```js
const submit = useCallback(something(), []);
```
We should avoid this as it will be created at every render. So, we should use `useMemo` in this case. But, it's better to
avoid this kind of code. We should always pass the function itself to `useCallback`. 



## When Should We Memoize?
### When a prop is used as a dependency in another hook downstream component

Memoization can be crucial in optimizing performance and preventing unnecessary re-renders in React components. Here’s 
an example of when and how to use memoization in a React component when a prop is used as a dependency in another hook 
in a downstream component.

### Example

Let's say we have a parent component `ParentComponent` that passes a prop to a child component `ChildComponent`. The 
child component uses this prop in a `useEffect` hook. We can use `useMemo` in the parent component to ensure that the
prop is only re-computed when necessary.

```jsx
import React, { useState, useMemo, useEffect } from 'react';

const ParentComponent = () => {
  const [count, setCount] = useState(0);

  // Memoize the complex object so it only changes when `count` changes
  const memoizedProp = useMemo(() => {
    return { value: count };
  }, [count]);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <ChildComponent prop={memoizedProp} />
    </div>
  );
};

const ChildComponent = ({ prop }) => {
  useEffect(() => {
    // This effect will only run when `prop` changes
    console.log('Prop changed:', prop);
  }, [prop]);

  return <div>Prop Value: {prop.value}</div>;
};

export default ParentComponent;
```

### Explanation

1. **ParentComponent**:
   - `count` is a state variable that changes when the button is clicked.
   - `memoizedProp` is a memoized object that will only change when `count` changes.
   - `useMemo` is used to prevent re-computation of the object unless `count` changes.

2. **ChildComponent**:
   - The `useEffect` hook in `ChildComponent` depends on the `prop` object.
   - Since `prop` is memoized in `ParentComponent`, the `useEffect` will only run when `prop` actually changes.

### Benefits

- **Performance**: Reduces unnecessary re-renders and computations, improving performance.
- **Stability**: Ensures that downstream hooks and components only react to genuine changes in dependencies.

By memorizing the prop, we ensure that `ChildComponent`'s `useEffect` hook only runs when necessary, thus optimizing the
component's performance.



## Anti-Pattern
### Memorizing a props

```jsx
const Component = () => {
   const onClick = useCallback(() => {
      // do something on click
   }, []);

   return <button onClick={onClick}>click me</button>;
};
```
In this case, `onClick` is not dependent on any props or state. So, we don't need to memoize it. It's better to use it
directly. So, we should not use `useCallback` in this case.

### Memorizing a function that doesn't use any props or state

```jsx
const Component = () => {
   const onClick = useCallback(() => {
      // do something on click
   }, []);

   return <button onClick={onClick}>click me</button>;
};
```
In this case, `onClick` is not dependent on any props or state. So, we don't need to memoize it. It's better to use it

