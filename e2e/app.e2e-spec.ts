import { AngularSeedCliPage } from './app.po';

describe('angular-seed-cli App', function() {
  let page: AngularSeedCliPage;

  beforeEach(() => {
    page = new AngularSeedCliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('seed works!');
  });
});
