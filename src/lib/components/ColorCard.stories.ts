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
        disable: true,
      },
    }
  }
};

export default meta;
type Story = StoryObj<ComponentProps<typeof ColorCard>>;

export const ValidColor: Story = {
  args: {
    color: parseColorString('red')
  }
};

export const SemiTransparent: Story = {
  args: {
    color: parseColorString('rgba(0, 0, 255, 0.5)')
  }
};

export const InvalidColor: Story = {
  args: {
    color: parseColorString('notacolor')
  }
};
