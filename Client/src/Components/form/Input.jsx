const Input = ({type,id,placeholder,className}) => {
    return ( 
    <input className={className} type={type} id={id} placeholder={placeholder} />
    );
}
 
export default Input;