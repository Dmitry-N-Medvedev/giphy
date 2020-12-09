<script>
  import {
    onMount,
    onDestroy,
  } from 'svelte';
  import {
    BroadcastChannelNames,
  } from '../common/constants/BroadcastChannelNames.mjs';
  import MagnifyingGlassIcons from '../icons/MagnifyingGlass.svelte';

  export let segment;

  let uiChannel = null;

  const showSearchForm = () => {
    uiChannel.postMessage(Object.freeze({
      type: 'showSearchForm',
    }));
  };

  onMount(() => {
    uiChannel = new BroadcastChannel(BroadcastChannelNames.ui);
  });

  onDestroy(() => {
    if (uiChannel) {
      uiChannel.close();

      uiChannel = null;
    }
  });
</script>

<style>
  nav {
    --nav-height: 6rem;

    display: flex;
    /* border-bottom: 1px solid rgba(255,62,0,0.1); */
    font-weight: 300;
    /* padding: 0 1em; */

    height: var(--nav-height);
  }

  ul {
    display: flex;
    flex: 1 0 auto;
    justify-content: center;
    align-items: stretch;
    margin: 0;
    padding: 0;
  }

  li {
    display: flex;
    align-items: stretch;

    min-width: var(--nav-height);
  }

  li:last-of-type {
    margin-left: 1vw;
  }

  [aria-current] {
    position: relative;
    display: flex;
  }

  [aria-current]::after {
    position: absolute;
    content: '';
    width: calc(100% - 1em);
    height: 2px;
    background-color: rgb(255,62,0);
    display: block;
    bottom: -1px;
  }

  a {
    display: flex;
    flex: 1 0 auto;
    justify-content: center;
    align-items: center;

    text-decoration: none;
    /* padding: 1em 0.5em; */

    /* background-color: brown; */
  }
</style>

<nav>
  <ul>
    <li><a aria-current="{segment === undefined ? 'page' : undefined}" href=".">home</a></li>
    <li><a aria-current="{segment === 'about' ? 'page' : undefined}" href="about">about</a></li>

    <!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
         the blog data when we hover over the link or tap it on a touchscreen -->
    <!-- <li><a rel=prefetch aria-current="{segment === 'blog' ? 'page' : undefined}" href="blog">blog</a></li> -->
    <li>
      <MagnifyingGlassIcons on:click={showSearchForm} />
    </li>
  </ul>
</nav>
