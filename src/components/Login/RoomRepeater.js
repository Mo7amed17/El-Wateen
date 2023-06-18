import { useFormikContext } from "formik";
import "../../Styles/Login.css"
import { useEffect } from 'react';
const RoomRepeater = ({Option  ,index , Key,...props}) => {
    const { values }=useFormikContext()
    values.cares[index].room_name=Option?.value

    return (
        <div className='Room'>
        <div className='LeftSide'>
            <input className="LongInput" value={Option.label} disabled={true}/>
        </div>
            <input maxLength={2} className="ShortInput" type='text'onKeyPress={(e)=>{
                if(e.charCode>=48 && e.charCode <=57){
                }
                else {
                    e.preventDefault()
                }
                }} onChange={(e)=>{
                    values.cares[index].number=e?.target?.value
                    console.log(values.cares)
            }}/>
        </div>
    );
}
export default RoomRepeater;
