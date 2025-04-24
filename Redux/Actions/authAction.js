export default authActions = {
  setAccessToken: (state, action) => {
    state.accessToken = action.payload;
  },
  setCliqueOptions: (state, action) => {
    state.cliqueOptions = action.payload;
  },
  setSelectedClique: (state, action) => {
    state.selectedClique = action.payload;
  },
  setNotification: (state, action) => {
    state.notification = action.payload;
  },
  resetNotification: (state) => {
    state.notification = null;
  },
  resetCliqueOptions: (state) => {
    state.cliqueOptions = null;
  },
  resetSelectedClique: (state) => {
    state.selectedClique = null;
  },
  resetAll: (state) => {
    state.accessToken = null;
    state.notification = null;
    state.cliqueOptions = null;
    state.selectedClique = null;
  },
};
