export type UIStateType = {
  isOpenSidebar: boolean;
};

type UIActionType = {
  type: 'UI_TOGGLE_SIDEBAR';
};

export const uiReducer = (uiState: UIStateType, action: UIActionType): UIStateType => {
  switch (action.type) {
    case 'UI_TOGGLE_SIDEBAR':
      return {
        ...uiState,
        isOpenSidebar: !uiState.isOpenSidebar,
      };
    default:
      return uiState;
  }
};
