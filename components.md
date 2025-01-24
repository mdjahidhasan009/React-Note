# Component types
There are two types of component

### Functional Component
This is the simplest way to create a component. Those are pure JavaScript functions that accept props and object as the 
first parameter and return React elements.
```jsx
function Greeting({message}) {
    return <h1>{`Hello, ${message}`}</h1>
}
```

### Class Component
```jsx
class Greeting extends React.Component {
    render() {
        return <h1>{`Hello, ${this.message}`}</h1>
    }
}
```

## When use class component over a function component
If the component needs state or lifecycle methods then use class component 