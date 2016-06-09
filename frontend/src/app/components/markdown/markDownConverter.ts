import * as marked from 'marked';
import {Injectable} from '@angular/core';

@Injectable()
export class MarkdownConverter {
  private md: MarkedStatic;

  constructor() {
    this.md = marked;
  }

  convert(markdown: string): string {
    return this.md.parse(markdown);
  }
}
