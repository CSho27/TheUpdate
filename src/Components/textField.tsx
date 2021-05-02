import { ChangeEvent, HTMLAttributes } from "react";

export interface TextFieldProps extends HTMLAttributes<HTMLInputElement>{
  value: string;
  onValueChange: (value: string) => void;
}

export function TextField(props: TextFieldProps){
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.onValueChange(event.target.value);
  };

  return <input
      className={`text-field ${props.className}`}
      value={props.value ?? ''}
      onChange={onChange}>
  </input>
}