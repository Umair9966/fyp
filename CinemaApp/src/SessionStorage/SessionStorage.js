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

export const setUserRewardPoints = (points) => {
    sessionStorage.setItem('userRewardPoints', JSON.stringify(points));
};

export const getUserRewardPoints = () => {
    const rewards = sessionStorage.getItem('userRewardPoints');
    return rewards ? rewards : '0';
};