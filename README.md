# NLWValoriza - NextLevelWeek #6 - NodeJS
![Node](https://github.com/MikeCodesDotNET/ColoredBadges/blob/master/svg/dev/frameworks/nodejs.svg)

## Description
  The project NLWValoriza consists in an application to make compliments between them users. It's an API to provide the user login and register, the register of new compliments, compliments sended from one user to another, and more. All these routes in the API has a authorization method (based in JWT Auth and 'admin' logic).
  This application was developed in a programming week proposed by [Rocketseat](https://rocketseat.com.br/) called NLW (Next Level Week) in his 6th edition.


# Index

- [Installation and running](#instalation)
- [Project Routes](#project-routes)
- [Challenges Proposed](#challenges-proposed)
- [My Annotations](https://github.com/joseaugusto0/NLW6_NodeJS/tree/main/annotations)


## Installation and running
- Clone all the repository quoted in [NLW6_NodeJS Repository](https://github.com/joseaugusto0/NLW6_NodeJS)

- Open VS Code in *nlwValoriza/* folder

- Install all dependencies used in application with yarn
```
    yarn install
```

-   Run the application
```
    yarn dev
```

## Project Routes
NLWValoriza is composed basically by seven routes:

### 1 - localhost:3000/login - POST
This route get two parameters sent in request:
-   Email
-   Password

Will check if email and password exists in one register in our DB. If exists, returns a token on response to user.

### 2 - localhost:3000/users - POST
This route get four parameters sent in request:
-   Name
-   Email
-   Admin (default value = **false**)
-   Password (this value will be encrypted before inserted into DB)

This route will get the parameters in request body, register the new user in our SQLite DB, and return an user object (which contains all information passed). But to register a new user, you need to do this with a valid token, rescued just in a valid login. Therefore, just a registered user can register new users.

### 3 - localhost:3000/users - GET
This route will list all users registered in DB. Delicated informations, like password, was removed from this user listing. This route counts with a token validation (got in login route).

### 4 - localhost:3000/users/compliments/send - GET
This route will list all compliments sent by the user (using the user id passed in token value, got in login route).This route counts with a token validation (got in login route).

### 5 - /users/compliments/receive - GET
This route will return a list with all user compliments received (using the user id passed in token value, got in login route too). This route counts with a token validation (got in login route).

### 6 - localhost:3000/tags - POST
This route get one parameter sent in request:
-   Tag Name

When requested this route, the application will check if that tag passed already exists and if isn't a nullable value. If is a valid tag name, will be saved in the DB and return a response with the object which contains our tag informations. This route cont with a token validation (got in login route) and will check if the user logged is a admin user and will check if the user logged is a admin user.

### 6 - localhost:3000/tags - GET
This route will return a list with all user tags registered in SQLite DB. This route counts with a token validation (got in login route) and will check if the user logged is a admin user..

### 7 - localhost:3000/compliment - POST
This route get four parameter sent in request:
-   Tag ID
-   User_sender ID (This will be taken automatically in ID contained in token validation)
-   User_Receiver ID 
-   Message

Basically, that route made the main function in our application: Enable the exchange of compliments between different users. This route counts with a token validation (got in login route).



## Challenges Proposed
At the final of the programming week, was proposed some changes in the project, some challenges to all the devs who followed the classes. To make it more dinamic, I will put the challenges here as task list and updating according to my development
- [ ] Put the project in a github repository
- [ ] Add an email notification for a user that got a new compliment
- [ ] Put the project in a production (using tools like Heroku)
- [ ] Made a FrontEnd to complement the backend made.
- [ ] Try differents DB's (like MongoDB, MariaDB, MySQL, and more)

### Created by: [José Augusto Coura](https://github.com/joseaugusto0) and [Teacher Daniele Leão](https://github.com/danileao)


