import Navbar from "./components/Navbar";
import { Route ,Routes } from "react-router-dom";
import MainPage from "./components/MainPage/index";
import Blood from "./components/Blood/index"
import Care from "./components/Care/index"
import Login from "./components/Login"
import NotFoundPage from "./Helpers/NotFoundPage";
import Page2icon1 from "./components/Blood/Page2icon1/index";
import Page2icon2 from "./components/Blood/Page2icon2";
import Page2icon3 from "./components/Blood/Page2icon3";
import Page2icon4 from "./components/Blood/Page2icon4";
import Page2icon5 from "./components/Blood/Page2icon5";
import { ToastContainer } from "react-toastify";
import secureLocalStorage from "react-secure-storage";
import { useEffect } from "react";
function App() {

  useEffect(() => {
    if(secureLocalStorage.getItem("LoginHospitalAccount")==="true" ){
      let Navbarh4=document.querySelectorAll(".list ul li a")
      Navbarh4[3].childNodes[1].textContent="حـســـابــي"
  }
  }, [secureLocalStorage]);
  
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="*" element={<NotFoundPage/>}/>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/التبــرع بالدم" element={<Blood/>}/>
        <Route path="/تسجيل متبرع/التبــرع بالدم" element={<Page2icon1/>}/>
        <Route path="/ابحث بالفصيلة والموقع/التبــرع بالدم" element={<Page2icon2/>}/>
        <Route path="/تسجيـل حالة احتياج للـدم/التبــرع بالدم" element={<Page2icon3/>}/>
        <Route path="/قائمـة حالات احتياج للدم/التبــرع بالدم" element={<Page2icon4/>}/>
        <Route path="/معلومات عن الــــــدم/التبــرع بالدم" element={<Page2icon5/>}/>
        <Route path="/العنايـة المركزة" element={<Care/>}/>
        <Route path="/تسجيل الدخول" element={<Login/>}/>
      </Routes>
      <ToastContainer limit={2}/>
    </div>
  );
}

export default App;
