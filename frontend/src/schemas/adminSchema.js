import * as yup from "yup"

const phonePattern = /^(?:\+?6?01)[0-46-9]-*[0-9]{7,8}$/
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/

// Login
export const adminLoginSchema = yup.object().shape({
    email: yup
        .string()
        .email("Please enter a valid email")
        .required("Required"),
    password: yup
        .string()
        .min(5)
        .required("Required"),
})

// Add Employee
export const adminAddSchema = yup.object().shape({
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
})

// Profile
export const adminProfileSchema = yup.object().shape({
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
    oldPassword: yup
        .string(),
    newPassword: yup
        .string()
        .min(5,'Password must be at least 5 characters')
        .matches(passwordRules, {message: "Please create a stronger password"}),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('newPassword'), null],"Passwords must match")
})
