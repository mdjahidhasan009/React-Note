
## When should we use refs?
* To keep the value between render cycles. But no need to re-render the component when the value changes.
* If the value is not passed to the child component as a prop.
* <details>
    <summary>Ref instant of DOM API Selector for getting the DOM element</summary>

    ```jsx
        function RefsMistake(props) {
            const inputElement = document.querySelector("form :first-child");
            inputElement.focus();
    
            return (
                <form>
                    <input type="text" name="username" />
                    <button type="submit">Submit</button>
                </form>
            );
        }
        export default RefsMistake;
    ```
  We should not use `querySelector` to get the DOM element. Instead, we should use refs. Because
    * **`querySelector` is not aware of React's render and commit phase**. Refs are aware of React's render and commit 
      phase. So, we can use refs to get the DOM element.
    * **Vulnerable to DOM changes.** We have write specific selector to get the element. If the element is moved, the 
      selector will break. Like if we add two more input elements before the `username` input element, the selector
      `form :first-child` will get the first input element. But we want to get the `username` input element. So, we have to
        change the selector to `form :nth-child(3)`.

        ```jsx
            function RefsMistake(props) {
                const inputElement = document.querySelector("form :first-child");
                inputElement.focus();
    
                return (
                    <form>
                        <input type="text" name="firstname" />
                        <input type="text" name="lastname" />
                        <input type="text" name="username" />
                        <button type="submit">Submit</button>
                    </form>
                );
            }
            export default RefsMistake;
        ```
      We have to change the selector to `form :nth-child(3)` to get the `username` input element.
    * **No isolation between components**. As it operates on windows object, other components this form may also get 
      affected.
  </details>

Once that ref is created, we can assign anything to it within `useEffect` or event handlers. It's just an object, 
  nothing special:
  ```jsx
    const Component = () => {
        useEffect(() => {
          // assign url as an id, when it changes
          ref.current = { id: url };
        }, [url]);  
   };
  ```

We can count how many times the component re-renders by using a ref.
```js
useEffect(() => {
  ref.current = ref.current + 1;
  console.log('Render number', ref.current);
});
```
We can use this to access previous value of a state.
```jsx
const usePrevious = (value) => {
    const ref = useRef();
    
    useEffect(() => {
        // this will be changed after the value is returned
        ref.current = value;
    }, [value]);
  return ref.current;
};
```

### When should we not use refs?
* <details>
    <summary>Directly modifying the DOM element(escape hatch).</summary>
  
    As on click of the `Hide form (DOM API)` button, the form is removed from the DOM. But the React component is not
    aware of this. So after the click on `Hide form (DOM API)` button if user click on the `Show/hide form(State)` button,
    it will throw an error `Cannot read property 'focus' of null`. As the input element is removed from the DOM but the 
    ref is still pointing to the input element and at the `useEffect` we are trying to focus on the `inputRef` at 
    `inputRef.current?.focus();` as the `isVisible` state is `true` now. This is a memory leak. This why we should not 
    directly modify the DOM element. We should use React's state to show/hide the form. And ref is called an **escape 
    hatch**. We should use it when we have no other option.
    
    ```jsx
      import { useState, useRef, useEffect } from "react";

      function RefsMistake(props) {
        const [isVisible, setIsVisible] = useState(false);
        const formRef = useRef();
        const inputRef = useRef();

        useEffect(() => {
          if (isVisible) {
            inputRef.current?.focus();
          }
        }, [isVisible]);

        const buttonHandler = () => {
          setIsVisible((current) => !current);
        };

        const buttonRefHandler = () => {
          formRef.current.remove();
        };

        return (
          <div>
            <button onClick={buttonHandler}>Show/hide form(State)</button>
            <button onClick={buttonRefHandler}>Hide form (DOM API)</button>
            {isVisible && (
                <form ref={formRef}>
                    <input ref={inputRef} type="text" name="username" />
                    <button type="submit">Submit</button>
                </form>
            )}
          </div>
        );
      }

      export default RefsMistake;
    ```
    Recommended Approach is to use React's state to `Show/Hide the form (State)`. This ensures that React keeps track of
    all DOM changes, preventing memory leaks and maintaining consistency.

    ```jsx
      import { useState, useRef, useEffect } from "react";

      function RefsMistake(props) {
        const [isVisible, setIsVisible] = useState(false);
        const inputRef = useRef();

        useEffect(() => {
          if (isVisible) {
            inputRef.current?.focus();
          }
        }, [isVisible]);

        const toggleVisibility = () => {
          setIsVisible((current) => !current);
        };

        return (
          <div>
            <button onClick={toggleVisibility}>
                {isVisible ? "Hide form (State)" : "Show form (State)"}
            </button>
            {isVisible && (
                <form>
                    <input ref={inputRef} type="text" name="username" />
                    <button type="submit">Submit</button>
                </form>
            )}
          </div>
        );
      }
    export default RefsMistake;
   ```
