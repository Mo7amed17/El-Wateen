
const ValidationErrorMsg = ({msg,textAlign="start"}) => {

    return (
        <div className="ValidationErrorMsg"
        style={{
            fontSize:"9px",
            color:"#D8000C",
            display:"block",
            textAlign:`${textAlign}`
        }}
        >
            {msg}
        </div>
    );
}

export default ValidationErrorMsg;
