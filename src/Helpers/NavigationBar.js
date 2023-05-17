import { Link } from "react-router-dom";
import { useEffect } from "react";

const NavigationBar = () => {
    return (
        <div className="NavigationBar">
            <Link to={"/تسجيل متبرع/التبــرع بالدم"}>
                <h4>تسجيل متبرع</h4>
            </Link>

            <Link to={"/ابحث بالفصيلة والموقع/التبــرع بالدم"}>
                    <h4>ابحث بالفصيلة والموقع</h4>
            </Link>

            <Link to={"/تسجيـل حالة احتياج للـدم/التبــرع بالدم"}>
                <h4>تسجيـل حالة احتياج للـدم</h4>
            </Link>

            <Link to={"/قائمـة حالات احتياج للدم/التبــرع بالدم"}>
                    <h4>قائمـة حالات احتياج للدم</h4>
            </Link>

            <Link to={"/معلومات عن الــــــدم/التبــرع بالدم"}>
                    <h4>معلومات عن الــــــدم</h4>
            </Link>
        </div>
    );
}

export default NavigationBar;
