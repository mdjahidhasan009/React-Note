We should use the `ref` callback to store a reference to a DOM node. The `ref` callback gets executed with the DOM element when the component mounts, and it gets executed with `null` when the component unmounts. The `ref` callback gets executed before `componentDidMount` or `componentDidUpdate` lifecycle hooks.

**RefObject**
```jsx
function RefExample1() {
    const refObject = useRef();
    
    return <input ref={refObject} />;
}
```

**RefCallback**
```jsx
function RefExample2() {
    const refObject = useRef();
    
    const refCallback = (node) => {
        refObject.current = node;
    };
    
    return <input ref={refCallback} />;
}
```

If we want to make input element focus when the component mounts, ref object can be used as shown below:
```jsx
import React, { useRef, useEffect } from 'react';

function RefExample() {
    const refObject = useRef();
    
    useEffect(() => {
        refObject.current.focus();
    }, []);
    
    return <input ref={refObject} />;
}
export default RefExample;
```
But if we introduce visibility conditionally, we need to check if the ref object is not null before calling the focus method.
For more complex scenarios it could be more complex to handle the ref object.
```jsx
import { useState, useRef, useEffect } from "react";

function RefCallback() {
    const [isVisible, setIsVisible] = useState(false);
    const refObject = useRef();

    const clickHandler = () => {
        setIsVisible((isVisible) => !isVisible);
    };

    useEffect(() => {
        refObject.current.focus();
    }, []);

    return (
        <>
            {isVisible && <input ref={refObject} />}
            <button onClick={clickHandler}>Show/hide</button>
        </>
    );
}

export default RefCallback;
```

As initially input element is not present on the dom of if we click on the button to show the input element is null so
it will throw an error. To avoid this we can use optional chaining operator `?.` to check if the ref object is not null.
```jsx
import { useState, useRef, useEffect } from "react";

function RefCallback() {
    const [isVisible, setIsVisible] = useState(false);
    const refObject = useRef();

    const clickHandler = () => {
        setIsVisible((isVisible) => !isVisible);
    };

    useEffect(() => {
        refObject.current?.focus();
    }, []);

    return (
        <>
            {isVisible && <input ref={refObject} />}
            <button onClick={clickHandler}>Show/hide</button>
        </>
    );
}

export default RefCallback;
```
This will solve the error but focus will not work/called as the input element is not present on the dom. So to make it work
we need to use `useEffect` hook to run on the change of `isVisible` state also by checking if the ref object is not null.
```jsx
import { useState, useRef, useEffect } from "react";

function RefCallback() {
    const [isVisible, setIsVisible] = useState(false);
    const refObject = useRef();

    const clickHandler = () => {
        setIsVisible((isVisible) => !isVisible);
    };

    useEffect(() => {
        if (refObject.current) {
            refObject.current.focus();
        }
    }, [isVisible]);

    return (
        <>
            {isVisible && <input ref={refObject} />}
            <button onClick={clickHandler}>Show/hide</button>
        </>
    );
}
export default RefCallback;
```
But we have to maintain the connection is the dom node is mounted or not, with is visible state and useEffect hook. When
we have to do those kind of dom operation depending on more state variable, need to add more condition or state name change we have to need change the code and maintain
the connection between the state and useEffect hook. Also, we are triggering unnecessary rerendering of the component on mount.

```jsx
useEffect(() => {
    if(state1 && state2) {
        refObject.current.focus();
    }
}, [state1, state2])
```

`useEffect` ties with the component's lifecycle and it is not directly related to the ref object. On the other hand,
`callbackRef` is directly related to the ref object. So, we can use `callbackRef` to handle the ref object more easily.

**component lifecycle:** Component related logic
```
        mounting --->state/prop updates
        |                      |
        |                      |
        |                      |
        |                      |
        |                      |   
        <-----------------unmounting
```
**DOM Node's lifecycle:** DOM related logic
```
inserting to DOM tree --->callback ref identicy changes
        |                      |
        |                      |
        |                      |
        |                      |
        |                      |   
        <--------removing from the dom tree
```
Now for using refCallback we do not need to worry about the state change and useEffect hook. We can directly handle the ref object.
Also it will not run twice at react strict mode.
```jsx
import { useState } from "react";

function RefCallback() {
  const [isVisible, setIsVisible] = useState(false);
  const clickHandler = () => setIsVisible((isVisible) => !isVisible);

  return (
    <form>
      {isVisible && <input ref={(node) => {
        node?.focus();
      }} />}
      <button onClick={clickHandler}>Show/hide</button>
    </form>
  );
}

export default RefCallback;
```
**Caveats with callback refs**

If the ref callback is defined as an inline function, it will get called twice during updates, first with null and then 
again with the DOM element. This is because a new instance of the function is created with each render, so React needs to
clear the old ref and set up the new one. You can avoid this by defining the ref callback as a bound method on the class,
but note that it shouldn't matter in most cases.

