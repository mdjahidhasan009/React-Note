# Lazy Function
The `React.lazy` function lets you render a dynamic import as a regular component. This helps you to load components
only when they are needed. It also will not load `<OtherComponent />` until `MyComponent` is rendered.

Syntax:
```jsx
function MyComponent () {
    return (
        <div>
            <h1>My Component</h1>
            <OtherComponent />
        </div>
    );
}

export default MyComponent;
```

```jsx
const MyComponent = React.lazy(() => import('./MyComponent'));
```

It does not support named exports like `export const MyComponent = () => {...}`. You should use default exports like
`export default MyComponent = () => {...}`.

### References
* [reactjs-interview-questions - github](www.github.com/sudheerj/reactjs-interview-questions)