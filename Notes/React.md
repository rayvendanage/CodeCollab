# React

React is a javascript library for building UI elements that users see & interact with

Only used for user interface, does not deal with any server side things

Used for handling the view layer of our app (view(UI) model(data) controller)

Allows us to create web apps that can chnage data without reloading the entire page

Can use React Native to build mobile apps

3 core react concepts: components, props, state

# Component Based Architecture

Items on a UI can be broken down into many small components

React allows you to create reusable components that you can use on many different pages in your application

The structure of componenets stay the same and the content changes from page to page / user to user 

Components allow you to build self-contained, resuable snippets of code 

# Creating Components

In React, components are functions.

A component is a function that returns UI elements. 

In the return statement of a component function you can write JSX

To render compoents to the DOM you can pass the component function as the first parameter in the ReactDOM.render() method 

React components should always be captalized and when refrenced angle brackets should be used (like HTML functions)

ReactDOM.render(<ComponentFunction />, htmlElement)

Components can be nested inside each other just like regular html elements 


# Syntax

Targeting specific elements

    const elementName = document.getElementById("ID_of_target_element")

Creating a react component

    function ComponentName(){
        return (JSX_Code)
    }

Rendering component to the DOM

    ReactDOM.render(<ComponentFunction />, htmlElement)

Exporting a component 

    export default ComponentName

Importing a component 

    import Componentame from "file_path"

Nesting Components

    function Component1(){
        return (jsx)
    }

    function Component2(){
        return (
            <div>
                <Component1></Component1>
            </div>
        )
    }

Passing props to components

    <ComponentName propName = "value"></ComponentName>

Accessing props in function components 
    {props.propName}

Accessing props in class components

    {this.props.propName}

Accessing all properties of an html element and adding your own custom props

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
    propName: datatype;
    propNsame?: datatype;
}


# Example

<script type="text/jsx">

    const app = document.getElementById("app")

    function Header() {
    return <h1>Develop. Preview. Ship. 🚀</h1>;
    }

    ReactDOM.render(<Header />, app);

</script>

# Example - nesting header component in a homepage component

function Header() {
  return <h1>Develop. Preview. Ship. 🚀</h1>;
}

function HomePage() {
  return (
    <div>
      {/* Nesting the Header component */}
      <Header></Header>
    </div>
  );
}

ReactDOM.render(<HomePage />, app);

# Functional vs Class Components 

Functiomal components are javascript functions that accept properties (props) as arguments and returns html in the form of jsx to be rendered on the UI

Class components are js classes that extend react's component class and must contain a render method that return jsx

Class components can be used to represent large components with many nested components such as pages

import {Component} from "react"

class ComponentName extends React.Component{
    render(){
        return jsx
    }
}

# JSX
React uses a special syntac called JSX which allows you to mix HTML with JS

You can embedd any javascript code in html as long as its in curly braces {}

You can call functions, do mathmatical equations, display variables, ect

Note: Browsers do not understand JSX, so you need a JavaScript compiler, such as Babel, to transform your JSX code into regular JavaScript

# Rest & Spread Operator 

...rest wraps all attributes you pass as an array 

...rest can be used to spread all props

# Props

You can design component functions that accept custom arguments that change the component's behavior when its rendered.

These are simular to html attributes

Props can be passed down from parent components to child components

You can pass custom props to your components in the jsx code just as you would pass html attributes

 <ComponentName propName = "value"></ComponentName>

 In the component function it can accept props as function parameters

 1. Using the props keyword as a parameter you can access all the properties from the props object 

    function componentName(props){
        return <h1> {props.propName} </h1>
    }

2. You can also use object destructuring to get the exact properties you want 

    function componentName({propName}){
        return <h1> {propName} </h1>
    }

Props are immmutable 

# Iterating through lists 

If you need UI elements that are identical in style but hold different information you can utilize array methods

Create an array contianing the infromation you need to be displayed as a list 

Use the array.map() method to iterate over the array

    the map method runs a function for each element in an array and returns a new array of the results

    In the function you have access to the element, the index, and the array 

Example: The map method is used here on the names array and creates a new array of <li> elements (one for each name in the array names)

function HomePage() {
  const names = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'];

  return (
    <div>
      <Header title="Develop. Preview. Ship. 🚀" />
      <ul>
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  );
}

Note: When using arrays React requires a unique key prop so it knows which elements to update in the DOM 

