const  jwt = require('jsonwebtoken');

module.exports = (options, imports, register) => {

    const secret = process.env.JWT_SECRET;
    const issuer = process.env.JWT_ISSUER;

    register(null, {
        jwt: {
            sign: (context) => {
                return jwt.sign({ context }, secret, {
                    expiresIn: '14d',
                    subject: `user:${context.user.id}`,
                    issuer
                });
            },
            decode: (token) => {
                return jwt.verify(token, secret, {
                    issuer
                });
            }
        }
    })
};
