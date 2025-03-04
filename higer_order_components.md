# Higher Order Components
- A higher-order component (HOC) is a function that takes a component and returns a new component.
- HOCs are common in third-party React libraries, such as Redux's connect and Relay's createFragmentContainer.
- HOCs are a pattern that emerges from React's compositional nature.
- HOCs are a way to share behavior between components without using inheritance.
- HOCs are a way to reuse code between components.
- HOCs are a way to abstract logic into a separate component.
- HOCs are a way to inject props into a component.
- HOCs are a way to wrap a component with other components.
- HOCs are a way to create a higher-level API for a component.
- Before hooks, HOCs were the primary way to reuse logic and context data between components.

```jsx
// accept a Component as an argument
const withSomeLogic = (Component) => {
    // do something
    // return a component that renders the component from the argument
    return (props) => <Component {...props} />;
};
```
We can use the HOC like this:
```jsx
// just a button
const Button = ({ onClick }) => (
    <button onClick={onClick}>Button</button>
);

// same button, but with enhanced functionality
const ButtonWithSomeLogic = withSomeLogic(Button);

const SomePage = () => {
    return (
        <>
            <Button />
            <ButtonWithSomeLogic />
        </>
    );
};
```

**The simplest and most common use case would be to inject props into components.** Like dependency injection in Angular, 
we can inject props into components using HOCs. For example, we can inject a theme prop into a component:
```tsx
import { ReactNode } from 'react';

type ButtonProps = {
    onClick: () => void;
    children: ReactNode;
};
export const Button = ({ onClick, children }: ButtonProps) => {
    return (
        <button onClick={onClick} className="button">
            {children}
        </button>
    );
};
```
And now, if we use it on our button, it will have the theme prop available for use:
```tsx
import React from 'react';

const withTheme = (Component: any) => {
    const isDark = true; // in reality that will come from something like context
    const theme = isDark ? 'dark' : 'light';

    // making sure that we pass all props to the component back
    // and also inject the new one: theme
    return (props: any) => <Component {...props} theme={theme} />;
};

const Button = ({ theme }: { theme: 'dark' | 'light' }) => {
    // theme prop here will come from withTheme HOC below
    return <button className={`button ${theme}`}>Button</button>;
};

const ButtonWithTheme = withTheme(Button);

export default function App() {
    return (
        <>
            <h3>"Dark theme" button</h3>
            <p>Theme is coming from HOC</p>
            <ButtonWithTheme />
            <h3>Or we can just pass it manually</h3>
            <p>Light theme is set via prop</p>
            <Button theme="light" />
        </>
    );
}
```

Before the introduction of hooks, higher-order components were widely used for accessing context and any external data 
subscriptions. Redux's old connect or React Router's withRouter functions are higher-order components: they accept a 
component, inject some props into it, and return it back.

**As higher order components are quite complicated after introducing hook everybody switched to that.**

```jsx
const Button = () => {
    // we see immediately where the theme is coming from
    const { theme } = useTheme();
    
    return <button appearance={theme} ...>Button</button>
};
```

Although 99% of shared logic can be done with hooks and 100% of shared state or context can be done with hooks, but for
some case like **enhancing callbacks, react lifecycle events, intercepting DOM and keyboard events** HOCs are still 
useful.


## What is a Higher Order Component?
Higher-Order Components (HOC) in React are functions that take a component as an argument and return a new enhanced component. They enable code reuse, logic abstraction, and component composition by wrapping existing components with additional functionality. HOCs follow the principle of higher-order functions in JavaScript and are commonly used to extend component behavior without modifying the original component.
## Why HOC should be used?
HOCs should be used to improve code reusability, separation of concerns, and maintainability in React applications. Instead of duplicating logic across multiple components, HOCs allow shared functionalities—such as authentication handling, logging, or theming—to be applied consistently. They help keep components clean and focused on their specific responsibilities while external logic is handled in a separate, reusable function.
## When to use HOCs?
HOCs are ideal when multiple components need to share the same logic without redundancy. They should be used in scenarios such as authentication validation, API data fetching, performance optimizations (e.g., memoization), or conditional rendering based on user roles or permissions. However, they should be applied judiciously to avoid excessive nesting, which can make debugging and component tracing difficult.
## How to use HOCs?
To create an HOC, define a function that accepts a component as an argument and returns a new component with additional props or behaviors. The HOC can wrap the input component with extra logic, such as data fetching or state management, and return the modified component. When using an HOC, simply pass the base component to it and use the returned enhanced component in your application. For example:
```jsx
const withLogger = (WrappedComponent) => {
  return (props) => {
    console.log("Component rendered with props:", props);
    return <WrappedComponent {...props} />;
  };
};

const EnhancedComponent = withLogger(MyComponent);
```


