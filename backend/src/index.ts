import App from './app';
import mongoose from 'mongoose';
import MemberController from './member/member.controller';
import AuthenticationMiddleware from './shared/middleware/authentication.middleware';

// AuthenticationMiddleware
const app = new App(
    [
        new MemberController(),
    ],
    [
        // new AuthenticationMiddleware()
    ]);

app.listen();

mongoose.connect(
    'mongodb://localhost/msm-database',
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        poolSize: 4
    },
    function (err) {
        if (err) {
            console.log('Failed to connect to DataBase Server');
        } else {
            console.log('Successfully connected to DataBase Server');
        }
    }
);
