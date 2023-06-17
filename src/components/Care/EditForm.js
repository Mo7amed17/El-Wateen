import { Form } from "formik";
import { useState, useEffect } from "react";
import {  ErrorNotification, BaseApi} from "../../Helpers/Functions";
import Select from "react-select";
import Options from "../../Helpers/CitiesList.json";
import ReactPaginate from "react-paginate";
import { CareRoomName } from "../../Helpers/Helpers";
const EditForm = ({Cares ,props}) => {
    console.log(Cares)
    const [CurrentPage, setCurrentPage] = useState(0);
    const [CaresData, setCaresData] = useState(Cares);

    const itemsPerPage = 8;

    const getPageItems = (pageNumber) => {
        const startIndex = pageNumber * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return CaresData.slice(startIndex, endIndex);
    };

    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };
    

    return (
        <Form className="CaresCardForm">
            {
                Cares.length>0 ? (<span className="FreeRooms">عدد الغرف المتاحة</span>) : (<></>)
            }
        {getPageItems(CurrentPage).map((Care,index) => {
            return (
            <div className="CaresCard" key={index}>
                <div className="RoomName">
                    <input type="text" disabled={true} value={CareRoomName(Care?.room_name)}/>
                </div>
                
                <div className="RoomNumber">
                    <input type="text" disabled={true} value={Care?.number}/>
                </div>

                <div className="RoomEditButton">
                    <button type="button">تعديل</button>
                </div>
            </div>
            );
        })}
                <div className="AddRoomEditButton" style={{textAlign:"center",marginTop:"10px"}}>
                    <button type="button" style={{fontSize:"14px"}}>اضافه عنايات مركزة جديدة</button>
                </div>

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

export default EditForm;