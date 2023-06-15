
import { useEffect ,useState} from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import secureLocalStorage from "react-secure-storage";

let counter=1
export const SliderToRight = (ele1,ele2,ele3)=>{
    if(counter===3){
        counter=1;
    }else
    counter++;
    switch (counter) {
        case 1:
            {   
                ele1.style.transitionDuration="0.8s"
                ele1.style.visibility="visible"
                ele1.style.left="50%"
                ele2.style.left="-55%"
                ele3.style.left="150%"
                ele2.style.visibility="hidden"
                ele3.style.visibility="hidden"
                ele2.style.transitionDuration="0s"
                ele3.style.transitionDuration="0s"
                break;
            }
        case 2:
            {
                ele2.style.visibility="visible"
                ele1.style.visibility="hidden"
                ele3.style.visibility="hidden"
                ele1.style.transitionDuration="0s"
                ele3.style.transitionDuration="0s"
                ele2.style.transitionDuration="0.8s"
                ele1.style.left="150%"
                ele2.style.left="50%"
                ele3.style.left="-55%"
                break;
            }
            case 3:
                {   
                ele3.style.transitionDuration="0.8s"
                ele3.style.visibility="visible"
                ele3.style.left="50%"
                ele1.style.transitionDuration="0s"
                ele1.style.left="-55%"
                ele2.style.left="150%"
                ele1.style.visibility="hidden"
                ele2.style.visibility="hidden"
                ele2.style.transitionDuration="0s"
                break;
            }
        default:
            break;
    }
}

export const SliderToLeft=(ele1,ele2,ele3)=>{
    if(counter===1){
        counter=3;
    }else
    counter--;
    switch (counter) {
        case 1:
            {   
                ele1.style.transitionDuration="0.8s"
                ele1.style.visibility="visible"
                ele1.style.left="50%"
                ele2.style.left="-55%"
                ele3.style.left="150%"
                ele2.style.visibility="hidden"
                ele3.style.visibility="hidden"
                ele2.style.transitionDuration="0s"
                ele3.style.transitionDuration="0s"
                break;
            }
            case 2:
                {
                ele2.style.visibility="visible"
                ele1.style.visibility="hidden"
                ele3.style.visibility="hidden"
                ele1.style.transitionDuration="0s"
                ele3.style.transitionDuration="0s"
                ele2.style.transitionDuration="0.8s"
                ele1.style.left="150%"
                ele2.style.left="50%"
                ele3.style.left="-55%"
                break;
            }
            case 3:
                {   
                ele3.style.transitionDuration="0.8s"
                ele3.style.visibility="visible"
                ele3.style.left="50%"
                ele1.style.left="-55%"
                ele2.style.left="150%"
                ele1.style.visibility="hidden"
                ele2.style.visibility="hidden"
                ele1.style.transitionDuration="0s"
                ele2.style.transitionDuration="0s"
                break;
            }
        default:
            break;
        }
    }

export const CheckActivePage=()=>{
    let Active=+window.localStorage.getItem("ActivePage")
    useEffect(() => {
        let Links=document.querySelectorAll(".list li a")
        Links.forEach(Link => {
            Link.classList.remove("active-nav")
        });
        switch (Active) {
            case 0:
                Links[0].classList.add("active-nav")
                break;
            case 1:
                Links[1].classList.add("active-nav")
                break;
            case 2:
                Links[2].classList.add("active-nav")
                break;
            case 3:
                Links[3].classList.add("active-nav")
                break;
            default:
                break;
        }
    }, [Active]);
}


export const PhotoApi="https://mo7amed17.github.io/El-Wateen-Images"

export const LocationIp="http://api.ipify.org/?format=json"
export const LocationPlcae="http://ip-api.com/json/"

export const BaseApi="https://el-wateen.mo7amed17.repl.co"

export const ArrowAndNavigationBar=()=>{
    const [Direction, setDirection] = useState("right");
    useEffect(() => {
        let NavigationBar=document.querySelector(".NavigationBar")
        let Icon=document.querySelector(".NavigationBarIcon")
        Icon.addEventListener("click",(e)=>{
            setTimeout(() => {
                if(Direction==="right"){
                    Icon.childNodes[0].className="fa-solid fa-angles-left"
                    Icon.style.transitionDuration="0.5s"
                    NavigationBar.style.transitionDuration="0.5s"
                    NavigationBar.style.left="0%"
                    if(window.screen.width<=420 && window.screen.width>330){
                        Icon.style.left="171px"
                    }else if(window.screen.width<=330){
                        Icon.style.left="128px"
                    }
                    else{
                        Icon.style.left="192px"
                        NavigationBar.style.left="0%"
                    }
                    setDirection("left")
                }else if(Direction==="left"){
                        Icon.childNodes[0].className="fa-solid fa-angles-right fa-fade"
                        Icon.style.left="0%"
                        NavigationBar.style.left="-53%"
                    setDirection("right")
                }
            }, 100);
        })
    }, [Direction]);
}

