import { useFormikContext } from "formik";
import NewAccount from "./NewAccount";
import { useEffect , useState} from "react";
import { PhotoApi } from "../../../Helpers/Functions";
import LoadingPage from "../../../Helpers/LoadingPage";

const OldAccount = () => {
    const {values ,resetForm} = useFormikContext();
    const [Img, setImg] = useState("");
    useEffect(() => {
        fetch(`${PhotoApi}/11.png`).then((res)=>{
            if(res.status===200){
                let TheLoadingSpinner=document.querySelector(".TheLoadingSpinner")
                TheLoadingSpinner.style.display="none"
                setImg(res.url)
            }
        })
        let Form =document.querySelector("form")
        Form.reset();
        resetForm({values:{}})
        let MobileLoginBackground =document.querySelector(".MobileLoginBackground")
        MobileLoginBackground.style.display="block"
    }, []);
    return (
        <div className="OldAccount">
            <NewAccount/>
                <div className="MobileLogin">
                    <div className="MobileLoginImg">
                        <img src={Img} alt="El-Wateen Logo"/>
                        <div className="TheLoadingSpinner" style={{position:"absolute",top:"-30%",left:"50%"}}>
                        <LoadingPage/>
                        </div>
                    </div>
                    <div className="MobileLoginInput">
                        <label>ادخـل رقم هاتفك المحمول</label>
                        <input maxLength="11" type="tel" placeholder="ادخل رقم الهاتف" onKeyPress={(e)=>{
                            if(e.charCode>=48 && e.charCode <=57){
                            }
                            else {
                                e.preventDefault()
                            }
                        }}/>
                    </div>
                    <button className="MobileLoginButton">حسنــاً</button>
                    <h3 className="MobileLoginHash"> <span><em> # </em></span>انقذ_حياه </h3>
                    
                </div>
        </div>
    );
}

export default OldAccount;
