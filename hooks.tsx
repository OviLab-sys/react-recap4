//understanding the effect hook
 
//  explanation => the effect hook is used for component side effects 
// a component side effect is something executed outside the scope of the component such 
// as a web service request. The effect hook is defined using the useEffect function. 
// useEffect contains two parameters 

    // 1. a function that executes the effect; at a minimum , this function runs each time the component is rendered.
    // 2. an optional array of dependencies that cause the effectfunction to rerun when changed.



// THE RULES OF HOOKS

// 1. A hook can only be called at the top level of a function component. So, a hook can't be 
//      called in a loop or in a nested function such as an event handler.

// 2. A hook can't be called conmditionally.
// 3. A hook can only be used in function components and not in class components.


//EXAMPLE WITH A VIOLATION:

export function component1 () {
    function handleClick () {
        useEffect(() => {
            console.log("show effects");
        });
    }
    return <button onClick={handleClick}>Cause effect</button>;
}

// The above code violates the rules of hooks because the useEffect hook is called in a nested function(the handler function)
// rather than at the top level.


// THE CORRECTED VERSION

export function CorrectedComponent1 () {
    const [clicked, setClicked] = useState(false);
    useEffect(()=> {
        if (clicked){
            console.log("some effect")
        }
    }, [clicked]);
    function handleClick() {
        setClicked(true);
    }
    return <button onClick={handleClick}>Cause effect</button>;
}

// in the above corrected function, useEffect has been lifted to the top level and 
// now depends on the clicked statethat is set in the handler function.


//EXAMPLE 2 : wrong version

function component2 ({someProp}) {
    if (!someProp){
        return null;
    }
    useEffect(() => {
        console.log("show effect");
    });
    return ...
    
}

// The violation is because useEffect is called conditionally. 
// if someProp is falsy, null is returned from the component and useEffect is never called.
// implying that the condition is that useEffect is only called when someProp is truthy.


//CORRECTED VERSION
function CorrectedComponent2 ({someProp}){
    useEffect(()=>{
        if (someProp){
            console.log("Some efect")
        }
    });
    if (!someProp) {
        return null
    }
    return ....
}

//for this, useEffect has been lifted above the condition. 
// The condition has also been put inside the effect function so that its logic 
// is only executed when someProp is truthy.


///EFFECT CLEANUP

//an effect cleanup returns a function that performs cleanup logic when the component is unmounted. 
//logic ensures that nothing is left that could cause memory leak. 

//example.

function component3 ({onClickAnywhere}) {
    useEffect (()=>{
        function handleClick(){
            onClickAnywhere();
        }
        document.addEventListener("click", handleClick);
    });
    return ...
}

// in the above example, the preceding effect function attaches an event handler to the document element. 
// The event handler is never detatched though, hence multiple event handlers will become attched to 
// the document element as the effect is rerun. 
// This problem is solved by return a cleanup fnction that detaches the event handler as follows:


function CorrectedComponent3 ({onClickAnywhere}){
    useEffect(()=>{
        function handleClick(){
            onClickAnywhere();
        }
        document.addEventListener("click", listener);
        return function cleanup(){
            document.removeEventListener("click", listener);
        };
    });
    return ...;
}


/// another version of the corrected format, using an anonymous arrow function

function correctedComponent3 ({onClickAnywhere}){
    useEffect(()=> {
        function handleClick(){
            onClickAnywhere();
        }
        document.addEventListener("click",listener);
        return ()=>{
            document.removeEventListener("click", listener);
        };
    })
    return ...
}

// UNDERSTANDING useReducer

//useReducer is an alternative method of managing state. It uses a reducer function for state changes, which  
// takes in the current state value and returns the new state value. 

    //const [state, dispatch] = useReducer(reducer, initialState);

//In short, the useReducer takes in a reducer function and the initial state value as parameters . It then returns 
//a tuple containing the current state value and function to dispatch state changes.

//The dispatch function takes in an argument that describes the changes. This object is called an ACTION 