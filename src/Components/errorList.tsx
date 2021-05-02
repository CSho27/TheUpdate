export interface ErrorListProps {
  errorMessages: string[];
}

export function ErrorList(props: ErrorListProps){
  return <ul 
    className="error-list" 
    style={{display: !!props.errorMessages && props.errorMessages.length > 0 ? '' : 'none'}}
  >
    {props.errorMessages?.map(e => {
      return <li>{e}</li>;
    })}
  </ul>
}