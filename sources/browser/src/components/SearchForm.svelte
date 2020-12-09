<script>
  import {
    onMount,
    onDestroy,
  } from 'svelte';
  import {
    BroadcastChannelNames,
  } from '../common/constants/BroadcastChannelNames.mjs';
  import SearchField from './SearchField.svelte';
  import SearchParameters from './SearchParameters.svelte';

  export let show = false;

  let uiChannel = null;
  let searchTerm = null;
  let searchParameters = {
    pageSize: null,
    itemType: null,
  };
  let searchHint = 'type in search terms';

  const handleClick = () => {
    uiChannel.postMessage(Object.freeze({
      type: 'hideSearchForm',
    }));
  };

  const handleSubmit = () => {
    if (searchTerm !== null && searchTerm.length !== 0) {
      console.debug('handleSubmit', searchTerm);
    }
  };

  const handleSearchTerm = ({ detail: { value } }) => {
    searchTerm = value;
  };

  const handleSearchParameters = ({ detail: { pageSize, itemType }}) => {
    searchParameters = Object.freeze({
      pageSize,
      itemType,
    });

    searchParameters = searchParameters;
  };

  $: if (Object.values(searchParameters).some((value) => value === null) === false && searchTerm !== null) {
    searchHint = `show me ${searchParameters.pageSize} ${searchParameters.itemType}s of ${searchTerm}`;
  }

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
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;

    backdrop-filter: blur(3px);
  }

  section > form {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 2fr 1fr;
    grid-template-areas:
      'search-field'
      'search-parameters'
    ;
    grid-gap: max(0.25vw, 0.25vh);

    width: 30vw;
    height: fit-content;

    padding: min(1vh, 1vw);

    background-color: transparent;
  }

  .row {
    display: flex;
    flex: 1 0 auto;

    justify-content: stretch;
    align-items: center;
  }

  #search-field {
    grid-area: search-field;
  }

  #search-parameters {
    grid-area: search-parameters;
    display: flex;
    flex: 1 0 auto;
    align-items: stretch;
  }
</style>

{#if show === true}
  <section on:click={handleClick}>
    <form on:click|stopPropagation={ () => {} } on:submit|preventDefault|stopPropagation={handleSubmit}>
      <div id='search-field' class='row'>
        <SearchField on:value={handleSearchTerm} {searchHint} />
      </div>
      <div id='search-parameters' class='row'>
        <SearchParameters on:parameters={handleSearchParameters} />
      </div>
    </form>
  </section>
{/if}