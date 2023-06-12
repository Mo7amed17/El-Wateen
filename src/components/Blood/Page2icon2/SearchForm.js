import { useFormikContext } from "formik";
import BloodTypes from "./BloodTypes";
import { Form } from "formik";
import { useState, useEffect } from "react";
import {  ErrorNotification, BaseApi} from "../../../Helpers/Functions";
import Select from "react-select";
import Options from "../../../Helpers/CitiesList.json";
import { BloodName } from "../../../Helpers/Helpers";
import ReactPaginate from "react-paginate";

const SearchForm = (props) => {
    const [TheCity, setTheCity] = useState("");
    const [ShowBloodTypes, setShowBloodTypes] = useState(false);
    const [CurrentPage, setCurrentPage] = useState(0);
    const [Patients, setPatients] = useState(props?.Patients);
    const [AllPatients, setAllPatients] = useState(props?.Patients);
    const [NotData, setNotData] = useState(false);
    let { values} = useFormikContext();

    const itemsPerPage = 3;

    const getPageItems = (pageNumber) => {
        const startIndex = pageNumber * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return Patients.slice(startIndex, endIndex);
    };

    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };
    

    useEffect(() => {
        let X=document.querySelector(".Close i")
        if(X !==null){
            X.addEventListener("click",()=>{
                setShowBloodTypes(false)
            })
        }
    }, [ShowBloodTypes]);

    return (
        <Form>
        <div className="TopButtons">
            <div className="TheTop">
            {ShowBloodTypes===true ? (<BloodTypes/>) : (<></>)}
            <button type="button" onClick={()=>{
                setShowBloodTypes(true)
            }}>حدد نوع الفصيلة</button>
            
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
                                            setShowBloodTypes(false)
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
                    fetch(`${BaseApi}/Donnars?blood_type=${values?.blood_type}&search=true`)
                    .then((res)=>res.json())
                    .then((data)=>{
                        if(data.length===0){
                            setNotData(true)
                        }else {
                            setNotData(false)
                        }
                            setPatients(data)
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
                    fetch(`${BaseApi}/Donnars?location=${TheCity}&search=true`)
                    .then((res)=>res.json())
                    .then((data)=>{
                        if(data.length===0){
                            setNotData(true)
                        }else {
                            setNotData(false)
                        }
                            setPatients(data)
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
                    fetch(`${BaseApi}/Donnars?blood_type=${values?.blood_type}&location=${TheCity}&search=true`)
                    .then((res)=>res.json())
                    .then((data)=>{
                        if(data.length===0){
                            setNotData(true)
                        }else {
                            setNotData(false)
                        }
                            setPatients(data)
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
                    setPatients(AllPatients)
                }
                
            }}>
                بحـــــــــــــث <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            </div>
        </div>
        {getPageItems(CurrentPage).map((Patient) => {
            return (
            <div className="PatientCard" key={Patient.id}>
                <div className="PatientCardRight">
                <span>{BloodName(Patient?.blood_type)}</span>
                </div>
                <div className="PatientCardLeft">
                <div>
                    <h5>اسم المتبرع</h5>
                    <h6>{Patient?.name}</h6>
                </div>
                <div>
                    <h5>العنوان</h5>
                    <h6>{Patient?.location}</h6>
                </div>
                <div>
                    <h5>رقم الهاتف</h5>
                    <h6 style={{ fontSize: "12px"}}>{Patient?.phone_number}</h6>
                </div>
                <div>
                    <h5>تاريخ تسجيل المتبرع</h5>
                    <h6>{Patient?.date || <>&#8213;</>}</h6>
                </div>
                <div>
                    <h5>وقت تسجيل المتبرع</h5>
                    <h6>{Patient?.time || <>&#8213;</>}</h6>
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
            pageCount={Math.ceil(Patients?.length / itemsPerPage)}
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