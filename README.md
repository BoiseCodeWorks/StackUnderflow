StackUnderflow
==============
![stackunderflow](stackunderflow-logo.png)
Good Questions are hard to come by.... and their answers even more so.

### Goals
As your client I am requesting you to build me an application that will be the next best thing since sliced bread. In this app users can view questions and responses sorted by categories. Users will have to login to post questions and reviews. Only the person who created a question can mark the question as resolved by selecting a response to that question. Only one response can be marked as the solution to a question. 

### The Setup
This client side of this app is currently a simple testing tool that will test the appropriate configuration of the server and its `api endpoints`. You will be able to access these tests by starting up your server and navigating to `https://localhost:5001/#/tests`

Utilizing the test client you will know if you have been able to complete the required tasks of this checkpoint.

Basic Interfaces have been provided and the first test is currently passing as a proof of concept however you will be responsible for setting up an actual database and ensuring all tests pass with persistent data.

### Business Rules 
The requirements for this app are as follows

- Users can view questions and responses without being logged in
- Users can create question and response when logged in
- Only the creator of content can edit that content
- Once a response is marked as the answer to a question it can no longer be edited
- Questions can be tagged with any number of categories
- Categories can be created by users
- Duplicate categories are prohibited
- Questions can be retrieved by category name

### Coding Standards
Your boss is a stickler for quality code and is expecting the server to be written following the MVC Standards practiced in Dotnet. Keeping this in mind you will need to build out the application structure.

All of the business rules for this server need to be validated inside of the appropriate service and failure to pass a validation should throw Exceptions. 

The client has been setup to handle different status codes and may fail to pass some tests if your server replies with `200 Ok` instead of the intended `400 BadRequest`

> All Business rules must be handled solely in the service layer!

## Requirements

### Functionality
- Questions support basic CRUD
- Responses support basic CRUD
  - UPDATE/DELETE is not allowed Once response has been marked as an answer
- Categories support basic CRUD
  - UPDATE/DELETE is not allowed if there are Questions in this category
- Questions can have a response marked as the solution
- Only the user who created
- Only the user who creates content can edit or delete that content
-  Dates are added to the interfaces and models and only set by the Server when the appropriate requests are issued
- Proper File and Folder structuring is followed
- RESTful API Conventions are followed as described above
- All business rules described above are implemented
- All tests pass