export const ErrorNotification=(msg , time=2500)=>{
    toast.error(msg, {
        position: "top-right",
        autoClose: time,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        closeButton :false
        });
}
export const SuccessNotification=(msg , time=2000)=>{
    toast.success(msg, {
        position: "top-right",
        autoClose: time ,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        closeButton :false
        });
}


export const SubmitForm=(values ,resetForm,type)=>{
    fetch(`https://el-wateen.mo7amed17.repl.co/${type}?q=${values.phone_number}`)
    .then((res)=>res.json())
    .then((data)=>{
        if(data.length===0){
            let Form =document.querySelector("form")
                        let button=document.querySelector("Form .Submit button")
                        let inputselect=document.querySelectorAll(".inputselect span")
                        let inputs=document.querySelectorAll(".input input")
                        button.disabled=true
                        button.style.backgroundColor="#0282ed70"
                        button.style.cursor="not-allowed"
                        values.search=true
                        if(values.alerts===undefined){
                            values.alerts=false
                        }
                        if(values.date===undefined){
                            values.date=""
                        }
                        if(values.time===undefined){
                            values.time=""
                        }
                        axios({
                            method: 'post',
                            url: `${BaseApi}/${type}`,
                            data:values
                        })
                        .then((res)=>{
                            SuccessNotification('تم تسجيل الحساب')
                                inputselect[0].textContent="حدد فصيلة الدم"
                                if(inputs.length===2){
                                    inputselect[1].textContent="اختبار صلاحية التبرع بالدم"
                                }
                                inputs[0].value=""
                                inputs[1].value=""
                                document.querySelector(".TheCity").parentElement.style.display="none"
                                document.querySelector(".Search").style.display="flex"
                                Form.reset();
                                resetForm({values:{}});
                                let Types=document.querySelectorAll(".Types")
                                    Types.forEach(Type => {
                                        Type.classList.remove("BloodTypeChoosed")
                                    });
                                    
                        }).catch((err)=>{
                            ErrorNotification(`خطأ في تسجيل الحساب ، حاول ثانية`)
                        }).finally(()=>{
                            button.disabled=false
                            button.style.backgroundColor="#0282ed"
                            button.style.cursor="pointer"
                        })
        }
        else {
            ErrorNotification("تم استخدام رقم الهاتف من قبل")
        }
    })
}
export const UpdateForm=(values ,resetForm,id,type)=>{
    let Data=""
    if(type==="Donnars"){
        Data="DonnarData"
    }else if(type === "Patients"){
        Data="PatientData"
    }
    let Form =document.querySelector("form")
    let button=document.querySelector("Form .Submit button")
    let inputselect=document.querySelectorAll(".inputselect span")
    let inputs=document.querySelectorAll(".input input")
    if(values.phone_number!==(secureLocalStorage.getItem(Data)).phone_number){
        fetch(`https://el-wateen.mo7amed17.repl.co/${type}?q=${values.phone_number}`)
        .then((res)=>res.json())
        .then((data)=>{
            if(data.length===0){
                button.disabled=true
                button.style.backgroundColor="#0282ed70"
                button.style.cursor="not-allowed"
                axios({
                    method: 'patch',
                    url: `https://el-wateen.mo7amed17.repl.co/${type}/${id}`,
                    data:values
                })
                .then((data)=>{
                        SuccessNotification('تم تعديل البيانات')
                        setTimeout(() => {
                            window.location.reload()
                        }, 2000);
                        secureLocalStorage.setItem(Data,values)
                            inputselect[0].textContent="حدد فصيلة الدم"
                            if(inputs.length===2){
                                inputselect[1].textContent="اختبار صلاحية التبرع بالدم"
                            }
                            inputs[0].value=""
                            inputs[1].value=""
                            document.querySelector(".TheCity").parentElement.style.display="none"
                            document.querySelector(".Search").style.display="flex"
                            Form.reset();
                            resetForm({values:{}});
                            let Types=document.querySelectorAll(".Types")
                                if(Types!==undefined){
                                    Types.forEach(Type => {
                                        Type.classList.remove("BloodTypeChoosed")
                                    })}
                                })
                        .catch((err)=>{
                        ErrorNotification(`خطأ في تعديل الحساب ، حاول ثانية`)
                    })
                
            }
            else {
                ErrorNotification("تم استخدام رقم الهاتف من قبل")
            }
        })
    }else{
        button.disabled=true
                button.style.backgroundColor="#0282ed70"
                button.style.cursor="not-allowed"
                axios({
                    method: 'patch',
                    url: `https://el-wateen.mo7amed17.repl.co/${type}/${id}`,
                    data:values
                })
                .then((data)=>{
                        SuccessNotification('تم تعديل البيانات')
                        secureLocalStorage.setItem(Data,values)
                        setTimeout(() => {
                            window.location.reload()
                        }, 2000);
                            inputselect[0].textContent="حدد فصيلة الدم"
                            if(inputs.length===2){
                                inputselect[1].textContent="اختبار صلاحية التبرع بالدم"
                            }
                            inputs[0].value=""
                            inputs[1].value=""
                            document.querySelector(".TheCity").parentElement.style.display="none"
                            document.querySelector(".Search").style.display="flex"
                            Form.reset();
                            resetForm({values:{}});
                            let Types=document.querySelectorAll(".Types")
                                if(Types!==undefined){
                                    Types.forEach(Type => {
                                        Type.classList.remove("BloodTypeChoosed")
                                    })}
                                })
                        .catch((err)=>{
                        ErrorNotification(`خطأ في تعديل الحساب ، حاول ثانية`)
                    })
                
    }
}

