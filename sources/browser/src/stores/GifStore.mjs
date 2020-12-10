import {
  writable,
} from 'svelte/store';

let STATE = new Map();

const createGifStore = () => {
  const {
    subscribe,
    set,
    update,
  } = writable(STATE);

  return {
    subscribe,
    add: (items) => update((n) => {
      console.debug('GifStore.add', n, items);

      items.forEach((item) => {
        n.set(item.id, {
          graphics: item.images,
          title: item.title,
        });
      });

      return n;
    }),
    clear: () => set(new Set()),
  };
};

export const GifStore = createGifStore();
