import {useState, useEffect} from "react";

export const useLocalStorage = (initialValue, key) => {
    const getValue = () => {
        const storage = localStorage.getItem(key)
        if (storage) {
            return JSON.parse(storage)
        } else {
            return initialValue
        }
    }

    // localStorage.setItem("warehouses", JSON.stringify([...warehouses, newWarehouse]))

    const [value, setValue] = useState(getValue)

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value])

    return [value, setValue]
}

