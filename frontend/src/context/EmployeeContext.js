import { createContext, useReducer } from "react"

export const EmployeesContext = createContext()

export const employeesReducer = (state, action) => {
    switch(action.type) {
        case 'SET_EMPLOYEES':
            return {
                employees: action.payload
            }
        case 'ADD_EMPLOYEE':
            return {
                employees: [...state.employees, action.payload,]
            }
        case 'DELETE_EMPLOYEE':
            return {
                employees: state.employees.filter((employee)=>(
                    employee.employee_id !== action.payload
                ))
            }
        default:
            return state
    }
}

export const EmployeesContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(employeesReducer, {
        employees: null
    })
    return(
        <EmployeesContext.Provider value={{...state, dispatch}}>
            {children}
        </EmployeesContext.Provider>
    )
}