</details>


### DOM Refs
* `ref` used for persisting DOM nodes.
* Should execute after the component is mounted and before it is unmounted. **At render time `ref` is null**, during 
  this phase, the **DOM elements are not yet created or updated**. **After the render phase, the ref is assigned to the 
  DOM element**. 
  * It should be used in `componentDidMount` and `componentWillUnmount` lifecycle methods.
  * For functional components, it should be used in `useEffect` hook.
  
    <details>
    <summary>Ref should called after commit phase</summary>

    This will throw an error `Cannot read property 'focus' of null`. Because the ref is called before the component is mounted.
    
    ```jsx
        import { useRef } from "react";

        function RefsMistake(props) {
          const inputRef = useRef();
          inputRef.current.focus();

          return (
            <form>
              <input ref={inputRef} type="text" name="username" />
              <button type="submit">Submit</button>
            </form>
          );
        }
        export default RefsMistake;
    ```
    We can solve this using useEffect as it is called after the component is mounted means after the commit phase.
    ```jsx
        import { useEffect, useRef } from "react";

        function RefsMistake(props) {
          const inputRef = useRef();
          useEffect(() => {
            inputRef.current.focus();
          }, []);

          return (
            <form>
              <input ref={inputRef} type="text" name="username" />
              <button type="submit">Submit</button>
            </form>
          );
        }
        export default RefsMistake;
    ```
    </details>
