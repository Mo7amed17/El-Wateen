import { Link } from "react-router-dom";
import RightHomeImage from "../../media/1.png"
import LeftHomeImage from "../../media/11.png"
import { CheckActivePage, SliderToLeft } from "../../Helpers/Functions";
import { useEffect } from "react";
import { SliderToRight } from "../../Helpers/Functions";
import "../../Styles/Home.css"

const MainPage = () => {
    window.localStorage.setItem("ActivePage",0)
    CheckActivePage()
    useEffect(() => {
        let SliderElements=document.querySelectorAll(".Slider ul li")
        let RightArrow=document.getElementById("RightArrow")
        let LeftArrow=document.getElementById("LeftArrow")
        RightArrow.onclick=()=>{
            SliderToRight(SliderElements[0],SliderElements[1],SliderElements[2])
        }
        LeftArrow.onclick=()=>{
            SliderToLeft(SliderElements[0],SliderElements[1],SliderElements[2])
        }
        setInterval(() => {
            SliderToRight(SliderElements[0],SliderElements[1],SliderElements[2])
        }, 7000);
    }, []);

    return (
    <div className="Page">
    <div className="Home">
    <div className="RightHome">
        <div className="RightHomeImage">
            <img src={RightHomeImage} alt=""/>
        </div>
    </div>
    <div className="LeftHome">
        <div className="Hash"><img src={LeftHomeImage} alt=""/>
        <h3> <span><em> # </em></span>انقذ_حياه </h3>
        </div>
        <div className="buttons">
            <Link to={"/العنايـة المركزة"}>العنايـة المركزة</Link>
            <Link to={"/التبــرع بالدم"}>التبــــرع بالـدم</Link>
        </div>
    </div>
</div>
<div className="ArrowToBottom">
    <a href="#Slider">
        <i className="fa-solid fa-angles-down"></i>
    </a>
</div>
<div className="Slider" id="Slider">
    <div className="Arrow" id="RightArrow"><i className="fa-solid fa-arrow-right"></i></div>
    <div className="Arrow" id="LeftArrow"><i className="fa-solid fa-arrow-left"></i></div>
    <ul>
        <li style={{left:"50%"}} >عزيـزي المستخـدم كـن على ثقة أن هدفنا من التطبيق هو خدمي بحت</li>
        <li>نحن نرحب في أي وقت بأي شكـــاوى أو استفسارات أو اقتراحات لتطوير التطبيق</li>
        <li style={{left:"150%"}}>نتمنى أن نتعاون سوياً من أجل تحقيـق هدف التطبيق بإسعاف أكبر قدر من المحتاجين</li>
    </ul>
</div>
</div>

    );
}

export default MainPage;
