## Effect Synchronization

---

Effect synchronization in React refers to ensuring that **side effects (such as API calls, event listeners, or subscriptions) remain in sync with the component’s state, props, and lifecycle**. It is essential because React's rendering behavior does not guarantee when or how often an effect will run.

**Why Is Effect Synchronization Needed?**

1. **React’s Rendering Model is Asynchronous**
    - Components can **re-render multiple times** due to state updates, props changes, or context changes.
    - If effects are not properly synchronized, they might **use outdated state or props**, causing bugs.
2. **Effects Can Cause Performance Issues**
    - Running an effect **too often** (e.g., on every render) can cause unnecessary API calls or event bindings.
    - Not cleaning up effects properly can lead to **memory leaks**, especially with event listeners and subscriptions.
3. **React’s Strict Mode Runs Effects Twice (for Dev Mode only)**
    - In development, React **mounts, unmounts, and remounts** components to detect issues.
    - If effects are not properly handled, **this can lead to duplicate API calls** or event bindings.

### Key Concepts of Effect Synchronization

1. **Dependencies and React’s Dependency Array**
React’s `useEffect` has a **dependency array** that determines when the effect should run.
    
    ```tsx
    useEffect(() => {
    	console.log('Effect ran!');
    }, [someState]); // Effect runs only when 'someState' changes
    ```
    
    - If **no dependencies** are provided:
        
        → Effect runs **on every render** (bad practice unless intentional).
        
    - If an **empty array `[]`** is provided:
        
        → Effect runs **only once (on mount)**.
        
    - If **state or props are added to the dependency array**:
        
        → Effect runs **whenever that state or prop changes**.
        

1. **Stale Closures and Effect Dependencies**
A **stale closure** happens when an effect **captures outdated values** due to how JavaScript closures work.
    
    ```tsx
    
    const [count, setCount] = useState(0);
    
    // Incorrect
    useEffect(() => {
    	setTimeout(() => {
    		alert(`Current count: ${count}`); // Always 0 due to closure
    	}, 3000);
    }, []); // Effect only captures initial 'count'
    
    // Correct Approach
    useEffect(() => {
    	const timer = setTimeout(() => {
    		alert(`Current count: ${count}`); // Always up-to-date
    	}, 3000);
    
    	return () => clearTimeout(timer); // Cleanup to avoid memory leaks
    }, [count]); // Effect runs when 'count' changes
    
    ```
    

1. **Cleanup Function and Preventing Memory Leaks**
If an effect **adds an event listener, opens a WebSocket, or starts an interval**, **it should clean up when the component unmounts**.
    
    ```tsx
    useEffect(() => {
    	const handleScroll = () => console.log('Scrolling...');
    
    	window.addEventListener('scroll', handleScroll);
    
    	return () => {
    		window.removeEventListener('scroll', handleScroll); // ✅ Cleanup
    	};
    }, []);
    ```
    
    Without cleanup, event listeners and intervals **keep running even after the component is unmounted**, leading to **memory leaks and performance issues**.
    
2. **Synchronizing Effects with External Systems**
    
    In real-world apps, we often interact with **external systems** like:
    
    - APIs (data fetching)
    - WebSockets (real-time updates)
    - Browser Events (resize, visibility change)
    - State Managers (Redux, Zustand)
    
    ```tsx
    import { useEffect, useState } from 'react';
    
    function FetchData({ userId }) {
    	const [data, setData] = useState(null);
    
    	useEffect(() => {
    		let isActive = true; // Prevent race conditions
            const controller = new AbortController();
    
    		const fetchData = async () => {
    			const response = await fetch(`/api/user/${userId}`, { signal: controller.signal });
    			const result = await response.json();
    			if (isActive) setData(result);
    		};
    
    		fetchData();
    
    		return () => {
    			isActive = false; // ✅ Prevent setting state on unmounted component
                controller.abort();
    		};
    	}, [userId]); // ✅ Effect runs when 'userId' changes
    
    	return <div>{data ? JSON.stringify(data) : 'Loading...'}</div>;
    }
    
    ```
    
    - **Prevents unnecessary API calls** by only fetching data when `userId` changes.
    - **Prevents race conditions** by using `isActive` flag.
    - **Cleans up side effects** by stopping the fetch if the component unmounts.

## Avoid Using useEffect

---

<aside>
💡

- useEffect is not for all effects. It should rename as useSynchronize
- useEffect is not a life cycle method, the mental model of useEffect is synchronization
</aside>

Don’t use useEffect unless this is the absolute necessity 

- Use Event Handler
- You don’t need useEffect for transforming data
- You don’t need useEffect for subscribing to external store (useSyncExternalStore)
- You don’t need useEffect for fetching data (use)

1. **Synchronizing State with Props**
Developers often use `useEffect` to synchronize state with props, which leads to **unnecessary re-renders**.
    
    ```tsx
    
    // Bad Implementation
    const [userId, setUserId] = useState(props.userId);
    
    useEffect(() => {
    	setUserId(props.userId);
    }, [props.userId]);
    
    // Good Implementation
    const userId = props.userId; // ✅ No need for state duplication
    ```
    

1. **Storing Derived State**
    
    ```tsx
    // Bad Implementation
    
    const [fullName, setFullName] = useState('');
    
    useEffect(() => {
    	setFullName(`${user.firstName} ${user.lastName}`);
    }, [user]);
    
    // Good Implementation
    const fullName = useMemo(() => `${user.firstName} ${user.lastName}`, [user]);
    const fullName2 = `${user.firstName} ${user.lastName}`
    ```
    

1. **Fetching Data on Component Mount**
    
    ```tsx
    
    // Bad Implementation
    const [data, setData] = useState(null);
    
    useEffect(() => {
    	fetch('/api/data')
    		.then(res => res.json())
    		.then(setData);
    }, []); 
    
    // Good Implementation
    
    import useSWR from 'swr';
    
    const { data } = useSWR('/api/data', url => fetch(url).then(res => res.json()));
    
    const data = use(fetch(url).then(res => res.json()))
    
    ```
    

1. **Dealing with Dom Elements**
    
    ```tsx
    // Bad Implementation
    useEffect(() => {
    	document.title = `User: ${user.name}`;
    }, [user]);
    
    // Good Implementation
    useLayoutEffect(() => {
    	document.title = `User: ${user.name}`;
    }, [user]);
    
    // Why? useLayoutEffect ensures the title updates before painting.
    ```
    

1. **Managing State From Local Storage**
    
    ```tsx
    
    // Bad Implementation 
    const [theme, setTheme] = useState('');
    
    useEffect(() => {
    	setTheme(localStorage.getItem('theme') || 'light');
    }, []); // Unnecessary effect
    
    // Good Implementation
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
    
    ```