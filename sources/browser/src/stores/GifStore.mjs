import {
  writable,
} from 'svelte/store';

const STATE = {
  query: {},
  items: (new Map()),
};

const createGifStore = () => {
  const {
    subscribe,
    set,
    update,
  } = writable(STATE);

  return {
    subscribe,
    add: (items) => update((state) => {
      console.debug('GifStore.add', state, items);

      items.forEach((item) => {
        state.items.set(
          item.id,
          {
            poster: item.images['480w_still'].url,
            video: item.images.looping.mp4,
            title: item.title,
          },
        );
      });

      return state;
    }),
    clear: () => set({
      query: {},
      items: (new Map()),
    }),
  };
};

export const GifStore = createGifStore();
