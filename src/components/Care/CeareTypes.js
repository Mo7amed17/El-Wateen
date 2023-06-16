import { useFormikContext } from "formik";
import { useEffect ,useState} from "react";

const CeareTypes = () => {

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
        Types[8].style.width="100%"
        Types.forEach((Type) => {
            Type.addEventListener("click", (ele) => {
                Types.forEach((e) => {
                    e.classList.remove("BloodTypeChoosed");
                });
                Type.classList.add("BloodTypeChoosed");
                values.care_type=Type.id
            });
        });
    }, []);

    const Options = [
        { label: "حديثي الولادة", value: 1 },
        { label: "للأطفال", value: 2 },
        { label: "للقلب", value: 3 },
        { label: "الأورام", value: 4 },
        { label: "للصدر", value: 5 },
        { label: "للجراحة", value: 6 },
        { label: "للحروق", value: 7 },
        { label: "العصبية", value: 8 },
        { label: "الجميع", value: 9 },
        ];

    return (
        <div className="Background">
        <div className="BloodTypes" style={{top:"40%",width:"80%"}}>
            <span className="Close" onClick={(e)=>{
                document.querySelector(".Background").style.display="none"
            }}><i className="fa-solid fa-x"></i></span>
            {
                Options.map((option)=>{
                    return(
                        <div className="Types" id={option.value} key={option.value}>{option.label}</div>
                        )
                    })
                }
                </div>
        </div>
    );
}

export default CeareTypes;
