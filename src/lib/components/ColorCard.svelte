<script lang="ts">
  import {
    type ColorFormat,
    getAlpha,
    getBlue,
    getBlackness,
    getGreen,
    getHex,
    getHsl,
    getHue,
    getHwb,
    getLightness,
    getOriginalString,
    getRed,
    getRgb,
    getSaturation,
    getWhiteness,
    type ParsedColor
  } from '$lib/color';

  interface Props {
    color: ParsedColor;
    format: ColorFormat;
  }

  const { color, format }: Props = $props();

  const formatted = $derived.by(() => {
    if (color.status === 'ok') {
      switch (format) {
        case 'rgb':
          return getRgb(color);
        case 'rgb-hex':
          return getHex(color);
        case 'hsl':
          return getHsl(color);
        case 'hwb':
          return getHwb(color);
      }
    }

    return 'Invalid color';
  });

  const table = $derived.by(() => {
    if (color.status === 'ok') {
      switch (format) {
        case 'rgb':
        case 'rgb-hex':
          return [
            ['R', getRed(color)],
            ['G', getGreen(color)],
            ['B', getBlue(color)],
            ['A', getAlpha(color)]
          ];
        case 'hsl':
          return [
            ['H', getHue(color)],
            ['S', getSaturation(color)],
            ['L', getLightness(color)],
            ['A', getAlpha(color)]
          ];
        case 'hwb':
          return [
            ['H', getHue(color)],
            ['W', getWhiteness(color)],
            ['B', getBlackness(color)],
            ['A', getAlpha(color)]
          ];
      }
    }

    return [];
  });
</script>

<div class="card">
  <div class="text">
    <h3 class="title">
      {#if color.status === 'ok'}
        {formatted}
      {:else}
        Invalid color
      {/if}
    </h3>
    <div>
      {#if color.status === 'ok'}
        <table>
          <tbody>
            {#each table as row (row)}
              <tr>
                <th>{row[0]}</th>
                <td>{row[1]}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      {/if}
    </div>
    <div class="original">Original input: {getOriginalString(color)}</div>
  </div>
  <div class="preview" style={color.status === 'ok' ? `background-color: ${formatted}` : ''}>
    {#if color.status === 'error'}
      ?
    {/if}
  </div>
</div>

<style>
  .card {
    font-family: var(--code-font-family);
    display: grid;
    grid-template-areas: 'text preview';
    padding: var(--spacing-md);
    border-radius: var(--spacing-sm);
    border: 1px solid var(--grayscale-70);
    grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  }

  .text {
    grid-area: text;
    display: grid;
    grid-template-rows: auto 1fr auto;

    table {
      border-collapse: collapse;
    }

    td,
    th {
      padding: var(--spacing-xs);
      border: 1px solid var(--grayscale-70);
    }
  }

  .card,
  .text {
    grid-gap: var(--spacing-md);
  }

  .title {
    margin: 0;
    font-weight: 700;
  }

  .preview {
    grid-area: preview;
    border-radius: var(--spacing-xs);
    position: relative;
    background: white;
    overflow: hidden;
    aspect-ratio: 1/1;
    font-size: 100px;
    text-align: center;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-top: var(--spacing-sm) solid white;
    border-left: var(--spacing-sm) solid white;
    border-right: var(--spacing-sm) solid black;
    border-bottom: var(--spacing-sm) solid black;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 200%;
      height: 200%;
      background-color: black;
      z-index: -1;
      transform-origin: top right;
      rotate: -45deg;
    }
  }
</style>
