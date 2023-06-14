import * as yup from "yup"

const phonePattern = /^(?:\+?6?01)[0-46-9]-*[0-9]{7,8}$/

export const feedbackSchema = yup.object().shape({
    name: yup
        .string()
        .required("Required"),
    email: yup
        .string()
        .email("Please enter a valid email")
        .required("Required"),
    mobile: yup
        .string()
        .matches(phonePattern, {message: "Phone number is not valid"})
        .required("Required"),
    subject: yup
        .string()
        .required("Required"),
    message: yup
        .string()
        .required("Required")
})