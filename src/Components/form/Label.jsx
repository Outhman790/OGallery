const Label = ({htmlFor, text, icon=null, className
}) => {
    return ( 
        <label className={className} htmlFor={htmlFor}>{text}{icon}</label>
     );
}
 
export default Label;