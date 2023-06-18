import { Form } from "formik";
import { CareRoomName } from "../../Helpers/Helpers";
import axios from "axios";
import { SuccessNotification , ErrorNotification, BaseApi } from "../../Helpers/Functions"
import { useEffect ,useState} from "react";
const EditForm = ({Cares, values ,props}) => {
        const [UpdateCares, setUpdateCares] = useState(Cares);
    useEffect(() => {
        fetch(`${BaseApi}/Hospitals/${values.id}`)
        .then((res)=>res.json())
        .then((data)=>{
            setUpdateCares(data.cares)
        })
    }, []);

    return (
        <Form className="CaresCardForm">
            {
                UpdateCares?.length>0 ? (<span className="FreeRooms" style={{marginTop:"-5px"}}>عدد الغرف المتاحة</span>) : (<></>)
            }
            {UpdateCares?.map((Care,index) => {
            return (
            <div className="CaresCard" key={index}>
                <div className="RoomName">
                    <input type="text" disabled={true} value={CareRoomName(Care?.room_name)}/>
                </div>
                
                <div className="RoomNumber">
                    <input type="text" disabled={true} placeholder={Care?.number} onKeyPress={(e)=>{
                        if(e.charCode>=48 && e.charCode <=57){
                        }
                        else {
                            e.preventDefault()
                        }
                    }}
                    onChange={(e)=>{
                        values.cares[index].number=e.target.value
                    }}
                    />
                </div>

                <div className="RoomEditButton">
                    <button type="button" onClick={(e)=>{
                        if(e.target.parentElement.previousSibling.childNodes[0].disabled===true){
                            e.target.parentElement.previousSibling.childNodes[0].disabled=false
                            e.target.textContent="حفــظ"
                        }else {
                            axios({
                                method: 'patch',
                                url: `https://el-wateen.mo7amed17.repl.co/Hospitals/${values.id}`,
                                data:values
                            }).then((res)=>{
                                SuccessNotification('تم تعديل العنايات المركزة')
                            }).catch((err)=>{
                                ErrorNotification("واجهنا خطأ برجاء المحاوله مرة اخرى")
                            }).finally(()=>{
                                e.target.parentElement.previousSibling.childNodes[0].disabled=true
                            e.target.textContent="تعديل"
                            })
                        }
                    }}>تعديل</button>
                </div>
            </div>
            );
        })}
        </Form>
    );
};

export default EditForm;