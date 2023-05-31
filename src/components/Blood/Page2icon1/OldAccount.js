import { useFormikContext } from "formik";
import NewAccount from "./NewAccount";
import { useEffect , useState} from "react";
import { ErrorNotification, PhotoApi, SuccessNotification } from "../../../Helpers/Functions";
import LoadingPage from "../../../Helpers/LoadingPage";

const OldAccount = () => {
    let {values ,resetForm} = useFormikContext();
    const [Img, setImg] = useState("");
    const [PhoneNumber, setPhoneNumber] = useState("");
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
            <NewAccount ActiveButton={2}/>
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
                        }} onChange={(e)=>{
                                setPhoneNumber(e.target.value)
                        }}/>
                    </div>
                    <button className="MobileLoginButton" onClick={(e)=>{
                        if(PhoneNumber.length===11 && PhoneNumber.startsWith("01")){
                            let MobileLoginBackground=document.querySelector(".MobileLoginBackground")
                            let MobileLogin=document.querySelector(".OldAccount .MobileLogin")
                            e.target.disabled=true
                            e.target.style.backgroundColor="#0282ed70"
                            e.target.style.cursor="not-allowed"
                            fetch(`https://el-wateen.mo7amed17.repl.co/Donnars?q=${PhoneNumber}`)
                            .then((res)=>res.json())
                            .then((data)=>{
                                console.log(data[0].values)
                                if((data.length)===1){
                                    values=data[0].values
                                    SuccessNotification("تم تسجيل الدخول بنجاح")
                                    setTimeout(() => {
                                        MobileLoginBackground.style.display="none"
                                        MobileLogin.style.display="none"
                                    }, 2600);
                                }
                            }).catch((err)=>{
                                console.log(err)
                                ErrorNotification("حدث خطأ حاول مرة اخرى")
                            })
                            .finally(()=>{
                                e.target.disabled=false
                            e.target.style.backgroundColor="#0282ed"
                            e.target.style.cursor="pointer"
                            })
                        }else {
                            ErrorNotification("يرجى ادخال رقم هاتف صحيح")
                        }
                    }}>حسنــاً</button>
                    <h3 className="MobileLoginHash"> <span><em> # </em></span>انقذ_حياه </h3>
                    
                </div>
        </div>
    );
}

export default OldAccount;
