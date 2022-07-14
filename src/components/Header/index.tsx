import { Moon, PencilSimple, Sun } from "phosphor-react";
import { useTheme } from "../../hook/useTheme";
import { Dispatch, SetStateAction } from 'react';


interface HeaderProps {
    setIsSettingsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export function Header({ setIsSettingsModalOpen }: HeaderProps) {
    const { theme, setTheme } = useTheme();

    return (
        <header className="px-8 py-8 w-[100%] lg:px-16 flex items-center justify-between fixed">
            <span className="text-gray-700 dark:text-gray-50">Pomodoro</span>
            <div className="flex gap-4">
                <button onClick={() => setIsSettingsModalOpen(true)}>
                    <PencilSimple size={24} />
                </button>
                <button onClick={() => setTheme(theme == 'light' ? 'dark' : 'light')}>
                    {theme == "light" ? (
                        <Moon size={24} />
                    ) : (
                        <Sun size={24} />
                    )}
                </button>
            </div>
        </header>
    )
}