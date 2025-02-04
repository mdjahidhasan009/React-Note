# Debouncing
Debouncing is a technique used to limit the rate at which a function is called. It is used to ensure that a function is
not called more than once in a given time frame. This is useful when we have a function that is called multiple times in 
a short period of time, such as when a user is typing in an input field.

# Throttling
Throttling is a technique used to limit the rate at which a function is called. It is used to ensure that a function is
not called more than once in a given time frame. This is useful when we have a function that is called multiple times in
a short period of time, such as when a user is scrolling a page.
----

```tsx
import './styles.scss';
import { ChangeEventHandler } from 'react';

import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

/**
 * A simple input with a regular onChange callback (no debounce/throttle).
 * - For every keystroke, onChange is called immediately.
 * - If you type quickly, you'll see all keystrokes logged in the console.
 */
const InputWithJustOnchange = () => {
    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        // Called for every input change event
        console.log('Changed value:', e.target.value);
    };

    return <input type="text" onChange={onChange} />;
};

/**
 * A debounced input:
 * - Debounce ensures the "onChange" callback is delayed until there's a pause in typing.
 * - If the user keeps typing without stopping, the timer keeps resetting.
 * - Only after the user stops typing for 1000 ms (1 second) will "onChange" fire.
 * - Good for scenarios like "search as you type," where you only want to trigger a search request
 *   after the user is done typing, rather than on every keystroke.
 */
const InputWithDebouncedOnchange = () => {
    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        // This function won't be called immediately; it's called only after a pause in typing.
        console.log('Changed value:', e.target.value);
    };

    // Create a debounced version of the onChange function with a 1s wait.
    // If the user presses another key before 1s passes, the timer resets.
    const debouncedOnChange = debounce(onChange, 1000);

    return <input type="text" onChange={debouncedOnChange} />;
};

/**
 * A throttled input:
 * - Throttle ensures the "onChange" callback fires at most once per time window (1000 ms here).
 * - If you type several characters quickly, the callback fires once, then
 *   won't fire again until 1000 ms have passed (regardless of how many new keystrokes occur in that interval).
 * - Good for scenarios where you don't want to overload an API or resource with too many updates,
 *   but still want a somewhat regular interval of updates (e.g., continuous mouse movement tracking).
 */
const InputWithThrottledOnchange = () => {
    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        // This function is allowed to run at most once every 1s (in the throttled version).
        console.log('Changed value:', e.target.value);
    };

    // Create a throttled version of the onChange function with a 1s interval.
    // After the first call, it will ignore subsequent calls until 1s has passed.
    const throttledOnChange = throttle(onChange, 1000);

    return <input type="text" onChange={throttledOnChange} />;
};

/**
 * The main App component that renders all three examples:
 * 1. Normal onChange (no delay)
 * 2. Debounced onChange (fires after user stops typing)
 * 3. Throttled onChange (fires at most once per time interval)
 *
 * Open your browser console and type quickly in each input to see the difference in behavior.
 */
export default function App() {
    return (
        <div className="App">
            <h1>Debounce and Throttle Examples</h1>
            <h3>Open console and type something in the inputs really fast</h3>
            <div className="container">
                <div className="column">
                    <h3>Just onChange callback</h3>
                    <InputWithJustOnchange />
                    {/* Every keystroke will log to the console immediately */}
                </div>
                <div className="column">
                    <h3>Debounced onChange</h3>
                    <InputWithDebouncedOnchange />
                    {/* Will only log once you've stopped typing for 1 second */}
                </div>
                <div className="column">
                    <h3>Throttled onChange</h3>
                    <InputWithThrottledOnchange />
                    {/* Will log at most once per second, no matter how many keystrokes you make */}
                </div>
            </div>
        </div>
    );
}
```
Source: https://www.advanced-react.com/examples/11/01






# References
* [Advanced React](https://www.advanced-react.com/)
