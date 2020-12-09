<script>
  import {
    onMount,
    createEventDispatcher,
  } from 'svelte';

  export let items = [];

  let selected = null;

  const dispatch = createEventDispatcher();

  $: if (selected) {
    dispatch('selected', selected);
  }

  onMount(() => {
    if (items.length > 0) {
      dispatch('selected', items[0]);
    }
  });
</script>

<style>
  div {
    display: flex;
    flex: 1 0 auto;
    justify-content: space-between;
    align-items: stretch;
  }

  /* label {
    display: flex;
    flex: 1 0 auto;
    justify-content: flex-start;
    align-items: center;
  } */

  select {
    display: flex;
    flex: 3 0 auto;

    /* appearance: none; */
    font-family: var(--font-family);
    border: none;

    /* background-color: hsl(208, 100%, 78%); */
    /* color: var(--body-background-color); */
    font-size: 1.5rem;
    user-select: none;
  }

  select:focus {
    outline: none;
  }

  select > option {
    display: flex;
    flex: 1 0 auto;
    justify-content: flex-end;
    align-items: center;
  }
</style>

<div>
  <!-- <label for='items-per-page'>items per page</label> -->
  <select id='items-per-page' name='items-per-page' bind:value={selected}>
    {#each items as item}
      <option value={item}>{item} per page</option>
    {/each}
  </select>
</div>