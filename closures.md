### Stale Closure
Every closure is frozen at the point when it's created. When we first called the something function, we created a
closure that has "first" in the value variable. And then, we saved it in an object that sits outside of the something
function.

```js
const cache = {};

const something = (value) => {
    if (!cache.current) {
        cache.current = () => {
        console.log(value);
    };
}
    
    return cache.current;
};

const first = something('first');
const second = something('second');
const third = something('third');

first(); // logs "first"
second(); // logs "first"
third(); // logs "first"
```

We can fix this by using `prevValue` something like this:
```js
const cache = {};
let prevValue;

const something = (value) => {
    // check whether the value has changed
    if (!cache.current || value !== prevValue) {
        cache.current = () => {
            console.log(value);
        };
    }
    
    // refresh it
    prevValue = value;
    return cache.current;
};

const first = something('first');
const anotherFirst = something('first');
const second = something('second');

first(); // logs "first"
second(); // logs "second"
console.log(first === anotherFirst); // will be true
```

`useCallback` always create a closure, that's why we need dependency array so that if the state changes the closure will
be recreated. So that we can get the latest value of the state.

```js
const Component = () => {
    const [state, setState] = useState();
    
    const onClick = useCallback(() => {
        // perfectly fine
        console.log(state);
    }, [state]);
};
```

---

Memoization with `useMemo`, `useCallback` and `React.memo`, every prop on a component wrapped in `React.memo` needs to
be either a primitive value or persistent between re-renders. Otherwise, memoization won't work. So technically, we need
to wrap our `onClick` in `useCallback` :

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
the `value` is not memorized. But if we put `console.log` outside of the `onClick` function then it will print the current
value. 

```js
// those one logs it correctly
console.log(value);

const onClick = () => {
    // this is always undefined
    console.log(value);
};
```

To fix this we need to add the `value` to the `onClick` function dependencies. But that will cause the 
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
        console.log(value); // this will always be the initial value which is undefined
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
    console.log(value); // this will always be the initial value which is undefined
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



**Now we need to add an onClick function that is stable between re-renders but also has access to the latest state
without re-creating itself.**

Every time if the function need the latest state we need to re-create the function it is not problem of react but it is
a problem of JavaScript's closure.


The `useEffect` with no dependencies is called every time the component re-renders. This is because the `useEffect` is
called after the component is rendered. So, the `ref.current` will always have the latest value of the state.

The `onClick` function we do not directly access the state value like before. Instead, we use a ref to store the latest 
value of the state. `ref.current` stores the reference address of the latest state value. 

Now the heavy component will only re-render when the title changes. The `onClick` function will always have the latest
state value. 

```js
const Form = () => {
    const [value, setValue] = useState();
    const ref = useRef();

    useEffect(() => {
        ref.current = () => {
            // will be latest
            console.log(value);
        };
    });

    const onClick = useCallback(() => {
        // will be latest
        ref.current?.();
    }, []);
    
    return (
        <>
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <HeavyComponentMemo
                title="Welcome closures"
                onClick={onClick}
            />
        </>
    );
};
```

<details>
<summary>Detail Code</summary>

```tsx
import React, { useCallback, useEffect, useRef, useState } from 'react';

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

const HeavyComponentMemo = React.memo(HeavyComponent);

export default function App() {
  const [value, setValue] = useState<string>();
  const ref = useRef<() => void>();

  useEffect(() => {
    ref.current = () => {
      console.log(value);
    };
  });

  const onClick = useCallback(() => {
    ref.current?.();
  }, []);

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

Source: https://www.advanced-react.com/examples/10/05
</details>




# References
* [Advanced React](https://www.advanced-react.com/)
