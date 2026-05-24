<script lang="ts">
  import {
    type ColorFormat,
    getOriginalString,
    getAlpha,
    getRed,
    getGreen,
    getBlue,
    getHue,
    getSaturation,
    getLightness,
    getWhiteness,
    getBlackness,
    toHex,
    toHsl,
    toHwb,
    toRgb,
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
          return toRgb(color);
        case 'rgb-hex':
          return toHex(color);
        case 'hsl':
          return toHsl(color);
        case 'hwb':
          return toHwb(color);
      }
    }

    return null;
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
        <code>{formatted}</code>

        {#if typeof color.duplicateOf === 'number'}
          <span class="duplicate">→ duplicate of #{color.duplicateOf + 1}</span>
        {/if}
      {:else}
        Invalid color
      {/if}
    </h3>
    <div>
      {#if color.status === 'ok'}
        <table>
          <thead>
            <tr>
              {#each table as row (row)}
                <th>{row[0]}</th>
              {/each}
            </tr>
          </thead>
          <tbody>
            <tr>
              {#each table as row (row)}
                <td><code>{row[1]}</code></td>
              {/each}
            </tr>
          </tbody>
        </table>
      {/if}
    </div>
    <dl class="original">
      <dt>Original input #{color.originalIndex + 1}</dt>
      <dd>
        {#if getOriginalString(color).trim()}
          <code>{getOriginalString(color)}</code>
        {:else}
          <em>empty</em>
        {/if}
      </dd>
    </dl>
  </div>
  <div
    class="preview"
    style={color.status === 'ok' ? `--color-card-preview-background-color: ${formatted}` : ''}
  >
    {#if color.status === 'error'}
      <span class="content">?</span>
    {/if}
  </div>
</div>

<style>
  .card {
    display: grid;
    grid-template-areas: 'text preview';
    padding: var(--spacing-md);
    grid-template-columns: minmax(0, 5fr) minmax(0, 2fr);
    background-color: var(--grayscale-100);
  }

  .text {
    grid-area: text;
    display: grid;
    grid-template-rows: auto 1fr auto;

    table {
      border-collapse: collapse;
      width: 100%;
    }
    tr {
      border-radius: var(--spacing-xs);
    }

    td,
    th {
      padding: var(--spacing-xs);
      border: 1px solid var(--grayscale-70);
      width: 25%;
    }
  }

  .card,
  .text {
    grid-gap: var(--spacing-md);
  }

  .title {
    margin: 0;
    font-weight: 700;
    font-size: var(--font-size-h5);

    .duplicate {
      white-space: nowrap;
      font-weight: 400;
      font-size: var(--font-size-p);
      font-family: var(--paragraph-font-family);
      color: var(--grayscale-30);
    }
  }

  .original {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);

    dt {
      font-weight: 700;
      font-size: var(--font-size-small);
    }

    dd {
      margin: 0;
    }
  }

  .preview {
    container-type: inline-size;
    grid-area: preview;
    position: relative;
    background: white;
    overflow: hidden;
    aspect-ratio: 1/1;
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
      transform-origin: top right;
      rotate: -45deg;
      z-index: 1;
    }

    &:after {
      content: '';
      position: absolute;
      inset: 0;
      background-color: var(--color-card-preview-background-color, white);
      z-index: 1;
    }

    .content {
      font-size: 50cqi;
      position: relative;
      z-index: 2;
      font-family: var(--heading-font-family);
      color: var(--grayscale-80);
      user-select: none;
    }
  }
</style>
