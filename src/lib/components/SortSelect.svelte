<script lang="ts">
  import { getSortDirection, getSortField, setSort } from './appState.svelte';
  import InputWithLabel from '$lib/components/InputWithLabel.svelte';
  import type { ColorSortDirection, ColorSortField } from '$lib/colors';

  const options: Array<{ key: `${ColorSortField}-${ColorSortDirection}`; label: string }> = [
    { key: 'original-asc', label: 'Original' },
    { key: 'hue-asc', label: 'Hue (asc)' },
    { key: 'hue-desc', label: 'Hue (desc)' },
    { key: 'saturation-asc', label: 'Saturation (asc)' },
    { key: 'saturation-desc', label: 'Saturation (desc)' },
    { key: 'lightness-asc', label: 'Lightness (asc)' },
    { key: 'lightness-desc', label: 'Lightness (desc)' },
    { key: 'alpha-asc', label: 'Alpha (asc)' },
    { key: 'alpha-desc', label: 'Alpha (desc)' }
  ];
</script>

<InputWithLabel labelFor="color-sort-select" label="Sort">
  <select
    id="color-sort-select"
    name="color-sort-select"
    value={`${getSortField()}-${getSortDirection()}`}
    onchange={(event) => {
      const values = event.currentTarget?.value?.split('-');
      const field: ColorSortField = (values[0] as ColorSortField) || 'original';
      const direction: ColorSortDirection = (values[1] as ColorSortDirection) || 'asc';
      setSort(field, direction);
    }}
  >
    {#each options as option (option.key)}
      <option value={option.key}>{option.label}</option>
    {/each}
  </select>
</InputWithLabel>
