import {FC,PropsWithChildren,useReducer} from 'react'
import { UiContext,uiReducer } from './'


export interface UiState {
    isMenuOpen: boolean;
}

const Ui_INITIAL_STATE: UiState = {
    isMenuOpen: false
}


export const UiProvider: FC<PropsWithChildren> = ({children}) => {


    const [state, dispatch] = useReducer(uiReducer,Ui_INITIAL_STATE);

    const startToggleMenu = () => {
        dispatch({type:'[UI] - ToggleMenu'});
    }


    return(
        <UiContext.Provider value={{
            ...state,
            startToggleMenu
        }}>
            {children}
        </UiContext.Provider>
    )

}
