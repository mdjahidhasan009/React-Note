We can see on the official website of react it says that React is a declarative library. But what does it mean? Let's 
see an example to understand it better.

```jsx
// Imperative
const element = document.createElement('h1');
element.textContent = 'Hello, world!';
document.body.appendChild(element);
```

```jsx
// Declarative
const element = <h1>Hello, world!</h1>;
ReactDOM.render(element, document.body);
```

Also HTML is declarative. You write what you want and the browser does it for you. You don't need to write the steps to
achieve the result. You just write the result you want.

```html
<!-- Declarative -->
<h1>Hello, world!</h1>
```
    
```html
<!-- Imperative -->
<div id="root"></div>
<script>
  const element = document.createElement('h1');
  element.textContent = 'Hello, world!';
  document.getElementById('root').appendChild(element);
</script>
```

But, react is more declarative than HTML. Because in HTML you can't reuse the code. But in react you can reuse the code
by creating components. Also in react you can create your own components. But in HTML you can't create your own tags.

```jsx
// Declarative
const element = <MyComponent />;

// Imperative
const element = document.createElement('my-component');
```

In react you can create your own components and use them like HTML tags. This is the power of react. You can create your
own tags and use them in your code. This is why react is more declarative than HTML.

## Declartive and Imperative
**Declarative style of programming** is about describing what you want to achieve, rather than how to achieve it. It's like
saying "I want a cup of coffee" instead of "I want to boil water, grind coffee beans, and pour the water over the coffee
grounds". In declarative programming, you define the result you want, and the system figures out how to achieve it.

**Imperative style of programming** is about describing how to achieve a result. It's like saying "I want to boil water,
grind coffee beans, and pour the water over the coffee grounds" instead of "I want a cup of coffee". In imperative
programming, you define the steps to achieve the result.

In declarative programming, you focus on the what, while in imperative programming, you focus on the how. Declarative
programming is often more concise and easier to understand, while imperative programming can be more flexible and powerful.

## React is Declarative
React is a declarative library because you describe the UI you want, and React takes care of updating the DOM to match that
description. You don't have to worry about how to update the DOM, you just describe the UI you want, and React figures out
how to update the DOM to match that description.

## Declarative and Imperative both in JavaScript
In JavaScript, we can write both declarative and imperative code. Let's see an example to understand it better.

### Imperative `for` loop
```js
//Double each numer in the array
let doubled = [];
for(let i = 0; i < numbers.length; i++) {
  doubled.push(numbers[i] * 2);
}
console.log(doubled);
```

Here we have many thing like **iteration statement** `for(let i = 0; i < numbers.length; i++)`, **accumulator variable**
`let doubled = []`, **iteration variable** `i`, **starting point** `0`, **iteration condition** `i < numbers.length`, 
**iteration expression** `i++`, and body with **execution statement** `doubled.push(numbers[i] * 2)`.

### Declarative `map` method
```js
//Double each numer in the array
let doubled = numbers.map(num => num * 2);
console.log(doubled);
```
In this declarative code, we don't have to worry about the iteration statement, accumulator variable, iteration variable,
starting point, iteration condition, iteration expression, and execution statement. 

We just have **function iterator** `map`, **executable statement** `num * 2`, and **iteration variable** `num`.


We can also make same example with OOP.

```js
// Declarative
class Sum {
  constructor(numbers) {
    this.numbers = numbers;
  }

  calculate() {
    return this.numbers.reduce((acc, num) => acc + num, 0);
  }
}

const numbers = [1, 2, 3, 4, 5];
const sum = new Sum(numbers).calculate();
console.log(sum);
```

```js
// Imperative
class Sum {
  constructor(numbers) {
    this.numbers = numbers;
  }

  calculate() {
    let sum = 0;
    for (let i = 0; i < this.numbers.length; i++) {
      sum += this.numbers[i];
    }
    return sum;
  }
}   

const numbers = [1, 2, 3, 4, 5];
const sum = new Sum(numbers).calculate();
console.log(sum);
```

