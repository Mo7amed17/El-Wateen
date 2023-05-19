
const ValidationErrorMsg = (props) => {

    return (
        <div className="ValidationErrorMsg"
        style={{
            fontSize:"9px",
            color:"#D8000C",
            display:"block"
        }}
        >
            {props.msg}
        </div>
    );
}

export default ValidationErrorMsg;
