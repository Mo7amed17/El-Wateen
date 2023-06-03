import { useFormikContext } from "formik";
import { useEffect ,useState} from "react";

const BloodTypes = () => {

    const { values ,setFieldValue ,setFieldError}=useFormikContext();

    useEffect(() => {
        let arrow=document.getElementById("BloodTypeArrow")
        arrow.addEventListener("click",(e)=>{
            document.querySelector(".Background").style.display="block"
        })
        let Types=document.querySelectorAll(".Types")
        Types.forEach(Type => {
            Type.addEventListener("click",(ele)=>{
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
        { label: '+A' ,value:"aplus"},
        { label: '-A' ,value:"aminus"},
        { label: '+B' ,value:"bplus"},
        { label: '-B' ,value:"bminus"},
        { label: '+AB' ,value:"abplus"},
        { label: '-AB' ,value:"abminus"},
        { label: '+O' ,value:"oplus"},
        { label: '-O' ,value:"ominus"},
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
                        <div className="Types" id={option.value} key={option.value}>{option.label}</div>
                        )
                    })
                }
                </div>
        </div>
    );
}

export default BloodTypes;
