import { useFormikContext } from "formik";
import ValidationErrorMsg from "../../../Helpers/components/ValidationErrorMsg";
import BloodTypes from "./BloodTypes";
import { Form } from "formik";
import { useState } from "react";
import { LocationApi } from "../../../Helpers/Functions";
import DatePicker from "./DatePicker";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select'
import Options from "../../../Helpers/CitiesList.json"
const NewAccount = () => {
    const notify = (msg) => toast(msg);

    const [TheCity, setTheCity] = useState("");
    const [TheCityError, setTheCityError] = useState(false);
    const { values ,handleSubmit ,handleBlur ,errors ,handleChange}=useFormikContext();
    const [ShowBloodTypes, setShowBloodTypes] = useState(false);
    return (
        <Form onSubmit={handleSubmit}>
                    {ShowBloodTypes===true ? (<BloodTypes/>) : (<></>)}

                    <div className="inputselect blood_type" name="blood_type">
                    <i className="fa-solid fa-caret-left" id="BloodTypeArrow" onClick={(e)=>{
                        setShowBloodTypes(true)
                        }}></i>
                    <input disabled placeholder="حدد فصيلة الدم" type="text" id="name" value={values.blood_type} onChange={handleChange} onBlur={handleBlur} className={errors?.blood_type ? "Error" : ""}></input>
                    <ValidationErrorMsg msg={errors.blood_type}/>
                    </div>

                    <div className="inputselect test_valid" name="test_valid" style={{marginBottom:"10px"}}>
                    <i className="fa-solid fa-question" style={{backgroundColor:"#1a7cbb",color:"white",fontSize:"12px",padding:"3px 5px",borderRadius:"50%"}}></i>
                    <input disabled placeholder="اختبار صلاحية التبرع بالدم" type="text" id="name" value={values.test_valid} onChange={handleChange} onBlur={handleBlur} className={errors?.test_valid ? "Error" : ""}></input>
                    <ValidationErrorMsg msg={errors.test_valid}/>
                    </div>

                <div className="input" name="name">
                    <label htmlFor="name">اسم المتبرع</label>
                    <input type="text" id="name" value={values.name} onChange={handleChange} onBlur={handleBlur} className={errors?.name ? "Error" : ""} onKeyPress={(e)=>{
                        if((e.charCode>=65 && e.charCode <=90)||(e.charCode>=97 && e.charCode <=122) ||(e.charCode>=1569 && e.charCode <=1610) ||(e.charCode===32)){
                        }
                        else {
                            e.preventDefault()
                        }
                    }}></input>
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
                    }}></input>
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
                                const options = {
                                    method: 'GET',
                                    headers: {
                                        'X-RapidAPI-Key': '68279b6798mshf429f1ed344b352p175839jsna83457648965',
                                        'X-RapidAPI-Host': 'spott.p.rapidapi.com'
                                    }
                                };
                                fetch(LocationApi,options).then((res)=>res.json())
                                .then((data)=>{
                                    setTheCity(data.localizedName)
                                    setTheCityError(false)
                                    City.parentElement.style.display="flex"
                                    Search.style.display="none"
                                    e.target.disabled=false;
                                    e.target.style.backgroundColor="#0282ed"
                                    e.target.style.cursor="pointer"
                                    e.target.nextElementSibling.disabled=false;
                                    e.target.nextElementSibling.style.backgroundColor="#0282ed"
                                    e.target.nextElementSibling.style.cursor="pointer"
                                    values.location=data.localizedName
                                }).catch((err)=>{
                                    setTheCity("واجهنا خطأ برجاء اعاده المحاولة")
                                    setTheCityError(true)
                                    values.location=""
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
                                            }
                                        }}
                                        />
                                    </div>
                                    <button type="button" style={{fontSize:"18px",padding:"5px 40px"}} onClick={(e)=>{
                                        if(TheCity?.length ===0 ||TheCity?.length ===undefined){
                                            e.preventDefault()
                                            toast.error('يرجى اختيار مدينة', {
                                                position: "top-right",
                                                autoClose: 2500,
                                                hideProgressBar: false,
                                                closeOnClick: true,
                                                pauseOnHover: true,
                                                draggable: true,
                                                progress: undefined,
                                                theme: "light",
                                                closeButton :false
                                                });
                                        }else {
                                            document.querySelector(".Background2").style.display="none"
                                            document.querySelector(".City").style.display="flex"
                                            document.querySelector(".Search").style.display="none"
                                            setTheCityError(false)
                                        }
                                    }}>تم</button>
                                    <ToastContainer/>
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

                    <div className="Submit">
                    <button type="submit" onClick={(e)=>{
                        console.log(errors)
                        console.log(values)
                        if(values.location===""){
                            setTheCityError(true)
                        }
                        else{
                            setTheCityError(false)
                        }
                    }}>تسجيل الحساب</button>
                    </div>
                </Form>
                
    );
}

export default NewAccount;
