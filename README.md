# 🐈 NyanPaste-React
NyanPaste is a simple web application built using **Express** and **React** that allows users to create, save, and share code snippets with others. It provides a user-friendly interface to write and view code in various programming languages. Users can register, log in, and store their code snippets to access them later.

## Features
- Create and share code snippets.
- Syntax highlighting for various programming languages.
- User registration and login.
- Store code snippets associated with the user account.
- Publicly accessible code snippets.
- A user dashboard to display all snippets by a user

## Getting  Started
To run nyanpaste locally on your machine, you need to have **Node.js** and **npm** installed. You can download them from [here](https://nodejs.org/en/download/). Once you have them installed, follow the steps below to run the application.

1. Clone the repository.

```
git clone https://github.com/NotAdi/nyanpaste-react.git
 ```

2. Install the dependencies.

``` 
npm install
 ```

3. Create a .env file in the root directory and add the following environment variables.

``` 
MONGO_URI= 'Your mongoDB URL"
JWT_SECRET= some secret key
JWT_EXPIRE= 7d
```

4. Run the application.

``` 
npm run dev
 ```

5. Open the application in your browser.

```
http://localhost:3000
 ```


You can also visit the deployed application [here](https://nyanpaste.up.railway.app/) or [here](https://nyanpaste1-adityam0338.b4a.run/) .

## Thanks
A special thanks to [Sayed Ahmed](https://github.com/sayeed205) for helping me with authentication, refactoring and deployment.
