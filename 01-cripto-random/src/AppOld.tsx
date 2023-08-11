import { useState, useEffect, useReducer } from "react";
import "./App.css";


const getRandomNumberFromAPI = async ():Promise<number> => {
  const res = await fetch("https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new");
  const numberString = await res.text();
  
  // throw new Error("Auxilio")
  return +numberString;
}

export const App = () => {
  const [number, setNumber] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>()
  const [key, forceRefetch] = useReducer((x) => x + 1, 0)

  useEffect(() => {
    setIsLoading( true );
    getRandomNumberFromAPI()
      .then( setNumber )
      .catch( error => setError(error.message) );
  }, [key])

  useEffect(() => {
    if( number ) setIsLoading(false);
  }, [number]);

  useEffect(() => {
    if( error ) setIsLoading(false);
  }, [number])

  return (
    <div className="App App-Header">
      { 
        isLoading 
          ? (<h2>Cargando...</h2>) 
          : (<h2>Número Aleatorio: { number }</h2>)
      }

      {
        !isLoading && error && (<h3>{ error }</h3>)
      }

      <button onClick={ forceRefetch } disabled={ isLoading }>
        {
          isLoading ? "..." : "Nuevo Número"
        }
      </button>
    </div>
  );
};
