import { Switch , Case , Default} from "react-if";
import { CheckActivePage } from "../../../Helpers/Functions";
import { Api } from "../../../Helpers/Functions";
import { useState ,useEffect} from "react";
import LoadingPage from "../../../Helpers/LoadingPage";
import ErrorPage from "../../../Helpers/ErrorPage";
import "../../../Styles/Page2icon1.css"

const Page2icon1 = () => {
    window.localStorage.setItem("ActivePage",1)
    const [ActiveForm, setActiveForm] = useState("");
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