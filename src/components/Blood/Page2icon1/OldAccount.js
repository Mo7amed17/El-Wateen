import { useFormikContext } from "formik";
import NewAccount from "./NewAccount";
import { useEffect , useState} from "react";
import { ErrorNotification, PhotoApi, SuccessNotification } from "../../../Helpers/Functions";
import LoadingPage from "../../../Helpers/LoadingPage";
import  secureLocalStorage  from  "react-secure-storage";
const OldAccount = () => {
    let {values ,resetForm} = useFormikContext();
    const [Img, setImg] = useState("");
    const [PhoneNumber, setPhoneNumber] = useState("");
    const [DonnarData, setDonnarData] = useState({});
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
    }, []);
    useEffect(() => {
        let MobileLoginBackground =document.querySelector(".MobileLoginBackground")
        let MobileLogin=document.querySelector(".OldAccount .MobileLogin")
        let ActiveH4=document.querySelectorAll(".Top h4")
        let Icons =document.querySelectorAll("form i")
        let Inputs =document.querySelectorAll("form input")
        let CallTime=document.querySelector(".CallTime h6")
        if(secureLocalStorage.getItem("LoginDonnarAccount")==="true" ){
            CallTime.style.display="flex"
                Icons.forEach((i)=>{
                    i.style.display="none"
                })
                Inputs.forEach((input)=>{
                    input.disabled=true
                    input.style.backgroundColor="white"
                })
                        Inputs[5].checked=DonnarData.alerts

            MobileLoginBackground.style.display="none"
            MobileLogin.style.display="none"
            ActiveH4[0].textContent="تعديل الحساب"
            ActiveH4[1].textContent="حســـابـي"
        }else {
            MobileLoginBackground.style.display="block"
            MobileLogin.style.display="block"
        }
        if(Object.keys(DonnarData).length===0 && secureLocalStorage.getItem("DonnarData")!==null){
                setDonnarData(secureLocalStorage.getItem("DonnarData"))
        }
    }, [DonnarData]);

    return (
        <div className="OldAccount">
            <NewAccount ActiveForm={2} values={DonnarData}/>
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
                                if((data.length)===1){
                                    setDonnarData(data[0])
                                    SuccessNotification("تم تسجيل الدخول بنجاح",1500)
                                    secureLocalStorage.setItem("LoginDonnarAccount","true")
                                    secureLocalStorage.setItem("DonnarData",data[0])
                                    secureLocalStorage.setItem("DonnarId",data[0].id)
                                    let ActiveH4=document.querySelectorAll(".Top h4")
                                    ActiveH4[1].textContent="حســـابـي"
                                    setTimeout(() => {
                                        MobileLoginBackground.style.display="none"
                                        MobileLogin.style.display="none"
                                        let EditButton=document.querySelector(".EditButton button")
                                        if(data[0].search===true){
                                            EditButton.textContent="تعطيل البحث"
                                            EditButton.style.backgroundColor="red"
                                            EditButton.style.borderColor="red"
                                        }else {
                                            EditButton.textContent="تفعيل البحث"
                                            EditButton.style.backgroundColor="green"
                                            EditButton.style.borderColor="green"
                                        }
                                    }, 500);
                                }else 
                                {ErrorNotification("حدث خطأ حاول مرة اخرى")}
                            }).catch((err)=>{
                                ErrorNotification("حدث خطأ حاول مرة اخرى")
                            })
                            .finally(()=>{
                            setTimeout(() => {
                                e.target.disabled=false
                                e.target.style.backgroundColor="#0282ed"
                                e.target.style.cursor="pointer"
                            }, 2500);
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
