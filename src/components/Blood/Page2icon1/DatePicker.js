import { useFormikContext } from "formik";
import { useEffect ,useState} from "react";
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import ar from 'date-fns/locale/ar';

const DatePicker = () => {
    const { values }=useFormikContext();
    const [selected, setSelected] = useState();

    let footer = <p>من فضلك اختر التاريخ</p>;
    if (selected) {
        footer = <p>لقد حددت &nbsp;&nbsp;&nbsp;&nbsp;<span style={{textDecoration:"underline"}}>{format(selected, "dd-MMMM-yyyy", { locale: ar })}</span>.</p>;
    values.time=(format(selected, 'dd-MMMM-yyyy'))
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
        </div>
        </div>
    );
}

export default DatePicker;
