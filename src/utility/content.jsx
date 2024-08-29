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
      title: "Understanding Coding",
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
        range: [1, 5], // Indices of steps to review
      },
    },
    // Cycle 2 (No Terminal)
    {
      group: "1",
      title: "Data Types in Programming",
      description: "Identify different data types used in programming.",
      isMultipleChoice: true,
      question: {
        questionText:
          "Which of the following is NOT a primitive data type in JavaScript?",
        options: ["String", "Number", "Boolean", "Object"],
        answer: "Object",
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
      description: "Learn the sequence of evaluating conditions.",
      isSelectOrder: true,
      question: {
        questionText:
          "Arrange the steps with drag-and-drop of evaluating an `if-else` statement.",
        options: [
          "Evaluate the `if` condition",
          "Execute `if` block if condition is true",
          "Evaluate the `else if` condition",
          "Execute `else if` block if condition is true",
          "Evaluate the `else` condition",
          "Execute `else` block if condition is false",
        ],
        answer: [
          "Evaluate the `if` condition",
          "Execute `if` block if condition is true",
          "Evaluate the `else if` condition",
          "Execute `else if` block if condition is true",
          "Evaluate the `else` condition",
          "Execute `else` block if condition is false",
        ],
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
      title: "Understanding Logic in Programming",
      description:
        "In this step, you will learn about logic in the context of programming.",
      isText: true,
      question: {
        questionText:
          "Explain in your own words how logic is applied in programming to control the flow of a program.",
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
      description: "Identify characteristics of array types.",
      isMultipleChoice: true,
      question: {
        questionText:
          "Which of the following methods adds an element to the end of an array in JavaScript?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        answer: "push()",
      },
    },
    {
      group: "1",
      title: "Order of Array Operations",
      description: "Understand how array operations are performed.",
      isSelectOrder: true,
      question: {
        questionText:
          "Arrange the steps with drag-and-drop to add and remove elements from an array.",
        options: [
          "Declare an array",
          "Use push() to add an element",
          "Use pop() to remove the last element",
          "Access array elements",
        ],
        answer: [
          "Declare an array",
          "Use push() to add an element",
          "Use pop() to remove the last element",
          "Access array elements",
        ],
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
      title: "Understanding the Goal of Coding",
      description:
        "In this step, you will learn about the primary goal of coding or programming.",
      isMultipleChoice: true,
      question: {
        questionText:
          "Which of the following best describes the primary goal of coding or programming?",
        options: [
          "To solve problems by creating efficient and effective solutions",
          "To learn different programming languages",
          "To write as much code as possible",
          "To memorize syntax and functions",
        ],
        answer:
          "To solve problems by creating efficient and effective solutions",
      },
    },
    {
      groupReference: "1",
      title: "Review With AI Conversation",
      isConversationReview: true,
      description: "Review the subjects you've answered",
      question: {
        questionText: "Let's chat about the questions we've worked on so far.",
        range: [6, 20], // Indices of steps to review
      },
    },
    {
      group: "2",
      title: "Introduction to Objects",
      description:
        "In this step, you will learn what an object is in programming.",
      isText: true,
      question: {
        questionText: "What is an object in programming?",
      },
    },
    {
      group: "2",
      title: "Creating a Simple Class",
      description:
        "In this step, you will write a simple class definition in JavaScript.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText: `Write a simple class definition in JavaScript for a \`Car\` object with properties for \`make\` and \`model\`, and a method to display the car's details.`,
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
      isSelectOrder: true,
      question: {
        questionText:
          "Arrange the steps with drag-and-drop in the correct order to create an instance of a class in JavaScript.",
        options: [
          "Define the class",
          "Define the constructor method inside the class",
          "Declare the variable to store the instance",
          "Use the 'new' keyword",
          "Call the class name",
          "Pass any required arguments",
          "Assign the instance to the variable",
          "Use the instance to access properties or methods",
        ],
        answer: [
          "Define the class",
          "Define the constructor method inside the class",
          "Declare the variable to store the instance",
          "Use the 'new' keyword",
          "Call the class name",
          "Pass any required arguments",
          "Assign the instance to the variable",
          "Use the instance to access properties or methods",
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
        "In this step, you will understand the `this` keyword in the context of a class.",
      isMultipleChoice: true,
      question: {
        questionText:
          "What does the `this` keyword represent in a class method?",
        options: [
          "The global object",
          "The object that calls the method",
          "The method itself",
          "The class definition",
        ],
        answer: "The object that calls the method",
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
      title: "Accessing Object Properties",
      description:
        "In this step, you will learn how to access properties of an object in JavaScript.",
      isSelectOrder: true,
      question: {
        questionText:
          "Arrange the steps with drag-and-drop to correctly access a property in an object.",
        options: [
          "Identify the object",
          "Determine the property to access",
          "Use dot or bracket notation",
          "Specify the property name",
          "Store the value in a variable or use it directly",
        ],
        answer: [
          "Identify the object",
          "Determine the property to access",
          "Use dot or bracket notation",
          "Specify the property name",
          "Store the value in a variable or use it directly",
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
      title: "Creating and Using an Array of Objects",
      description:
        "In this step, you will create and use an array of objects in JavaScript.",
      isSelectOrder: true,
      question: {
        questionText:
          "Arrange the steps with drag-and-drop to correctly iterate over an array of objects.",
        options: [
          "Define the object structure",
          "Create individual objects",
          "Initialize an empty array",
          "Add objects to the array",
          "Verify the array structure",
          "Choose a loop type (e.g., for, while, forEach)",
          "Use a loop to iterate through the array",
          "Access properties of each object inside the loop",
          "Perform actions with the accessed properties",
          "Store or output the results",
        ],
        answer: [
          "Define the object structure",
          "Create individual objects",
          "Initialize an empty array",
          "Add objects to the array",
          "Verify the array structure",
          "Choose a loop type (e.g., for, while, forEach)",
          "Use a loop to iterate through the array",
          "Access properties of each object inside the loop",
          "Perform actions with the accessed properties",
          "Store or output the results",
        ],
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
        range: [6, 22], // Indices of steps to review
      },
    },
    {
      group: "3",
      title: "Introduction to React Components",
      description:
        "In this step, you will learn about React components and their importance in creating user interfaces.",
      isMultipleChoice: true,
      question: {
        questionText:
          "Which of the following best describes a React component?",
        options: [
          "A function that returns HTML",
          "A tool for server-side rendering",
          "A method for handling events",
        ],
        answer: "A function that returns HTML",
      },
    },
    {
      group: "3",
      title: "Understanding React Hooks",
      description:
        "In this step, you will learn about React hooks and how they are used to manage state and side effects in functional components.",
      isSelectOrder: true,
      question: {
        questionText:
          "Arrange the steps with drag-and-drop to use the useState hook correctly.",
        options: [
          "Import useState from React",
          "Declare the state variable",
          "Provide an initial value for the state",
          "Update the state using the setter function",
          "Use the state variable in the component",
        ],
        answer: [
          "Import useState from React",
          "Declare the state variable",
          "Provide an initial value for the state",
          "Use the state variable in the component",
          "Update the state using the setter function",
        ],
      },
    },

    {
      group: "3",
      title: "Creating a Simple React Component",
      description:
        "In this step, you will create a simple React component that displays a Tweet.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText: `Write a simple React component that displays a Tweet with the user's name, handle, and text.`,
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
      title: "Handling Events in React",
      description:
        "In this step, you will learn how to handle events in React, such as clicks.",
      isMultipleChoice: true,
      question: {
        questionText:
          "What is the best way to handle a button click event in React?",
        options: [
          "Attach an event listener directly to the button in HTML",
          "Use the onClick attribute in the JSX of the component",
          "Write a custom event handler in plain JavaScript",
          "Bind the event handler to the DOM element using querySelector",
        ],
        answer: "Use the onClick attribute in the JSX of the component",
      },
    },
    {
      group: "3",
      title: "Component Properties",
      description:
        "In this step, you will learn about passing properties to components in React.",
      isText: true,
      question: {
        questionText:
          "What are properties in a React component and how are they used?",
      },
    },
    {
      group: "3",
      title: "Updating Component State",
      description:
        "In this step, you will learn how to update the state of a component based on user interactions.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText: `Update the Tweet component to increment the like count each time the like button is clicked.`,
      },
    },
    {
      group: "3",
      title: "Creating a New React Project",
      description:
        "In this step, you will create a new React project using Vite.",
      isSelectOrder: true,
      question: {
        questionText:
          "Arrange the steps with drag-and-drop to correctly create a new React project using Vite.",
        options: [
          "Ensure Node.js is installed",
          "Run the command to create a new Vite project",
          "Choose the React template",
          "Navigate to the project directory",
          "Install dependencies",
          "Start the development server",
        ],
        answer: [
          "Ensure Node.js is installed",
          "Run the command to create a new Vite project",
          "Choose the React template",
          "Navigate to the project directory",
          "Install dependencies",
          "Start the development server",
        ],
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
      title: "Understanding JSX",
      description:
        "In this step, you will learn about JSX and how it is used to describe the UI in React components.",
      isText: true,
      question: {
        questionText: "What is JSX and why is it used in React?",
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
          "Arrange the following CSS properties in the order needed to create a basic Flexbox layout:",
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
      title: "Adding More State with useState",
      description:
        "In this step, you will learn how to manage multiple pieces of state in a component using the useState hook.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText: `Add a retweet button to the Tweet component that tracks the number of retweets.`,
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
      groupReference: "3",
      title: "Review With AI Conversation",
      isConversationReview: true,
      description: "Review the subjects you've answered",
      question: {
        questionText: "Let's chat about the questions we've worked on so far.",
        range: [24, 42], // Indices of steps to review
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
        "In this step, you will identify the main lessons covered in the backend engineering course.",
      isMultipleChoice: true,
      question: {
        questionText:
          "Which of the following is a core aspect of backend engineering?",
        options: [
          "Designing user interfaces",
          "Managing databases",
          "Creating graphic design elements",
          "Writing frontend HTML and CSS",
        ],
        answer: "Managing databases",
      },
    },
    {
      group: "4",
      title: "Relating Backend to Real World",
      description:
        "In this step, you will relate the operations of a kitchen in a restaurant to backend engineering.",
      isSelectOrder: true,
      question: {
        questionText:
          "Arrange the following tasks in a restaurant kitchen to correspond with backend operations:",
        options: [
          "Preparing ingredients",
          "Cooking the food",
          "Serving the dish",
          "Cleaning up",
        ],
        answer: [
          "Preparing ingredients",
          "Cooking the food",
          "Serving the dish",
          "Cleaning up",
        ],
      },
    },
    {
      group: "4",
      title: "Understanding Operating Systems",
      description:
        "In this step, you will learn why understanding operating systems is important in backend engineering.",
      isText: true,
      question: {
        questionText:
          "Why is it important to understand the operating system when studying backend engineering?",
      },
    },
    {
      group: "4",
      title: "Installing NPM",
      description: "In this step, you will learn how to install npm globally",

      isText: true,
      question: {
        questionText:
          "Use the terminal to install the node package manager (npm) globally onto your computer",
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
      title: "Creating Users Concept",
      description:
        "In this step, you will understand the concept of creating users in backend systems.",
      isMultipleChoice: true,
      question: {
        questionText:
          "Which of the following is a key aspect of user creation in backend systems?",
        options: [
          "Generating unique user IDs",
          "Designing user avatars",
          "Selecting color themes",
          "Creating social media profiles",
        ],
        answer: "Generating unique user IDs",
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
        "In this step, you will understand how to start a Firebase project with the command line.",
      isText: true,
      question: {
        questionText: "Write the command to start a firebase project.",
      },
    },
    {
      group: "4",
      title: "Storing Data Responsibly",
      description:
        "In this step, you will learn about responsible data storage practices.",
      isText: true,
      question: {
        questionText:
          "What are some best practices for storing data responsibly in a backend system?",
      },
    },
    {
      group: "4",
      title: "Working with Collections and Documents",
      description:
        "In this step, you will learn about the process of setting up collections and documents in non-relational databases like Firebase or MongoDB.",
      isSelectOrder: true,
      question: {
        questionText:
          "Arrange the steps in the correct order to set up a collection and add a document in a non-relational database.",
        options: [
          "Create a new collection",
          "Define document structure",
          "Add a new document to the collection",
          "Assign a unique document ID",
          "Save the document",
          "Query the collection for documents",
        ],
        answer: [
          "Create a new collection",
          "Define document structure",
          "Assign a unique document ID",
          "Add a new document to the collection",
          "Save the document",
          "Query the collection for documents",
        ],
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
      title: "Creating a New User",
      description:
        "In this step, you will create a new user in a backend system.",
      isText: true,
      question: {
        questionText:
          "Use the terminal to add a new user to the `Users` collection in your firestore database.",
      },
    },
    {
      group: "4",
      title: "Understanding Authentication",
      description:
        "In this step, you will learn about authentication processes in backend systems.",
      isText: true,
      question: {
        questionText:
          "What is authentication and why is it important in backend systems?",
      },
    },
    {
      group: "4",
      title: "Authorization Servers",
      description:
        "In this step, you will learn about the role of authorization servers.",
      isSelectOrder: true,
      question: {
        questionText:
          "Arrange the steps with drag-and-drop to correctly authorize a user.",
        options: [
          "User submits credentials",
          "Server verifies credentials",
          "Authorization token is generated",
          "User is granted access to resources",
        ],
        answer: [
          "User submits credentials",
          "Server verifies credentials",
          "Authorization token is generated",
          "User is granted access to resources",
        ],
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
      title: "Creating API Endpoints",
      description:
        "In this step, you will learn how to create API endpoints for a backend application.",
      isMultipleChoice: true,
      question: {
        questionText:
          "Which HTTP method is commonly used to create a new resource via an API?",
        options: ["GET", "POST", "PUT", "DELETE"],
        answer: "POST",
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
          "Arrange the steps with drag-and-drop to implement user authentication using JWT.",
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
          "Write a  to deploy a Firebase application in the command line.",
      },
    },
    {
      groupReference: "4",
      title: "Review With AI Conversation",
      isConversationReview: true,
      description: "Review the subjects you've answered",
      question: {
        questionText: "Let's chat about the questions we've worked on so far.",
        range: [44, 66], // Indices of steps to review
      },
    },
    {
      group: "5",
      title: "Introduction to Full Application Development",
      description:
        "Learn how to piece together everything you've learned to build a complete application.",
      isText: true,
      question: {
        questionText:
          "What tools and resources can you use if you come across something you want to learn more about while building an application?",
      },
    },
    {
      group: "5",
      title: "Installing VSCode",
      description:
        "Install Visual Studio Code (VSCode), the code editor for writing your code.",
      isText: true,
      question: {
        questionText:
          "Write the terminal command to install VSCode on your operating system.",
      },
    },
    {
      group: "5",
      title: "Installing Node.js",
      description:
        "Install Node.js, which lets you build JavaScript applications.",
      isText: true,
      question: {
        questionText:
          "What is the purpose of Node.js in JavaScript development?",
      },
    },
    {
      group: "5",
      title: "Installing 'package.json' Packages.",
      description: "Installing the files found in package.json.",
      isText: true,
      question: {
        questionText:
          "Enter the command to install the packages found in a react project using npm.",
      },
    },
    {
      group: "5",
      title: "Creating a Project Folder",
      description: "Create a new folder for your project.",
      isSelectOrder: true,
      question: {
        questionText:
          "Arrange the following commands to create and navigate into a new project folder:",
        options: [
          "mkdir myProject",
          "cd myProject",
          "Creates the folder",
          "Navigates into the folder",
        ],
        answer: [
          "mkdir myProject",
          "Creates the folder",
          "cd myProject",
          "Navigates into the folder",
        ],
      },
    },
    {
      group: "5",
      title: "Install Firebase Tools Globally",
      description: "Install Firebase tools globally using the command line.",

      isText: true,
      question: {
        questionText:
          "Use the terminal to install firebase-tools globally. What command do you use?",
      },
    },
    {
      group: "5",
      title: "Running the React Application",
      description: "Run your React application in development mode.",
      isSelectOrder: true,
      question: {
        questionText:
          "Arrange the steps with drag-and-drop to correctly run your React application.",
        options: [
          "Open the terminal",
          "Navigate to the project folder",
          "Run the start script",
          "View the app in the browser",
        ],
        answer: [
          "Open the terminal",
          "Navigate to the project folder",
          "Run the start script",
          "View the app in the browser",
        ],
      },
    },
    {
      group: "5",
      title: "Setting Up Firebase",
      description: "Set up Firebase for your project.",
      isText: true,
      question: {
        questionText: "What are the steps to set up Firebase for your project?",
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
          "Creating databases",
          "Designing user interfaces",
        ],
        answer: "Managing code repositories",
      },
    },
    {
      group: "5",
      title: "Cloning Github Projects",
      description: "Cloning Github projects in the command line.",
      isText: true,
      question: {
        questionText:
          "Use the terminal to clone a RobotsBuildingEducation Github project called programAI using git commands.",
      },
    },
    {
      group: "5",
      title: "Initializing Firebase",
      description:
        "Initialize Firebase in your project and authenticate your account.",
      isSelectOrder: true,
      question: {
        questionText:
          "Arrange the steps with drag-and-drop to correctly initialize Firebase in your project.",
        options: [
          "Install Firebase CLI",
          "Login to Firebase",
          "Initialize Firebase in the project",
          "Choose project settings",
          "Install Firebase SDK",
          "Add Firebase configuration to your code",
          "Enable Firebase services (e.g., Firestore, Authentication)",
          "Set up security rules for your services",
          "Deploy your app using Firebase Hosting (optional)",
          "Test Firebase integration",
        ],
        answer: [
          "Install Firebase CLI",
          "Login to Firebase",
          "Initialize Firebase in the project",
          "Choose project settings",
          "Install Firebase SDK",
          "Add Firebase configuration to your code",
          "Enable Firebase services (e.g., Firestore, Authentication)",
          "Set up security rules for your services",
          "Deploy your app using Firebase Hosting (optional)",
          "Test Firebase integration",
        ],
      },
    },
    {
      group: "5",
      title: "Understanding Firebase Core Features",
      description:
        "Identify the core functionality of Firebase services like Firestore, Authentication, Storage, Hosting, and Cloud Functions.",
      isSelectOrder: true,
      question: {
        questionText:
          "Arrange the Firebase services with their core functions.",
        options: [
          "Firestore: Cloud NoSQL database for storing and syncing data",
          "Authentication: User sign-in and identity management",
          "Storage: File storage for user-generated content",
          "Hosting: Web hosting for deploying static content",
          "Cloud Functions: Serverless backend for running code in response to events",
        ],
        answer: [
          "Firestore: Cloud NoSQL database for storing and syncing data",
          "Authentication: User sign-in and identity management",
          "Storage: File storage for user-generated content",
          "Hosting: Web hosting for deploying static content",
          "Cloud Functions: Serverless backend for running code in response to events",
        ],
      },
    },
    {
      group: "5",
      title: "Pulling Updates With Github",
      description: "Update your version of code by pulling with Github.",

      isText: true,
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
          "Which package do you use to handle user authentication in Firebase?",
        options: [
          "firebase",
          "react-firebaseui",
          "firebase-auth",
          "firebase-hooks",
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
      title: "Rendering Sign-In Button",
      description:
        "Render a sign-in button in your React application using Firebase and react-firebaseui.",
      isSelectOrder: true,
      question: {
        questionText:
          "Arrange the steps with drag-and-drop to correctly render a sign-in button using Firebase and react-firebaseui.",
        options: [
          "Install Firebase and react-firebaseui packages",
          "Import the necessary Firebase modules",
          "Initialize Firebase with your configuration",
          "Configure Firebase Authentication in the Firebase Console",
          "Create and configure the sign-in options",
          "Render the Firebase UI component in your React component",
          "Test the sign-in flow in your application",
        ],
        answer: [
          "Install Firebase and react-firebaseui packages",
          "Import the necessary Firebase modules",
          "Initialize Firebase with your configuration",
          "Configure Firebase Authentication in the Firebase Console",
          "Create and configure the sign-in options",
          "Render the Firebase UI component in your React component",
          "Test the sign-in flow in your application",
        ],
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
        "Update the user profile information in your Firebase database.",
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
      isText: true,
      question: {
        questionText:
          "Enter the combination of github commands to write and update a codebase with a message.",
      },
    },

    {
      group: "5",
      title: "Using GitHub Commands",
      description: "Learn the basic GitHub commands for managing your code.",
      isSelectOrder: true,
      question: {
        questionText:
          "Arrange the following Git commands in the correct order to create a new repository:",
        options: [
          "git init",
          "git add .",
          "git commit -m 'Initial commit'",
          "git push origin main",
        ],
        answer: [
          "git init",
          "git add .",
          "git commit -m 'Initial commit'",
          "git push origin main",
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
        range: [68, 92], // Indices of steps to review
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
        questionText: `Write a simple program in any language to demonstrate how autocorrect technology might identify and correct a misspelled word.`,
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
          'Write the code to break down the string "Drake" into an array of characters.',
      },
    },
    {
      group: "6",
      title: "Understanding Data Structures",
      description: "Convert a string into an array of key-value pair objects.",
      isSelectOrder: true,
      question: {
        questionText:
          "Convert the string 'Drake' into an array where each character is a key and its index is the value. Represent each character as an object with the character as the key and the index as the value.",
        options: [
          "{ 'D': 0 }",
          "{ 'r': 1 }",
          "{ 'a': 2 }",
          "{ 'k': 3 }",
          "{ 'e': 4 }",
        ],
        answer: [
          "{ 'D': 0 }",
          "{ 'r': 1 }",
          "{ 'a': 2 }",
          "{ 'k': 3 }",
          "{ 'e': 4 }",
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
          'Write the binary representation for each character in the string "Drake".',
      },
    },
    {
      group: "6",
      title: "Understanding Data Structures",
      description: "Learn how data structures store and reference information.",
      isText: true,
      question: {
        questionText:
          "Why is it important to understand how computers reserve space and create addresses to reference information?",
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
      description: "Construct a simple linked list in JavaScript.",
      isCode: true,
      question: {
        questionText:
          'Write the JavaScript code to create a linked list with the following values: "meta", "instagram", "reels".',
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
          "Write the JavaScript code to create the following tree structure with Alphabet and Meta's organizations.",
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
      title: "Reversing a Linked List",
      description: "Reverse the direction of a linked list.",
      isMultipleChoice: true,
      question: {
        questionText: "What is the time complexity of reversing a linked list?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
        answer: "O(n)",
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
      title: "Depth-First Search Application",
      description: "Apply depth-first search to a practical example.",
      isSelectOrder: true,
      question: {
        questionText:
          "Arrange the steps with drag-and-drop to implement depth-first search on a binary tree.",
        options: [
          "Start at the root node",
          "Check if the current node is null",
          "Recursively call DFS on the left child",
          "Process the current node (e.g., print the value)",
          "Recursively call DFS on the right child",
          "Backtrack to the parent node if necessary",
          "Process all nodes until all children are visited",
          "Continue until the entire tree is traversed",
        ],
        answer: [
          "Start at the root node",
          "Check if the current node is null",
          "Recursively call DFS on the left child",
          "Process the current node (e.g., print the value)",
          "Recursively call DFS on the right child",
          "Backtrack to the parent node if necessary",
          "Process all nodes until all children are visited",
          "Continue until the entire tree is traversed",
        ],
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
          "Write an optimized version of the bubble sort algorithm in JavaScript.",
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
        options: ["addAtIndex()", "append()", "insert()", "push()"],
        answer: "append()",
      },
    },
    {
      group: "6",
      title: "Practical Linked List Application",
      description: "Apply the LinkedList class to a real-world scenario.",
      isCode: true,
      question: {
        questionText:
          "Write the code to create a linked list of company departments and traverse through it.",
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
          "Arrange the steps with drag-and-drop to implement backtracking for the N-Queens problem.",
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
      groupReference: "6",
      title: "Review With AI Conversation",
      isConversationReview: true,
      description: "Review the subjects you've answered",
      question: {
        questionText: "Let's chat about the questions we've worked on so far.",
        range: [94, 114], // Indices of steps to review
      },
    },
  ],
  es: [
    {
      group: "0",
      title: "¡Bienvenido a la aplicación Program AI!",
      description:
        "Presiona 'Empecemos' para comenzar tu viaje en el aprendizaje de cómo programar.",
    },
    {
      group: "tutorial",
      title: "Entendiendo la Programación",
      description: "Comprende el concepto básico de la programación.",
      isMultipleChoice: true,
      question: {
        questionText:
          "¿Cuál de las siguientes opciones describe mejor la programación?",
        options: [
          "Escribir instrucciones para que las computadoras realicen tareas",
          "Crear componentes físicos para las computadoras",
          "Diseñar interfaces de usuario",
          "Gestionar bases de datos",
        ],
        answer:
          "Escribir instrucciones para que las computadoras realicen tareas",
      },
    },
    {
      group: "tutorial",
      title: "Secuencia de Ejecución del Programa",
      description: "Aprende el orden correcto de ejecución de un programa.",
      isSelectOrder: true,
      question: {
        questionText:
          "Organiza los pasos con arrastrar y soltar y ordena cómo se ejecutan los programas.",
        options: [
          "Compilación de código",
          "Escribir código",
          "Ejecutar el programa",
          "Depurar",
        ],
        answer: [
          "Escribir código",
          "Compilación de código",
          "Depurar",
          "Ejecutar el programa",
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
          "Usa la palabra clave var/let/const",
          "Elige un nombre descriptivo para la variable",
          "Asigna un valor usando el signo de igual simple (=)",
          "Inicializa la variable dentro de llaves {}",
          "Declara la variable después de asignar un valor",
          "Capitaliza la primera letra del nombre de la variable",
        ],
        answer: [
          "Usa la palabra clave var/let/const",
          "Elige un nombre descriptivo para la variable",
          "Asigna un valor usando el signo de igual simple (=)",
        ],
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
      title: "Propósito de las Variables",
      description:
        "Entiende por qué se utilizan las variables en la programación.",
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
          "Introduce el comando para cambiar al directorio new_folder usando un terminal bash.",
      },
    },
    {
      groupReference: "tutorial",
      title: "Revisión con Conversación AI",
      isConversationReview: true,
      description: "Revisa los temas que has respondido.",
      question: {
        questionText:
          "Hablemos sobre las preguntas en las que hemos trabajado hasta ahora.",
        range: [1, 5],
      },
    },
    {
      group: "1",
      title: "Tipos de Datos en Programación",
      description:
        "Identifica los diferentes tipos de datos utilizados en programación.",
      isMultipleChoice: true,
      question: {
        questionText:
          "¿Cuál de los siguientes NO es un tipo de dato primitivo en JavaScript?",
        options: ["String", "Number", "Boolean", "Object"],
        answer: "Object",
      },
    },
    {
      group: "1",
      title: "Pasos para Crear una Función",
      description: "Entiende la secuencia para crear una función.",
      isSelectOrder: true,
      question: {
        questionText:
          "Organiza los pasos con arrastrar y soltar para crear y usar una función.",
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
      title: "Escribiendo una Función Simple",
      description: "Practica escribir funciones en JavaScript.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText:
          "Escribe una función llamada `saludar` que tome un nombre como parámetro y muestre un saludo con el nombre.",
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
        questionText: "¿Cuál es el propósito principal de una sentencia `if`?",
        options: [
          "Repetir un bloque de código varias veces",
          "Ejecutar un bloque de código basado en una condición",
          "Definir una variable",
          "Importar librerías externas",
        ],
        answer: "Ejecutar un bloque de código basado en una condición",
      },
    },
    {
      group: "1",
      title: "Orden de Comprobación de Condiciones",
      description: "Aprende la secuencia de evaluación de condiciones.",
      isSelectOrder: true,
      question: {
        questionText:
          "Organiza los pasos con arrastrar y soltar para evaluar una sentencia `if-else`.",
        options: [
          "Evaluar la condición `if`",
          "Ejecutar el bloque `if` si la condición es verdadera",
          "Evaluar la condición `else if`",
          "Ejecutar el bloque `else if` si la condición es verdadera",
          "Evaluar la condición `else`",
          "Ejecutar el bloque `else` si la condición es falsa",
        ],
        answer: [
          "Evaluar la condición `if`",
          "Ejecutar el bloque `if` si la condición es verdadera",
          "Evaluar la condición `else if`",
          "Ejecutar el bloque `else if` si la condición es verdadera",
          "Evaluar la condición `else`",
          "Ejecutar el bloque `else` si la condición es falsa",
        ],
      },
    },
    {
      group: "1",
      title: "Implementando Lógica Condicional",
      description: "Aplica la lógica condicional en el código.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText:
          "Escribe una sentencia `if-else` que verifique si un número `num` es positivo, negativo o cero, y muestra un mensaje adecuado.",
      },
    },
    {
      group: "1",
      title: "Entendiendo la Lógica en Programación",
      description:
        "En este paso, aprenderás sobre la lógica en el contexto de la programación.",
      isText: true,
      question: {
        questionText:
          "Explica en tus propias palabras cómo se aplica la lógica en la programación para controlar el flujo de un programa.",
      },
    },
    {
      group: "1",
      title: "Uso Real de Condicionales",
      description:
        "Reflexiona sobre cómo se utilizan las sentencias condicionales.",
      isText: true,
      question: {
        questionText:
          "Proporciona un ejemplo de cómo se utilizan las sentencias condicionales en aplicaciones del mundo real.",
      },
    },
    {
      group: "1",
      title: "Práctica del Terminal: Comando de Ayuda",
      description:
        "Escribe el comando de ayuda para observar los comandos básicos.",
      isCode: true,
      isTerminal: true,
      question: {
        questionText:
          "En un entorno de terminal Bash, introduce el comando de ayuda para descubrir los comandos básicos.",
      },
    },
    {
      group: "1",
      title: "Bucles en Programación",
      description: "Entiende el propósito de los bucles.",
      isMultipleChoice: true,
      question: {
        questionText:
          "¿Qué bucle continuará ejecutándose mientras su condición siga siendo verdadera?",
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
      title: "Secuencia de Ejecución de un Bucle",
      description: "Comprende el orden en el que se ejecutan los bucles.",
      isSelectOrder: true,
      question: {
        questionText:
          "Organiza los pasos de la ejecución de un bucle `for` con arrastrar y soltar.",
        options: [
          "Inicialización",
          "Verificación de la condición",
          "Ejecución del bloque de código",
          "Incremento/Decremento",
        ],
        answer: [
          "Inicialización",
          "Verificación de la condición",
          "Ejecución del bloque de código",
          "Incremento/Decremento",
        ],
      },
    },
    {
      group: "1",
      title: "Creando un Bucle",
      description: "Practica escribir bucles.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText:
          "Escribe un bucle `for` que imprima los números del 1 al 5.",
      },
    },
    {
      group: "1",
      title: "Aplicaciones de Bucles",
      description: "Discute dónde son útiles los bucles.",
      isText: true,
      question: {
        questionText:
          "Describe un escenario en desarrollo de software donde los bucles sean esenciales.",
      },
    },
    {
      group: "1",
      title: "Arreglos en JavaScript",
      description: "Identifica las características de los tipos de arreglos.",
      isMultipleChoice: true,
      question: {
        questionText:
          "¿Cuál de los siguientes métodos añade un elemento al final de un arreglo en JavaScript?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        answer: "push()",
      },
    },
    {
      group: "1",
      title: "Orden de Operaciones en Arreglos",
      description: "Entiende cómo se realizan las operaciones en los arreglos.",
      isSelectOrder: true,
      question: {
        questionText:
          "Organiza los pasos con arrastrar y soltar para añadir y eliminar elementos de un arreglo.",
        options: [
          "Declarar un arreglo",
          "Usar push() para añadir un elemento",
          "Usar pop() para eliminar el último elemento",
          "Acceder a los elementos del arreglo",
        ],
        answer: [
          "Declarar un arreglo",
          "Usar push() para añadir un elemento",
          "Usar pop() para eliminar el último elemento",
          "Acceder a los elementos del arreglo",
        ],
      },
    },
    {
      group: "1",
      title: "Manipulando Arreglos",
      description: "Aplica métodos de arreglo en el código.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText:
          "Crea un arreglo `frutas` con 'manzana' y 'banana'. Añade 'naranja' al final y elimina 'manzana' del principio.",
      },
    },
    {
      group: "1",
      title: "Casos de Uso de Arreglos",
      description:
        "Explora escenarios donde se utilizan los tipos de arreglos.",
      isText: true,
      question: {
        questionText:
          "Proporciona un ejemplo de cómo se puede utilizar un arreglo para gestionar datos en una aplicación web.",
      },
    },
    {
      group: "1",
      title: "Práctica del Terminal: Crear Directorios",
      description: "Comando para crear directorios en un terminal Bash",
      isCode: true,
      isTerminal: true,
      question: {
        questionText:
          "En un entorno de terminal Bash, crea un directorio llamado app usando el comando make directory.",
      },
    },
    {
      group: "1",
      title: "Entendiendo el Objetivo de la Programación",
      description:
        "En este paso, aprenderás sobre el objetivo principal de la programación o codificación.",
      isMultipleChoice: true,
      question: {
        questionText:
          "¿Cuál de las siguientes opciones describe mejor el objetivo principal de la codificación o programación?",
        options: [
          "Resolver problemas creando soluciones eficientes y efectivas",
          "Aprender diferentes lenguajes de programación",
          "Escribir tanto código como sea posible",
          "Memorizar la sintaxis y funciones",
        ],
        answer: "Resolver problemas creando soluciones eficientes y efectivas",
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
        range: [6, 20],
      },
    },
    {
      group: "2",
      title: "Introducción a los Objetos",
      description: "En este paso, aprenderás qué es un objeto en programación.",
      isText: true,
      question: {
        questionText: "¿Qué es un objeto en programación?",
      },
    },
    {
      group: "2",
      title: "Creando una Clase Simple",
      description:
        "En este paso, escribirás una definición de clase simple en JavaScript.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText:
          "Escribe una definición de clase simple en JavaScript para un objeto `Coche` con propiedades para `marca` y `modelo`, y un método para mostrar los detalles del coche.",
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
      isSelectOrder: true,
      question: {
        questionText:
          "Organiza los pasos con arrastrar y soltar en el orden correcto para crear una instancia de una clase en JavaScript.",
        options: [
          "Definir la clase",
          "Definir el método constructor dentro de la clase",
          "Declarar la variable para almacenar la instancia",
          "Usar la palabra clave 'new'",
          "Llamar al nombre de la clase",
          "Pasar los argumentos requeridos",
          "Asignar la instancia a la variable",
          "Usar la instancia para acceder a propiedades o métodos",
        ],
        answer: [
          "Definir la clase",
          "Definir el método constructor dentro de la clase",
          "Declarar la variable para almacenar la instancia",
          "Usar la palabra clave 'new'",
          "Llamar al nombre de la clase",
          "Pasar los argumentos requeridos",
          "Asignar la instancia a la variable",
          "Usar la instancia para acceder a propiedades o métodos",
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
        "En este paso, entenderás la palabra clave `this` en el contexto de una clase.",
      isMultipleChoice: true,
      question: {
        questionText:
          "¿Qué representa la palabra clave `this` en un método de clase?",
        options: [
          "El objeto global",
          "El objeto que llama al método",
          "El propio método",
          "La definición de la clase",
        ],
        answer: "El objeto que llama al método",
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
      title: "Accediendo a las Propiedades de un Objeto",
      description:
        "En este paso, aprenderás cómo acceder a las propiedades de un objeto en JavaScript.",
      isSelectOrder: true,
      question: {
        questionText:
          "Organiza los pasos con arrastrar y soltar para acceder correctamente a una propiedad en un objeto.",
        options: [
          "Identificar el objeto",
          "Determinar la propiedad a la que se accederá",
          "Usar notación de punto o corchetes",
          "Especificar el nombre de la propiedad",
          "Almacenar el valor en una variable o usarlo directamente",
        ],
        answer: [
          "Identificar el objeto",
          "Determinar la propiedad a la que se accederá",
          "Usar notación de punto o corchetes",
          "Especificar el nombre de la propiedad",
          "Almacenar el valor en una variable o usarlo directamente",
        ],
      },
    },
    {
      group: "2",
      title: "Modificando las Propiedades de un Objeto",
      description:
        "En este paso, aprenderás cómo modificar las propiedades de un objeto en JavaScript.",
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
      title: "Sobreescribiendo Métodos",
      description:
        "En este paso, aprenderás cómo sobreescribir métodos en una subclase.",
      isMultipleChoice: true,
      question: {
        questionText: "¿Qué significa sobreescribir un método en una subclase?",
        options: [
          "Eliminar el método de la clase",
          "Reemplazar un método heredado de la superclase",
          "Heredar un método sin cambios",
          "Llamar a un método desde otra clase",
          "Ampliar la funcionalidad de un método en la subclase",
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
      title: "Creando y Usando un Arreglo de Objetos",
      description:
        "En este paso, crearás y usarás un arreglo de objetos en JavaScript.",
      isSelectOrder: true,
      question: {
        questionText:
          "Organiza los pasos con arrastrar y soltar para iterar correctamente sobre un arreglo de objetos.",
        options: [
          "Definir la estructura del objeto",
          "Crear objetos individuales",
          "Inicializar un arreglo vacío",
          "Añadir objetos al arreglo",
          "Verificar la estructura del arreglo",
          "Elegir un tipo de bucle (por ejemplo, for, while, forEach)",
          "Usar un bucle para iterar a través del arreglo",
          "Acceder a las propiedades de cada objeto dentro del bucle",
          "Realizar acciones con las propiedades accedidas",
          "Almacenar o mostrar los resultados",
        ],
        answer: [
          "Definir la estructura del objeto",
          "Crear objetos individuales",
          "Inicializar un arreglo vacío",
          "Añadir objetos al arreglo",
          "Verificar la estructura del arreglo",
          "Elegir un tipo de bucle (por ejemplo, for, while, forEach)",
          "Usar un bucle para iterar a través del arreglo",
          "Acceder a las propiedades de cada objeto dentro del bucle",
          "Realizar acciones con las propiedades accedidas",
          "Almacenar o mostrar los resultados",
        ],
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
      title: "Imprimiendo en el Terminal",
      description: "En este paso, imprimirás un mensaje usando el terminal.",
      isCode: true,
      isTerminal: true,
      question: {
        questionText:
          "Escribe un comando para imprimir el mensaje: '¡Estoy hablando con el interior de una computadora!'",
      },
    },
    {
      groupReference: "2",
      title: "Revisión con Conversación AI",
      isConversationReview: true,
      description: "Revisa los temas que has respondido.",
      question: {
        questionText:
          "Hablemos sobre las preguntas en las que hemos trabajado hasta ahora.",
        range: [6, 22],
      },
    },
    {
      group: "3",
      title: "Introducción a los Componentes de React",
      description:
        "En este paso, aprenderás sobre los componentes de React y su importancia en la creación de interfaces de usuario.",
      isMultipleChoice: true,
      question: {
        questionText:
          "¿Cuál de las siguientes opciones describe mejor un componente de React?",
        options: [
          "Una función que devuelve HTML",
          "Una herramienta para renderizado del lado del servidor",
          "Un método para manejar eventos",
        ],
        answer: "Una función que devuelve HTML",
      },
    },
    {
      group: "3",
      title: "Entendiendo los React Hooks",
      description:
        "En este paso, aprenderás sobre los React hooks y cómo se utilizan para gestionar el estado y los efectos secundarios en componentes funcionales.",
      isSelectOrder: true,
      question: {
        questionText:
          "Organiza los pasos con arrastrar y soltar para usar correctamente el hook useState.",
        options: [
          "Importar useState desde React",
          "Declarar la variable de estado",
          "Proporcionar un valor inicial para el estado",
          "Actualizar el estado usando la función setter",
          "Usar la variable de estado en el componente",
        ],
        answer: [
          "Importar useState desde React",
          "Declarar la variable de estado",
          "Proporcionar un valor inicial para el estado",
          "Usar la variable de estado en el componente",
          "Actualizar el estado usando la función setter",
        ],
      },
    },
    {
      group: "3",
      title: "Creando un Componente Simple de React",
      description:
        "En este paso, crearás un componente simple de React que muestre un Tweet.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText:
          "Escribe un componente simple de React que muestre un Tweet con el nombre del usuario, su handle y el texto.",
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
          "Modifica el componente Tweet para incluir un botón de me gusta que cambie el estado de like usando el hook useState.",
      },
    },
    {
      group: "3",
      title: "Manejo de Eventos en React",
      description:
        "En este paso, aprenderás cómo manejar eventos en React, como clics.",
      isMultipleChoice: true,
      question: {
        questionText:
          "¿Cuál es la mejor manera de manejar un evento de clic de botón en React?",
        options: [
          "Adjuntar un listener de evento directamente al botón en HTML",
          "Usar el atributo onClick en el JSX del componente",
          "Escribir un controlador de eventos personalizado en JavaScript plano",
          "Vincular el controlador de eventos al elemento DOM usando querySelector",
        ],
        answer: "Usar el atributo onClick en el JSX del componente",
      },
    },
    {
      group: "3",
      title: "Propiedades de los Componentes",
      description:
        "En este paso, aprenderás sobre cómo pasar propiedades a los componentes en React.",
      isText: true,
      question: {
        questionText:
          "¿Qué son las propiedades en un componente de React y cómo se utilizan?",
      },
    },
    {
      group: "3",
      title: "Actualización del Estado del Componente",
      description:
        "En este paso, aprenderás cómo actualizar el estado de un componente basado en las interacciones del usuario.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText:
          "Actualiza el componente Tweet para incrementar el recuento de me gusta cada vez que se haga clic en el botón de me gusta.",
      },
    },
    {
      group: "3",
      title: "Creando un Nuevo Proyecto de React",
      description:
        "En este paso, crearás un nuevo proyecto de React usando Vite.",
      isSelectOrder: true,
      question: {
        questionText:
          "Organiza los pasos con arrastrar y soltar para crear correctamente un nuevo proyecto de React usando Vite.",
        options: [
          "Asegúrate de tener Node.js instalado",
          "Ejecuta el comando para crear un nuevo proyecto con Vite",
          "Elige la plantilla de React",
          "Navega al directorio del proyecto",
          "Instala las dependencias",
          "Inicia el servidor de desarrollo",
        ],
        answer: [
          "Asegúrate de tener Node.js instalado",
          "Ejecuta el comando para crear un nuevo proyecto con Vite",
          "Elige la plantilla de React",
          "Navega al directorio del proyecto",
          "Instala las dependencias",
          "Inicia el servidor de desarrollo",
        ],
      },
    },
    {
      group: "3",
      title: "Práctica del Terminal: Listar Archivos",
      description:
        "En este paso, aprenderás cómo listar archivos en un terminal Bash.",
      isCode: true,
      isTerminal: true,
      question: {
        questionText:
          "Usa el terminal para listar todos los archivos usando el comando list.",
      },
    },
    {
      group: "3",
      title: "Entendiendo JSX",
      description:
        "En este paso, aprenderás sobre JSX y cómo se utiliza para describir la interfaz de usuario en los componentes de React.",
      isText: true,
      question: {
        questionText: "¿Qué es JSX y por qué se usa en React?",
      },
    },
    {
      group: "3",
      title: "Estilizando Componentes de React",
      description:
        "En este paso, aprenderás cómo estilizar componentes de React usando CSS.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText:
          "Añade estilos al componente Tweet para mejorar su apariencia.",
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
          "Organiza las siguientes propiedades CSS en el orden necesario para crear un diseño básico con Flexbox:",
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
      title: "Añadiendo Más Estado con useState",
      description:
        "En este paso, aprenderás cómo gestionar múltiples piezas de estado en un componente usando el hook useState.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText:
          "Añade un botón de retweet al componente Tweet que rastree el número de retweets.",
      },
    },
    {
      group: "3",
      title: "Trabajando con Props y Estado Juntos",
      description:
        "En este paso, aprenderás cómo trabajar tanto con props como con el estado en un componente de React.",
      isMultipleChoice: true,
      question: {
        questionText:
          "¿Cuál es la principal diferencia entre props y estado en React?",
        options: [
          "Las props son inmutables mientras que el estado es mutable",
          "Las props son gestionadas por el propio componente mientras que el estado se pasa desde componentes padre",
          "El estado se usa para el estilo mientras que las props se usan para la lógica",
          "No hay diferencia; son lo mismo",
        ],
        answer: "Las props son inmutables mientras que el estado es mutable",
      },
    },
    {
      group: "3",
      title: "Elevando el Estado",
      description:
        "En este paso, aprenderás cómo elevar el estado a un componente ancestro común para compartir el estado entre componentes.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText:
          "Crea un componente padre que gestione el estado para múltiples componentes Tweet y pase el estado y los controladores de eventos como props.",
      },
    },
    {
      group: "3",
      title: "Entendiendo el Ciclo de Vida de los Componentes",
      description:
        "En este paso, aprenderás sobre el ciclo de vida de los componentes de React y cómo usar el hook useEffect para gestionar efectos secundarios.",
      isText: true,
      question: {
        questionText:
          "¿Qué es el ciclo de vida de los componentes en React y cuál es el propósito del hook useEffect?",
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
          "Organiza los pasos con arrastrar y soltar para obtener correctamente datos usando useEffect.",
        options: [
          "Importar React y useState",
          "Importar useEffect desde React",
          "Crear un componente",
          "Definir el hook useEffect",
          "Hacer la llamada a la API dentro de useEffect",
          "Usar async/await o .then() para manejar la respuesta de la API",
          "Actualizar el estado del componente con los datos obtenidos",
          "Manejar errores en la llamada a la API",
          "Mostrar los datos en el componente",
        ],
        answer: [
          "Importar React y useState",
          "Importar useEffect desde React",
          "Crear un componente",
          "Definir el hook useEffect",
          "Hacer la llamada a la API dentro de useEffect",
          "Usar async/await o .then() para manejar la respuesta de la API",
          "Actualizar el estado del componente con los datos obtenidos",
          "Manejar errores en la llamada a la API",
          "Mostrar los datos en el componente",
        ],
      },
    },
    {
      group: "3",
      title: "Construyendo una Aplicación Completa de Tweet",
      description:
        "En este paso, combinarás todo lo que has aprendido para construir una aplicación completa de Tweet.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText:
          "Construye una aplicación completa de Tweet que obtenga tweets de una API, los muestre usando el componente Tweet y permita a los usuarios dar me gusta y retweet.",
      },
    },
    {
      group: "3",
      title: "Práctica del Terminal: Configurando una Aplicación React",
      description:
        "En este paso, aprenderás cómo configurar un proyecto de React.",
      isText: true,
      question: {
        questionText:
          "Introduce el comando para instalar la versión más reciente de un proyecto React con Vite.",
      },
    },
    {
      groupReference: "3",
      title: "Revisión con Conversación AI",
      isConversationReview: true,
      description: "Revisa los temas que has respondido.",
      question: {
        questionText:
          "Hablemos sobre las preguntas en las que hemos trabajado hasta ahora.",
        range: [24, 42],
      },
    },
    {
      group: "4",
      title: "Introducción a la Ingeniería de Backend",
      description:
        "En este paso, aprenderás qué es la ingeniería de software de backend y por qué es importante.",
      isText: true,
      question: {
        questionText:
          "¿Qué es la ingeniería de software de backend y por qué es importante en la creación de aplicaciones?",
      },
    },
    {
      group: "4",
      title: "Descripción General de las Lecciones Principales",
      description:
        "En este paso, identificarás las lecciones principales cubiertas en el curso de ingeniería de backend.",
      isMultipleChoice: true,
      question: {
        questionText:
          "¿Cuál de los siguientes es un aspecto clave de la ingeniería de backend?",
        options: [
          "Diseño de interfaces de usuario",
          "Gestión de bases de datos",
          "Creación de elementos gráficos",
          "Escritura de HTML y CSS frontend",
        ],
        answer: "Gestión de bases de datos",
      },
    },
    {
      group: "4",
      title: "Relacionando el Backend con el Mundo Real",
      description:
        "En este paso, relacionarás las operaciones de una cocina en un restaurante con la ingeniería de backend.",
      isSelectOrder: true,
      question: {
        questionText:
          "Organiza las siguientes tareas en una cocina de restaurante para corresponder con las operaciones de backend:",
        options: [
          "Preparación de ingredientes",
          "Cocinar la comida",
          "Servir el plato",
          "Limpiar",
        ],
        answer: [
          "Preparación de ingredientes",
          "Cocinar la comida",
          "Servir el plato",
          "Limpiar",
        ],
      },
    },
    {
      group: "4",
      title: "Entendiendo los Sistemas Operativos",
      description:
        "En este paso, aprenderás por qué es importante entender los sistemas operativos en la ingeniería de backend.",
      isText: true,
      question: {
        questionText:
          "¿Por qué es importante entender el sistema operativo cuando se estudia ingeniería de backend?",
      },
    },
    {
      group: "4",
      title: "Instalando NPM",
      description: "En este paso, aprenderás cómo instalar npm globalmente.",
      isText: true,
      question: {
        questionText:
          "Usa el terminal para instalar el gestor de paquetes de node (npm) globalmente en tu computadora.",
      },
    },
    {
      group: "4",
      title: "Instalando un Paquete NPM",
      description:
        "En este paso, usarás el terminal para instalar un paquete con npm.",
      isText: true,
      question: {
        questionText:
          "Escribe un comando para instalar la librería de componentes react de Chakra para elementos de la interfaz de usuario.",
      },
    },
    {
      group: "4",
      title: "Creando Usuarios: Concepto",
      description:
        "En este paso, comprenderás el concepto de crear usuarios en sistemas de backend.",
      isMultipleChoice: true,
      question: {
        questionText:
          "¿Cuál de los siguientes es un aspecto clave de la creación de usuarios en sistemas de backend?",
        options: [
          "Generar IDs de usuario únicos",
          "Diseñar avatares de usuario",
          "Seleccionar temas de color",
          "Crear perfiles de redes sociales",
        ],
        answer: "Generar IDs de usuario únicos",
      },
    },
    {
      group: "4",
      title: "Fundamentos de las Bases de Datos",
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
      title: "Iniciando un Proyecto Firebase",
      description:
        "En este paso, comprenderás cómo iniciar un proyecto Firebase con la línea de comandos.",
      isText: true,
      question: {
        questionText: "Escribe el comando para iniciar un proyecto Firebase.",
      },
    },
    {
      group: "4",
      title: "Almacenando Datos de Forma Responsable",
      description:
        "En este paso, aprenderás sobre las prácticas responsables de almacenamiento de datos.",
      isText: true,
      question: {
        questionText:
          "¿Cuáles son algunas de las mejores prácticas para almacenar datos de manera responsable en un sistema backend?",
      },
    },
    {
      group: "4",
      title: "Trabajando con Colecciones y Documentos",
      description:
        "En este paso, aprenderás sobre el proceso de configurar colecciones y documentos en bases de datos no relacionales como Firebase o MongoDB.",
      isSelectOrder: true,
      question: {
        questionText:
          "Organiza los pasos en el orden correcto para configurar una colección y agregar un documento en una base de datos no relacional.",
        options: [
          "Crear una nueva colección",
          "Definir la estructura del documento",
          "Asignar un ID único al documento",
          "Añadir un nuevo documento a la colección",
          "Guardar el documento",
          "Consultar la colección para buscar documentos",
        ],
        answer: [
          "Crear una nueva colección",
          "Definir la estructura del documento",
          "Asignar un ID único al documento",
          "Añadir un nuevo documento a la colección",
          "Guardar el documento",
          "Consultar la colección para buscar documentos",
        ],
      },
    },
    {
      group: "4",
      title: "Manejo de Datos de Usuario",
      description:
        "En este paso, aprenderás cómo manejar los datos de los usuarios en sistemas de backend.",
      isCode: true,
      question: {
        questionText:
          "Escribe un fragmento de código para obtener un objeto de usuario con propiedades para nombre de usuario y correo electrónico usando Firebase Auth.",
      },
    },
    {
      group: "4",
      title: "Creando un Nuevo Usuario",
      description:
        "En este paso, crearás un nuevo usuario en un sistema de backend.",
      isText: true,
      question: {
        questionText:
          "Usa el terminal para agregar un nuevo usuario a la colección `Users` en tu base de datos Firestore.",
      },
    },
    {
      group: "4",
      title: "Entendiendo la Autenticación",
      description:
        "En este paso, aprenderás sobre los procesos de autenticación en sistemas de backend.",
      isText: true,
      question: {
        questionText:
          "¿Qué es la autenticación y por qué es importante en los sistemas de backend?",
      },
    },
    {
      group: "4",
      title: "Servidores de Autorización",
      description:
        "En este paso, aprenderás sobre el papel de los servidores de autorización.",
      isSelectOrder: true,
      question: {
        questionText:
          "Organiza los pasos con arrastrar y soltar para autorizar correctamente a un usuario.",
        options: [
          "El usuario envía credenciales",
          "El servidor verifica las credenciales",
          "Se genera un token de autorización",
          "El usuario recibe acceso a los recursos",
        ],
        answer: [
          "El usuario envía credenciales",
          "El servidor verifica las credenciales",
          "Se genera un token de autorización",
          "El usuario recibe acceso a los recursos",
        ],
      },
    },
    {
      group: "4",
      title: "Usando Variables de Entorno",
      description:
        "En este paso, aprenderás sobre el uso de variables de entorno en el desarrollo de backend.",
      isText: true,
      question: {
        questionText:
          "¿Qué papel juegan las variables de entorno en un código base?",
      },
    },
    {
      group: "4",
      title: "Relaciones en Bases de Datos",
      description:
        "En este paso, aprenderás sobre las relaciones en bases de datos.",
      isCode: true,
      question: {
        questionText:
          "Escribe un fragmento de código para definir una relación de uno a muchos entre usuarios y publicaciones en una base de datos.",
      },
    },
    {
      group: "4",
      title: "Creación de Endpoints de API",
      description:
        "En este paso, aprenderás cómo crear endpoints de API para una aplicación backend.",
      isMultipleChoice: true,
      question: {
        questionText:
          "¿Qué método HTTP se utiliza comúnmente para crear un nuevo recurso a través de una API?",
        options: ["GET", "POST", "PUT", "DELETE"],
        answer: "POST",
      },
    },
    {
      group: "4",
      title: "Creando un Sistema de Autenticación de Usuarios",
      description:
        "En este paso, crearás un sistema simple de autenticación de usuarios.",
      isSelectOrder: true,
      question: {
        questionText:
          "Organiza los pasos con arrastrar y soltar para implementar autenticación de usuarios usando JWT.",
        options: [
          "Instalar la biblioteca JWT",
          "Configurar un modelo de usuario en la base de datos",
          "Crear una ruta de registro para nuevos usuarios",
          "Hashear la contraseña del usuario antes de almacenarla",
          "Crear una ruta de inicio de sesión",
          "Verificar las credenciales del usuario",
          "Generar un token JWT",
          "Enviar el token JWT de vuelta al cliente",
          "Crear una ruta protegida que requiera autenticación",
          "Verificar el token JWT en las rutas protegidas",
        ],
        answer: [
          "Instalar la biblioteca JWT",
          "Configurar un modelo de usuario en la base de datos",
          "Crear una ruta de registro para nuevos usuarios",
          "Hashear la contraseña del usuario antes de almacenarla",
          "Crear una ruta de inicio de sesión",
          "Verificar las credenciales del usuario",
          "Generar un token JWT",
          "Enviar el token JWT de vuelta al cliente",
          "Crear una ruta protegida que requiera autenticación",
          "Verificar el token JWT en las rutas protegidas",
        ],
      },
    },
    {
      group: "4",
      title: "Desplegando una Aplicación Firebase",
      description:
        "En este paso, aprenderás cómo desplegar una aplicación Firebase backend en un servicio en la nube.",
      isText: true,
      question: {
        questionText:
          "Escribe el comando para desplegar una aplicación Firebase en la línea de comandos.",
      },
    },
    {
      groupReference: "4",
      title: "Revisión con Conversación AI",
      isConversationReview: true,
      description: "Revisa los temas que has respondido.",
      question: {
        questionText:
          "Hablemos sobre las preguntas en las que hemos trabajado hasta ahora.",
        range: [44, 66],
      },
    },
    {
      group: "5",
      title: "Introducción al Desarrollo Completo de Aplicaciones",
      description:
        "Aprende cómo reunir todo lo que has aprendido para construir una aplicación completa.",
      isText: true,
      question: {
        questionText:
          "¿Qué herramientas y recursos puedes usar si te encuentras con algo que deseas aprender más mientras construyes una aplicación?",
      },
    },
    {
      group: "5",
      title: "Instalando VSCode",
      description:
        "Instala Visual Studio Code (VSCode), el editor de código para escribir tu código.",
      isText: true,
      question: {
        questionText:
          "Escribe el comando de terminal para instalar VSCode en tu sistema operativo.",
      },
    },
    {
      group: "5",
      title: "Instalando Node.js",
      description:
        "Instala Node.js, que te permite construir aplicaciones JavaScript.",
      isText: true,
      question: {
        questionText:
          "¿Cuál es el propósito de Node.js en el desarrollo de JavaScript?",
      },
    },
    {
      group: "5",
      title: "Instalando los Paquetes de 'package.json'.",
      description: "Instalando los archivos encontrados en package.json.",
      isText: true,
      question: {
        questionText:
          "Introduce el comando para instalar los paquetes encontrados en un proyecto react usando npm.",
      },
    },
    {
      group: "5",
      title: "Creando una Carpeta de Proyecto",
      description: "Crea una nueva carpeta para tu proyecto.",
      isSelectOrder: true,
      question: {
        questionText:
          "Organiza los siguientes comandos para crear y navegar a una nueva carpeta de proyecto:",
        options: [
          "mkdir miProyecto",
          "cd miProyecto",
          "Crea la carpeta",
          "Navega a la carpeta",
        ],
        answer: [
          "mkdir miProyecto",
          "Crea la carpeta",
          "cd miProyecto",
          "Navega a la carpeta",
        ],
      },
    },
    {
      group: "5",
      title: "Instalar Herramientas de Firebase Globalmente",
      description:
        "Instala las herramientas de Firebase globalmente usando la línea de comandos.",
      isText: true,
      question: {
        questionText:
          "Usa el terminal para instalar firebase-tools globalmente. ¿Qué comando utilizas?",
      },
    },
    {
      group: "5",
      title: "Ejecutando la Aplicación React",
      description: "Ejecuta tu aplicación React en modo de desarrollo.",
      isSelectOrder: true,
      question: {
        questionText:
          "Organiza los pasos con arrastrar y soltar para ejecutar correctamente tu aplicación React.",
        options: [
          "Abrir el terminal",
          "Navegar a la carpeta del proyecto",
          "Ejecutar el script de inicio",
          "Ver la aplicación en el navegador",
        ],
        answer: [
          "Abrir el terminal",
          "Navegar a la carpeta del proyecto",
          "Ejecutar el script de inicio",
          "Ver la aplicación en el navegador",
        ],
      },
    },
    {
      group: "5",
      title: "Configurando Firebase",
      description: "Configura Firebase para tu proyecto.",
      isText: true,
      question: {
        questionText:
          "¿Cuáles son los pasos para configurar Firebase para tu proyecto?",
      },
    },
    {
      group: "5",
      title: "Introducción a GitHub",
      description:
        "Aprende sobre el uso de GitHub para colaborar con otros desarrolladores.",
      isMultipleChoice: true,
      question: {
        questionText: "¿Para qué se utiliza principalmente GitHub?",
        options: [
          "Alojamiento de sitios web",
          "Gestión de repositorios de código",
          "Creación de bases de datos",
          "Diseño de interfaces de usuario",
        ],
        answer: "Gestión de repositorios de código",
      },
    },
    {
      group: "5",
      title: "Clonando Proyectos de Github",
      description: "Clonando proyectos de Github en la línea de comandos.",
      isText: true,
      question: {
        questionText:
          "Usa el terminal para clonar un proyecto de RobotsBuildingEducation llamado programAI usando comandos git.",
      },
    },
    {
      group: "5",
      title: "Inicializando Firebase",
      description: "Inicializa Firebase en tu proyecto y autentica tu cuenta.",
      isSelectOrder: true,
      question: {
        questionText:
          "Organiza los pasos con arrastrar y soltar para inicializar correctamente Firebase en tu proyecto.",
        options: [
          "Instalar la CLI de Firebase",
          "Iniciar sesión en Firebase",
          "Inicializar Firebase en el proyecto",
          "Elegir la configuración del proyecto",
          "Instalar el SDK de Firebase",
          "Añadir la configuración de Firebase a tu código",
          "Habilitar servicios de Firebase (por ejemplo, Firestore, Autenticación)",
          "Configurar las reglas de seguridad para tus servicios",
          "Desplegar tu aplicación usando Firebase Hosting (opcional)",
          "Probar la integración de Firebase",
        ],
        answer: [
          "Instalar la CLI de Firebase",
          "Iniciar sesión en Firebase",
          "Inicializar Firebase en el proyecto",
          "Elegir la configuración del proyecto",
          "Instalar el SDK de Firebase",
          "Añadir la configuración de Firebase a tu código",
          "Habilitar servicios de Firebase (por ejemplo, Firestore, Autenticación)",
          "Configurar las reglas de seguridad para tus servicios",
          "Desplegar tu aplicación usando Firebase Hosting (opcional)",
          "Probar la integración de Firebase",
        ],
      },
    },
    {
      group: "5",
      title: "Entendiendo las Funcionalidades Principales de Firebase",
      description:
        "Identifica la funcionalidad principal de los servicios de Firebase como Firestore, Autenticación, Almacenamiento, Hosting y Funciones en la Nube.",
      isSelectOrder: true,
      question: {
        questionText:
          "Organiza los servicios de Firebase con sus funciones principales.",
        options: [
          "Firestore: Base de datos NoSQL en la nube para almacenar y sincronizar datos",
          "Autenticación: Inicio de sesión de usuarios y gestión de identidad",
          "Almacenamiento: Almacenamiento de archivos para contenido generado por usuarios",
          "Hosting: Alojamiento web para desplegar contenido estático",
          "Funciones en la Nube: Backend sin servidor para ejecutar código en respuesta a eventos",
        ],
        answer: [
          "Firestore: Base de datos NoSQL en la nube para almacenar y sincronizar datos",
          "Autenticación: Inicio de sesión de usuarios y gestión de identidad",
          "Almacenamiento: Almacenamiento de archivos para contenido generado por usuarios",
          "Hosting: Alojamiento web para desplegar contenido estático",
          "Funciones en la Nube: Backend sin servidor para ejecutar código en respuesta a eventos",
        ],
      },
    },
    {
      group: "5",
      title: "Extrayendo Actualizaciones con Github",
      description: "Actualiza tu versión del código extrayendo con Github.",
      isText: true,
      question: {
        questionText:
          "Usa el terminal para actualizar tu proyecto local de Github con la versión más reciente disponible en Github.",
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
          "¿Qué paquete utilizas para gestionar la autenticación de usuarios en Firebase?",
        options: [
          "firebase",
          "react-firebaseui",
          "firebase-auth",
          "firebase-hooks",
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
      title: "Habilitando el Inicio de Sesión con Google",
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
      title: "Conectando Firebase a tu Código",
      description:
        "Recupera las claves de configuración de Firebase y conéctalas a tu código.",
      isCode: true,
      question: {
        questionText:
          "Escribe el código para inicializar Firebase en tu proyecto usando las claves de configuración.",
      },
    },
    {
      group: "5",
      title: "Renderizando un Botón de Inicio de Sesión",
      description:
        "Renderiza un botón de inicio de sesión en tu aplicación React usando Firebase y react-firebaseui.",
      isSelectOrder: true,
      question: {
        questionText:
          "Organiza los pasos con arrastrar y soltar para renderizar correctamente un botón de inicio de sesión usando Firebase y react-firebaseui.",
        options: [
          "Instalar los paquetes de Firebase y react-firebaseui",
          "Importar los módulos necesarios de Firebase",
          "Inicializar Firebase con tu configuración",
          "Configurar la Autenticación de Firebase en la Consola de Firebase",
          "Crear y configurar las opciones de inicio de sesión",
          "Renderizar el componente de UI de Firebase en tu componente de React",
          "Probar el flujo de inicio de sesión en tu aplicación",
        ],
        answer: [
          "Instalar los paquetes de Firebase y react-firebaseui",
          "Importar los módulos necesarios de Firebase",
          "Inicializar Firebase con tu configuración",
          "Configurar la Autenticación de Firebase en la Consola de Firebase",
          "Crear y configurar las opciones de inicio de sesión",
          "Renderizar el componente de UI de Firebase en tu componente de React",
          "Probar el flujo de inicio de sesión en tu aplicación",
        ],
      },
    },
    {
      group: "5",
      title: "Mostrando los Datos del Usuario",
      description:
        "Usa useEffect para mostrar los datos del usuario cuando inicie sesión.",
      isCode: true,
      question: {
        questionText:
          "Escribe el código para mostrar los datos del usuario usando el hook useEffect cuando inicie sesión con Firebase.",
      },
    },
    {
      group: "5",
      title: "Actualizando el Perfil del Usuario",
      description:
        "Actualiza la información del perfil del usuario en tu base de datos Firebase.",
      isCode: true,
      question: {
        questionText:
          "Escribe el código para actualizar la información del perfil del usuario en Firebase Firestore.",
      },
    },
    {
      group: "5",
      title: "Actualizando un Proyecto de Github",
      description:
        "Encadenando comandos git para actualizar un proyecto de Github.",
      isText: true,
      question: {
        questionText:
          "Introduce la combinación de comandos de github para escribir y actualizar un código con un mensaje.",
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
          "Organiza los siguientes comandos de Git en el orden correcto para crear un nuevo repositorio:",
        options: [
          "git init",
          "git add .",
          "git commit -m 'Initial commit'",
          "git push origin main",
        ],
        answer: [
          "git init",
          "git add .",
          "git commit -m 'Initial commit'",
          "git push origin main",
        ],
      },
    },
    {
      groupReference: "5",
      title: "Revisión con Conversación AI",
      isConversationReview: true,
      description: "Revisa los temas que has respondido.",
      question: {
        questionText:
          "Hablemos sobre las preguntas en las que hemos trabajado hasta ahora.",
        range: [68, 92],
      },
    },
    {
      group: "6",
      title: "Introducción a las Estructuras de Datos y Algoritmos",
      description:
        "Entiende la importancia y los desafíos de aprender estructuras de datos y algoritmos.",
      isText: true,
      question: {
        questionText:
          "¿Por qué las estructuras de datos y algoritmos a menudo alejan a las personas de la informática?",
      },
    },
    {
      group: "6",
      title: "Lenguajes de Programación y Tecnología de Autocorrección",
      description:
        "Explora cómo funcionan los lenguajes de programación y cómo los ordenadores entienden el código.",
      isCode: true,
      question: {
        questionText:
          "Escribe un programa simple en cualquier lenguaje para demostrar cómo la tecnología de autocorrección podría identificar y corregir una palabra mal escrita.",
      },
    },
    {
      group: "6",
      title: "Tokens en el Código",
      description:
        "Descompón el código en tokens para entender cómo los ordenadores interpretan la información.",
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
        "Entiende cómo las cadenas se descomponen en caracteres y luego en código de máquina.",
      isCode: true,
      question: {
        questionText:
          "Escribe el código para descomponer la cadena 'Drake' en un arreglo de caracteres.",
      },
    },
    {
      group: "6",
      title: "Entendiendo las Estructuras de Datos",
      description: "Convierte una cadena en un arreglo de objetos clave-valor.",
      isSelectOrder: true,
      question: {
        questionText:
          "Convierte la cadena 'Drake' en un arreglo donde cada carácter sea una clave y su índice sea el valor. Representa cada carácter como un objeto con el carácter como clave y el índice como valor.",
        options: [
          "{ 'D': 0 }",
          "{ 'r': 1 }",
          "{ 'a': 2 }",
          "{ 'k': 3 }",
          "{ 'e': 4 }",
        ],
        answer: [
          "{ 'D': 0 }",
          "{ 'r': 1 }",
          "{ 'a': 2 }",
          "{ 'k': 3 }",
          "{ 'e': 4 }",
        ],
      },
    },
    {
      group: "6",
      title: "Conversión Binaria",
      description: "Convierte caracteres en su representación binaria.",
      isCode: true,
      question: {
        questionText:
          "Escribe la representación binaria para cada carácter en la cadena 'Drake'.",
      },
    },
    {
      group: "6",
      title: "Entendiendo las Estructuras de Datos",
      description:
        "Aprende cómo las estructuras de datos almacenan y hacen referencia a la información.",
      isText: true,
      question: {
        questionText:
          "¿Por qué es importante entender cómo los ordenadores reservan espacio y crean direcciones para referenciar información?",
      },
    },
    {
      group: "6",
      title: "Introducción a las Listas Enlazadas",
      description:
        "Aprende sobre los conceptos básicos de las listas enlazadas.",
      isMultipleChoice: true,
      question: {
        questionText:
          "¿Cuál de las siguientes es una característica de las listas enlazadas?",
        options: [
          "Arreglos de tamaño fijo",
          "Asignación dinámica de memoria",
          "Acceso constante a los elementos",
          "Los datos se almacenan en memoria contigua",
        ],
        answer: "Asignación dinámica de memoria",
      },
    },
    {
      group: "6",
      title: "Construyendo una Lista Enlazada",
      description: "Construye una lista enlazada simple en JavaScript.",
      isCode: true,
      question: {
        questionText:
          "Escribe el código JavaScript para crear una lista enlazada con los siguientes valores: 'meta', 'instagram', 'reels'.",
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
          "Organiza los pasos con arrastrar y soltar para implementar correctamente un algoritmo de búsqueda en profundidad usando recursión.",
        options: [
          "Comenzar en el nodo raíz",
          "Marcar el nodo actual como visitado",
          "Procesar el nodo (por ejemplo, imprimir o almacenar su valor)",
          "Llamar recursivamente a la función DFS en cada vecino no visitado",
          "Retroceder una vez que todos los vecinos hayan sido visitados",
          "Repetir hasta que todos los nodos hayan sido visitados",
        ],
        answer: [
          "Comenzar en el nodo raíz",
          "Marcar el nodo actual como visitado",
          "Procesar el nodo (por ejemplo, imprimir o almacenar su valor)",
          "Llamar recursivamente a la función DFS en cada vecino no visitado",
          "Retroceder una vez que todos los vecinos hayan sido visitados",
          "Repetir hasta que todos los nodos hayan sido visitados",
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
          "Escribe el código JavaScript para crear la siguiente estructura de árbol con las organizaciones de Alphabet y Meta.",
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
          "Escribe un método en la clase ListaEnlazada que recorra la lista y devuelva el último elemento.",
      },
    },
    {
      group: "6",
      title: "Revirtiendo una Lista Enlazada",
      description: "Revierte la dirección de una lista enlazada.",
      isMultipleChoice: true,
      question: {
        questionText:
          "¿Cuál es la complejidad de tiempo de revertir una lista enlazada?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
        answer: "O(n)",
      },
    },
    {
      group: "6",
      title: "Entendiendo la Búsqueda en Profundidad y la Búsqueda en Amplitud",
      description:
        "Aprende las diferencias entre los algoritmos de búsqueda en profundidad y búsqueda en amplitud.",
      isText: true,
      question: {
        questionText:
          "Explica la diferencia entre los algoritmos de búsqueda en profundidad y búsqueda en amplitud.",
      },
    },
    {
      group: "6",
      title: "Aplicación de la Búsqueda en Profundidad",
      description: "Aplica la búsqueda en profundidad a un ejemplo práctico.",
      isSelectOrder: true,
      question: {
        questionText:
          "Organiza los pasos con arrastrar y soltar para implementar la búsqueda en profundidad en un árbol binario.",
        options: [
          "Comenzar en el nodo raíz",
          "Comprobar si el nodo actual es nulo",
          "Llamar recursivamente a DFS en el hijo izquierdo",
          "Procesar el nodo actual (por ejemplo, imprimir el valor)",
          "Llamar recursivamente a DFS en el hijo derecho",
          "Retroceder al nodo padre si es necesario",
          "Procesar todos los nodos hasta que todos los hijos hayan sido visitados",
          "Continuar hasta que todo el árbol haya sido recorrido",
        ],
        answer: [
          "Comenzar en el nodo raíz",
          "Comprobar si el nodo actual es nulo",
          "Llamar recursivamente a DFS en el hijo izquierdo",
          "Procesar el nodo actual (por ejemplo, imprimir el valor)",
          "Llamar recursivamente a DFS en el hijo derecho",
          "Retroceder al nodo padre si es necesario",
          "Procesar todos los nodos hasta que todos los hijos hayan sido visitados",
          "Continuar hasta que todo el árbol haya sido recorrido",
        ],
      },
    },
    {
      group: "6",
      title: "Optimización de Algoritmos",
      description:
        "Explora maneras de optimizar algoritmos para mejorar su rendimiento.",
      isCode: true,
      question: {
        questionText:
          "Escribe una versión optimizada del algoritmo de ordenamiento burbuja en JavaScript.",
      },
    },
    {
      group: "6",
      title: "Implementación de la Clase Lista Enlazada",
      description:
        "Implementa las clases ListaEnlazada y ElementoLista en JavaScript.",
      isMultipleChoice: true,
      question: {
        questionText:
          "¿Qué método utilizarías para añadir un nuevo elemento al final de una lista enlazada?",
        options: ["addAtIndex()", "append()", "insert()", "push()"],
        answer: "append()",
      },
    },
    {
      group: "6",
      title: "Aplicación Práctica de la Lista Enlazada",
      description:
        "Aplica la clase ListaEnlazada a un escenario del mundo real.",
      isCode: true,
      question: {
        questionText:
          "Escribe el código para crear una lista enlazada de departamentos de la empresa y recórrela.",
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
      title: "Implementando Backtracking",
      description:
        "Implementa un algoritmo de backtracking para resolver un problema.",
      isSelectOrder: true,
      question: {
        questionText:
          "Organiza los pasos con arrastrar y soltar para implementar backtracking para el problema de las N-Reinas.",
        options: [
          "Comenzar con un tablero vacío",
          "Colocar una reina en la fila actual",
          "Comprobar si es seguro colocar la reina",
          "Si es seguro, pasar a la siguiente fila",
          "Si no es seguro, intentar la siguiente columna en la fila actual",
          "Si todas las columnas son inseguras, retroceder a la fila anterior",
          "Si el tablero está completamente lleno con colocaciones seguras, devolver la solución",
          "Si la fila anterior no tiene columnas seguras, retroceder más",
          "Continuar este proceso hasta encontrar todas las posibles soluciones",
        ],
        answer: [
          "Comenzar con un tablero vacío",
          "Colocar una reina en la fila actual",
          "Comprobar si es seguro colocar la reina",
          "Si es seguro, pasar a la siguiente fila",
          "Si no es seguro, intentar la siguiente columna en la fila actual",
          "Si todas las columnas son inseguras, retroceder a la fila anterior",
          "Si la fila anterior no tiene columnas seguras, retroceder más",
          "Si el tablero está completamente lleno con colocaciones seguras, devolver la solución",
          "Continuar este proceso hasta encontrar todas las posibles soluciones",
        ],
      },
    },
    {
      groupReference: "6",
      title: "Revisión con Conversación AI",
      isConversationReview: true,
      description: "Revisa los temas que has respondido.",
      question: {
        questionText:
          "Hablemos sobre las preguntas en las que hemos trabajado hasta ahora.",
        range: [94, 114],
      },
    },
  ],
};
