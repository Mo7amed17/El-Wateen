import { useFormikContext } from "formik";
import ValidationErrorMsg from "../../Helpers/components/ValidationErrorMsg";
import { Form } from "formik";
import { useState ,useEffect} from "react";
import { ErrorNotification, BaseApi, SuccessNotification} from "../../Helpers/Functions";
import secureLocalStorage from "react-secure-storage";
import CareRooms from "./CareRooms";
const NewAccount = (props) => {
    let { values ,handleSubmit ,handleBlur ,errors ,handleChange ,resetForm }=useFormikContext();
    const [ShowCare, setShowCare] = useState(false);
    if(props?.ActiveForm===2){
        values=props?.values
    }
    
    useEffect(() => {
            let Form =document.querySelector("form")
            Form.reset();
            resetForm({values:{}})
        let ActiveH4=document.querySelectorAll(".Top h4")
        let Submit=document.querySelector(".Submit button")
        if(secureLocalStorage.getItem("LoginDonnarAccount")==="true" ){
            ActiveH4[0].textContent="تعديل الحساب"
            ActiveH4[1].textContent="حســـابـي"
            if(Submit!==null){
                Submit.textContent="حفظ التعديلات"
            }
        }
        let CheckInput = document.querySelector("input[type='checkbox']");
        if(props.ActiveForm!==2){
            if(secureLocalStorage.getItem("DonnarData")!==null)
            {
                CheckInput.checked=secureLocalStorage.getItem("DonnarData").alerts
            }
        }
    }, []);
    return (
        <Form onSubmit={handleSubmit}>

                <div className="input" name="name">
                    <label maxLength="25" htmlFor="name">اسم المستشفى</label>
                    <input type="text" id="name" value={values.name} onChange={handleChange} onBlur={handleBlur} className={errors?.name ? "Error" : ""} onKeyPress={(e)=>{
                        if((e.charCode>=65 && e.charCode <=90)||(e.charCode>=97 && e.charCode <=122) ||(e.charCode>=1569 && e.charCode <=1610) ||(e.charCode===32)){
                        }
                        else {
                            e.preventDefault()
                        }
                    }}/>
                    <ValidationErrorMsg msg={errors.name}/>
                </div>

                <div className="input" name="email">
                    <label maxLength="25" htmlFor="email">الايميل الخاص بالمستشفى</label>
                    <input type="email" id="email" value={values.email} onChange={handleChange} onBlur={handleBlur} className={errors?.email ? "Error" : ""}/>
                    <ValidationErrorMsg msg={errors.email}/>
                </div>

                <div className="input" name="password">
                    <label maxLength="16" htmlFor="password">كلمة السر</label>
                    <input type="password" id="password" value={values.password} onChange={handleChange} onBlur={handleBlur} className={errors?.password ? "Error" : ""}/>
                    <ValidationErrorMsg msg={errors.password}/>
                </div>

                <div className="input" name="location">
                    <label maxLength="25" htmlFor="location">العنوان</label>
                    <input type="text" id="location" value={values.location} onChange={handleChange} onBlur={handleBlur} className={errors?.location ? "Error" : ""}/>
                    <ValidationErrorMsg msg={errors.location}/>
                </div>

                <div className="input">
                    <label htmlFor="reception_number"> رقم الاستقبال</label>
                    <input maxLength="11" type="tel" id="reception_number" name="reception_number" value={values.reception_number} onChange={handleChange} onBlur={handleBlur} className={errors?.reception_number ? "Error" : ""} />
                    <ValidationErrorMsg msg={errors.reception_number}/>
                </div>
                
                <div className="input">
                    <label htmlFor="emergency_number"> رقم الطوارئ</label>
                    <input maxLength="11" type="tel" id="emergency_number" name="emergency_number" value={values.emergency_number} onChange={handleChange} onBlur={handleBlur} className={errors?.emergency_number ? "Error" : ""} />
                    <ValidationErrorMsg msg={errors.emergency_number}/>
                </div>

                    {props?.ActiveForm===2 ? (
                        <>

                        <div className="LogoutButton">
                        <button type="button" onClick={(e)=>{
                            secureLocalStorage.removeItem("DonnarData")
                            secureLocalStorage.removeItem("DonnarId")
                            secureLocalStorage.removeItem("LoginDonnarAccount")
                            e.target.disabled=true
                            e.target.style.cursor="not-allowed"
                            e.target.style.backgroundColor="#0282ed70"
                            e.target.style.borderColor="#0282ed70"
                            setTimeout(() => {
                                window.location.reload()
                            }, 1000);
                        }}>تسجيل الخروج</button>
                        </div>
                        </>
                    )
                    :
                    (<div className="Submit">
                    <button type="button" style={{marginBottom:"15px"}}
                    onClick={(e)=>{
                        setShowCare(true)
                    }}
                    >ادخل العنايـات المركزة</button>
                        {
                            ShowCare? (<CareRooms/>) :(<></>)
                        }
                    <button type="submit">تسجيل الحساب</button>
                    </div>)
                } 
                    <div className="MobileLoginBackground"></div>
                </Form>
                
    );
}

export default NewAccount;
