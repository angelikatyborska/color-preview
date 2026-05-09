import type { Meta, StoryObj } from '@storybook/sveltekit';
import type { ComponentProps } from 'svelte';
import ColorCard from './ColorCard.svelte';
import { parseColorString } from '$lib/color';

const meta: Meta<ComponentProps<typeof ColorCard>> = {
  title: 'Components/ColorCard',
  component: ColorCard,
  tags: ['autodocs'],
  argTypes: {
    color: {
      table: {
        disable: true
      }
    }
  }
};

export default meta;
type Story = StoryObj<ComponentProps<typeof ColorCard>>;

export const ValidColorRgb: Story = {
  args: {
    color: parseColorString('red'),
    format: 'rgb'
  }
};

export const SemiTransparentRgb: Story = {
  args: {
    color: parseColorString('rgba(0, 0, 255, 0.5)'),
    format: 'rgb'
  }
};

export const ValidColorRgbHex: Story = {
  args: {
    color: parseColorString('red'),
    format: 'rgb-hex'
  }
};

export const SemiTransparentRgbHex: Story = {
  args: {
    color: parseColorString('rgba(0, 0, 255, 0.5)'),
    format: 'rgb-hex'
  }
};

export const ValidColorHsl: Story = {
  args: {
    color: parseColorString('red'),
    format: 'hsl'
  }
};

export const SemiTransparentHsl: Story = {
  args: {
    color: parseColorString('rgba(0, 0, 255, 0.5)'),
    format: 'hsl'
  }
};

export const ValidColorHwb: Story = {
  args: {
    color: parseColorString('red'),
    format: 'hwb'
  }
};

export const SemiTransparentHwb: Story = {
  args: {
    color: parseColorString('rgba(0, 0, 255, 0.5)'),
    format: 'hwb'
  }
};

export const InvalidColor: Story = {
  args: {
    color: parseColorString('notacolor'),
    format: 'rgb'
  }
};
