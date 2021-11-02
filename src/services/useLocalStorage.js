import {useState, useEffect, memo} from "react";

export const useLocalStorage = (initialValue, key) => {
    const [value, setValue] = useState(getValue)

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value])

    function getValue() {
        const storage = localStorage.getItem(key)

        if (storage) return JSON.parse(storage)

        return initialValue
    }

    return [value, setValue]
}