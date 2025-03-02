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


## Pointer Events in React
In React, pointer events refer to a set of events that handle input from various pointing devices, such as a mouse, pen,
or touchscreen. These events provide a unified way to handle interactions across different devices and input methods. 
Pointer events are part of the Pointer Events API, which is a modern standard for handling input from multiple sources.

Some common pointer events in React include:
### `onPointerDown`
Fires when a pointing device button is pressed (e.g., mouse click, touch start).
```jsx
const handlePointerDown = (event) => {
  console.log('Pointer down:', event);
};

return <div onPointerDown={handlePointerDown}>Press me</div>;
```

### `onPointerMove`
Fires when the pointer moves (e.g., mouse movement, touch drag).
```jsx
const handlePointerMove = (event) => {
  console.log('Pointer move:', event.clientX, event.clientY);
};

return <div onPointerMove={handlePointerMove}>Move over me</div>;
```

### `onPointerUp`
Fires when a pointing device button is released (e.g., mouse release, touch end).
```jsx
const handlePointerUp = (event) => {
  console.log('Pointer up:', event);
};

return <div onPointerUp={handlePointerUp}>Release me</div>;
```

### `onPointerCancel`
Fires when the pointer interaction is canceled (e.g., touch is interrupted).
```jsx
const handlePointerCancel = (event) => {
  console.log('Pointer canceled:', event);
};

return <div onPointerCancel={handlePointerCancel}>Interact with me</div>;
```

### `onGotPointerCapture`
* This event fires when an element successfully captures a pointer using the `setPointerCapture()` method.
* It indicates that the element will now receive all pointer events for the captured pointer, regardless of where the 
  pointer moves.
```jsx
import React from 'react';

const CaptureExample = () => {
  const handleGotPointerCapture = (event) => {
    console.log('Pointer captured:', event.pointerId);
  };

  return (
    <div
      onGotPointerCapture={handleGotPointerCapture}
      onPointerDown={(event) => event.currentTarget.setPointerCapture(event.pointerId)}
      style={{ width: '100px', height: '100px', backgroundColor: 'lightblue' }}
    >
      Click and drag
    </div>
  );
};

export default CaptureExample;
```


### `onLostPointerCapture`
* This event fires when a captured pointer is released, either explicitly using `releasePointerCapture()` or implicitly
  (e.g., when the pointer is released or the element is removed from the DOM).
* It indicates that the element will no longer receive pointer events for that pointer.
```jsx
import React from 'react';

const CaptureExample = () => {
  const handleLostPointerCapture = (event) => {
    console.log('Pointer capture lost:', event.pointerId);
  };

  return (
    <div
      onLostPointerCapture={handleLostPointerCapture}
      onPointerDown={(event) => event.currentTarget.setPointerCapture(event.pointerId)}
      onPointerUp={(event) => event.currentTarget.releasePointerCapture(event.pointerId)}
      style={{ width: '100px', height: '100px', backgroundColor: 'lightblue' }}
    >
      Click and drag
    </div>
  );
};

export default CaptureExample;
```

### `onPointerEnter`
Similar to `onPointerOver`, but does not bubble (i.e., it doesn't propagate to parent elements).
```jsx
const handlePointerEnter = (event) => {
  console.log('Pointer enter:', event);
};

return <div onPointerEnter={handlePointerEnter}>Enter me</div>;
```

### `onPointerLeave`
Similar to `onPointerOut`, but does not bubble.
```jsx
const handlePointerLeave = (event) => {
  console.log('Pointer leave:', event);
};

return <div onPointerLeave={handlePointerLeave}>Leave me</div>;
```

### `onPointerOver`
Fires when the pointer enters an element's boundary.
```jsx
const handlePointerOver = (event) => {
  console.log('Pointer over:', event);
};

return <div onPointerOver={handlePointerOver}>Hover over me</div>;
```

### `onPointerOut`
Fires when the pointer leaves an element's boundary.
```jsx
const handlePointerOut = (event) => {
  console.log('Pointer out:', event);
};

return <div onPointerOut={handlePointerOut}>Leave me</div>;
```



# Capture Phase Events

The `onClickCapture` React event is useful to catch all the events of child elements irrespective of event propagation
logic or even if the events propagation stopped. This is particularly useful for tasks like logging every click event 
for analytics purposes.

**Key Characteristics:**

* **Capture Phase:** Events are handled during the capture phase of event propagation.
* **Guaranteed Execution:** `onClickCapture` handlers are executed even if child elements stop event propagation.
* **Top-Down Execution:** Capture phase events propagate from the root of the DOM tree down to the target element.

**Example:**

```jsx
<div onClickCapture={() => alert("parent")}>
  <div onClickCapture={() => alert("child")}>
    <button onClick={(e) => e.stopPropagation()} />
    <button onClick={(e) => e.stopPropagation()} />
  </div>
</div>
```

## Event Propagation Order:
* **Capture Phase (Top-Down):**
  * `onClickCapture` event handlers are executed, starting from the outermost element and proceeding down the DOM tree.
  * In the example, the "parent" alert is triggered first, followed by the "child" alert.
* **Target Phase:**
  * The `onClick` event handler on the target element (the button) is executed.
  * In the example, `e.stopPropagation()` is called, preventing the event from bubbling.
* **Bubbling Phase (Bottom-Up):**
  * Normally, events would bubble up the DOM tree, triggering `onClick` handlers.
  * However, in this example, `e.stopPropagation()` prevents the bubbling phase.
  * Therefore, no `onClick` events on the parent divs will trigger.

## Use Cases:

* **Analytics:** Logging all click events for tracking user behavior.
* **Centralized Event Handling:** Implementing global event listeners that capture events before they reach their 
  intended targets.
* **Debugging:** Inspecting the order of event propagation.


### References
* [reactjs-interview-questions - github](https://github.com/sudheerj/reactjs-interview-questions)