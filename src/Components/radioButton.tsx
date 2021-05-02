import { ChangeEvent } from "react"

export interface RadioButtonProps {
  value: string | ReadonlyArray<string> | number;
  checked: boolean;
  onSelected: (value: string | ReadonlyArray<string> | number) => void;
}

export function RadioButton(props: RadioButtonProps) {
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if(event.target.checked)
      props.onSelected(event.target.value);
  }

  return <input type="radio" value={props.value} checked={props.checked} onChange={onChange}/>
}