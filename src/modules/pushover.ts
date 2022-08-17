import axios from 'axios';
import config from './config';

interface Notification {
    message: string;
    title: string;
}

export default async function sendNotification(notification: Notification) {
    return axios.post('https://api.pushover.net/1/messages.json', {
        token: config.pushover.applicationKey,
        user: config.pushover.userKey,
        ...notification
    });
}
