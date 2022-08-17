import axios from 'axios';
import config from './config';

interface Notification {
    message: string;
    title: string;
}

export default async function sendNotification(notification: Notification) {
    return axios.post('https://pushover.net/', {
        token: config.pushover.applicationKey,
        user: config.pushover.userKey,
        ...notification
    });
}
