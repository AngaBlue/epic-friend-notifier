import { Client } from 'fnbr';
import config from './modules/config';
import sendNotification from './modules/pushover';
import { start } from './modules/util';

start();

const client = new Client({
    auth: {
        deviceAuth: config.epic
    }
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user?.displayName ?? 'Unknown'}`);
    console.log('Ready to send notifications...');
});

client.on('friend:request', request => {
    console.log(`${request.displayName} has sent you a friend request`);
    sendNotification({ message: `${request.displayName} has sent you a friend request.`, title: 'Epic Games Friend Request' });
});
