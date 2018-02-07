const assert = require('assert');

const HOME_PAGE = 'https://internet.frontier.com/?lp=6108';

/**
 * @param {string} element DOM-element or selector
 * finds a button with selected element
 * and tries to click it
 */
function findAndClickButton(element) {

  if (typeof element !== 'string') {
    throw new TypeError('element supplied should be a string');
  }

  const button = $(element);
  button.click();
}

describe('Frontier Page', () => {

  it('should load', () => {
    browser.url(HOME_PAGE);
    const pageIndex = $('.page-index');
    assert.notEqual(pageIndex.value, null);
  });

  it('should have the right title', () => {
    browser.url(HOME_PAGE);
    const title = browser.getTitle();
    assert.equal(title, 'Frontier® Internet Service | 855-858-4802 | Frontier Communications');
  });

  describe('Headers', () => {
    it('should load', () => {
      const header = $('header');
      assert.notEqual(header.value, null);
    });

    it('logo should redirect to home', () => {
      findAndClickButton('#js-track-logo');

      const url = browser.getUrl();
      assert.equal(url, 'https://internet.frontier.com/');
    });
  });

  describe('Footers', () => {
    it('should load', () => {
      const footer = $('footer');
      assert.notEqual(footer.value, null);
    });
  });

  describe('ZIP input', () => {
    it('should take valid ZIP', () => {
      const input = $('#zip');
      input.setValue('27282');

      findAndClickButton('#js-track-form-check-availability');

      // link should be plans pricing page
      const buttonLink = browser.getUrl();
      assert.equal(buttonLink, 'https://internet.frontier.com/plans-pricing.html');
    });

    it('should not take invalid ZIP', () => {
      // set invalid zip in zip code
      browser.url(HOME_PAGE);
      const input = $('#zip');
      input.setValue('A$k3A');

      // check if it accepts alphanumeric values
      browser.click('#js-track-form-check-availability');
      const url = browser.getUrl();
      assert.equal(url, HOME_PAGE);

    });

    it('should not take ZIP with length over 5', () => {
      // check if it accepts numeric values
      // with length over 5
      const input = $('#zip');
      input.setValue('1233455667');
      browser.click('#js-track-form-check-availability');
      const url = browser.getUrl();
      assert.equal(url, HOME_PAGE);
    });

    it('should show error message on invalid ZIP', () => {
      browser.url(HOME_PAGE);
      const input = $('#zip');
      input.setValue('ASFKKeSDA@');

      browser.click('#js-track-form-check-availability');
      const errorMessageText = browser.getText('.form__error');
      assert.notEqual(errorMessageText[0], undefined || null || '');
    });
  });

  describe('links', () => {
    it('should lead to a url', () => {
      const links = $$('a');

      links.forEach(link => {
        const urlAttribute = link.getAttribute('href');
        assert.notEqual(urlAttribute, undefined || null);
      });
    });
  });

});


