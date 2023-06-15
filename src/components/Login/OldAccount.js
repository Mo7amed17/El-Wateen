import { useFormikContext } from "formik";
import NewAccount from "./NewAccount";
import { useEffect , useState} from "react";
import { ErrorNotification, SuccessNotification } from "../../Helpers/Functions";
import  secureLocalStorage  from  "react-secure-storage";

const OldAccount = () => {
    let {values , resetForm} = useFormikContext();
    const [HospitalData, setHospitalData] = useState({});
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const emailRegex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
    useEffect(() => {
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
        if(secureLocalStorage.getItem("LoginHospitalAccount")==="true" ){
                Icons.forEach((i)=>{
                    i.style.display="none"
                })
                Inputs.forEach((input)=>{
                    input.disabled=true
                    input.style.backgroundColor="white"
                })

            MobileLoginBackground.style.display="none"
            MobileLogin.style.display="none"
            ActiveH4[0].textContent="تعديل الحساب"
            ActiveH4[1].textContent="حســـابـي"
        }else {
            MobileLoginBackground.style.display="block"
            MobileLogin.style.display="block"
        }
        if(Object.keys(HospitalData).length===0 && secureLocalStorage.getItem("HospitalData")!==null){
                setHospitalData(secureLocalStorage.getItem("HospitalData"))
        }
    }, [HospitalData]);

    return (
        <div className="OldAccount">
            <NewAccount ActiveForm={2} values={HospitalData}/>
                <div className="MobileLogin">
                    <div className="MobileLoginInput">
                        <h3 style={{color:"#0282ed",padding:"0% 15%"}}>تسجيل الدخول لحساب المستشفى</h3>
                        <div className="input" name="email">
                    <label maxLength="25" htmlFor="email" style={{marginRight:"20px",textAlign:"start"}}>البريد الالكتروني</label>
                    <input type="email" id="email" value={values.email} onChange={(e)=>{
                        setEmail(e.target.value)
                    }}/>
                </div>

                <div className="input" name="password">
                    <label maxLength="16" htmlFor="password" style={{marginRight:"20px",textAlign:"start"}}>كلمة السر</label>
                    <input type="password" id="password" value={values.password} onChange={(e)=>{
                        setPassword(e.target.value)
                    }} />
                </div>
                
                    </div>
                    <button className="MobileLoginButton" onClick={(e)=>{
                        if(Email!=="" && Password !=="" && emailRegex.test(Email)){
                            let MobileLoginBackground=document.querySelector(".MobileLoginBackground")
                            let MobileLogin=document.querySelector(".OldAccount .MobileLogin")
                            e.target.disabled=true
                            e.target.style.backgroundColor="#0282ed70"
                            e.target.style.cursor="not-allowed"
                            fetch(`https://el-wateen.mo7amed17.repl.co/Hospitals?email=${Email}&password=${Password}`)
                            .then((res)=>res.json())
                            .then((data)=>{
                                if((data.length)===1){
                                    setHospitalData(data[0])
                                    SuccessNotification("تم تسجيل الدخول بنجاح",1500)
                                    secureLocalStorage.setItem("LoginHospitalAccount","true")
                                    secureLocalStorage.setItem("HospitalData",data[0])
                                    secureLocalStorage.setItem("HospitalId",data[0].id)
                                    let ActiveH4=document.querySelectorAll(".Top h4")
                                    ActiveH4[1].textContent="حســـابـي"
                                    setTimeout(() => {
                                        MobileLoginBackground.style.display="none"
                                        MobileLogin.style.display="none"
                                    }, 500);
                                }else 
                                {ErrorNotification("الحساب غير موجود !")}
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
                            ErrorNotification("يرجى ادخال معلومات تسجيل الدخول")
                        }
                    }}>حسنــاً</button>
                    <h3 className="MobileLoginHash"> <span><em> # </em></span>انقذ_حياه </h3>
                    
                </div>
        </div>
    );
}

export default OldAccount;