## Enhancing Callbacks
### Logging on Click
If we use hooks here then we needs to pass the log function as a prop to the component. 
```jsx
const Button = ({ onClick }) => {
    const log = useLoggingSystem();
    const onButtonClick = () => {
        log('Button was clicked');
        onClick();
    };
    
    return <button onClick={onButtonClick}>Click me</button>;
};
```
But in log if we need to send some data from the component then we needs to pass that data to the log function. 
```jsx
const Button = ({ onClick, loggingData }) => {

    const onButtonClick = () => {
        log('Button was clicked', loggingData);
        onClick();
    };
    
    return <button onClick={onButtonClick}>Click me</button>;
};
```
But if at other component like list item we need the same log function then we needs to pass the log function along with
the other code if we forget something to paste any of the code then it will not work. So, in this case HOCs are useful.
```jsx
const ListItem = ({ onClick, loggingData }) => {
    const onListItemClick = () => {
        log('List item was clicked', loggingData);
        onClick();
    };
    
    return <Item onClick={onListItemClick}>Click me</Item>;
};
```
By using HOCs we can inject the log function to the component and we can use it without passing it as a prop. Also, the
logic will be encapsulated in the HOCs.
```tsx
import { ReactNode } from 'react';

type ButtonProps = {
  onClick: () => void;
  children: ReactNode;
};
export const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
};
```

