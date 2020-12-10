<script>
  import {
    onMount,
    onDestroy,
  } from 'svelte';
  import {
    GifStore,
  } from '../stores/GifStore.mjs';
  import VideoComponent from '../components/VideoComponent.svelte';

  let unsubscribe = null;
  let images = [];

  // const calcMaxDimensions = (items) => {
  //   let size = 0;

  //   for (const item of items.values()) {
  //     const maxSize = Math.max(item.graphics.preview_gif.height, item.graphics.preview_gif.width);

  //     if (maxSize > size) {
  //       size = maxSize;
  //     }
  //   }

  //   return size;
  // };

  onMount(() => {
    unsubscribe = GifStore.subscribe((items) => {
      console.debug('GifStore changed', items);

      // const size = calcMaxDimensions(items);

      for (const [key, { graphics, title }] of items) {
        images.push({
          id: key,
          title,
          graphics,
          // size,
        });
      };

      images = images;
    });
  });

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  });
</script>

<style>
  article {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-auto-rows: 1fr;
    grid-gap: max(0.25vw, 0.25vh);
    padding: max(1vh, 1vw);
  }
</style>

<svelte:head>
  <title>Giphy Browser</title>
</svelte:head>

<article>
  {#each images as image (image.id)}
    <VideoComponent id={image.id} src={image.graphics.looping.mp4} poster={image.graphics['480w_still'].url} />
  {/each}
</article>