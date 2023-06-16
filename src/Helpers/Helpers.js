
export const BloodName=(name)=>{
    switch (name) {
        case "aplus":
            return name= "+A"
        case "aminus":
            return name= "-A"
        case "bplus":
            return name= "+B"
        case "bminus":
            return name= "-B"
        case "abplus":
            return name= "+AB"
        case "abminus":
            return name= "-AB"
        case "oplus":
            return name= "+O"
        case "ominus":
            return name= "-O"
        default:
            break;
    }
}


export const CareRoomName=(id)=>{
    switch (id) {
        case 1:
            return id= "عناية مركزة لحديثي الولادة"
        case 2:
            return id= "عناية مركزة للأطفال"
        case 3:
            return id= "عناية مركزة للقلب"
        case 4:
            return id= "عناية مركزة للأورام وأنواع مرض السرطان"
        case 5:
            return id= "عناية مركزة للصدر"
        case 6:
            return id= "عناية مركزة للجراحة"
        case 7:
            return id= "عناية مركزة للحروق"
        case 8:
            return id= "العناية المركزة العصبية"
        default:
            break;
    }
}

