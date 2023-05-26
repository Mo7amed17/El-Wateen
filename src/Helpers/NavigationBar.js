import { Link } from "react-router-dom";
import { ArrowAndNavigationBar } from "./Functions";
import { useEffect } from "react";
const NavigationBar = (props) => {
    ArrowAndNavigationBar()
    useEffect(() => {
        let Links=document.querySelectorAll(".NavigationBar a")
        Links.forEach(Link => {
            Link.classList.remove("ActiveNavigationBar")
        });
        switch (props.active) {
            case 1:
                Links[0].classList.add("ActiveNavigationBar")
                break;
            case 2:
                Links[1].classList.add("ActiveNavigationBar")
                break;
            case 3:
                Links[2].classList.add("ActiveNavigationBar")
                break;
            case 4:
                Links[3].classList.add("ActiveNavigationBar")
                break;
            case 5:
                Links[4].classList.add("ActiveNavigationBar")
                break;
            default:
                break;
        }
    }, []);
    return (
        <>
            <div className="NavigationBarIcon"><i className="fa-solid fa-angles-right fa-fade"></i></div>
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
        </>
    );
}

export default NavigationBar;
