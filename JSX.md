# JSX
JSX(JavaScript XML) is a syntax extension of JavaScript that allows developers to write HTML in their JS code. It is a
preprocessor step that adds XML syntax to JavaScript.

JSX provides us the syntactic sugar for the `React.createElement(type, props, ...children)` function. Such as
```js
export default function App() {
  return <h1 className="greeting">{"Hello, this is a JSX Code!"}</h1>;
}
```

Without JSX, the above code would look like:
```js
export default function App() {
    return React.createElement(
        "h1",
        { className: "greeting" },
        React.createElement("span", null, "Hello, this is a JSX Code!")
    );
}
```


### References
* [reactjs-interview-questions - github](https://github.com/sudheerj/reactjs-interview-questions?tab=readme-ov-file#what-is-react)
