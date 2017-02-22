import { browser, element, by } from 'protractor';

export class SamplePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('seed-root h1')).getText();
  }
}
