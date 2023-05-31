import { useFormikContext } from "formik";
import { useEffect ,useState} from "react";

const BloodTypes = () => {

    const { values ,setFieldValue ,setFieldError}=useFormikContext();

    useEffect(() => {
        let arrow=document.getElementById("BloodTypeArrow")
        let blood_typeSpan=document.querySelector(".blood_type span") 
        arrow.addEventListener("click",(e)=>{
            document.querySelector(".Background").style.display="block"
        })
        let Types=document.querySelectorAll(".Types")
        Types.forEach(Type => {
            Type.addEventListener("click",(ele)=>{
                blood_typeSpan.textContent=Type.id
                Types.forEach(e => {
                    e.classList.remove("BloodTypeChoosed")
                });
                Type.classList.add("BloodTypeChoosed")
                setFieldValue("blood_type", Type.id)
                setFieldError("blood_type",undefined)
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
                        <div className="Types" id={option.label} key={option.label}>{option.label}</div>
                        )
                    })
                }
                </div>
        </div>
    );
}

export default BloodTypes;
