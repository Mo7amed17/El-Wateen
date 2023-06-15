import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    name: Yup.string().required("يرجى ادخال اسم المستشفى"),
    email: Yup.string().email("يرجى ادخال ايميل المستشفى").required("يرجى ادخال ايميل المستشفى"),
    password: Yup.string().required("يرجى ادخال كلمة السر"),
    location: Yup.string().required("يرجى ادخال عنوان المستشفى"),
    emergency_number: Yup.number().required('يرجى ادخال تليفون الطوارئ'),
    reception_number: Yup.number().required('يرجى ادخال تليفون الاستقبال'),
});

export const intinalValues={
        name:"",
        email:"",
        password:"",
        location:"",
        emergency_number:"",
        reception_number:"",
        cares:[{room_name:"",number:""}],
    }
