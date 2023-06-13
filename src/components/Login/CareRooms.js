import RoomRepeater from "./RoomRepeater";
import { useState } from "react";

const CareRooms = () => {
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
    const [Counter, setCounter] = useState(1);

    const  AddRoom = () => {
        const roomRepeaters = [];
        for (let index = 0; index < Counter; index++) {
        roomRepeaters.push(<RoomRepeater Options={Options} />);
        }
        return roomRepeaters;
    };

    return (
        <div className="CareRooms">
        <span className="FreeRooms">عدد الغرف المتاحة</span>
        {AddRoom()}
        <div className="Repeater">
            <i
            className="fa-solid fa-plus"
            onClick={(e) => {
                setCounter(Counter + 1);
            }}
            ></i>
        </div>
        </div>
    );
};

export default CareRooms;