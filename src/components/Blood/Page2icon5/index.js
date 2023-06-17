import { Switch , Case , Default} from "react-if";
import { CheckActivePage ,ErrorNotification,PhotoApi } from "../../../Helpers/Functions";
import { useState ,useEffect} from "react";
import LoadingPage from "../../../Helpers/LoadingPage";
import ErrorPage from "../../../Helpers/ErrorPage";
import React from 'react'
import NavigationBar from "../../../Helpers/NavigationBar"
import Footer from "../../../Helpers/Footer";
import { BaseApi } from "../../../Helpers/Functions";

const Page2icon5 = () => {

    window.localStorage.setItem("ActivePage",1)
    const [Status, setStatus] = useState("loading");
    const [Reload, setReload] = useState(false);
    const [Image, setImage] = useState("");
    const [Patients, setPatients] = useState([]);
            useEffect(() => {
                fetch(`${PhotoApi}/Page2Page2icon5.png`)
                .then((res1)=>{
                    if(res1.status!==200){
                        setStatus("error")
                        setTimeout(() => {
                            let reload=document.querySelector(".ErrorPage i")
                        reload.addEventListener("click",(e)=>{
                            reload.style.rotate="360deg"
                            setReload(true)
                        })
                        }, 100);
                    }
                    else {
                            setStatus("done")
                            setImage(res1.url)
                    }
                })
            }, [Reload]);
            CheckActivePage()

            const Questions=[
                {
                    header:"يساعــــــد التبــــــــرع بالــــــــدم على تنشيــــــــط الـــدورة الدمويــــة مما يساعـــد",
                    data:[
                        "على تنشيــــط نخاع العظــــــــام في انتاج خلايا جديدة تستطيع حمل كمية أكبر من",
                        "الاكسجين الى أعضاء الجسم الرئيسية مثل الدماغ فيساعد على زيــــــادة التركيــــز",
                        "والنشــاط وعدم الخمول و الـحد من الاصابــه بالســرطان وأمراض القلب والشرايين",
                        "عن طريق تقليل نسبة الحديد بالدم حيث ثبت علميا أن زيادة الحديد بالدم تزيد الاصابه",
                        "بهذه الأمراض و يساعد التبرع في خفض الوزن حيث يعمل على حرق الكثير من الدهون",
                        "والسعـرات الحـرارية بما يعادل 650 سعرا حراريـا  لعلاج قرحة المعـدة والصداع النصفي"
                    ]
                },
                {
                    header:"متى يمكن معاودة التبرع بالدم؟",
                    data:[
                        "ينصح بالتبرع بالدم بعد مرور 6 أشهر من اخر تبرع بالدم في حين أنه لتكرار التبــرع",
                        "يمكن التبرع بالدم قبل ذلك في الفترة من 3-4 أشهرولكن يجب أن يكون المتبرع",
                        " لائــــــــــــــــــــــــــــق طبيـــــــــــــــــــــــــــــــــــا"
                    ]
                },
                {
                    header:"ما كمية الدم التي يتم أخذها من المتبرع في المرة الواحدة؟",
                    data:[
                        " يتم أخـــذ من 400 إلى 450 مليلترا، وهو ما يمثل حوالي 1/12 من حجم الـــــــدم",
                        " الموجــــــــــــــــــــود داخل جســـــــم كل إنسان، والذي يتراوح بين 5 إلى 6 لتــــــــرات"
                    ]
                },
                {
                    header:"هل توجد مضاعفات قد يتعرض لها المتبرع؟",
                    data:[
                        "لا توجـد مضاعفات للتبرع بالدم طالما قام الطبيـب بتوقيع الكشف الطبي عليك",
                        " وأقر ملاءمتك للتبرع"
                    ]
                },
                {
                    header:"يعـــوض الجسم كميــــــة الدم التي فقـــدت خلال ساعات، وأغلب الناس يزاولون ",
                    data:[
                        "أنشطتهم العادية بعد التبرع",
                    ]
                },
                {
                    header:"نادراً ما تحدث بعض الأعراض؛ مثل الدوخة أو القيء وتزول تلقائيا بعد فترة وجيزة",
                    data:[]
                },

            ]

    return (
        <Switch>
            <Case condition={Status==="loading"}>
                <LoadingPage/>
            </Case>
            <Case condition={Status==="error"}>
                <ErrorPage/>
            </Case>
            <Default>
        <div className="Page2icon5" style={{marginBottom:"200px"}}>
            <NavigationBar active={5}/>
            <div className="Top">
                <img src={Image} alt="El-wateen Photo For Blood"/>
            </div>
            <div className="Down">
                {
                    Questions.map((question)=>{
                        return(
                            <div className="BloodQuestion">
                            <h4>{question?.header}</h4>
                            {
                                (question?.data).map((q)=>{
                                    return(
                                        <h4>{q}</h4>
                                    )
                                })
                            }
                            </div>
                        )
                    })
                }
            </div>
        </div>
        <Footer/>
            </Default>
        </Switch>
    );
}

export default Page2icon5;


