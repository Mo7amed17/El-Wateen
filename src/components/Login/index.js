import { Switch , Case , Default} from "react-if";
import { CheckActivePage ,ErrorNotification,PhotoApi ,SubmitHospitalForm, UpdateHospitalForm} from "../../Helpers/Functions";
import { useState ,useEffect} from "react";
import LoadingPage from "../../Helpers/LoadingPage";
import ErrorPage from "../../Helpers/ErrorPage";
import { Formik } from 'formik';
import React from 'react'
import {validationSchema ,intinalValues} from "./Validation"
import NewAccount from "./NewAccount";
import OldAccount from "./OldAccount";
import Footer from "../../Helpers/Footer";
import secureLocalStorage from "react-secure-storage";
import "../../Styles/Page2icons.css"
const Page2icon1 = () => {
    let Newvalues={...secureLocalStorage.getItem("HospitalData")}

    window.localStorage.setItem("ActivePage",3)
    const [ActiveForm, setActiveForm] = useState();
    const [Status, setStatus] = useState("loading");
    const [Reload, setReload] = useState(false);
    const [Image, setImage] = useState("");
    let Valid=0
            useEffect(() => {
                fetch(`${PhotoApi}/Login.png`)
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
                            document.querySelector("footer").style.marginTop="200px"
                        if(secureLocalStorage.getItem("LoginHospitalAccount")==="true" ){
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
            <div className="Right">
                <Formik
                initialValues = {intinalValues}
                validationSchema={secureLocalStorage.getItem("LoginHospitalAccount")==="true" ? ("") : (validationSchema)}
                validateOnChange={true}
                validateOnBlur={false}
                isInitialValid={false}
                onSubmit={(values , {resetForm})=>{
                    values.cares.map((care)=>{
                        if(care.room_name!=="",care.number!=="" ){
                            Valid=1
                        }
                    })
                    if(secureLocalStorage.getItem("LoginHospitalAccount")==="true"){
                        Object.keys(values).map((key)=>{
                            Object.keys(Newvalues).map((k)=>{
                                if (key in values && values[key] !== "" && key===k) {
                                    Newvalues[k]=values[key]
                                }
                            })
                        })  
                        Newvalues.cares=secureLocalStorage.getItem("HospitalData").cares
                        if(JSON.stringify(Newvalues) === JSON.stringify(secureLocalStorage.getItem("HospitalData"))){
                            ErrorNotification("لم تقم بأي تعديلات")
                        }
                        else{
                                UpdateHospitalForm(Newvalues ,resetForm,secureLocalStorage.getItem("HospitalId"),"Hospitals")
                            }
                    }else {
                        if(Valid===1){
                            SubmitHospitalForm(values ,resetForm)
                        }else {
                            ErrorNotification("برجاء ادخال عناية واحده على الأقل")
                        }
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


