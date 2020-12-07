import fetch from 'node-fetch';
import mocha from 'mocha';
import chai from 'chai';
import {
  config,
} from 'dotenv';
import GiphyFetchMod from '@giphy/js-fetch-api';

globalThis.fetch = fetch;

const { GiphyFetch } = GiphyFetchMod;

const {
  describe,
  before,
  after,
  it,
} = mocha;
const {
  expect,
} = chai;

describe('giphy js-fetch-api', () => {
  let giphyFetch = null;
  const searchOptions = Object.freeze({
    lang: 'en',
    sort: 'relevant',
  });

  before(() => {
    config({
      path: './specs/.env',
    });

    giphyFetch = new GiphyFetch(process.env.GIPHY_API_KEY);
  });

  after(() => {
    giphyFetch = null;
  });

  it('search for dogs', async () => {
    const searchOpts = Object.freeze({
      ...searchOptions,
      ...{
        limit: 10,
        type: 'gifs',
      },
    });
    const { data: gifs } = await giphyFetch.search('dogs', searchOpts);

    console.debug(gifs);

    expect(gifs).to.exist;
  }).timeout(0);
});
