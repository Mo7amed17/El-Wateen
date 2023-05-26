import { Switch , Case , Default} from "react-if";
import { CheckActivePage } from "../../../Helpers/Functions";
import { PhotoApi } from "../../../Helpers/Functions";
import { useState ,useEffect} from "react";
import LoadingPage from "../../../Helpers/LoadingPage";
import ErrorPage from "../../../Helpers/ErrorPage";
import "../../../Styles/Page2icon3.css"
import { Formik } from 'formik';
import React from 'react'
import {validationSchema ,intinalValues} from "./Validation"
import NewAccount from "./NewAccount";
import OldAccount from "./OldAccount";
import NavigationBar from "../../../Helpers/NavigationBar"
import Footer from "../../../Helpers/Footer";
const Page2icon3 = () => {
    window.localStorage.setItem("ActivePage",1)
    const [ActiveForm, setActiveForm] = useState("");
    const [Status, setStatus] = useState("loading");
    const [Reload, setReload] = useState(false);
    const [Image, setImage] = useState("");
            useEffect(() => {
                fetch(`${PhotoApi}/Page2Page2icon3.png`)
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
        <div className="Page2icon3">
            <NavigationBar active={3}/>
            <div className="Right">
                <Formik
                initialValues = {intinalValues}
                validationSchema={validationSchema}
                validateOnChange={false}
                validateOnBlur={false}
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
        <Footer/>
            </Default>
        </Switch>
    );
}

export default Page2icon3;


