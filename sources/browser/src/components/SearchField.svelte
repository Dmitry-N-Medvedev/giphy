<script>
  import {
    createEventDispatcher,
  } from 'svelte';

  let value;

  const dispatch = createEventDispatcher();

  $: if (value !== null) {
    dispatch('value', { value });
  }
</script>

<style>
  div {
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
  }
  input {
    display: flex;
    flex: 1 0 auto;

    height: 6vh;
    border: none;
    border-radius: min(0.25vh, 0.25vw);

    font-size: min(2vh, 2vw);
    padding: 0 0.25vw;

    border-bottom: 1px solid black;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  label {
    padding: 0.25vw 0;
  }
</style>

<div>
  <input id='search-field-input' type='text' bind:value={value} />
  <label for='search-field-input'>type your terms</label>
</div>