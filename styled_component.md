# Styled Component
Styled components are a way to style React components. They are a CSS-in-JS tool that allows you to write CSS directly 
in your JavaScript files. Styled components are a popular choice for styling React components because they offer a
number of benefits, including:

* **Scoped Styles:** Styles are encapsulated within the component, preventing style leakage and naming conflicts.
* **Dynamic Styling:** You can pass props to styled components to dynamically change styles based on component props.
* **Easy Theming:** Styled components support theming, making it easy to create consistent styles across your application.
* **No Class Name Collisions:** Since styles are scoped to the component, you don't have to worry about class name 
  collisions or specificity issues.
* **Performance:** Styled components use tagged template literals to generate class names, which can be optimized for 
  performance.
* **Server-Side Rendering:** Styled components support server-side rendering, ensuring that styles are applied correctly 
  on the initial render.
* **Vendor Prefixing:** Styled components automatically add vendor prefixes to CSS properties, reducing the need for 
  manual prefixing.

```jsx
import React from "react";
import styled from "styled-components";

// Create a <Title> component that renders an <h1> which is centered, red and sized at 1.5em
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

// Create a <Wrapper> component that renders a <section> with some padding and a papayawhip background
const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;
```
Now we can use these `Title` and `Wrapper` components in our React components:

```jsx
<Wrapper>
  <Title>{"Lets start first styled component!"}</Title>
</Wrapper>
```

### References
* [reactjs-interview-questions - github](https://github.com/sudheerj/reactjs-interview-questions?tab=readme-ov-file#what-is-react)