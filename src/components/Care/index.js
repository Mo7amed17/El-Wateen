import { CheckActivePage } from "../../Helpers/Functions";
const index = () => {
    window.localStorage.setItem("ActivePage",2)
    CheckActivePage()
    return (
        <div>
            <h1>العنايه المركزه</h1>
        </div>
    );
}

export default index;
