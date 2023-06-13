import Select from 'react-select'
import "../../Styles/Login.css"
const RoomRepeater = ({Options}) => {
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
                if(e?.value !==null){
                    
                }
            }}
            styles={{
                
            }}
        />
        </div>
            <input type='text'/>
        </div>
    );
}

export default RoomRepeater;
