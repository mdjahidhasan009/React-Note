## Shallow Renderer in React Testing

Shallow rendering is useful for writing unit test cases in React. It lets you render a component one level deep and 
assert facts about what its render method returns, without worrying about the behavior of child components, which are
not instantiated or rendered.

For example, if you have the following component:

```jsx
function MyComponent() {
  return (
    <div>
      <span className={"heading"}>{"Title"}</span>
      <span className={"description"}>{"Description"}</span>
    </div>
  );
}
```

Then you can assert as follows:

```jsx
import ShallowRenderer from "react-test-renderer/shallow";

// in your test
const renderer = new ShallowRenderer();
renderer.render(<MyComponent />);

const result = renderer.getRenderOutput();

expect(result.type).toBe("div");
expect(result.props.children).toEqual([
  <span className={"heading"}>{"Title"}</span>,
  <span className={"description"}>{"Description"}</span>,
]);
```

---

## TestRenderer Package in React

This package provides a renderer that can be used to render components to pure JavaScript objects, without depending on
the DOM or a native mobile environment. This package makes it easy to grab a snapshot of the platform view hierarchy
(similar to a DOM tree) rendered by a ReactDOM or React Native without using a browser or jsdom.

```jsx
import TestRenderer from "react-test-renderer";

const Link = ({ page, children }) => <a href={page}>{children}</a>;

const testRenderer = TestRenderer.create(
  <Link page={"https://www.facebook.com/"}>{"Facebook"}</Link>
);

console.log(testRenderer.toJSON());
// {
//   type: 'a',
//   props: { href: 'https://www.facebook.com/' },
//   children: [ 'Facebook' ]
// }
```

---

## ReactTestUtils Package

ReactTestUtils are provided in the with-addons package and allow you to perform actions against a simulated DOM for the
purpose of unit testing.

---

## Jest

Jest is a JavaScript unit testing framework created by Facebook based on Jasmine and provides automated mock creation 
and a jsdom environment. It's often used for testing components.

---

## Advantages of Jest over Jasmine

There are a couple of advantages compared to Jasmine:

- Automatically finds tests to execute in your source code.
- Automatically mocks dependencies when running your tests.
- Allows you to test asynchronous code synchronously.
- Runs your tests with a fake DOM implementation (via jsdom) so that your tests can be run on the command line.
- Runs tests in parallel processes so that they finish sooner.

---

## Simple Jest Test Case Example
Let's write a test for a function that adds two numbers in `sum.js` file:

```jsx
const sum = (a, b) => a + b;
export default sum;
```

Create a file named `sum.test.js` which contains the actual test:

```jsx
import sum from "./sum";

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});
```

And then add the following section to your `package.json`:

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

Finally, run `yarn test` or `npm test` and Jest will print a result:

```sh
$ yarn test
PASS ./sum.test.js
✓ adds 1 + 2 to equal 3 (2ms)
```

### References
* [reactjs-interview-questions - github](https://github.com/sudheerj/reactjs-interview-questions)