```tsx
import React from 'react';

import { Button } from './components/button';

export const withLoggingOnClick = (Component: any) => {
  return (props: any) => {
    const onClick = () => {
      console.info('Log on click something');
      // don't forget to call onClick that is coming from props!
      // we're overriding it below
      props.onClick();
    };

    // return original component with all the props
    // and overriding onClick with our own callback
    return <Component {...props} onClick={onClick} />;
  };
};

export const ButtonWithLoggingOnClick = withLoggingOnClick(Button);

export default function App() {
  return (
    <>
      <h3>Button with logging on click</h3>
      <p>Logging is injected via HOC, but we still can use onClick prop</p>
      <ButtonWithLoggingOnClick
        onClick={() => {
          console.info('Click in prop');
        }}
      >
        Click me
      </ButtonWithLoggingOnClick>
    </>
  );
}
```
Now we can add that hoc at any component and it will log the click event.
```jsx
export const ListItemWithLoggingOnClick = withLoggingOnClick(ListItem);
```
### Adding data to HOC
We also pass the data to the HOCs and then we can use that data in the HOCs.
```tsx
import { ReactNode } from 'react';

type ButtonProps = {
  onClick: () => void;
  children: ReactNode;
};
export const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
};
```
```tsx
import React from 'react';

import { Button } from './components/button';

export const withLoggingOnClickWithParams = (
  Component: any,
  // adding some params as a second argument to the function
  params: any,
) => {
  return (props: any) => {
    const onClick = () => {
      console.info('Log on click something for: ', params.text);
      // don't forget to call onClick that is coming from props!
      // we're overriding it below
      props.onClick();
    };

    // return original component with all the props
    // and overriding onClick with our own callback
    return <Component {...props} onClick={onClick} />;
  };
};

export const ButtonWithLoggingOnClick = withLoggingOnClickWithParams(Button, { text: 'button component' });

export const withLoggingOnClickWithProps = (Component: any) => {
  return ({ logText, ...props }: any) => {
    const onClick = () => {
      console.info('Log on click something for: ', logText);
      // don't forget to call onClick that is coming from props!
      // we're overriding it below
      props.onClick();
    };

    // return original component with all the props
    // and overriding onClick with our own callback
    return <Component {...props} onClick={onClick} />;
  };
};

export const ButtonWithLoggingOnClickWithProps = withLoggingOnClickWithProps(Button);

export default function App() {
  return (
    <>
      <h3>Button with logging on click</h3>
      <p>Logging is injected via HOC, but we still can use onClick prop</p>
      <ButtonWithLoggingOnClick
        onClick={() => {
          console.info('Click in prop');
        }}
      >
        Click me
      </ButtonWithLoggingOnClick>
      <h3>Pass prop that will be logged</h3>
      <ButtonWithLoggingOnClickWithProps
        logText="button component from prop"
        onClick={() => {
          console.info('Click in prop');
        }}
      >
        Click me
      </ButtonWithLoggingOnClickWithProps>
    </>
  );
}
```
### Using Lifecycle Events in HOCs
We can use lifecycle events in HOCs to do some work before or after the component is mounted or unmounted.
```tsx
import { ReactNode } from 'react';

type ButtonProps = {
  onClick: () => void;
  children: ReactNode;
};
export const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
};
```
```tsx
import React, { useEffect, useState } from 'react';

import { Button } from './components/button';

const withLoggingOnMount = (Component: any) => {
  return (props: any) => {
    // no more overriding onClick
    // use normal useEffect - it's just a component!
    useEffect(() => {
      console.info('log on mount');
    }, []);

    // and pass back props intact
    return <Component {...props} />;
  };
};

export const withLoggingOnReRender = (Component: any) => {
  return ({ id, ...props }: any) => {
    // fire logging every time "id" prop changes
    useEffect(() => {
      console.info('log on id change', id);
    }, [id]);

    // and pass back props intact
    return <Component {...props} />;
  };
};

const ButtonWithLoggingOnMount = withLoggingOnMount(Button);
const ButtonWithLoggingOnReRender = withLoggingOnReRender(Button);

export default function App() {
  const [id, setId] = useState(1);

  return (
    <>
      <h3>Button with logging on mount</h3>
      <p>Will send logging even when the button is mounted</p>
      <ButtonWithLoggingOnMount
        onClick={() => {
          console.info('Click in prop');
        }}
      >
        Click me
      </ButtonWithLoggingOnMount>
      <ButtonWithLoggingOnReRender id={id} onClick={() => setId(id + 1)}>
        Click to change id
      </ButtonWithLoggingOnReRender>
    </>
  );
}
```

## Intercepting DOM and Keyboard Events
If we want to do if certain key pressed then will perform certain action like opening dialogs, creating issues we can
probably add an event listener to the window for something like this:
```jsx
useEffect(() => {
    const keyPressListener = (event) => {
        // do stuff
    };
    
    window.addEventListener('keypress', keyPressListener);
    
    return () =>
        window.removeEventListener(
            'keypress',
            keyPressListener,
        );
}, []);
```
And then, we have various parts of your app, like modal dialogs, dropdown menus, drawers, etc., where you want to block
that global listener while the dialog is open. If it was just one dialog, you could manually add onKeyPress to the dialog
itself and there do event.stopPropagation() for that:
```jsx
export const Modal = ({ onClose }) => {

    const onKeyPress = (event) => event.stopPropagation();

    return (
        <div onKeyPress={onKeyPress}>...// dialog code</div>
    );
};
```
But the same story as with `onClick` logging - what if you have multiple components where you want to see this logic?
copy-paste that `event.stopPropagation` everywhere?

