<script>
  import {
    onMount,
    onDestroy,
  } from 'svelte';
  import {
    BroadcastChannelNames,
  } from '../common/constants/BroadcastChannelNames.mjs';


  export let id;
  export let src;
  export let poster;

  let shouldLoad = false;

  let videoContainerElement;
  let videoElement;
  let isVideoReady = false;
  let isPlaying = false;
  let videoChannel = null;

  const handleIntersection = (entries, observer) => {
    for (const entry of entries) {
      if (entry.isIntersecting === true && observer) {
        observer.disconnect();
        observer = null;

        shouldLoad = true;
      }
    }
  };

  const handleVideoClick = (event) => {
    if (videoElement.paused === true) {
      videoChannel.postMessage({
        type: 'play',
        payload: {
          id,
        },
      });
      isPlaying = true;
      videoElement.play();
    } else {
      isPlaying = false;
      videoElement.pause();
    }
  };

  const handleCanPlayThrough = (event) => {
    isVideoReady = true;
  };

  const handleVideoMessage = ({ data: { type, payload }}) => {
    switch (type) {
      case 'play': {
        if (isPlaying === true) {
          isPlaying = false;
          videoElement.pause();
        }

        break;
      }
      default: {
        console.debug('unknown message type', type, payload);
      }
    }
  };

  onMount(() => {
    videoChannel = new BroadcastChannel(BroadcastChannelNames.video);
    videoChannel.addEventListener('message', handleVideoMessage);

    (new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0.0,
    })).observe(videoContainerElement);
  });
  
  onDestroy(() => {
    if (intersectionObserver) {
      intersectionObserver.disconnect();
    }

    if (videoChannel) {
      videoChannel.removeEventListener('message', handleVideoMessage);
      videoChannel.close();

      videoChannel = null;
    }
  });
</script>

<style>
  div {
    display: flex;
    justify-content: center;
    align-items: center;

    padding: min(0.25vw, 0.25vh);

    cursor: none;

    background-color: hsl(0deg 0% 88%);
    padding: max(0.25vh, 0.25vw);

    filter: opacity(0.25);
    pointer-events: none;

    border: 3px solid transparent;

    min-width: 500px;
    min-height: 500px;
  }

  div:hover {
    filter: drop-shadow(0 0 4px hsl(0, 0%, 26%));
    background-color: var(--body-background-color);
  }

  div > video {
    object-position: 50% 50%;
    object-fit: contain;

    width: 100%;
    height: 100%;

    pointer-events: none;
  }

  .isVideoReady {
    filter: none;
    pointer-events: all;
    cursor: pointer;
  }

  .isPlaying {
    transform: scale(1.05);
    filter: drop-shadow(0 0 12px hsl(0, 0%, 13%)) !important;
    background-color: var(--body-background-color);
    z-index: 1;
  }
</style>

<div {id} bind:this={videoContainerElement} class:isVideoReady class:isPlaying on:click|stopPropagation|preventDefault={handleVideoClick}>
  {#if shouldLoad === true}
    <video
      {src}
      {poster}
      type='video/mp4'
      preload='metadata'
      loop
      muted
      bind:this={videoElement}
      on:canplaythrough={handleCanPlayThrough}
    ></video>
  {/if}
</div>
