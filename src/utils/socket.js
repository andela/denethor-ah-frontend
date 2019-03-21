import io from 'socket.io-client';

const socket = io.connect(process.env.API_ROOT_URL.slice(0, -4));
socket.on('connect', () => {});

export default socket;
