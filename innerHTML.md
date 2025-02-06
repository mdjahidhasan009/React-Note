# InnerHTML
The `dangerouslySetInnerHTML` attribute in React is used to set HTML directly to the DOM. This attribute is used to 
prevent XSS attacks. The `dangerouslySetInnerHTML` attribute is a replacement for using `innerHTML`(which is a security
risk) in the DOM. The `dangerouslySetInnerHTML` attribute is used to set the inner HTML of a React component which is 
safer than using `innerHTML` in the DOM.

```jsx
function createMarkup() {
  return { __html: "First &middot; Second" };
}

function MyComponent() {
  return <div dangerouslySetInnerHTML={createMarkup()} />;
}
```

### References
* [reactjs-interview-questions - github](https://github.com/sudheerj/reactjs-interview-questions)