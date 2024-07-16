# Stale Closure

Where we memorize the `HeavyComponent` using `React.memo` but the `onClick` function is not memorized because on 
`useCallback` we need to add the `value` as a dependency. This will cause the `onClick` function to be recreated
every time the `value` changes so the `HeavyComponent` will be re-rendered every time the `value` changes.

```js
const HeavyComponentMemo = React.memo(HeavyComponent);

const Form = () => {
    const [value, setValue] = useState();

    const onClick = useCallback(() => {
        // submit data here
        console.log(value);
        // adding value to the dependency
    }, [value]);

    return (
        <>
            <input 
                type="text" 
                value={value} 
                onChange={(e) => setValue(e.target.value)}
            />
            <HeavyComponentMemo 
                title="Welcome to the form" 
                onClick={onClick}
            />
        </>
    );
};
```

We can use the **comparison function** of the `React.memo` to reduce the re-rendering of the `HeavyComponent`. As just 
we need the value state on click we can compare `title` to determine if the `HeavyComponent` should be re-rendered or not.

But there is a problem if we type something and press the button the `value` in `onClick` will be `undefined` because
the `value` is not memorized. But if we put `console.log` outside of the `onClick` function then it will print the currect
value. To fix this we need to add the `value` to the `onClick` function dependencies. But that will cause the 
`HeavyComponent` to re-render every time the `value` changes.

This is known as stale closure. The `onClick` function is created with the `value` as a dependency. But the `value` is
not memorized so the `onClick` function will always have the initial value of the `value` state.
```js
const HeavyComponentMemo = React.memo(
    HeavyComponent, 
    (before, after) => {
        return before.title === after.title;
        },
);

const Form = () => {
    const [value, setValue] = useState();
    
    const onClick = () => {
        // submit our form data here
        console.log(value);
    };
    
    return (
        <>
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <HeavyComponentMemo
                title="Welcome to the form"
                onClick={onClick}
            />
        </>
    );
};
```

<details>
<summary>Detail Code</summary>

App.ts
```tsx
import React, { useState } from 'react';

type HeavyComponentProps = {
  onClick: () => void;
  title: string;
};

const HeavyComponent = ({ onClick, title }: HeavyComponentProps) => {
  return (
    <>
      <h3>{title}</h3>
      <p>Some other stuff here</p>
      <button className="button" onClick={onClick}>
        Done!
      </button>
    </>
  );
};

const HeavyComponentMemo = React.memo(HeavyComponent, (before, after) => {
  return before.title === after.title;
});

export default function App() {
  const [value, setValue] = useState<string>();

  const onClick = () => {
    // submit stuff to the backend
    console.log(value);
  };

  return (
    <div className="App">
      <h1>Closures example</h1>

      <>
        <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
        <HeavyComponentMemo title="Welcome closures" onClick={onClick} />
      </>
    </div>
  );
}
```

Source: https://www.advanced-react.com/examples/10/01
</details>


Everything is using `useEffect` or `useCallback` hook is a closure
```js
const Component = () => {
    const onClick = useCallback(() => {
        // closure!
    });

    useEffect(() => {
        // closure!
    });
};
```
All of them will have access to state, props, and local variables declared in the component:

Every single function inside a component is a closure since a component itself is just a function.
```js
const Component = () => {
    const [state, setState] = useState();
    
    const onClick = useCallback(() => {
        // perfectly fine
        console.log(state);
    });

    useEffect(() => {
        // perfectly fine
        console.log(state);
    });
};
```

p-204

# Sources
* [Advanced React](https://www.advanced-react.com/)