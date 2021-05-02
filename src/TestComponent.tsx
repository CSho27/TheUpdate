import { ChangeEvent } from "react";
import { useState } from "react"

export function TestComponent(){
  const [name,setName] = useState("Searching");
  const [id, setId] = useState<number | null>(null);

  const idChanged = (changeEvent: ChangeEvent<HTMLInputElement>) => {
    const value = changeEvent.target.value;
    if(value.length === 0)
      setId(null);

    const num = parseInt(value);
    if(isNaN(num))
      return;

    setId(num);
  }

  return <>
    <input value={id ?? ''} onChange={idChanged}></input>
    <div>{name}</div>
  </>
}