To we can use to define a method to class and it will work only on class component.
```jsx
import React, { Component } from "react";

class RefCallbackClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
      count: 0,
    };
  }

  clickHandler = () => {
    // Handler logic
  };

  incrementHandler = () => {
    // Handler logic
  };

  boundedRefCallback = (node) => {
    console.log("Ref Callback: ", node);
    node?.focus();
  };

  render() {
    return (
      <>
        {this.state.isVisible && (
          <input
            ref={this.boundedRefCallback}
          />
        )}
        <br />
        <button onClick={this.clickHandler}>Show/hide</button>
        <button onClick={this.incrementHandler}>Increment</button>
      </>
    );
  }
}

export default RefCallbackClass;
```
Binding the class like this give Referential Stability. It means that the ref callback will not change between renders
<details>
    <summary>Referential Stability</summary>

Meaning a reference saved in boundedRefCallback is always pointing to the same function in memory. This function is not 
recreated on each render, so React can compare the reference to the previous one and determine if it needs to update the ref.
</details>

For functional component we can implement that like this
```jsx
import { useState, useCallback } from "react";

function RefCallback() {
  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount] = useState(0);
  const clickHandler = () => setIsVisible((isVisible) => !isVisible);
  const incrementHandler = () => setCount((count) => count + 1);

  const refCallback = useCallback((node) => {
    node?.focus();
  }, []);

  return (
    <form>
      {isVisible && <input ref={refCallback} />}
      <button onClick={clickHandler}>Show/hide</button>
      <button onClick={incrementHandler}>Increment</button>
    </form>
  );
}

export default RefCallback;
```
But useCallback and useMemo are not for reference stability. They are for performance optimization. So at some rare cases
our ref callback can regenerated because react engine may decide to purge the cache then they will randomly trigger causing
to be executed our logic which is not expected.

We can use `use-memo-one` library to get the reference stability for functional component.
```jsx
import { useState } from "react";
import { useCallbackOne } from "use-memo-one";

function RefCallback() {
  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount] = useState(0);
  const clickHandler = () => setIsVisible((isVisible) => !isVisible);
  const incrementHandler = () => setCount((count) => count + 1);

  const refCallback = useCallbackOne((node) => {
    node?.focus();
  });

  return (
    <form>
      {isVisible && <input ref={refCallback} />}
      <button onClick={clickHandler}>Show/hide</button>
      <button onClick={incrementHandler}>Increment</button>
    </form>
  );
}

export default RefCallback;
```
But we can use `useRef` hook to get the reference stability for functional component.
```jsx
import { useState, useRef } from "react";

function RefCallback() {
  const [isVisible, setIsVisible] = useState(true);
  const [count, setCount] = useState(0);
  const clickHandler = () => setIsVisible((isVisible) => !isVisible);
  const incrementHandler = () => setCount((count) => count + 1);

  const refCallback = useRef((node) => {
    node?.focus();
  });

  return (
    <form>
      {isVisible && <input ref={refCallback.current} />}
      <br />
      <button onClick={clickHandler}>Show/hide</button>
      <button onClick={incrementHandler}>Increment</button>
    </form>
  );
}

export default RefCallback;
```
We can remove the function out of the function at the module scope and use it in the component. This will give us the reference stability
without any extra library.
```jsx
import { useState } from "react";

const refCallback = (node) => {
  node?.focus();
};

function RefCallback() {
  const [isVisible, setIsVisible] = useState(true);
  const [count, setCount] = useState(0);
  const clickHandler = () => setIsVisible((isVisible) => !isVisible);
  const incrementHandler = () => setCount((count) => count + 1);

  return (
    <form>
      {isVisible && <input ref={refCallback} />}
      <br />
      <button onClick={clickHandler}>Show/hide</button>
      <button onClick={incrementHandler}>Increment</button>
    </form>
  );
}

export default RefCallback;
```

But sometime we need useCallback.
```jsx
import { useRef, useCallback } from "react";

const handleClick = () => {};

function RefCallback() {
  const refCallback = useCallback((node) => {
    if (node) {
      node.addEventListener('click', handleClick);
    }
  }, []);

  return (
    <form>
      {isVisible && <input ref={refCallback} />}
      <button onClick={clickHandler}>Show/hide</button>
      <button onClick={incrementHandler}>Increment</button>
    </form>
  );
}

export default RefCallback;
```
But in this example we need cleanup the event listener when the component unmounts. But will not work as expected 
because the refCallback is recreated on each render.So the node will be null `const refCallback = useCallback((node) => {`
in this line. So we need to use `useRef` to get the reference stability.

In future, React will give callback function like useEffect which is already merged [Add ref cleanup function](https://github.com/facebook/react/pull/25686).
Then we can use it like this
```jsx
import { useRef, useCallback, useState } from "react";

const handleClick = () => {};

function RefCallback42() {
  const [isVisible, setIsVisible] = useState(true);
  const [count, setCount] = useState(0);
  const clickHandler = () => setIsVisible((isVisible) => !isVisible);
  const incrementHandler = () => setCount((count) => count + 1);

  const refCallback = useCallback((node) => {
    if (node) {
      node.addEventListener('click', handleClick);
    }
    
    return function cleanup() {
        node.removeEventListener('click', handleClick);
    };
  });

  return (
    <form>
      {isVisible && <input ref={refCallback} />}
      <br />
      <button onClick={clickHandler}>Show/hide</button>
      <button onClick={incrementHandler}>Increment</button>
    </form>
  );
}

export default RefCallback42;
```

# Conclusion
We should use callback refs for DOM manipulation.

### Sources
[Mental Model for Ref Callbacks](https://www.youtube.com/watch?v=HZo5zCvsc4o)