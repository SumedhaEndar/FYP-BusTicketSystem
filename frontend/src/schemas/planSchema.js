import * as yup from "yup"

export const planSchema = yup.object().shape({
    depart: yup
        .string()
        .required("Required"),
    arrive: yup
        .string()
        .required("Required"),
    fromDate: yup
        .date()
        .required("Required"),
    toDate: yup
        .date()
        .required("Required"),
    price: yup
        .number()
        .required("Required"),
    time: yup
        .string()
        .required("Required")
})