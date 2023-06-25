import * as yup from "yup"

export const searchStationSchema = yup.object().shape({
    depart: yup
        .string()
        .required("Required"),
    arrive: yup
        .string()
        .required("Required"),
    date: yup
        .date()
        .required("Required")
})