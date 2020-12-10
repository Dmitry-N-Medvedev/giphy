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
  let apiChannel = null;
  let searchTerm = '';
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
    if (searchTerm.length !== 0) {
      uiChannel.postMessage(Object.freeze({
        type: 'hideSearchForm',
      }));
      apiChannel.postMessage({
        type: 'search',
        payload: {
          searchTerm,
          searchParameters,
        },
      });
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

  $: isSearchParametersDefined = Object.values(searchParameters).findIndex((value) => value === null) === -1;

  $: if (isSearchParametersDefined === true) {
    if (searchTerm.length === 0) {
      searchHint = 'type in search terms';
    } else {
      searchHint = `show me ${searchParameters.pageSize} ${searchParameters.itemType} of ${searchTerm}`;
    }
  }

  $: if (isSearchParametersDefined === false) {
    searchHint = 'type in search terms';
  }

  onMount(() => {
    uiChannel = new BroadcastChannel(BroadcastChannelNames.ui);
    apiChannel = new BroadcastChannel(BroadcastChannelNames.api);
  });

  onDestroy(() => {
    if (uiChannel) {
      uiChannel.close();

      uiChannel = null;
    }

    if (apiChannel) {
      apiChannel.close();

      apiChannel = null;
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
    pointer-events: all;
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