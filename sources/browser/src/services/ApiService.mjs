import GiphyFetchMod from '@giphy/js-fetch-api';
import {
  BroadcastChannelNames,
} from '../common/constants/BroadcastChannelNames.mjs';

const API_KEY_URL = '/api/get-api-key';

export class ApiService {
  constructor() {
    this.apiChannel = null;
    this.dataChannel = null;
    this.giphyFetch = null;
    this.giphyApiKey = null;
    this.searchOptions = {
      lang: 'en',
      sort: 'relevant',
      limit: 0,
      offset: 0,
      type: null,
      searchTerm: null,
    };

    this.apiChannel = new BroadcastChannel(BroadcastChannelNames.api);
    this.dataChannel = new BroadcastChannel(BroadcastChannelNames.data);

    this.messageHandler = this.messageHandler.bind(this);
    this.search = this.search.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  async search({ searchTerm, searchParameters: { pageSize, itemType } }) {
    if (this.searchOptions.searchTerm !== searchTerm || this.searchOptions.type !== itemType) {
      this.dataChannel.postMessage({
        type: 'clear',
      });
    }

    this.searchOptions = Object.assign(Object.create(null), {
      limit: pageSize,
      offset: 0,
      type: itemType,
      searchTerm,
    });

    const {
      data: gifs,
    } = await this.giphyFetch.search(searchTerm, this.searchOptions);

    this.dataChannel.postMessage({
      type: itemType,
      payload: {
        data: gifs,
      },
    });
  }

  async nextPage() {
    this.searchOptions.offset += this.searchOptions.limit;

    const {
      data: gifs,
    } = await this.giphyFetch.search(this.searchOptions.searchTerm, this.searchOptions);

    this.dataChannel.postMessage({
      type: this.searchOptions.type,
      payload: {
        data: gifs,
      },
    });
  }

  messageHandler(message) {
    const {
      data: {
        type,
        payload,
      },
    } = message;

    switch (type) {
      case 'search': {
        return this.search(payload);
      }
      case 'next-page': {
        return this.nextPage();
      }
      default: {
        // eslint-disable-next-line no-console
        console.warn('unknown message type:', message);

        return undefined;
      }
    }
  }

  async start() {
    this.giphyApiKey = (await (await fetch(API_KEY_URL)).json()).key;
    this.giphyFetch = new GiphyFetchMod.GiphyFetch(this.giphyApiKey);

    this.apiChannel.addEventListener('message', this.messageHandler);
  }

  destructor() {
    if (this.apiChannel) {
      this.apiChannel.removeEventListener('message', this.messageHandler);
      this.apiChannel.close();

      this.apiChannel = null;
    }

    if (this.dataChannel) {
      this.dataChannel.close();

      this.dataChannel = null;
    }
  }
}
