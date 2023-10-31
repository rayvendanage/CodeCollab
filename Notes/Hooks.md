/* State Mangement 

React apps only rerender when the state changes 
State is the engine that moves your react app
Reacts job is to turn state into HTML
Managing state is very important 
React's native state management is through hooks (useState, useMemo, useEffect)
There are third party libraries that manage state (redux, zustand, react query, react location)

---- useState ----
useState defines that we have state associated with a component
useState is a function that outputs an array [current value of state, function to set state]
the state is coupled with the instance of that component so if you have multiple they will maintian their own state individually 
rerenders all components that use that state

---- useReducer ----
the regular reduce function takes a function and a currentValue as parameters
the function takes current value and index n of an array 

ex. 
const arrayName = [10,20,30]
arrayName.reduce((currentValue, index) => currentValue + index, 0)
the output would be 60

useReducer hook takes in a reducer function that takes in the current state and an action an object of state so multiple state values can be represented 
it returns an array containing the current state object and a disbatch ( a way to invoke the ruducer function)


useReducer hook is an alternative to the useState hook 
they both allow developers to rerender component when state variable is changed

The main difference is that you can alter multiple states at the same time 
you could have two seperate useState fucntions but useReducer lets you do 
it in the same statement by storing them both in a state object

useReducer returns an array with a state object and a dispatch function used to change the state

useReducer takes in a reducer function and the inital value for all the states

The reducer function defines what will happen when you change your states
It takes in the state object and an action object
The action object determines what type of action we are trying to take and what to do with our states

Standard to use a switch statement in the reducer function

To change state in jsx you call dispatch function in onclick attribute
and pass the type of action you want to take  

most useful if changing a lot of state in the same ACTION

ex. 

<button onClick= {() => {dispatch({type:"INCREMENT"})}}></button>

const [state, dispatch] = useReducer(reducer, {count:0, showText:true})

const reducer = (state, action) => {
    switch(action.type){
        case "INCREMENT":
            return {
                count: state.count + 1,
                showText: state.showText
            }
         case "toggleShowText":
            return {
                count: state.count,
                showText: !state.showText
            }
        default:
            return state
    }
}

---- useEffect ----

A function that will be called when the page rerenders
Used to detect when a page rerenders and can specify what you want to detect

useEffect takes in a function that will be executed when the page rerenders
it also takes in an array of states you want to listen to 
when the value of that state changes useeffect will be called
Pages are rerendered when the state is changed so the function will also be called everytime the state has changed
If a different state not passed in the array causes the page to rerender, the useeffect function will not execute
If you pass an empty array, it will only be called when initally rerendered 
Not passing state dependecies will assume useeffect to execute on any state change

usEffect is very helpful with api calls 

---- useRef ----

whenever you take an action in react you are able to focus on an input

useRef is the easiest way to access and manipulate DOM elements

useRef takes in one value and returns a refrence to a dom element 

to get refrence of dom element you have to pass a property inside 
of the element called ref={refName}

you can then access infomation related to that element 
refName.current.value

const inputRef = useRef(null)

<input type="text" ref={inputRef}></input>

---- useLayouEffect ----

Pretty much identical to useEffect but is ran before rendering so, if you want to change the UI before everything finishes running use thus

useEffect sometimes has a delay because it runs after rendering

---- createContext / useContext ----

used for organizing state

the createContext function creates a context 

a context is a collection of states or a collection of info

Any component you want to have access to the context you have to wrap in the context tags

You have to specify the states you want the child components to have access to 
in the value={} property

You can access the state in child components by importing useContext hook from react
and import the context you created

then use the useContext method which takes in the context component and returns the state


-- using context in child component --

const {username, setUsername} = useContext{AppContext}


-- creating context --

export const AppContext = createContext(null);

return(

    <AppContext.provider value={username, setUsername}>
        <Login></Login>
    </AppContext.provider>


)

---- useMemo ----

used to increase efficiency 
 
useMemo function takes in a function and an array of 
state. Function only runs if specific state changes

---- useCallBack ----




*/