import { useFormikContext } from "formik";
import { useEffect ,useState} from "react";
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import ar from 'date-fns/locale/ar';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
const DatePicker = () => {
    const format2 = 'HH:mm';
    const { values }=useFormikContext();
    const [selected, setSelected] = useState();

    let footer = <p>من فضلك اختر التاريخ</p>;
    if (selected) {
        footer = <p>لقد حددت تاريخ  &nbsp;&nbsp;&nbsp;&nbsp;<span style={{textDecoration:"underline"}}>{format(selected, "dd-MMMM-yyyy", { locale: ar })}</span>.</p>;
    values.date=(format(selected, 'dd-MMMM-yyyy'))
    }
    useEffect(() => {
        let pen=document.querySelector(".CallTime i")
        pen.addEventListener("click",(e)=>{
            document.querySelector(".Background1").style.display="block"
        })
    }, []);

    return (
        <div className="Background1" style={{display:"none"}}>
        <div className="DatePicker">
        <span className="Close" onClick={(e)=>{
                document.querySelector(".Background1").style.display="none"
            }}><i className="fa-solid fa-x"></i></span>
            <DayPicker
                locale={ar}
                mode="single"
                selected={selected}
                onSelect={setSelected}
                footer={footer}
            />
            <h4 style={{margin:"2px 0px 0px 10px "}}>من فضلك اختر الوقت </h4>
            <TimePicker defaultValue={dayjs('00:00', format2)} format={format2}  placeholder={"اختر الوقت"}
            onChange={(e)=>{
                if(e===null){
                    values.time=undefined
                }else{
                    values.time=`${e?.$H}:${e?.$m}`
                }
            }}
            use12Hours={true}
            onClick={(e)=>{
                let buttons=document.querySelector(".ant-picker-ranges")
                buttons.children[0].children[0].text="الآن"
                buttons.children[1].children[0].children[0].firstChild.data="تم"
            }}
            />
        </div>
        </div>
    );
}

export default DatePicker;
