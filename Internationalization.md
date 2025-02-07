## React Internationalization with React Intl
### What is React Intl?

The `React Intl` library simplifies internationalization in React. It provides components and an API for formatting
strings, dates, numbers, and handling pluralization. `React Intl` is part of FormatJS, offering React bindings through 
its components and API. It has API that can handle everything from strings, dates, and numbers, to pluralization and
relative time formatting. React Intl is part of FormatJS, which provides binding to react via its components and API.

### Main Features of React Intl

*   Display numbers with separators.
*   Display dates and times correctly.
*   Display dates relative to "now".
*   Pluralize labels in strings.
*   Support for 150+ languages.
*   Runs in the browser and Node.
*   Built on standards.

### Formatting Methods in React Intl

React Intl offers two ways to format strings, numbers, and dates:

1.  **Using React Components:**
    ```jsx
    <FormattedMessage
      id={"account"}
      defaultMessage={"The amount is less than minimum balance."}
    />
    ```

2.  **Using an API:**
    ```javascript
    import { defineMessages, formatMessage } from 'react-intl'; // Import necessary functions

    const messages = defineMessages({
      accountMessage: {
        id: "account",
        defaultMessage: "The amount is less than minimum balance.",
      },
    });

    formatMessage(messages.accountMessage);
    ```

### Using `<FormattedMessage>` as Placeholder
`<Formatted... />` components return elements, not plain text, so they can't be used directly as placeholders. Use the
lower-level `formatMessage()` API instead. Inject the `intl` object using the `injectIntl()` higher-order component.

```javascript
import React from "react";
import { injectIntl, intlShape } from "react-intl";

const MyComponent = ({ intl }) => {
  const placeholder = intl.formatMessage({ id: "messageId" });
  return <input placeholder={placeholder} />;
};

MyComponent.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(MyComponent);
```

### Accessing Current Locale
Get the current locale using `injectIntl()`:
```js
import { injectIntl, intlShape } from "react-intl";

const MyComponent = ({ intl }) => (
  <div>{`The current locale is ${intl.locale}`}</div>
);

MyComponent.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(MyComponent);
```

### Formatting Date
The injectIntl() higher-order component will give you access to the formatDate() method via the props in your component. 
The method is used internally by instances of FormattedDate and it returns the string representation of the formatted
date.

```js
import { injectIntl, intlShape } from "react-intl";

const MyComponent = ({ intl }) => {
  const stringDate = intl.formatDate(new Date(), { // Pass a Date object
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  return (
    <div>{`The formatted date is ${stringDate}`}</div>
  );
};

MyComponent.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(MyComponent);
```

### References
* [reactjs-interview-questions - github](https://github.com/sudheerj/reactjs-interview-questions)

