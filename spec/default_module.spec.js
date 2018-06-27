/* eslint-env jest, browser */
import DefaultModule from '../src/javascript/modules/default_module'
import {  CLIENT, CONFIG, APPDATA_WITH_CF, createRangePolyfill } from './mocks/mock'

jest.mock('../src/lib/i18n', () => {
  return {
    loadTranslations: () => {},
    t: () => 'translation...'
  }
})

if (!document.createRange) {
  createRangePolyfill()
}

describe('Default App', () => {
  describe('Initialization Failure', () => {
    let errorSpy
    let app
    beforeEach(() => {
      document.body.innerHTML = '<section data-main><img class="loader" src="dot.gif"/></section>'
      CLIENT.request = jest.fn()
        .mockReturnValueOnce(Promise.reject({status: 404, responseJSON: {"description": "a fake error"}}))
      app = new DefaultModule(CLIENT, APPDATA_WITH_CF, CONFIG)
      errorSpy = jest.spyOn(app, '_handleError')
    })

    it('should display an error message in the console', (done) => {

      app._initializePromise.then(() => {
        expect(errorSpy).toBeCalled()
        done()
      })
    })
  })
})