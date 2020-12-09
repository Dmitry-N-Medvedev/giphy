<script>
  import {
    createEventDispatcher,
  } from 'svelte';

  import Select from './Select.svelte';
  import Radio from './Radio.svelte';

  const itemsPerPage = Object.freeze([25, 50]);
  const radioValues = Object.freeze(['gif', 'sticker']);

  let pageSize = null;
  let itemType = null;

  const dispatch = createEventDispatcher();

  const handlePageSizeSelected = ({ detail }) => {
    pageSize = detail;
  };

  const handleResultTypeSelected = ({ detail }) => {
    itemType = detail;
  };

  $: if (pageSize && itemType) {
    dispatch('parameters', Object.freeze({
      pageSize,
      itemType,
    }));
  }
</script>

<style>
  section {
    display: flex;
    flex: 1 0 auto;
    justify-content: space-between;
  }
</style>

<section>
  <Select items={itemsPerPage} on:selected={handlePageSizeSelected} />
  <Radio name='result-type' items={radioValues} on:selected={handleResultTypeSelected} />
</section>