import { CheckActivePage } from "../../Helpers/Functions";
const index = () => {
    window.localStorage.setItem("ActivePage",3)
    CheckActivePage()
    return (
        <div>
            <h1>تسجيل الدخول</h1>
        </div>
    );
}

export default index;
