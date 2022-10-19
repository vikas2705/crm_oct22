export const saveUserInformation = data => {
    const { email, name, userId, userTypes, accessToken } = data;
    localStorage.setItem("email", email);
    localStorage.setItem("name", name);
    localStorage.setItem("userId", userId);
    localStorage.setItem("userTypes", userTypes);
    localStorage.setItem("accessToken", accessToken);
};
