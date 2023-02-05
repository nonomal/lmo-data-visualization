export declare const STRING_TO_BINARY: (str: string) => string;
export declare const BINARY_TO_STRING: (str: string) => string;
export declare const CMD_EXISTS: (cmd: string) => boolean;
export declare const CHECK_264_LIB: () => Promise<boolean>;
export declare const EXEC_CMD: (cmd: string, opt: any) => Promise<any>;
export declare const TO_UTF8: (str: string) => string;
export declare const FILE_TO_BASE64: (path: string) => Promise<string>;
export declare const RESOLVE_STATIC_FILE_PATH: (path?: string) => string;
export declare const GET_FILE_TYPE: (name: string) => string;
export declare const CREATE_SUCCESS_MESSAGE: (data?: object) => object;
export declare const CREATE_ERROR_MESSAGE: (data: object, msg?: String) => object;
export declare const STRINGIFY: (data: object) => string;
export declare const CREATE_UUID: () => string;