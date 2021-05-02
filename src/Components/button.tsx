export interface ButtonProps {
  text?: string;
  onClick: () => void;
}

export function Button(props: ButtonProps) {
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    props.onClick();
  }

  return <button 
    onClick={onClick} 
    className='button'
    style={{
      width: props.text ? undefined : '6em',
      height: props.text ? undefined : '1.5em'
    }}
  >{props.text}</button>
}