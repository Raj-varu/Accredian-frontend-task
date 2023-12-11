//Email regex (must invovles @ and . )
export const validEmail = new RegExp(
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
);
//Password regex
export const validPassword = new RegExp(
  /^[a-zA-Z0-9!@#$%^&*()_+{}[\]:;<>,.?~\\-]{8,30}$/
);
