const Joi = require('joi');
const request = require('request-promise-native');

const getAccessToken = (params) => {
    const accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
    return request
        .post({ url: accessTokenUrl, form: params, json: true })
        .then(response => response.access_token);
};

const getProfile = (accessToken) => {
    const peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
    const headers = { Authorization: 'Bearer ' + accessToken };
    return request.get({ url: peopleApiUrl, headers, json: true });
};

const mapToUser = (profile) => {
    return {
        email : profile.email,
        firstName : profile.given_name,
        lastName : profile.family_name
    };
};

const mapToAuthentication = (profile, accessToken) => {
    return {
        serviceType: SERVICE_NAME,
        serviceToken: profile.sub,
        serviceSecret: accessToken
    };
};

const SERVICE_NAME = 'google';

const validation = {
    code: Joi.string().required(),
    clientId: Joi.string().required(),
    redirectUri: Joi.string().required(),
    state: Joi.string().required()
};
const handler = async ({ code, clientId, redirectUri }) => {
    const params = {
        code,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: process.env.AUTH_GOOGLE_SECRET,
        grant_type: 'authorization_code'
    };
    const accessToken = await getAccessToken(params);
    const profile = await getProfile(accessToken);

    return {
        user: mapToUser(profile),
        authentication: mapToAuthentication(profile, accessToken)
    };
};

module.exports = {
    SERVICE_NAME,
    handler,
    validation
};
