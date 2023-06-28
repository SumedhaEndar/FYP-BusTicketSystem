import * as yup from "yup"

const phonePattern = /^(?:\+?6?01)[0-46-9]-*[0-9]{7,8}$/

// Register
export const partnerRegisterSchema = yup.object().shape({
    name: yup
        .string()
        .required("Required"),
    email: yup
        .string()
        .email("Please enter a valid email")
        .required("Required"),
    contact: yup
        .string()
        .matches(phonePattern, {message: "Phone number is not valid"})
        .required("Required"),
    address: yup
        .string()
        .required("Required")
})