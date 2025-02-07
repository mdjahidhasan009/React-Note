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


## Loop inside JSX
You can use the `map()` function to loop through an array of items and return an array of elements. For example:

#### Using ES6 Arrow Function
```jsx
<tbody>
{/*Using ES6 Arrow Function*/}
{items.map((item) => (
    <SomeComponent key={item.id} name={item.name} />
))}

{/*Using ES6 Arrow Function with Destructuring*/}
{items.map(({ id, name }) => (
    <SomeComponent key={id} name={name} />
))}

{/*Using ES6 Arrow Function with Destructuring and Spread Operator*/}
{items.map(({ id, ...rest }) => (
    <SomeComponent key={id} {...rest} />
))}

{/*Using ES6 Arrow Function with Destructuring and Spread Operator with Custom Key*/}
{items.map(({ id, ...rest }) => (
    <SomeComponent key={`custom-${id}`} {...rest} />
))}


{/*Using ES6 Arrow Function with Destructuring and Spread Operator with Custom Key and Index*/}
{items.map(({ id, ...rest }, index) => (
    <SomeComponent key={`custom-${id}-${index}`} {...rest} />
))}
</tbody>
```

But we can not use `for` loop directly inside JSX. JSX tags transpiled into function calls, and the `for` loop is not a
function call. We can use statement inside expression.

#### This will not work
```jsx
<tbody>
{for (let i = 0; i < items.length; i++) {
    <SomeComponent key={items[i].id} name={items[i].name} />
}}
</tbody>
```

#### This will work
```jsx
<tbody>
{(() => {
    const elements = [];
    for (let i = 0; i < items.length; i++) {
        elements.push(<SomeComponent key={items[i].id} name={items[i].name} />);
    }
    return elements;
})()}
</tbody>
```
Alternative approach is to create a separate function to render the items.
```jsx
function renderItems(items) {
  const elements = [];
  for (let i = 0; i < items.length; i++) {
    elements.push(<SomeComponent key={items[i].id} name={items[i].name} />);
  }
  return elements;
}

<tbody>{renderItems(items)}</tbody>;
```


## Access variables in props attribute
You can access variables in the `props` attribute by using `{}`. For example:
```jsx
<img className="icon" src={"images/" + this.props.icon} />
```

Using ES6 template literals:
```jsx
<img className="icon" src={`images/${this.props.icon}`} />
```




### References
* [reactjs-interview-questions - github](https://github.com/sudheerj/reactjs-interview-questions?tab=readme-ov-file#what-is-react)
