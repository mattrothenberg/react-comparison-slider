/** @jsxRuntime classic */
/** @jsx jsx */

import { Meta, Story } from '@storybook/react';
import { jsx, css } from '@emotion/react';
import { Thing, Props } from '../src';

const meta: Meta = {
  title: 'Comparison Swiper',
  component: Thing,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<Props> = (args) => <Thing {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {
  beforeElement: <div css={{ background: 'red' }}></div>,
  afterElement: <div css={{ background: 'blue' }}></div>,
  // aspectRatio: 16 / 9,
  aspectRatio: '4x3',
  beforeDecorationComponent: ({ value }: { value: number }) => {
    return (
      <div
        css={css`
          position: absolute;
          top: 16px;
          left: 16px;
        `}
      >
        Hey I'm before ({value})
      </div>
    );
  },
  afterDecorationComponent: ({ value }: { value: number }) => {
    return (
      <div
        css={css`
          position: absolute;
          top: 16px;
          right: 16px;
        `}
      >
        Hey I'm after ({value})
      </div>
    );
  },
  handleStyle: {
    background: 'transparent',
    // width: 36,
    // height: 36,
    borderRadius: '100%',
    boxShadow: 'inset 0 0 0px 2px white',
    '&:hover': {
      background: 'rgba(255, 255, 255, .25)',
    },
  },
};
