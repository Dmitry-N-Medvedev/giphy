<script>
  import {
    createEventDispatcher,
  } from 'svelte';

  const dispatch = createEventDispatcher();

  const handleClick = () => {
    dispatch('click', {});
  };
</script>

<style>
  svg {
    display: flex;
    width: 1.75rem;

    cursor: pointer;
  }

  svg > path {
    pointer-events: all;
  }
</style>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 490 490" on:click|preventDefault|stopPropagation={handleClick}>
  <path fill="none" stroke="#000" stroke-width="36" stroke-linecap="round" d="M280 278a153 153 0 10-2 2l170 170m-91-117l110 110-26 26-110-110"/>
</svg>
