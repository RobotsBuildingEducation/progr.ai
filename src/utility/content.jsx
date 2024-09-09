export const getObjectsByGroup = (groupNumber, arrayOfObjects) => {
  return arrayOfObjects.filter((obj) => obj.group === groupNumber);
};

export const steps = {
  en: [
    {
      group: "0",
      title: "Welcome to the Program AI App!",
      description:
        "Press 'Let's start' to begin your journey in learning how to code.",
    },
    {
      group: "tutorial",
      title: "Understanding Codin g",
      description: "Grasp the basic concept of coding.",
      isMultipleChoice: true,
      // isMultipleAnswerChoice: true,
      question: {
        questionText: "Which of the following best describes coding?",
        options: [
          "Writing instructions for computers to perform tasks",
          "Creating physical components for computers",
          "Designing user interfaces",
          "Managing databases",
        ],
        answer: "Writing instructions for computers to perform tasks",
      },
    },
    {
      group: "tutorial",
      title: "Sequence of Program Execution",
      description: "Learn the correct order of program execution.",
      isSelectOrder: true,
      question: {
        questionText:
          "Arrange the steps with drag-and-drop and order how programs execute.",
        options: [
          "Code Compilation",
          "Writing Code",
          "Executing Program",
          "Debugging",
        ],
        answer: [
          "Writing Code",
          "Code Compilation",
          "Debugging",
          "Executing Program",
        ],
      },
    },
    {
      group: "tutorial",
      title: "Introduction to Variables",
      description:
        "In this step, you will learn about variables and how to use them in your code.",
      isMultipleAnswerChoice: true,
      question: {
        questionText:
          "Select all the steps involved in correctly declaring a variable in JavaScript:",
        options: [
          "Use the var/let/const keyword",
          "Choose a descriptive variable name",
          "Assign a value using the single equals sign (=)",
          "Initialize the variable inside curly braces {}",
          "Declare the variable after assigning a value",
          "Capitalize the first letter of the variable name",
        ],
        answer: [
          "Use the var/let/const keyword",
          "Choose a descriptive variable name",
          "Assign a value using the single equals sign (=)",
        ],
      },
    },
    {
      group: "tutorial",
      title: "Understanding Variable Declarations for Lists",
      description:
        "Complete the code by selecting the correct way to declare a array of items (array) in JavaScript.",
      isCodeCompletion: true,
      question: {
        questionText: "Which code block correctly declares a list of items?",
        options: [
          // Option 1: Correct array declaration

          // Option 2: Function returning a string
          `const items = function() {
  return 'apple, banana, cherry';
};`,

          // Option 3: Single string of items
          `const items = 'apple, banana, cherry';`,

          // Option 4: Object with key-value pairs
          `const items = {
  fruit1: 'apple',
  fruit2: 'banana',
  fruit3: 'cherry'
};`,

          // Option 5: Class that stores items as properties
          `class Items {
  constructor() {
    this.fruit1 = 'apple';
    this.fruit2 = 'banana';
    this.fruit3 = 'cherry';
  }
}
const items = new Items();`,
          `const items = ['apple', 'banana', 'cherry'];`,
        ],
        answer: `const items = ['apple', 'banana', 'cherry'];`,
      },
    },
    {
      group: "tutorial",
      title: "Variable Declaration in JavaScript",
      description: "Learn how to declare variables in JavaScript.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText:
          "Declare a variable named `age` and assign it the value `25`.",
      },
    },
    {
      group: "tutorial",
      title: "Understanding Data Types",
      description: "Learn the basics of data types in JavaScript.",
      isSingleLineText: true,
      question: {
        questionText:
          "What keyword is used to declare a constant in JavaScript?",
        placeholder: "Type your answer here...",
        answer: "const",
      },
    },
    {
      group: "tutorial",
      title: "Purpose of Variables",
      description: "Understand why variables are used in programming.",
      isText: true,
      question: {
        questionText:
          "In your own words, explain the purpose of variables in programming.",
      },
    },
    {
      group: "tutorial",
      title: "Bash Terminal Practice: Changing Directories",
      description: "Practice changing directories in a terminal environment.",
      isCode: true,
      isTerminal: true,
      question: {
        questionText:
          "Enter the command to change to the new_folder directory using a bash terminal",
      },
    },
    {
      groupReference: "tutorial",
      title: "Review With AI Conversation",
      isConversationReview: true,
      description: "Review the subjects you've answered",
      question: {
        questionText: "Let's chat about the questions we've worked on so far.",
        range: [1, 8], // Indices of steps to review
      },
    },
    // Cycle 2 (No Terminal)
    {
      group: "1",
      title: "Data Types in Programming",
      description:
        "Identify different primitive data types used in JavaScript.",
      isMultipleAnswerChoice: true,
      question: {
        questionText:
          "Which of the following are primitive data types in JavaScript?",
        options: [
          "String",
          "Function",
          "Number",
          "Object",
          "Boolean",
          "Null",
          "Array",
          "BigInt",
          "Undefined",
          "Symbol",
        ],
        answer: [
          "String",
          "Number",
          "Boolean",
          "Null",
          "Undefined",
          "Symbol",
          "BigInt",
        ],
      },
    },
    {
      group: "1",
      title: "Steps to Create a Function",
      description: "Understand the sequence of creating a function.",
      isSelectOrder: true,
      question: {
        questionText:
          "Arrange the steps with drag-and-drop to create and use a function.",
        options: [
          "Define the function",
          "Call the function",
          "Execute the function body",
          "Return a value",
        ],
        answer: [
          "Define the function",
          "Call the function",
          "Execute the function body",
          "Return a value",
        ],
      },
    },
    {
      group: "1",
      title: "Writing a Simple Function",
      description: "Practice writing functions in JavaScript.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText:
          "Write a function named `greet` that takes a name as a parameter and logs a greeting with the name.",
      },
    },
    {
      group: "1",
      title: "Functions in Programming",
      description: "Discuss the role of functions.",
      isText: true,
      question: {
        questionText:
          "What is a function, and why is it useful in programming?",
      },
    },
    // Cycle 3 with Terminal
    {
      group: "1",
      title: "Conditional Statements",
      description: "Identify the purpose of conditional statements.",
      isMultipleChoice: true,
      question: {
        questionText: "What is the primary purpose of an `if` statement?",
        options: [
          "To repeat a block of code multiple times",
          "To execute a block of code based on a condition",
          "To define a variable",
          "To import external libraries",
        ],
        answer: "To execute a block of code based on a condition",
      },
    },
    {
      group: "1",
      title: "Order of Conditional Checks",
      description: "Complete the code that evaluates an `if-else` statement.",
      isCodeCompletion: true,
      question: {
        questionText:
          "Complete the following code to correctly implement an `if-else` statement that checks if a variable `x` is greater than 10, equal to 10, or less than 10.",
        options: [
          // Option 1: Partially complete if-else statement
          "if (x > 10) { \n  console.log('x is greater than 10'); \n} else if (x === 10) { \n  console.log('x is equal to 10'); \n} else { \n  console.log('x is less than 10'); \n}",

          // Option 2: Incorrect use of equality and missing else block
          "if (x == 10) { \n  console.log('x is equal to 10'); \n} else if (x > 10) { \n  console.log('x is greater than 10'); \n}",

          // Option 3: Missing else-if statement
          "if (x > 10) { \n  console.log('x is greater than 10'); \n} else { \n  console.log('x is not greater than 10'); \n}",

          // Option 4: Incorrect use of conditions
          "if (x >= 10) { \n  console.log('x is greater than or equal to 10'); \n} else { \n  console.log('x is less than 10'); \n}",

          // Option 5: Correct but over-complicated code with nested ifs
          "if (x > 10) { \n  console.log('x is greater than 10'); \n  if (x === 10) { \n    console.log('x is equal to 10'); \n  } \n} else { \n  console.log('x is less than 10'); \n}",
        ],
        answer:
          "if (x > 10) { \n  console.log('x is greater than 10'); \n} else if (x === 10) { \n  console.log('x is equal to 10'); \n} else { \n  console.log('x is less than 10'); \n}",
      },
    },
    {
      group: "1",
      title: "Implementing Conditional Logic",
      description: "Apply conditional logic in code.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText:
          "Write an `if-else` statement that checks if a number `num` is positive, negative, or zero, and logs an appropriate message.",
      },
    },
    {
      group: "1",
      title: "Understanding Conditional Logic in Programming",
      description:
        "Learn how logical operators like AND (&&) and OR (||) control conditions in programming.",
      isSingleLineText: true,
      question: {
        questionText:
          "Which logical operator is used to check if both conditions in a conditional statement are true?",
        placeholder: "Type your answer here...",
        answer: "&&",
      },
    },
    {
      group: "1",
      title: "Real-world Use of Conditionals",
      description: "Reflect on how conditionals are used.",
      isText: true,
      question: {
        questionText:
          "Provide an example of how conditional statements are used in real-world applications.",
      },
    },
    {
      group: "1",
      title: "Terminal Practice: Help Command",
      description: "Write the help command to observe basic commands.",
      isCode: true,
      isTerminal: true,
      question: {
        questionText:
          "In a Bash terminal environment, enter the help command to discover basic commands.",
      },
    },
    // Cycle 4 (No Terminal)
    {
      group: "1",
      title: "Loops in Programming",
      description: "Understand the purpose of loops.",
      isMultipleChoice: true,
      question: {
        questionText:
          "Which loop will continue executing as long as its condition remains true?",
        options: ["for loop", "while loop", "do...while loop", "foreach loop"],
        answer: "while loop",
      },
    },
    {
      group: "1",
      title: "Sequence of Loop Execution",
      description: "Grasp the order in which loops execute.",
      isSelectOrder: true,
      question: {
        questionText:
          "Arrange the steps of a `for` loop execution with drag-and-drop.",
        options: [
          "Initialization",
          "Condition Check",
          "Execution of Code Block",
          "Increment/Decrement",
        ],
        answer: [
          "Initialization",
          "Condition Check",
          "Execution of Code Block",
          "Increment/Decrement",
        ],
      },
    },
    {
      group: "1",
      title: "Creating a Loop",
      description: "Practice writing loops.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText: "Write a `for` loop that prints numbers from 1 to 5.",
      },
    },
    {
      group: "1",
      title: "Applications of Loops",
      description: "Discuss where loops are useful.",
      isText: true,
      question: {
        questionText:
          "Describe a scenario in software development where loops are essential.",
      },
    },
    // Cycle 5 with Terminal
    {
      group: "1",
      title: "Arrays in JavaScript",
      description:
        "Identify methods used for manipulating arrays in JavaScript.",
      isMultipleAnswerChoice: true,
      question: {
        questionText:
          "Which of the following methods are valid for manipulating arrays in JavaScript?",
        options: [
          ".includes()",
          ".push()",
          ".pop()",
          ".forEach()",
          ".length()",
          ".map()",
          ".filter()",
          ".join()",
        ],
        answer: [".push()", ".pop()", ".map()", ".filter()", ".join()"],
      },
    },
    {
      group: "1",
      title: "Order of Array Operations",
      description: "Understand how array operations are performed.",
      isCodeCompletion: true,
      question: {
        questionText:
          "Complete the code to declare an array, add an element to it, remove the last element, and then access an element.",
        options: [
          // Option 1: Correctly completes all steps

          // Option 2: Incorrect placement of push and pop
          "let fruits = ['apple', 'banana']; \nfruits.pop(); \nfruits.push('orange'); \nconsole.log(fruits[0]);",

          // Option 3: Incorrect array declaration
          "var fruits = 'apple', 'banana'; \nfruits.push('orange'); \nfruits.pop(); \nconsole.log(fruits[0]);",
          "let fruits = ['apple', 'banana']; \nfruits.push('orange'); \nfruits.pop(); \nconsole.log(fruits[0]);",

          // Option 4: Missing access of array element
          "let fruits = ['apple', 'banana']; \nfruits.push('orange'); \nfruits.pop();",

          // Option 5: Incorrect pop usage (removes specific element instead of last)
          "let fruits = ['apple', 'banana']; \nfruits.push('orange'); \nfruits.pop('banana'); \nconsole.log(fruits[0]);",
        ],
        answer:
          "let fruits = ['apple', 'banana']; \nfruits.push('orange'); \nfruits.pop(); \nconsole.log(fruits[0]);",
      },
    },
    {
      group: "1",
      title: "Manipulating Arrays",
      description: "Apply array methods in code.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText:
          "Create an array `fruits` with 'apple' and 'banana'. Add 'orange' to the end and remove 'apple' from the beginning.",
      },
    },
    {
      group: "1",
      title: "Use Cases for Arrays",
      description: "Explore scenarios where array types are used.",
      isText: true,
      question: {
        questionText:
          "Provide an example of how an array can be used to manage data in a web application.",
      },
    },
    {
      group: "1",
      title: "Terminal Practice: Creating Directories",
      description: "Creating directory command in a bash terminal",
      isCode: true,
      isTerminal: true,
      question: {
        questionText:
          "In a bash terminal environment, create a directory called app using the make directory command",
      },
    },
    {
      group: "1",
      title: "Advanced Coding Output",
      description:
        "Predict the output of the following code with arrays, conditionals, logical operators, and array functions.",
      isSingleLineText: true,
      question: {
        questionText: (
          <div>
            What will be the output of the following code?
            <br />
            <pre>
              {`
let arr = [1, 2, 3, 4];
let x = 10;
let y = 5;

if (x > y && arr.length > 3) {
  arr.push(x);  
  arr = arr.filter(n => n % 2 === 0);
}

console.log(arr);

             `}{" "}
            </pre>
          </div>
        ),
        placeholder: "Type your answer here...",
        answer: "[2, 4, 10]",
      },
    },
    {
      groupReference: "1",
      title: "Review With AI Conversation",
      isConversationReview: true,
      description: "Review the subjects you've answered",
      question: {
        questionText: "Let's chat about the questions we've worked on so far.",
        range: [10, 29], // Indices of steps to review
      },
    },
    {
      group: "2",
      title: "Introduction to Objects",
      description:
        "In this step, you will learn what an object is in programming.",
      isSingleLineText: true, // Single line text question type
      question: {
        questionText:
          "In programming, what keyword is used to create an object in JavaScript?",
        placeholder: "Type your answer here...", // Placeholder for the input
        answer: "new", // Expected one-word answer for object creation
      },
    },
    {
      group: "2",
      title: "Understanding the Constructor Method",
      description:
        "In this step, you will learn about the purpose of the `constructor` method in a class.",
      isCodeCompletion: true, // Correctly indicates it's a code completion problem
      question: {
        questionText: `Which of the following code blocks correctly defines the constructor method and uses the "new" keyword for class instantiation?`,

        options: [
          // Option 1: Correct constructor method with new keyword
          `class Car {
  constructor(brand) {
    this.brand = brand;
  }

  drive() {
    console.log('The car is driving');
  }
}

const myCar = new Car('Toyota');`,

          // Option 2: Incorrect - missing parameter
          `class Car {
  constructor() {
    this.brand = 'Toyota';
  }

  drive() {
    console.log('The car is driving');
  }
}

const myCar = new Car();`,

          // Option 3: Incorrect - wrong syntax
          `class Car {
  constructor = (brand) => {
    this.brand = brand;
  }

  drive() {
    console.log('The car is driving');
  }
}

const myCar = new Car('Toyota');`,

          // Option 4: Incorrect - uses method name instead of constructor
          `class Car {
  Car(brand) {
    this.brand = brand;
  }

  drive() {
    console.log('The car is driving');
  }
}

const myCar = new Car('Toyota');`,
        ],

        answer: `class Car {
  constructor(brand) {
    this.brand = brand;
  }

  drive() {
    console.log('The car is driving');
  }
}

const myCar = new Car('Toyota');`, // The correct answer
      },
    },
    {
      group: "2",
      title: "Understanding the Constructor Method",
      description:
        "In this step, you will learn about the purpose of the `constructor` method in a class.",
      isText: true,
      question: {
        questionText:
          "Explain the purpose of the `constructor` method in a class.",
      },
    },
    {
      group: "2",
      title: "Creating an Instance of a Class",
      description:
        "In this step, you will learn how to create an instance of a class in JavaScript.",
      isMultipleAnswerChoice: true, // Indicates it's a multiple answer question
      question: {
        questionText:
          "Select all the correct steps required to create an instance of a class in JavaScript:",
        options: [
          // Correct options
          "Define a class using the `class` keyword",
          "Define the class with the `function` keyword",
          "Use the `new` keyword to create an instance",
          "Declare the class instance with `const classInstance = Car()`",
          "Pass arguments required by the constructor when calling the class",
          "Store the new instance in a variable",
          "Call the class directly without the `new` keyword",
          "Instantiate the class before defining it",

          // Incorrect options
        ],
        answer: [
          // The 4 correct options
          "Define a class using the `class` keyword",
          "Use the `new` keyword to create an instance",
          "Pass arguments required by the constructor when calling the class",
          "Store the new instance in a variable",
        ],
      },
    },
    {
      group: "2",
      title: "Declaring a Method in a Class",
      description:
        "In this step, you will learn how to declare a method inside a class.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText:
          "Declare a method named `updateModel` in the `Car` class that updates the `model` property.",
      },
    },
    {
      group: "2",
      title: "Using the `this` Keyword",
      description:
        "Complete the code by selecting the correct way to use the `this` keyword in a class method.",
      isCodeCompletion: true,
      question: {
        questionText:
          "Which code block correctly uses the `this` keyword to refer to the object's property?",
        options: [
          // Option 1: Correct use of the `this` keyword

          // Option 2: Incorrect use of the global object
          `class Car {
  constructor(brand) {
    this.brand = brand;
  }

  showBrand() {
    console.log(brand);
  }
}

const myCar = new Car('Toyota');
myCar.showBrand();`,
          `class Car {
  constructor(brand) {
    this.brand = brand;
  }

  showBrand() {
    console.log(this.brand);
  }
}

const myCar = new Car('Toyota');
myCar.showBrand();`,

          // Option 3: Incorrect reference to class name
          `class Car {
  constructor(brand) {
    brand = this.brand;
  }

  showBrand() {
    console.log(brand);
  }
}

const myCar = new Car('Toyota');
myCar.showBrand();`,

          // Option 4: Incorrect reference to method name
          `class Car {
  constructor(brand) {
    brand = this.brand;
  }

  showBrand() {
    console.log(this.brand);
  }
}

const myCar = new Car('Toyota');
myCar.showBrand();`,
        ],
        answer: `class Car {
  constructor(brand) {
    this.brand = brand;
  }

  showBrand() {
    console.log(this.brand);
  }
}

const myCar = new Car('Toyota');
myCar.showBrand();`,
      },
    },
    {
      group: "2",
      title: "Adding Properties to an Object",
      description:
        "In this step, you will learn how to add properties to an object in JavaScript.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText: "Add a new property `year` to the `Car` class.",
      },
    },
    {
      group: "2",
      title: "Accessing and Modifying Object Properties",
      description:
        "In this step, you will learn how to get or set properties of an object in JavaScript, either by directly accessing properties or by using getter and setter functions.",
      isMultipleAnswerChoice: true,
      question: {
        questionText:
          "Which of the following are valid ways to get or set properties in a JavaScript object?",
        options: [
          "Use a function call to delete a property (e.g., obj.deleteProperty())",
          "Use bracket notation to access a property (e.g., obj['property'])",
          "Use a setter function to update a property value",
          "Use dot notation to access a property (e.g., obj.property)",
          "Use a getter function to return a property value",
          "Directly call obj.property() to access a property",
        ],
        answer: [
          "Use dot notation to access a property (e.g., obj.property)",
          "Use bracket notation to access a property (e.g., obj['property'])",
          "Use a getter function to return a property value",
          "Use a setter function to update a property value",
        ],
      },
    },
    {
      group: "2",
      title: "Modifying Object Properties",
      description:
        "In this step, you will learn how to modify properties of an object in JavaScript.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText:
          "Modify the `model` property of an instance of the `Car` class.",
      },
    },
    {
      group: "2",
      title: "Understanding Inheritance",
      description:
        "In this step, you will learn about inheritance in object-oriented programming.",
      isText: true,
      question: {
        questionText: "What is inheritance in object-oriented programming?",
      },
    },
    {
      group: "2",
      title: "Implementing Inheritance",
      description:
        "In this step, you will implement inheritance in JavaScript by extending a class.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText:
          "Extend the `Car` class to create an `ElectricCar` class with an additional property `batteryLife`.",
      },
    },
    {
      group: "2",
      title: "Overriding Methods",
      description:
        "In this step, you will learn how to override methods in a subclass.",
      isMultipleChoice: true,
      question: {
        questionText: "What does it mean to override a method in a subclass?",
        options: [
          "To delete the method from the class",
          "To replace a method inherited from the superclass",
          "To inherit a method without changes",
          "To call a method from a different class",
          "To extend a method's functionality in the subclass",
        ],
        answer: "To replace a method inherited from the superclass",
      },
    },

    {
      group: "2",
      title: "Understanding Encapsulation",
      description:
        "In this step, you will learn about encapsulation in object-oriented programming.",
      isText: true,
      question: {
        questionText: "What is encapsulation in object-oriented programming?",
      },
    },
    {
      group: "2",
      title: "Implementing Encapsulation",
      description:
        "In this step, you will implement encapsulation by using getter and setter methods.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText:
          "Add getter and setter methods for the `batteryLife` property in the `ElectricCar` class.",
      },
    },
    {
      group: "2",
      title: "Understanding Encapsulation",
      description:
        "In this step, you will define the concept of encapsulation in object-oriented programming with a single word.",
      isSingleLineText: true,
      question: {
        questionText:
          "What is the primary concept encapsulation ensures in object-oriented programming?",
        placeholder: "Type your answer here...",
        answer: "Privacy",
      },
    },
    {
      group: "2",
      title: "Combining Concepts",
      description:
        "In this step, you will combine various concepts learned to create a small project.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText:
          "Create a small project that defines a `Person` class, uses inheritance to create a `Student` class, and demonstrates encapsulation and arrays of objects.",
      },
    },
    {
      group: "2",
      title: "Printing In The Terminal",
      description: "In this step, you will print a message using the terminal",
      isCode: true,
      isTerminal: true,
      question: {
        questionText:
          "Type a command to print the message: 'I'm talking to the inside of a computer!'",
      },
    },
    {
      groupReference: "2",
      title: "Review With AI Conversation",
      isConversationReview: true,
      description: "Review the subjects you've answered",
      question: {
        questionText: "Let's chat about the questions we've worked on so far.",
        range: [31, 47], // Indices of steps to review
      },
    },
    {
      group: "3",
      title: "Introduction to React Components",
      description:
        "In this step, you will learn about React components, their role in creating reusable UI elements, and how they help manage the user interface efficiently.",
      isMultipleChoice: true,
      question: {
        questionText:
          "Which of the following best describes a React component?",
        options: [
          "A method for handling events in JavaScript",
          "A feature exclusive to server-side rendering in React",
          "A reusable piece of user interface defined as a function or class that returns JSX",
          "A built-in HTML element in React",
        ],
        answer:
          "A reusable piece of user interface defined as a function or class that returns JSX",
      },
    },
    {
      group: "3",
      title: "Key Concepts in React",
      description:
        "In this step, you will learn about the fundamental concepts of React, including properties (props), state, events, and styles.",
      isMultipleAnswerChoice: true,
      question: {
        questionText: "Which of the following are key concepts in React?",
        options: [
          "Managing properties to pass data between components",
          "Manipulating the DOM directly for better performance",
          "Using state to manage data within a component",
          "Handling events such as clicks with event handlers",
          "Applying inline styles or CSS classes to components",
        ],
        answer: [
          "Managing properties to pass data between components",
          "Using state to manage data within a component",
          "Handling events such as clicks with event handlers",
          "Applying inline styles or CSS classes to components",
        ],
      },
    },
    {
      group: "3",
      title: "Effect of State Changes on a Component",
      description:
        "In this step, you will explain what happens to a React component when its state changes.",
      isText: true,
      question: {
        questionText:
          "What happens to a React component when its state changes?",
      },
    },
    {
      group: "3",
      title: "Creating a Simple React Component",
      description:
        "In this step, you will define a basic React component that returns some simple JSX.",
      isCodeCompletion: true,
      question: {
        questionText:
          "Which of the following code blocks correctly defines a simple React component that returns a heading and a paragraph?",
        options: [
          // Option 1: Correct answer
          `function MyComponent() {
  return (
    <div>
      <h1>Hello, World!</h1>
    </div>
  );
}`,

          // Option 2: Incorrect - missing return statement
          `function MyComponent() {
  <div>
    <h1>Hello, World!</h1>
  </div>;
}`,

          // Option 3: Incorrect - uses class instead of function
          `class MyComponent {
  render() {
    return (
      <div>
        <h1>Hello, World!</h1>
      </div>
    );
  }
}`,

          // Option 4: Incorrect - missing JSX inside the return
          `function MyComponent() {
  return (
    <div>Hello</div>
    <div>World</div>
  );
}`,
        ],
        answer: `function MyComponent() {
  return (
    <div>
      <h1>Hello, World!</h1>
    </div>
  );
}`,
      },
    },
    {
      group: "3",
      title: "Handling Events in React",
      description:
        "In this step, you will define a basic React component that handles a button click event using the `onClick` attribute.",
      isCodeCompletion: true,
      question: {
        questionText:
          "Which of the following code blocks correctly defines a React component that handles a button click event?",
        options: [
          // Option 2: Incorrect - no event handler function defined
          `function MyComponent() {
  return (
    <div>
      <button 
        onClick={
          alert('Button clicked!')
        }
      >
        Click me
      </button>
    </div>
  );
}`,

          // Option 3: Incorrect - inline event handler, not recommended
          `function MyComponent() {
return (
  <div>
    <button 
      onClick= () => {
        alert('Button clicked!')
      }
    >
      Click me
    </button>
  </div>
);
}`,
          `function MyComponent() {
  const handleClick = () => {
    alert('Button clicked!');
  };
    
  return (
    <div>
      <button 
        onClick={handleClick}
      >
        Click me
      </button>
    </div>
  );
}`,

          // Option 4: Incorrect - no onClick attribute
          `function MyComponent() {
return (
  <div>
    <button>
      Click me
    </button>
  </div>
);
    }`,
        ],
        answer: `function MyComponent() {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div>
      <button 
        onClick={handleClick}
      >
        Click me
      </button>
    </div>
  );
}`,
      },
    },

    {
      group: "3",
      title: "Managing State with useState Hook",
      description:
        "In this step, you will learn how to use the useState hook to manage the state of a component.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText: `Modify the Tweet component to include a like button that toggles the liked state using the useState hook.`,
      },
    },
    {
      group: "3",
      title: "Component Properties",
      description:
        "In this step, you will learn about passing properties to components in React.",
      isSingleLineText: true,
      question: {
        questionText:
          "What is the term used for passing data to a React component?",
        placeholder: "Type your answer here...",
        answer: "props",
      },
    },
    {
      group: "3",
      title: "Passing and Using Props",
      description:
        "In this step, you will learn how to pass and use props in a React component.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText:
          "Update the Tweet component to accept and display the user's name, handle, and tweet content as props.",
      },
    },
    {
      group: "3",
      title: "Working with Props and State Together",
      description:
        "In this step, you will learn how to work with both props and state in a React component.",
      isMultipleChoice: true,
      question: {
        questionText:
          "What is the main difference between props and state in React?",
        options: [
          "Props are immutable while state is mutable",
          "Props are managed by the component itself while state is passed down from parent components",
          "State is used for styling while props are used for logic",
          "There is no difference; they are the same",
        ],
        answer: "Props are immutable while state is mutable",
      },
    },
    {
      group: "3",
      title: "Terminal Practice: Listing Files",
      description:
        "In this step, you will learn how to list files in a bash terminal.",
      isCode: true,
      isTerminal: true,
      question: {
        questionText: `Use the terminal to list all the files using the list command.`,
      },
    },

    {
      group: "3",
      title: "Styling React Components",
      description:
        "In this step, you will learn how to style React components using CSS.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText: `Add styles to the Tweet component to improve its appearance.`,
      },
    },
    {
      group: "3",
      title: "Using Flexbox for Layouts",
      description:
        "In this step, you will learn how to use Flexbox to create layouts in React.",
      isSelectOrder: true,
      question: {
        questionText:
          "Arrange the following CSS properties in the order needed to center a basic layout with flexbox styling:",
        options: [
          "display: flex;",
          "justify-content: center;",
          "align-items: center;",
          "flex-direction: row;",
        ],
        answer: [
          "display: flex;",
          "flex-direction: row;",
          "justify-content: center;",
          "align-items: center;",
        ],
      },
    },
    {
      group: "3",
      title: "Lifting State Up",
      description:
        "In this step, you will learn how to lift state up to a common ancestor component to share state between components.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText: `Create a parent component that manages the state for multiple Tweet components and passes the state and event handlers as props.`,
      },
    },
    {
      group: "3",
      title: "Using useEffect for Side Effects",
      description:
        "In this step, you will learn how to use the useEffect hook to handle side effects in a React component.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText:
          "Modify the Tweet component to use the useEffect hook to log a message to the console every time the number of retweets changes.",
      },
    },

    {
      group: "3",
      title: "Understanding Component Lifecycle",
      description:
        "In this step, you will learn about the lifecycle of React components and how to use useEffect hook to manage side effects.",
      isText: true,
      question: {
        questionText:
          "What is the component lifecycle in React and what is the purpose of the useEffect hook?",
      },
    },
    {
      group: "3",
      title: "Fetching Data with useEffect",
      description:
        "In this step, you will learn how to fetch data from an API using the useEffect hook.",
      isSelectOrder: true,
      question: {
        questionText:
          "Arrange the steps with drag-and-drop to correctly fetch data using useEffect.",
        options: [
          "Import React and useState",
          "Import useEffect from React",
          "Create a component",
          "Define the useEffect hook",
          "Make the API call inside useEffect",
          "Use async/await or .then() to handle the API response",
          "Update the component state with the fetched data",
          "Handle errors in the API call",
          "Render the data in the component",
        ],
        answer: [
          "Import React and useState",
          "Import useEffect from React",
          "Create a component",
          "Define the useEffect hook",
          "Make the API call inside useEffect",
          "Use async/await or .then() to handle the API response",
          "Update the component state with the fetched data",
          "Handle errors in the API call",
          "Render the data in the component",
        ],
      },
    },

    {
      group: "3",
      title: "Building a Complete Tweet App",
      description:
        "In this step, you will combine everything you have learned to build a complete Tweet app.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText: `Build a complete Tweet app that fetches tweets from an API, displays them using the Tweet component, and allows users to like and retweet.`,
      },
    },
    {
      group: "3",
      title: "Terminal Practice: Setting Up A React App",
      description: "In this step, you will learn how to set up a react project",

      isText: true,
      question: {
        questionText:
          "Enter the command to install the latest version of a react project with vite.",
      },
    },
    {
      group: "3",
      title: "Creating a New React Project with Vite",
      description:
        "In this step, you will learn how to create a new React project using Vite by following the correct steps and running command-line commands.",
      isSelectOrder: true,
      question: {
        questionText:
          "Arrange the steps with drag-and-drop to correctly create a new React project using Vite, including command-line commands.",
        options: [
          "Ensure Node.js, NPM and VSCode are installed",
          "Run `npm create vite@latest` to create a new Vite project",
          "Select the React template when prompted",
          "Navigate to the project directory using `cd project-name`",
          "Run `npm install` to install dependencies",
          "Start the development server with `npm run dev`",
        ],
        answer: [
          "Ensure Node.js, NPM and VSCode are installed",
          "Run `npm create vite@latest` to create a new Vite project",
          "Select the React template when prompted",
          "Navigate to the project directory using `cd project-name`",
          "Run `npm install` to install dependencies",
          "Start the development server with `npm run dev`",
        ],
      },
    },
    {
      groupReference: "3",
      title: "Review With AI Conversation",
      isConversationReview: true,
      description: "Review the subjects you've answered",
      question: {
        questionText: "Let's chat about the questions we've worked on so far.",
        range: [49, 67], // Indices of steps to review
      },
    },
    {
      group: "4",
      title: "Introduction to Backend Engineering",
      description:
        "In this step, you will learn about what backend software engineering is and why it is important.",
      isText: true,
      question: {
        questionText:
          "What is backend software engineering and why is it important in building applications?",
      },
    },
    {
      group: "4",
      title: "Main Lessons Overview",
      description:
        "In this step, you will identify a core responsibility of backend engineering covered in the course.",
      isMultipleChoice: true,
      question: {
        questionText:
          "Which of the following is a core responsibility in backend engineering?",
        options: [
          "Managing concurrency and ensuring thread safety in multi-user applications",
          "Implementing user authentication directly in the user experience",
          "Handling memory allocation and garbage collection in server environments",
          "Designing scalable UI components for cross-browser compatibility",
          "Optimizing database queries and ensuring data consistency",
        ],
        answer: "Optimizing database queries and ensuring data consistency",
      },
    },
    {
      group: "4",
      title: "Key Responsibilities of Backend Engineering",
      description:
        "In this step, you will learn about the various responsibilities involved in backend engineering.",
      isMultipleAnswerChoice: true,
      question: {
        questionText:
          "Which of the following are core responsibilities of backend engineering?",
        options: [
          "Managing and optimizing databases for storing and retrieving data efficiently",
          "Designing and implementing APIs to facilitate communication between systems",
          "Ensuring security through user authentication and authorization mechanisms",
          "Handling server-side logic, including business operations and calculations",
          "Maintaining server reliability and performance under high traffic",
          "Managing data integrity and consistency across distributed systems",
          "Implementing logging and monitoring to ensure system health and debug issues",
        ],
        answer: [
          "Managing and optimizing databases for storing and retrieving data efficiently",
          "Designing and implementing APIs to facilitate communication between systems",
          "Ensuring security through user authentication and authorization mechanisms",
          "Handling server-side logic, including business operations and calculations",
          "Maintaining server reliability and performance under high traffic",
          "Managing data integrity and consistency across distributed systems",
          "Implementing logging and monitoring to ensure system health and debug issues",
        ],
      },
    },
    {
      group: "4",
      title: "Interfacing with the Terminal",
      description:
        "In this step, you will learn about the importance of the terminal in backend engineering and how to interact with it for various tasks.",
      isText: true,
      question: {
        questionText:
          "Why is learning to use the terminal important for operating systems, and what kinds of tasks can you perform using the terminal?",
      },
    },
    {
      group: "4",
      title: "Installing NPM",
      description: "In this step, you will learn how to install npm globally",

      isText: true,
      question: {
        questionText:
          "Write the command to install the node package manager (npm) globally onto your computer",
      },
    },
    {
      group: "4",
      title: "Installing An NPM Package",
      description:
        "In this step, you will use the terminal to install a package with npm.",
      isText: true,
      question: {
        questionText: `Write a command to install Chakra's react component library for user interface elements.`,
      },
    },
    {
      group: "4",
      title: "User Creation and Authentication",
      description:
        "In this step, you will understand the key concept related to creating users in backend systems.",
      isSingleLineText: true,
      question: {
        questionText:
          "What is the process called that verifies a user's identity during account creation?",
        placeholder: "Type your answer here...",
        answer: "authentication",
      },
    },
    {
      group: "4",
      title: "Database Foundations",
      description:
        "In this step, you will learn about the foundations of databases in backend engineering.",
      isText: true,
      question: {
        questionText:
          "What are the main types of databases used in backend engineering?",
      },
    },
    {
      group: "4",
      title: "Connecting Systems",
      description:
        "Write a code snippet to connect an application to a Firebase database.",
      isCode: true,
      question: {
        questionText: `Write a code snippet to connect an application to a Firebase database.`,
      },
    },
    {
      group: "4",
      title: "Initiating A Firebase Project",
      description:
        "In this step, you will understand how to start a Firebase project using the command line.",
      isSingleLineText: true,
      question: {
        questionText: "What is the command to start a Firebase project?",
        answer: "firebase init",
      },
    },
    {
      group: "4",
      title: "Advanced Data Storage Practices",
      description:
        "In this step, you will learn advanced practices for storing data responsibly in backend systems.",
      isMultipleAnswerChoice: true,
      question: {
        questionText:
          "Which of the following are best practices for ensuring responsible data storage in a backend system?",
        options: [
          "Cache data in memory to reduce database access time",
          "Use a large, centralized backup to reduce complexity and cost",
          "Encrypt sensitive data both at rest and in transit to ensure security",
          "Implement database replication across multiple data centers to improve fault tolerance",
        ],
        answer: [
          "Cache data in memory to reduce database access time",
          "Encrypt sensitive data both at rest and in transit to ensure security",
          "Implement database replication across multiple data centers to improve fault tolerance",
        ],
      },
    },
    {
      group: "4",
      title: "Initializing Firebase and Working with Firestore v9",
      description:
        "In this step, you will learn how to initialize Firebase and set up Firestore collections and documents in Firestore v9.",
      isCodeCompletion: true,
      question: {
        questionText:
          "Complete the code to initialize Firebase with the provided configuration and add a unique document to a Firestore collection.",
        options: [
          // Option 1: Correct code for initializing Firebase and adding a document

          // Option 2: Incorrect - missing Firestore initialization
          `import { 
  initializeApp 
} from 'firebase/app';

import { 
  collection, 
  setDoc 
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "progr-ai.firebaseapp.com",
  projectId: "progr-ai",
  storageBucket: "progr-ai.appspot.com",
  messagingSenderId: "32042075426",
  appId: "1:320420758826:web:68dfeffe8aa7b6421e8a53",
  measurementId: "G-0E37NCB4KB",
};

initializeApp(firebaseConfig);
await setDoc(collection(db, 'users'), {
  name: 'John Doe',
  email: 'john@example.com'
});`,

          // Option 3: Incorrect - missing document ID in Firestore
          `import { 
  initializeApp 
} from 'firebase/app';

import { 
  getFirestore, 
  doc, 
  setDoc 
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "progr-ai.firebaseapp.com",
  projectId: "progr-ai",
  storageBucket: "progr-ai.appspot.com",
  messagingSenderId: "32042075426",
  appId: "1:320420758826:web:68dfeffe8aa7b6421e8a53",
  measurementId: "G-0E37NCB4KB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Add document
await setDoc(doc(db, 'users'), {
  name: 'John Doe',
  email: 'john@example.com'
});`,
          `import { 
  initializeApp 
} from 'firebase/app';

import { 
  getFirestore, 
  doc, 
  setDoc
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "progr-ai.firebaseapp.com",
  projectId: "progr-ai",
  storageBucket: "progr-ai.appspot.com",
  messagingSenderId: "32042075426",
  appId: "1:320420758826:web:68dfeffe8aa7b6421e8a53",
  measurementId: "G-0E37NCB4KB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Add document
await addDoc(doc(db, 'users'), {
  name: 'John Doe',
  email: 'john@example.com'
});`,

          // Option 4: Incorrect - missing import for Firestore methods
          `import { 
  initializeApp 
} from 'firebase/app';
    
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "progr-ai.firebaseapp.com",
  projectId: "progr-ai",
  storageBucket: "progr-ai.appspot.com",
  messagingSenderId: "32042075426",
  appId: "1:320420758826:web:68dfeffe8aa7b6421e8a53",
  measurementId: "G-0E37NCB4KB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Add document
await addDoc(doc(db, 'users', 'user123'), {
  name: 'John Doe',
  email: 'john@example.com'
});`,
        ],
        answer: `import { 
  initializeApp 
} from 'firebase/app';

import { 
  getFirestore, 
  doc, 
  setDoc 
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "progr-ai.firebaseapp.com",
  projectId: "progr-ai",
  storageBucket: "progr-ai.appspot.com",
  messagingSenderId: "32042075426",
  appId: "1:320420758826:web:68dfeffe8aa7b6421e8a53",
  measurementId: "G-0E37NCB4KB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Add document
await addDoc(doc(db, 'users'), {
  name: 'John Doe',
  email: 'john@example.com'
});`,
      },
    },
    {
      group: "4",
      title: "Handling User Data",
      description:
        "In this step, you will learn how to handle user data in backend systems.",
      isCode: true,
      question: {
        questionText: `Write a code snippet to get a user object with properties for username and email using firebase auth.`,
      },
    },
    {
      group: "4",
      title: "Retrieving a User Document After Authentication",
      description:
        "In this step, you will learn how to retrieve a user document from Firestore using authentication data.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText:
          "Write code to retrieve a user document from the `users` collection in Firestore using the authenticated user's ID.",
      },
    },
    {
      group: "4",
      title: "Understanding the Authentication Flow",
      description:
        "In this step, you will learn about the typical flow of authentication in backend systems.",
      isSelectOrder: true,
      question: {
        questionText:
          "Arrange the following steps in the correct order for a typical authentication flow in a backend system.",
        options: [
          "User enters credentials (email and password) on the login form",
          "The backend verifies the credentials with the authentication service",
          "Identity tokens or sessions are created for the authenticated user",
          "The system retrieves user data from your database based on your tokens",
          "The user is granted access to the protected resources",
        ],
        answer: [
          "User enters credentials (email and password) on the login form",
          "The backend verifies the credentials with the authentication service",
          "Identity tokens or sessions are created for the authenticated user",
          "The system retrieves user data from your database based on your tokens",
          "The user is granted access to the protected resources",
        ],
      },
    },
    {
      group: "4",
      title: "OAuth Authentication",
      description:
        "In this step, you will learn about OAuth-style authentication systems.",
      isSingleLineText: true,
      question: {
        questionText:
          "What is the widely used protocol for authorization that allows third-party services to access user data without exposing credentials?",
        placeholder: "Type your answer here...",
        answer: "OAuth",
      },
    },
    {
      group: "4",
      title: "Using Environment Variables",
      description:
        "In this step, you will learn about using environment variables in backend development.",
      isText: true,
      question: {
        questionText: "What role do environment variables have in a codebase?",
      },
    },
    {
      group: "4",
      title: "Database Relationships",
      description:
        "In this step, you will learn about relationships in databases.",
      isCode: true,
      question: {
        questionText:
          "Write a code snippet to define a one-to-many relationship between users and posts in a database.",
      },
    },
    {
      group: "4",
      title: "Interfacing with an API",
      description:
        "In this step, you will learn the common HTTP methods used to interface with an API and some less common methods.",
      isMultipleAnswerChoice: true,
      question: {
        questionText:
          "Which of the following HTTP methods are commonly used to interface with an API, and what do they do?",
        options: [
          "GET (Retrieves data from the server)",
          "POST (Creates a new resource on the server)",
          "SEND (Sends data to the server for processing)",
          "FETCH (Used to fetch data from a resource)",
          "PATCH (Partially updates a resource on the server)",
          "REMOVE (Removes data from a server)",
          "PUT (Updates an existing resource on the server)",
          "DELETE (Deletes a resource from the server)",
        ],
        answer: [
          "GET (Retrieves data from the server)",
          "POST (Creates a new resource on the server)",
          "PUT (Updates an existing resource on the server)",
          "DELETE (Deletes a resource from the server)",
          "PATCH (Partially updates a resource on the server)",
        ],
      },
    },
    {
      group: "4",
      title: "Creating A User Authentication System",
      description:
        "In this step, you will create a simple user authentication system.",
      isSelectOrder: true,
      question: {
        questionText:
          "Arrange the steps with drag-and-drop to implement user authentication using JSON Web Tokens.",
        options: [
          "Install JWT library",
          "Set up a user model in the database",
          "Create a register route for new users",
          "Hash user password before storing",
          "Create a login route",
          "Verify user credentials",
          "Generate a JWT token",
          "Send JWT token back to the client",
          "Create a protected route that requires authentication",
          "Verify JWT token on protected routes",
        ],
        answer: [
          "Install JWT library",
          "Set up a user model in the database",
          "Create a register route for new users",
          "Hash user password before storing",
          "Create a login route",
          "Verify user credentials",
          "Generate a JWT token",
          "Send JWT token back to the client",
          "Create a protected route that requires authentication",
          "Verify JWT token on protected routes",
        ],
      },
    },
    {
      group: "4",
      title: "Deploying a Firebase Application",
      description:
        "In this step, you will learn how to deploy a backend firebase application to a cloud service.",

      isText: true,
      question: {
        questionText:
          "Write a command to deploy a Firebase application in the command line.",
      },
    },
    {
      groupReference: "4",
      title: "Review With AI Conversation",
      isConversationReview: true,
      description: "Review the subjects you've answered",
      question: {
        questionText: "Let's chat about the questions we've worked on so far.",
        range: [69, 89], // Indices of steps to review
      },
    },
    {
      group: "5",
      title: "Benefits of Serverless Cloud Platforms",
      description:
        "In this step, you will explore the advantages of using serverless cloud platforms like Firebase or Vercel in software development.",
      isText: true,
      question: {
        questionText:
          "What are the key benefits of using serverless cloud platforms like Firebase or Vercel in software development, and how do they differ from traditional server-based models?",
      },
    },
    {
      group: "5",
      title: "Understanding VSCode",
      description:
        "In this step, you will explore what Visual Studio Code (VSCode) is and why it is a popular code editor.",
      isText: true,
      question: {
        questionText:
          "What is Visual Studio Code (VSCode) and why is it one of the most popular code editors among developers?",
      },
    },
    {
      group: "5",
      title: "Installing Node.js and NPM",
      description:
        "Install Node.js, which lets you build JavaScript applications.",
      isText: true,
      question: {
        questionText:
          "What is the purpose of Node.js and npm in JavaScript development in simple terms?",
      },
    },
    {
      group: "5",
      title: "Installing 'package.json' Packages.",
      description: "Installing the files found in package.json.",
      isSingleLineText: true,
      question: {
        questionText:
          "Enter the command to install the packages found in a react project using npm.",
        answer: "npm install",
      },
    },
    {
      group: "5",
      title: "Install Firebase Tools Globally",
      description: "Install Firebase tools globally using the command line.",

      isSingleLineText: true,
      question: {
        questionText:
          "Use the terminal to install firebase-tools globally. What command do you use?",
        answer: "npm install -g firebase-tools.",
      },
    },
    {
      group: "5",
      title: "Setting Up a React and Firebase Project with VSCode",
      description:
        "In this step, you will arrange the steps required to set up a React project using Vite, connect Firebase services, and install the necessary tools using Visual Studio Code (VSCode).",
      isSelectOrder: true,
      question: {
        questionText:
          "Arrange the following steps in the correct order to set up a React project using Vite, install Node.js and npm, and connect Firebase services using VSCode.",
        options: [
          "Install Node.js and npm on your machine",
          "Install Visual Studio Code (VSCode)",
          "Open VSCode and navigate to the terminal",
          "Run `npm create vite@latest` to create a new React project",
          "Navigate to the project folder using `cd project-name`",
          "Run `npm install` to install dependencies",
          "Install Firebase CLI using `npm install -g firebase-tools`",
          "Log into Firebase using `firebase login`",
          "Initialize Firebase in the project using `firebase init`",
          "Enable Firebase services such as Firestore or Authentication",
          "Connect Firebase to your React project by adding Firebase config",
          "Start the development server using `npm run dev`",
        ],
        answer: [
          "Install Node.js and npm on your machine",
          "Install Visual Studio Code (VSCode)",
          "Open VSCode and navigate to the terminal",
          "Run `npm create vite@latest` to create a new React project",
          "Navigate to the project folder using `cd project-name`",
          "Run `npm install` to install dependencies",
          "Install Firebase CLI using `npm install -g firebase-tools`",
          "Log into Firebase using `firebase login`",
          "Initialize Firebase in the project using `firebase init`",
          "Enable Firebase services such as Firestore or Authentication",
          "Connect Firebase to your React project by adding Firebase config",
          "Start the development server using `npm run dev`",
        ],
      },
    },

    {
      group: "5",
      title: "Setting Up Firebase",
      description:
        "In this step, you will set up Firebase for your project, including Authentication, Firestore, and Analytics.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText:
          "Write the JavaScript code to initialize Firebase in your project, and connect Authentication, Firestore, and Analytics services.",
      },
    },
    {
      group: "5",
      title: "Introduction to GitHub",
      description:
        "Learn about using GitHub to collaborate with other developers.",
      isMultipleChoice: true,
      question: {
        questionText: "What is GitHub primarily used for?",
        options: [
          "Hosting websites",
          "Managing code repositories",
          "Decentralizing software",
          "Collecting data",
        ],
        answer: "Managing code repositories",
      },
    },
    {
      group: "5",
      title: "Cloning Github Projects",
      description: "Cloning Github projects in the command line.",
      isCode: true,
      isTerminal: true,
      question: {
        questionText:
          "Use the terminal to clone a progr.ai Github project by Robots Building Education using git commands.",
        answer:
          "git clone https://github.com/RobotsBuildingEducation/progr.ai.git",
      },
    },
    {
      group: "5",
      title: "Popular Alternatives to Firebase",
      description:
        "In this step, you will explore some popular alternatives to Firebase for various backend services such as database management, authentication, and hosting.",
      isMultipleAnswerChoice: true,
      question: {
        questionText:
          "Which of the following are popular alternatives to Firebase for building full-stack applications?",
        options: [
          "Supabase", // Correct
          "AWS Amplify", // Correct
          "MongoDB Realm", // Correct
          "HerokuDB", // Incorrect
          "AngularJS", // Incorrect
          "Vercel", // Incorrect
          "Cloudflare", // Incorrect
        ],
        answer: ["Supabase", "AWS Amplify", "MongoDB Realm", "Cloudflare"], // Incorrect],
      },
    },
    {
      group: "5",
      title: "Most Common Firebase Products",
      description:
        "In this step, you will identify the core Firebase products commonly used in web and mobile app development.",
      isMultipleAnswerChoice: true,
      question: {
        questionText:
          "Which of the following are commonly used Firebase products?",
        options: [
          "Firestore: Cloud NoSQL database for storing and syncing data", // Correct
          "Firebase Ads: Platform for integrating advertising", // Incorrect
          "Authentication: User sign-in and identity management", // Correct
          "Firebase Functions: Serverless backend for running code", // Correct
          "Firebase Storage: File storage for user-generated content", // Correct
          "Firebase Machine Learning: ML tools for app features", // Correct
          "Firebase Builder: Tool for creating Firebase services", // Incorrect
          "Firebase Hosting: Web hosting for deploying static content", // Correct
          "Firebase Cache: Caching service for high-performance storage", // Incorrect
          "Firebase Realtime Database: Real-time syncing database", // Correct
          "Firebase Firestore: A document-collection database", // Co
          "Firebase Analytics: Tracks user engagement and events in your app", // Correct
        ],
        answer: [
          "Firestore: Cloud NoSQL database for storing and syncing data",
          "Authentication: User sign-in and identity management",
          "Firebase Realtime Database: Real-time syncing database",
          "Firebase Hosting: Web hosting for deploying static content",
          "Firebase Functions: Serverless backend for running code",
          "Firebase Storage: File storage for user-generated content",
          "Firebase Analytics: Tracks user engagement and events in your app",
          "Firebase Firestore: A document-collection database", // Co
          "Firebase Machine Learning: ML tools for app features",
        ],
      },
    },

    {
      group: "5",
      title: "Pulling Updates With Github",
      description: "Update your version of code by pulling with Github.",

      isSingleLineText: true,
      question: {
        questionText:
          "Use the terminal to update your local Github project with the latest version available on Github",
      },
    },
    {
      group: "5",
      title: "Authenticating Users",
      description:
        "Install Firebase and react-firebaseui to create users in your application.",
      isMultipleChoice: true,
      question: {
        questionText:
          "Which package do you use to handle the user experience for authentication with Firebase?",
        options: [
          "firebase",
          "firebase-auth",
          "firebase-hooks",
          "react-firebaseui",
          "firebase-admin",
          "firebase-functions",
          "firebase-storage",
          "firebase-database",
        ],
        answer: "react-firebaseui",
      },
    },
    {
      group: "5",
      title: "Enabling Google Sign-In",
      description:
        "Enable Google Sign-In method in your Firebase authentication settings.",
      isText: true,
      question: {
        questionText:
          "What steps do you follow to enable Google Sign-In in Firebase authentication settings?",
      },
    },
    {
      group: "5",
      title: "Connecting Firebase to Your Code",
      description:
        "Retrieve Firebase configuration keys and connect them to your code.",
      isCode: true,
      question: {
        questionText:
          "Write the code to initialize Firebase in your project using the configuration keys.",
      },
    },
    {
      group: "5",
      title:
        "Rendering Sign-In Button in React with Firebase and react-firebaseui",
      description:
        "In this step, you will render a sign-in button in your React application using Firebase Authentication and the react-firebaseui library.",
      isCode: true,
      question: {
        questionText:
          "Write the code to render a Firebase sign-in button in a React component using Firebase Authentication and react-firebaseui.",
      },
    },
    {
      group: "5",
      title: "Displaying User Data",
      description: "Use useEffect to display user data when they log in.",
      isCode: true,
      question: {
        questionText:
          "Write the code to display user data using the useEffect hook when they log in with firebase.",
      },
    },
    {
      group: "5",
      title: "Updating User Profile",
      description:
        "Update the user profile information in your Firebase database after they have logged in.",
      isCode: true,
      question: {
        questionText:
          "Write the code to update user profile information in Firebase Firestore.",
      },
    },
    {
      group: "5",
      title: "Updating A Github Project",
      description: "Chaining git commands to update a Github project.",
      isSingleLineText: true,
      question: {
        questionText:
          "Enter the combination of github commands to write and update a codebase with a message.",
        answer: `git add . && git commit -m "your_message" && git push origin main`,
      },
    },
    {
      group: "5",
      title: "Using GitHub Commands",
      description: "Learn the basic GitHub commands for managing your code.",
      isSelectOrder: true,
      question: {
        questionText:
          "Arrange the following Git commands in the correct order to programmatically create a new repository and push to your GitHub account:",
        options: [
          "git init",
          "git add .",
          "git commit -m 'Initial commit'",
          "git remote add origin <repository-url>",
          "git branch -M main",
          "git push -u origin main",
        ],
        answer: [
          "git init",
          "git add .",
          "git commit -m 'Initial commit'",
          "git remote add origin <repository-url>",
          "git branch -M main",
          "git push -u origin main",
        ],
      },
    },
    {
      groupReference: "5",
      title: "Review With AI Conversation",
      isConversationReview: true,
      description: "Review the subjects you've answered",
      question: {
        questionText: "Let's chat about the questions we've worked on so far.",
        range: [91, 110], // Indices of steps to review
      },
    },
    {
      group: "6",
      title: "Introduction to Data Structures and Algorithms",
      description:
        "Understand the importance and challenges of learning data structures and algorithms.",
      isText: true,
      question: {
        questionText:
          "Why do data structures and algorithms often push people away from computer science?",
      },
    },
    {
      group: "6",
      title: "Programming Languages and Autocorrect Technology",
      description:
        "Explore how programming languages work and how computers understand code.",
      isCode: true,
      question: {
        questionText: `Write a simple program, without any libraries, to demonstrate how autocorrect technology might identify and correct a misspelled word.`,
      },
    },
    {
      group: "6",
      title: "Tokens in Code",
      description:
        "Break down code into tokens to understand how computers interpret information.",
      isMultipleChoice: true,
      question: {
        questionText:
          "Which of the following is an example of a token in a programming language?",
        options: [
          "An entire function",
          "A single character like ';'",
          "A variable definition like 'let apples = 10'",
          "A block of HTML code",
          "An object defined by 'class Object { ... }'",
          "A JavaScript library",
        ],
        answer: "A single character like ';'",
      },
    },

    {
      group: "6",
      title: "Breaking Down Strings into Characters",
      description:
        "Understand how strings are broken down into characters and further into machine code.",
      isCode: true,
      question: {
        questionText:
          "Write the code to break down the string 'Kendrick' into an array and then into an object mapping.",
      },
    },
    {
      group: "6",
      title: "Understanding Data Structures",
      description:
        "Convert a string into an array of key-value pair objects that map characters to their ASCII codes.",
      isSelectOrder: true,
      question: {
        questionText:
          "Convert the string 'Kendrick' into an array of key-value pair objects where each character maps to its ASCII code.",
        options: [
          "{ 'K': 75 }",
          "{ 'e': 101 }",
          "{ 'n': 110 }",
          "{ 'd': 100 }",
          "{ 'r': 114 }",
          "{ 'i': 105 }",
          "{ 'c': 99 }",
          "{ 'k': 107 }",
        ],
        answer: [
          "{ 'K': 75 }",
          "{ 'e': 101 }",
          "{ 'n': 110 }",
          "{ 'd': 100 }",
          "{ 'r': 114 }",
          "{ 'i': 105 }",
          "{ 'c': 99 }",
          "{ 'k': 107 }",
        ],
      },
    },

    {
      group: "6",
      title: "Binary Conversion",
      description: "Convert characters to their binary representation.",
      isCode: true,
      question: {
        questionText:
          "Convert the object mapping of the ascii codes representing 'Kendrick' into a mapping of binary code.",
      },
    },
    {
      group: "6",
      title: "Understanding Data Structures",
      description: "Learn how data structures store and reference information.",
      isText: true,
      question: {
        questionText:
          "Why is it important to understand how computers reserve space and create addresses to reference information? What are some real world examples of this operating at scale?",
      },
    },
    {
      group: "6",
      title: "Introduction to Linked Lists",
      description: "Learn about the basic concepts of linked lists.",
      isMultipleChoice: true,
      question: {
        questionText:
          "Which of the following is a characteristic of linked lists?",
        options: [
          "Fixed-size arrays",
          "Dynamic memory allocation",
          "Constant time access to elements",
          "Data is stored in contiguous memory",
        ],
        answer: "Dynamic memory allocation",
      },
    },
    {
      group: "6",
      title: "Building a Linked List",
      description:
        "Construct a simple linked list in JavaScript with the values 'meta', 'instagram', 'reels'.",
      isCodeCompletion: true,
      question: {
        questionText:
          "Which of the following code snippets correctly creates a linked list with the values 'meta', 'instagram', and 'reels' in JavaScript?",
        options: [
          // Option 1: Correct linked list implementation
          `class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  add(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
  }
}

const list = new LinkedList();
list.add('meta');
list.add('instagram');
list.add('reels');`,

          // Option 2: Incorrect - Uses arrays instead of linked list
          `class Node {
  constructor(value) {
    this.value = value;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  add(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
  }
}

const list = new LinkedList();
list.add('reels');
list.add('instagram');
list.add('meta');`,

          // Option 3: Incorrect - Missing `next` pointer in Node class
          `class Node {
  constructor(value) {
    this.value = value;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  add(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
  }
}

const list = new LinkedList();
list.add('meta');
list.add('instagram');
list.add('reels');`,

          // Option 4: Incorrect - Circular linked list without terminating
          `class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  add(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      newNode.next = this.head; 
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
      newNode.next = this.head; 
    }
  }
}

const list = new LinkedList();
list.add('meta');
list.add('instagram');
list.add('reels');`,
        ],
        answer: `class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  add(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
  }
}

const list = new LinkedList();
list.add('meta');
list.add('instagram');
list.add('reels');`,
      },
    },
    {
      group: "6",
      title: "Practical Linked List Application",
      description: "Apply the LinkedList class to a real-world scenario.",
      isCode: true,
      question: {
        questionText:
          "Write the code to create a linked list of Google's company departments and traverse through it.",
      },
    },
    {
      group: "6",
      title: "Traversing a Linked List",
      description:
        "Implement a method to traverse a linked list and return the last item.",
      isCode: true,
      question: {
        questionText:
          "Write a method in the LinkedList class that traverses the list and returns the last item.",
      },
    },
    {
      group: "6",
      title: "Linked List Class Implementation",
      description:
        "Implement the LinkedList and ListItem classes in JavaScript.",
      isMultipleChoice: true,
      question: {
        questionText:
          "Which method would you use to add a new item to the end of a linked list?",
        options: ["addAtIndex()", "append()", "insert()", "push()", "create()"],
        answer: "append()",
      },
    },

    {
      group: "6",
      title: "Reversing a Linked List",
      description: "Reverse the direction of a linked list.",
      isMultipleChoice: true,
      question: {
        questionText: "What is the time complexity of reversing a linked list?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n^2)", "O(n log n)", "O(2^n)"],
        answer: "O(n)",
      },
    },
    {
      group: "6",
      title: "Depth-First Search Algorithm (Recursion)",
      description:
        "Understand and implement a depth-first search algorithm using recursion.",
      isSelectOrder: true,
      question: {
        questionText:
          "Arrange the steps with drag-and-drop to correctly implement a depth-first search algorithm using recursion.",
        options: [
          "Start at the root node",
          "Mark the current node as visited",
          "Process the node (e.g., print or store its value)",
          "Recursively call the DFS function on each unvisited neighbor",
          "Backtrack once all neighbors are visited",
          "Repeat until all nodes are visited",
        ],
        answer: [
          "Start at the root node",
          "Mark the current node as visited",
          "Process the node (e.g., print or store its value)",
          "Recursively call the DFS function on each unvisited neighbor",
          "Backtrack once all neighbors are visited",
          "Repeat until all nodes are visited",
        ],
      },
    },
    {
      group: "6",
      title: "Creating a Tree Structure",
      description:
        "Build a simple tree structure to practice depth-first search.",
      isCode: true,
      question: {
        questionText:
          "Write the JavaScript code to create the following tree structure that's 3 levels deep with Alphabet and Meta's companies.",
      },
    },

    {
      group: "6",
      title: "Understanding Depth-First and Breadth-First Search",
      description:
        "Learn the differences between depth-first search and breadth-first search.",
      isText: true,
      question: {
        questionText:
          "Explain the difference between depth-first search and breadth-first search algorithms.",
      },
    },
    {
      group: "6",
      title: "Implementing Depth-First Search with Recursion",
      description:
        "Complete the implementation of a depth-first search (DFS) using recursion to traverse a binary tree.",
      isCodeCompletion: true,
      question: {
        questionText:
          "Which of the following code snippets correctly implements DFS using recursion on a binary tree in JavaScript?",
        options: [
          // Option 1: Correct DFS implementation with recursion (pre-order traversal)

          // Option 2: Incorrect - Missing the base case check for null nodes
          `class TreeNode {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }

  function dfs(node) {
    console.log(node.value);
    dfs(node.left);
    dfs(node.right);
  }

  const root = new TreeNode(1);
  root.left = new TreeNode(2);
  root.right = new TreeNode(3);
  root.left.left = new TreeNode(4);
  root.left.right = new TreeNode(5);
  dfs(root);`,

          // Option 3: Incorrect - Swapped traversal order (in-order instead of pre-order)
          `class TreeNode {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }

  function dfs(node) {
    if (node === null) {
      return;
    }
    dfs(node.left);
    console.log(node.value);
    dfs(node.right);
  }

  const root = new TreeNode(1);
  root.left = new TreeNode(2);
  root.right = new TreeNode(3);
  root.left.left = new TreeNode(4);
  root.left.right = new TreeNode(5);
  dfs(root);`,

          // Option 4: Incorrect - Infinite loop due to incorrect recursive call
          `class TreeNode {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }

  function dfs(node) {
    if (node === null) {
      return;
    }
    console.log(node.value);
    dfs(node);
  }

  const root = new TreeNode(1);
  root.left = new TreeNode(2);
  root.right = new TreeNode(3);
  root.left.left = new TreeNode(4);
  root.left.right = new TreeNode(5);
  dfs(root);`,
          `class TreeNode {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }

  function dfs(node) {
    if (node === null) {
      return;
    }
    console.log(node.value);
    dfs(node.left);
    dfs(node.right);
  }

  const root = new TreeNode(1);
  root.left = new TreeNode(2);
  root.right = new TreeNode(3);
  root.left.left = new TreeNode(4);
  root.left.right = new TreeNode(5);
  dfs(root);`,
        ],
        answer: `class TreeNode {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }

  function dfs(node) {
    if (node === null) {
      return;
    }
    console.log(node.value);
    dfs(node.left);
    dfs(node.right);
  }

  const root = new TreeNode(1);
  root.left = new TreeNode(2);
  root.right = new TreeNode(3);
  root.left.left = new TreeNode(4);
  root.left.right = new TreeNode(5);
  dfs(root);`,
      },
    },

    {
      group: "6",
      title: "Algorithm Optimization",
      description:
        "Explore ways to optimize algorithms for better performance.",
      isCode: true,
      question: {
        questionText:
          "Write an optimized version of the bubble sort algorithm in JavaScript without using recursion.",
      },
    },

    {
      group: "6",
      title: "Exploring the N-Queens Problem",
      description: "Understand the N-Queens problem and its complexity.",
      isText: true,
      question: {
        questionText:
          "What is the N-Queens problem, and why is it considered complex?",
      },
    },
    {
      group: "6",
      title: "Implementing Backtracking",
      description: "Implement a backtracking algorithm to solve a problem.",
      isSelectOrder: true,
      question: {
        questionText:
          "Arrange the steps with drag-and-drop to implement backtracking for a 4x4 N-Queens problem.",
        options: [
          "Start with an empty board",
          "Place a queen in the current row",
          "Check if it's safe to place the queen",
          "If safe, move to the next row",
          "If not safe, try the next column in the current row",
          "If all columns are unsafe, backtrack to the previous row",
          "If the board is fully filled with safe placements, return the solution",
          "If the previous row has no safe columns left, backtrack further",
          "Continue this process until all possible solutions are found",
        ],
        answer: [
          "Start with an empty board",
          "Place a queen in the current row",
          "Check if it's safe to place the queen",
          "If safe, move to the next row",
          "If not safe, try the next column in the current row",
          "If all columns are unsafe, backtrack to the previous row",
          "If the previous row has no safe columns left, backtrack further",
          "If the board is fully filled with safe placements, return the solution",
          "Continue this process until all possible solutions are found",
        ],
      },
    },
    {
      group: "6",
      title: "Implementing Backtracking for 4x4 N-Queens",
      description:
        "Implement a backtracking algorithm to solve the 4x4 N-Queens problem.",
      isCode: true,
      question: {
        questionText:
          "Write the code to implement backtracking for solving the 4x4 N-Queens problem in JavaScript.",
      },
    },
    {
      groupReference: "6",
      title: "Review With AI Conversation",
      isConversationReview: true,
      description: "Review the subjects you've answered",
      question: {
        questionText: "Let's chat about the questions we've worked on so far.",
        range: [112, 132], // Indices of steps to review
      },
    },
  ],
  es: [
    {
      group: "0",
      title: "¡Bienvenido a la aplicación de Program AI!",
      description:
        "Presiona 'Empecemos' para comenzar tu viaje en el aprendizaje de programación.",
    },
    {
      group: "tutorial",
      group: "Entendiendo la Programación",
      description: "Comprende el concepto básico de la programación.",
      isMultipleChoice: true,
      question: {
        questionText: "¿Cuál de las siguientes describe mejor la programación?",
        options: [
          "Escribir instrucciones para que las computadoras realicen tareas",
          "Crear componentes físicos para computadoras",
          "Diseñar interfaces de usuario",
          "Gestionar bases de datos",
        ],
        answer:
          "Escribir instrucciones para que las computadoras realicen tareas",
      },
    },
    {
      group: "tutorial",
      title: "Secuencia de Ejecución de Programas",
      description: "Aprende el orden correcto de la ejecución de programas.",
      isSelectOrder: true,
      question: {
        questionText:
          "Organiza los pasos arrastrando y soltando el orden en que se ejecutan los programas.",
        options: [
          "Compilación del Código",
          "Escritura del Código",
          "Ejecución del Programa",
          "Depuración",
        ],
        answer: [
          "Escritura del Código",
          "Compilación del Código",
          "Depuración",
          "Ejecución del Programa",
        ],
      },
    },
    {
      group: "tutorial",
      title: "Introducción a las Variables",
      description:
        "En este paso, aprenderás sobre las variables y cómo usarlas en tu código.",
      isMultipleAnswerChoice: true,
      question: {
        questionText:
          "Selecciona todos los pasos involucrados en declarar correctamente una variable en JavaScript:",
        options: [
          "Usar la palabra clave var/let/const",
          "Elegir un nombre descriptivo para la variable",
          "Asignar un valor usando el signo igual (=)",
          "Inicializar la variable dentro de llaves {}",
          "Declarar la variable después de asignar un valor",
          "Capitalizar la primera letra del nombre de la variable",
        ],
        answer: [
          "Usar la palabra clave var/let/const",
          "Elegir un nombre descriptivo para la variable",
          "Asignar un valor usando el signo igual (=)",
        ],
      },
    },
    {
      group: "tutorial",
      title: "Entendiendo la Declaración de Variables para Listas",
      description:
        "Completa el código seleccionando la manera correcta de declarar un arreglo de elementos (array) en JavaScript.",
      isCodeCompletion: true,
      question: {
        questionText:
          "¿Qué bloque de código declara correctamente una lista de elementos?",
        options: [
          `const frutas = ['manzana', 'plátano', 'cereza'];`,
          `const frutas = function() { return 'manzana, plátano, cereza'; };`,
          `const frutas = 'manzana, plátano, cereza';`,
          `const frutas = { fruta1: 'manzana', fruta2: 'plátano', fruta3: 'cereza' };`,
          `class Frutas { constructor() { this.fruta1 = 'manzana'; this.fruta2 = 'plátano'; this.fruta3 = 'cereza'; } } const frutas = new Frutas();`,
        ],
        answer: `const frutas = ['manzana', 'plátano', 'cereza'];`,
      },
    },
    {
      group: "tutorial",
      title: "Declaración de Variables en JavaScript",
      description: "Aprende cómo declarar variables en JavaScript.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText:
          "Declara una variable llamada `edad` y asígnale el valor `25`.",
      },
    },
    {
      group: "tutorial",
      title: "Entendiendo los Tipos de Datos",
      description:
        "Aprende los conceptos básicos de los tipos de datos en JavaScript.",
      isSingleLineText: true,
      question: {
        questionText:
          "¿Qué palabra clave se usa para declarar una constante en JavaScript?",
        placeholder: "Escribe tu respuesta aquí...",
        answer: "const",
      },
    },
    {
      group: "tutorial",
      title: "Propósito de las Variables",
      description:
        "Comprende por qué se utilizan las variables en la programación.",
      isText: true,
      question: {
        questionText:
          "En tus propias palabras, explica el propósito de las variables en la programación.",
      },
    },
    {
      group: "tutorial",
      title: "Práctica del Terminal Bash: Cambiar Directorios",
      description: "Practica cambiar directorios en un entorno de terminal.",
      isCode: true,
      isTerminal: true,
      question: {
        questionText:
          "Ingresa el comando para cambiar al directorio new_folder usando un terminal bash.",
      },
    },
    {
      groupReference: "tutorial",
      title: "Revisión con Conversación AI",
      isConversationReview: true,
      description: "Revisa los temas que has respondido.",
      question: {
        range: [1, 8],
      },
    },
    {
      group: "1",
      title: "Tipos de Datos en Programación",
      description:
        "Identifica los diferentes tipos de datos primitivos utilizados en JavaScript.",
      isMultipleAnswerChoice: true,
      question: {
        questionText:
          "¿Cuáles de los siguientes son tipos de datos primitivos en JavaScript?",
        options: [
          "Cadena (String)",
          "Función (Function)",
          "Número (Number)",
          "Objeto (Object)",
          "Booleano (Boolean)",
          "Nulo (Null)",
          "Arreglo (Array)",
          "BigInt",
          "Indefinido (Undefined)",
          "Símbolo (Symbol)",
        ],
        answer: [
          "Cadena (String)",
          "Número (Number)",
          "Booleano (Boolean)",
          "Nulo (Null)",
          "Indefinido (Undefined)",
          "Símbolo (Symbol)",
          "BigInt",
        ],
      },
    },
    {
      group: "1",
      title: "Pasos para Crear una Función",
      description: "Comprende la secuencia para crear una función.",
      isSelectOrder: true,
      question: {
        questionText:
          "Organiza los pasos arrastrando y soltando para crear y usar una función.",
        options: [
          "Definir la función",
          "Llamar a la función",
          "Ejecutar el cuerpo de la función",
          "Devolver un valor",
        ],
        answer: [
          "Definir la función",
          "Llamar a la función",
          "Ejecutar el cuerpo de la función",
          "Devolver un valor",
        ],
      },
    },
    {
      group: "1",
      title: "Escribir una Función Simple",
      description: "Practica escribiendo funciones en JavaScript.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText:
          "Escribe una función llamada `saludo` que tome un nombre como parámetro y registre un saludo con ese nombre.",
      },
    },
    {
      group: "1",
      title: "Funciones en Programación",
      description: "Discute el papel de las funciones.",
      isText: true,
      question: {
        questionText:
          "¿Qué es una función y por qué es útil en la programación?",
      },
    },
    {
      group: "1",
      title: "Sentencias Condicionales",
      description: "Identifica el propósito de las sentencias condicionales.",
      isMultipleChoice: true,
      question: {
        questionText:
          "¿Cuál es el propósito principal de una declaración `if`?",
        options: [
          "Repetir un bloque de código varias veces",
          "Ejecutar un bloque de código basado en una condición",
          "Definir una variable",
          "Importar bibliotecas externas",
        ],
        answer: "Ejecutar un bloque de código basado en una condición",
      },
    },
    {
      group: "1",
      title: "Orden de las Verificaciones Condicionales",
      description: "Completa el código que evalúa una sentencia `if-else`.",
      isCodeCompletion: true,
      question: {
        questionText:
          "Completa el siguiente código para implementar correctamente una declaración `if-else` que verifique si una variable `x` es mayor que 10, igual a 10 o menor que 10.",
        options: [
          "if (x > 10) { \n  console.log('x es mayor que 10'); \n} else if (x === 10) { \n  console.log('x es igual a 10'); \n} else { \n  console.log('x es menor que 10'); \n}",
          "if (x == 10) { \n  console.log('x es igual a 10'); \n} else if (x > 10) { \n  console.log('x es mayor que 10'); \n}",
          "if (x > 10) { \n  console.log('x es mayor que 10'); \n} else { \n  console.log('x no es mayor que 10'); \n}",
          "if (x >= 10) { \n  console.log('x es mayor o igual a 10'); \n} else { \n  console.log('x es menor que 10'); \n}",
          "if (x > 10) { \n  console.log('x es mayor que 10'); \n  if (x === 10) { \n    console.log('x es igual a 10'); \n  } \n} else { \n  console.log('x es menor que 10'); \n}",
        ],
        answer:
          "if (x > 10) { \n  console.log('x es mayor que 10'); \n} else if (x === 10) { \n  console.log('x es igual a 10'); \n} else { \n  console.log('x es menor que 10'); \n}",
      },
    },
    {
      group: "1",
      title: "Implementando Lógica Condicional",
      description: "Aplica lógica condicional en código.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText:
          "Escribe una declaración `if-else` que verifique si un número `num` es positivo, negativo o cero, y registre un mensaje apropiado.",
      },
    },
    {
      group: "1",
      title: "Entendiendo la Lógica Condicional en Programación",
      description:
        "Aprende cómo los operadores lógicos como AND (&&) y OR (||) controlan condiciones en programación.",
      isSingleLineText: true,
      question: {
        questionText:
          "¿Qué operador lógico se usa para verificar si ambas condiciones en una declaración condicional son verdaderas?",
        placeholder: "Escribe tu respuesta aquí...",
        answer: "&&",
      },
    },
    {
      group: "1",
      title: "Uso de Condicionales en el Mundo Real",
      description: "Reflexiona sobre cómo se utilizan los condicionales.",
      isText: true,
      question: {
        questionText:
          "Proporciona un ejemplo de cómo se utilizan las declaraciones condicionales en aplicaciones del mundo real.",
      },
    },
    {
      group: "1",
      title: "Práctica de Terminal: Comando de Ayuda",
      description:
        "Escribe el comando de ayuda para observar los comandos básicos.",
      isCode: true,
      isTerminal: true,
      question: {
        questionText:
          "En un entorno de terminal Bash, ingresa el comando de ayuda para descubrir los comandos básicos.",
      },
    },
    {
      group: "1",
      title: "Bucles en Programación",
      description: "Comprende el propósito de los bucles.",
      isMultipleChoice: true,
      question: {
        questionText:
          "¿Qué bucle continuará ejecutándose mientras su condición sea verdadera?",
        options: [
          "bucle for",
          "bucle while",
          "bucle do...while",
          "bucle foreach",
        ],
        answer: "bucle while",
      },
    },
    {
      group: "1",
      title: "Secuencia de Ejecución de Bucles",
      description: "Comprende el orden en que se ejecutan los bucles.",
      isSelectOrder: true,
      question: {
        questionText:
          "Organiza los pasos de la ejecución de un bucle `for` arrastrando y soltando.",
        options: [
          "Inicialización",
          "Verificación de Condición",
          "Ejecución del Bloque de Código",
          "Incremento/Decremento",
        ],
        answer: [
          "Inicialización",
          "Verificación de Condición",
          "Ejecución del Bloque de Código",
          "Incremento/Decremento",
        ],
      },
    },
    {
      group: "1",
      title: "Creando un Bucle",
      description: "Practica escribiendo bucles.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText:
          "Escribe un bucle `for` que imprima los números del 1 al 5.",
      },
    },
    {
      group: "1",
      title: "Aplicaciones de los Bucles",
      description: "Discute dónde son útiles los bucles.",
      isText: true,
      question: {
        questionText:
          "Describe un escenario en el desarrollo de software donde los bucles son esenciales.",
      },
    },
    {
      group: "1",
      title: "Arreglos en JavaScript",
      description:
        "Identifica métodos utilizados para manipular arreglos en JavaScript.",
      isMultipleAnswerChoice: true,
      question: {
        questionText:
          "¿Cuáles de los siguientes métodos son válidos para manipular arreglos en JavaScript?",
        options: [
          ".includes()",
          ".push()",
          ".pop()",
          ".forEach()",
          ".length()",
          ".map()",
          ".filter()",
          ".join()",
        ],
        answer: [".push()", ".pop()", ".map()", ".filter()", ".join()"],
      },
    },
    {
      group: "1",
      title: "Orden de las Operaciones en Arreglos",
      description: "Comprende cómo se realizan las operaciones en arreglos.",
      isCodeCompletion: true,
      question: {
        questionText:
          "Completa el código para declarar un arreglo, agregar un elemento, eliminar el último elemento y luego acceder a un elemento.",
        options: [
          "let frutas = ['manzana', 'plátano']; \nfrutas.push('naranja'); \nfrutas.pop(); \nconsole.log(frutas[0]);",
          "let frutas = ['manzana', 'plátano']; \nfrutas.pop(); \nfrutas.push('naranja'); \nconsole.log(frutas[0]);",
          "var frutas = 'manzana', 'plátano'; \nfrutas.push('naranja'); \nfrutas.pop(); \nconsole.log(frutas[0]);",
          "let frutas = ['manzana', 'plátano']; \nfrutas.push('naranja'); \nfrutas.pop();",
          "let frutas = ['manzana', 'plátano']; \nfrutas.push('naranja'); \nfrutas.pop('plátano'); \nconsole.log(frutas[0]);",
        ],
        answer:
          "let frutas = ['manzana', 'plátano']; \nfrutas.push('naranja'); \nfrutas.pop(); \nconsole.log(frutas[0]);",
      },
    },
    {
      group: "1",
      title: "Manipulando Arreglos",
      description: "Aplica métodos de arreglos en código.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText:
          "Crea un arreglo `frutas` con 'manzana' y 'plátano'. Agrega 'naranja' al final y elimina 'manzana' del principio.",
      },
    },
    {
      group: "1",
      title: "Casos de Uso para Arreglos",
      description: "Explora escenarios donde se utilizan los tipos de arreglo.",
      isText: true,
      question: {
        questionText:
          "Proporciona un ejemplo de cómo se puede usar un arreglo para gestionar datos en una aplicación web.",
      },
    },
    {
      group: "1",
      title: "Práctica de Terminal: Crear Directorios",
      description: "Comando para crear directorios en un terminal bash.",
      isCode: true,
      isTerminal: true,
      question: {
        questionText:
          "En un entorno de terminal bash, crea un directorio llamado app usando el comando para crear directorios.",
      },
    },
    {
      group: "1",
      title: "Resultado Avanzado de Codificación",
      description:
        "Predice el resultado del siguiente código con arreglos, condicionales, operadores lógicos y funciones de arreglos.",
      isSingleLineText: true,
      question: {
        questionText: (
          <div>
            ¿Cuál será el resultado del siguiente código?
            <br />
            <pre>
              {`
let arr = [1, 2, 3, 4];
let x = 10;
let y = 5;

if (x > y && arr.length > 3) {
  arr.push(x);  
  arr = arr.filter(n => n % 2 === 0);
}

console.log(arr);
    
               `}{" "}
            </pre>
          </div>
        ),
        placeholder: "Escribe tu respuesta aquí...",
        answer: "[2, 4, 10]",
      },
    },
    {
      groupReference: "1",
      title: "Revisión con Conversación AI",
      isConversationReview: true,
      description: "Revisa los temas que has respondido.",
      question: {
        questionText:
          "Hablemos sobre las preguntas en las que hemos trabajado hasta ahora.",
        range: [10, 29],
      },
    },
    {
      group: "2",
      title: "Introducción a los Objetos",
      description:
        "En este paso, aprenderás qué es un objeto en la programación.",
      isSingleLineText: true,
      question: {
        questionText:
          "En programación, ¿qué palabra clave se usa para crear un objeto en JavaScript?",
        placeholder: "Escribe tu respuesta aquí...",
        answer: "new",
      },
    },
    {
      group: "2",
      title: "Entendiendo el Método Constructor",
      description:
        "En este paso, aprenderás sobre el propósito del método `constructor` en una clase.",
      isCodeCompletion: true,
      question: {
        questionText: `¿Cuál de los siguientes bloques de código define correctamente el método constructor y usa la palabra clave "new" para instanciar una clase?`,
        options: [
          `class Coche {
      constructor(marca) {
        this.marca = marca;
      }
    
      conducir() {
        console.log('El coche está conduciendo');
      }
    }
    
    const miCoche = new Coche('Toyota');`,

          `class Coche {
      constructor() {
        this.marca = 'Toyota';
      }
    
      conducir() {
        console.log('El coche está conduciendo');
      }
    }
    
    const miCoche = new Coche();`,

          `class Coche {
      constructor = (marca) => {
        this.marca = marca;
      }
    
      conducir() {
        console.log('El coche está conduciendo');
      }
    }
    
    const miCoche = new Coche('Toyota');`,

          `class Coche {
      Coche(marca) {
        this.marca = marca;
      }
    
      conducir() {
        console.log('El coche está conduciendo');
      }
    }
    
    const miCoche = new Coche('Toyota');`,
        ],
        answer: `class Coche {
      constructor(marca) {
        this.marca = marca;
      }
    
      conducir() {
        console.log('El coche está conduciendo');
      }
    }
    
    const miCoche = new Coche('Toyota');`,
      },
    },
    {
      group: "2",
      title: "Entendiendo el Método Constructor",
      description:
        "En este paso, aprenderás sobre el propósito del método `constructor` en una clase.",
      isText: true,
      question: {
        questionText:
          "Explica el propósito del método `constructor` en una clase.",
      },
    },
    {
      group: "2",
      title: "Creando una Instancia de una Clase",
      description:
        "En este paso, aprenderás cómo crear una instancia de una clase en JavaScript.",
      isMultipleAnswerChoice: true,
      question: {
        questionText:
          "Selecciona todos los pasos correctos necesarios para crear una instancia de una clase en JavaScript:",
        options: [
          "Definir una clase usando la palabra clave `class`",
          "Definir la clase con la palabra clave `function`",
          "Usar la palabra clave `new` para crear una instancia",
          "Declarar la instancia de la clase con `const instanciaClase = Coche()`",
          "Pasar los argumentos requeridos por el constructor al llamar a la clase",
          "Almacenar la nueva instancia en una variable",
          "Llamar a la clase directamente sin la palabra clave `new`",
          "Instanciar la clase antes de definirla",
        ],
        answer: [
          "Definir una clase usando la palabra clave `class`",
          "Usar la palabra clave `new` para crear una instancia",
          "Pasar los argumentos requeridos por el constructor al llamar a la clase",
          "Almacenar la nueva instancia en una variable",
        ],
      },
    },
    {
      group: "2",
      title: "Declarando un Método en una Clase",
      description:
        "En este paso, aprenderás cómo declarar un método dentro de una clase.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText:
          "Declara un método llamado `actualizarModelo` en la clase `Coche` que actualice la propiedad `modelo`.",
      },
    },
    {
      group: "2",
      title: "Usando la Palabra Clave `this`",
      description:
        "Completa el código seleccionando la forma correcta de usar la palabra clave `this` en un método de clase.",
      isCodeCompletion: true,
      question: {
        questionText:
          "¿Cuál bloque de código usa correctamente la palabra clave `this` para referirse a la propiedad del objeto?",
        options: [
          `class Coche {
      constructor(marca) {
        this.marca = marca;
      }
    
      mostrarMarca() {
        console.log(this.marca);
      }
    }
    
    const miCoche = new Coche('Toyota');
    miCoche.mostrarMarca();`,

          `class Coche {
      constructor(marca) {
        this.marca = marca;
      }
    
      mostrarMarca() {
        console.log(marca);
      }
    }
    
    const miCoche = new Coche('Toyota');
    miCoche.mostrarMarca();`,

          `class Coche {
      constructor(marca) {
        marca = this.marca;
      }
    
      mostrarMarca() {
        console.log(marca);
      }
    }
    
    const miCoche = new Coche('Toyota');
    miCoche.mostrarMarca();`,

          `class Coche {
      constructor(marca) {
        marca = this.marca;
      }
    
      mostrarMarca() {
        console.log(this.marca);
      }
    }
    
    const miCoche = new Coche('Toyota');
    miCoche.mostrarMarca();`,
        ],
        answer: `class Coche {
      constructor(marca) {
        this.marca = marca;
      }
    
      mostrarMarca() {
        console.log(this.marca);
      }
    }
    
    const miCoche = new Coche('Toyota');
    miCoche.mostrarMarca();`,
      },
    },
    {
      group: "2",
      title: "Añadiendo Propiedades a un Objeto",
      description:
        "En este paso, aprenderás cómo añadir propiedades a un objeto en JavaScript.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText: "Añade una nueva propiedad `año` a la clase `Coche`.",
      },
    },
    {
      group: "2",
      title: "Accediendo y Modificando Propiedades de un Objeto",
      description:
        "En este paso, aprenderás cómo obtener o modificar propiedades de un objeto en JavaScript, ya sea accediendo directamente a las propiedades o usando funciones getter y setter.",
      isMultipleAnswerChoice: true,
      question: {
        questionText:
          "¿Cuáles de las siguientes son formas válidas de obtener o modificar propiedades en un objeto de JavaScript?",
        options: [
          "Usar una llamada a función para eliminar una propiedad (por ejemplo, obj.deleteProperty())",
          "Usar notación de corchetes para acceder a una propiedad (por ejemplo, obj['propiedad'])",
          "Usar una función setter para actualizar el valor de una propiedad",
          "Usar notación de puntos para acceder a una propiedad (por ejemplo, obj.propiedad)",
          "Usar una función getter para devolver el valor de una propiedad",
          "Llamar directamente a obj.propiedad() para acceder a una propiedad",
        ],
        answer: [
          "Usar notación de puntos para acceder a una propiedad (por ejemplo, obj.propiedad)",
          "Usar notación de corchetes para acceder a una propiedad (por ejemplo, obj['propiedad'])",
          "Usar una función getter para devolver el valor de una propiedad",
          "Usar una función setter para actualizar el valor de una propiedad",
        ],
      },
    },
    {
      group: "2",
      title: "Modificando Propiedades de un Objeto",
      description:
        "En este paso, aprenderás cómo modificar propiedades de un objeto en JavaScript.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText:
          "Modifica la propiedad `modelo` de una instancia de la clase `Coche`.",
      },
    },
    {
      group: "2",
      title: "Entendiendo la Herencia",
      description:
        "En este paso, aprenderás sobre la herencia en la programación orientada a objetos.",
      isText: true,
      question: {
        questionText:
          "¿Qué es la herencia en la programación orientada a objetos?",
      },
    },
    {
      group: "2",
      title: "Implementando la Herencia",
      description:
        "En este paso, implementarás la herencia en JavaScript extendiendo una clase.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText:
          "Extiende la clase `Coche` para crear una clase `CocheEléctrico` con una propiedad adicional `vidaBatería`.",
      },
    },
    {
      group: "2",
      title: "Sobrescribiendo Métodos",
      description:
        "En este paso, aprenderás cómo sobrescribir métodos en una subclase.",
      isMultipleChoice: true,
      question: {
        questionText: "¿Qué significa sobrescribir un método en una subclase?",
        options: [
          "Eliminar el método de la clase",
          "Reemplazar un método heredado de la superclase",
          "Heredar un método sin cambios",
          "Llamar a un método de otra clase",
          "Extender la funcionalidad de un método en la subclase",
        ],
        answer: "Reemplazar un método heredado de la superclase",
      },
    },
    {
      group: "2",
      title: "Entendiendo la Encapsulación",
      description:
        "En este paso, aprenderás sobre la encapsulación en la programación orientada a objetos.",
      isText: true,
      question: {
        questionText:
          "¿Qué es la encapsulación en la programación orientada a objetos?",
      },
    },
    {
      group: "2",
      title: "Implementando la Encapsulación",
      description:
        "En este paso, implementarás la encapsulación usando métodos getter y setter.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText:
          "Añade métodos getter y setter para la propiedad `vidaBatería` en la clase `CocheEléctrico`.",
      },
    },
    {
      group: "2",
      title: "Entendiendo la Encapsulación",
      description:
        "En este paso, definirás el concepto de encapsulación en la programación orientada a objetos con una sola palabra.",
      isSingleLineText: true,
      question: {
        questionText:
          "¿Qué concepto principal asegura la encapsulación en la programación orientada a objetos?",
        placeholder: "Escribe tu respuesta aquí...",
        answer: "Privacidad",
      },
    },
    {
      group: "2",
      title: "Combinando Conceptos",
      description:
        "En este paso, combinarás varios conceptos aprendidos para crear un pequeño proyecto.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText:
          "Crea un pequeño proyecto que defina una clase `Persona`, use la herencia para crear una clase `Estudiante` y demuestre encapsulación y arreglos de objetos.",
      },
    },
    {
      group: "2",
      title: "Imprimiendo en la Terminal",
      description: "En este paso, imprimirás un mensaje usando la terminal.",
      isCode: true,
      isTerminal: true,
      question: {
        questionText:
          "Escribe un comando para imprimir el mensaje: '¡Estoy hablando dentro de una computadora!'",
      },
    },
    {
      groupReference: "2",
      title: "Revisión con Conversación AI",
      isConversationReview: true,
      description: "Revisa los temas que has respondido",
      question: {
        questionText:
          "Hablemos sobre las preguntas en las que hemos trabajado hasta ahora.",
        range: [31, 47],
      },
    },
    {
      group: "3",
      title: "Introducción a los Componentes de React",
      description:
        "En este paso, aprenderás sobre los componentes de React, su papel en la creación de elementos de interfaz de usuario reutilizables y cómo ayudan a gestionar la interfaz de usuario de manera eficiente.",
      isMultipleChoice: true,
      question: {
        questionText:
          "¿Cuál de las siguientes opciones describe mejor un componente de React?",
        options: [
          "Un método para manejar eventos en JavaScript",
          "Una característica exclusiva del renderizado del lado del servidor en React",
          "Un elemento reutilizable de la interfaz de usuario definido como una función o clase que devuelve JSX",
          "Un elemento HTML incorporado en React",
        ],
        answer:
          "Un elemento reutilizable de la interfaz de usuario definido como una función o clase que devuelve JSX",
      },
    },
    {
      group: "3",
      title: "Conceptos Clave en React",
      description:
        "En este paso, aprenderás sobre los conceptos fundamentales de React, incluidas las propiedades (props), el estado, los eventos y los estilos.",
      isMultipleAnswerChoice: true,
      question: {
        questionText: "¿Cuáles de los siguientes son conceptos clave en React?",
        options: [
          "Gestionar propiedades para pasar datos entre componentes",
          "Manipular directamente el DOM para mejorar el rendimiento",
          "Usar el estado para gestionar datos dentro de un componente",
          "Manejar eventos como clics con controladores de eventos",
          "Aplicar estilos en línea o clases CSS a los componentes",
        ],
        answer: [
          "Gestionar propiedades para pasar datos entre componentes",
          "Usar el estado para gestionar datos dentro de un componente",
          "Manejar eventos como clics con controladores de eventos",
          "Aplicar estilos en línea o clases CSS a los componentes",
        ],
      },
    },
    {
      group: "3",
      title: "Efecto de los Cambios en el Estado de un Componente",
      description:
        "En este paso, explicarás qué sucede con un componente de React cuando su estado cambia.",
      isText: true,
      question: {
        questionText:
          "¿Qué sucede con un componente de React cuando su estado cambia?",
      },
    },
    {
      group: "3",
      title: "Creando un Componente Simple de React",
      description:
        "En este paso, definirás un componente básico de React que devuelve un simple JSX.",
      isCodeCompletion: true,
      question: {
        questionText:
          "¿Cuál de los siguientes bloques de código define correctamente un componente simple de React que devuelve un encabezado y un párrafo?",
        options: [
          `function MiComponente() {
      return (
        <div>
          <h1>¡Hola, Mundo!</h1>
        </div>
      );
    }`,
          `function MiComponente() {
      <div>
        <h1>¡Hola, Mundo!</h1>
      </div>;
    }`,
          `class MiComponente {
      render() {
        return (
          <div>
            <h1>¡Hola, Mundo!</h1>
          </div>
        );
      }
    }`,
          `function MiComponente() {
      return (
        <div>Hola</div>
        <div>Mundo</div>
      );
    }`,
        ],
        answer: `function MiComponente() {
      return (
        <div>
          <h1>¡Hola, Mundo!</h1>
        </div>
      );
    }`,
      },
    },
    {
      group: "3",
      title: "Manejo de Eventos en React",
      description:
        "En este paso, definirás un componente básico de React que maneja un evento de clic en un botón usando el atributo `onClick`.",
      isCodeCompletion: true,
      question: {
        questionText:
          "¿Cuál de los siguientes bloques de código define correctamente un componente de React que maneja un evento de clic en un botón?",
        options: [
          `function MiComponente() {
      return (
        <div>
          <button 
            onClick={
              alert('¡Botón clicado!')
            }
          >
            Haz clic
          </button>
        </div>
      );
    }`,
          `function MiComponente() {
    return (
      <div>
        <button 
          onClick={() => {
            alert('¡Botón clicado!')
          }}
        >
          Haz clic
        </button>
      </div>
    );
    }`,
          `function MiComponente() {
      const manejarClick = () => {
        alert('¡Botón clicado!');
      };
        
      return (
        <div>
          <button 
            onClick={manejarClick}
          >
            Haz clic
          </button>
        </div>
      );
    }`,
          `function MiComponente() {
    return (
      <div>
        <button>
          Haz clic
        </button>
      </div>
    );
        }`,
        ],
        answer: `function MiComponente() {
      const manejarClick = () => {
        alert('¡Botón clicado!');
      };
    
      return (
        <div>
          <button 
            onClick={manejarClick}
          >
            Haz clic
          </button>
        </div>
      );
    }`,
      },
    },
    {
      group: "3",
      title: "Gestionando el Estado con el Hook useState",
      description:
        "En este paso, aprenderás cómo usar el hook useState para gestionar el estado de un componente.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText:
          "Modifica el componente Tweet para incluir un botón de 'me gusta' que cambie el estado usando el hook useState.",
      },
    },
    {
      group: "3",
      title: "Propiedades del Componente",
      description:
        "En este paso, aprenderás cómo pasar propiedades a los componentes en React.",
      isSingleLineText: true,
      question: {
        questionText:
          "¿Cuál es el término utilizado para pasar datos a un componente de React?",
        placeholder: "Escribe tu respuesta aquí...",
        answer: "props",
      },
    },
    {
      group: "3",
      title: "Pasando y Usando Props",
      description:
        "En este paso, aprenderás cómo pasar y usar props en un componente de React.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText:
          "Actualiza el componente Tweet para aceptar y mostrar el nombre de usuario, el handle y el contenido del tweet como props.",
      },
    },
    {
      group: "3",
      title: "Trabajando con Props y Estado Juntos",
      description:
        "En este paso, aprenderás cómo trabajar con tanto props como estado en un componente de React.",
      isMultipleChoice: true,
      question: {
        questionText:
          "¿Cuál es la principal diferencia entre props y estado en React?",
        options: [
          "Las props son inmutables mientras que el estado es mutable",
          "Las props son gestionadas por el propio componente mientras que el estado se pasa desde componentes padres",
          "El estado se usa para estilos mientras que las props se usan para la lógica",
          "No hay diferencia; son lo mismo",
        ],
        answer: "Las props son inmutables mientras que el estado es mutable",
      },
    },
    {
      group: "3",
      title: "Práctica en la Terminal: Listando Archivos",
      description:
        "En este paso, aprenderás cómo listar archivos en una terminal bash.",
      isCode: true,
      isTerminal: true,
      question: {
        questionText:
          "Usa la terminal para listar todos los archivos usando el comando list.",
      },
    },
    {
      group: "3",
      title: "Estilizando Componentes de React",
      description:
        "En este paso, aprenderás cómo aplicar estilos a los componentes de React usando CSS.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText:
          "Agrega estilos al componente Tweet para mejorar su apariencia.",
      },
    },
    {
      group: "3",
      title: "Usando Flexbox para Diseños",
      description:
        "En este paso, aprenderás cómo usar Flexbox para crear diseños en React.",
      isSelectOrder: true,
      question: {
        questionText:
          "Ordena las siguientes propiedades de CSS en el orden necesario para centrar un diseño básico con estilos de flexbox:",
        options: [
          "display: flex;",
          "justify-content: center;",
          "align-items: center;",
          "flex-direction: row;",
        ],
        answer: [
          "display: flex;",
          "flex-direction: row;",
          "justify-content: center;",
          "align-items: center;",
        ],
      },
    },
    {
      group: "3",
      title: "Elevando el Estado",
      description:
        "En este paso, aprenderás cómo elevar el estado a un componente ancestro común para compartir estado entre componentes.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText:
          "Crea un componente padre que gestione el estado para múltiples componentes Tweet y pase el estado y los controladores de eventos como props.",
      },
    },
    {
      group: "3",
      title: "Usando useEffect para Efectos Secundarios",
      description:
        "En este paso, aprenderás cómo usar el hook useEffect para manejar efectos secundarios en un componente de React.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText:
          "Modifica el componente Tweet para usar el hook useEffect y registrar un mensaje en la consola cada vez que cambie el número de retweets.",
      },
    },
    {
      group: "3",
      title: "Comprendiendo el Ciclo de Vida del Componente",
      description:
        "En este paso, aprenderás sobre el ciclo de vida de los componentes de React y cómo usar el hook useEffect para gestionar efectos secundarios.",
      isText: true,
      question: {
        questionText:
          "¿Qué es el ciclo de vida del componente en React y cuál es el propósito del hook useEffect?",
      },
    },
    {
      group: "3",
      title: "Obteniendo Datos con useEffect",
      description:
        "En este paso, aprenderás cómo obtener datos de una API usando el hook useEffect.",
      isSelectOrder: true,
      question: {
        questionText:
          "Ordena los pasos con arrastrar y soltar para obtener datos correctamente usando useEffect.",
        options: [
          "Importa React y useState",
          "Importa useEffect de React",
          "Crea un componente",
          "Define el hook useEffect",
          "Haz la llamada a la API dentro de useEffect",
          "Usa async/await o .then() para manejar la respuesta de la API",
          "Actualiza el estado del componente con los datos obtenidos",
          "Maneja los errores en la llamada a la API",
          "Renderiza los datos en el componente",
        ],
        answer: [
          "Importa React y useState",
          "Importa useEffect de React",
          "Crea un componente",
          "Define el hook useEffect",
          "Haz la llamada a la API dentro de useEffect",
          "Usa async/await o .then() para manejar la respuesta de la API",
          "Actualiza el estado del componente con los datos obtenidos",
          "Maneja los errores en la llamada a la API",
          "Renderiza los datos en el componente",
        ],
      },
    },
    {
      group: "3",
      title: "Construyendo una App Completa de Tweets",
      description:
        "En este paso, combinarás todo lo que has aprendido para construir una app completa de tweets.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText:
          "Construye una app completa de tweets que obtenga tweets de una API, los muestre usando el componente Tweet y permita a los usuarios dar 'me gusta' y retweetear.",
      },
    },
    {
      group: "3",
      title: "Práctica en la Terminal: Configurando una App de React",
      description:
        "En este paso, aprenderás cómo configurar un proyecto de React.",
      isText: true,
      question: {
        questionText:
          "Escribe el comando para instalar la versión más reciente de un proyecto de React con Vite.",
      },
    },
    {
      group: "3",
      title: "Creando un Nuevo Proyecto de React con Vite",
      description:
        "En este paso, aprenderás cómo crear un nuevo proyecto de React usando Vite siguiendo los pasos correctos y ejecutando comandos de línea de comandos.",
      isSelectOrder: true,
      question: {
        questionText:
          "Ordena los pasos con arrastrar y soltar para crear correctamente un nuevo proyecto de React usando Vite, incluidos los comandos de línea.",
        options: [
          "Asegúrate de que Node.js esté instalado ejecutando `node -v`",
          "Ejecuta `npm create vite@latest` para crear un nuevo proyecto de Vite",
          "Selecciona la plantilla de React cuando se te solicite",
          "Navega al directorio del proyecto usando `cd nombre-del-proyecto`",
          "Ejecuta `npm install` para instalar las dependencias",
          "Inicia el servidor de desarrollo con `npm run dev`",
        ],
        answer: [
          "Asegúrate de que Node.js esté instalado ejecutando `node -v`",
          "Ejecuta `npm create vite@latest` para crear un nuevo proyecto de Vite",
          "Selecciona la plantilla de React cuando se te solicite",
          "Navega al directorio del proyecto usando `cd nombre-del-proyecto`",
          "Ejecuta `npm install` para instalar las dependencias",
          "Inicia el servidor de desarrollo con `npm run dev`",
        ],
      },
    },
    {
      groupReference: "3",
      title: "Revisión con Conversación AI",
      isConversationReview: true,
      description: "Revisa los temas que has respondido",
      question: {
        questionText:
          "Hablemos sobre las preguntas en las que hemos trabajado hasta ahora.",
        range: [49, 67],
      },
    },
    {
      group: "4",
      title: "Introducción a la Ingeniería de Backend",
      description:
        "En este paso, aprenderás qué es la ingeniería de software backend y por qué es importante.",
      isText: true,
      question: {
        questionText:
          "¿Qué es la ingeniería de software backend y por qué es importante en la construcción de aplicaciones?",
      },
    },
    {
      group: "4",
      title: "Descripción General de las Lecciones Principales",
      description:
        "En este paso, identificarás una responsabilidad clave de la ingeniería de backend cubierta en el curso.",
      isMultipleChoice: true,
      question: {
        questionText:
          "¿Cuál de las siguientes es una responsabilidad clave en la ingeniería de backend?",
        options: [
          "Gestionar la concurrencia y garantizar la seguridad de los hilos en aplicaciones multiusuario",
          "Implementar la autenticación de usuarios directamente en la experiencia del usuario",
          "Manejar la asignación de memoria y la recolección de basura en entornos de servidor",
          "Diseñar componentes de interfaz de usuario escalables para compatibilidad entre navegadores",
          "Optimizar consultas a la base de datos y garantizar la consistencia de los datos",
        ],
        answer:
          "Optimizar consultas a la base de datos y garantizar la consistencia de los datos",
      },
    },
    {
      group: "4",
      title: "Responsabilidades Clave de la Ingeniería de Backend",
      description:
        "En este paso, aprenderás sobre las diversas responsabilidades involucradas en la ingeniería de backend.",
      isMultipleAnswerChoice: true,
      question: {
        questionText:
          "¿Cuáles de las siguientes son responsabilidades clave de la ingeniería de backend?",
        options: [
          "Gestionar y optimizar bases de datos para almacenar y recuperar datos de manera eficiente",
          "Diseñar e implementar APIs para facilitar la comunicación entre sistemas",
          "Garantizar la seguridad mediante mecanismos de autenticación y autorización de usuarios",
          "Manejar la lógica del lado del servidor, incluidas las operaciones comerciales y cálculos",
          "Mantener la confiabilidad y el rendimiento del servidor bajo alto tráfico",
          "Gestionar la integridad y consistencia de los datos en sistemas distribuidos",
          "Implementar registro y monitoreo para asegurar la salud del sistema y depurar problemas",
        ],
        answer: [
          "Gestionar y optimizar bases de datos para almacenar y recuperar datos de manera eficiente",
          "Diseñar e implementar APIs para facilitar la comunicación entre sistemas",
          "Garantizar la seguridad mediante mecanismos de autenticación y autorización de usuarios",
          "Manejar la lógica del lado del servidor, incluidas las operaciones comerciales y cálculos",
          "Mantener la confiabilidad y el rendimiento del servidor bajo alto tráfico",
          "Gestionar la integridad y consistencia de los datos en sistemas distribuidos",
          "Implementar registro y monitoreo para asegurar la salud del sistema y depurar problemas",
        ],
      },
    },
    {
      group: "4",
      title: "Interactuando con la Terminal",
      description:
        "En este paso, aprenderás sobre la importancia de la terminal en la ingeniería de backend y cómo interactuar con ella para diversas tareas.",
      isText: true,
      question: {
        questionText:
          "¿Por qué es importante aprender a usar la terminal para los sistemas operativos y qué tipo de tareas se pueden realizar con ella?",
      },
    },
    {
      group: "4",
      title: "Instalando NPM",
      description: "En este paso, aprenderás cómo instalar npm globalmente.",
      isText: true,
      question: {
        questionText:
          "Escribe el comando para instalar globalmente el gestor de paquetes de Node (npm) en tu computadora.",
      },
    },
    {
      group: "4",
      title: "Instalación de un Paquete NPM",
      description:
        "En este paso, utilizarás la terminal para instalar un paquete con npm.",
      isText: true,
      question: {
        questionText:
          "Escribe un comando para instalar la biblioteca de componentes de Chakra para interfaces de usuario en React.",
      },
    },
    {
      group: "4",
      title: "Creación de Usuarios y Autenticación",
      description:
        "En este paso, entenderás el concepto clave relacionado con la creación de usuarios en sistemas backend.",
      isSingleLineText: true,
      question: {
        questionText:
          "¿Cómo se llama el proceso que verifica la identidad de un usuario durante la creación de una cuenta?",
        placeholder: "Escribe tu respuesta aquí...",
        answer: "autenticación",
      },
    },
    {
      group: "4",
      title: "Fundamentos de Bases de Datos",
      description:
        "En este paso, aprenderás sobre los fundamentos de las bases de datos en la ingeniería de backend.",
      isText: true,
      question: {
        questionText:
          "¿Cuáles son los principales tipos de bases de datos utilizados en la ingeniería de backend?",
      },
    },
    {
      group: "4",
      title: "Conectando Sistemas",
      description:
        "Escribe un fragmento de código para conectar una aplicación a una base de datos Firebase.",
      isCode: true,
      question: {
        questionText:
          "Escribe un fragmento de código para conectar una aplicación a una base de datos Firebase.",
      },
    },
    {
      group: "4",
      title: "Iniciar un Proyecto de Firebase",
      description:
        "En este paso, entenderás cómo iniciar un proyecto de Firebase desde la línea de comandos.",
      isText: true,
      question: {
        questionText:
          "Escribe el comando para iniciar un proyecto de Firebase.",
      },
    },
    {
      group: "4",
      title: "Prácticas Avanzadas de Almacenamiento de Datos",
      description:
        "En este paso, aprenderás prácticas avanzadas para almacenar datos de manera responsable en sistemas backend.",
      isMultipleAnswerChoice: true,
      question: {
        questionText:
          "¿Cuáles de las siguientes son mejores prácticas para garantizar el almacenamiento responsable de datos en un sistema backend?",
        options: [
          "Almacenar en caché los datos en memoria para reducir el tiempo de acceso a la base de datos",
          "Cifrar datos sensibles tanto en reposo como en tránsito para garantizar la seguridad",
          "Implementar replicación de bases de datos a través de múltiples centros de datos para mejorar la tolerancia a fallos",
        ],
        answer: [
          "Almacenar en caché los datos en memoria para reducir el tiempo de acceso a la base de datos",
          "Cifrar datos sensibles tanto en reposo como en tránsito para garantizar la seguridad",
          "Implementar replicación de bases de datos a través de múltiples centros de datos para mejorar la tolerancia a fallos",
        ],
      },
    },
    {
      group: "4",
      title: "Inicializando Firebase y Trabajando con Firestore v9",
      description:
        "En este paso, aprenderás cómo inicializar Firebase y configurar colecciones y documentos en Firestore v9.",
      isCodeCompletion: true,
      question: {
        questionText:
          "Completa el código para inicializar Firebase con la configuración proporcionada y agregar un documento único a una colección en Firestore.",
        options: [
          // Opción 1: Código correcto para inicializar Firebase y agregar un documento

          // Opción 2: Incorrecto - falta la inicialización de Firestore
          `import { 
      initializeApp 
    } from 'firebase/app';
    
    import { 
      collection, 
      setDoc 
    } from 'firebase/firestore';
    
    const firebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: "progr-ai.firebaseapp.com",
      projectId: "progr-ai",
      storageBucket: "progr-ai.appspot.com",
      messagingSenderId: "32042075426",
      appId: "1:320420758826:web:68dfeffe8aa7b6421e8a53",
      measurementId: "G-0E37NCB4KB",
    };
    
    initializeApp(firebaseConfig);
    await setDoc(collection(db, 'usuarios'), {
      name: 'John Doe',
      email: 'john@example.com'
    });`,

          // Opción 3: Incorrecto - falta el ID del documento en Firestore
          `import { 
      initializeApp 
    } from 'firebase/app';
    
    import { 
      getFirestore, 
      doc, 
      setDoc 
    } from 'firebase/firestore';
    
    const firebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: "progr-ai.firebaseapp.com",
      projectId: "progr-ai",
      storageBucket: "progr-ai.appspot.com",
      messagingSenderId: "32042075426",
      appId: "1:320420758826:web:68dfeffe8aa7b6421e8a53",
      measurementId: "G-0E37NCB4KB",
    };
    
    // Inicializar Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    // Agregar documento
    await setDoc(doc(db, 'usuarios'), {
      name: 'John Doe',
      email: 'john@example.com'
    });`,
          `import { 
      initializeApp 
    } from 'firebase/app';
    
    import { 
      getFirestore, 
      doc, 
      setDoc
    } from 'firebase/firestore';
    
    const firebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: "progr-ai.firebaseapp.com",
      projectId: "progr-ai",
      storageBucket: "progr-ai.appspot.com",
      messagingSenderId: "32042075426",
      appId: "1:320420758826:web:68dfeffe8aa7b6421e8a53",
      measurementId: "G-0E37NCB4KB",
    };
    
    // Inicializar Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    // Agregar documento
    await addDoc(doc(db, 'usuarios'), {
      name: 'John Doe',
      email: 'john@example.com'
    });`,

          // Opción 4: Incorrecto - falta importar los métodos de Firestore
          `import { 
      initializeApp 
    } from 'firebase/app';
        
    const firebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: "progr-ai.firebaseapp.com",
      projectId: "progr-ai",
      storageBucket: "progr-ai.appspot.com",
      messagingSenderId: "32042075426",
      appId: "1:320420758826:web:68dfeffe8aa7b6421e8a53",
      measurementId: "G-0E37NCB4KB",
    };
    
    // Inicializar Firebase
    const app = initializeApp(firebaseConfig);
    
    // Agregar documento
    await addDoc(doc(db, 'usuarios', 'user123'), {
      name: 'John Doe',
      email: 'john@example.com'
    });`,
        ],
        answer: `import { 
      initializeApp 
    } from 'firebase/app';
    
    import { 
      getFirestore, 
      doc, 
      setDoc 
    } from 'firebase/firestore';
    
    const firebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: "progr-ai.firebaseapp.com",
      projectId: "progr-ai",
      storageBucket: "progr-ai.appspot.com",
      messagingSenderId: "32042075426",
      appId: "1:320420758826:web:68dfeffe8aa7b6421e8a53",
      measurementId: "G-0E37NCB4KB",
    };
    
    // Inicializar Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    // Agregar documento
    await setDoc(doc(db, 'usuarios'), {
      name: 'John Doe',
      email: 'john@example.com'
    });`,
      },
    },
    {
      group: "4",
      title: "Manejo de Datos de Usuarios",
      description:
        "En este paso, aprenderás cómo manejar los datos de los usuarios en sistemas backend.",
      isCode: true,
      question: {
        questionText:
          "Escribe un fragmento de código para obtener un objeto de usuario con las propiedades de nombre de usuario y correo electrónico usando Firebase Auth.",
      },
    },
    {
      group: "4",
      title: "Recuperar un Documento de Usuario Después de la Autenticación",
      description:
        "En este paso, aprenderás cómo recuperar un documento de usuario desde Firestore usando los datos de autenticación.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText:
          "Escribe un código para recuperar un documento de usuario de la colección `users` en Firestore usando el ID de usuario autenticado.",
      },
    },
    {
      group: "4",
      title: "Comprendiendo el Flujo de Autenticación",
      description:
        "En este paso, aprenderás sobre el flujo típico de autenticación en sistemas backend.",
      isSelectOrder: true,
      question: {
        questionText:
          "Organiza los siguientes pasos en el orden correcto para un flujo típico de autenticación en un sistema backend.",
        options: [
          "El usuario ingresa credenciales (correo electrónico y contraseña) en el formulario de inicio de sesión",
          "El backend verifica las credenciales con el servicio de autenticación",
          "Se crean tokens de identidad o sesiones para el usuario autenticado",
          "El sistema recupera datos del usuario de la base de datos utilizando los tokens",
          "El usuario obtiene acceso a los recursos protegidos",
        ],
        answer: [
          "El usuario ingresa credenciales (correo electrónico y contraseña) en el formulario de inicio de sesión",
          "El backend verifica las credenciales con el servicio de autenticación",
          "Se crean tokens de identidad o sesiones para el usuario autenticado",
          "El sistema recupera datos del usuario de la base de datos utilizando los tokens",
          "El usuario obtiene acceso a los recursos protegidos",
        ],
      },
    },
    {
      group: "4",
      title: "Autenticación OAuth",
      description:
        "En este paso, aprenderás sobre los sistemas de autenticación estilo OAuth.",
      isSingleLineText: true,
      question: {
        questionText:
          "¿Cuál es el protocolo ampliamente utilizado para la autorización que permite a servicios de terceros acceder a datos de usuario sin exponer credenciales?",
        placeholder: "Escribe tu respuesta aquí...",
        answer: "OAuth",
      },
    },
    {
      group: "4",
      title: "Uso de Variables de Entorno",
      description:
        "En este paso, aprenderás sobre el uso de variables de entorno en el desarrollo backend.",
      isText: true,
      question: {
        questionText:
          "¿Qué papel juegan las variables de entorno en una base de código?",
      },
    },
    {
      group: "4",
      title: "Relaciones en Bases de Datos",
      description:
        "En este paso, aprenderás sobre las relaciones en las bases de datos.",
      isCode: true,
      question: {
        questionText:
          "Escribe un fragmento de código para definir una relación uno a muchos entre usuarios y publicaciones en una base de datos.",
      },
    },
    {
      group: "4",
      title: "Interfaz con una API",
      description:
        "En este paso, aprenderás los métodos HTTP comunes utilizados para interactuar con una API y algunos métodos menos comunes.",
      isMultipleAnswerChoice: true,
      question: {
        questionText:
          "¿Cuáles de los siguientes métodos HTTP son comúnmente utilizados para interactuar con una API y qué hacen?",
        options: [
          "GET (Recupera datos del servidor)",
          "POST (Crea un nuevo recurso en el servidor)",
          "SEND (Envía datos al servidor para su procesamiento)",
          "FETCH (Se utiliza para recuperar datos de un recurso)",
          "PATCH (Actualiza parcialmente un recurso en el servidor)",
          "REMOVE (Elimina datos de un servidor)",
          "PUT (Actualiza un recurso existente en el servidor)",
          "DELETE (Elimina un recurso del servidor)",
        ],
        answer: [
          "GET (Recupera datos del servidor)",
          "POST (Crea un nuevo recurso en el servidor)",
          "PUT (Actualiza un recurso existente en el servidor)",
          "DELETE (Elimina un recurso del servidor)",
          "PATCH (Actualiza parcialmente un recurso en el servidor)",
        ],
      },
    },
    {
      group: "4",
      title: "Creación de un Sistema de Autenticación de Usuarios",
      description:
        "En este paso, crearás un sistema de autenticación de usuarios simple.",
      isSelectOrder: true,
      question: {
        questionText:
          "Organiza los pasos para implementar la autenticación de usuarios usando JSON Web Tokens.",
        options: [
          "Instalar la biblioteca JWT",
          "Configurar un modelo de usuario en la base de datos",
          "Crear una ruta de registro para nuevos usuarios",
          "Cifrar la contraseña del usuario antes de almacenarla",
          "Crear una ruta de inicio de sesión",
          "Verificar las credenciales del usuario",
          "Generar un token JWT",
          "Enviar el token JWT de vuelta al cliente",
          "Crear una ruta protegida que requiera autenticación",
          "Verificar el token JWT en rutas protegidas",
        ],
        answer: [
          "Instalar la biblioteca JWT",
          "Configurar un modelo de usuario en la base de datos",
          "Crear una ruta de registro para nuevos usuarios",
          "Cifrar la contraseña del usuario antes de almacenarla",
          "Crear una ruta de inicio de sesión",
          "Verificar las credenciales del usuario",
          "Generar un token JWT",
          "Enviar el token JWT de vuelta al cliente",
          "Crear una ruta protegida que requiera autenticación",
          "Verificar el token JWT en rutas protegidas",
        ],
      },
    },
    {
      group: "4",
      title: "Desplegar una Aplicación de Firebase",
      description:
        "En este paso, aprenderás cómo desplegar una aplicación backend de Firebase en un servicio en la nube.",
      isText: true,
      question: {
        questionText:
          "Escribe un comando para desplegar una aplicación de Firebase en la línea de comandos.",
      },
    },
    {
      groupReference: "4",
      title: "Revisión con Conversación de IA",
      isConversationReview: true,
      description: "Revisa los temas que has respondido.",
      question: {
        questionText:
          "Hablemos de las preguntas en las que hemos trabajado hasta ahora.",
        range: [69, 89],
      },
    },
    {
      group: "5",
      title: "Beneficios de las Plataformas en la Nube Sin Servidor",
      description:
        "En este paso, explorarás las ventajas de usar plataformas en la nube sin servidor como Firebase o Vercel en el desarrollo de software.",
      isText: true,
      question: {
        questionText:
          "¿Cuáles son los principales beneficios de usar plataformas en la nube sin servidor como Firebase o Vercel en el desarrollo de software, y en qué se diferencian de los modelos tradicionales basados en servidores?",
      },
    },
    {
      group: "5",
      title: "Comprender VSCode",
      description:
        "En este paso, explorarás qué es Visual Studio Code (VSCode) y por qué es un editor de código popular.",
      isText: true,
      question: {
        questionText:
          "¿Qué es Visual Studio Code (VSCode) y por qué es uno de los editores de código más populares entre los desarrolladores?",
      },
    },
    {
      group: "5",
      title: "Instalar Node.js y NPM",
      description:
        "Instala Node.js, lo que te permitirá crear aplicaciones en JavaScript.",
      isText: true,
      question: {
        questionText:
          "¿Cuál es el propósito de Node.js y npm en el desarrollo de JavaScript en términos simples?",
      },
    },
    {
      group: "5",
      title: "Instalar Paquetes de 'package.json'.",
      description: "Instalar los archivos encontrados en package.json.",
      isSingleLineText: true,
      question: {
        questionText:
          "Introduce el comando para instalar los paquetes en un proyecto de React usando npm.",
        answer: "npm install",
      },
    },
    {
      group: "5",
      title: "Instalar Herramientas de Firebase Globalmente",
      description:
        "Instala las herramientas de Firebase globalmente usando la línea de comandos.",
      isSingleLineText: true,
      question: {
        questionText:
          "Usa el terminal para instalar firebase-tools globalmente. ¿Qué comando utilizas?",
        answer: "npm install -g firebase-tools",
      },
    },
    {
      group: "5",
      title: "Configurar un Proyecto de React y Firebase con VSCode",
      description:
        "En este paso, organizarás los pasos necesarios para configurar un proyecto de React usando Vite, conectar los servicios de Firebase e instalar las herramientas necesarias utilizando Visual Studio Code (VSCode).",
      isSelectOrder: true,
      question: {
        questionText:
          "Organiza los siguientes pasos en el orden correcto para configurar un proyecto de React usando Vite, instalar Node.js y npm, y conectar los servicios de Firebase usando VSCode.",
        options: [
          "Instalar Node.js y npm en tu máquina",
          "Instalar Visual Studio Code (VSCode)",
          "Abrir VSCode y navegar al terminal",
          "Ejecutar `npm create vite@latest` para crear un nuevo proyecto de React",
          "Navegar a la carpeta del proyecto usando `cd nombre-del-proyecto`",
          "Ejecutar `npm install` para instalar dependencias",
          "Instalar Firebase CLI usando `npm install -g firebase-tools`",
          "Iniciar sesión en Firebase usando `firebase login`",
          "Inicializar Firebase en el proyecto usando `firebase init`",
          "Habilitar servicios de Firebase como Firestore o Authentication",
          "Conectar Firebase a tu proyecto de React agregando la configuración de Firebase",
          "Iniciar el servidor de desarrollo usando `npm run dev`",
        ],
        answer: [
          "Instalar Node.js y npm en tu máquina",
          "Instalar Visual Studio Code (VSCode)",
          "Abrir VSCode y navegar al terminal",
          "Ejecutar `npm create vite@latest` para crear un nuevo proyecto de React",
          "Navegar a la carpeta del proyecto usando `cd nombre-del-proyecto`",
          "Ejecutar `npm install` para instalar dependencias",
          "Instalar Firebase CLI usando `npm install -g firebase-tools`",
          "Iniciar sesión en Firebase usando `firebase login`",
          "Inicializar Firebase en el proyecto usando `firebase init`",
          "Habilitar servicios de Firebase como Firestore o Authentication",
          "Conectar Firebase a tu proyecto de React agregando la configuración de Firebase",
          "Iniciar el servidor de desarrollo usando `npm run dev`",
        ],
      },
    },
    {
      group: "5",
      title: "Configurar Firebase",
      description:
        "En este paso, configurarás Firebase para tu proyecto, incluyendo Authentication, Firestore y Analytics.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText:
          "Escribe el código en JavaScript para inicializar Firebase en tu proyecto, y conectar los servicios de Authentication, Firestore y Analytics.",
      },
    },
    {
      group: "5",
      title: "Introducción a GitHub",
      description:
        "Aprende sobre el uso de GitHub para colaborar con otros desarrolladores.",
      isMultipleChoice: true,
      question: {
        questionText: "¿Para qué se usa principalmente GitHub?",
        options: [
          "Alojar sitios web",
          "Gestionar repositorios de código",
          "Descentralizar software",
          "Recopilar datos",
        ],
        answer: "Gestionar repositorios de código",
      },
    },
    {
      group: "5",
      title: "Clonar Proyectos de Github",
      description: "Clonar proyectos de Github en la línea de comandos.",
      isCode: true,
      isTerminal: true,
      question: {
        questionText:
          "Usa el terminal para clonar un proyecto de progr.ai de Github por Robots Building Education utilizando comandos de git.",
        answer:
          "git clone https://github.com/RobotsBuildingEducation/progr.ai.git",
      },
    },
    {
      group: "5",
      title: "Alternativas Populares a Firebase",
      description:
        "En este paso, explorarás algunas alternativas populares a Firebase para varios servicios backend como la gestión de bases de datos, autenticación y hosting.",
      isMultipleAnswerChoice: true,
      question: {
        questionText:
          "¿Cuáles de las siguientes son alternativas populares a Firebase para construir aplicaciones full-stack?",
        options: [
          "Supabase",
          "AWS Amplify",
          "MongoDB Realm",
          "HerokuDB",
          "AngularJS",
          "Vercel",
          "Cloudflare",
        ],
        answer: ["Supabase", "AWS Amplify", "MongoDB Realm", "Cloudflare"],
      },
    },
    {
      group: "5",
      title: "Productos Más Comunes de Firebase",
      description:
        "En este paso, identificarás los productos centrales de Firebase comúnmente utilizados en el desarrollo de aplicaciones web y móviles.",
      isMultipleAnswerChoice: true,
      question: {
        questionText:
          "¿Cuáles de los siguientes son productos comúnmente utilizados de Firebase?",
        options: [
          "Firestore: Base de datos NoSQL en la nube para almacenar y sincronizar datos",
          "Firebase Ads: Plataforma para integrar publicidad",
          "Authentication: Gestión de inicio de sesión e identidad de usuario",
          "Firebase Functions: Backend sin servidor para ejecutar código",
          "Firebase Storage: Almacenamiento de archivos para contenido generado por usuarios",
          "Firebase Machine Learning: Herramientas de ML para características de la app",
          "Firebase Builder: Herramienta para crear servicios de Firebase",
          "Firebase Hosting: Alojamiento web para desplegar contenido estático",
          "Firebase Cache: Servicio de caché para almacenamiento de alto rendimiento",
          "Firebase Realtime Database: Base de datos de sincronización en tiempo real",
          "Firebase Firestore: Base de datos de documentos y colecciones",
          "Firebase Analytics: Rastrea el compromiso de usuarios y eventos en tu app",
        ],
        answer: [
          "Firestore: Base de datos NoSQL en la nube para almacenar y sincronizar datos",
          "Authentication: Gestión de inicio de sesión e identidad de usuario",
          "Firebase Realtime Database: Base de datos de sincronización en tiempo real",
          "Firebase Hosting: Alojamiento web para desplegar contenido estático",
          "Firebase Functions: Backend sin servidor para ejecutar código",
          "Firebase Storage: Almacenamiento de archivos para contenido generado por usuarios",
          "Firebase Analytics: Rastrea el compromiso de usuarios y eventos en tu app",
          "Firebase Firestore: Base de datos de documentos y colecciones",
          "Firebase Machine Learning: Herramientas de ML para características de la app",
        ],
      },
    },
    {
      group: "5",
      title: "Actualizar un Proyecto con Github",
      description: "Actualiza tu versión de código haciendo pull con Github.",
      isSingleLineText: true,
      question: {
        questionText:
          "Usa el terminal para actualizar tu proyecto local de Github con la última versión disponible en Github.",
      },
    },
    {
      group: "5",
      title: "Autenticando Usuarios",
      description:
        "Instala Firebase y react-firebaseui para crear usuarios en tu aplicación.",
      isMultipleChoice: true,
      question: {
        questionText:
          "¿Qué paquete utilizas para gestionar la experiencia del usuario para la autenticación con Firebase?",
        options: [
          "firebase",
          "firebase-auth",
          "firebase-hooks",
          "react-firebaseui",
          "firebase-admin",
          "firebase-functions",
          "firebase-storage",
          "firebase-database",
        ],
        answer: "react-firebaseui",
      },
    },
    {
      group: "5",
      title: "Habilitar Inicio de Sesión con Google",
      description:
        "Habilita el método de inicio de sesión con Google en la configuración de autenticación de Firebase.",
      isText: true,
      question: {
        questionText:
          "¿Qué pasos sigues para habilitar el inicio de sesión con Google en la configuración de autenticación de Firebase?",
      },
    },
    {
      group: "5",
      title: "Conectar Firebase a Tu Código",
      description:
        "Recupera las claves de configuración de Firebase y conéctalas a tu código.",
      isCode: true,
      question: {
        questionText:
          "Escribe el código para inicializar Firebase en tu proyecto utilizando las claves de configuración.",
      },
    },
    {
      group: "5",
      title:
        "Renderizando Botón de Inicio de Sesión en React con Firebase y react-firebaseui",
      description:
        "En este paso, renderizarás un botón de inicio de sesión en tu aplicación de React usando Firebase Authentication y la biblioteca react-firebaseui.",
      isCode: true,
      question: {
        questionText:
          "Escribe el código para renderizar un botón de inicio de sesión de Firebase en un componente de React utilizando Firebase Authentication y react-firebaseui.",
      },
    },
    {
      group: "5",
      title: "Mostrando Datos de Usuario",
      description:
        "Utiliza useEffect para mostrar los datos de usuario cuando inician sesión.",
      isCode: true,
      question: {
        questionText:
          "Escribe el código para mostrar los datos del usuario utilizando el hook useEffect cuando inician sesión con Firebase.",
      },
    },
    {
      group: "5",
      title: "Actualizando el Perfil de Usuario",
      description:
        "Actualiza la información del perfil de usuario en tu base de datos de Firebase después de que hayan iniciado sesión.",
      isCode: true,
      question: {
        questionText:
          "Escribe el código para actualizar la información del perfil de usuario en Firebase Firestore.",
      },
    },
    {
      group: "5",
      title: "Actualizando un Proyecto de Github",
      description:
        "Encadenando comandos de git para actualizar un proyecto en Github.",
      isSingleLineText: true,
      question: {
        questionText:
          "Introduce la combinación de comandos de github para escribir y actualizar una base de código con un mensaje.",
        answer:
          'git add . && git commit -m "your_message" && git push origin main',
      },
    },
    {
      group: "5",
      title: "Usando Comandos de GitHub",
      description:
        "Aprende los comandos básicos de GitHub para gestionar tu código.",
      isSelectOrder: true,
      question: {
        questionText:
          "Organiza los siguientes comandos de Git en el orden correcto para programáticamente crear un nuevo repositorio y hacer push a tu cuenta de GitHub:",
        options: [
          "git init",
          "git add .",
          "git commit -m 'Initial commit'",
          "git remote add origin <repository-url>",
          "git branch -M main",
          "git push -u origin main",
        ],
        answer: [
          "git init",
          "git add .",
          "git commit -m 'Initial commit'",
          "git remote add origin <repository-url>",
          "git branch -M main",
          "git push -u origin main",
        ],
      },
    },
    {
      groupReference: "5",
      title: "Revisión con Conversación AI",
      isConversationReview: true,
      description: "Revisa los temas que has respondido",
      question: {
        questionText:
          "Vamos a conversar sobre las preguntas que hemos trabajado hasta ahora.",
        range: [91, 110],
      },
    },
    {
      group: "6",
      title: "Introducción a Estructuras de Datos y Algoritmos",
      description:
        "Comprende la importancia y los desafíos de aprender estructuras de datos y algoritmos.",
      isText: true,
      question: {
        questionText:
          "¿Por qué las estructuras de datos y los algoritmos suelen alejar a las personas de la informática?",
      },
    },
    {
      group: "6",
      title: "Lenguajes de Programación y Tecnología de Autocorrección",
      description:
        "Explora cómo funcionan los lenguajes de programación y cómo las computadoras entienden el código.",
      isCode: true,
      question: {
        questionText:
          "Escribe un programa simple, sin usar bibliotecas, que demuestre cómo la tecnología de autocorrección puede identificar y corregir una palabra mal escrita.",
      },
    },
    {
      group: "6",
      title: "Tokens en el Código",
      description:
        "Descompón el código en tokens para entender cómo las computadoras interpretan la información.",
      isMultipleChoice: true,
      question: {
        questionText:
          "¿Cuál de los siguientes es un ejemplo de un token en un lenguaje de programación?",
        options: [
          "Una función completa",
          "Un solo carácter como ';'",
          "Una definición de variable como 'let manzanas = 10'",
          "Un bloque de código HTML",
          "Un objeto definido por 'class Object { ... }'",
          "Una biblioteca de JavaScript",
        ],
        answer: "Un solo carácter como ';'",
      },
    },
    {
      group: "6",
      title: "Descomponiendo Cadenas en Caracteres",
      description:
        "Comprende cómo se descomponen las cadenas en caracteres y luego en código máquina.",
      isCode: true,
      question: {
        questionText:
          "Escribe el código para descomponer la cadena 'Kendrick' en un array y luego en un mapeo de objetos.",
      },
    },
    {
      group: "6",
      title: "Comprendiendo las Estructuras de Datos",
      description:
        "Convierte una cadena en un array de objetos clave-valor que asignen caracteres a sus códigos ASCII.",
      isSelectOrder: true,
      question: {
        questionText:
          "Convierte la cadena 'Kendrick' en un array de objetos clave-valor donde cada carácter se asigne a su código ASCII.",
        options: [
          "{ 'K': 75 }",
          "{ 'e': 101 }",
          "{ 'n': 110 }",
          "{ 'd': 100 }",
          "{ 'r': 114 }",
          "{ 'i': 105 }",
          "{ 'c': 99 }",
          "{ 'k': 107 }",
        ],
        answer: [
          "{ 'K': 75 }",
          "{ 'e': 101 }",
          "{ 'n': 110 }",
          "{ 'd': 100 }",
          "{ 'r': 114 }",
          "{ 'i': 105 }",
          "{ 'c': 99 }",
          "{ 'k': 107 }",
        ],
      },
    },
    {
      group: "6",
      title: "Conversión Binaria",
      description: "Convierte caracteres a su representación binaria.",
      isCode: true,
      question: {
        questionText:
          "Convierte el mapeo de los códigos ASCII que representan 'Kendrick' en un mapeo de código binario.",
      },
    },
    {
      group: "6",
      title: "Comprendiendo las Estructuras de Datos",
      description:
        "Aprende cómo las estructuras de datos almacenan y referencian información.",
      isText: true,
      question: {
        questionText:
          "¿Por qué es importante entender cómo las computadoras reservan espacio y crean direcciones para referenciar información? ¿Cuáles son algunos ejemplos en el mundo real de esto a gran escala?",
      },
    },
    {
      group: "6",
      title: "Introducción a Listas Enlazadas",
      description:
        "Aprende sobre los conceptos básicos de las listas enlazadas.",
      isMultipleChoice: true,
      question: {
        questionText:
          "¿Cuál de las siguientes es una característica de las listas enlazadas?",
        options: [
          "Arreglos de tamaño fijo",
          "Asignación dinámica de memoria",
          "Acceso en tiempo constante a los elementos",
          "Los datos se almacenan en memoria contigua",
        ],
        answer: "Asignación dinámica de memoria",
      },
    },
    {
      group: "6",
      title: "Construyendo una Lista Enlazada",
      description:
        "Construye una lista enlazada simple en JavaScript con los valores 'meta', 'instagram', 'reels'.",
      isCodeCompletion: true,
      question: {
        questionText:
          "¿Cuál de los siguientes fragmentos de código crea correctamente una lista enlazada con los valores 'meta', 'instagram' y 'reels' en JavaScript?",
        options: [
          // Opción 1: Implementación correcta de lista enlazada
          `class Node {
            constructor(value) {
              this.value = value;
              this.next = null;
            }
          }
          
          class LinkedList {
            constructor() {
              this.head = null;
            }
    
            add(value) {
              const newNode = new Node(value);
              if (!this.head) {
                this.head = newNode;
              } else {
                let current = this.head;
                while (current.next) {
                  current = current.next;
                }
                current.next = newNode;
              }
            }
          }
    
          const list = new LinkedList();
          list.add('meta');
          list.add('instagram');
          list.add('reels');`,
        ],
        answer: `class Node {
          constructor(value) {
            this.value = value;
            this.next = null;
          }
        }
    
        class LinkedList {
          constructor() {
            this.head = null;
          }
    
          add(value) {
            const newNode = new Node(value);
            if (!this.head) {
              this.head = newNode;
            } else {
              let current = this.head;
              while (current.next) {
                current = current.next;
              }
              current.next = newNode;
            }
          }
        }
    
        const list = new LinkedList();
        list.add('meta');
        list.add('instagram');
        list.add('reels');`,
      },
    },
    {
      group: "6",
      title: "Aplicación Práctica de una Lista Enlazada",
      description: "Aplica la clase LinkedList a un escenario del mundo real.",
      isCode: true,
      question: {
        questionText:
          "Escribe el código para crear una lista enlazada con los departamentos de la empresa Google y recórrela.",
      },
    },
    {
      group: "6",
      title: "Recorriendo una Lista Enlazada",
      description:
        "Implementa un método para recorrer una lista enlazada y devolver el último elemento.",
      isCode: true,
      question: {
        questionText:
          "Escribe un método en la clase LinkedList que recorra la lista y devuelva el último elemento.",
      },
    },
    {
      group: "6",
      title: "Implementación de la Clase Lista Enlazada",
      description: "Implementa las clases LinkedList y ListItem en JavaScript.",
      isMultipleChoice: true,
      question: {
        questionText:
          "¿Qué método usarías para agregar un nuevo elemento al final de una lista enlazada?",
        options: ["addAtIndex()", "append()", "insert()", "push()", "create()"],
        answer: "append()",
      },
    },
    {
      group: "6",
      title: "Invertir una Lista Enlazada",
      description: "Invierte la dirección de una lista enlazada.",
      isMultipleChoice: true,
      question: {
        questionText:
          "¿Cuál es la complejidad temporal de invertir una lista enlazada?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n^2)", "O(n log n)", "O(2^n)"],
        answer: "O(n)",
      },
    },
    {
      group: "6",
      title: "Algoritmo de Búsqueda en Profundidad (Recursión)",
      description:
        "Entiende e implementa un algoritmo de búsqueda en profundidad usando recursión.",
      isSelectOrder: true,
      question: {
        questionText:
          "Ordena los pasos arrastrando y soltando para implementar correctamente un algoritmo de búsqueda en profundidad usando recursión.",
        options: [
          "Comienza en el nodo raíz",
          "Marca el nodo actual como visitado",
          "Procesa el nodo (por ejemplo, imprime o almacena su valor)",
          "Llama recursivamente a la función DFS en cada vecino no visitado",
          "Retrocede una vez que todos los vecinos hayan sido visitados",
          "Repite hasta que todos los nodos hayan sido visitados",
        ],
        answer: [
          "Comienza en el nodo raíz",
          "Marca el nodo actual como visitado",
          "Procesa el nodo (por ejemplo, imprime o almacena su valor)",
          "Llama recursivamente a la función DFS en cada vecino no visitado",
          "Retrocede una vez que todos los vecinos hayan sido visitados",
          "Repite hasta que todos los nodos hayan sido visitados",
        ],
      },
    },
    {
      group: "6",
      title: "Creando una Estructura de Árbol",
      description:
        "Construye una estructura de árbol simple para practicar la búsqueda en profundidad.",
      isCode: true,
      question: {
        questionText:
          "Escribe el código en JavaScript para crear la siguiente estructura de árbol con 3 niveles de profundidad, con las empresas Alphabet y Meta.",
      },
    },
    {
      group: "6",
      title: "Entendiendo la Búsqueda en Profundidad y en Anchura",
      description:
        "Aprende las diferencias entre los algoritmos de búsqueda en profundidad y en anchura.",
      isText: true,
      question: {
        questionText:
          "Explica la diferencia entre los algoritmos de búsqueda en profundidad y en anchura.",
      },
    },
    {
      group: "6",
      title: "Implementando Búsqueda en Profundidad con Recursión",
      description:
        "Completa la implementación de una búsqueda en profundidad (DFS) usando recursión para recorrer un árbol binario.",
      isCodeCompletion: true,
      question: {
        questionText:
          "¿Cuál de los siguientes fragmentos de código implementa correctamente DFS usando recursión en un árbol binario en JavaScript?",
        options: [
          // Opción correcta de DFS con recursión (recorrido preorden)
        ],
        answer: `class TreeNode {
          constructor(value) {
            this.value = value;
            this.left = null;
            this.right = null;
          }
        }
    
        function dfs(node) {
          if (node === null) {
            return;
          }
          console.log(node.value);
          dfs(node.left);
          dfs(node.right);
        }
    
        const root = new TreeNode(1);
        root.left = new TreeNode(2);
        root.right = new TreeNode(3);
        root.left.left = new TreeNode(4);
        root.left.right = new TreeNode(5);
        dfs(root);`,
      },
    },
    {
      group: "6",
      title: "Optimización de Algoritmos",
      description:
        "Explora formas de optimizar algoritmos para un mejor rendimiento.",
      isCode: true,
      question: {
        questionText:
          "Escribe una versión optimizada del algoritmo de ordenamiento de burbuja en JavaScript sin usar recursión.",
      },
    },
    {
      group: "6",
      title: "Explorando el Problema de las N-Reinas",
      description: "Entiende el problema de las N-Reinas y su complejidad.",
      isText: true,
      question: {
        questionText:
          "¿Qué es el problema de las N-Reinas y por qué se considera complejo?",
      },
    },
    {
      group: "6",
      title: "Implementando Algoritmo de Retroceso",
      description:
        "Implementa un algoritmo de retroceso para resolver un problema.",
      isSelectOrder: true,
      question: {
        questionText:
          "Ordena los pasos arrastrando y soltando para implementar retroceso para un problema de N-Reinas en un tablero de 4x4.",
        options: [
          "Comienza con un tablero vacío",
          "Coloca una reina en la fila actual",
          "Verifica si es seguro colocar la reina",
          "Si es seguro, pasa a la siguiente fila",
          "Si no es seguro, intenta la siguiente columna en la fila actual",
          "Si todas las columnas son inseguras, retrocede a la fila anterior",
          "Si la fila anterior no tiene columnas seguras, retrocede más",
          "Si el tablero está lleno de colocaciones seguras, devuelve la solución",
          "Continúa este proceso hasta encontrar todas las soluciones posibles",
        ],
        answer: [
          "Comienza con un tablero vacío",
          "Coloca una reina en la fila actual",
          "Verifica si es seguro colocar la reina",
          "Si es seguro, pasa a la siguiente fila",
          "Si no es seguro, intenta la siguiente columna en la fila actual",
          "Si todas las columnas son inseguras, retrocede a la fila anterior",
          "Si la fila anterior no tiene columnas seguras, retrocede más",
          "Si el tablero está lleno de colocaciones seguras, devuelve la solución",
          "Continúa este proceso hasta encontrar todas las soluciones posibles",
        ],
      },
    },
    {
      group: "6",
      title: "Implementando Retroceso para N-Reinas de 4x4",
      description:
        "Implementa un algoritmo de retroceso para resolver el problema de N-Reinas en un tablero de 4x4.",
      isCode: true,
      question: {
        questionText:
          "Escribe el código para implementar retroceso para resolver el problema de N-Reinas de 4x4 en JavaScript.",
      },
    },
    {
      groupReference: "6",
      title: "Revisión con Conversación de IA",
      isConversationReview: true,
      description: "Revisa los temas que has contestado.",
      question: {
        questionText:
          "Hablemos sobre las preguntas en las que hemos trabajado hasta ahora.",
        range: [112, 132],
      },
    },
  ],
};
