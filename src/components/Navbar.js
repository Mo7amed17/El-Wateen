import logo from "../media/logo-nav.png"
import { Link } from "react-router-dom";
import "../Styles/Navbar.css"
import { useEffect } from "react";
const Navbar = () => {
            useEffect(() => {
                let Links=document.querySelectorAll(".list li a")
                Links.forEach((Link,index) => {
                    Link.addEventListener("click",(e)=>{
                        Links.forEach(ele => {
                            ele.classList.remove("active-nav")
                        });
                        e.target.classList.add("active-nav")
                        window.localStorage.setItem("ActivePage",index)
                    })
                });
            }, []);
    return (
        <nav>
        <div className="logo">
            <img src={logo} alt=""/>
        </div>
        <div className="list">
            <ul>
                <li><Link to={"/"}>الصفحة الرئيسـية</Link></li>
                <li><Link to={"/التبــرع بالدم"}>التبــرع بالدم</Link></li>
                <li><Link to={"/العنايـة المركزة"}>العنايـة المركزة</Link></li>
                <li>
                    <Link to={"/تسجيل الدخول"}><span style={{marginLeft:"5px"}}><i className="fa-solid fa-user" style={{color:"white",backgroundColor:"rgb(28,124,184)",borderRadius:"50%",padding:"6px",fontSize:"15px"}}></i></span>
                    تسجيل الدخول</Link>
                </li>
            </ul>
        </div>
    </nav>
    );
}

export default Navbar;
