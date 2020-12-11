<script>
  import {
    onMount,
    onDestroy,
  } from 'svelte';
  import {
    GifStore,
  } from '../stores/GifStore.mjs';
  import VideoComponent from '../components/VideoComponent.svelte';
  import {
    BroadcastChannelNames,
  } from '../common/constants/BroadcastChannelNames.mjs';

  let articleContainer = null;
  let unsubscribe = null;
  let images = new Map();
  let loadMoreComponent = null;
  let apiChannel = null;
  let intersectionObserver = null;

  const handleIntersection = (entries) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const entry of entries) {
      if (entry.isIntersecting === true) {
        apiChannel.postMessage({
          type: 'next-page',
        });
      }
    }
  };

  onMount(() => {
    apiChannel = new BroadcastChannel(BroadcastChannelNames.api);

    unsubscribe = GifStore.subscribe((state) => {
      images = state.items;
    });
  });

  $: if (loadMoreComponent && images.size > 0 && intersectionObserver === null) {
    intersectionObserver = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0.0,
    });

    intersectionObserver.observe(loadMoreComponent);
  }

  onDestroy(() => {
    if (intersectionObserver) {
      intersectionObserver.disconnect();

      intersectionObserver = null;
    }

    if (apiChannel) {
      apiChannel.close();

      apiChannel = null;
    }

    if (unsubscribe) {
      unsubscribe();
    }
  });
</script>

<style>
  article {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
    grid-auto-rows: minmax(500px, 1fr);
    grid-gap: max(0.25vw, 0.25vh);
    padding: max(1vh, 1vw);
  }

  .load-more {
    display: block;
    width: 100%;
    height: 1px;

    visibility: hidden;
  }
</style>

<svelte:head>
  <title>Giphy Browser</title>
</svelte:head>

<article bind:this={articleContainer}>
  {#each [...images.entries()] as [id, O] (id)}
    <VideoComponent {id} src={O.video} poster={O.poster} />
  {:else}
    &nbsp;
  {/each}
</article>

<div class='load-more' bind:this={loadMoreComponent}>&nbsp;</div>

