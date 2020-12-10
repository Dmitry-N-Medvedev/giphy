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
  let showSearchForm = false;

  const handleUiChannelMessage = (event) => {
    const {
      data,
    } = event;

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
        console.debug('[_layout].handleUiChannelMessage. Unknown event type:', event, data);

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