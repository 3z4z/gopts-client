export const passwordRegex = {
  value: /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/,
  message:
    "Password is invalid. Password must have 6 characters, 1 uppercase and 1 lowercase letter",
};
