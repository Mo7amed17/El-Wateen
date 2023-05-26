import { CheckActivePage } from "../../Helpers/Functions";
import { Link } from "react-router-dom";
import { Switch , Case , Default} from "react-if";
import { PhotoApi } from "../../Helpers/Functions";
import { useState ,useEffect} from "react";
import "../../Styles/Blood.css"
import LoadingPage from "../../Helpers/LoadingPage"
import ErrorPage from "../../Helpers/ErrorPage";
import Footer from "../../Helpers/Footer"
const Blood = () => {
    window.localStorage.setItem("ActivePage",1)
    const [Status, setStatus] = useState("loading");
    const [Reload, setReload] = useState(false);
    const [Page2icon1, setPage2icon1] = useState("");
    const [Page2icon2, setPage2icon2] = useState("");
    const [Page2icon3, setPage2icon3] = useState("");
    const [Page2icon4, setPage2icon4] = useState("");
    const [Page2icon5, setPage2icon5] = useState("");
    const [page2ball, setpage2ball] = useState("");

    useEffect(() => {
        fetch(`${PhotoApi}/page2ball.png`)
        .then((res1)=>{
            if(res1.status!==200){
                setStatus("error")
            }else{
                setpage2ball(res1.url)
            fetch(`${PhotoApi}/page2icon1.png`)
        .then((res2)=>{
            if(res2.status!==200){
                setStatus("error")
            }
            else{
                setPage2icon1(res2.url)
            fetch(`${PhotoApi}/page2icon2.png`)
        .then((res3)=>{
            if(res3.status!==200){
                setStatus("error")
            }
            else{
                setPage2icon2(res3.url)
            fetch(`${PhotoApi}/page2icon3.png`)
        .then((res4)=>{
            if(res4.status!==200){
                setStatus("error")
            }
            else{
                setPage2icon3(res4.url)
            fetch(`${PhotoApi}/page2icon4.png`)
        .then((res5)=>{
            if(res5.status!==200){
                setStatus("error")
            }
            else{
                setPage2icon4(res5.url)
            fetch(`${PhotoApi}/page2icon5.png`)
        .then((res6)=>{
            if(res6.status!==200){
                setStatus("error")
                setTimeout(() => {
                    let reload=document.querySelector(".ErrorPage i")
                reload.addEventListener("click",(e)=>{
                    reload.style.rotate="360deg"
                    setReload(true)
                })
                }, 100);
            }
            else{
                setPage2icon5(res6.url)
                setStatus("done")
            }
        })
            }
            
        })
            }
            
        })
            }
            
        })
            }
            
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
        <div className="Blood Page">
        <div className="topblood">
            <div className="topbloodImage">
            <img src={page2ball} alt=""/>
            </div>
            <h2>يساعد التبرع بالدم على الحد مــن الاصابة بالسرطان وأمراض القلـب والشرايين كما يساعد على تنشيـط الدورة الدمويــــــــــة</h2>
        </div>

        <div className="downblood">
            <Link to={"/تسجيل متبرع/التبــرع بالدم"}>
                <div className="icon"><img src={Page2icon1} alt=""/></div>
                <h4>تسجيل متبرع</h4>
            </Link>

            <Link to={"/ابحث بالفصيلة والموقع/التبــرع بالدم"}>
                    <div className="icon"><img src={Page2icon2} alt=""/></div>
                    <h4>ابحث بالفصيلة والموقع</h4>
            </Link>

            <Link to={"/تسجيـل حالة احتياج للـدم/التبــرع بالدم"}>
                <div className="icon"><img src={Page2icon3} alt=""/></div>
                <h4>تسجيـل حالة احتياج للـدم</h4>
            </Link>

            <Link to={"/قائمـة حالات احتياج للدم/التبــرع بالدم"}>
                    <div className="icon"><img src={Page2icon4} alt=""/></div>
                    <h4>قائمـة حالات احتياج للدم</h4>
            </Link>

            <Link to={"/معلومات عن الــــــدم/التبــرع بالدم"}>
                    <div className="icon"><img src={Page2icon5} alt=""/></div>
                    <h4>معلومات عن الــــــدم</h4>
            </Link>
        </div>
    </div>
    <Footer/>
    </Default>
            </Switch>
    );
}

export default Blood;