In the declarative code, we don't have to worry about the iteration statement, accumulator variable, iteration variable,
starting point, iteration condition, iteration expression, and execution statement.

## Perception of Declarative
Declarative is a perception. It's not a strict rule. One declarative code for someone can be imperative for someone else.

If we go one level deeper, we can see that declarative code is also imperative. Such as in the below example in C 
language(C is compiled language) it is imperative code in comparison the JavaScript code `for` loop implementation.

But if we compare the C code with Assembly code, we can see that the C code is declarative. Because in Assembly code we
have to write step by step how to do the operation like more **explicit memory allocation**
```
section .data
    array:  dd 1, 2, 3, 4, 5  ; Define array with initial values
    size:   dd 0              ; Define size variable
```
**Moving data from memory to register**
```
mov eax, dword [array + esi*4]
```
**Bitwise operation**
```
shl eax, 1
```
**Level for start and end of loop**
```
loop_start:
```
```
loop_end:
```
**Explicit jumping between levels**
```
jmp loop_start
```

**Now in comparison C with Assembly, C is more declarative than Assembly.**

### Full Code
**JavaScript**
```js
//Double each numer in the array
let doubled = [];
for(let i = 0; i < numbers.length; i++) {
  doubled.push(numbers[i] * 2);
}
console.log(doubled);
```

**C**
```
#include <stdio.h>

int main() {
    int array[] = {1, 2, 3, 4, 5};
    int size = sizeof(array) / sizeof(array[0]);
    for (int i = 0; i < size; i++) {
        array[i] *= 2;
    }
    return 0;
}
```
**Assembly**
```
section .data
    array:  dd 1, 2, 3, 4, 5            ; Define array with initial values
    size:   dd 0                        ; Define size variable

section .text
    global _start

_start:
    ; Loop through the array
    xor esi, esi                        ; Initialize loop counter (i = 0)

loop_start:
    ; Compare loop counter with size
    cmp esi, dword [size]
    jge loop_end                        ; Jump to loop_end if i >= size

    ; Double array[i]
    mov eax, dword [array + esi*4]      ; Load array[i] into EAX
    shl eax, 1                          ; Double the value in EAX = (EAX * 2)
    mov dword [array + esi*4], eax      ; Store doubled value back into array[i]

    ; Increment loop counter
    inc esi                             ; i++

    ; Continue looping
    jmp loop_start

loop_end:
    ; Exit program
    mov eax, 1                          ; Exit syscall number
    xor ebx, ebx                        ; Exit status (0)
    int 0x80                            ; Perform syscall
```

### Moving to Higher Level of Abstraction in Declarative
In the below example, we can see that the declarative code is more abstract than the imperative code. We can say example
2 is more declarative than example 1. Because in example 1 we have to write the steps to achieve the result. But in
example 2 we just write the result we want.

Also, example 3 is more declarative than example 2. Because in example 2 we have to write the steps to achieve the result.
But in example 3 we just write the result we want.

Example 1
```js
//Double each numer in the array
let doubled = [];
for(let i = 0; i < numbers.length; i++) {
  doubled.push(numbers[i] * 2);
}
console.log(doubled);
```

Example 2
```js
//Double each numer in the array
let doubled = numbers.map(num => num * 2);
console.log(doubled);
```

Example 3
```js
function double(array) {
    //Double each numer in the array
    return array.map(num => num * 2);
}
```

# React is more Declarative than HTML
Both React and HTML are declarative, but React is more declarative than HTML. 

In HTML, we have to write the content of each tag explicitly. For example, to display a card with a count of 0, we have to
write the following HTML code:
```html
<div class="card">
  <p>Count: 0</p>
</div>  
```
But in React, we can use variables and expressions to generate the content of the tags. For example, to display a card with
a count of 0 in React, we can write the following JSX code:
```jsx
<div className="card">
  <p>Count: {count}</p>
</div>
```
HTML represent declarative static content, while React represent declarative dynamic content. 



# Resources:
* [Why React is Declarative?](https://www.youtube.com/watch?v=TVmRuP0_RGM&t=29s)