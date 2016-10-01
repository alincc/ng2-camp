// For vendors for example jQuery, Lodash, angular2-jwt just import them here unless you plan on
// chunking vendors files for async loading. You would need to import the async loaded vendors
// at the entry point of the async loaded file. Also see custom-typings.d.ts as you also need to
// run `typings install x` where `x` is your module

// Angular 2
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/http';
import '@ngrx/core';
import '@angular/router';
import '@ngrx/store';
import '@ngrx/router-store';
import '@ngrx/effects';
import 'marked';

// RxJS
import 'rxjs/Rx';

if ('production' === ENV) {
  // Production


} else {
  // Development

}
