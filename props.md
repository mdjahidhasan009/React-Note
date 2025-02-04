# `props`
- `props` are the first argument to the function component.
- `props` is short for properties.
- `props` is an object that holds information that a component needs to render.
- `props` are immutable.
- `props` are passed from parent to child component.
- `props` are passed as attributes in JSX.
- `props` are accessed in the component as an argument to the function.


# Configuring components with props
- `props` are used to configure components.
- `props` are used to pass data to components.
- `props` are used to pass event handlers to components.
- `props` are used to pass children to components.

### `App.js`
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import WarningDialog from './WarningDialog';
import InfoDialog from './InfoDialog';
import ErrorDialog from './ErrorDialog';

const App = () => {
  return (
    <div>
      <WarningDialog title="Warning" message="This is a warning message." />
      <InfoDialog title="Info" message="This is an informational message." />
      <ErrorDialog title="Error" message="This is an error message." />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```
```js
import React from 'react';

const WarningDialog = ({ title, message }) => {
  const dialogStyle = { 
    border: '1px solid orange', 
    backgroundColor: '#fff3cd', 
    color: '#856404', 
    padding: '20px', 
    borderRadius: '5px', 
    margin: '10px 0' 
  };

  return (
    <div style={dialogStyle}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};

export default WarningDialog;
```
```js
import React from 'react';

const InfoDialog = ({ title, message }) => {
  const dialogStyle = { 
    border: '1px solid blue', 
    backgroundColor: '#cce5ff', 
    color: '#004085', 
    padding: '20px', 
    borderRadius: '5px', 
    margin: '10px 0' 
  };

  return (
    <div style={dialogStyle}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};

export default InfoDialog;
```
```js
import React from 'react';

const ErrorDialog = ({ title, message }) => {
  const dialogStyle = { 
    border: '1px solid red', 
    backgroundColor: '#f8d7da', 
    color: '#721c24', 
    padding: '20px', 
    borderRadius: '5px', 
    margin: '10px 0' 
  };

  return (
    <div style={dialogStyle}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};

export default ErrorDialog;
```

### Default props for reducing redundancy and prop passing
We can add default props to the `Button` component to reduce redundancy and prop passing. Also, can override the default 
props when needed.
```tsx
import React, { ReactElement } from 'react';

import LoadingIcon from '@mui/icons-material/HourglassEmpty';
import './styles.scss';

type IconProps = {
  color?: string;
  size?: 'large' | 'medium' | 'small';
};
const Loading = ({ color, size }: IconProps) => <LoadingIcon style={{ color }} fontSize={size} />;

type ButtonProps = {
  icon: ReactElement;
  size?: 'large' | 'normal';
  appearance?: 'primary' | 'secondary';
};

const Button = ({ icon, size = 'normal', appearance = 'primary' }: ButtonProps) => {
  // create default props
  const defaultIconProps = {
    size: size === 'large' ? 'large' : 'medium',
    color: appearance === 'primary' ? 'white' : 'black',
  };
  const newProps = {
    ...defaultIconProps,
    // make sure that props that are coming from the icon override default if they exist
    ...icon.props,
  };

  // clone the icon and assign new props to it
  const clonedIcon = React.cloneElement(icon, newProps);

  return <button className={`button ${appearance}`}>Submit {clonedIcon}</button>;
};

export default function App() {
  return (
    <>
      <h4>primary button will have white icons</h4>
      <Button appearance="primary" icon={<Loading />} />

      <h4>secondary button will have black icons</h4>
      <Button appearance="secondary" icon={<Loading />} />

      <h4>large button will have large icons</h4>
      <Button size="large" icon={<Loading />} />

      <h4>override default icons</h4>
      <Button size="large" icon={<Loading color="red" />} />
    </>
  );
}
```
While this approach works pretty well for simple cases, it is not that
good for something more complicated.


# Render props
A render prop is a function that returns an Element.

- Render props is a technique for sharing code between React components using a prop whose value is a function.
- The function is called by the component that receives the prop.
- The function returns a React element.
- The function can take arguments.
- The function can return a React element.
- The function can return a React element with props.
- The function can return a React element with children.

Sharing state is also not a problem anymore. We can simply merge that state value into the object we're passing to the icon:
```tsx
import { ReactElement } from 'react';

import Home from '@mui/icons-material/Home';
import './styles.scss';

type IconProps = {
    color: string;
    size?: 'large' | 'medium' | 'small';
};

const HomeIcon = ({ color, size }: IconProps) => <Home style={{ color }} fontSize={size} />;

type ButtonProps = {
    renderIcon: (props: IconProps) => ReactElement;
    size?: 'large' | 'normal';
    appearance?: 'primary' | 'secondary';
};

const Button = ({ appearance = 'primary', size = 'normal', renderIcon }: ButtonProps) => {
    // create default props as before
    const defaultIconProps: IconProps = {
        size: size === 'large' ? 'large' : 'medium',
        color: appearance === 'primary' ? 'white' : 'black',
    };

    // and just pass them to the function
    return <button className={`button ${appearance}`}>Submit {renderIcon(defaultIconProps)}</button>;
};

export default function App() {
    return (
        <>
            <h4>Pass all icon default props</h4>
            <Button renderIcon={(props) => <HomeIcon {...props} />} />
            
            <h4>Override size</h4>
            <Button renderIcon={(props) => <HomeIcon {...props} size="large" color="red" />} />
            
            <h4>Use the actual MUI icon</h4>
            <Button renderIcon={(props) => <Home fontSize={props.size} style={{ color: props.color }} />} />
        </>
    );
}
```
Another way of implementing it
[Chapter 4. Example 2](https://www.advanced-react.com/examples/04/02)
```tsx
import { ReactElement, useState } from 'react';

import Home from '@mui/icons-material/Home';
import HomeOutlined from '@mui/icons-material/HomeOutlined';
import './styles.scss';

type IconProps = {
  color: string;
  size?: 'large' | 'medium' | 'small';
};

type IconState = {
  isHovered: boolean;
};

const HomeIcon = ({ color, size }: IconProps) => <Home style={{ color }} fontSize={size} />;
const HomeOutlinedIcon = ({ color, size }: IconProps) => <HomeOutlined style={{ color }} fontSize={size} />;

type ButtonProps = {
  renderIcon: (props: IconProps, state: IconState) => ReactElement;
  size?: 'large' | 'normal';
  appearance?: 'primary' | 'secondary';
};

const Button = ({ appearance = 'primary', size = 'normal', renderIcon }: ButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // create default props as before
  const defaultIconProps: IconProps = {
    size: size === 'large' ? 'large' : 'medium',
    color: appearance === 'primary' ? 'white' : 'black',
  };

  // and just pass them to the function
  return (
    <button onMouseOver={() => setIsHovered(true)} onMouseOut={() => setIsHovered(false)} className={`button ${appearance}`}>
      Submit {renderIcon(defaultIconProps, { isHovered })}
    </button>
  );
};

export default function App() {
  return (
    <>
      <h4>Change icon's color on button's hover</h4>
      <Button renderIcon={(props, state) => <HomeIcon {...props} color={state.isHovered ? 'red' : 'black'} />} />
      <h4>Change icon on button's hover</h4>
      <Button renderIcon={(props, state) => (state.isHovered ? <HomeOutlinedIcon {...props} /> : <HomeIcon {...props} />)} />
    </>
  );
}
```

## Sharing stateful logic: children as render props
A component that tracks the resize event on the browser window. But in this case both the `ResizeDetector` and the 
component which is using it also it will need another state to store the width of the window.

NOTE: I prefer to use hooks instead of render props. Also it was used by programmer before hooks were introduced 
in React.

* Render props for configuration and flexibility use cases.
* Before hooks, render props were used to share stateful logic between components
```tsx
const ResizeDetector = ({ onWidthChange }) => {
    const [width, setWidth] = useState();

    useEffect(() => {
        const listener = () => {
            const width = window.innerWidth;
            setWidth(width);
            // trigger onWidthChange prop here
            onWidthChange(width);
    }

    window.addEventListener("resize", listener);
    // the rest of the code
    }, []);
    
    return ...
}
```
If we want to track the window size in different components without duplicating the logic, we needs to pass a state to 
the `ResizeDetector` component but doing that we needs two state for tacking one value.
```jsx
const ResizeDetector = ({ onWidthChange }) => {
    const [width, setWidth] = useState();

    useEffect(() => {
        const listener = () => {
        const width = window.innerWidth;
        setWidth(width);
        // trigger onWidthChange prop here
        onWidthChange(width);
    }
    
    window.addEventListener("resize", listener);
    // the rest of the code
    }, []);
    
    return ...
}
```
```tsx
const Layout = () => {
    const [windowWidth, setWindowWidth] = useState(0);

    return (
        <>
            <ResizeDetector onWindowWidth={setWindowWidth} />
            {windowWidth > 600 ? (
                <WideLayout />
            ) : (
                <NarrowLayout />
            )}
        </>
    );
};
```

We can use the `children` prop to pass the state to the children components. This way we can avoid duplicating the state
in the parent component and the `ResizeDetector` component.

```tsx
import { ReactElement, useEffect, useState } from 'react';
import './styles.scss';

type ResizeDetectorProps = {
  children: (width: number) => ReactElement;
};

const WideLayout = () => <div style={{ background: 'salmon', width: 600, padding: 20 }}>Wide layout</div>;
const NarrowLayout = () => <div style={{ background: 'salmon', width: 300, padding: 20 }}>Narrow layout</div>;

const ResizeDetector = ({ children }: ResizeDetectorProps) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const listener = () => {
      const width = window.innerWidth;
      setWidth(width);
    };

    window.addEventListener('resize', listener);
    // the rest of the code
  }, []);

  // pass width to children
  return children(width);
};

export default function App() {
  return (
    <>
      <h4>Render function for children</h4>
      <ResizeDetector>
        {(windowWidth) => {
          // no more state! Get it directly from the resizer
          return windowWidth > 600 ? <WideLayout /> : <NarrowLayout />;
        }}
      </ResizeDetector>
    </>
  );
}
```
### Replace render props with hooks
Hooks replaced that pattern in almost 99% of cases where it was used.
```js
const useResizeDetector = () => {
    const [width, setWidth] = useState();
    
    useEffect(() => {
        const listener = () => {
        const width = ... // get window width here
        setWidth(width);
    }
    
        window.addEventListener("resize", listener);
        // the rest of the code
    }, [])
    
    return width;
}
```

```jsx
const Layout = () => {
    const windowWidth = useResizeDetector();

    return windowWidth > 600 ? (
        <WideLayout />
    ) : (
        <NarrowLayout />
    );
};
```
### References:
* [Advanced React](https://www.advanced-react.com/)