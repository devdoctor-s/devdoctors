// @ts-nocheck
module.exports = {
    development: {
        app: {
            name: 'My MERN Project - Development',
        },
        db: {
            url: 'mongodb://localhost:27017/my-mern-project-dev',
        },
        session: {
            secret: 'mysecretkey',
            resave: true,
            saveUninitialized: true,
        },
        auth: {
            jwt: {
                secret: 'myjwtsecret',
                expiresIn: '30d',
            },
            google: {
                clientID: 'google-client-id',
                clientSecret: 'google-client-secret',
                callbackURL: 'http://localhost:3000/auth/google/callback',
            },
            facebook: {
                clientID: 'facebook-client-id',
                clientSecret: 'facebook-client-secret',
                callbackURL: 'http://localhost:3000/auth/facebook/callback',
            },
        },
        payment: {
            stripe: {
                secretKey: 'stripe-secret-key',
            },
            paypal: {
                clientId: 'paypal-client-id',
                clientSecret: 'paypal-client-secret',
            },
        },
        mail: {
            transport: {
                service: 'Gmail',
                auth: {
                    user: 'myemail@gmail.com',
                    pass: 'mypassword',
                },
            },
            from: 'My MERN Project <noreply@mymernproject.com>',
        },
    },
    production: {
        app: {
            name: 'My MERN Project - Production',
        },
        db: {
            url: process.env.MONGODB_URI,
        },
        session: {
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
        },
        auth: {
            jwt: {
                secret: process.env.JWT_SECRET,
                expiresIn: '30d',
            },
            google: {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: 'https://mymernproject.com/auth/google/callback',
            },
            facebook: {
                clientID: process.env.FACEBOOK_CLIENT_ID,
                clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
                callbackURL: 'https://mymernproject.com/auth/facebook/callback',
            },
        },
        payment: {
            stripe: {
                secretKey: process.env.STRIPE_SECRET_KEY,
            },
            paypal: {
                clientId: process.env.PAYPAL_CLIENT_ID,
                clientSecret: process.env.PAYPAL_CLIENT_SECRET,
            },
        },
        mail: {
            transport: {
                service: 'Gmail',
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
                },
            },
            from: 'My MERN Project <noreply@mymernproject.com>',
        },
    },
};
