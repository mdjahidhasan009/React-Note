# Decorators in React (and JavaScript)

Decorators are a way to wrap a function or class with another function, effectively modifying its behavior. In React, 
decorators are often used to enhance class components, providing a clean and readable way to add functionality like
Higher Order Components (HOCs) or context.

**What are Decorators?**

Decorators are a design pattern that allows you to add functionality to existing code (functions or classes) without
directly modifying the original code. They use a special syntax (`@`) to "decorate" the target function or class. Think
of them as wrappers or higher-order functions that take the target as an argument and return a modified version.

**Example (Setting Document Title):**

```javascript
/*
  title is a string that will be set as a document title
  WrappedComponent is what our decorator will receive when
  put directly above a component class as seen in the example below
*/
const setTitle = (title) => (WrappedComponent) => {
  return class extends React.Component {
    componentDidMount() {
      document.title = title;
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

@setTitle("Profile")
class Profile extends React.Component {
  // ... component logic ...
  render() {
      return (<div>Profile Content</div>);
  }
}

export default Profile;
```

**Explanation:**

1.  `setTitle` is the decorator factory. It's a function that takes the title as an argument and returns the actual decorator function.

2.  The decorator function (returned by `setTitle`) takes the decorated component (`WrappedComponent`) as an argument.

3.  Inside the decorator function, we create a new component (an anonymous class component in this case) that extends `React.Component`.

4.  This new component's `componentDidMount` lifecycle method sets the document title.

5.  The new component's `render` method renders the original `WrappedComponent`, passing along all the props (`{...this.props}`). This ensures that the original component's functionality is preserved.

6.  `@setTitle("Profile")` is the decorator syntax. It's equivalent to:

    ```javascript
    const DecoratedProfile = setTitle("Profile")(Profile);
    ```

    The decorator factory `setTitle("Profile")` is *called* with the title. The *result* (the decorator function) is then *called* with the `Profile` component. The result of this is a *new*, decorated component that is used in place of the original `Profile`.

**Benefits of Decorators:**

*   **Readability:** Decorators provide a concise and readable way to add functionality to components. The decoration is clearly associated with the component being modified.

*   **Reusability:** Decorators can be reused across multiple components, promoting code reuse and reducing duplication.

*   **Separation of Concerns:** Decorators help separate concerns by keeping the decoration logic (e.g., setting the title, logging, performance tracking) separate from the core component logic.

**Important Note:**

Decorators are a JavaScript proposal (currently Stage 2). While they are supported by some tools like Babel, they are not yet a standard part of JavaScript. You'll likely need Babel or a similar tool to use decorators in your React projects. Also, be aware that the proposal and its implementation might change in the future. There are also some discussions about the best way to use decorators, and some patterns are considered better than others. For example, using decorators to modify props is generally discouraged. It is better to use composition for that purpose.




### References
* [reactjs-interview-questions - github](https://github.com/sudheerj/reactjs-interview-questions?tab=readme-ov-file#what-is-react)