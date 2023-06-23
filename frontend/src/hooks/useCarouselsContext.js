import { CarouselsContext } from "../context/CarouselsContext";
import { useContext } from "react";

export const useCarouselsContext = () => {
    const context = useContext(CarouselsContext)

    if(!context){
        throw Error('useCarouselsContext must be used inside an CarouselsContextProvider')
    }

    return context
}