# Re-Render
Re-rendering is the process of updating the UI to reflect the latest changes in the component's state or props.

Compared to mounting, re-rendering is lightweight: React just re-uses the already existing instance, runs the hooks, 
does all the necessary calculations, and updates the existing DOM element with the new attributes.

Re-render mainly occurs if there 
* Update in State
* Update in prop
* Re-rendering of the parent component

Now if we needs add modal then we will need to add an state like `isOpen`.
```jsx
const App = () => {
    // lots of code here
    return (
        <div className="layout">
            {/* button should go somewhere here */}
            <VerySlowComponent />
            <BunchOfStuff />
            <OtherStuffAlsoComplicated />
        </div>
    );
};
```
But when we are opening or closing the modal using `isOpen` state then whole `App` component will re-render again. But while 
opening/closing the modal we do not need to re-render the `VerySlowComponent`, `BunchOfStuff`, `OtherStuffAlsoComplicated` 
components. If `App` component rerender's all the child components of `VerySlowComponent`, `BunchOfStuff`, `OtherStuffAlsoComplicated`
will also re-render.

We can use `React.memo`, `useCallback` to prevent re-rendering of these components but those will be overkill.
We can separate modal into a separate component and render it conditionally there by this way we can prevent re-rendering 
of other components. 
```jsx
const App = () => {
    // add some state
    const [isOpen, setIsOpen] = useState(false);

    // everything that is returned here will be re-rendered when the state is updated
    return (
        <div className="layout">
            {/* add the button */}
            <Button onClick={() => setIsOpen(true)}>
                Open dialog
            </Button>
     
            {/* add the dialog itself */}
            {
                isOpen 
                    ? (
                        <ModalDialog onClose={() => setIsOpen(false)} />
                    ) 
                    : null
            }

            <VerySlowComponent />
            <BunchOfStuff />
            <OtherStuffAlsoComplicated />
        </div>
    );
};
```

React never goes "up" the render tree when it re-renders components. If a state update originated somewhere in the middle
of the components tree, only components "down" the tree will re-render.

```
App
|---A
|   |---B
|       |---C
|           |---D
|               |---E
|   |---F
|   |---G
|       |--H 
```
If the state is updated in component `C` then only `C`, `D`, `E` will re-render. `A`, `B` will not re-render.

The only way for components at the "bottom" to affect components at the "top" of the hierarchy is for them either to 
explicitly call state update in the "top" components or to pass components as functions.

### Component re-renders when its props change
But this is not always true. If a component receives new props, it will re-render, even if the props are the same as before.
```jsx
const App = () => {
    const [count, setCount] = useState(0);
    const setZero = () => setCount(0);

    return (
        <div>
            <button onClick={setZero}>Set Zero</button>
            <ChildComponent count={count} />
        </div>
    );
};
```
```jsx
const ChildComponent = ({ count }) => {
    console.log('ChildComponent render');
    return <div>{count}</div>;
};
```
In the above example, `ChildComponent` will re-render every time the `count` state changes, even if the new value is the same
as the old one. This is because React doesn't do a deep comparison of the props to determine if a component should re-render.
It only checks if the reference to the props has changed. If you want to prevent unnecessary re-renders, you can use
`React.memo` or `useMemo` to memoize the component.

### Preventing Unnecessary Re-Renders
You can use React.memo to memoize the component so that it only re-renders if the props have actually changed.
```jsx
const ChildComponent = React.memo(({ count }) => {
    console.log('ChildComponent render');
    return <div>{count}</div>;
});

```
Alternatively, we can use useMemo to memoize the result of a function.
```jsx
import React, { useState, useMemo } from 'react';

const App = () => {
    const [count, setCount] = useState(0);
    const setZero = () => setCount(0);

    const memoizedChildComponent = useMemo(() => {
        return <ChildComponent count={count} />;
    }, [count]);

    return (
        <div>
            <button onClick={setZero}>Set Zero</button>
            {memoizedChildComponent}
        </div>
    );
};
```
Both React.memo and useMemo help in optimizing React applications by preventing unnecessary re-renders and ensuring that 
components only re-render when their props or state actually change.

