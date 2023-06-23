# schoolspace 

##### school management system

This is the front end project built using the React framework.
Requires backend : [schoolspace](https://github.com/duttasamd/schoolspace)

Requirements :
> - node

Install git.
Clone repository into a folder.

###### Rest of the requirements will be installed through package.json

#### Setup steps for local development:
1. Setup the schoolspace backend project.
In the project root:
2. `npm install`
3. If `.env` file is not present, create it.
  * Make sure it has:
    ```
    REACT_APP_NAME=schoolspace
    REACT_APP_SCHOOLSPACE_API_URL=http://localhost:5000/api/v1
    ```
    
##### That's it. You are all set.

Run `npm start` to serve the API project. Default endpoint: `http://localhost:3000`


### FOR DEVELOPERS

#### Conventions

1. Component/Renderable Function Names : `PascalCase [.jsx]`
2. Local Functions/ Instance Functions : `camelCase`
3. css/js files : `flatcase` [Exception : `App.css`, `Services/*.js`]
4. Constants : `CONSTANT_CASE`


Folders for each user type.  
Main screen files directly inside.  
Subfolders for Major Sub-Screens Types for the user type.

5. HTML/JS/CSS naming :
  * ids : `camelCase` [Start with the type of component. | TextBox id that accepts first name = `txtFirstName`]
  * classes : `flatcase` or `snake_case` [try to use classes that describe the css effects. Not the type of element. | centers element in flexbox = `flexcenter`]
  * vars : `camelCase` or `flatcase`. Explicit naming.
