import { useFormikContext } from "formik";
import ValidationErrorMsg from "../../../Helpers/components/ValidationErrorMsg";
import BloodTypes from "./BloodTypes";
import { Form } from "formik";
import { useState ,useEffect} from "react";
import { LocationIp , LocationPlcae ,ErrorNotification, BaseApi} from "../../../Helpers/Functions";
import DatePicker from "./DatePicker";
import Select from 'react-select'
import Options from "../../../Helpers/CitiesList.json"
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
const NewAccount = (props) => {
    const [TheCity, setTheCity] = useState("");
    const [TheCityError, setTheCityError] = useState(false);
    const [ShowBloodTypes, setShowBloodTypes] = useState(false);
    let { values ,handleSubmit ,handleBlur ,errors ,handleChange ,resetForm }=useFormikContext();
    
    if(props?.ActiveForm===2){
        values=props?.values
    }
    
    useEffect(() => {
        if(props?.ActiveForm===2){
            if(props?.values?.location !==undefined){
                document.querySelector(".Location .Search").style.display="none"
                document.querySelector(".Location .City").style.display="flex"
                setTheCity(props?.values?.location)
            }
        }
    }, [props]);
    useEffect(() => {
            let Form =document.querySelector("form")
            Form.reset();
            resetForm({values:{}})
        let ActiveH4=document.querySelectorAll(".Top h4")
        let Submit=document.querySelector(".Submit button")
        if(secureLocalStorage.getItem("LoginBloodAccount")==="true" ){
            ActiveH4[0].textContent="تعديل الحساب"
            ActiveH4[1].textContent="حســـابـي"
            if(Submit!==null){
                Submit.textContent="حفظ التعديلات"
            }
        }
        let CheckInput = document.querySelector("input[type='checkbox']");
        let EditButton=document.querySelector(".EditButton button")
        if(props.ActiveForm!==2){
            if(secureLocalStorage.getItem("UserData")!==null)
            {
                CheckInput.checked=secureLocalStorage.getItem("UserData").alerts
            }
        }
    }, []);
    return (
        <Form onSubmit={handleSubmit}>
                    {ShowBloodTypes===true ? (<BloodTypes/>) : (<></>)}

                    <div className="inputselect blood_type" name="blood_type">
                    <i className="fa-solid fa-caret-left" id="BloodTypeArrow" onClick={(e)=>{
                        setShowBloodTypes(true)
                        }}></i>
                    <input  value={values.blood_type} type="text" id="name" onChange={handleChange} onBlur={handleBlur} className={errors?.blood_type ? "Error" : ""}/>
                    <span>{(values?.blood_type==="" || values?.blood_type===undefined) ? "حدد فصيلة الدم" : values?.blood_type }</span>
                    <ValidationErrorMsg msg={errors.blood_type}/>
                    </div>

                    <div className="inputselect test_valid" name="test_valid" style={{marginBottom:"10px"}}>
                    <i className="fa-solid fa-question" style={{backgroundColor:"#1a7cbb",color:"white",fontSize:"12px",padding:"3px 5px",borderRadius:"50%"}}></i>
                    <input  value={values.test_valid} type="text" id="name" onChange={handleChange} onBlur={handleBlur} className={errors?.test_valid ? "Error" : ""}/>
                    <ValidationErrorMsg msg={errors.test_valid}/>
                    <span>اختبار صلاحية التبرع بالدم</span>
                    </div>

                <div className="input" name="name">
                    <label htmlFor="name">اسم المتبرع</label>
                    <input type="text" id="name" value={values.name} onChange={handleChange} onBlur={handleBlur} className={errors?.name ? "Error" : ""} onKeyPress={(e)=>{
                        if((e.charCode>=65 && e.charCode <=90)||(e.charCode>=97 && e.charCode <=122) ||(e.charCode>=1569 && e.charCode <=1610) ||(e.charCode===32)){
                        }
                        else {
                            e.preventDefault()
                        }
                    }}/>
                    <ValidationErrorMsg msg={errors.name}/>
                </div>
                
                <div className="input">
                    <label htmlFor="phone_number"> رقم الهاتف</label>
                    <input minLength="11" maxLength="11" type="tel" id="phone_number" name="phone_number" value={values.phone_number} onChange={handleChange} onBlur={handleBlur} className={errors?.phone_number ? "Error" : ""} onKeyPress={(e)=>{
                        if(e.charCode>=48 && e.charCode <=57){
                        }
                        else {
                            e.preventDefault()
                        }
                    }}
                    onInvalid={(e)=>{
                        e.target.setCustomValidity("يرجى ادخال 11 رقم تبدأ ب01")
                    }}
                    />
                    <ValidationErrorMsg msg={errors.phone_number}/>
                </div>
                    
                    <div className="Location">
                        <span className="thelocation">العنوان</span>
                            <div className="City">
                            <h3 className="TheCity">{TheCity}</h3>
                            <i className="fa-solid fa-x" onClick={(e)=>{
                                values.location=""
                                    let City=document.querySelector(".TheCity")
                                    let Search=document.querySelector(".Search")
                                        City.parentElement.style.display="none"
                                    Search.style.display="flex"
                                    setTheCity("")
                                if(secureLocalStorage.getItem("LoginBloodAccount")!=="true"){
                                    setTheCityError(true)
                                        }else {
                                            setTheCityError(false)
                                        }
                            }}></i>
                            </div>

                        <div className="Search">
                            <button type="button" onClick={(e)=>{
                                let City=document.querySelector(".TheCity")
                                let Search=document.querySelector(".Search")
                                e.target.disabled=true;
                                e.target.style.backgroundColor="#0282ed70"
                                e.target.style.cursor="not-allowed"
                                e.target.nextElementSibling.disabled=true;
                                e.target.nextElementSibling.style.backgroundColor="#0282ed70"
                                e.target.nextElementSibling.style.cursor="not-allowed"
                                fetch(LocationIp).then((res)=>res.json()).then((data)=>{
                                    fetch(`${LocationPlcae}/${data.ip}`).then((res)=>res.json())
                                    .then((data)=>{
                                        fetch(`https://api.mymemory.translated.net/get?q=${data.city}&langpair=en|ar`)
                                        .then((res)=>res.json())
                                        .then((data)=>{
                                            setTheCity(data.responseData.translatedText)
                                            setTheCityError(false)
                                            City.parentElement.style.display="flex"
                                            Search.style.display="none"
                                            values.location=data.responseData.translatedText
                                        }).catch((err)=>{
                                            setTheCity("واجهنا خطأ برجاء اعاده المحاولة")
                                            setTheCityError(true)
                                            values.location=""
                                        }).finally(()=>{
                                            e.target.disabled=false;
                                            e.target.style.backgroundColor="#0282ed"
                                            e.target.style.cursor="pointer"
                                            e.target.nextElementSibling.disabled=false;
                                            e.target.nextElementSibling.style.backgroundColor="#0282ed"
                                            e.target.nextElementSibling.style.cursor="pointer"
                                        })
                                        })
                                })
                            }}>بحث تلقائي</button>

                            <button type="button" onClick={(e)=>{
                                document.querySelector(".Background2").style.display="block"
                            }}>بحث يدوي</button>
                                <div className="Background2" style={{backgroundColor:"white",display:"none"}}>
                                    <div className="SearchManually">
                                        <Select options={Options}
                                        isSearchable={true}
                                        placeholder="يرجى اختيار المدينة"
                                        noOptionsMessage={() => "لا يوجد مدينة بهذا الاسم"}
                                        isClearable={true}
                                        autoFocus={true}
                                        onChange={(e)=>{
                                            if(e?.value !==null){
                                                values.location=e?.value
                                                setTheCity(e?.value)
                                                e=null
                                            }
                                        }}
                                        />
                                    </div>
                                    <button type="button" style={{fontSize:"18px",padding:"5px 40px"}} onClick={(e)=>{
                                        if(TheCity?.length ===0 ||TheCity?.length ===undefined){
                                            e.preventDefault()
                                            ErrorNotification('يرجى اختيار مدينة')
                                        }else {
                                            document.querySelector(".Background2").style.display="none"
                                            document.querySelector(".City").style.display="flex"
                                            document.querySelector(".Search").style.display="none"
                                            setTheCityError(false)
                                        }
                                    }}>تم</button>
                                </div>
                        </div>
                    </div>
                    {
                        TheCityError===true ? (<div className="CityErrorMsg"><ValidationErrorMsg msg={"يرجى تحديد موقعك"}/></div>) : (<></>)
                    }
                    <div className="Alerts">
                        <h4>تفعيل الاشعارات من التطبيق</h4>
                        <input type="checkbox" style={{marginLeft:"10px"}} onChange={(e)=>{
                            if(e.target.checked ===true){
                                values.alerts=true
                            }else 
                            {
                                values.alerts=false
                            }
                        }}></input>
                    </div>
                    <div>
                    </div>
                    <div className="CallTime">
                        <h3>وقت اتاحة الاتصال بك</h3>
                        <h6 style={{display:"none"}}>{values?.time}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {values?.date}</h6>
                        <i className="fa-solid fa-pen-to-square"></i>
                        <DatePicker/>
                    </div>

                    {props?.ActiveForm===2 ? (
                        <>
                        <div className="EditButton">
                        <button type="button"  style={{backgroundColor:"red",borderColor:"red"}} onClick={(e)=>{
                            e.target.disabled=true
                            e.target.style.cursor="not-allowed"
                        }}>{"test"}
                        </button>
                        </div>

                        <div className="LogoutButton">
                        <button type="button" onClick={(e)=>{
                            secureLocalStorage.clear()
                            setTimeout(() => {
                                window.location.reload()
                            }, 1000);
                        }}>تسجيل الخروج</button>
                        </div>
                        </>
                    )
                    :
                    (<div className="Submit">
                    <button type="submit" onClick={(e)=>{
                        if(values.location==="" || values.location===undefined){
                            setTheCityError(true)
                        }
                        else{
                            setTheCityError(false)
                        }
                    }}>تسجيل الحساب</button>
                    </div>)
                } 
                    <div className="MobileLoginBackground"></div>
                </Form>
                
    );
}

export default NewAccount;