* `ref` will be assigned only after the element is rendered by React and its associated DOM element is created.
  ```jsx
  const Component = () => {
    const ref = useRef(null);
    // trying to access ref value before it was actually assigned
    // input will never be rendered here
    if (!ref.current) return null;
    return <input ref={ref} />;
  };
  ```
  * <details>
      <summary>Should not access the ref which is not rendered yet.</summary>

       This will throw an error `Cannot read property 'focus' of null`. Because the ref is called before the component is
       rendered as at the first render the `isVisible` is `false`. So, the input element is not rendered yet. And `inputRef.current`
       is null during the render phase.

      ```jsx
        import { useState, useRef, useEffect } from "react";

        function RefsMistake(props) {
          const [isVisible, setIsVisible] = useState(false);
          const inputRef = useRef();

          useEffect(() => {
            inputRef.current.focus(); // ❌ ERROR
          }, []);

          const buttonHandler = () => {
            setIsVisible((current) => !current);
          };

          return (
            <div>
              <button onClick={buttonHandler}>Show/hide form</button>
              {isVisible && (
                  <form>
                      <p>V1</p>
                      <input ref={inputRef} type="text" name="username" />
                      <button type="submit">Submit</button>
                  </form>
              )}
            </div>
          );
      }

      export default RefsMistake41;
      ```
      This will not throw error but the input element will not be on focus because the ref is not rendered yet. And if we
      click on the `Show/hide form` button then the input element not will be focused. Because after click on `Show/hide form`
      component will re-rerendered but useEffect will not be called as the dependency array is empty. So, the input element
      will not be focused.
      ```jsx
        useEffect(() => {
          inputRef.current?.focus(); // ❌ No error but not focused
        }, []);
      ```
      This will make input element focus at every rerender if `inputRef.current` is not null. But this is not the correct.
      ```jsx
      useEffect(() => {
         inputRef.current?.focus(); // ❌ Will focus in every rerender
     });
     ```
      We can solve this by checking the `ref` is not `null` and also putting `isVisible` in the dependency array.
      ```jsx
      import { useState, useRef, useEffect } from "react";

      function RefsMistake(props) {
          const [isVisible, setIsVisible] = useState(false);
          const inputRef = useRef();

          useEffect(() => {
          if (isVisible && inputRef.current) {
              inputRef.current.focus();
          }
          }, [isVisible]);

          const buttonHandler = () => {
          setIsVisible((current) => !current);
          };

          return (
          <div>
              <button onClick={buttonHandler}>Show/hide form</button>
              {isVisible && (
                  <form>
                      <p>V1</p>
                      <input ref={inputRef} type="text" name="username" />
                      <button type="submit">Submit</button>
                  </form>
              )}
          </div>
          );
      } 
      export default RefsMistake;
      ```
      Also, we can create a separate component for form. Now useEffect at the `Form` component will be called after the form is rendered.
      Means after commit phase.
      ```jsx
        import { useState, useRef, useEffect } from "react";

        function Form(props) {
          const inputRef = useRef();

          useEffect(() => {
            inputRef.current?.focus();
          }, []);

          return (
          <form>
              <p>V2</p>
              <input ref={inputRef} type="text" name="username" />
              <button type="submit">Submit</button>
          </form>
        );
      }

      function RefsMistake(props) {
        const [isVisible, setIsVisible] = useState(false);

        const buttonHandler = () => {
          setIsVisible((current) => !current);
        };

        return (
          <div>
              <button onClick={buttonHandler}>Show/hide form</button>
              {isVisible && <Form />}
          </div>
        );
      }

      export default RefsMistake;
      ```
    </details>

In this case we are keeping the input element's data on ref, and we are not re-rendering the component so while typing
in the input field, the ref will be updated but the component will not re-render so the `Characters count: {numberOfLetters}`
will not be updated. But if we open/close the dialog, the component will re-render and the `Characters count: {numberOfLetters}`
will be updated.

