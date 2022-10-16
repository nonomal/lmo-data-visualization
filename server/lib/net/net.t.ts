/**
 * /lib/net/net.ts
 * @author ayuanlmo
 * Net module
 * @description 用于检测端口是否被占用 / 启动服务
 * **/

const _Net: any = require('net');
const _Clc: any = require('cli-color');
const _global: any = global;

let _Port: number = require('../../conf/Conf.t').__SERVER_PORT - 1;

const _: any = {
    START_SERVER: (__: any): void => {
        _Port += 1;//自增一个新连接埠

        //启动一个测试服务
        const _test_server: any = _Net.createServer().listen(_Port);

        _test_server.on('listening', () => {
            //新连接埠正常 关掉测试服务
            _test_server.close();
            setTimeout(async () => {
                __.listen(_Port, () => {
                    _global.__SERVER_PORT = _Port;
                    _.PRINT_NETWORK_INTO();
                });
            });
        });
        _test_server.on('error', (_e: any): void => {
            //新连接埠被占用 重新获取一个新连接埠
            if (_e.code === 'EADDRINUSE') {
                console.warn(`${_Port}端口被占用,正在尝试在新的端口启动`);
                _.START_SERVER(__);
            }
        });
    },
    //获取本地IP信息
    LOCAL_NETWORK_INTERFACES(): Array<string> {
        const _NF: any = require('os')['networkInterfaces']();
        const _na: Array<string> = [];

        for (const i in _NF) {
            for (const j in _NF[i]) {
                const _t = _NF[i][j];

                if (_t['family'] === 'IPv4')
                    _na['push'](_t.cidr['split']('/')[0]);
            }
        }
        return _na;
    },
    //打印启动信息 / IP信息
    PRINT_NETWORK_INTO: (): void => {
        console.log('\n\n=========================================\n\n');
        console.log('        _                 _ _          _   _             ');
        console.log('       (_)               | (_)        | | (_)            ');
        console.log(' __   ___ ___ _   _  __ _| |_ ______ _| |_ _  ___  _ __  ');
        console.log(' \\ \\ / / / __| | | |/ _` | | |_  / _` | __| |/ _ \\| \'_ \\ ');
        console.log('  \\ V /| \\__ \\ |_| | (_| | | |/ / (_| | |_| | (_) | | | |');
        console.log('   \\_/ |_|___/\\__,_|\\__,_|_|_/___\\__,_|\\__|_|\\___/|_| |_|\n\n');
        console.log(_Clc['red']('\n Server running at:\n'));
        console.log(`   -Local: ${_Clc['blue'](`  //localhost:${_Port}/`)}`);
        _.LOCAL_NETWORK_INTERFACES().map((i: string) => {
            console.log(`   -NetWork: ${_Clc.blue(`//${i}:${_Port}/`)}`);
        });
        console.log('\n\n=========================================');
    }
};

module.exports = _;
