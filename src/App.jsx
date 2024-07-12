import React, { useEffect, useRef, useState } from "react";
import Suggestions from "./assets/components/Suggestions";
import Test from "./assets/components/Test";
import "./App.css";

const App = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [selected, setSelected] = useState(-1);
  const inputRef = useRef()


  const getData = async (input) => {
    const res = await fetch(`https://dummyjson.com/recipes/search?q=${input}`);
    const data = await res.json();

    return data;

    //   setSuggestion({...suggestion, data})
  };

  //   async   function getData(){
  //     try {
  //      setError(false)
  //      setLoading(true)
  //   const res = await fetch(`https://dummyjson.com/recipes/search?q=${inputVal}`)
  //   if(!res.ok){
  //    setError(true)
  //    setLoading(false)
  // }
  // if (res.status === 200){
  //  const data = await res.json()
  // return data
  // }

  // } catch (error) {
  //  console.log(error)

  // }

  //    }

  // setting inputVal
  const handleInputChange = async (e) => {
    setInputVal(e.target.value);
  };

  useEffect(() => {
    setError(null);
    setLoading(true);
    let timer = null;
    inputRef.current.focus()

    async function deley(fx, time) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(async () => {
        try {
          let data = await fx(inputVal);
          setSuggestion(data.recipes);
          setError(null);
          setLoading(false);
        } catch (error) {
          console.log(error);

          setLoading(false);

          setError(error.message);
        }
      }, time);
    }
    if (inputVal.length > 1) {
      deley(getData, 300);
    }

    return () => clearTimeout(timer);
  }, [inputVal]);

  useEffect(()=>{
    document.addEventListener("keydown" ,handleKeyDown)
    console.log(selected)
    return ()=>document.removeEventListener("keydown",handleKeyDown)
  },[selected,suggestion])

  const handleKeyDown = (e,i)=>{
    if (e.keyCode === 40 && suggestion.length && selected < suggestion.length){
       setSelected(pre=>pre+1)

    }
    if (e.keyCode === 38 && suggestion.length && selected < suggestion.length){
       setSelected(pre=>pre-1)

    }
    if(suggestion.length -1 === selected){
      setSelected(0)
    }

    if(!suggestion.length){
      setSelected(-1)
    }

    if(e.keyCode === 13){
      console.log(suggestion[selected])
      setInputVal(suggestion[selected].name)
      setSuggestion([])
      setSelected(-1)
    }

    if(selected>6){
      window.addEventListener("")
    }

  }



  return (
    <div className="main">
      <h1>Search Suggestion & some Extra Features</h1>

      <input
      ref={inputRef}
        type="text"
        placeholder="searc here.."
        value={inputVal}
        onChange={handleInputChange}
      />
      {loading && inputVal.length > 1 && <p>Loading...</p>}
      {error && inputVal.length > 1 && <p>{error}</p>}
      {suggestion && !error && inputVal.length > 1 && !loading && (
        <Suggestions
          inputVal={inputVal}
          setSuggestion={setSuggestion}
          suggestion={suggestion}
          setInputVal={setInputVal}
          selected={selected}
          setSelected={setSelected}
        />
      )}
    </div>
  );
};

export default App;