What we can do instead is, again, implement a higher-order component. This time it will accept a component, wrap it in a
div with onKeyPress callback attached, and return the component unchanged.
```jsx
export const withSuppressKeyPress = (Component) => {
    return (props) => {
        const onKeyPress = (event) => {
            event.stopPropagation();
        };
        return (
            <div onKeyPress={onKeyPress}>
                <Component {...props} />
            </div>
        );
    };
};
```
That is it! Now we can wrap any component in it:
```jsx
const ModalWithSuppressedKeyPress = withSuppressKeyPress(Modal);
const DropdownWithSuppressedKeyPress = withSuppressKeyPress(Dropdown);
// etc
```
and just use it everywhere:
```jsx
const Component = () => {
    return <ModalWithSuppressedKeyPress />;
};
```
Now, when this modal is open and focused, any key press event will bubble up through the elements' hierarchy until it 
reaches our div in withSuppressKeyPress that wraps the modal and will stop there. Mission accomplished, and developers
who implement the Modal component don't even need to know or care about it.

**Details Implementation**

```tsx
import { ReactNode } from 'react';

type ButtonProps = {
  onClick: () => void;
  children: ReactNode;
};
export const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
};
```
```tsx
import React, { ReactNode, useEffect, useState } from 'react';

import { Button } from './components/button';

const Modal = ({ onClose, children }: { children: ReactNode; onClose: () => void }) => {
  return (
    <div className="modal-dialog">
      <div className="content">{children}</div>
      <div className="footer">
        <Button onClick={onClose}>close dialog</Button>
      </div>
    </div>
  );
};

export const withSuppressKeyPress = (Component: any) => {
  return (props: any) => {
    const onKeyPress = (event: any) => {
      event.stopPropagation();
    };

    return (
      <div onKeyPress={onKeyPress}>
        <Component {...props} />
      </div>
    );
  };
};

const ModalWithSuppressedKeyPress = withSuppressKeyPress(Modal);

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    window.addEventListener('keypress', (e) => {
      console.info('Key pressed', e.key);
    });
  }, []);

  return (
    <>
      <p>If modal dialog is opened and focused, the key press events will stop propagating from it</p>
      <p>Our listener in useEffect will stop logging events when the modal is focused</p>
      <Button onClick={() => setIsOpen(true)}>Click to open dialog</Button>
      {isOpen && (
        <ModalWithSuppressedKeyPress onClose={() => setIsOpen(false)}>
          <input autoFocus placeholder="something" />
        </ModalWithSuppressedKeyPress>
      )}
    </>
  );
}
```



## Render Hijacking in React

The concept of render hijacking is the ability to control what a component will output from another component. It means 
that you decorate your component by wrapping it into a Higher-Order component (HOC). By wrapping, you can inject
additional props or make other changes, which can cause changing logic of rendering. It does not actually enable 
hijacking, but by using HOC you make your component behave differently.

### Example:

```jsx
import React from 'react';

const withRenderHijack = (WrappedComponent) => {
  return class extends React.Component {
    render() {
      // Modify props or behavior here
      const newProps = { extraProp: 'This is an injected prop' };
      return <WrappedComponent {...this.props} {...newProps} />;
    }
  };
};

const SimpleComponent = (props) => {
  return <div>{props.extraProp}</div>;
};

const EnhancedComponent = withRenderHijack(SimpleComponent);

export default EnhancedComponent;
```

In this example, `withRenderHijack` is a Higher-Order Component that wraps `SimpleComponent` and injects an additional
prop, modifying its behavior dynamically.





## Higher-Order Component (HOC) Factory Implementations in React

Higher-Order Components (HOCs) are a powerful pattern in React for code reuse and logic abstraction.  They are functions that take a component and return a new, enhanced component.  There are two primary implementation strategies: Props Proxy (PP) and Inheritance Inversion (II). Each approach offers different capabilities and trade-offs.

**1. Props Proxy (PP)**

*   **Concept:**  The HOC renders a *React element* of the type of the wrapped component (`WrappedComponent`).  It acts as a proxy, intercepting and potentially modifying the props passed to the `WrappedComponent`.

*   **Implementation:**

    ```javascript
    function ppHOC(WrappedComponent) {
      return class PP extends React.Component {
        render() {
          // Pass all props received by the HOC to the WrappedComponent
          return <WrappedComponent {...this.props} />;
        }
      };
    }
    ```

