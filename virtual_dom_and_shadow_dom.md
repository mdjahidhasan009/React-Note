# Virtual DOM(VDOM)

The virtual DOM(VDOM) is an in-memory representation of Real DOM. The representation of a UI in the form of a tree 
structure is called a virtual DOM. It is a lightweight copy of the Real DOM. The virtual DOM is a node tree that lists
elements, their attributes, and content as objects and properties. 

The representation of a UI is kept in memory and synced with the "real" DOM. It's a step that happens between the render 
function being called and the displaying of elements on the screen. This entire process is called **reconciliation**.

The virtual DOM is implemented by libraries in Javascript on the top of the browser's native DOM.

### How the virtual DOM works:
1. Whenever any underlying data changes, the entire UI is re-rendered in Virtual DOM representation.
2. Then the difference between the previous DOM representation and the new one is calculated.
3. Once the calculations are done, the real DOM will be updated with only the things that have actually changed.


# Reconciliation
Reconciliation is the process through which React updates the DOM. When a component's state changes, React updates the
virtual DOM tree. Then, React compares the new virtual DOM tree with the old one and figures out what has changed. 
Finally, React updates the real DOM to match the new virtual DOM tree.

## Old reconciliation 
Before fiber, stack reconciler was used. The stack reconciler is a recursive algorithm that traverses the virtual DOM
tree and compares the new virtual DOM tree with the old one. The stack reconciler is a synchronous process that blocks
the main thread and can cause performance issues. But with the introduction of fiber, the reconciliation process is
asynchronous and non-blocking which is more efficient and improves performance specially for animations and gestures.

## Diffing Algorithm
When a component's state changes, React updates the virtual DOM tree. Then, React compares the new virtual DOM tree with
the old one and figures out what has changed using diffing algorithm so that component update are predictable and 
faster.

### Reconcialiation and Diffing
Reconciliation is the process by which React updates the DOM to match the most recent component tree, ensuring efficient rendering. The diffing algorithm is a key part of reconciliation that determines what has changed in the virtual DOM by comparing the new and old component trees. React's diffing algorithm uses a heuristic approach to optimize updates: it assumes elements of different types will produce different trees, so it replaces them entirely, and for elements of the same type, it updates only the changed attributes or children. This minimizes direct DOM manipulations, improving performance. In summary, reconciliation is the overall process, while the diffing algorithm is the specific mechanism React uses to identify and apply changes efficiently.



# Shadow DOM
The shadow DOM is a browser technology designed primarily for scoping variables and CSS in web components. The shadow 
DOM is a sub DOM that is attached to an element and hidden from the main DOM. It is a way of establishing and 
maintaining functional boundaries between DOM trees and how these trees interact with each other within a document, thus
enabling better functional encapsulation within the DOM.








### References
* [reactjs-interview-questions - github](https://github.com/sudheerj/reactjs-interview-questions)