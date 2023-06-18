import RoomRepeater from "./RoomRepeater";
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

    return (
        <div className="CareRooms">
        <span className="FreeRooms">عدد الغرف المتاحة</span>
        <div>
            {
                Options.map((Option,index)=>{
                    return(
                        <RoomRepeater Option={Option} key={index} index={index}/>
                    )
                })
            }

        </div>
        <button type="button" style={{marginTop:"30px"}} onClick={(e)=>{
        e.target.parentElement.parentElement.style.display="none"
        }}>حسنــاً</button>
        </div>
    );
};

export default CareRooms;