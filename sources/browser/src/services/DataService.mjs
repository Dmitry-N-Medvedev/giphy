import {
  BroadcastChannelNames,
} from '../common/constants/BroadcastChannelNames.mjs';
import {
  GifStore,
} from '../stores/GifStore.mjs';

export class DataService {
  constructor() {
    this.dataChannel = new BroadcastChannel(BroadcastChannelNames.data);

    this.handleDataMessage = this.handleDataMessage.bind(this);

    this.dataChannel.addEventListener('message', this.handleDataMessage);
  }

  // eslint-disable-next-line class-methods-use-this
  async handleDataMessage({ data: { type, payload } }) {
    switch (type) {
      case 'clear': {
        return GifStore.clear();
      }
      default: {
        return GifStore.add(payload);
      }
    }
  }

  destructor() {
    if (this.dataChannel) {
      this.dataChannel.removeEventListener('message', this.handleDataMessage);
      this.dataChannel.close();

      this.dataChannel = null;
    }
  }
}
