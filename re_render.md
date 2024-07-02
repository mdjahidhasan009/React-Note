# Re-Render
Re-rendering is the process of updating the UI to reflect the latest changes in the component's state or props.
* At re-render state not lost or reset.
* Re-rendering is how React updates components with new data. Without re-renders there will be no interactivity in our 
  apps.

Compared to mounting, re-rendering is lightweight: React just re-uses the already existing instance, runs the hooks, 
does all the necessary calculations, and updates the existing DOM element with the new attributes.

Re-render mainly occurs if there 
* Update in State
* Update in prop
* Re-rendering of the parent component

## Re-render component and it's children when state changes
Now if we needs add modal then we will need to add a state like `isOpen`.

But when we are opening or closing the modal using `isOpen` state then whole `App` component will re-render again. But 
while opening/closing the modal we do not need to re-render the `VerySlowComponent`, `BunchOfStuff`, 
`OtherStuffAlsoComplicated`components. If `App` component re-render's all the child components of `VerySlowComponent`, 
`BunchOfStuff`, `OtherStuffAlsoComplicated` will also re-render.

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

## Component re-renders when its props change
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

## Component re-renders when its parent re-renders

## Component re-renders when its context changes

## Component re-renders when state changes in a hook
- When a state update is triggered in a hook, the component that uses this hook will re-render, even if the state itself
  is not used in the component or even if the state is not returned from the hook.
- If a hook uses another hook that triggers a state update, the component that uses the very first hook will re-render,

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
Now, we can use this hook in the `App` component to open and close the modal dialog.
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

# Preventing Unnecessary Re-Renders

## Using `React.memo` and `useMemo`
We can use `React.memo` to memoize the component so that it only re-renders if the props have actually changed.
```jsx
const ChildComponent = React.memo(({ count }) => {
    console.log('ChildComponent render');
    return <div>{count}</div>;
});

```
Alternatively, we can use `useMemo` to memoize the result of a function.
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
Both `React.memo` and `useMemo` help in optimizing React applications by preventing unnecessary re-renders and ensuring 
that components only re-render when their props or state actually change.

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

## Children as Props

Suppose we needs to implement a very creative feature: a block that shows up at the bottom of the area when a user 
scrolls for a bit and slowly moves to the top as the user continues to scroll down. Or slowly moves down and disappears 
if the user scrolls up. Something like a secondary navigation block with some useful links. And, of course, the scrolling
and everything associated with it should be smooth and lag free.

```jsx
const MainScrollableArea = () => {
    const [position, setPosition] = useState(300);

    const onScroll = (e) => {
        // calculate position based on the scrolled value
        const calculated = getPosition(e.target.scrollTop);
        // save it to state
        setPosition(calculated);
    };
  
    return (
          <div className="scrollable-block" onScroll={onScroll}>
            {/* pass position value to the new movable component */}
            <MovingBlock position={position} />
            <VerySlowComponent />
            <BunchOfStuff />
            <OtherStuffAlsoComplicated />
          </div>
  );
};
```
But the problem is that the `VerySlowComponent`, `BunchOfStuff`, and `OtherStuffAlsoComplicated` components will re-render
on every scroll event, even though they don't need to.

To prevent unnecessary re-renders, we can use the "children as props" pattern. Instead of rendering the `VerySlowComponent`,
`BunchOfStuff`, and `OtherStuffAlsoComplicated` components directly in the `MainScrollableArea` component, we can pass them
as children to the `MainScrollableArea` component and render them only when the `position` state changes.

```jsx
const App = () => {
    const slowComponents = (
        <>
            <VerySlowComponent />
            <BunchOfStuff />
            <OtherStuffAlsoComplicated />
        </>
    );
    
    return (
        <ScrollableWithMovingBlock content={slowComponents} />
    );
};
```

```jsx
const ScrollableWithMovingBlock = ({ content }) => {
    const [position, setPosition] = useState(300);

    const onScroll = (e) => {
        const calculated = getPosition(e.target.scrollTop);
        setPosition(calculated);
    };
  
    return (
          <div className="scrollable-block" onScroll={onScroll}>
            <MovingBlock position={position} />
            {/* slow bunch of stuff used to be here, but not anymore */}
            {content}
          </div>
    );
};
```
In this case on update of `position` only `MovingBlock` will re-render. `VerySlowComponent`, `BunchOfStuff`, and
`OtherStuffAlsoComplicated` will not re-render. As they are mounted at the parent component in this case `App` component
as **react does not go up while re-rendering**.



## Conditional Rendering and its impact on performance

```jsx
const App = () => {
    const [isOpenOtherComponent, setIsOpenOtherComponent] = useState(false);
    
    const verySlowComponent = <VerySlowComponent />;
    
    return isOpenOtherComponent ? (
        <OtherComponent verySlowComponent={verySlowComponent} />
    ) : null;
};
```

As the `OtherComponent` is not used in the `App` component until `isOpenOtherComponent` is true, it will not be re-rendered
when the `isOpenOtherComponent` state changes. React will only re-render the component itself when `isOpenOtherComponent` 
state changes. So, the app will not be slow as the `VerySlowComponent` will not be re-rendered on every state change. At
each render, a new variable `verySlowComponent` will be created, but creating a variable is very cheap compared to 
re-rendering a component.

### Clarification

- **Variable Creation:** Creating the `verySlowComponent` variable (which holds a JSX element) is indeed cheap.
- **Component Re-rendering:** The `VerySlowComponent` itself is not rendered until `OtherComponent` is rendered. Once 
  `isOpenOtherComponent` is true and `OtherComponent` renders, the `VerySlowComponent` will be rendered only once unless 
   its own props or state change.

### Important Points

1. **JSX Element Creation:** The `verySlowComponent` variable is a JSX element. It will be created every time the `App` 
   component re-renders, but this creation is lightweight and does not involve actual DOM updates.
2. **Rendering `OtherComponent`:** When `isOpenOtherComponent` is true, `OtherComponent` will receive the 
   `verySlowComponent` as a prop and render it. This is when `VerySlowComponent` will actually be rendered for the first 
   time.
3. **Performance:** The main performance benefit is that `VerySlowComponent` is not repeatedly re-rendered unnecessarily. 
   It will only render when needed, thus improving the app's performance.

### If `isOpenOtherComponent` is True

When `isOpenOtherComponent` is true:
- The `App` component will render the `OtherComponent` with the `verySlowComponent` passed as a prop.
- `OtherComponent` will then render `verySlowComponent`, which means `VerySlowComponent` will be rendered.
- The `VerySlowComponent` will only render once unless its own state or props change, ensuring optimal performance.

Your overall understanding is correct, but it's good to emphasize that the actual rendering of `VerySlowComponent` occurs 
only when it's included in the component tree (i.e., when `OtherComponent` renders it).

Summary:
* Re-rendering is how react updates components with new data. Without re-renders, there will be no interactivity in our
  apps.
* **State update is the initial source of all re-renders.**
* If a component's re-render is triggered, all nested components inside that component will be re-rendered.
* During the normal react re-renders cycle (without the use of memoization), props change doesn't matter: components 
  will rerender even if they don't have any props.
* We can use the pattern known as "moving state down" to prevent unnecessary re-renders in big apps.
* State update in a hook will trigger the re-render of a component that uses this hook, even if the state itself is not used.
* In the case of hooks using other hooks, any state update within that chain of hooks will trigger the re-render of a 
  component that uses the very first hook.

### References:
* [Advanced React](https://www.advanced-react.com/)