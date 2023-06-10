import { useFormikContext } from "formik";
import { useEffect ,useState} from "react";

const BloodTypes = () => {

    const { values}=useFormikContext();

    useEffect(() => {
        let Types = document.querySelectorAll(".Types");
        Types[6].style.borderRadius="0px"
        Types[7].style.borderRadius="0px"
        Types[6].style.borderBottom="1px solid #1a7cbb"
        Types[7].style.borderBottom="1px solid #1a7cbb"
        Types[8].style.border="none"
        Types[8].style.borderRadius="0px 0px 18px 18px"
        Types[8].style.backgroundColor="white"
        Types[8].style.zIndex="99999"
        Types[8].style.fontSize="16px"
        Types[8].style.width="100%"
        Types.forEach((Type) => {
            Type.addEventListener("click", (ele) => {
                Types.forEach((e) => {
                    e.classList.remove("BloodTypeChoosed");
                });
                Type.classList.add("BloodTypeChoosed");
                values.blood_type=Type.id
            });
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
        { label: 'جميع الفصائل' ,value:""},
    ]
    return (
        <div className="Background">
        <div className="BloodTypes" style={{top:"30%"}}>
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
