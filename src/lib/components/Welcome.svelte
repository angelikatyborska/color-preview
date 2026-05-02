<script lang="ts">
  import { parseColorString } from '$lib/color';

  import ColorCard from '$lib/components/ColorCard.svelte';

  let value = $state<string>('hsla(30deg 82% 43% / 0.5)\nd\n#ff0\n\n#c0ffee35\n#c0ffee');
  let colors = $derived(
    value
      ?.split('\n')
      .map((x) => parseColorString(x))
      .filter((x) => !!x)
  );
</script>

<div>
  <textarea cols="10" rows="10" bind:value></textarea>
  {#if colors.length > 0}
    <ul>
      {#each colors as color (color)}
        <li>
          <ColorCard {color} />
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  ul {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: fit-content;
    margin: 0;
    padding: 0;
    list-style-type: '';
    max-width: 500px;
    gap: var(--spacing-md);
  }
</style>
