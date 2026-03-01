export const getToken = () =>
  localStorage.getItem("token_future_risk_management");

export const isAuth = () => !!getToken();
