<script lang="ts">
  import { parseColorString } from '$lib/color';

  import ColorCard from '$lib/components/ColorCard.svelte';
  import FormatSelect from '$lib/components/FormatSelect.svelte';
  import { getFormat } from '$lib/components/appState.svelte';
  import InputWithLabel from '$lib/components/InputWithLabel.svelte';

  let value = $state<string>('hsla(30deg 82% 43% / 0.5)\nd\n#ff0\n\n#c0ffee35\n#c0ffee');
  let colors = $derived(
    value
      ?.split('\n')
      .map((x) => parseColorString(x))
      .filter((x) => !!x)
  );
</script>

<div class="app">
  <div class="intro">
    <h1>Bulk Color Preview</h1>
    <p>Input a list of colors separated by new lines.</p>
  </div>

  <div class="form">
    <h2 class="step-heading">1. Input</h2>
    <InputWithLabel labelFor="color-list-input" label="Color list">
      <textarea id="color-list-input" name="color-list-input" cols="10" rows="10" bind:value
      ></textarea>
    </InputWithLabel>
  </div>
  <div>
    <h2 class="step-heading">2. Preview</h2>

    <div class="settings">
      <FormatSelect />
    </div>
    {#if colors.length > 0}
      <ul>
        {#each colors as color (color)}
          <li>
            <ColorCard {color} format={getFormat()} />
          </li>
        {/each}
      </ul>
    {/if}
  </div>
  <div>
    <h2 class="step-heading">3. Export</h2>
  </div>
</div>

<style>
  .app {
    display: grid;
    grid-auto-rows: min-content;
  }

  .intro {
    text-align: center;
  }

  .step-heading {
    font-size: var(--font-size-h4);
  }

  textarea {
    resize: vertical;
    padding: var(--spacing-md);
    border-radius: var(--spacing-sm);
    border: 1px solid var(--grayscale-70);
    font-family: var(--code-font-family);
  }

  .settings {
    display: flex;
    flex-direction: row;
    justify-content: end;
    font-size: var(--font-size-small);
  }

  ul {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: min-content;
    margin: 0;
    padding: 0;
    list-style-type: '';
    gap: var(--spacing-md);
  }
</style>
