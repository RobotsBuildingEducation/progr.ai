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
      isTerminal: true,
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
        questionText:
          "What are the four main concepts we covered in lesson one?",
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
      description:
        "Explore ways to optimize algorithms for better performance.",
      isText: true,
      question: {
        questionText:
          "What are some common techniques used to optimize algorithms for better performance?",
      },
    },
    {
      title: "Linked List Class Implementation",
      description:
        "Implement the LinkedList and ListItem classes in JavaScript.",
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
        "En este paso, aprenderás sobre el objetivo principal de la programación.",
      isText: true,
      question: {
        questionText: "¿Cuál es el objetivo principal de la programación?",
      },
    },
    {
      title: "Entendiendo la Lógica en la Programación",
      description:
        "En este paso, aprenderás sobre la lógica en el contexto de la programación.",
      isText: true,
      // isCode: true,
      // isTerminal: true,
      question: {
        questionText: "¿Qué es la lógica en el contexto de la programación?",
      },
    },
    {
      title: "Introducción a las Variables",
      description:
        "En este paso, aprenderás sobre las variables y cómo usarlas en tu código.",
      isText: true,
      question: {
        questionText: "Define una variable con tus propias palabras.",
      },
    },
    {
      title: "Declarando Variables en JavaScript",
      description:
        "En este paso, aprenderás cómo declarar una variable en JavaScript.",
      isCode: true,
      isTerminal: false,
      question: {
        questionText: "¿Cómo declaras una variable en JavaScript?",
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
      isCode: true,
      isTerminal: false,
      question: {
        questionText: "¿Cómo creas una instancia de una clase en JavaScript?",
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
      isText: true,
      question: {
        questionText:
          "Explica el papel de la palabra clave `this` dentro de un método de clase.",
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
      isCode: true,
      isTerminal: false,
      question: {
        questionText:
          "Crea una instancia de la clase `Car` y accede a su propiedad `make`.",
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
      isCode: true,
      isTerminal: false,
      question: {
        questionText:
          "Sobrescribe el método `displayDetails` en la clase `ElectricCar` para incluir `batteryLife`.",
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
      isCode: true,
      isTerminal: false,
      question: {
        questionText:
          "Crea un array de objetos `Car` e itera a través de él usando un bucle para imprimir los detalles de cada coche.",
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
        questionText: "Escribe un comando usando la línea de comandos.",
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
      isText: true,
      question: {
        questionText: "¿Qué es un componente de React?",
      },
    },
    {
      title: "Entendiendo los Hooks de React",
      description:
        "En este paso, aprenderás sobre los hooks de React y cómo se utilizan para gestionar el estado y los efectos secundarios en componentes funcionales.",
      isText: true,
      question: {
        questionText: "¿Qué es un hook en React y por qué es útil?",
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
      isCode: true,
      isTerminal: false,
      question: {
        questionText: `Agrega un manejador de eventos al botón de "me gusta" que actualice el estado de "liked" cuando se haga clic.`,
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
      isTerminal: true,
      question: {
        questionText: `Usa la terminal para crear un nuevo proyecto de React llamado "tweet-app" usando Create React App.`,
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
      isCode: true,
      isTerminal: false,
      question: {
        questionText: `Actualiza el componente Tweet para usar Flexbox en la disposición de la información del usuario y el contenido del tweet.`,
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
      isCode: true,
      isTerminal: false,
      question: {
        questionText: `Actualiza el componente Tweet para recibir los datos iniciales del tweet como props y gestionar los conteos de "me gusta" y retweets como estado.`,
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
      isCode: true,
      isTerminal: false,
      question: {
        questionText: `Actualiza el componente Tweet para recuperar datos del tweet de una API cuando el componente se monte usando el hook useEffect.`,
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
      isText: true,
      question: {
        questionText:
          "Enumera las lecciones principales cubiertas en el curso de ingeniería backend.",
      },
    },
    {
      title: "Relacionando Backend con el Mundo Real",
      description:
        "En este paso, relacionarás las operaciones de una cocina en un restaurante con la ingeniería backend.",
      isText: true,
      question: {
        questionText:
          "¿Cómo podemos relacionar las operaciones de una cocina en un restaurante con la ingeniería backend?",
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
      isTerminal: true,
      question: {
        questionText:
          "Usa la terminal para navegar a un directorio llamado `backend_project`.",
      },
    },
    {
      title: "Creando el Concepto de Usuarios",
      description:
        "En este paso, entenderás el concepto de crear usuarios en sistemas backend.",
      isText: true,
      question: {
        questionText:
          "¿Cuál es el proceso de crear usuarios en un sistema backend?",
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
      isText: true,
      question: {
        questionText: "¿Qué son las nubes backend y por qué son importantes?",
      },
    },
    {
      title: "Conectando Sistemas",
      description:
        "En este paso, aprenderás cómo conectar diferentes sistemas en un entorno backend.",
      isText: true,
      question: {
        questionText:
          "¿Cómo conectas diferentes sistemas en un entorno backend?",
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
      isText: true,
      question: {
        questionText:
          "Explica el concepto de pares clave-valor en bases de datos no relacionales.",
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
      isText: true,
      question: {
        questionText:
          "¿Qué son los servidores de autorización y cómo funcionan?",
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
      isCode: true,
      question: {
        questionText:
          "Escribe un fragmento de código para crear un endpoint de REST API que recupere datos de usuario.",
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
      isCode: true,
      question: {
        questionText:
          "Escribe un fragmento de código para crear un sistema de autenticación de usuario usando JWT en Node.js.",
      },
    },
    {
      title: "Desplegando una Aplicación Backend",
      description:
        "En este paso, aprenderás cómo desplegar una aplicación backend a un servicio en la nube.",
      isCode: true,
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
      isTerminal: true,
      question: {
        questionText:
          "Usa la terminal para crear una nueva carpeta llamada 'La Frontera Digital'.",
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
      isText: true,
      question: {
        questionText: "¿Cómo abres la terminal en VSCode?",
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
      isTerminal: true,
      question: {
        questionText:
          "Navega a tu carpeta de proyecto e instala las dependencias usando npm. ¿Qué comando usas?",
      },
    },
    {
      title: "Ejecutando la Aplicación de React",
      description: "Ejecuta tu aplicación de React en modo de desarrollo.",
      isTerminal: true,
      question: {
        questionText:
          "Usa la terminal para construir y ejecutar tu aplicación de React. ¿Qué comandos usas?",
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
      isTerminal: true,
      question: {
        questionText:
          "Usa la terminal para inicializar Firebase y autenticar tu cuenta. ¿Qué comando usas?",
      },
    },
    {
      title: "Activando Servicios de Firebase",
      description:
        "Activa la autenticación, Firestore y servicios de alojamiento en Firebase.",
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
      isTerminal: true,
      question: {
        questionText:
          "Usa la terminal para instalar Firebase y react-firebaseui. ¿Qué comando usas?",
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
      isCode: true,
      question: {
        questionText:
          "Escribe el código para renderizar un botón de inicio de sesión usando Firebase y react-firebaseui.",
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
      isCode: true,
      question: {
        questionText:
          "Escribe el código para un componente de encabezado que muestre contenido diferente basado en si el usuario ha iniciado sesión.",
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
      isText: true,
      question: {
        questionText:
          "¿Qué es GitHub y por qué es importante para los desarrolladores?",
      },
    },
    {
      title: "Usando Comandos de GitHub",
      description:
        "Aprende los comandos básicos de GitHub para gestionar tu código.",
      isText: true,
      question: {
        questionText:
          "Enumera y describe los comandos básicos de GitHub para gestionar tu código.",
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
      isCode: true,
      question: {
        questionText:
          'Escribe un objeto de JavaScript que mapee los caracteres de la cadena "Drake" a sus índices correspondientes.',
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
      isText: true,
      question: {
        questionText:
          "¿Qué son las listas enlazadas y por qué son importantes para entender estructuras de datos más avanzadas como árboles y grafos?",
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
      isCode: true,
      question: {
        questionText:
          "Escribe un algoritmo de búsqueda en profundidad en JavaScript que cuente el número de ubicaciones nulas en un árbol.",
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
      isText: true,
      question: {
        questionText:
          "¿Cuáles son algunas técnicas comunes utilizadas para optimizar algoritmos para un mejor rendimiento?",
      },
    },
    {
      title: "Implementación de la Clase Lista Enlazada",
      description: "Implementa las clases LinkedList y ListItem en JavaScript.",
      isCode: true,
      question: {
        questionText:
          "Escribe el código de JavaScript para implementar las clases LinkedList y ListItem.",
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
