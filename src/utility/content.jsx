export const steps = [
  {
    title: "Welcome to the Program AI App!",
    description:
      "Press 'Let's start' to begin your journey in learning how to code.",
  },
  {
    title: "Understanding the Goal of Coding",
    description:
      "In this step, you will learn about the primary goal of coding or programming.",
    isText: true,
    question: {
      questionText: "What is the primary goal of coding or programming?",
    },
  },
  {
    title: "Understanding Logic in Programming",
    description:
      "In this step, you will learn about logic in the context of programming.",
    isText: true,
    question: {
      questionText: "What is logic in the context of programming?",
    },
  },
  {
    title: "Introduction to Variables",
    description:
      "In this step, you will learn about variables and how to use them in your code.",
    isText: true,
    question: {
      questionText: "Define a variable in your own words.",
    },
  },
  {
    title: "Declaring Variables in JavaScript",
    description:
      "In this step, you will learn how to declare a variable in JavaScript.",
    isCode: true,
    isTerminal: false,
    question: {
      questionText: "How do you declare a variable in JavaScript?",
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
    isCode: true,
    isTerminal: false,
    question: {
      questionText: "How do you create an instance of a class in JavaScript?",
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
    isText: true,
    question: {
      questionText:
        "Explain the role of the `this` keyword inside a class method.",
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
    isCode: true,
    isTerminal: false,
    question: {
      questionText:
        "Create an instance of the `Car` class and access its `make` property.",
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
    isCode: true,
    isTerminal: false,
    question: {
      questionText:
        "Override the `displayDetails` method in the `ElectricCar` class to include `batteryLife`.",
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
    isCode: true,
    isTerminal: false,
    question: {
      questionText:
        "Create an array of `Car` objects and iterate through it using a loop to print the details of each car.",
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
      questionText: "What are the four main concepts we covered in lesson one?",
    },
  },
  {
    title: "Introduction to React Components",
    description:
      "In this step, you will learn about React components and their importance in creating user interfaces.",
    isText: true,
    question: {
      questionText: "What is a React component?",
    },
  },
  {
    title: "Understanding React Hooks",
    description:
      "In this step, you will learn about React hooks and how they are used to manage state and side effects in functional components.",
    isText: true,
    question: {
      questionText: "What is a hook in React and why is it useful?",
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
    isCode: true,
    isTerminal: false,
    question: {
      questionText: `Add an event handler to the like button that updates the liked state when clicked.`,
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
    isTerminal: true,
    question: {
      questionText: `Use the terminal to create a new React project named "tweet-app" using Create React App.`,
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
    isCode: true,
    isTerminal: false,
    question: {
      questionText: `Update the Tweet component to use Flexbox for laying out the user information and tweet content.`,
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
    isCode: true,
    isTerminal: false,
    question: {
      questionText: `Update the Tweet component to receive the initial tweet data as props and manage the like and retweet counts as state.`,
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
    isCode: true,
    isTerminal: false,
    question: {
      questionText: `Update the Tweet component to fetch tweet data from an API when the component mounts using the useEffect hook.`,
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
    isText: true,
    question: {
      questionText:
        "List the main lessons covered in the backend engineering course.",
    },
  },
  {
    title: "Relating Backend to Real World",
    description:
      "In this step, you will relate the operations of a kitchen in a restaurant to backend engineering.",
    isText: true,
    question: {
      questionText:
        "How can we relate the operations of a kitchen in a restaurant to backend engineering?",
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
    isTerminal: true,
    question: {
      questionText:
        "Use the terminal to navigate to a directory named `backend_project`.",
    },
  },
  {
    title: "Creating Users Concept",
    description:
      "In this step, you will understand the concept of creating users in backend systems.",
    isText: true,
    question: {
      questionText:
        "What is the process of creating users in a backend system?",
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
    isText: true,
    question: {
      questionText: "What are backend clouds and why are they important?",
    },
  },
  {
    title: "Connecting Systems",
    description:
      "In this step, you will learn how to connect different systems in a backend environment.",
    isText: true,
    question: {
      questionText:
        "How do you connect different systems in a backend environment?",
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
    isText: true,
    question: {
      questionText:
        "Explain the concept of key-value pairs in non-relational databases.",
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
    isText: true,
    question: {
      questionText: "What are authorization servers and how do they work?",
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
    isCode: true,
    question: {
      questionText:
        "Write a code snippet to create a REST API endpoint to retrieve user data.",
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
    isCode: true,
    question: {
      questionText:
        "Write a code snippet to create a user authentication system using JWT in Node.js.",
    },
  },
  {
    title: "Deploying a Backend Application",
    description:
      "In this step, you will learn how to deploy a backend application to a cloud service.",
    isCode: true,
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
    isText: true,
    question: {
      questionText: "Why is VSCode an important tool for developers?",
    },
  },
  {
    title: "Installing Node.js",
    description:
      "Install Node.js, which lets you build JavaScript applications.",
    isText: true,
    question: {
      questionText: "What is the purpose of Node.js in JavaScript development?",
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
    isTerminal: true,
    question: {
      questionText:
        "Use the terminal to create a new folder named 'The Digital Border'.",
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
    isText: true,
    question: {
      questionText: "How do you open the terminal in VSCode?",
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
    isTerminal: true,
    question: {
      questionText:
        "Navigate into your project folder and install dependencies using npm. What command do you use?",
    },
  },
  {
    title: "Running the React Application",
    description: "Run your React application in development mode.",
    isTerminal: true,
    question: {
      questionText:
        "Use the terminal to build and run your React application. What commands do you use?",
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
    isTerminal: true,
    question: {
      questionText:
        "Use the terminal to initialize Firebase and authenticate your account. What command do you use?",
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
    isTerminal: true,
    question: {
      questionText:
        "Use the terminal to install Firebase and react-firebaseui. What command do you use?",
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
    isCode: true,
    question: {
      questionText:
        "Write the code to render a sign-in button using Firebase and react-firebaseui.",
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
    isCode: true,
    question: {
      questionText:
        "Write the code for a header component that displays different content based on whether the user is logged in.",
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
    isText: true,
    question: {
      questionText: "What is GitHub and why is it important for developers?",
    },
  },
  {
    title: "Using GitHub Commands",
    description: "Learn the basic GitHub commands for managing your code.",
    isText: true,
    question: {
      questionText:
        "List and describe the basic GitHub commands for managing your code.",
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
    isText: true,
    question: {
      questionText:
        "How does autocorrect technology work, and how do computers understand code?",
    },
  },
  {
    title: "Tokens in Code",
    description:
      "Break down code into tokens to understand how computers interpret information.",
    isCode: true,
    question: {
      questionText:
        'List the possible tokens in the following code: let musician = new Musician("Drake"); let top_song = musician.getTopSong();',
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
    isCode: true,
    question: {
      questionText:
        'Write a JavaScript object that maps the characters of the string "Drake" to their corresponding indices.',
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
    isText: true,
    question: {
      questionText:
        "What are linked lists, and why are they important for understanding more advanced data structures like trees and graphs?",
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
    isCode: true,
    question: {
      questionText:
        "Write a depth-first search algorithm in JavaScript that counts the number of null locations in a tree.",
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
    isCode: true,
    question: {
      questionText: "Write the code to reverse a linked list in JavaScript.",
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
    isCode: true,
    question: {
      questionText:
        "Write a depth-first search algorithm to find a specific value in a tree structure.",
    },
  },
  {
    title: "Algorithm Optimization",
    description: "Explore ways to optimize algorithms for better performance.",
    isText: true,
    question: {
      questionText:
        "What are some common techniques used to optimize algorithms for better performance?",
    },
  },
  {
    title: "Linked List Class Implementation",
    description: "Implement the LinkedList and ListItem classes in JavaScript.",
    isCode: true,
    question: {
      questionText:
        "Write the JavaScript code to implement the LinkedList and ListItem classes.",
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
    isCode: true,
    question: {
      questionText:
        "Write a backtracking algorithm to solve the N-Queens problem for a 4x4 board.",
    },
  },

  // Add more steps as needed
];
