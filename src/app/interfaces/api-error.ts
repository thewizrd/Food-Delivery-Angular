import { ApiMessage } from './api-message';

export interface ApiError extends ApiMessage {
  status: string;
  timestamp: string;
  debugMessage: string;
}
