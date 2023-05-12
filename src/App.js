import Navbar from "./components/Navbar";
import { Route ,Routes } from "react-router-dom";
import MainPage from "./components/MainPage/index";
import Blood from "./components/Blood/index"
import Care from "./components/Care/index"
import Login from "./components/Login/index"
import NotFoundPage from "./Helpers/NotFoundPage";
function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="*" element={<NotFoundPage/>}/>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/التبــرع بالدم" element={<Blood/>}/>
        <Route path="/تسجيل متبرع/التبــرع بالدم" element={<h1>تسجيل متبرع</h1>}/>
        <Route path="/ابحث بالفصيلة والموقع/التبــرع بالدم" element={<h1>ابحث بالفصيلة والموقع</h1>}/>
        <Route path="/تسجيـل حالة احتياج للـدم/التبــرع بالدم" element={<h1>تسجيـل حالة احتياج للـدم </h1>}/>
        <Route path="/قائمـة حالات احتياج للدم/التبــرع بالدم" element={<h1>قائمـة حالات احتياج للدم </h1>}/>
        <Route path="/معلومات عن الــــــدم/التبــرع بالدم" element={<h1>معلومات عن الــــــدم </h1>}/>
        <Route path="/العنايـة المركزة" element={<Care/>}/>
        <Route path="/تسجيل الدخول" element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
