## React vs. React Native

*   **React:** A JavaScript library for building user interfaces and web applications. It supports both front-end web development and server-side rendering.

*   **React Native:** A mobile framework that compiles to native app components. It allows you to build native mobile applications (iOS, Android, and Windows) using JavaScript and React components.  React Native uses React under the hood.

## Testing React Native Apps

React Native apps are typically tested in mobile simulators (iOS and Android). You can also run the app on a physical mobile device using tools like Expo (https://expo.io), which syncs your mobile device and computer over the same wireless network using a QR code.

## Logging in React Native

Use standard JavaScript console logging methods like `console.log`, `console.warn`, etc.  To view logs in the console (React Native v0.29 and later):

```bash
$ react-native log-ios  // For iOS logs
$ react-native log-android // For Android logs
```

## Debugging React Native Apps

1.  Run your application in the iOS simulator (or Android emulator).
2.  Press `Command + D` (or the equivalent for Android) to open the React Native debug menu. Select "Debug JS Remotely" or similar. A webpage should open at `http://localhost:8081/debugger-ui` (or similar).
3.  Enable "Pause On Caught Exceptions" in the debugger for a better debugging experience.
4.  Open the Chrome Developer Tools (or your preferred browser's dev tools) by pressing `Command + Option + I` or through the browser's menu (View -> Developer -> Developer Tools).
5.  You should now be able to debug your React Native app as you normally would a web application.

### References
* [reactjs-interview-questions - github](https://github.com/sudheerj/reactjs-interview-questions?tab=readme-ov-file#what-is-react)