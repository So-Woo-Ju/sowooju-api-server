import {Injectable} from '@nestjs/common';

@Injectable()
export class PrivacyReplacer {
  replaceRequestBody(body: Record<string, any>) {
    if (body == null) return;
    if (typeof body === 'object') {
      if ('password' in body) {
        body.password = '<privacy-masked>';
      }
    }
    return body;
  }

  replaceResponseBody(body: Record<string, any>) {
    if (body == null) return;
    if (typeof body === 'object') {
      if ('refreshToken' in body) {
        body.refreshToken = '<privacy-masked>';
      }
      if ('accessToken' in body) {
        body.accessToken = '<privacy-masked>';
      }
      if ('tokenExp' in body) {
        body.tokenExp = '<privacy-masked>';
      }
    }
    return body;
  }

  replaceRequestHeader(headers: Record<string, any>): Record<string, any> {
    if ('authorization' in headers) {
      headers.authorization = '<privacy-masked>';
    }
    if ('Authorization' in headers) {
      headers.Authorization = '<privacy-masked>';
    }
    return headers;
  }

  replaceResponseHeader(headers: Record<string, any>) {
    return headers;
  }
}
