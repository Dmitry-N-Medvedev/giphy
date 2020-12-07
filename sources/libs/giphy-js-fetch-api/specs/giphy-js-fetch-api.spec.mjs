// NOTE: do not remove inspect for now
// import {
//   inspect,
// } from 'util';
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
    const limit = 10;
    const searchOpts = Object.freeze({
      ...searchOptions,
      ...{
        limit,
        type: 'gifs',
      },
    });
    const { data: gifs } = await giphyFetch.search('dogs', searchOpts);

    expect(gifs.length).to.equal(limit);
  }).timeout(0);

  it('should search for dogs and paginate results', async () => {
    const limit = 10;
    const numOfPages = 3;
    const offsets = (new Array(numOfPages)).fill(null).map((_, index) => (index * limit));

    // eslint-disable-next-line no-restricted-syntax
    for await (const offset of offsets) {
      const searchOpts = Object.freeze({
        ...searchOptions,
        ...{
          limit,
          offset,
          type: 'gifs',
        },
      });
      const {
        data: gifs,
      } = await giphyFetch.search('dogs', searchOpts);

      expect(gifs.length).to.equal(limit);

      // NOTE: will need it later
      // console.debug(inspect(gifs, {
      //   depth: Infinity,
      //   colors: true,
      //   maxArrayLength: Infinity,
      //   maxStringLength: Infinity,
      //   breakLength: 160,
      // }));
    }
  }).timeout(0);
});
