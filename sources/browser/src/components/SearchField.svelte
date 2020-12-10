<script>
  import {
    fade,
  } from 'svelte/transition';
  import {
    onMount,
    createEventDispatcher,
  } from 'svelte';

  export let searchHint = '';

  let value = '';
  let showSubmitButton = false;
  let searchInput = null;

  const inFade = Object.freeze({
    duration: 75,
  });

  const outFade = Object.freeze({
    duration: 150,
  });

  const dispatch = createEventDispatcher();

  $: dispatch('value', { value });
  $: showSubmitButton = value.length !== 0;

  onMount(() => {
    searchInput.focus();
  });
</script>

<style>
  div {
    --height: 6vh;
    --padding-right: 0.25vw;
    --submit-button-width: 3.5vw;

    display: flex;
    flex-direction: column;
    flex: 1 0 auto;

    position: relative;
    pointer-events: none;
  }
  input {
    display: flex;
    flex: 1 0 auto;

    height: var(--height);
    border: none;
    border-radius: min(0.25vh, 0.25vw);

    font-size: min(2vh, 2vw);
    padding: 0 calc(var(--submit-button-width) + 0.25vw) 0 var(--padding-right);

    filter: drop-shadow(0px 0px 3px hsl(0, 0%, 65%));

    font-family: var(--font-family);
  }

  input:focus {
    filter: none;
    outline-offset: -1px;
  }

  #search-field-button {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;

    position: absolute;
    right: calc(var(--padding-right) / 2);
    top: calc(var(--height) - (var(--height) - 0.5vh) - 0.25vh);

    width: var(--submit-button-width);
    height: calc(var(--height) - 0.5vh);

    font-size: min(1vh, 1vw);
    color: white;
    background-color: hsl(0, 0%, 18%);

    padding: var(--padding-right);
    cursor: pointer;

    font-family: system-ui;
  }

  label {
    padding: var(--padding-right) 0;
  }
</style>

<div>
  <input id='search-field-input' type='text' bind:value={value} bind:this={searchInput} autocorrect />
  {#if showSubmitButton === true}
    <input id='search-field-button' type='submit' value='return' in:fade={inFade} out:fade={outFade} />
  {/if}
  <label for='search-field-input'>{searchHint}</label>
</div>