import RoomRepeater from "./RoomRepeater";
import { useState } from "react";
const CareRooms = ({ values }) => {
    const Options = [
    { label: "عناية مركزة لحديثي الولادة", value: 1 },
    { label: "عناية مركزة للأطفال", value: 2 },
    { label: "عناية مركزة للقلب", value: 3 },
    { label: "عناية مركز للأورام وأنواع مرض السرطان", value: 4 },
    { label: "عناية مركزة للصدر", value: 5 },
    { label: "عناية مركزة للجراحة", value: 6 },
    { label: "عناية مركزة للحروق", value: 7 },
    { label: "العناية المركزة العصبية", value: 8 },
    ];
    
    const [Key, setKey] = useState(1);
    const [roomRepeaters, setRoomRepeaters] = useState([<RoomRepeater Options={Options} Key={1} values={values}/>])
    const AddRoom = () => {
            setRoomRepeaters(prev => [
            ...prev, 
            <RoomRepeater Options={Options} key={Key+1} values={values}/>
            ])
        }

    return (
        <div className="CareRooms">
        <span className="FreeRooms">عدد الغرف المتاحة</span>
        {   
        roomRepeaters.map((Repeater)=>{
            return(Repeater)
        })
        }
        
        <div className="Repeater">
            <i
            className="fa-solid fa-plus"
            onClick={(e) => {
                setKey(Key+1)
                AddRoom()
            }}
            style={{marginRight:"15px"}}
            ></i>
            <i className="fa-solid fa-minus"
            onClick={(e)=>{
                if(roomRepeaters?.length>1){
                    setKey(Key-1)
                    roomRepeaters.pop()
                }
            }}
            style={{marginLeft:"15px"}}
            ></i>
        </div>
        <button type="button" onClick={(e)=>{
            e.target.parentElement.parentElement.style.display="none"
        }}>حسنــاً</button>
        </div>
    );
};

export default CareRooms;