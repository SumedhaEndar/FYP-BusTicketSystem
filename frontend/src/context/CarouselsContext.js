import { createContext, useReducer } from "react";

export const CarouselsContext = createContext()

export const carouselsReducer = (state, action) => {
    switch(action.type) {
        case 'SET_CAROUSELS':
            return {
                carousels: action.payload
            }
        case 'ADD_CAROUSEL':
            return {
                carousels: [...state.carousels, action.payload]
            }
        case 'DELETE_CAROUSEL':
            return {
                carousels: state.carousels.filter((carousel)=>(
                    carousel.carousel_id !== action.payload
                ))
            }
        default:
            return state
    }
}

export const CarouselsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(carouselsReducer, {
        carousels: null
    })
    return(
        <CarouselsContext.Provider value={{...state, dispatch}}>
            {children}
        </CarouselsContext.Provider>
    )
}