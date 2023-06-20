

import {createContext} from 'react';

interface ContextProps{
    isMenuOpen: boolean;
    startToggleMenu: () => void;
}


export const UiContext = createContext({} as ContextProps)