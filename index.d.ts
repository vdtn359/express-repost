import { AxiosRequestConfig } from 'axios';
import { Request, Response, NextFunction } from 'express';

interface Options {
    callback?: (err: Error | null, repsonse?: any) => void;
    waitForResponse?: boolean;
}
declare function _exports(url: string, opts: AxiosRequestConfig & Options): (req: Request, res: Response, next: NextFunction) => void;
export = _exports;
