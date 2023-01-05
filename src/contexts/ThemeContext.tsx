import { createContext, ReactNode, useEffect, useState } from "react";

interface ThemeContextProviderProps {
    children: ReactNode
}

interface ThemeContextProps {
    theme: string
    setTheme: (theme: string) => void
}

export const ThemeContext = createContext({} as ThemeContextProps);

export function ThemeContextProvider({children}: ThemeContextProviderProps){

    const [theme, setTheme] = useState(localStorage.getItem("theme") !== "dark" ? "light" : "dark")

    useEffect(() => {
        const root = window.document.documentElement;
        theme == "light" && root.classList.remove("dark")
        root.classList.add(theme)
        localStorage.setItem("theme", theme)
      }, [theme])

    
    return(
        <ThemeContext.Provider value={{
            theme,
            setTheme
        }}>
            {children}
        </ThemeContext.Provider>
    )
}