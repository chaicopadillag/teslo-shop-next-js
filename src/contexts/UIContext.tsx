import { createContext, FC, useReducer } from 'react';
import { uiReducer } from '../reducers';
import { UIStateType } from '../reducers/uiReducer';
type UIContextState = {
  isOpenSidebar: boolean;
  toggleSidebar: () => void;
};
const UIInitialState: UIStateType = {
  isOpenSidebar: false,
};

export const UIContext = createContext<UIContextState>({} as UIContextState);

export const UIProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UIInitialState);

  const toggleSidebar = () => dispatch({ type: 'UI_TOGGLE_SIDEBAR' });

  return (
    <UIContext.Provider
      value={{
        ...state,
        toggleSidebar,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
