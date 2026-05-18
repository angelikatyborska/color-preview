<script lang="ts">
  import { parseColorString } from '$lib/color';

  import ColorCard from '$lib/components/ColorCard.svelte';
  import FormatSelect from '$lib/components/FormatSelect.svelte';
  import { getFormat, getSortDirection, getSortField } from '$lib/components/appState.svelte';
  import InputWithLabel from '$lib/components/InputWithLabel.svelte';
  import { sortColors } from '$lib/colors';
  import SortSelect from '$lib/components/SortSelect.svelte';

  let value = $state<string>('hsla(30deg 82% 43% / 0.5)\nd\n#ff0\n\n#c0ffee35\n#c0ffee');
  let colors = $derived.by(() => {
    const colors = value
      ?.split('\n')
      .map((x) => parseColorString(x))
      .filter((x) => !!x);

    return sortColors(colors, getSortField(), getSortDirection());
  });
</script>

<div class="app">
  <div class="form">
    <div class="step-heading-wrapper">
      <h2 class="step-heading">1. Input</h2>
    </div>
    <InputWithLabel labelFor="color-list-input" label="Color list">
      <textarea id="color-list-input" name="color-list-input" cols="10" rows="10" bind:value
      ></textarea>
    </InputWithLabel>
    <p>Input a list of colors separated by new lines.</p>
  </div>
  <div>
    <div class="step-heading-wrapper">
      <h2 class="step-heading">2. Preview</h2>

      <div class="settings">
        <FormatSelect />
        <SortSelect />
      </div>
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
    gap: var(--spacing-lg);
  }

  .step-heading {
    margin: 0;
    font-size: var(--font-size-h4);
    white-space: nowrap;
  }

  .step-heading-wrapper {
    margin-block: 0 var(--spacing-lg);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: var(--spacing-lg);
  }

  textarea {
    resize: vertical;
    background-color: var(--grayscale-100);
    border: 0;
    border-left: 2px solid var(--purple-70);
    padding: var(--spacing-md);
    font-family: var(--code-font-family);

    @media (prefers-reduced-motion: no-preference) {
      animation-name: var(--hue-rotate-animation-name);
      animation-duration: var(--hue-rotate-animation-duration);
      animation-timing-function: var(--hue-rotate-animation-timing-function);
      animation-iteration-count: var(--hue-rotate-animation-iteration-count);
    }
  }

  .settings {
    display: flex;
    flex-direction: row;
    justify-content: end;
    gap: var(--spacing-xs);
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
