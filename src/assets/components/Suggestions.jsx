import React, { useEffect, useRef } from "react";

const Suggestions = ({suggestion , inputVal,setInputVal,setSuggestion,selected,setSelected}) => {
  const listRef = useRef(null);

const handleSetInput = (sugg)=>{
  setInputVal(sugg)
  setSuggestion("")

}

const handeMouseEnter=(gugg,i)=>{
  
  setSelected(i)
}

useEffect(() => {
  if (selected !== -1) {
    const selectedElement = listRef.current.children[selected];
    if (selectedElement) {
      selectedElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }
}, [selected]);


  return  <ul ref={listRef} >
    {console.log(selected)}
    {suggestion && suggestion.length && suggestion.map((sugg,i) => <li onMouseEnter={()=>handeMouseEnter(sugg,i)} className={selected === i ? "selectedClass":"" }  onClick={()=>handleSetInput(sugg.name)} key={i}>
       {sugg?.name.split((new RegExp(`(${inputVal})`,"gi"))).map((e,i)=>inputVal.toLowerCase() === e.toLowerCase() ? <b>{e}</b>:e)} 
    
      </li>
      )}

    </ul> 
    
};

export default Suggestions;
