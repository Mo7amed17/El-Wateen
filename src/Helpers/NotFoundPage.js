import { Link } from "react-router-dom";
import "../Styles/Helpers.css"
import Footer from "./Footer"
const NotFoundPage = () => {
    return (
        <>
        <div className="NotFoundPage">
            <i className="fa-solid fa-triangle-exclamation"></i>
            <h1>الصفحة التي تحاول الوصول اليها غير موجودة</h1>
            <Link to={"/"}>الصفحة الرئيسية</Link>
        </div>
        <div style={{marginTop:"100vh"}}>
        <Footer/>
        </div>
        </>
    );
}

export default NotFoundPage;
