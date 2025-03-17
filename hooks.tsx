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
