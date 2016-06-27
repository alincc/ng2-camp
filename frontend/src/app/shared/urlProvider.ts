import {Injectable} from '@angular/core';

@Injectable()
export class UrlProvider {
  public static getBackendUrl(path: string): string {
    let host: string = window.location.hostname;
    if (host === 'localhost') {
      return 'http://localhost:8080' + path;
    } else if (host === '127.0.0.1') {
      return 'http://127.0.0.1:8080' + path;
    }
    return path;
  }
}
