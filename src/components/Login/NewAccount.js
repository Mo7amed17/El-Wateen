import { useFormikContext } from "formik";
import ValidationErrorMsg from "../../Helpers/components/ValidationErrorMsg";
import { Form } from "formik";
import { useState ,useEffect} from "react";
import secureLocalStorage from "react-secure-storage";
import CareRooms from "./CareRooms";
import { intinalValues } from "./Validation";
import { ErrorNotification } from "../../Helpers/Functions";
const NewAccount = ({ newvalues ,...props}) => {
    let { values ,handleSubmit ,handleBlur ,errors ,handleChange ,resetForm }=useFormikContext();
    if(props?.ActiveForm===2){
        values=newvalues
    }
    useEffect(() => {
            let Form =document.querySelector("form")
            Form.reset();
            resetForm({values:intinalValues})
        let ActiveH4=document.querySelectorAll(".Top h4")
        let Buttons=document.querySelectorAll(".Submit button")
        if(secureLocalStorage.getItem("LoginHospitalAccount")==="true" ){
            ActiveH4[0].textContent="تعديل الحساب"
            ActiveH4[1].textContent="حســـابـي"
            if(Buttons[0]!==undefined || Buttons[2]!==undefined ){
                Buttons[0].style.display="none"
                Buttons[0].disabled=true
                Buttons[2].textContent="حفظ التعديلات"
            }
        }
    }, [props?.ActiveForm]);

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
                    <input maxLength="11" type="tel" id="reception_number" name="reception_number" value={values.reception_number} onChange={handleChange} onBlur={handleBlur} className={errors?.reception_number ? "Error" : ""} onKeyPress={(e)=>{
                        if(e.charCode>=48 && e.charCode <=57){
                        }
                        else {
                            e.preventDefault()
                        }
                    }}/>
                    <ValidationErrorMsg msg={errors.reception_number}/>
                </div>
                
                <div className="input">
                    <label htmlFor="emergency_number"> رقم الطوارئ</label>
                    <input maxLength="11" type="tel" id="emergency_number" name="emergency_number" value={values.emergency_number} onChange={handleChange} onBlur={handleBlur} className={errors?.emergency_number ? "Error" : ""} onKeyPress={(e)=>{
                        if(e.charCode>=48 && e.charCode <=57){
                        }
                        else {
                            e.preventDefault()
                        }
                    }}/>
                    <ValidationErrorMsg msg={errors.emergency_number}/>
                </div>

                    {props?.ActiveForm===2 ? (
                        <>
                        <div className="LogoutButton">
                        <button type="button" onClick={(e)=>{
                            secureLocalStorage.removeItem("HospitalData")
                            secureLocalStorage.removeItem("HospitalId")
                            secureLocalStorage.removeItem("LoginHospitalAccount")
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
                        const V=Object.values(values)
                        if(V[0]!=="" && V[1]!=="" && V[2]!=="" && V[3]!=="" && V[4]!=="" && V[5]!=="" ){
                            let CareRooms=document.querySelector(".CareRooms")
                            CareRooms.style.display="block"
                        }else{
                            ErrorNotification("يرجى ملئ البيانات أولا")
                        }
                    }}
                    >ادخل العنايـات المركزة</button>
                            <div className="CareRooms" style={{display:"none"}}>
                            <CareRooms key={Math.random(10)} values={values?.cares}/>
                            </div>
                    <button type="submit" className="TargetButton">تسجيل الحساب</button>
                    </div>)
                } 
                    <div className="MobileLoginBackground"></div>
                </Form>
                
    );
}

export default NewAccount;
