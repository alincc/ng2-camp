import {it, inject, beforeEachProviders} from '@angular/core/testing';
import {App} from './app.component';

// Load the implementations that should be tested

describe('App', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    App
  ]);

  it('should have a url', inject([App], (app) => {
    expect(true).toBe(true);
  }));

});
