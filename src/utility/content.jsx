export const steps = {
  en: [
    {
      title: "Welcome to the Program AI App!",
      description:
        "Press 'Let's start' to begin your journey in learning how to code.",
    },
    {
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
      title: "Introduction to Variables",
      description:
        "In this step, you will learn about variables and how to use them in your code.",
      isSelectOrder: true,
      question: {
        questionText:
          "Arrange the following steps to correctly declare a variable in JavaScript:",
        options: [
          "Use the var/let/const keyword",
          "Choose a variable name",
          "Assign a value to the variable",
          "End the line with a semicolon",
        ],
        answer: [
          "Use the var/let/const keyword",
          "Choose a variable name",
          "Assign a value to the variable",
          "End the line with a semicolon",
        ],
      },
    },
    {
      title: "Declaring Variables in JavaScript",
      description:
        "In this step, you will learn how to declare a variable in JavaScript.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText:
          "Write a JavaScript code snippet that declares a variable called `age` and assigns it the value `25`.",
      },
    },
    {
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
      title: "Introduction to Objects",
      description:
        "In this step, you will learn what an object is in programming.",
      isText: true,
      question: {
        questionText: "What is an object in programming?",
      },
    },
    {
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
      title: "Creating an Instance of a Class",
      description:
        "In this step, you will learn how to create an instance of a class in JavaScript.",
      isSelectOrder: true,
      question: {
        questionText:
          "Arrange the steps in the correct order to create an instance of a class in JavaScript:",
        options: [
          "Use the 'new' keyword",
          "Call the class name",
          "Pass any required arguments",
          "Store the instance in a variable",
        ],
        answer: [
          "Use the 'new' keyword",
          "Call the class name",
          "Pass any required arguments",
          "Store the instance in a variable",
        ],
      },
    },
    {
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
      title: "Accessing Object Properties",
      description:
        "In this step, you will learn how to access properties of an object in JavaScript.",
      isSelectOrder: true,
      question: {
        questionText:
          "Arrange the steps to correctly access a property in an object:",
        options: [
          "Identify the object",
          "Use dot or bracket notation",
          "Specify the property name",
          "Store the value in a variable or use it directly",
        ],
        answer: [
          "Identify the object",
          "Use dot or bracket notation",
          "Specify the property name",
          "Store the value in a variable or use it directly",
        ],
      },
    },
    {
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
      title: "Understanding Inheritance",
      description:
        "In this step, you will learn about inheritance in object-oriented programming.",
      isText: true,
      question: {
        questionText: "What is inheritance in object-oriented programming?",
      },
    },
    {
      title: "Implementing Inheritance",
      description:
        "In this step, you will implement inheritance in JavaScript by extending a class.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText:
          "Extend the `Car` class to create a `ElectricCar` class with an additional property `batteryLife`.",
      },
    },
    {
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
        ],
        answer: "To replace a method inherited from the superclass",
      },
    },
    {
      title: "Understanding Encapsulation",
      description:
        "In this step, you will learn about encapsulation in object-oriented programming.",
      isText: true,
      question: {
        questionText: "What is encapsulation in object-oriented programming?",
      },
    },
    {
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
      title: "Creating and Using an Array of Objects",
      description:
        "In this step, you will create and use an array of objects in JavaScript.",
      isSelectOrder: true,
      question: {
        questionText:
          "Arrange the steps to correctly iterate over an array of objects:",
        options: [
          "Create the array",
          "Use a loop to iterate",
          "Access properties of each object",
          "Perform actions with the properties",
        ],
        answer: [
          "Create the array",
          "Use a loop to iterate",
          "Access properties of each object",
          "Perform actions with the properties",
        ],
      },
    },
    {
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
      title: "Terminal Code Example",
      description: "In this step, you will type your code as if in a terminal.",
      isCode: true,
      isTerminal: true,
      question: {
        questionText: "Type a command using the command line",
      },
    },
    {
      title: "Review of Lesson One",
      description:
        "Let's quickly review lesson one where we learned about organizing data with code, including objects, functions, loops, and logic.",
      isText: true,
      question: {
        questionText:
          "What are the four main concepts we covered in lesson one?",
      },
    },
    {
      title: "Introduction to React Components",
      description:
        "In this step, you will learn about React components and their importance in creating user interfaces.",
      isMultipleChoice: true,
      question: {
        questionText:
          "Which of the following best describes a React component?",
        options: [
          "A function that returns HTML",
          "A part of a website's database",
          "A tool for server-side rendering",
          "A method for handling events",
        ],
        answer: "A function that returns HTML",
      },
    },
    {
      title: "Understanding React Hooks",
      description:
        "In this step, you will learn about React hooks and how they are used to manage state and side effects in functional components.",
      isSelectOrder: true,
      question: {
        questionText: "Arrange the steps to use the useState hook correctly:",
        options: [
          "Import useState from React",
          "Declare the state variable",
          "Provide an initial value",
          "Update the state using the setter function",
        ],
        answer: [
          "Import useState from React",
          "Declare the state variable",
          "Provide an initial value",
          "Update the state using the setter function",
        ],
      },
    },
    {
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
      title: "Creating a New React Project",
      description:
        "In this step, you will create a new React project using Create React App.",
      isSelectOrder: true,
      question: {
        questionText:
          "Arrange the steps to correctly create a new React project:",
        options: [
          "Install Create React App globally",
          "Run the command to create a new project",
          "Navigate to the project directory",
          "Start the development server",
        ],
        answer: [
          "Install Create React App globally",
          "Run the command to create a new project",
          "Navigate to the project directory",
          "Start the development server",
        ],
      },
    },
    {
      title: "Running a React Project",
      description:
        "In this step, you will learn how to run your React project locally.",
      isTerminal: true,
      question: {
        questionText: `Use the terminal to navigate to the "tweet-app" directory and start the development server.`,
      },
    },
    {
      title: "Understanding JSX",
      description:
        "In this step, you will learn about JSX and how it is used to describe the UI in React components.",
      isText: true,
      question: {
        questionText: "What is JSX and why is it used in React?",
      },
    },
    {
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
      title: "Fetching Data with useEffect",
      description:
        "In this step, you will learn how to fetch data from an API using the useEffect hook.",
      isSelectOrder: true,
      question: {
        questionText:
          "Arrange the steps to correctly fetch data using useEffect:",
        options: [
          "Import useEffect from React",
          "Define the useEffect hook",
          "Make the API call inside useEffect",
          "Update the component state with the fetched data",
        ],
        answer: [
          "Import useEffect from React",
          "Define the useEffect hook",
          "Make the API call inside useEffect",
          "Update the component state with the fetched data",
        ],
      },
    },
    {
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
      title: "Deploying Your React App",
      description:
        "In this step, you will learn how to deploy your React app to a hosting service like Vercel or Netlify.",
      isTerminal: true,
      question: {
        questionText: `Use the terminal to deploy your "tweet-app" to a hosting service of your choice.`,
      },
    },
    {
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
      title: "Using Terminal Commands",
      description:
        "In this step, you will learn basic terminal commands to interact with the operating system.",
      isTerminal: true,
      question: {
        questionText:
          "Use the terminal to list all files and directories in the current directory.",
      },
    },
    {
      title: "Navigating File System",
      description:
        "In this step, you will use the terminal to navigate through the file system.",
      isCode: true,
      question: {
        questionText: `Write a command to navigate to a directory named 'backend_project' in the terminal.`,
      },
    },
    {
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
      title: "Understanding Backend Clouds",
      description:
        "In this step, you will learn about backend clouds and their significance.",
      isSelectOrder: true,
      question: {
        questionText:
          "Arrange the following cloud services by their common use in backend engineering:",
        options: [
          "Amazon Web Services (AWS)",
          "Google Cloud Platform (GCP)",
          "Microsoft Azure",
          "IBM Cloud",
        ],
        answer: [
          "Amazon Web Services (AWS)",
          "Google Cloud Platform (GCP)",
          "Microsoft Azure",
          "IBM Cloud",
        ],
      },
    },
    {
      title: "Connecting Systems",
      description:
        "In this step, you will learn how to connect different systems in a backend environment.",
      isCode: true,
      question: {
        questionText: `Write a code snippet to connect a Node.js application to a MongoDB database.`,
      },
    },
    {
      title: "Database Tables",
      description:
        "In this step, you will understand how to create tables in a SQL database.",
      isTerminal: true,
      question: {
        questionText:
          "Use the terminal to create a table named `users` in a SQL database with columns for ID, name, and email.",
      },
    },
    {
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
      title: "Using Key-Value Pairs",
      description:
        "In this step, you will learn about key-value pairs in non-relational databases.",
      isMultipleChoice: true,
      question: {
        questionText:
          "Which of the following is an example of a key-value pair?",
        options: [
          "Username: johndoe",
          "Age: 25",
          "Password: secure123",
          "Email: john@example.com",
        ],
        answer: "Username: johndoe",
      },
    },
    {
      title: "Handling User Data",
      description:
        "In this step, you will learn how to handle user data in backend systems.",
      isCode: true,
      question: {
        questionText: `Write a code snippet to create a user object with properties for username, email, and password.`,
      },
    },
    {
      title: "Creating a New User",
      description:
        "In this step, you will create a new user in a backend system using a terminal command.",
      isTerminal: true,
      question: {
        questionText:
          "Use the terminal to add a new user to the `users` table in your SQL database.",
      },
    },
    {
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
      title: "Authorization Servers",
      description:
        "In this step, you will learn about the role of authorization servers.",
      isSelectOrder: true,
      question: {
        questionText: "Arrange the steps to correctly authorize a user:",
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
      title: "Using Environment Variables",
      description:
        "In this step, you will learn about using environment variables in backend development.",
      isTerminal: true,
      question: {
        questionText:
          "Set an environment variable for your database connection string in your terminal.",
      },
    },
    {
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
      title: "Connecting to a Database",
      description:
        "In this step, you will learn how to connect a backend application to a database.",
      isCode: true,
      question: {
        questionText:
          "Write a code snippet to connect to a MongoDB database using Node.js.",
      },
    },
    {
      title: "Creating a User Authentication System",
      description:
        "In this step, you will create a simple user authentication system.",
      isSelectOrder: true,
      question: {
        questionText:
          "Arrange the steps to implement user authentication using JWT:",
        options: [
          "Install JWT library",
          "Create a login route",
          "Verify user credentials",
          "Generate a JWT token",
        ],
        answer: [
          "Install JWT library",
          "Create a login route",
          "Verify user credentials",
          "Generate a JWT token",
        ],
      },
    },
    {
      title: "Deploying a Backend Application",
      description:
        "In this step, you will learn how to deploy a backend application to a cloud service.",
      isTerminal: true,
      question: {
        questionText:
          "Write a code snippet to deploy a Node.js application to Heroku.",
      },
    },
    {
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
      title: "Installing VSCode",
      description:
        "Install Visual Studio Code (VSCode), the code editor for writing your code.",
      isCode: true,
      question: {
        questionText:
          "Write the terminal command to install VSCode on your operating system.",
      },
    },
    {
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
      title: "Installing npm",
      description:
        "Install npm (Node Package Manager) to manage packages and dependencies in your project.",
      isTerminal: true,
      question: {
        questionText:
          "Use the terminal to install npm globally with administrator permissions.",
      },
    },
    {
      title: "Creating a Project Folder",
      description: "Create a new folder for your project.",
      isSelectOrder: true,
      question: {
        questionText:
          "Arrange the following commands to create and navigate into a new project folder:",
        options: [
          "mkdir myProject",
          "cd myProject",
          "Create the folder",
          "Navigate into the folder",
        ],
        answer: [
          "mkdir myProject",
          "Create the folder",
          "cd myProject",
          "Navigate into the folder",
        ],
      },
    },
    {
      title: "Opening Project in VSCode",
      description: "Open your project folder in VSCode.",
      isText: true,
      question: {
        questionText: "Describe the steps to open a project folder in VSCode.",
      },
    },
    {
      title: "Opening Terminal in VSCode",
      description: "Open the in-app command line terminal in VSCode.",
      isMultipleChoice: true,
      question: {
        questionText:
          "What is the keyboard shortcut to open the terminal in VSCode?",
        options: ["Ctrl + `", "Ctrl + Shift + T", "Alt + T", "Cmd + T"],
        answer: "Ctrl + `",
      },
    },
    {
      title: "Starting a React Project with Vite",
      description: "Start a new React project using Vite.",
      isTerminal: true,
      question: {
        questionText:
          "Use the terminal to create a new React project with Vite. What command do you use?",
      },
    },
    {
      title: "Configuring and Installing Dependencies",
      description: "Configure your project and install necessary dependencies.",
      isCode: true,
      question: {
        questionText:
          "Write the command to install necessary dependencies in your React project using npm.",
      },
    },
    {
      title: "Running the React Application",
      description: "Run your React application in development mode.",
      isSelectOrder: true,
      question: {
        questionText:
          "Arrange the steps to correctly run your React application:",
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
      title: "Setting Up Firebase",
      description: "Set up Firebase for your project.",
      isText: true,
      question: {
        questionText: "What are the steps to set up Firebase for your project?",
      },
    },
    {
      title: "Installing Firebase Tools",
      description: "Install Firebase tools globally.",
      isTerminal: true,
      question: {
        questionText:
          "Use the terminal to install Firebase tools globally. What command do you use?",
      },
    },
    {
      title: "Initializing Firebase",
      description:
        "Initialize Firebase in your project and authenticate your account.",
      isSelectOrder: true,
      question: {
        questionText:
          "Arrange the steps to correctly initialize Firebase in your project:",
        options: [
          "Install Firebase CLI",
          "Login to Firebase",
          "Initialize Firebase in the project",
          "Choose project settings",
        ],
        answer: [
          "Install Firebase CLI",
          "Login to Firebase",
          "Initialize Firebase in the project",
          "Choose project settings",
        ],
      },
    },
    {
      title: "Activating Firebase Services",
      description:
        "Activate authentication, Firestore, and hosting services in Firebase.",
      isText: true,
      question: {
        questionText:
          "Which Firebase services need to be activated for this project?",
      },
    },
    {
      title: "Deploying the Application",
      description: "Deploy your application using Firebase hosting.",
      isTerminal: true,
      question: {
        questionText:
          "Use the terminal to deploy your application to Firebase hosting. What command do you use?",
      },
    },
    {
      title: "Creating Users",
      description:
        "Install Firebase and react-firebaseui to create users in your application.",
      isMultipleChoice: true,
      question: {
        questionText:
          "Which package do you use to handle user authentication in Firebase?",
        options: [
          "firebase-auth",
          "react-firebaseui",
          "firebase-hooks",
          "firebase-users",
        ],
        answer: "react-firebaseui",
      },
    },
    {
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
      title: "Rendering Sign-In Button",
      description:
        "Render a sign-in button in your React application using Firebase and react-firebaseui.",
      isSelectOrder: true,
      question: {
        questionText:
          "Arrange the steps to correctly render a sign-in button using Firebase and react-firebaseui:",
        options: [
          "Import the necessary Firebase modules",
          "Initialize Firebase",
          "Configure the sign-in options",
          "Render the sign-in button",
        ],
        answer: [
          "Import the necessary Firebase modules",
          "Initialize Firebase",
          "Configure the sign-in options",
          "Render the sign-in button",
        ],
      },
    },
    {
      title: "Displaying User Data",
      description: "Use useEffect to display user data when they log in.",
      isCode: true,
      question: {
        questionText:
          "Write the code to display user data using the useEffect hook when they log in.",
      },
    },
    {
      title: "Creating a Header Component",
      description:
        "Create a header component to display user information based on their login state.",
      isMultipleChoice: true,
      question: {
        questionText:
          "Which of the following best describes a header component?",
        options: [
          "A component that manages the application state",
          "A component that displays information at the top of the page",
          "A component that handles user authentication",
          "A component that manages API requests",
        ],
        answer: "A component that displays information at the top of the page",
      },
    },
    {
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
      title: "Deploying Updated Code",
      description:
        "Deploy your updated application with Firebase authentication and user data display.",
      isTerminal: true,
      question: {
        questionText:
          "Use the terminal to build and deploy your updated application. What commands do you use?",
      },
    },
    {
      title: "Summary and Review",
      description:
        "Review the steps taken to build and deploy your full application.",
      isText: true,
      question: {
        questionText:
          "Summarize the key steps taken to build and deploy your application using React and Firebase.",
      },
    },
    {
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
      title: "Programming Languages and Autocorrect Technology",
      description:
        "Explore how programming languages work and how computers understand code.",
      isCode: true,
      question: {
        questionText: `Write a simple program in any language to demonstrate how autocorrect technology might identify and correct a misspelled word.`,
      },
    },
    {
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
          "A block of HTML code",
          "A JavaScript library",
        ],
        answer: "A single character like ';'",
      },
    },
    {
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
      title: "Character Mapping",
      description: "Map characters to their corresponding indices.",
      isSelectOrder: true,
      question: {
        questionText:
          "Arrange the characters of the string 'Drake' by their corresponding indices:",
        options: ["'D': 0", "'r': 1", "'a': 2", "'k': 3", "'e': 4"],
        answer: ["'D': 0", "'r': 1", "'a': 2", "'k': 3", "'e': 4"],
      },
    },
    {
      title: "Binary Conversion",
      description: "Convert characters to their binary representation.",
      isCode: true,
      question: {
        questionText:
          'Write the binary representation for each character in the string "Drake".',
      },
    },
    {
      title: "Understanding Data Structures",
      description: "Learn how data structures store and reference information.",
      isText: true,
      question: {
        questionText:
          "Why is it important to understand how computers reserve space and create addresses to reference information?",
      },
    },
    {
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
      title: "Building a Linked List",
      description: "Construct a simple linked list in JavaScript.",
      isCode: true,
      question: {
        questionText:
          'Write the JavaScript code to create a linked list with the following values: "meta", "instagram", "reels".',
      },
    },
    {
      title: "Depth-First Search Algorithm",
      description: "Understand and implement a depth-first search algorithm.",
      isSelectOrder: true,
      question: {
        questionText:
          "Arrange the steps to correctly implement a depth-first search algorithm:",
        options: [
          "Visit the root node",
          "Recursively visit each child node",
          "Backtrack when necessary",
          "Process the node",
        ],
        answer: [
          "Visit the root node",
          "Process the node",
          "Recursively visit each child node",
          "Backtrack when necessary",
        ],
      },
    },
    {
      title: "Creating a Tree Structure",
      description:
        "Build a simple tree structure to practice depth-first search.",
      isCode: true,
      question: {
        questionText:
          "Write the JavaScript code to create the following tree structure: { alphabet: { google: { chrome: true } }, meta: { facebook: { threads: null } } }",
      },
    },
    {
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
      title: "Depth-First Search Application",
      description: "Apply depth-first search to a practical example.",
      isSelectOrder: true,
      question: {
        questionText:
          "Arrange the steps to implement depth-first search on a binary tree:",
        options: [
          "Start at the root node",
          "Visit the left subtree",
          "Visit the right subtree",
          "Process the node",
        ],
        answer: [
          "Start at the root node",
          "Visit the left subtree",
          "Process the node",
          "Visit the right subtree",
        ],
      },
    },
    {
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
      title: "Practical Linked List Application",
      description: "Apply the LinkedList class to a real-world scenario.",
      isCode: true,
      question: {
        questionText:
          "Write the code to create a linked list of company departments and traverse through it.",
      },
    },
    {
      title: "Exploring the N-Queens Problem",
      description: "Understand the N-Queens problem and its complexity.",
      isText: true,
      question: {
        questionText:
          "What is the N-Queens problem, and why is it considered complex?",
      },
    },
    {
      title: "Implementing Backtracking",
      description: "Implement a backtracking algorithm to solve a problem.",
      isSelectOrder: true,
      question: {
        questionText:
          "Arrange the steps to implement backtracking for the N-Queens problem:",
        options: [
          "Place a queen on the board",
          "Check if it's safe to place the queen",
          "If not safe, backtrack",
          "If safe, move to the next row",
        ],
        answer: [
          "Place a queen on the board",
          "Check if it's safe to place the queen",
          "If safe, move to the next row",
          "If not safe, backtrack",
        ],
      },
    },
    {
      title: "Building a Complete Application",
      description:
        "Combine all the concepts learned to build a full application.",
      isCode: true,
      question: {
        questionText:
          "Write the code to build a small application that uses a class-based approach to manage state and interact with a backend.",
      },
    },
  ],
  es: [
    {
      title: "¡Bienvenido a la Aplicación de Programación de IA!",
      description:
        "Presiona 'Empecemos' para comenzar tu viaje en el aprendizaje de la programación.",
    },
    {
      title: "Entendiendo el Objetivo de la Programación",
      description:
        "En este paso, aprenderás sobre el objetivo principal de la codificación o programación.",
      isMultipleChoice: true,
      question: {
        questionText:
          "¿Cuál de las siguientes opciones describe mejor el objetivo principal de la codificación o programación?",
        options: [
          "Resolver problemas creando soluciones eficientes y efectivas",
          "Aprender diferentes lenguajes de programación",
          "Escribir la mayor cantidad de código posible",
          "Memorizar sintaxis y funciones",
        ],
        answer: "Resolver problemas creando soluciones eficientes y efectivas",
      },
    },
    {
      title: "Introducción a las Variables",
      description:
        "En este paso, aprenderás sobre las variables y cómo usarlas en tu código.",
      isSelectOrder: true,
      question: {
        questionText:
          "Ordena los siguientes pasos para declarar correctamente una variable en JavaScript:",
        options: [
          "Usa la palabra clave var/let/const",
          "Elige un nombre de variable",
          "Asigna un valor a la variable",
          "Termina la línea con un punto y coma",
        ],
        answer: [
          "Usa la palabra clave var/let/const",
          "Elige un nombre de variable",
          "Asigna un valor a la variable",
          "Termina la línea con un punto y coma",
        ],
      },
    },
    {
      title: "Declarando Variables en JavaScript",
      description:
        "En este paso, aprenderás cómo declarar una variable en JavaScript.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText:
          "Escribe un fragmento de código en JavaScript que declare una variable llamada `edad` y le asigne el valor `25`.",
      },
    },
    {
      title: "Entendiendo la Lógica en la Programación",
      description:
        "En este paso, aprenderás sobre la lógica en el contexto de la programación.",
      isText: true,
      question: {
        questionText:
          "Explica con tus propias palabras cómo se aplica la lógica en la programación para controlar el flujo de un programa.",
      },
    },
    {
      title: "Introducción a los Objetos",
      description:
        "En este paso, aprenderás qué es un objeto en la programación.",
      isText: true,
      question: {
        questionText: "¿Qué es un objeto en la programación?",
      },
    },
    {
      title: "Creando una Clase Simple",
      description:
        "En este paso, escribirás una definición simple de clase en JavaScript.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText: `Escribe una definición simple de clase en JavaScript para un objeto \`Car\` con propiedades para \`make\` y \`model\`, y un método para mostrar los detalles del coche.`,
      },
    },
    {
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
      title: "Creando una Instancia de una Clase",
      description:
        "En este paso, aprenderás cómo crear una instancia de una clase en JavaScript.",
      isSelectOrder: true,
      question: {
        questionText:
          "Organiza los pasos en el orden correcto para crear una instancia de una clase en JavaScript:",
        options: [
          "Usa la palabra clave 'new'",
          "Llama al nombre de la clase",
          "Pasa cualquier argumento requerido",
          "Guarda la instancia en una variable",
        ],
        answer: [
          "Usa la palabra clave 'new'",
          "Llama al nombre de la clase",
          "Pasa cualquier argumento requerido",
          "Guarda la instancia en una variable",
        ],
      },
    },
    {
      title: "Declarando un Método en una Clase",
      description:
        "En este paso, aprenderás cómo declarar un método dentro de una clase.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText:
          "Declara un método llamado `updateModel` en la clase `Car` que actualice la propiedad `model`.",
      },
    },
    {
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
          "El método mismo",
          "La definición de la clase",
        ],
        answer: "El objeto que llama al método",
      },
    },
    {
      title: "Agregando Propiedades a un Objeto",
      description:
        "En este paso, aprenderás cómo agregar propiedades a un objeto en JavaScript.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText: "Agrega una nueva propiedad `year` a la clase `Car`.",
      },
    },
    {
      title: "Accediendo a las Propiedades del Objeto",
      description:
        "En este paso, aprenderás cómo acceder a las propiedades de un objeto en JavaScript.",
      isSelectOrder: true,
      question: {
        questionText:
          "Organiza los pasos para acceder correctamente a una propiedad en un objeto:",
        options: [
          "Identifica el objeto",
          "Usa la notación de puntos o corchetes",
          "Especifica el nombre de la propiedad",
          "Guarda el valor en una variable o úsalo directamente",
        ],
        answer: [
          "Identifica el objeto",
          "Usa la notación de puntos o corchetes",
          "Especifica el nombre de la propiedad",
          "Guarda el valor en una variable o úsalo directamente",
        ],
      },
    },
    {
      title: "Modificando las Propiedades del Objeto",
      description:
        "En este paso, aprenderás cómo modificar las propiedades de un objeto en JavaScript.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText:
          "Modifica la propiedad `model` de una instancia de la clase `Car`.",
      },
    },
    {
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
      title: "Implementando la Herencia",
      description:
        "En este paso, implementarás la herencia en JavaScript extendiendo una clase.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText:
          "Extiende la clase `Car` para crear una clase `ElectricCar` con una propiedad adicional `batteryLife`.",
      },
    },
    {
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
        ],
        answer: "Reemplazar un método heredado de la superclase",
      },
    },
    {
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
      title: "Implementando la Encapsulación",
      description:
        "En este paso, implementarás la encapsulación usando métodos getter y setter.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText:
          "Agrega métodos getter y setter para la propiedad `batteryLife` en la clase `ElectricCar`.",
      },
    },
    {
      title: "Creando y Usando un Array de Objetos",
      description:
        "En este paso, crearás y usarás un array de objetos en JavaScript.",
      isSelectOrder: true,
      question: {
        questionText:
          "Organiza los pasos para iterar correctamente sobre un array de objetos:",
        options: [
          "Crea el array",
          "Usa un bucle para iterar",
          "Accede a las propiedades de cada objeto",
          "Realiza acciones con las propiedades",
        ],
        answer: [
          "Crea el array",
          "Usa un bucle para iterar",
          "Accede a las propiedades de cada objeto",
          "Realiza acciones con las propiedades",
        ],
      },
    },
    {
      title: "Combinando Conceptos",
      description:
        "En este paso, combinarás varios conceptos aprendidos para crear un pequeño proyecto.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText:
          "Crea un pequeño proyecto que defina una clase `Person`, use herencia para crear una clase `Student` y demuestre encapsulación y arrays de objetos.",
      },
    },
    {
      title: "Ejemplo de Código en Terminal",
      description:
        "En este paso, escribirás tu código como si estuvieras en una terminal.",
      isCode: true,
      isTerminal: true,
      question: {
        questionText: "Escribe un comando usando la línea de comandos",
      },
    },
    {
      title: "Revisión de la Lección Uno",
      description:
        "Hagamos una revisión rápida de la lección uno donde aprendimos sobre la organización de datos con código, incluyendo objetos, funciones, bucles y lógica.",
      isText: true,
      question: {
        questionText:
          "¿Cuáles son los cuatro conceptos principales que cubrimos en la lección uno?",
      },
    },
    {
      title: "Introducción a los Componentes de React",
      description:
        "En este paso, aprenderás sobre los componentes de React y su importancia en la creación de interfaces de usuario.",
      isMultipleChoice: true,
      question: {
        questionText:
          "¿Cuál de las siguientes opciones describe mejor un componente de React?",
        options: [
          "Una función que devuelve HTML",
          "Una parte de la base de datos de un sitio web",
          "Una herramienta para la renderización del lado del servidor",
          "Un método para manejar eventos",
        ],
        answer: "Una función que devuelve HTML",
      },
    },
    {
      title: "Entendiendo los Hooks de React",
      description:
        "En este paso, aprenderás sobre los hooks de React y cómo se utilizan para gestionar el estado y los efectos secundarios en componentes funcionales.",
      isSelectOrder: true,
      question: {
        questionText:
          "Organiza los pasos para usar correctamente el hook useState:",
        options: [
          "Importa useState de React",
          "Declara la variable de estado",
          "Proporciona un valor inicial",
          "Actualiza el estado usando la función setter",
        ],
        answer: [
          "Importa useState de React",
          "Declara la variable de estado",
          "Proporciona un valor inicial",
          "Actualiza el estado usando la función setter",
        ],
      },
    },
    {
      title: "Creando un Componente Simple de React",
      description:
        "En este paso, crearás un componente simple de React que muestre un Tweet.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText: `Escribe un componente simple de React que muestre un Tweet con el nombre del usuario, el handle y el texto.`,
      },
    },
    {
      title: "Gestionando el Estado con useState Hook",
      description:
        "En este paso, aprenderás cómo usar el hook useState para gestionar el estado de un componente.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText: `Modifica el componente Tweet para incluir un botón de "me gusta" que alterne el estado de "liked" usando el hook useState.`,
      },
    },
    {
      title: "Manejando Eventos en React",
      description:
        "En este paso, aprenderás cómo manejar eventos en React, como los clics.",
      isMultipleChoice: true,
      question: {
        questionText:
          "¿Cuál es la mejor manera de manejar un evento de clic en un botón en React?",
        options: [
          "Adjuntar un listener de eventos directamente al botón en HTML",
          "Usar el atributo onClick en el JSX del componente",
          "Escribir un manejador de eventos personalizado en JavaScript plano",
          "Vincular el manejador de eventos al elemento del DOM usando querySelector",
        ],
        answer: "Usar el atributo onClick en el JSX del componente",
      },
    },
    {
      title: "Propiedades del Componente",
      description:
        "En este paso, aprenderás sobre cómo pasar propiedades a los componentes en React.",
      isText: true,
      question: {
        questionText:
          "¿Qué son las propiedades en un componente de React y cómo se utilizan?",
      },
    },
    {
      title: "Actualizando el Estado del Componente",
      description:
        "En este paso, aprenderás cómo actualizar el estado de un componente basado en las interacciones del usuario.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText: `Actualiza el componente Tweet para incrementar el conteo de "me gusta" cada vez que se haga clic en el botón de "me gusta".`,
      },
    },
    {
      title: "Creando un Nuevo Proyecto de React",
      description:
        "En este paso, crearás un nuevo proyecto de React usando Create React App.",
      isSelectOrder: true,
      question: {
        questionText:
          "Organiza los pasos para crear correctamente un nuevo proyecto de React:",
        options: [
          "Instalar Create React App globalmente",
          "Ejecutar el comando para crear un nuevo proyecto",
          "Navegar al directorio del proyecto",
          "Iniciar el servidor de desarrollo",
        ],
        answer: [
          "Instalar Create React App globalmente",
          "Ejecutar el comando para crear un nuevo proyecto",
          "Navegar al directorio del proyecto",
          "Iniciar el servidor de desarrollo",
        ],
      },
    },
    {
      title: "Ejecutando un Proyecto de React",
      description:
        "En este paso, aprenderás cómo ejecutar tu proyecto de React localmente.",
      isTerminal: true,
      question: {
        questionText: `Usa la terminal para navegar al directorio "tweet-app" y comenzar el servidor de desarrollo.`,
      },
    },
    {
      title: "Entendiendo JSX",
      description:
        "En este paso, aprenderás sobre JSX y cómo se usa para describir la UI en componentes de React.",
      isText: true,
      question: {
        questionText: "¿Qué es JSX y por qué se usa en React?",
      },
    },
    {
      title: "Estilizando Componentes de React",
      description:
        "En este paso, aprenderás cómo estilizar componentes de React usando CSS.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText: `Agrega estilos al componente Tweet para mejorar su apariencia.`,
      },
    },
    {
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
      title: "Agregando Más Estado con useState",
      description:
        "En este paso, aprenderás cómo gestionar múltiples piezas de estado en un componente usando el hook useState.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText: `Agrega un botón de retweet al componente Tweet que rastree el número de retweets.`,
      },
    },
    {
      title: "Trabajando con Props y Estado Juntos",
      description:
        "En este paso, aprenderás cómo trabajar con tanto props como estado en un componente de React.",
      isMultipleChoice: true,
      question: {
        questionText:
          "¿Cuál es la principal diferencia entre props y estado en React?",
        options: [
          "Las props son inmutables, mientras que el estado es mutable",
          "Las props son gestionadas por el propio componente, mientras que el estado es pasado desde componentes padre",
          "El estado se utiliza para estilizar, mientras que las props se utilizan para la lógica",
          "No hay diferencia; son lo mismo",
        ],
        answer: "Las props son inmutables, mientras que el estado es mutable",
      },
    },
    {
      title: "Elevando el Estado",
      description:
        "En este paso, aprenderás cómo elevar el estado a un componente ancestro común para compartir estado entre componentes.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText: `Crea un componente padre que gestione el estado de múltiples componentes Tweet y pase el estado y los manejadores de eventos como props.`,
      },
    },
    {
      title: "Entendiendo el Ciclo de Vida del Componente",
      description:
        "En este paso, aprenderás sobre el ciclo de vida de los componentes de React y cómo usar el hook useEffect para gestionar efectos secundarios.",
      isText: true,
      question: {
        questionText:
          "¿Qué es el ciclo de vida del componente en React y cuál es el propósito del hook useEffect?",
      },
    },
    {
      title: "Recuperando Datos con useEffect",
      description:
        "En este paso, aprenderás cómo recuperar datos de una API usando el hook useEffect.",
      isSelectOrder: true,
      question: {
        questionText:
          "Organiza los pasos para recuperar datos correctamente usando useEffect:",
        options: [
          "Importa useEffect de React",
          "Define el hook useEffect",
          "Haz la llamada a la API dentro de useEffect",
          "Actualiza el estado del componente con los datos recuperados",
        ],
        answer: [
          "Importa useEffect de React",
          "Define el hook useEffect",
          "Haz la llamada a la API dentro de useEffect",
          "Actualiza el estado del componente con los datos recuperados",
        ],
      },
    },
    {
      title: "Construyendo una Aplicación Completa de Tweet",
      description:
        "En este paso, combinarás todo lo que has aprendido para construir una aplicación completa de Tweet.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText: `Construye una aplicación completa de Tweet que recupere tweets de una API, los muestre usando el componente Tweet y permita a los usuarios dar "me gusta" y retweetear.`,
      },
    },
    {
      title: "Desplegando Tu Aplicación de React",
      description:
        "En este paso, aprenderás cómo desplegar tu aplicación de React a un servicio de alojamiento como Vercel o Netlify.",
      isTerminal: true,
      question: {
        questionText: `Usa la terminal para desplegar tu aplicación "tweet-app" a un servicio de alojamiento de tu elección.`,
      },
    },
    {
      title: "Introducción a la Ingeniería Backend",
      description:
        "En este paso, aprenderás sobre qué es la ingeniería de software backend y por qué es importante.",
      isText: true,
      question: {
        questionText:
          "¿Qué es la ingeniería de software backend y por qué es importante en la construcción de aplicaciones?",
      },
    },
    {
      title: "Resumen de Lecciones Principales",
      description:
        "En este paso, identificarás las lecciones principales cubiertas en el curso de ingeniería backend.",
      isMultipleChoice: true,
      question: {
        questionText:
          "¿Cuál de los siguientes es un aspecto central de la ingeniería backend?",
        options: [
          "Diseño de interfaces de usuario",
          "Gestión de bases de datos",
          "Creación de elementos de diseño gráfico",
          "Escribir HTML y CSS frontend",
        ],
        answer: "Gestión de bases de datos",
      },
    },
    {
      title: "Relacionando Backend con el Mundo Real",
      description:
        "En este paso, relacionarás las operaciones de una cocina en un restaurante con la ingeniería backend.",
      isSelectOrder: true,
      question: {
        questionText:
          "Organiza las siguientes tareas en una cocina de restaurante para que correspondan con operaciones backend:",
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
      title: "Entendiendo los Sistemas Operativos",
      description:
        "En este paso, aprenderás por qué es importante entender los sistemas operativos en la ingeniería backend.",
      isText: true,
      question: {
        questionText:
          "¿Por qué es importante entender el sistema operativo cuando se estudia ingeniería backend?",
      },
    },
    {
      title: "Usando Comandos de Terminal",
      description:
        "En este paso, aprenderás comandos básicos de terminal para interactuar con el sistema operativo.",
      isTerminal: true,
      question: {
        questionText:
          "Usa la terminal para listar todos los archivos y directorios en el directorio actual.",
      },
    },
    {
      title: "Navegando el Sistema de Archivos",
      description:
        "En este paso, usarás la terminal para navegar a través del sistema de archivos.",
      isCode: true,
      question: {
        questionText: `Escribe un comando para navegar a un directorio llamado 'backend_project' en la terminal.`,
      },
    },
    {
      title: "Creando el Concepto de Usuarios",
      description:
        "En este paso, entenderás el concepto de crear usuarios en sistemas backend.",
      isMultipleChoice: true,
      question: {
        questionText:
          "¿Cuál de los siguientes es un aspecto clave en la creación de usuarios en sistemas backend?",
        options: [
          "Generación de ID de usuario únicos",
          "Diseño de avatares de usuario",
          "Selección de temas de color",
          "Creación de perfiles en redes sociales",
        ],
        answer: "Generación de ID de usuario únicos",
      },
    },
    {
      title: "Fundamentos de Bases de Datos",
      description:
        "En este paso, aprenderás sobre los fundamentos de las bases de datos en la ingeniería backend.",
      isText: true,
      question: {
        questionText:
          "¿Cuáles son los principales tipos de bases de datos utilizados en la ingeniería backend?",
      },
    },
    {
      title: "Entendiendo las Nubes Backend",
      description:
        "En este paso, aprenderás sobre las nubes backend y su importancia.",
      isSelectOrder: true,
      question: {
        questionText:
          "Organiza los siguientes servicios en la nube según su uso común en la ingeniería backend:",
        options: [
          "Amazon Web Services (AWS)",
          "Google Cloud Platform (GCP)",
          "Microsoft Azure",
          "IBM Cloud",
        ],
        answer: [
          "Amazon Web Services (AWS)",
          "Google Cloud Platform (GCP)",
          "Microsoft Azure",
          "IBM Cloud",
        ],
      },
    },
    {
      title: "Conectando Sistemas",
      description:
        "En este paso, aprenderás cómo conectar diferentes sistemas en un entorno backend.",
      isCode: true,
      question: {
        questionText: `Escribe un fragmento de código para conectar una aplicación Node.js a una base de datos MongoDB.`,
      },
    },
    {
      title: "Tablas de Bases de Datos",
      description:
        "En este paso, entenderás cómo crear tablas en una base de datos SQL.",
      isTerminal: true,
      question: {
        questionText:
          "Usa la terminal para crear una tabla llamada `users` en una base de datos SQL con columnas para ID, nombre y correo electrónico.",
      },
    },
    {
      title: "Almacenamiento Responsable de Datos",
      description:
        "En este paso, aprenderás sobre prácticas responsables de almacenamiento de datos.",
      isText: true,
      question: {
        questionText:
          "¿Cuáles son algunas de las mejores prácticas para almacenar datos de manera responsable en un sistema backend?",
      },
    },
    {
      title: "Usando Pares Clave-Valor",
      description:
        "En este paso, aprenderás sobre pares clave-valor en bases de datos no relacionales.",
      isMultipleChoice: true,
      question: {
        questionText:
          "¿Cuál de las siguientes opciones es un ejemplo de un par clave-valor?",
        options: [
          "Nombre de usuario: johndoe",
          "Edad: 25",
          "Contraseña: secure123",
          "Correo electrónico: john@example.com",
        ],
        answer: "Nombre de usuario: johndoe",
      },
    },
    {
      title: "Manejando Datos de Usuario",
      description:
        "En este paso, aprenderás cómo manejar datos de usuario en sistemas backend.",
      isCode: true,
      question: {
        questionText: `Escribe un fragmento de código para crear un objeto de usuario con propiedades para nombre de usuario, correo electrónico y contraseña.`,
      },
    },
    {
      title: "Creando un Nuevo Usuario",
      description:
        "En este paso, crearás un nuevo usuario en un sistema backend usando un comando de terminal.",
      isTerminal: true,
      question: {
        questionText:
          "Usa la terminal para agregar un nuevo usuario a la tabla `users` en tu base de datos SQL.",
      },
    },
    {
      title: "Entendiendo la Autenticación",
      description:
        "En este paso, aprenderás sobre los procesos de autenticación en sistemas backend.",
      isText: true,
      question: {
        questionText:
          "¿Qué es la autenticación y por qué es importante en los sistemas backend?",
      },
    },
    {
      title: "Servidores de Autorización",
      description:
        "En este paso, aprenderás sobre el papel de los servidores de autorización.",
      isSelectOrder: true,
      question: {
        questionText:
          "Organiza los pasos para autorizar correctamente a un usuario:",
        options: [
          "El usuario envía credenciales",
          "El servidor verifica las credenciales",
          "Se genera un token de autorización",
          "Se concede acceso a los recursos al usuario",
        ],
        answer: [
          "El usuario envía credenciales",
          "El servidor verifica las credenciales",
          "Se genera un token de autorización",
          "Se concede acceso a los recursos al usuario",
        ],
      },
    },
    {
      title: "Usando Variables de Entorno",
      description:
        "En este paso, aprenderás sobre el uso de variables de entorno en el desarrollo backend.",
      isTerminal: true,
      question: {
        questionText:
          "Establece una variable de entorno para tu cadena de conexión a la base de datos en tu terminal.",
      },
    },
    {
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
      title: "Creando Endpoints de API",
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
      title: "Conectando a una Base de Datos",
      description:
        "En este paso, aprenderás cómo conectar una aplicación backend a una base de datos.",
      isCode: true,
      question: {
        questionText:
          "Escribe un fragmento de código para conectarte a una base de datos MongoDB usando Node.js.",
      },
    },
    {
      title: "Creando un Sistema de Autenticación de Usuario",
      description:
        "En este paso, crearás un sistema simple de autenticación de usuario.",
      isSelectOrder: true,
      question: {
        questionText:
          "Organiza los pasos para implementar la autenticación de usuarios usando JWT:",
        options: [
          "Instalar la biblioteca JWT",
          "Crear una ruta de inicio de sesión",
          "Verificar las credenciales del usuario",
          "Generar un token JWT",
        ],
        answer: [
          "Instalar la biblioteca JWT",
          "Crear una ruta de inicio de sesión",
          "Verificar las credenciales del usuario",
          "Generar un token JWT",
        ],
      },
    },
    {
      title: "Desplegando una Aplicación Backend",
      description:
        "En este paso, aprenderás cómo desplegar una aplicación backend a un servicio en la nube.",
      isTerminal: true,
      question: {
        questionText:
          "Escribe un fragmento de código para desplegar una aplicación Node.js en Heroku.",
      },
    },
    {
      title: "Introducción al Desarrollo Completo de Aplicaciones",
      description:
        "Aprende cómo unir todo lo que has aprendido para construir una aplicación completa.",
      isText: true,
      question: {
        questionText:
          "¿Qué herramientas y recursos puedes usar si encuentras algo que deseas aprender más mientras construyes una aplicación?",
      },
    },
    {
      title: "Instalando VSCode",
      description:
        "Instala Visual Studio Code (VSCode), el editor de código para escribir tu código.",
      isText: true,
      question: {
        questionText:
          "¿Por qué es VSCode una herramienta importante para los desarrolladores?",
      },
    },
    {
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
      title: "Instalando npm",
      description:
        "Instala npm (Node Package Manager) para gestionar paquetes y dependencias en tu proyecto.",
      isTerminal: true,
      question: {
        questionText:
          "Usa la terminal para instalar npm globalmente con permisos de administrador.",
      },
    },
    {
      title: "Creando una Carpeta de Proyecto",
      description: "Crea una nueva carpeta para tu proyecto.",
      isSelectOrder: true,
      question: {
        questionText:
          "Organiza los siguientes comandos para crear y navegar a una nueva carpeta de proyecto:",
        options: [
          "mkdir miProyecto",
          "cd miProyecto",
          "Crear la carpeta",
          "Navegar a la carpeta",
        ],
        answer: [
          "mkdir miProyecto",
          "Crear la carpeta",
          "cd miProyecto",
          "Navegar a la carpeta",
        ],
      },
    },
    {
      title: "Abriendo el Proyecto en VSCode",
      description: "Abre tu carpeta de proyecto en VSCode.",
      isText: true,
      question: {
        questionText:
          "Describe los pasos para abrir una carpeta de proyecto en VSCode.",
      },
    },
    {
      title: "Abriendo la Terminal en VSCode",
      description:
        "Abre la terminal en la aplicación de línea de comandos en VSCode.",
      isMultipleChoice: true,
      question: {
        questionText:
          "¿Cuál es el atajo de teclado para abrir la terminal en VSCode?",
        options: ["Ctrl + `", "Ctrl + Shift + T", "Alt + T", "Cmd + T"],
        answer: "Ctrl + `",
      },
    },
    {
      title: "Iniciando un Proyecto de React con Vite",
      description: "Inicia un nuevo proyecto de React usando Vite.",
      isTerminal: true,
      question: {
        questionText:
          "Usa la terminal para crear un nuevo proyecto de React con Vite. ¿Qué comando usas?",
      },
    },
    {
      title: "Configurando e Instalando Dependencias",
      description:
        "Configura tu proyecto e instala las dependencias necesarias.",
      isCode: true,
      question: {
        questionText:
          "Escribe el comando para instalar las dependencias necesarias en tu proyecto de React usando npm.",
      },
    },
    {
      title: "Ejecutando la Aplicación de React",
      description: "Ejecuta tu aplicación de React en modo de desarrollo.",
      isSelectOrder: true,
      question: {
        questionText:
          "Organiza los pasos para ejecutar correctamente tu aplicación de React:",
        options: [
          "Abre la terminal",
          "Navega a la carpeta del proyecto",
          "Ejecuta el script de inicio",
          "Ver la aplicación en el navegador",
        ],
        answer: [
          "Abre la terminal",
          "Navega a la carpeta del proyecto",
          "Ejecuta el script de inicio",
          "Ver la aplicación en el navegador",
        ],
      },
    },
    {
      title: "Configurando Firebase",
      description: "Configura Firebase para tu proyecto.",
      isText: true,
      question: {
        questionText:
          "¿Cuáles son los pasos para configurar Firebase para tu proyecto?",
      },
    },
    {
      title: "Instalando Herramientas de Firebase",
      description: "Instala las herramientas de Firebase globalmente.",
      isTerminal: true,
      question: {
        questionText:
          "Usa la terminal para instalar las herramientas de Firebase globalmente. ¿Qué comando usas?",
      },
    },
    {
      title: "Inicializando Firebase",
      description: "Inicializa Firebase en tu proyecto y autentica tu cuenta.",
      isSelectOrder: true,
      question: {
        questionText:
          "Organiza los pasos para inicializar correctamente Firebase en tu proyecto:",
        options: [
          "Instalar Firebase CLI",
          "Iniciar sesión en Firebase",
          "Inicializar Firebase en el proyecto",
          "Elegir la configuración del proyecto",
        ],
        answer: [
          "Instalar Firebase CLI",
          "Iniciar sesión en Firebase",
          "Inicializar Firebase en el proyecto",
          "Elegir la configuración del proyecto",
        ],
      },
    },
    {
      title: "Activando Servicios de Firebase",
      description:
        "Activa la autenticación, Firestore y los servicios de alojamiento en Firebase.",
      isText: true,
      question: {
        questionText:
          "¿Qué servicios de Firebase necesitan ser activados para este proyecto?",
      },
    },
    {
      title: "Desplegando la Aplicación",
      description: "Despliega tu aplicación usando el alojamiento de Firebase.",
      isTerminal: true,
      question: {
        questionText:
          "Usa la terminal para desplegar tu aplicación en el alojamiento de Firebase. ¿Qué comando usas?",
      },
    },
    {
      title: "Creando Usuarios",
      description:
        "Instala Firebase y react-firebaseui para crear usuarios en tu aplicación.",
      isMultipleChoice: true,
      question: {
        questionText:
          "¿Qué paquete utilizas para manejar la autenticación de usuarios en Firebase?",
        options: [
          "firebase-auth",
          "react-firebaseui",
          "firebase-hooks",
          "firebase-users",
        ],
        answer: "react-firebaseui",
      },
    },
    {
      title: "Habilitando Google Sign-In",
      description:
        "Habilita el método de Google Sign-In en tus configuraciones de autenticación de Firebase.",
      isText: true,
      question: {
        questionText:
          "¿Qué pasos sigues para habilitar Google Sign-In en las configuraciones de autenticación de Firebase?",
      },
    },
    {
      title: "Conectando Firebase a Tu Código",
      description:
        "Recupera las claves de configuración de Firebase y conéctalas a tu código.",
      isCode: true,
      question: {
        questionText:
          "Escribe el código para inicializar Firebase en tu proyecto usando las claves de configuración.",
      },
    },
    {
      title: "Renderizando el Botón de Inicio de Sesión",
      description:
        "Renderiza un botón de inicio de sesión en tu aplicación de React usando Firebase y react-firebaseui.",
      isSelectOrder: true,
      question: {
        questionText:
          "Organiza los pasos para renderizar correctamente un botón de inicio de sesión usando Firebase y react-firebaseui:",
        options: [
          "Importa los módulos necesarios de Firebase",
          "Inicializa Firebase",
          "Configura las opciones de inicio de sesión",
          "Renderiza el botón de inicio de sesión",
        ],
        answer: [
          "Importa los módulos necesarios de Firebase",
          "Inicializa Firebase",
          "Configura las opciones de inicio de sesión",
          "Renderiza el botón de inicio de sesión",
        ],
      },
    },
    {
      title: "Mostrando Datos del Usuario",
      description:
        "Usa useEffect para mostrar los datos del usuario cuando inicien sesión.",
      isCode: true,
      question: {
        questionText:
          "Escribe el código para mostrar los datos del usuario usando el hook useEffect cuando inicien sesión.",
      },
    },
    {
      title: "Creando un Componente de Encabezado",
      description:
        "Crea un componente de encabezado para mostrar la información del usuario basada en su estado de inicio de sesión.",
      isMultipleChoice: true,
      question: {
        questionText:
          "¿Cuál de las siguientes opciones describe mejor un componente de encabezado?",
        options: [
          "Un componente que gestiona el estado de la aplicación",
          "Un componente que muestra información en la parte superior de la página",
          "Un componente que maneja la autenticación de usuarios",
          "Un componente que gestiona las solicitudes a la API",
        ],
        answer:
          "Un componente que muestra información en la parte superior de la página",
      },
    },
    {
      title: "Actualizando el Perfil del Usuario",
      description:
        "Actualiza la información del perfil del usuario en tu base de datos de Firebase.",
      isCode: true,
      question: {
        questionText:
          "Escribe el código para actualizar la información del perfil del usuario en Firebase Firestore.",
      },
    },
    {
      title: "Desplegando el Código Actualizado",
      description:
        "Despliega tu aplicación actualizada con autenticación de Firebase y visualización de datos de usuario.",
      isTerminal: true,
      question: {
        questionText:
          "Usa la terminal para construir y desplegar tu aplicación actualizada. ¿Qué comandos usas?",
      },
    },
    {
      title: "Resumen y Revisión",
      description:
        "Revisa los pasos tomados para construir y desplegar tu aplicación completa.",
      isText: true,
      question: {
        questionText:
          "Resume los pasos clave tomados para construir y desplegar tu aplicación usando React y Firebase.",
      },
    },
    {
      title: "Introducción a GitHub",
      description:
        "Aprende sobre el uso de GitHub para colaborar con otros desarrolladores.",
      isMultipleChoice: true,
      question: {
        questionText:
          "¿Cuál de los siguientes comandos se utiliza para clonar un repositorio en GitHub?",
        options: ["git commit", "git clone", "git push", "git pull"],
        answer: "git clone",
      },
    },
    {
      title: "Usando Comandos de GitHub",
      description:
        "Aprende los comandos básicos de GitHub para gestionar tu código.",
      isSelectOrder: true,
      question: {
        questionText:
          "Organiza los siguientes comandos de Git en el orden correcto para realizar cambios en un repositorio:",
        options: [
          "git add .",
          "git commit -m 'mensaje'",
          "git push",
          "git pull",
        ],
        answer: [
          "git add .",
          "git commit -m 'mensaje'",
          "git push",
          "git pull",
        ],
      },
    },
    {
      title: "Introducción a Estructuras de Datos y Algoritmos",
      description:
        "Entiende la importancia y los desafíos de aprender estructuras de datos y algoritmos.",
      isText: true,
      question: {
        questionText:
          "¿Por qué las estructuras de datos y algoritmos a menudo alejan a las personas de la informática?",
      },
    },
    {
      title: "Lenguajes de Programación y Tecnología de Autocorrección",
      description:
        "Explora cómo funcionan los lenguajes de programación y cómo las computadoras entienden el código.",
      isText: true,
      question: {
        questionText:
          "¿Cómo funciona la tecnología de autocorrección y cómo las computadoras entienden el código?",
      },
    },
    {
      title: "Tokens en el Código",
      description:
        "Desglosa el código en tokens para entender cómo las computadoras interpretan la información.",
      isCode: true,
      question: {
        questionText:
          'Enumera los posibles tokens en el siguiente código: let musician = new Musician("Drake"); let top_song = musician.getTopSong();',
      },
    },
    {
      title: "Descomponiendo Cadenas en Caracteres",
      description:
        "Entiende cómo las cadenas se descomponen en caracteres y luego en código máquina.",
      isCode: true,
      question: {
        questionText:
          'Escribe el código para descomponer la cadena "Drake" en un array de caracteres.',
      },
    },
    {
      title: "Mapeo de Caracteres",
      description: "Mapea caracteres a sus índices correspondientes.",
      isSelectOrder: true,
      question: {
        questionText:
          "Organiza los caracteres de la cadena 'Drake' según sus índices correspondientes:",
        options: ["'D': 0", "'r': 1", "'a': 2", "'k': 3", "'e': 4"],
        answer: ["'D': 0", "'r': 1", "'a': 2", "'k': 3", "'e': 4"],
      },
    },
    {
      title: "Conversión a Binario",
      description: "Convierte caracteres a su representación binaria.",
      isCode: true,
      question: {
        questionText:
          'Escribe la representación binaria para cada carácter en la cadena "Drake".',
      },
    },
    {
      title: "Entendiendo las Estructuras de Datos",
      description:
        "Aprende cómo las estructuras de datos almacenan y hacen referencia a la información.",
      isText: true,
      question: {
        questionText:
          "¿Por qué es importante entender cómo las computadoras reservan espacio y crean direcciones para referenciar la información?",
      },
    },
    {
      title: "Introducción a las Listas Enlazadas",
      description:
        "Aprende sobre los conceptos básicos de las listas enlazadas.",
      isMultipleChoice: true,
      question: {
        questionText:
          "¿Cuál de las siguientes opciones describe mejor una lista enlazada?",
        options: [
          "Una estructura de datos donde cada elemento apunta al siguiente",
          "Una base de datos que almacena grandes cantidades de información",
          "Un algoritmo que ordena datos en orden ascendente",
          "Un conjunto de elementos que se almacenan en una matriz",
        ],
        answer:
          "Una estructura de datos donde cada elemento apunta al siguiente",
      },
    },
    {
      title: "Construyendo una Lista Enlazada",
      description: "Construye una lista enlazada simple en JavaScript.",
      isCode: true,
      question: {
        questionText:
          'Escribe el código de JavaScript para crear una lista enlazada con los siguientes valores: "meta", "instagram", "reels".',
      },
    },
    {
      title: "Algoritmo de Búsqueda en Profundidad",
      description:
        "Entiende e implementa un algoritmo de búsqueda en profundidad.",
      isSelectOrder: true,
      question: {
        questionText:
          "Organiza los pasos para implementar correctamente un algoritmo de búsqueda en profundidad:",
        options: [
          "Visita el nodo raíz",
          "Procesa el nodo",
          "Visita recursivamente cada nodo hijo",
          "Retrocede cuando sea necesario",
        ],
        answer: [
          "Visita el nodo raíz",
          "Procesa el nodo",
          "Visita recursivamente cada nodo hijo",
          "Retrocede cuando sea necesario",
        ],
      },
    },
    {
      title: "Creando una Estructura de Árbol",
      description:
        "Construye una estructura de árbol simple para practicar la búsqueda en profundidad.",
      isCode: true,
      question: {
        questionText:
          "Escribe el código de JavaScript para crear la siguiente estructura de árbol: { alphabet: { google: { chrome: true } }, meta: { facebook: { threads: null } } }",
      },
    },
    {
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
      title: "Revirtiendo una Lista Enlazada",
      description: "Invierte la dirección de una lista enlazada.",
      isCode: true,
      question: {
        questionText:
          "Escribe el código para invertir una lista enlazada en JavaScript.",
      },
    },
    {
      title: "Entendiendo Búsqueda en Profundidad y Búsqueda en Anchura",
      description:
        "Aprende las diferencias entre búsqueda en profundidad y búsqueda en anchura.",
      isText: true,
      question: {
        questionText:
          "Explica la diferencia entre los algoritmos de búsqueda en profundidad y búsqueda en anchura.",
      },
    },
    {
      title: "Aplicación de Búsqueda en Profundidad",
      description: "Aplica la búsqueda en profundidad a un ejemplo práctico.",
      isCode: true,
      question: {
        questionText:
          "Escribe un algoritmo de búsqueda en profundidad para encontrar un valor específico en una estructura de árbol.",
      },
    },
    {
      title: "Optimización de Algoritmos",
      description:
        "Explora maneras de optimizar algoritmos para un mejor rendimiento.",
      isSelectOrder: true,
      question: {
        questionText:
          "Organiza las siguientes técnicas de optimización de algoritmos en el orden en que generalmente se implementan:",
        options: [
          "Eliminar cálculos redundantes",
          "Optimizar bucles anidados",
          "Minimizar las operaciones en tiempo de ejecución",
          "Utilizar estructuras de datos adecuadas",
        ],
        answer: [
          "Eliminar cálculos redundantes",
          "Optimizar bucles anidados",
          "Minimizar las operaciones en tiempo de ejecución",
          "Utilizar estructuras de datos adecuadas",
        ],
      },
    },
    {
      title: "Implementación de la Clase Lista Enlazada",
      description: "Implementa las clases LinkedList y ListItem en JavaScript.",
      isMultipleChoice: true,
      question: {
        questionText:
          "¿Qué método se utilizaría para agregar un nuevo elemento al final de una lista enlazada?",
        options: ["addAtIndex()", "append()", "insert()", "push()"],
        answer: "append()",
      },
    },
    {
      title: "Aplicación Práctica de Lista Enlazada",
      description: "Aplica la clase LinkedList a un escenario del mundo real.",
      isCode: true,
      question: {
        questionText:
          "Escribe el código para crear una lista enlazada de departamentos de la empresa y recorrerla.",
      },
    },
    {
      title: "Explorando el Problema de las N-Reinas",
      description: "Entiende el problema de las N-Reinas y su complejidad.",
      isText: true,
      question: {
        questionText:
          "¿Qué es el problema de las N-Reinas y por qué se considera complejo?",
      },
    },
    {
      title: "Implementando Backtracking",
      description:
        "Implementa un algoritmo de backtracking para resolver un problema.",
      isCode: true,
      question: {
        questionText:
          "Escribe un algoritmo de backtracking para resolver el problema de las N-Reinas para un tablero de 4x4.",
      },
    },
  ],
};
