# Component vs Function

## Component 
Component is a function that returns JSX. It can be a class or a function. React convert them into DOM elements.


## Element
Element is a plain object that describes a component instance or DOM node and its props. It is not a component itself. 
It is a lightweight representation of a DOM node.

```jsx
const element = <h1>Hello, world</h1>;
```
They are syntactic sugar for `React.createElement()` function. We can also create elements using `React.createElement()` function.

```jsx
const element = React.createElement('h1', null, 'Hello, world');
```
The object definition of the element is:
```js
{
  type: 'h1',
  props: {
    children: 'Hello, world'
  }
  //... lots of other internal React stuff
}
```

<details>
<summary>Component vs Function</summary>

* Components can have state, functions can't.
* Components can have lifecycle methods, functions can't.
* Components can have refs, functions can't.
* Components can have context, functions can't.
* Components can have props, functions can't.
* Components can have children, functions can't.
* Components can have defaultProps, functions can't.
* Components can have displayName, functions can't.
</details>