```js
const Form = () => {
    // state for the dialog
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef();
    const numberOfLetters = ref.current?.length ?? 0;

    const onChange = (e) => {
      ref.current = e.target.value;
    };
    
    return (
        <>
            <input type="text" onChange={onChange} />
            {/* This will not change when you type in the field */}
            {/* Only when you open/close the dialog */}
             Characters count: {numberOfLetters}
            <button onClick={submit}>submit</button>
            {/* Adding dialog here */}
            <button onClick={() => setIsOpen(true)}>
                Open dialog
            </button>
            {isOpen ? <ModalDialog onClose={() => setIsOpen(false)} /> : null}
        </>
    );
};
```
<details>
  <summary>Details Code</summary>
  button.tsx
  
  ```tsx
  import { ReactNode } from 'react';
  
  type ButtonProps = {
    onClick: () => void;
    children: ReactNode;
  };
  export const Button = ({ onClick, children }: ButtonProps) => {
    return (
      <button onClick={onClick} className="button" type="button">
        {children}
      </button>
    );
  };
  ```
  
  basic-modal-dialog.tsx
  
  ```tsx
  import { Button } from './button';
  
  type BasicModalDialogProps = {
    onClose: () => void;
  };
  
  export const ModalDialog = ({ onClose }: BasicModalDialogProps) => {
    return (
      <div className="modal-dialog">
        <div className="content">modal content</div>
  
        <div className="footer">
          <Button onClick={onClose}>close dialog</Button>
        </div>
      </div>
    );
  };
  ```
  
  app.tsx
  ```tsx
  import { ChangeEvent, useEffect, useRef, useState } from 'react';
  
  import { ModalDialog } from './components/basic-modal-dialog';
  import './styles.scss';
  import { Button } from './components/button';
  
  const FormWithState = () => {
    const [value, setValue] = useState<string>();
  
    useEffect(() => {
      console.log('re-render FormWithState');
    });
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };
    const submit = () => {
      // send to the backend here
      console.log(value);
    };
    const numberOfLetters = value?.length ?? 0;
    return (
      <div className="column">
        <h3>Form with state</h3>
        <input type="text" onChange={onChange} />
        <br />
        Number of letters: {numberOfLetters}
        <br />
        <Button onClick={submit}>submit</Button>
      </div>
    );
  };
  
  const FormWithRef = () => {
    const ref = useRef('');
  
    useEffect(() => {
      console.log('re-render FormWithRef');
    });
  
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      ref.current = e.target.value;
    };
    const submit = () => {
      // send to the backend here
      console.log(ref.current);
    };
    const numberOfLetters = ref.current?.length ?? 0;
    return (
      <div className="column">
        <h3>Form with ref</h3>
        <input type="text" onChange={onChange} />
        <br />
        Number of letters: {numberOfLetters}
        <br />
        <Button onClick={submit}>submit</Button>
      </div>
    );
  };
  export default function App() {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className="App">
        <h1>Refs for storing values: Form component</h1>
  
        <div className="container">
          <FormWithState />
          <FormWithRef />
        </div>
        <div className="container">
          <Button onClick={() => setIsOpen(true)}>Open dialog</Button>
          {isOpen ? <ModalDialog onClose={() => setIsOpen(false)} /> : null}
        </div>
      </div>
    );
  }
  ```
  source: https://advanced-react.com/examples/09/02
</details>

It gets even more interesting than that. That change in value will not be picked up by the downstream components if 
passed as props as a primitive value either because the `ref` does not trigger a re-render. 

```js
const Form = () => {
    const ref = useRef();
    
    const onChange = (e) => {
        ref.current = e.target.value;
    };
    
    return (
        <>
          <input type="text" onChange={onChange} />
          {/* will never be updated */}
          <SearchResults search={ref.current} />
        </>
    );
};
```
If we use the `SearchResults` component in the `Form` component, the `search` prop will never be updated. Even if we
type in the input field, the `search` prop will remain an empty string. The `ref` does not trigger a re-render, so the
`search` prop is never explicitly updated. Even when we trigger a re-render inside `SearchResults` by clicking the "show
results" button, the `search` value remains an empty string.
```js
const SearchResults = ({ search }) => {
    const [showResults, setShowResults] = useState(false);
        
    return (
        <>
          Searching for: {search} <br />
          {/*This will trigger re-render*/}
          <button onClick={() => setShowResults(!showResults)}>
            show results
          </button>
        </>
    );
};
```
The parent component needs to re-render to pass the updated `ref` value to the child component.

<details>
<summary>Details Code</summary>

button.tsx
```tsx
import { ReactNode } from 'react';

type ButtonProps = {
  onClick: () => void;
  children: ReactNode;
};
export const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button onClick={onClick} className="button" type="button">
      {children}
    </button>
  );
};
```

basic-modal-dialog.tsx
```tsx
import { Button } from './button';

type BasicModalDialogProps = {
  onClose: () => void;
};

export const ModalDialog = ({ onClose }: BasicModalDialogProps) => {
  return (
    <div className="modal-dialog">
      <div className="content">modal content</div>

      <div className="footer">
        <Button onClick={onClose}>close dialog</Button>
      </div>
    </div>
  );
};
```

