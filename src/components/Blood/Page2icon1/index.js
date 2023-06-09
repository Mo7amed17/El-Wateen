import { Switch , Case , Default} from "react-if";
import { CheckActivePage ,ErrorNotification,PhotoApi ,SubmitForm, UpdateForm} from "../../../Helpers/Functions";
import { useState ,useEffect} from "react";
import LoadingPage from "../../../Helpers/LoadingPage";
import ErrorPage from "../../../Helpers/ErrorPage";
import { Formik } from 'formik';
import React from 'react'
import {validationSchema ,intinalValues} from "./Validation"
import NewAccount from "./NewAccount";
import OldAccount from "./OldAccount";
import NavigationBar from "../../../Helpers/NavigationBar"
import Footer from "../../../Helpers/Footer";
import secureLocalStorage from "react-secure-storage";
import "../../../Styles/Page2icons.css"
const Page2icon1 = () => {
    let Newvalues={...secureLocalStorage.getItem("DonnarData")}

    window.localStorage.setItem("ActivePage",1)
    const [ActiveForm, setActiveForm] = useState();
    const [Status, setStatus] = useState("loading");
    const [Reload, setReload] = useState(false);
    const [Image, setImage] = useState("");
            useEffect(() => {
                fetch(`${PhotoApi}/Page2Page2icon1.png`)
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
                        if(secureLocalStorage.getItem("LoginDonnarAccount")==="true" ){
                            Activeh4[0].textContent="تعديل الحساب"
                            Activeh4[1].textContent="حـســـابــي"
                        }
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
            <NavigationBar active={1}/>
            <div className="Right">
                <Formik
                initialValues = {intinalValues}
                validationSchema={secureLocalStorage.getItem("LoginDonnarAccount")==="true" ? ("") : (validationSchema)}
                validateOnChange={true}
                validateOnBlur={false}
                isInitialValid={false}
                onSubmit={(values , {resetForm})=>{
                    if(secureLocalStorage.getItem("LoginDonnarAccount")==="true"){
                        let ValidationErrorMsg =document.querySelector(".CityErrorMsg")
                        if(ValidationErrorMsg!==null){
                            ValidationErrorMsg.style.display="none"
                        }
                        Object.keys(values).map((key)=>{
                            Object.keys(Newvalues).map((k)=>{
                                if (key in values && values[key] !== "" && key===k) {
                                    Newvalues[k]=values[key]
                                }
                            })
                        })  
                        let phone_number=document.getElementById("phone_number")
                        if(JSON.stringify(Newvalues) === JSON.stringify(secureLocalStorage.getItem("DonnarData"))){
                            ErrorNotification("لم تقم بأي تعديلات")
                        }
                        else {
                                if(phone_number.value.startsWith("01")===false && phone_number.value!==""){
                                        ErrorNotification("يجب أن يبدأ الرقم ب01")
                                }else{
                                    UpdateForm(Newvalues ,resetForm,secureLocalStorage.getItem("DonnarId"),"Donnars")
                                }
                            }
                    }else {
                        SubmitForm(values ,resetForm,"Donnars")
                        setTimeout(() => {
                            let span=document.querySelector(".inputselect span")
                            let Activeh4=document.querySelectorAll(".Top h4")
                        if(span.textContent==="حدد فصيلة الدم"){
                            setActiveForm("old_account")
                            Activeh4[0].classList.remove("Activeh4AtBlood")
                            Activeh4[1].classList.add("Activeh4AtBlood")
                        }
                        }, 1000);
                    }
                }}
                enableReinitialize>
                    {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
                        <Switch>
                            <Case condition={ActiveForm==="new_account"}>
                                <NewAccount/>
                            </Case>
                            <Case condition={ActiveForm==="old_account"}>
                                <OldAccount/>
                            </Case>
                            <Default>
                                <NewAccount/>
                            </Default>
                        </Switch>
                    )}
                </Formik>
            </div>
            <div className="Left">
                <div className="Top">
                    <h4 className="Activeh4AtBlood" id="new_aacount">تسجيل جديد</h4> 
                    <h4 id="old_account">حساب موجود</h4> 
                </div>
                <div className="Down">
                    <img src={Image} alt=""/>
                </div>
            </div>
        </div>
        <Footer/>
            </Default>
        </Switch>
    );
}

export default Page2icon1;


