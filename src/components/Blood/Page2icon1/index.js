import { Switch , Case , Default} from "react-if";
import { BaseApi, CheckActivePage } from "../../../Helpers/Functions";
import { PhotoApi } from "../../../Helpers/Functions";
import { useState ,useEffect} from "react";
import LoadingPage from "../../../Helpers/LoadingPage";
import ErrorPage from "../../../Helpers/ErrorPage";
import "../../../Styles/Page2icon1.css"
import { Formik } from 'formik';
import React from 'react'
import {validationSchema ,intinalValues} from "./Validation"
import NewAccount from "./NewAccount";
import OldAccount from "./OldAccount";
import NavigationBar from "../../../Helpers/NavigationBar"
import Footer from "../../../Helpers/Footer";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

const Page2icon1 = () => {
    window.localStorage.setItem("ActivePage",1)
    const [ActiveForm, setActiveForm] = useState("");
    const [Status, setStatus] = useState("loading");
    const [Reload, setReload] = useState(false);
    const [Image, setImage] = useState("");
    // const [Donnars, setDonnars] = useState([]);
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
                // fetch(`${BaseApi}/Donnars`).then((res)=>res.json()).then((data)=>{setDonnars(data)})
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
                validationSchema={validationSchema}
                validateOnChange={false}
                validateOnBlur={false}
                isInitialValid={false}
                onSubmit={(values , {resetForm})=>{
                    let Form =document.querySelector("form")
                    let button=document.querySelector("Form .Submit button")
                    let inputselect=document.querySelectorAll(".inputselect span")
                    button.disabled=true
                    button.style.backgroundColor="#0282ed70"
                    button.style.cursor="not-allowed"
                    axios.post(`${BaseApi}/Donnars`,{values})
                    .then((res)=>{
                        toast.success('تم تسجيل الحساب', {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            closeButton :false
                            });
                            inputselect[0].textContent="حدد فصيلة الدم"
                            inputselect[1].textContent="اختبار صلاحية التبرع بالدم"
                            document.querySelector(".TheCity").parentElement.style.display="none"
                            document.querySelector(".Search").style.display="flex"
                            Form.reset();
                            resetForm({values:{}});
                            console.log(values)
                    }).catch((err)=>{
                        toast.error(`خطأ في تسجيل الحساب ، حاول ثانية`, {
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
                    }).finally(()=>{
                        button.disabled=false
                        button.style.backgroundColor="#0282ed"
                        button.style.cursor="pointer"
                    })
                }}
                enableReinitialize>
                    {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
                        <Switch>
                            <Case condition={ActiveForm==="new_aacount"}>
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
        <ToastContainer/>
        <Footer/>
            </Default>
        </Switch>
    );
}

export default Page2icon1;