app.tsx
```tsx
import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { ModalDialog } from './components/basic-modal-dialog';
import './styles.scss';
import { Button } from './components/button';

const SearchResults = ({ search }: { search: string }) => {
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    console.log(showResults, search);
  });
  return (
    <>
      Searching for: {search} <br />
      {/*This will trigger re-render*/}
      <Button onClick={() => setShowResults(!showResults)}>show results</Button>
    </>
  );
};
const FormWithState = () => {
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    console.log('re-render FormWithState');
  });
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const submit = () => {
    // send to the backend here
    console.log(value);
  };
  const numberOfLetters = value?.length ?? 0;
  return (
    <div className="column">
      <h3>Form with state</h3>
      <input type="text" onChange={onChange} />
      <br />
      Number of letters: {numberOfLetters}
      <br />
      <Button onClick={submit}>submit</Button> <br />
      <SearchResults search={value} />
    </div>
  );
};

const FormWithRef = () => {
  const ref = useRef('');

  useEffect(() => {
    console.log('re-render FormWithRef');
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    ref.current = e.target.value;
  };
  const submit = () => {
    // send to the backend here
    console.log(ref.current);
  };
  const numberOfLetters = ref.current?.length ?? 0;
  return (
    <div className="column">
      <h3>Form with ref</h3>
      <input type="text" onChange={onChange} />
      <br />
      Number of letters: {numberOfLetters}
      <br />
      <Button onClick={submit}>submit</Button> <br />
      {/*will never be updated*/}
      <SearchResults search={ref.current} />
    </div>
  );
};
export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="App">
      <h1>Refs for storing values: Form component</h1>

      <div className="container">
        <FormWithState />
        <FormWithRef />
      </div>
      <div className="container">
        <Button onClick={() => setIsOpen(true)}>Open dialog</Button>
        {isOpen ? <ModalDialog onClose={() => setIsOpen(false)} /> : null}
      </div>
    </div>
  );
}
```

Source: https://advanced-react.com/examples/09/03
</details>

### `ref` as props to child component
In class components, we can pass the ref as props to the child component. If we passed a Ref to a class component, this 
component's instance would be the .current value of that Ref.But in functional components, we can't pass the ref as props
to the child component. We need to use `forwardRef` to pass the ref as props to the child component.
```jsx
const Form = () => {
    const inputRef = useRef(null);
    // if we just do this, we'll get a warning in console
    return <InputField ref={inputRef} />;
};
```


## Ref vs State
* Ref are synchronous and state are asynchronous. It's even more than asynchronous: state updates are run in "snapshots".
  React has a complicated system that manages it and makes sure that the data and components within one "snapshot" are 
  consistent and updated properly.
* Ref we mutating the object and state update is not mutating.


State update asynchronous, becomes very visible when we try to access state and ref values in the onChange callback after
setting both of them.
```js
const Form = () => {
    const [value, setValue] = useState();
    const onChange = (e) => {
        console.log('before', value);
        setValue(e.target.value);
        console.log('after', value); // same as before
    };
};
```
But in ref
```js
const Form = () => {
    const ref = useRef();
    const onChange = (e) => {
        console.log('before', ref.current);
        ref.current = e.target.value;
        console.log('after', ref.current); // already changed
    };
};
```


## DOM API

### Refs (escape hatch, imperative paradigm)
> We can use those same refs to interact with the DOM directly. As they do not directly interact with the react 
> operation, they are considered an escape hatch.
* measurements
* focusing an element after it's rendered, like an input field in a form
* text selection
* scrolling to and element after it appears on the screen.
* media playback
* detecting a click outside of a component when showing popup-like element.
* calculating sizes and boundaries of a components on the screen to correctly position something like a tooltip.
* & more

### Controlled by React
* CSS classes
* inline styles
* innerHTML
* appending/removing children
* event listeners
* JSX + State (default React flow, declarative paradigm)


### Concepts
* Why refs, not DOM API selectors?
* What is render and commit phase?
* Why refs are called an escape hatch?
* When to use state instead of refs?

# Sources
* [Essential React: 5 Mistakes to Master React DOM Refs](https://www.youtube.com/watch?v=XL7h3sjnLaY)
* [Advanced React](https://www.advanced-react.com/)