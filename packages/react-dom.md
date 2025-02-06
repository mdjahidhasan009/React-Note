# `react-dom` package
`react-dom` is a package that provides DOM-specific methods that can be used at the top level of your app and as an 
entry point for most of the React DOM-related APIs. Most of the components are not supposed to use this module directly.

Some methods provided by `react-dom` include:
1. `render`: This method is used to render a React element into the DOM in the supplied container and return a reference 
   to the component.
2. `hydrate`: This method is similar to `render()` but is used to hydrate a container whose HTML contents were rendered
   by ReactDOMServer.
3. `unmountComponentAtNode`: This method is used to remove a mounted React component from the DOM and clean up its event
   handlers and state.
4. `findDOMNode`: This method is used to find the DOM node from the component instance.
5. `createPortal`: This method is used to render children into a DOM node that exists outside the DOM hierarchy of the 
   parent component.

### References
* [reactjs-interview-questions - github](www.github.com/sudheerj/reactjs-interview-questions)