export const SubmitHospitalForm=(values ,resetForm)=>{
    fetch(`https://el-wateen.mo7amed17.repl.co/Hospitals?q=${values.email}`)
    .then((res)=>res.json())
    .then((data)=>{
        if(data.length===0){
            let Form =document.querySelector("form")
                        let buttons=document.querySelectorAll("Form .Submit button")
                        buttons[0].disabled=true
                        buttons[0].style.backgroundColor="#0282ed70"
                        buttons[0].style.cursor="not-allowed"
                        buttons[1].disabled=true
                        buttons[1].style.backgroundColor="#0282ed70"
                        buttons[1].style.cursor="not-allowed"
                        axios({
                            method: 'post',
                            url: `${BaseApi}/Hospitals`,
                            data:values
                        })
                        .then((res)=>{
                            SuccessNotification('تم تسجيل الحساب')
                                Form.reset();
                                resetForm({values:{}});
                                let Types=document.querySelectorAll(".Types")
                                    Types.forEach(Type => {
                                        Type.classList.remove("BloodTypeChoosed")
                                    });
                                    
                        }).catch((err)=>{
                            ErrorNotification(`خطأ في تسجيل الحساب ، حاول ثانية`)
                        }).finally(()=>{
                            buttons[0].disabled=false
                            buttons[0].style.backgroundColor="#0282ed"
                            buttons[0].style.cursor="pointer"
                            buttons[1].disabled=false
                            buttons[1].style.backgroundColor="#0282ed"
                            buttons[1].style.cursor="pointer"
                        })
        }
        else {
            ErrorNotification("تم استخدام هذا الايميل من قبل")
        }
    })
}

export const UpdateHospitalForm=(values ,resetForm,id,type)=>{
    const emailRegex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
    let Data="HospitalData"
    let Form =document.querySelector("form")
    let button=document.querySelector("Form .Submit .TargetButton")
    let inputs=document.querySelectorAll(".input input")

    if(emailRegex.test(values?.email)){
        fetch(`https://el-wateen.mo7amed17.repl.co/${type}?q=${values?.email}`)
        .then((res)=>res.json())
        .then((data)=>{
            if((data.length===0) || ((data.length===1)&& (data[0]?.email ===secureLocalStorage.getItem("HospitalData")?.email))){
                button.disabled=true
                button.style.backgroundColor="#0282ed70"
                button.style.cursor="not-allowed"
                axios({
                    method: 'patch',
                    url: `https://el-wateen.mo7amed17.repl.co/${type}/${id}`,
                    data:values
                })
                .then((data)=>{
                        SuccessNotification('تم تعديل البيانات')
                        setTimeout(() => {
                            window.location.reload()
                        }, 2000);
                        secureLocalStorage.setItem(Data,values)
                            inputs[0].value=""
                            inputs[1].value=""
                            Form.reset();
                            resetForm({values:{}});
                                })
                        .catch((err)=>{
                        ErrorNotification(`خطأ في تعديل الحساب ، حاول ثانية`)
                    })
            }
            else {
                ErrorNotification("تم استخدام هذا الايميل من قبل")
            }
        })
    }else {
        ErrorNotification("يرجى ادخال ايميل صحيح")
    }
}