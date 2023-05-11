import { CheckActivePage } from "../../Helpers/Functions";
import { Link } from "react-router-dom";
import page2icon1 from "../../media/page2icon1.png"
import page2icon2 from "../../media/page2icon2.png"
import page2icon3 from "../../media/page2icon3.png"
import page2icon4 from "../../media/page2icon4.png"
import page2icon5 from "../../media/page2icon5.png"
import page2ball from "../../media/page2ball.png"
import "../../Styles/Blood.css"
const index = () => {
    window.localStorage.setItem("ActivePage",1)
    CheckActivePage()
    return (
        <div className="Blood Page">
        <div className="topblood">
            <div className="topbloodImage">
            <img src={page2ball} alt=""/>
            </div>
            <h2>يساعد التبرع بالدم على الحد مــن الاصابة بالسرطان وأمراض القلـب والشرايين كما يساعد على تنشيـط الدورة الدمويــــــــــة</h2>
        </div>

        <div className="downblood">
            <Link to={"/تسجيل متبرع/التبــرع بالدم"}>
                <div className="icon"><img src={page2icon1} alt=""/></div>
                <h4>تسجيل متبرع</h4>
            </Link>

            <Link to={"/ابحث بالفصيلة والموقع/التبــرع بالدم"}>
                    <div className="icon"><img src={page2icon2} alt=""/></div>
                    <h4>ابحث بالفصيلة والموقع</h4>
            </Link>

            <Link to={"/تسجيـل حالة احتياج للـدم/التبــرع بالدم"}>
                <div className="icon"><img src={page2icon3} alt=""/></div>
                <h4>تسجيـل حالة احتياج للـدم</h4>
            </Link>

            <Link to={"/قائمـة حالات احتياج للدم/التبــرع بالدم"}>
                    <div className="icon"><img src={page2icon4} alt=""/></div>
                    <h4>قائمـة حالات احتياج للدم</h4>
            </Link>

            <Link to={"/معلومات عن الــــــدم/التبــرع بالدم"}>
                    <div className="icon"><img src={page2icon5} alt=""/></div>
                    <h4>معلومات عن الــــــدم</h4>
            </Link>
        </div>
    </div>
    );
}

export default index;
