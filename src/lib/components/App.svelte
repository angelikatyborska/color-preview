<script lang="ts">
  import { parseColorString } from '$lib/color';

  import ColorCard from '$lib/components/ColorCard.svelte';
  import FormatSelect from '$lib/components/FormatSelect.svelte';
  import {
    getExportDeduplicated,
    getExportFormatted,
    getExportSorted,
    getFormat,
    getSortDirection,
    getSortField,
    setExportDeduplicated,
    setExportFormatted,
    setExportSorted
  } from '$lib/components/appState.svelte';
  import InputWithLabel from '$lib/components/InputWithLabel.svelte';
  import { markDuplicates, sortColors } from '$lib/colors';
  import SortSelect from '$lib/components/SortSelect.svelte';
  import { formatColor } from '$lib/color';
  import Checkbox from '$lib/components/Checkbox.svelte';

  let value = $state<string>('');
  let colors = $derived.by(() => {
    if (value.trim()) {
      const colors = value
        ?.trim()
        .split('\n')
        .map((x, index) => parseColorString(x, index))
        .filter((x) => !!x);
      const markedColors = markDuplicates(colors);
      return sortColors(markedColors, getSortField(), getSortDirection());
    } else {
      return [];
    }
  });

  let placeholder = ['black', '#c0ffee', 'hsl(240 50% 50% / 0.3)'];

  let toExport = $derived.by(() => {
    return colors
      .filter((color) => {
        if (color.status === 'ok') {
          if (getExportDeduplicated()) {
            return !(typeof color.duplicateOf === 'number');
          } else {
            return true;
          }
        } else {
          return false;
        }
      })
      .toSorted((color1, color2) => {
        if (getExportSorted()) {
          // the colors are already sorted
          return 0;
        } else {
          return color1.originalIndex - color2.originalIndex;
        }
      })
      .map((color) => {
        if (color.status === 'ok') {
          if (getExportFormatted()) {
            return formatColor(color, getFormat());
          } else {
            return color.originalString;
          }
        }
      })
      .filter((x) => !!x);
  });
</script>

<div class="app">
  <div class="section-input">
    <div class="step-heading-wrapper">
      <h2 class="step-heading">1. Input</h2>
    </div>
    <InputWithLabel labelFor="color-list-input" label="Color list">
      <textarea
        id="color-list-input"
        name="color-list-input"
        cols="10"
        rows={Math.max(placeholder.length, colors.length) + 1}
        bind:value
        placeholder={placeholder.join('\n')}
      ></textarea>
    </InputWithLabel>
    <p>Copy-paste a list of CSS colors separated by new lines.</p>
  </div>
  <div class="section-preview">
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
    {:else}
      <p>No colors yet.</p>
    {/if}
  </div>
  <div class="section-export">
    <div class="step-heading-wrapper">
      <h2 class="step-heading">3. Export</h2>

      <div class="settings">
        <Checkbox label="Formatted" getter={getExportFormatted} setter={setExportFormatted} />
        <Checkbox label="Sorted" getter={getExportSorted} setter={setExportSorted} />
        <Checkbox
          label="Deduplicated"
          getter={getExportDeduplicated}
          setter={setExportDeduplicated}
        />
      </div>
    </div>

    {#if toExport.length > 0}
      <textarea
        readonly={true}
        id="color-list-export"
        name="color-list-export"
        cols="10"
        rows={Math.max(placeholder.length, toExport.length)}
        bind:value={() => toExport.join('\n'), () => {}}
      ></textarea>
    {:else}
      <p>No colors yet.</p>
    {/if}
  </div>
</div>

<style>
  .app {
    display: grid;
    grid-auto-rows: min-content;
    gap: var(--spacing-lg);

    @media (width >= 1111px) {
      grid-template-columns: 1fr 2fr;
      grid-template-rows: auto 1fr;
    }
  }

  .section-input {
    @media (width >= 1111px) {
      grid-column: 1 / 2;
      grid-row: 1 / 2;
    }
  }

  .section-preview {
    @media (width >= 1111px) {
      grid-column: 2 / 3;
      grid-row: 1 / 3;
    }
  }

  .section-export {
    @media (width >= 1111px) {
      grid-column: 1 / 2;
      grid-row: 2 / 3;
    }
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
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    column-gap: var(--spacing-lg);
    row-gap: var(--spacing-md);
  }

  textarea {
    resize: none;
    width: 100%;
    background-color: var(--background-color-alt);
    border: 0;
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
    column-gap: var(--spacing-sm);
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
