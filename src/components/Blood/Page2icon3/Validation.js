import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    blood_type: Yup.string().required("يرجى اختيار فصيلة الدم"),
    // test_valid: Yup.string().required("اختبار صلاحية الدم مطلوب"),
    name: Yup.string().required("يرجى ادخال اسم الحالة"),
    hospital: Yup.string().required("يرجى ادخال اسم المستشفى"),
    blood_number: Yup.number().positive("يرجى ادخال عدد اكياس الدم").required("يرجى ادخال عدد اكياس الدم"),
    phone_number: Yup.string()
    .matches(/^01[0-9]{9}$/, 'يجب أن يتكون رقم الهاتف من 11 رقماً تبدأ بـ 01')
    .required('يرجى ادخال رقم الهاتف'),
    location: Yup.string().required(),
});

export const intinalValues={
        blood_type:"",
        name:"",
        phone_number:"",
        location:"",
        hospital:"",
        blood_number:"",
        date:"",
        time:"",
        search:true,
    }
