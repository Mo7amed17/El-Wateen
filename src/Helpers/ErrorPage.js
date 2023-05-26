import "../Styles/Helpers.css"
import Footer from "./Footer"
const ErrorPage = () => {
    return (
        <>
        <div className="ErrorPage" style={{height:"100vh"}}>
            <h2> خطأ في تحميل المحتوى . . . </h2>
            <i className="fa-solid fa-rotate-right"></i>
        </div>
        <Footer/>
        </>
    );
}

export default ErrorPage;
