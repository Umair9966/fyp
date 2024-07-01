export const saveUserInfo = (userInfo) => {
    sessionStorage.setItem('user', JSON.stringify(userInfo));
};

export const getUserInfo = () => {
    const userInfo = sessionStorage.getItem('user');
    return userInfo ? JSON.parse(userInfo) : null;
};

export const clearUserInfo = () => {
    sessionStorage.removeItem('user');
};

export const isUserLoggedIn = () => {
    return getUserInfo() !== null
}