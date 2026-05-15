<script lang="ts">
  import type { ColorFormat } from '$lib/color';
  import { getFormat, setFormat } from './appState.svelte';

  const options: Array<{ key: ColorFormat; label: string }> = [
    { key: 'rgb-hex', label: 'RGB (hex)' },
    { key: 'rgb', label: 'RGB' },
    { key: 'hsl', label: 'HSL' },
    { key: 'hwb', label: 'HWB' }
  ];
</script>

<select
  value={getFormat()}
  onchange={(event) => setFormat(event.currentTarget?.value as ColorFormat)}
>
  {#each options as option (option.key)}
    <option value={option.key}>{option.label}</option>
  {/each}
</select>
