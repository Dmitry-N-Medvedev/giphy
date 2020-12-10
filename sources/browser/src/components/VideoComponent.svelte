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

  let videoContainerElement;
  let videoElement;
  let isVideoReady = false;
  let isPlaying = false;
  let videoChannel = null;

  const handleVideoClick = (event) => {
    if (event.srcElement.paused === true) {
      videoChannel.postMessage({
        type: 'play',
        payload: {
          id,
        },
      });
      isPlaying = true;
      event.srcElement.play();
    } else {
      isPlaying = false;
      event.srcElement.pause();
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
  });

  onDestroy(() => {
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

    background-color: hsl(0deg 0% 98%);
    padding: max(0.25vh, 0.25vw);

    filter: opacity(0.25);
    pointer-events: none;

    border: 3px solid transparent;
  }

  div > video {
    object-position: 50% 50%;
    object-fit: scale-down;
  }

  .isVideoReady {
    filter: none;
    pointer-events: all;
    cursor: pointer;
  }

  .isPlaying {
    border: 3px solid greenyellow;
  }
</style>

<div {id} bind:this={videoContainerElement} class:isVideoReady class:isPlaying>
  <video
    {src}
    {poster}
    type='video/mp4'
    preload='metadata'
    loop
    muted
    bind:this={videoElement}
    on:canplaythrough={handleCanPlayThrough}
    on:click|stopPropagation|preventDefault={handleVideoClick}
  ></video>
</div>
