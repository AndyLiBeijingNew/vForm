import { VformPage } from './app.po';

describe('vform App', () => {
  let page: VformPage;

  beforeEach(() => {
    page = new VformPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
