<script>
  import {
    onMount,
    onDestroy,
  } from 'svelte';
  import {
    BroadcastChannelNames,
  } from '../common/constants/BroadcastChannelNames.mjs';
  import Nav from '../components/Nav.svelte';
  import SearchForm from '../components/SearchForm.svelte';

  export let segment;

  let uiChannel = null;
  let showSearchForm = true;

  const handleUiChannelMessage = (event) => {
    const {
      data,
    } = event;
    console.debug('[_layout].handleUiChannelMessage:', event, data);

    switch (data.type) {
      case 'showSearchForm': {
        showSearchForm = true;

        break;
      }
      case 'hideSearchForm': {
        showSearchForm = false;

        break;
      }
      default: {
        break;
      }
    }
  };
  
  onMount(() => {
    uiChannel = new BroadcastChannel(BroadcastChannelNames.ui);

    uiChannel.addEventListener('message', handleUiChannelMessage);
  });

  onDestroy(() => {
    if (uiChannel) {
      uiChannel.removeEventListener('message', handleUiChannelMessage);
      uiChannel.close();

      uiChannel = null;
    }
  });
</script>

<Nav {segment}/>

<slot></slot>

<SearchForm show={showSearchForm} />