import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    blood_type: Yup.string().required("يرجى اختيار فصيلة الدم"),
    test_valid: Yup.string().required("اختبار صلاحية الدم مطلوب"),
    name: Yup.string().required("يرجى ادخال اسم المتبرع"),
    phone_number: Yup.number().positive().required("يرجى ادخال رقم الهاتف"),
});

export const intinalValues={
        blood_type:"",
        test_valid:"",
        name:"",
        phone_number:"",
        location:"",
        time:"",
    }
