import { useFormikContext } from "formik";
import CeareTypes from "./CeareTypes";
import { Form } from "formik";
import { useState, useEffect } from "react";
import {  ErrorNotification, BaseApi} from "../../Helpers/Functions";
import Select from "react-select";
import Options from "../../Helpers/CitiesList.json";
import ReactPaginate from "react-paginate";
import { CareRoomName } from "../../Helpers/Helpers";
const SearchForm = ({Cares , Hospitals ,props}) => {
    const [TheCity, setTheCity] = useState("");
    const [ShowCeareTypes, setShowCeareTypes] = useState(false);
    const [CurrentPage, setCurrentPage] = useState(0);
    const [CaresData, setCaresData] = useState(Cares);
    const [AllPatients, setAllPatients] = useState("");
    const [NotData, setNotData] = useState(false);
    let { values} = useFormikContext();

    const itemsPerPage = 3;

    const getPageItems = (pageNumber) => {
        const startIndex = pageNumber * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return CaresData.slice(startIndex, endIndex);
    };

    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };
    

    useEffect(() => {
        let X=document.querySelector(".Close i")
        if(X !==null){
            X.addEventListener("click",()=>{
                setShowCeareTypes(false)
            })
        }
    }, [ShowCeareTypes]);

    return (
        <Form>
        <div className="TopButtons">
            <div className="TheTop">
            {ShowCeareTypes===true ? (<CeareTypes/>) : (<></>)}
            <button type="button" onClick={()=>{
                setShowCeareTypes(true)
            }}>حدد نوع العناية</button>
            
            <button type="button" onClick={(e)=>{
                                document.querySelector(".Background2").style.display="block"
                            }}>حدد المدينــة</button>
                                <div className="Background2" style={{backgroundColor:"white",display:"none"}}>
                                    <div className="SearchManually">
                                        <Select options={Options}
                                        isSearchable={true}
                                        placeholder="يرجى اختيار المدينة"
                                        noOptionsMessage={() => "لا يوجد مدينة بهذا الاسم"}
                                        isClearable={true}
                                        autoFocus={true}
                                        onChange={(e)=>{
                                            setTheCity(e?.value)
                                        }}
                                        />
                                    </div>
                                    <button type="button" style={{fontSize:"18px",padding:"5px 40px",bottom:"35%"}} onClick={(e)=>{
                                            document.querySelector(".Background2").style.display="none"
                                            setShowCeareTypes(false)
                                    }}>تم</button>
                                </div>

            </div>
            <div className="TheTop">
            <button type="button" style={{ fontSize: "16px" }}
            onClick={(e)=>{
                    e.target.disabled=false
                    e.target.style.backgroundColor="#0282ed"
                    e.target.style.cursor="pointer"
                if((TheCity === "" || TheCity === undefined) && values?.blood_type !== ""){
                    fetch(`${BaseApi}/Patients?blood_type=${values?.blood_type}&search=true`)
                    .then((res)=>res.json())
                    .then((data)=>{
                        if(data.length===0){
                            setNotData(true)
                        }else {
                            setNotData(false)
                        }
                            setCaresData(data)
                    }).catch(()=>{
                        ErrorNotification("واجهتنا مشكله برجاء المحاوله مرة اخرى")
                    })
                    .finally(()=>{
                        e.target.disabled=false
                    e.target.style.backgroundColor="#0282ed"
                    e.target.style.cursor="pointer"
                    })
                }
                else if(values?.blood_type === "" && (TheCity !== "" && TheCity !== undefined)){
                    fetch(`${BaseApi}/Patients?location=${TheCity}&search=true`)
                    .then((res)=>res.json())
                    .then((data)=>{
                        if(data.length===0){
                            setNotData(true)
                        }else {
                            setNotData(false)
                        }
                            setCaresData(data)
                    }).catch(()=>{
                        ErrorNotification("واجهتنا مشكله برجاء المحاوله مرة اخرى")
                    })
                    .finally(()=>{
                        e.target.disabled=false
                    e.target.style.backgroundColor="#0282ed"
                    e.target.style.cursor="pointer"
                    })
                }
                else if(values?.blood_type !== "" && (TheCity !== "" && TheCity !== undefined)){
                    fetch(`${BaseApi}/Patients?blood_type=${values?.blood_type}&location=${TheCity}&search=true`)
                    .then((res)=>res.json())
                    .then((data)=>{
                        if(data.length===0){
                            setNotData(true)
                        }else {
                            setNotData(false)
                        }
                            setCaresData(data)
                    }).catch(()=>{
                        ErrorNotification("واجهتنا مشكله برجاء المحاوله مرة اخرى")
                    })
                    .finally(()=>{
                        e.target.disabled=false
                    e.target.style.backgroundColor="#0282ed"
                    e.target.style.cursor="pointer"
                    })
                }
                else {
                    setCaresData(AllPatients)
                }
                
            }}>
                بحـــــــــــــث <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            </div>
        </div>
        {getPageItems(CurrentPage).map((Care) => {
            // console.log(Care)
            return (
            <div className="PatientCard" key={Care.id}>
                
                <div className="PatientCardLeft" style={{width:"100%"}}>
                <div>
                    <h5>اسم العناية</h5>
                    <h6>{CareRoomName(Care?.room_name)}</h6>
                </div>

                <div>
                    <h5>عدد غرف العناية المتاحة</h5>
                    <h6 style={{color:`${Care?.number=="0" ? "#d20909" : ""}`,fontWeight:"bold",fontSize:"11px"}}>{Care?.number=="0" ? "لا توجد غرف متاحه" : Care?.number}</h6>
                </div>

                <div>
                    <h5>اسم المستشفى</h5>
                    <h6 style={{ fontSize: "9px" }}>{Care?.name}</h6>
                </div>

                <div>
                    <h5>المدينة</h5>
                    <h6>{Care?.city}</h6>
                </div>

                <div>
                    <h5>العنوان</h5>
                    <h6>{Care?.location}</h6>
                </div>

                <div>
                    <h5>رقم الطوارئ</h5>
                    <h6 style={{ fontSize: "12px"}}>{Care?.emergency_number}</h6>
                </div>

                <div>
                    <h5>رقم الاستقبال</h5>
                    <h6 style={{ fontSize: "12px"}}>{Care?.reception_number}</h6>
                </div>

                </div>
            </div>
            );
        })}
        {
            NotData===true ? 
            (
                <h2 className="NoPatients">لا يوجد أشخاص بهذه المواصفات</h2>
            ):(<></>)
        }
        <ReactPaginate
            pageCount={Math.ceil(CaresData?.length / itemsPerPage)}
            pageRangeDisplayed={1}
            marginPagesDisplayed={1}
            previousLabel={"السابق"}
            nextLabel={"التالي"}
            breakLabel={"..."}
            containerClassName={"pagination"}
            activeClassName={"active"}
            onPageChange={handlePageClick}
        />
        </Form>
    );
};

export default SearchForm;