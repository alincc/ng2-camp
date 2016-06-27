import {Injectable} from '@angular/core';

@Injectable()
export class UrlProvider {
  public static getBackendUrl(path: string): string {
    let host: string = window.location.hostname;
    if (host === 'localhost' || host === '127.0.0.1') {
      return 'http://localhost:8080' + path;
    }
    return path;
  }
}