*   **Explanation:**
    *   `ppHOC` is a function that accepts a `WrappedComponent` as an argument.
    *   It returns a new React component class, `PP`.
    *   Inside the `PP` component's `render` method, it renders an instance of the `WrappedComponent`. Critically, it spreads all the props received by the `PP` component (the HOC) onto the `WrappedComponent`.
    *   This allows the HOC to:
        *   Modify existing props before passing them down.
        *   Add new props to the `WrappedComponent`.
        *   Conditionally render the `WrappedComponent`.
        *   Access the `WrappedComponent`'s instance via `refs`. (Though refs should be used sparingly).

*   **Advantages of Props Proxy:**

    *   **Simple and Common:** Relatively straightforward to understand and implement.
    *   **Prop Manipulation:** Provides excellent control over props passed to the wrapped component.  The HOC can add, modify, or remove props.
    *   **Conditional Rendering:** The HOC can decide whether or not to render the wrapped component based on certain conditions.
    *   **Access to Instance via Refs (Use Sparingly):** While generally discouraged, the HOC *can* obtain a ref to the wrapped component instance (use `React.forwardRef` to pass refs correctly) for advanced use cases, but relying on refs usually indicates a design smell.

*   **Disadvantages of Props Proxy:**

    *   **Name Collisions:**  Potential for prop name collisions between the HOC and the `WrappedComponent`. (Mitigated by careful naming conventions).
    *   **No Access to State:** It cannot directly access the state of `WrappedComponent`.
    *  **Wrapped component is always re-rendered even when the HOC does not need to pass any new props. This might lead to performance inefficiencies.**

**2. Inheritance Inversion (II)**

*   **Concept:**  The HOC *extends* the `WrappedComponent`. This creates an inheritance relationship where the HOC becomes a subclass of the `WrappedComponent`.  The control is *inverted* because the enhancer gains control over the wrapped component.

*   **Implementation:**

    ```javascript
    function iiHOC(WrappedComponent) {
      return class Enhancer extends WrappedComponent {
        render() {
          // Call the WrappedComponent's render method using super
          return super.render();
        }
      };
    }
    ```

*   **Explanation:**
    *   `iiHOC` is a function that accepts a `WrappedComponent`.
    *   It returns a new component class, `Enhancer`, which *extends* the `WrappedComponent`.
    *   The `Enhancer`'s `render` method calls `super.render()`, which executes the `WrappedComponent`'s original `render` method.

*   **Advantages of Inheritance Inversion:**

    *   **Access to State:** The HOC has access to the state and lifecycle methods of the `WrappedComponent` (though modifying these is generally discouraged).
    *   **Can Manipulate `render` output:**The HOC can modify the output of the `WrappedComponent`'s render method (e.g., by wrapping it in additional elements).
    *   **Name Collisions:** Less prone to prop name collisions because the HOC isn't passing props directly; it's inheriting them.
    *   **Can implement conditional rendering without re-rendering the wrapped component.**

*   **Disadvantages of Inheritance Inversion:**

    *   **Less Control over Props:**  The HOC doesn't have direct control over the props passed to the `WrappedComponent` in the same way as Props Proxy.  It primarily relies on the `WrappedComponent` using `this.props`.
    *   **Tight Coupling:** Creates a tighter coupling between the HOC and the `WrappedComponent` due to the inheritance relationship, making it harder to reuse the HOC with different components.  It's more likely to break if the `WrappedComponent`'s internal implementation changes.
    *   **Potential for Side Effects:**  Directly manipulating the `WrappedComponent`'s state or lifecycle methods can lead to unexpected side effects and make the code harder to reason about.  This is generally considered an anti-pattern.
    *   **Breaks Static Methods**: Static methods on the wrapped component are not automatically available on the enhanced component. Need to be copied over manually.

**Choosing Between Props Proxy and Inheritance Inversion:**

