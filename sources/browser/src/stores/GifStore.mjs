import {
  writable,
} from 'svelte/store';

const STATE = {
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
    add: (payload) => update((state) => {
      payload.data.forEach((item) => {
        console.debug(item.images);

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
      items: (new Map()),
    }),
  };
};

export const GifStore = createGifStore();
