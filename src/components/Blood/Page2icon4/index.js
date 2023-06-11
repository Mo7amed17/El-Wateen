import { Switch , Case , Default} from "react-if";
import { CheckActivePage ,ErrorNotification,PhotoApi } from "../../../Helpers/Functions";
import { useState ,useEffect} from "react";
import LoadingPage from "../../../Helpers/LoadingPage";
import ErrorPage from "../../../Helpers/ErrorPage";
import { Formik } from 'formik';
import React from 'react'
import NavigationBar from "../../../Helpers/NavigationBar"
import Footer from "../../../Helpers/Footer";
import SearchForm from "./SearchForm";
import { BaseApi } from "../../../Helpers/Functions";

const Page2icon1 = () => {

    window.localStorage.setItem("ActivePage",1)
    const [Status, setStatus] = useState("loading");
    const [Reload, setReload] = useState(false);
    const [Image, setImage] = useState("");
    const [Patients, setPatients] = useState([]);
            useEffect(() => {
                fetch(`${PhotoApi}/Page2Page2icon4.png`)
                .then((res1)=>{
                    if(res1.status!==200){
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
                        fetch(`${BaseApi}/Patients?search=true`).then((res2)=>res2.json())
                        .then((data2)=>{
                            setPatients(data2)
                            setStatus("done")
                            setImage(res1.url)
                        })
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
        <div className="Page2icon1" style={{marginBottom:"200px"}}>
            <NavigationBar active={4}/>
            <div className="Right">
                <Formik
                validateOnChange={false}
                validateOnBlur={false}
                isInitialValid={false}
                initialValues={{blood_type:""}}
                enableReinitialize>
                    {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
                        <SearchForm Patients={Patients}/>
                    )}
                </Formik>
            </div>
            <div className="Left">
                <div className="Down" style={{width:"500px",height:"420px"}}>
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


