import Navbar from "./components/Navbar";
import { Route ,Routes } from "react-router-dom";
import MainPage from "./components/MainPage/index";
import Blood from "./components/Blood/index"
import Care from "./components/Care/index"
import Login from "./components/Login/index"
import NotFoundPage from "./Helpers/NotFoundPage";
import Page2 from "./components/Blood/Page2icon1/index";
import Page2icon3 from "./components/Blood/Page2icon3";
function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="*" element={<NotFoundPage/>}/>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/التبــرع بالدم" element={<Blood/>}/>
        <Route path="/تسجيل متبرع/التبــرع بالدم" element={<Page2/>}/>
        <Route path="/ابحث بالفصيلة والموقع/التبــرع بالدم" element={<h1>ابحث بالفصيلة والموقع</h1>}/>
        <Route path="/تسجيـل حالة احتياج للـدم/التبــرع بالدم" element={<Page2icon3/>}/>
        <Route path="/قائمـة حالات احتياج للدم/التبــرع بالدم" element={<h1>قائمـة حالات احتياج للدم </h1>}/>
        <Route path="/معلومات عن الــــــدم/التبــرع بالدم" element={<h1>معلومات عن الــــــدم </h1>}/>
        <Route path="/العنايـة المركزة" element={<Care/>}/>
        <Route path="/تسجيل الدخول" element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
