//one of the common use of the useEffect hook is to fetch data from an API.
// the useEffect hook is called after the component has been rendered to the DOM.

type Person = {
  name: string;
};
export function getPerson(): Promise<Person> {
  return new Promise((resolve) => setTimeout(() => resolve({ name: 'Bob' }), 1000));
}

//the function above asynchronously returns an object {name:"Bob"}, after a second has elapsed.
// Notice the type annotation for the return type, Promise<Person>. The Promise type represents a javascript Promise
// which is something that will be eventually completed.
// The promise type has a generic argument for the item type that is resolved in the promise which is Person
