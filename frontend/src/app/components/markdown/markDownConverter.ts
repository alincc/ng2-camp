import * as marked from "marked/marked.min.js";
import {Injectable} from "angular2/core";

@Injectable()
export class MarkdownConverter {
  private md:MarkedStatic;

  constructor() {
    this.md = marked;
  }

  convert(markdown: string): string {
    return this.md.parse(markdown);
  }
}
