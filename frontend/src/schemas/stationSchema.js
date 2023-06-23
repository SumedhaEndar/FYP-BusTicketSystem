import * as yup from "yup"

export const stationSchema = yup.object().shape({
    name: yup
        .string()
        .required("Required"),
    state: yup
        .string()
        .required("Required"),
    district: yup
        .string()
        .required("Required"),
    address: yup
        .string()
        .required("Required")
})