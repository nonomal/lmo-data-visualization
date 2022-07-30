module.exports = {
    __SERVER_PORT: 3000,
    __STATIC_PATH: '/static',
    __SOCKET_PONG_KEY: 'ping',
    __SOCKET_PONG_MESSAGE: 'pong',
    __FFMPEG: require('../utils/utils.t').cmdExists('ffmpeg')
};
