import { useFormikContext } from "formik";
import ValidationErrorMsg from "../../../Helpers/components/ValidationErrorMsg";
import BloodTypes from "./BloodTypes";
import { Form } from "formik";
import { useState ,useEffect} from "react";
import { LocationIp , LocationPlcae ,ErrorNotification} from "../../../Helpers/Functions";
import DatePicker from "./DatePicker";
import Select from 'react-select'
import Options from "../../../Helpers/CitiesList.json"

const NewAccount = (props) => {

    const [TheCity, setTheCity] = useState("");
    const [TheCityError, setTheCityError] = useState(false);
    const { values ,handleSubmit ,handleBlur ,errors ,handleChange ,resetForm }=useFormikContext();
    const [ShowBloodTypes, setShowBloodTypes] = useState(false);
    useEffect(() => {
        let Form =document.querySelector("form")
        Form.reset();
        resetForm({values:{}})
    }, []);
    return (
        <Form onSubmit={handleSubmit}>
                    {ShowBloodTypes===true ? (<BloodTypes/>) : (<></>)}

                    <div className="inputselect blood_type" name="blood_type">
                    <i className="fa-solid fa-caret-left" id="BloodTypeArrow" onClick={(e)=>{
                        setShowBloodTypes(true)
                        }}></i>
                    <input  value={values.blood_type} type="text" id="name" onChange={handleChange} onBlur={handleBlur} className={errors?.blood_type ? "Error" : ""}/>
                    <span>حدد فصيلة الدم</span>
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
                    <input maxLength="11" type="tel" id="phone_number" name="phone_number" value={values.phone_number} onChange={handleChange} onBlur={handleBlur} className={errors?.phone_number ? "Error" : ""} onKeyPress={(e)=>{
                        if(e.charCode>=48 && e.charCode <=57){
                        }
                        else {
                            e.preventDefault()
                        }
                    }}/>
                    <ValidationErrorMsg msg={errors.phone_number}/>
                </div>
                    
                    <div className="Location">
                        <span className="thelocation">العنوان</span>
                            <div className="City">
                            <h3 className="TheCity">{TheCity}</h3>
                            <i className="fa-solid fa-x" onClick={(e)=>{
                                setTheCity("")
                                setTheCityError(true)
                                values.location=""
                                let City=document.querySelector(".TheCity")
                                let Search=document.querySelector(".Search")
                                    City.parentElement.style.display="none"
                                Search.style.display="flex"
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
                        TheCityError===true ? (<ValidationErrorMsg msg={"يرجى تحديد موقعك"}/>) : (<></>)
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
                        <i className="fa-solid fa-pen-to-square"></i>
                        <DatePicker/>
                    </div>

                    {props.ActiveButton===2 ? (
                        <>
                        <div className="DeleteButton">
                        <button type="button" onClick={(e)=>{
                            
                        }}>تعديل الحساب</button>
                        </div>
                        <div className="DeleteButton">
                        <button type="button" onClick={(e)=>{
                            
                        }}>تعطيل الحساب</button>
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
