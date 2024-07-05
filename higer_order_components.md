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

### Source:
* [Advanced React](https://www.advanced-react.com/)