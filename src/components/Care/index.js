import { Switch , Case , Default} from "react-if";
import { CheckActivePage ,ErrorNotification,PhotoApi } from "../../Helpers/Functions";
import { useState ,useEffect} from "react";
import LoadingPage from "../../Helpers/LoadingPage";
import ErrorPage from "../../Helpers/ErrorPage";
import { Formik } from 'formik';
import React from 'react'
import Footer from "../../Helpers/Footer";
import SearchForm from "./SearchForm";
import { BaseApi } from "../../Helpers/Functions";

const Page2icon1 = () => {

    window.localStorage.setItem("ActivePage",2)
    const [Status, setStatus] = useState("loading");
    const [Reload, setReload] = useState(false);
    const [Image, setImage] = useState("");
    const [HospitalsData, setHospitalsData] = useState([]);
    const [CaresState, setCaresState] = useState([]);
    const Cares=[]

            useEffect(() => {
                fetch(`${PhotoApi}/Login.png`)
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
                        fetch(`${BaseApi}/Hospitals`).then((res2)=>res2.json())
                        .then((data2)=>{
                            setHospitalsData(data2)
                            data2.map((d)=>{
                                d.cares.map((care)=>{
                                    let TheCare={
                                        name:d.name,
                                        city:d.city,
                                        location:d.location,
                                        emergency_number:d.emergency_number,
                                        reception_number:d.reception_number,
                                        number:care.number,
                                        room_name:care.room_name,
                                    }
                                    Cares.push(TheCare)
                                    setCaresState(Cares)
                                })
                            })
                            setStatus("done")
                            setImage(res1.url)
                            setTimeout(() => {
                                if(window.screen.width<=900){
                                    let footer=document.querySelector("footer")
                                footer.style.marginTop="280px"
                                }
                            }, 100);
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
            <div className="Right">
                <Formik
                validateOnChange={false}
                validateOnBlur={false}
                isInitialValid={false}
                initialValues={{care_type:""}}
                enableReinitialize>
                    {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
                        <SearchForm Hospitals={HospitalsData} Cares={CaresState}/>
                    )}
                </Formik>
            </div>
            <div className="Left">
                <div className="Page2Icon4Img Down">
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


