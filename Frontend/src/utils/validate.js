export const checkValidData = (email, password) => {
  if(password.length<8){
    return "Password should atlease 8 characters"
  }
  const isEmailValid = (email) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  const isPasswordValid = (password) =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);

  if (!isEmailValid(email)) return "Email ID is not valid";
  if (!isPasswordValid(password)) return "Password is not valid";
  return null;
};
