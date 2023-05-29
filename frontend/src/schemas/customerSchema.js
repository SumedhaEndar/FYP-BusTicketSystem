import * as yup from "yup"

const phonePattern = /^(?:\+?6?01)[0-46-9]-*[0-9]{7,8}$/
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/

// Register
export const customerRegisterSchema = yup.object().shape({
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
    password: yup
        .string()
        .min(5)
        .matches(passwordRules, {message: "Please create a stronger password"})
        .required("Required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null],"Passwords must match")
        .required("Required")
})

// Login
export const customerLoginSchema = yup.object().shape({
    email: yup
        .string()
        .email("Please enter a valid email")
        .required("Required"),
    password: yup
        .string()
        .min(5)
        .required("Required"),
})