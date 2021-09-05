Extra dependencies used in this project --->

1. date-fns: helps us with the date formatting which is really useful for this app since we are using date in quite a lot of places.
2. firebase: For our backend.
3. react-loading-skeleton: The <Skeleton> component is designed to be used directly in your components, in place of content while it's still loading
4. react-router-dom: For routing
5. tailwindcss: for styling

- This app is basically going to be a client side rendered app which is build with react using create-react-app.
  - We are going to use a database which is firebase.(resides in paranoidkoala account of firebase)
  - For styling we are going to be using tailwind.

* Architecture --->

  - src->
    - components
    - constants
    - context
    - helpers
    - hooks
    - lib(firebase is going to live in here)
    - services(firebase functions in here)
    - pages
    - styles (tailwind's folder)-->
      - app
      - tailwind

* Production rules for firebase --->
  rules_version = '2';
  service cloud.firestore {
  match /databases/{database}/documents {
  match /{document=\*\*} {
  allow read;
  allow write: if request.auth.uid != null;
  }
  }
  }

---------------------TAILWIND SETUP------------------------------

- Tailwind css is a css framework which is kind of similar to bootstrap, but thousand times better because it allows us to use utilities. "Utilities" are essentially just class names, but with it we can define signature of our class names.

- npm install tailwindcss --save-dev

In order to setup and work properly with tailwindcss we need some extra packages--->

1. npm install prop-types --save-dev: runtime type checker for react props.

2. npm install postcss --save-dev

3. npm install postcss-cli --save-dev : it is a tool for transforming styles with JS plugins. These plugins can lint our CSS, support variables and mixins, transpite future CSS syntax, inline images and more.

4. npm install npm-run-all --save-dev : used for running multiple npm scripts in parallel or in squential.

5. npm install autoprefixer --save-dev: add vendor prefixes to CSS rules.

- Also update the following lines into the scripts of the package.json-->
  "build:css": "postcss src/styles/tailwind.css -o src/styles/app.css",
  "watch:css": "postcss src/styles/tailwind.css -o src/styles/app.css --watch",
  "react-scripts:start": "sleep 5 && react-scripts start",
  "react-scripts:dist": "react-scripts build",
  "start": "run-p watch:css react-scripts:start",
  "build": "run-s build:css react-scripts:dist",
  "test": "react-scripts test",
  "eject": "react-scripts eject"

* Add a file tailwind.css in the styles folder and add the following rules there -->
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

* app.css file will be auto generated in the styles folder and we need to import that app.css file in the index.js.

* We also need to add postcss.config.js and tailwind.config.js files.

* In the project we have also installed the "Why did you render package" that helps us with to see if there is any unnecessary rendering of components.

* Used "loadtest" to test how much load our site can handle. To check how our site perform while handling 15 requests per second, use the following command -->
  loadtest --rps 15 http://localhost:3000/ 
  ( run it for 3-4 hrs)
