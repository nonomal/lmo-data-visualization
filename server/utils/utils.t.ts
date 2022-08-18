/**
 * utils/utils.ts
 * @author ayuanlmo
 * 一些工具函数
 * **/

/**
 * @method STRING_TO_BINARY
 * @description 字符串转二进制
 * @param str {string}
 * @return string
 * **/
module.exports.STRING_TO_BINARY = (str: string): string => {
    const _: string[] = [];
    const __: string[] = str.split("");

    for (let i: number = 0; i < __.length; i += 1) {
        if (i !== 0)
            _.push(" ");
        // @ts-ignore
        _.push(__[i].charCodeAt().toString(2));
    }
    return _.join("");
};

/**
 * @method BINARY_TO_STRING
 * @description 二进制转字符串
 * @param str {string}
 * @return string
 * **/
module.exports.BINARY_TO_STRING = (str: string): string => {
    const _: string[] = [];
    const list: string[] = str.split(" ");

    for (let i: number = 0; i < list.length; i += 1) {
        _.push(String.fromCharCode(parseInt(list[i], 2)));
    }
    return _.join("");
};

/**
 * @method CMD_EXISTS
 * @description 判定某条命令是否存在于系统
 * @param cmd {string}
 * @return boolean
 * **/
module.exports.CMD_EXISTS = (cmd: string): boolean => {
    try {
        require('child_process').execSync(
            require('os').platform() === 'win32'
                ? `cmd /c "(help ${cmd} > nul || exit 0) && where ${cmd} > nul 2> nul"`
                : `command -v ${cmd}`
        );
        return true;
    } catch {
        return false;
    }
};

/**
 * @method CHECK_264_LIB
 * @description 检查ffmpeg是否支持 H.264库
 * @return Promise<boolean>
 * **/
module.exports.CHECK_264_LIB = (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        try {
            require('child_process').exec('ffmpeg -codecs', (e: any, stdout: string) => {
                resolve(stdout.indexOf('h264') !== -1 && stdout.indexOf('H.264') !== -1 && stdout.indexOf('libx264') !== -1);
            });
        } catch (e) {
            reject(false);
        }
    });
};

/**
 * @method EXEC_CMD
 * @description 执行命令
 * @param cmd {string}
 * @param opt {any}
 * @return Promise<any>
 * **/
module.exports.EXEC_CMD = (cmd: string, opt: any): Promise<any> => {
    return new Promise((resolve, reject) => {
        try {
            require('child_process').exec(cmd, opt, (e: any, stdout: string) => {
                resolve(stdout);
            });
        } catch (e) {
            reject(e);
        }
    });
};

/**
 * @method TO_UTF8
 * @description 转UTF8字符串
 * @param str {String}
 * @return String
 * **/
module.exports.TO_UTF8 = (str: string): string => {
    return require('iconv-lite').decode(str, 'utf8');
};

/**
 * @method FILE_TO_BASE64
 * @description 文件转base64
 * @param path {String} File path
 * @return Promise<string>
 * **/
module.exports.FILE_TO_BASE64 = (path: string): Promise<string> => {
    return new Promise((resolve: any, reject: any): any => {
        try {
            const binary = require('fs').readFileSync(path);

            resolve(Buffer.from(binary, 'binary').toString('base64'));
        } catch (e) {
            reject(e ?? '');
        }
    });
};

/**
 * @method RESOLVE_STATIC_FILE_PATH
 * @description 静态文件路径转换
 * @param path {String}
 * @return String
 * **/
module.exports.RESOLVE_STATIC_FILE_PATH = (path = ''): string => {
    if (path === '') return '/';
    return `/static${path.split('/static')[1]}`;
}

/**
 * @method GET_FILE_TYPE
 * @description 获取文件类型
 * @param name {String}
 * @return String
 * **/
module.exports.GET_FILE_TYPE = (name: string) => {
    return name.split('.')[1];
}