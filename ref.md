
### When should we use refs?
* To keep the value between render cycles. But no need to re-render the component when the value changes.
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
    * `querySelector` is not aware of React's render and commit phase. Refs are aware of React's render and commit phase. So, we can use refs to get the DOM element.
    * **Vulnerable to DOM changes.** We have write specific selector to get the element. If the element is moved, the selector will break. Like this

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
      We have to change the selector to `form :nth-child(3)` to get the username input element.
    * **No isolation between components**. As it operates on windows object, other components this form may also get affected.
  </details>

### When should we not use refs?
* <details>
    <summary>Directly modifying the DOM element(escape hatch).</summary>
  
    As on click of the Hide form button, the form is removed from the DOM. But the React component is not aware of this.
    So after the click user click on the Show/hide form button, it will throw an error `Cannot read property 'focus' of null`.
    As the input element is removed from the DOM but the ref is still pointing to the input element. This is a memory leak.
    This why we should not directly modify the DOM element. We should use React's state to show/hide the form. And ref 
    is called an **escape hatch**. We should use it when we have no other option.
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
            <button onClick={buttonHandler}>Show/hide form</button>
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
    Recommended Approach is to use React's state to show/hide the form. This ensures that React keeps track of all DOM changes, preventing memory leaks and maintaining consistency.

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
                {isVisible ? "Hide form" : "Show form"}
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
* ref used for persisting DOM nodes.
* Should execute after the component is mounted and before it is unmounted. At render time ref is null, during this phase, 
  the DOM elements are not yet created or updated. After the render phase, the ref is assigned to the DOM element. 
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
* <details>
    <summary>Should not access the ref which is not rendered yet.</summary>

     This will throw an error `Cannot read property 'focus' of null`. Because the ref is called before the component is rendered.

    ```jsx
      import { useState, useRef, useEffect } from "react";

      function RefsMistake(props) {
        const [isVisible, setIsVisible] = useState(false);
        const inputRef = useRef();

        useEffect(() => {
          if (isVisible) {
            inputRef.current.focus(); // ❌ ERROR
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

    export default RefsMistake41;
    ```
    This will not throw error but the input element will not be on focus because the ref is not rendered yet. 
    And `inputRef.current` is null during the render phase.
    ```jsx
      useEffect(() => {
        inputRef.current.focus(); // ❌ No error but not focused
      }, []);
    ```
    This will make input element focus at every rerender. Because the ref is rendered at every render cycle.
    ```jsx
    useEffect(() => {
       inputRef.current.focus(); // ❌ Will focus in every rerender
   });
   ```
    We can solve this by checking the ref is rendered or not and also putting `isVisible` in the dependency array.
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

# DOM API

## Refs (escape hatch, imperative paradigm)
> We can use those same refs to interact with the DOM directly. As they do not directly interact with 
> the react operation, they are considered an escape hatch.
* measurements
* focus
* text selection
* scroll
* media playback
* & more

## Controlled by React
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
