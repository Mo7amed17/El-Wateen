import { useFormikContext } from "formik";
import { useEffect } from "react";

const BloodTypes = () => {

    const { values }=useFormikContext();

    useEffect(() => {
        let arrow=document.getElementById("BloodTypeArrow")
        let blood_type=document.querySelector(".blood_type input")
        arrow.addEventListener("click",(e)=>{
            document.querySelector(".Background").style.display="block"
        })
        let Types=document.querySelectorAll(".Types")
        Types.forEach(Type => {
            Type.addEventListener("click",(ele)=>{
                blood_type.value=Type.textContent
                Types.forEach(e => {
                    e.classList.remove("BloodTypeChoosed")
                });
                Type.classList.add("BloodTypeChoosed")
                values.blood_type=Type.textContent
            })
        });
    }, []);
    const options = [
        { label: '+A' },
        { label: '-A' },
        { label: '+B' },
        { label: '-B' },
        { label: '+AB' },
        { label: '-AB' },
        { label: '+O' },
        { label: '-O' },
    ]
    return (
        <div className="Background">
        <div className="BloodTypes">
            <span className="Close" onClick={(e)=>{
                document.querySelector(".Background").style.display="none"
            }}><i className="fa-solid fa-x"></i></span>
            {
                options.map((option)=>{
                    return(
                        <div className="Types" key={option.label}>{option.label}</div>
                        )
                    })
                }
                </div>
        </div>
    );
}

export default BloodTypes;
