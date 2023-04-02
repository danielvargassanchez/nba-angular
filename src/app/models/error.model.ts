export class IErrorHttp {
    error?: MessageError;
    message?: string;
    name?: string;
    ok?: boolean;
    status?: number;
    statusText?: string;
    url?: string;
}
export class MessageError {
    errorCode?: number;
    errorMessage: any;
    info?: string;
    userError?: string;
}
