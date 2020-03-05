This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Available Scripts

In the project directory, you can run:

## `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## `yarn test`

Launches the test runner in the interactive watch mode. 
Tests in this repo are just a sample. I have described my testing approach in the section [below](#testing-approach).

## `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

# Architecture approach

I have used react-final-form to build this application. React final form provides functionality like state management, validation, submission, subscription etc. 
For this application I decided to not use Redux to manage form state as it will add lot of overload to the application. For more complex application it will be a better approach to use Redux for application state management.

For styling of the application, I have used bootstrap's compiled css. Based on the scale and complexity of any application, we can choose to write our own styles utlisiing the power of Sass. 
There are other options like css-in-js, Emotions, Styled Components; which will provide more control and modularity to the application styling.  

# Known issues

Autolookup fields (`userLookup`, `firstName` and `lastName`) are sort of stateless components, they have there own state. Thus validations are not enabled for those 3 fields. 
In a production ready app, I will manage the state and enable these fields to add to the form state before submitting.

Form submission will require CORS plugin and will not work from localhost unless we add some browser extention to enable CORS requests. 

Webhook.site url is temporary, it needs to be replaced with a working URL form webhook.site to test form submission functionality.

# Testing approach

I will use [Jest](https://jestjs.io/) for snapshot testing for visual elements of the application and use [Cypress](https://www.cypress.io/) for end to end testing of functionality.

Utils functions like `jsonGet` and `jsonPost` are ideal candidates for end to end test cases. Whereas visual elements link `SimpleTextInput`, `buttons` are more suited for unit and snapshot testing purposes.