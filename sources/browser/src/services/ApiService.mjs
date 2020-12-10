import GiphyFetchMod from '@giphy/js-fetch-api';
import {
  BroadcastChannelNames,
} from '../common/constants/BroadcastChannelNames.mjs';

const API_KEY_URL = '/api/get-api-key';

export class ApiService {
  #apiChannel = null;
  #dataChannel = null;
  #giphyFetch = null;
  #giphyApiKey = null;

  constructor() {
    this.#apiChannel = new BroadcastChannel(BroadcastChannelNames.api);
    this.#dataChannel = new BroadcastChannel(BroadcastChannelNames.data);

    this.messageHandler = this.messageHandler.bind(this);
  }

  async search({ searchTerm, searchParameters: { pageSize, itemType } }) {
    console.debug(`${this.constructor.name}.search`, searchTerm, pageSize, itemType);

    const searchOptions = Object.freeze({
      lang: 'en',
      sort: 'relevant',
      limit: pageSize,
      offset: 0,
      type: itemType,
    });
    const {
      data: gifs
    } = await this.#giphyFetch.search(searchTerm, searchOptions);

    this.#dataChannel.postMessage({
      type: itemType,
      payload: gifs,
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
      default: {
        console.debug('unknown message type:', message);

        break;
      }
    }
  }

  async start() {
    this.#giphyApiKey = (await (await fetch(API_KEY_URL)).json()).key;
    this.#giphyFetch = new GiphyFetchMod.GiphyFetch(this.#giphyApiKey);

    this.#apiChannel.addEventListener('message', this.messageHandler);
  }

  destructor() {
    if (this.#apiChannel) {
      this.#apiChannel.removeEventListener('message', this.messageHandler);
      this.#apiChannel.close();

      this.#apiChannel = null;
    }

    if (this.#dataChannel) {
      this.#dataChannel.close();

      this.#dataChannel = null;
    }
  }
}
