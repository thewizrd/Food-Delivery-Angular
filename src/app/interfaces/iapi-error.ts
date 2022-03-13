import { IApiMessage } from './iapi-message';

export interface IApiError extends IApiMessage {
  status: string;
  timestamp: string;
  message: string;
  debugMessage: string;
}