*   **Props Proxy:** Generally preferred for most HOC use cases due to its simplicity, flexibility in prop manipulation, and looser coupling. Use it when you need to control the props passed to the wrapped component, conditionally render it, or add additional behavior without deeply affecting its internal workings.

*   **Inheritance Inversion:**  Considered less common and should be used sparingly.  It's best suited for very specific scenarios where you absolutely need access to the `WrappedComponent`'s state or lifecycle methods and are aware of the potential drawbacks of tighter coupling and potential side effects.  Often, there are alternative approaches to achieve the desired result without resorting to II.  Using composition or render props is usually a better approach.

**Important Considerations for both approaches:**

*   **Display Name:**  Set the `displayName` of the HOC for better debugging in React DevTools.  For example:

    ```javascript
    function ppHOC(WrappedComponent) {
      const wrapperName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
      class PP extends React.Component {
        static displayName = `ppHOC(${wrapperName})`;
        render() {
          return <WrappedComponent {...this.props} />;
        }
      };
      return PP;
    }
    ```

*   **Static Methods:**  Static methods on the `WrappedComponent` are *not* automatically copied over to the enhanced component.  You'll need to manually copy them if you need them. Libraries like `hoist-non-react-statics` can assist with this, but be mindful of which statics you are copying.

In summary, Props Proxy and Inheritance Inversion represent different approaches to HOC implementation, each with its own set of advantages and disadvantages. Props Proxy is generally the more versatile and preferred choice for most scenarios, while Inheritance Inversion should be reserved for specific cases where access to the wrapped component's state or lifecycle methods is essential.  Always consider the potential trade-offs and strive for the simplest and most maintainable solution.



## Limitations of Higher-Order Components (HOCs)

Higher-order components come with a few caveats apart from their benefits. Below are a few listed in order:

* **Don’t use HOCs inside the render method:** It is not recommended to apply a HOC to a component within the render
  method of a component.

    ```javascript
    render() {
      // A new version of EnhancedComponent is created on every render
      // EnhancedComponent1 !== EnhancedComponent2
      const EnhancedComponent = enhance(MyComponent);
      // That causes the entire subtree to unmount/remount each time!
      return <EnhancedComponent />;
    }
    ```

    The above code impacts performance by remounting a component that causes the state of that component and all of its
    children to be lost. Instead, apply HOCs outside the component definition so that the resulting component is created
    only once.

*   **Static methods must be copied over:** When you apply a HOC to a component, the new component does not have any of 
  the static methods of the original component.

    ```javascript
    // Define a static method
    WrappedComponent.staticMethod = function () {
      /*...*/
    };
    // Now apply a HOC
    const EnhancedComponent = enhance(WrappedComponent);

    // The enhanced component has no static method
    typeof EnhancedComponent.staticMethod === "undefined"; // true
    ```

    You can overcome this by copying the methods onto the container before returning it:

    ```javascript
    function enhance(WrappedComponent) {
      class Enhance extends React.Component {
        /*...*/
      }
      // Must know exactly which method(s) to copy :(
      Enhance.staticMethod = WrappedComponent.staticMethod;
      return Enhance;
    }
    ```

*   **Refs aren’t passed through:** For HOCs, you need to pass through all props to the wrapped component, but this does not work for refs. This is because `ref` is not really a prop, similar to `key`. In this case, you need to use the `React.forwardRef` API.





## Creating HOCs Using Render Props

You can implement most higher-order components (HOC) using a regular component with a render prop. For example, if you would prefer to have a `withMouse` HOC instead of a component, you could easily create one using a regular component with a render prop.

```javascript
function withMouse(Component) {
  return class extends React.Component {
    render() {
      return (
        <Mouse
          render={(mouse) => <Component {...this.props} mouse={mouse} />}
        />
      );
    }
  };
}
```

This way, render props gives the flexibility of using either pattern.



### Source:
* [Advanced React](https://www.advanced-react.com/)
* [reactjs-interview-questions - github](https://github.com/sudheerj/reactjs-interview-questions?tab=readme-ov-file#what-is-react)