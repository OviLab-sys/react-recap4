import { useEffect } from 'react';
import { getPerson } from './getPerson';

export function PersonScore() {
  useEffect(() => {
    async function getThePerson() {
      const person = await getPerson();
      console.log(person);
    }
    getThePerson();
  }, []);
  return null;
}

//The effect calls the getPerson function and outputs the returned person to the console.
//The effect is only exedcuted after the component is initially rendered because an empty array has been specified
// as the effect dependencies in its argument.
