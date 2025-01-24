# mounting

When a component first appears on the screen, we call it mounting. This is when React creates this component's instance 
for the first time, initializes its state, runs its hooks, and appends elements to the DOM. The end result - we see 
whatever we render in this component on the screen.

# unmounting
When React detects that a component is not needed anymore. So it does the final clean-up, destroys this component's 
instance and everything associated with it, like the component's state, and finally removes the DOM element associated 
with it.

### Source:
* [Advanced React](https://www.advanced-react.com/)