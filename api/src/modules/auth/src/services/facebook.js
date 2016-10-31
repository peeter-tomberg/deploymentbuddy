const Joi = require('joi');
const qs = require('querystring');
const request = require('request-promise-native');

const getAccessToken = (params) => {
    const accessTokenUrl = 'https://graph.facebook.com/oauth/access_token';
    return request
        .get({ url: accessTokenUrl, qs: params, json: true })
        .then(response => qs.parse(response).access_token);
};

const getProfile = (accessToken) => {
    const fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name'];
    const graphApiUrl = 'https://graph.facebook.com/me?fields=' + fields.join(',');
    return request.get({ url: graphApiUrl, qs: { access_token: accessToken }, json: true });
};

const mapToUser = (profile) => {
    return {
        email : profile.email,
        firstName : profile.first_name,
        lastName : profile.last_name
    };
};

const mapToAuthentication = (profile, accessToken) => {
    return {
        serviceType: SERVICE_NAME,
        serviceToken: profile.id,
        serviceSecret: accessToken
    };
};

const SERVICE_NAME = 'facebook';
const validation = {
    code: Joi.string().required(),
    clientId: Joi.string().required(),
    redirectUri: Joi.string().required()
};
const handler = async ({ code, clientId, redirectUri }) => {
    const params = {
        code,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: process.env.AUTH_FACEBOOK_SECRET
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
