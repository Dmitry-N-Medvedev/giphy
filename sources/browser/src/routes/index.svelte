<script>
  import {
    onMount,
    onDestroy,
  } from 'svelte';
  import {
    GifStore,
  } from '../stores/GifStore.mjs';
  import VideoComponent from '../components/VideoComponent.svelte';
import Radio from '../components/Radio.svelte';

  let unsubscribe = null;
  let images = new Map();

  onMount(() => {
    unsubscribe = GifStore.subscribe((state) => {
      console.debug('GifStore changed', state.items);

      // for (const [key, { graphics, title }] of state.items) {
      //   images.push({
      //     id: key,
      //     title,
      //     graphics,
      //     // size,
      //   });
      // };

      images = state.items;
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
  {#each [...images.entries()] as [key, value] (key)}
    <VideoComponent id={key} src={value.video} poster={value.poster} />
  {/each}
</article>