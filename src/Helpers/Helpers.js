
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