Af a state update is triggered, React will rerender all the nested components regardless of their props

## Moving State Down

```jsx
const ButtonWithModalDialog = () => {
    const [isOpen, setIsOpen] = useState(false);
    
    // render only Button and ModalDialog here
    return (
        <>
            <Button onClick={() => setIsOpen(true)}>
                Open dialog
            </Button>
            
            {isOpen ? (
                <ModalDialog onClose={() => setIsOpen(false)} />
            ) : null}
        </>
    );
};
```

```jsx
const App = () => {
    return (
        <div className="layout">
            {/* here it goes, component with the state inside */}
            <ButtonWithModalDialog />
            <VerySlowComponent />
            <BunchOfStuff />
            <OtherStuffAlsoComplicated />
        </div>
    );
};
```
Now, when the modal is opened or closed, only the `ButtonWithModalDialog` component will re-render, and the rest of the
components will stay the same.

## The danger of custom hooks
Custom hooks were introduced exactly so that we could abstract away stateful logic and reuse it in multiple components.

```jsx
const useModalDialog = () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return {
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
    };
};
```
```jsx
const App = () => {
    // state is in the hook now
    const { isOpen, open, close } = useModalDialog();

    return (
        <div className="layout">
            {/* just use "open" method from the hook */}
            <Button onClick={open}>Open dialog</Button>
            {/* just use "close" method from the hook */}
            {isOpen ? <ModalDialog onClose={close} /> : null}
            <VerySlowComponent />
            <BunchOfStuff />
            <OtherStuffAlsoComplicated />
        </div>
    );
};
```
In this case, the `App` component will re-render every time the modal is opened or closed. This is because the `useModalDialog`
hook is called in the `App` component, and the state is stored in the hook itself. But we are using the `isOpen` state
from the hook in the `App` component, so the `App` component will re-render every time the state changes. It doesn't matter
that the state is stored in the hook; what matters is that the state is used in the `App` component. 

Another think suppose we use the hook below in `App` component.
```jsx
const useModalDialog = () => {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const listener = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener('resize', listener);
        
        return () => window.removeEventListener('resize', listener);
    }, []);

    // return is the same
    return ...
}
```
**The entire `App` component will re-render on every resize, even though this value is not even returned from the hook!**

Anything that can trigger a re-render, however deep in the chain of hooks it's happening, will trigger a re-render in 
the component that uses that very first hook. If I extract that additional state into a hook that returns null , App will
still re-render on every resize.
```jsx
const useResizeDetector = () => {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const listener = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener('resize', listener);
        
        return () => window.removeEventListener('resize', listener);
    }, []);
    
    return null;
}

const useModalDialog = () => {
    // I don't even use it, just call it here
    useResizeDetector();
    // return is the same
    return ...
}

const App = () => {
    // this hook uses useResizeDetector underneath that triggers state update on resize
    // the entire App will re-render on every resize!
    const { isOpen, open, close } = useModalDialog();
    
    return // same return
}
```

In order to fix our app, you'd still need to extract that button, dialog, and the custom hook into a component:
```jsx
const ButtonWithModalDialog = () => {
    const { isOpen, open, close } = useModalDialog();
    
    // render only Button and ModalDialog here
    return (
        <>
            <Button onClick={open}>Open dialog</Button>
            {isOpen ? <ModalDialog onClose={close} /> : null}
        </>
    );
};
```

Summary:
* Re-rendering is how React updates components with new data. Without re-renders, there will be no interactivity in our apps.
* State update is the initial source of all re-renders.
* If a component's re-render is triggered, all nested components inside that component will be re-rendered.
* During the normal React re-renders cycle (without the use of memoization), props change doesn't matter: components 
  will rerender even if they don't have any props.
* We can use the pattern known as "moving state down" to prevent unnecessary re-renders in big apps.
* State update in a hook will trigger the re-render of a component that uses this hook, even if the state itself is not used.
* In the case of hooks using other hooks, any state update within that chain of hooks will trigger the re-render of a 
  component that uses the very first hook.

### Source:
* [Advanced React](https://www.advanced-react.com/)