import Select from 'react-select'
import "../../Styles/Login.css"
import { useEffect } from 'react';
const RoomRepeater = ({Options  , values , Key,...props}) => {
    let value = {
        room_name:"",
        number:"",
    };

            useEffect(() => {
                if(Key===1 && values!==undefined){
                    values[0]=value
                }else
                if(Key!==1){
                    values.push(value)
                }
            }, []);
            
    return (
        <div className='Room'>
        <div className='LeftSide'>
        <Select options={Options}
            isSearchable={true}
            placeholder="اختر اسم العناية المركز"
            noOptionsMessage={() => "لا يوجد عناية بهذا الاسم"}
            isClearable={true}
            autoFocus={true}
            onChange={(e)=>{
                if(e?.value===null || e?.value===undefined){
                    value.room_name=""
                }else {
                    value.room_name=e?.value
                }
            }}
        />
        </div>
            <input type='text'onKeyPress={(e)=>{
                if(e.charCode>=48 && e.charCode <=57){
                }
                else {
                    e.preventDefault()
                }
                }} onChange={(e)=>{
                    value.number=e?.target?.value
            }}/>
        </div>
    );
}
export default RoomRepeater;