# Children

Children in react are anything between your opening and closing tags of a custom component 

It is saved in a prop called children 

children are of type React.ReactNode

ex. 

<ButtonComponent>>click me</ButtonComponent>
"click me" is saved in a prop called children that can be passed as a parameter to a function component 


# Interfaces

Interfaces in typescrpt are used to define datatypes and in react the props specifically

interface ButtonProps{
    text: string;
    count: number;
    children: React.ReactNode;
}

you can also use type

type color = "red" | "blue"

type color = string

type ButtonProps = {
    text: string;
    count: number;
    children: React.ReactNode;
}

# Hooks

hooks are functions that always start with use

only usable at the top level of a function component 

you cannot put useState in an if statement

have to always be called in the exact same order

Any data that changes in the application is called state 

useState is used to handle reactive data so that the latest changes are reflected in the UI

pass the defult state to the useState value and it will return an array of 2 values
 [state, function that allows you to update the current state]

the first is the state value
the second is a function to update the value (customary to name the update function set followeed by the same of the state variable you are updating)

    const [likes, setLikes] = React.useState(0);

you can define a function to update the state and call the function returned by useState to update the state 

when you set the state the component rerenders 

note: when using the previous value to update the state always pass a function to the set function 

when using objects in state useState overwrites the object so you have to remember to spread (...prevState) if only updating certain properties in the object 

function HomePage() {
  // ...
  const [likes, setLikes] = React.useState(0);

  function handleClick() {
    setLikes(likes + 1);
  }

  return (
    <div>
      {/* ... */}
      <button onClick={handleClick}>Likes ({likes})</button>
    </div>
  );
}


# State

State can be passed from parent to child components as props



# Listening to Events

In React there are events you can use to responcd to user interaction 

onClick
onChange
onSubmit

you can define functions to handle events whenever they are triggered and call the function when the an event happens

function HomePage() {
  //    ...
  function handleClick() {
    console.log('increment like count');
  }

  return (
    <div>
      {/* ... */}
      <button onClick={handleClick}>Like</button>
    </div>
  );
}

# Object destrusturing 

Destructuring is to take an object or an array and convert it into smaller objects, or smaller elements, or smaller variables

If a function takes in an object as a argument you can use curly braces and inside list the object properties needed for the method. you can also set defaults.

    function componentName({prop1, prop2 = default, prop3: newName}){
        return <h1>prop1</h1>
    }

# Template literal

function Header({ title }) {
  return <h1>{`Cool ${title}`}</h1>;
}

# Ternary Operators

A shorter if/else statement 

result = if statement ? true result : false result

# Generics 

Specifying a relationship between the parameter datatype and the return datatype

ex: the folllowing function should return an array of whatever datatype the value passed in was (T)

function funcName<T>(oaramName: T): T[]{
    return[paramName];
}

You can also use generics to define the relationship between prop values 

ex:

type ButtonProps<T> = {
    count: T;
    countHistory: T[];
}

export default function Button<T>({
    count, countHistory,
    }:ButtonProps<T>){
        return <button></button>
    }



# Declarative Programming vs Imperative programming 
 
React allows us to speed up the process with a delarative programming (instead of writing DOM methods allows developers to declare "what" they want to happen to the UI instead of writing out all the steps "how" to update it becuase react will figure out how to update the DOM on your behalf)

Instead of directly manupulating the DOM with plain JavaScript, you can use the ReactDOM.render() method from react-dom to tell react to render an <h1> title inside our #app element

React jsx code (Declarative)

<script type="text/jsx">
  const app = document.getElementById("app")
  ReactDOM.render(<h1>Develop. Preview. Ship. 🚀</h1>, app)
</script>

Plain JavaScript code (Imperative)

<script type="text/javascript">
  const app = document.getElementById('app');
  const header = document.createElement('h1');
  const headerContent = document.createTextNode('Develop. Preview. Ship. 🚀');
  header.appendChild(headerContent);
  app.appendChild(header);
</script>

# Project files 

Package.json File - contains scrips for running application , software / libraries dependencies that we need for our application 

node_modules Folder - houses the actual dependencies (Files) for the the libraries that we install (they are just names in the package.json but the real code that supports them are in node_modiles)

lib - library folder can define types used in many components 

# App Folder

Every component and page we create inside the app folder is a server component by default 

You have to explicitly state client components 

