import { Switch , Case , Default} from "react-if";
import { CheckActivePage } from "../../../Helpers/Functions";
import { Api } from "../../../Helpers/Functions";
import { useState ,useEffect} from "react";
import LoadingPage from "../../../Helpers/LoadingPage";
import ErrorPage from "../../../Helpers/ErrorPage";
import "../../../Styles/Page2icon1.css"
import { Formik, Form , useFormik} from 'formik';
import React from 'react'
import ValidationErrorMsg from "../../../Helpers/components/ValidationErrorMsg";
import {validationSchema ,intinalValues} from "./Validation"
import BloodTypes from "./BloodTypes";
const Page2icon1 = () => {
    window.localStorage.setItem("ActivePage",1)
    const [ActiveForm, setActiveForm] = useState("");
    const [ShowBloodTypes, setShowBloodTypes] = useState(false);
    const [Status, setStatus] = useState("loading");
    const [Reload, setReload] = useState(false);
    const [Image, setImage] = useState("");
            useEffect(() => {
                fetch(`${Api}/Page2Page2icon1.png`)
                .then((res)=>{
                    if(res.status!==200){
                        setStatus("error")
                        setTimeout(() => {
                            let reload=document.querySelector(".ErrorPage i")
                        reload.addEventListener("click",(e)=>{
                            reload.style.rotate="360deg"
                            setReload(true)
                        })
                        }, 100);
                    }
                    else {
                        setStatus("done")
                        setImage(res.url)
                        setTimeout(() => {
                            let Activeh4=document.querySelectorAll(".Top h4")
                            Activeh4.forEach(ele => {
                                ele.addEventListener("click",(e)=>{
                                    setActiveForm(e.target.id)
                                    Activeh4.forEach(element => {
                                        element.classList.remove("Activeh4AtBlood")
                                    });
                                    ele.classList.add("Activeh4AtBlood")
                                })
                            });
                        }, 100);
                    }
                })
            }, [Reload]);
            CheckActivePage()

    return (
        <Switch>
            <Case condition={Status==="loading"}>
                <LoadingPage/>
            </Case>
            <Case condition={Status==="error"}>
                <ErrorPage/>
            </Case>
            <Default>
        <div className="Page2icon1">
            <div className="Right">
                <Formik
                initialValues = {intinalValues}
                validationSchema={validationSchema}
                validateOnChange={false}
                validateOnBlur={false}
                enableReinitialize>
                    {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
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
                    <input disabled placeholder="اختبار صلاحية الدم" type="text" id="name" value={values.test_valid} onChange={handleChange} onBlur={handleBlur} className={errors?.test_valid ? "Error" : ""}></input>
                    <ValidationErrorMsg msg={errors.test_valid}/>
                    </div>

                <div className="input" name="name">
                    <label htmlFor="name">اسم المتبرع</label>
                    <input type="text" id="name" value={values.name} onChange={handleChange} onBlur={handleBlur} className={errors?.name ? "Error" : ""}></input>
                    <ValidationErrorMsg msg={errors.name}/>
                </div>
                <div className="input">
                    <label htmlFor="phone_number"> رقم الهاتف</label>
                    <input type="tel" id="phone_number" name="phone_number" value={values.phone_number} onChange={handleChange} onBlur={handleBlur} className={errors?.phone_number ? "Error" : ""}></input>
                    <ValidationErrorMsg msg={errors.phone_number}/>
                </div>
                    <button type="submit" onClick={(e)=>{
                        console.log(values)
                        console.log(errors)
                    }}>تسجيل الحساب</button>
                </Form>
                    )}
                </Formik>
            </div>
            <div className="Left">
                <div className="Top">
                    <h4 className="Activeh4AtBlood" id="New">تسجيل جديد</h4> 
                    <h4 id="Old">حساب موجود</h4> 
                </div>
                <div className="Down">
                    <img src={Image} alt=""/>
                </div>
            </div>
        </div>
            </Default>
        </Switch>
    );
}

export default Page2icon1;


// Page2Page2icon1.png