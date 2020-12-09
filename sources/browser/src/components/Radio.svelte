<script>
  import {
    onMount,
    createEventDispatcher,
  } from 'svelte';

  export let name = null;
  export let items = [];

  const dispatch = createEventDispatcher();

  const handleRadioChange = (event) => {
    dispatch('selected', event.srcElement.id);
  };

  onMount(() => {
    if (items.length > 0) {
      dispatch('selected', items[0]);
    }
  });
</script>

<style>
  div {
    display: flex;
    flex: 3 0 auto;
    align-items: stretch;
    justify-content: center;

    /* background-color: hsl(36, 100%, 78%); */
  }

  input {
    display: none;
  }

  label {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 5vw;
    font-family: var(--font-family);
    font-size: 1.5rem;
    user-select: none;
    border-bottom: 3px solid transparent;
  }

  div > label:not(:first-of-type) {
    margin-left: 0.5vw;
  }

  input:checked + label {
    /* color: hsl(230, 100%, 67%); */
    border-bottom-color: hsl(39, 100%, 50%);
  }
</style>

<div>
  {#each items as item, index}
    <input type='radio' id={item} name={name} value={item} checked={index === 0} on:change|stopPropagation={handleRadioChange} />
    <label for={item}>{item}</label>
  {/each}
</div>