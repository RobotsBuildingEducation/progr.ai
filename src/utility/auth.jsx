export const isLoggedIn = () => {
  return !!localStorage.getItem("local_publicKey");
};
