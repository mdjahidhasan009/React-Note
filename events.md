# HTML Events vs React Events
## Naming Convention
#### HTML Events
HTML events are written in lowercase, without parentheses. For example, `onclick`, `onmouseover`, `onchange`.
```html
<button onclick="activateLasers()"></button>
```
#### React Events
React events are written in camelCase, with parentheses. For example, `onClick`, `onMouseOver`, `onChange`.
```jsx
<button onClick={activateLasers}></button>
```

## Event Handling
#### HTML Events
In HTML, you can call a JavaScript function directly in the event attribute.
```html
<button onclick="activateLasers()"></button>
```
#### React Events
In React, you pass a function as a prop to the event handler.
```jsx
<button onClick={activateLasers}></button>
```
But if we need pass an argument to the function, we can use arrow function.
```jsx
<button onClick={() => activateLasers("laser beam")}></button>
```

## Prevent Default Behavior
#### HTML Events
In HTML, you can prevent the default behavior of an event by returning `false` from the event handler.
```html
<a
    href="#"
    onclick='console.log("The link was clicked."); return false;'
/>
```
#### React Events
In React, you can prevent the default behavior of an event by calling `preventDefault` on the event object.
```jsx
function handleClick(event) {
    event.preventDefault();
    console.log("The link was clicked.");
}
```



# React SyntheticEvent
React **automatically wraps** normal browser events with **SyntheticEvent**. This means that whenever you add an event
listener (like `onClick`, `onChange`, etc.) in React, the event passed to the handler is a **SyntheticEvent**, not the
raw native event.

## Why Does React Use SyntheticEvent?
- **Cross-browser consistency**: Ensures events work the same way across different browsers.
- **Performance optimization**: React reuses event objects via **event pooling** to improve performance.
- **Normalized API**: Provides a consistent API, regardless of browser differences.

## Accessing Native Events
If you ever need the raw **native event**, you can access it using `e.nativeEvent`:

```jsx
function handleClick(e) {
  console.log(e.nativeEvent); // Logs the actual native event
}

<button onClick={handleClick}>Click Me</button>;
```

## Key Differences Between SyntheticEvent and Native Event

| Feature                    | SyntheticEvent (React)                       | Native Event (Browser)                 |
|----------------------------|----------------------------------------------|----------------------------------------|
| **Scope**                  | Created and managed by React.                | Provided by the browser.               |
| **Performance**            | Uses event pooling for optimization.         | New event object for each event.       |
| **Cross-browser**          | Ensures consistency across all browsers.     | May have browser-specific differences. |
| **Access to Native Event** | Can access via `e.nativeEvent`.              | Directly available.                    |

React **does not modify** the native event itself, but it provides a wrapper (`SyntheticEvent`) that enhances 
compatibility and performance.


### References
* [reactjs-interview-questions - github](https://github.com/sudheerj/reactjs-interview-questions)