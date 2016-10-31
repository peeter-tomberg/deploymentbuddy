export default ($authProvider) => {
    const { API_URL, AUTH_FACEBOOK_ID, AUTH_GOOGLE_ID } = SEED_CORE.ENV;

    $authProvider.facebook({
        clientId: AUTH_FACEBOOK_ID,
        redirectUri: `${window.location.origin}/login`,
        url: `${API_URL}auth/login/facebook`
    });

    $authProvider.google({
        clientId: AUTH_GOOGLE_ID,
        redirectUri: `${window.location.origin}/login`,
        url: `${API_URL}auth/login/google`
    });

    $authProvider.loginUrl = `${API_URL}user/auth/login`;
    $authProvider.unlinkUrl = `${API_URL}user/auth/unlink`;
    $authProvider.tokenPrefix = 'deploymentbuddy:public';
};
