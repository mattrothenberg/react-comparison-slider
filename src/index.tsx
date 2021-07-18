/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React, { FC, forwardRef } from 'react';
import {
  SliderInput,
  SliderTrack,
  SliderRange,
  SliderHandle,
  SliderHandleProps,
} from '@reach/slider';

import { calculateAspectRatio } from './util';

interface DecorationRenderProps {
  value: number;
}

export type ComparisonSliderProps = ComparisonSliderStatefulProps &
  ComparisonSliderCommonProps;

interface ComparisonSliderCommonProps {
  beforeComponent: React.ReactNode;
  afterComponent: React.ReactNode;
  aspectRatio: number | string;
  handleDecorationComponent?: React.FC<DecorationRenderProps>;
  beforeDecorationComponent?: React.FC<DecorationRenderProps>;
  afterDecorationComponent?: React.FC<DecorationRenderProps>;
  handleComponent?: React.FC<ComparisonSliderHandleProps>;
  orientation?: 'vertical' | 'horizontal';
}

type ComparisonSliderStatefulProps =
  | { defaultValue: number; value?: never; onValueChange?: never }
  | {
      value: number;
      onValueChange: (value: number) => void;
      defaultValue?: never;
    };

export type ComparisonSliderHandleProps = SliderHandleProps;

const elementStyle = css`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  > * {
    height: 100%;
  }

  > *:not(style) + * {
    height: unset;
  }
`;

const DefaultHandleComponent = forwardRef<
  HTMLDivElement,
  ComparisonSliderHandleProps
>((props, ref) => {
  return (
    <div
      {...props}
      ref={ref}
      css={css`
        width: 16px;
        height: 16px;
        background: white;
        border-radius: 100%;
        border: 1px solid transparent;

        &:focus {
          outline: none;
          box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.25);
          border-color: rgba(0, 0, 0, 1);
        }
      `}
    ></div>
  );
});

const DefaultHandleDecorationComponent = (props: DecorationRenderProps) => {
  const { value } = props;

  return (
    <React.Fragment>
      <div
        css={css`
          position: absolute;
          width: 1px;
          background: white;
          z-index: 10;
          pointer-events: none;
        `}
        style={{ left: `${value}%`, height: `calc(50% - 0px)` }}
      ></div>
      <div
        css={css`
          position: absolute;
          bottom: 0;
          width: 1px;
          background: white;
          z-index: 10;
          pointer-events: none;
        `}
        style={{ left: `${value}%`, height: `calc(50% - 0px)` }}
      ></div>
    </React.Fragment>
  );
};

export const ComparisonSlider: FC<ComparisonSliderProps> = ({
  beforeComponent,
  afterComponent,
  aspectRatio,
  defaultValue,
  value,
  handleDecorationComponent = DefaultHandleDecorationComponent,
  handleComponent = DefaultHandleComponent,
  beforeDecorationComponent = () => null,
  afterDecorationComponent = () => null,
  orientation = 'horizontal',
  onValueChange = () => {},
}) => {
  const [localValue, setLocalValue] = React.useState(defaultValue);
  const isControlled =
    typeof defaultValue === 'undefined' && typeof value !== 'undefined';

  const sliderValue = (isControlled ? value : localValue) as number;

  const padding = calculateAspectRatio(aspectRatio);
  const clipPath =
    orientation === 'horizontal'
      ? `polygon(${sliderValue}% 0, 100% 0%, 100% 100%, ${sliderValue}% 100%)`
      : `polygon(0% 100%, 0% ${100 - sliderValue}%, 100% ${
          100 - sliderValue
        }%, 100% 100%)`;

  const HandleDecorationComponent = handleDecorationComponent;
  const BeforeDecorationComponent = beforeDecorationComponent;
  const AfterDecorationComponent = afterDecorationComponent;
  const HandleComponent = handleComponent;
  const ForwardedHandleComponent = React.useMemo(
    () =>
      forwardRef<HTMLDivElement, ComparisonSliderHandleProps>((props, ref) => {
        return <HandleComponent {...props} ref={ref} />;
      }),
    []
  );

  const handleChange = (newValue: number) => {
    if (isControlled) {
      onValueChange(newValue);
    } else {
      setLocalValue(newValue);
    }
  };

  return (
    <div
      css={css`
        height: 0;
        padding-bottom: ${padding}%;
        position: relative;

        :root {
          --reach-slider: 1;
        }

        [data-reach-slider-input] {
          max-width: 100%;
        }

        [data-reach-slider-input][data-orientation='horizontal'] {
          height: 0.5rem;
        }

        [data-reach-slider-input][data-orientation='vertical'] {
          width: 0.5rem;
          /* the height is somewhat arbitrary but necessary for vertical sliders for
          basic functionality */
          height: 250px;
          max-height: 100%;
        }

        [data-reach-slider-input][data-disabled] {
          opacity: 0.5;
          pointer-events: none;
        }

        [data-reach-slider-track] {
          position: relative;
          border-radius: 0.25rem;
          background: hsl(0, 0%, 95%);
        }

        [data-reach-slider-track][data-orientation='horizontal'] {
          width: 100%;
          height: inherit;
        }

        [data-reach-slider-track][data-orientation='vertical'] {
          width: inherit;
          height: 100%;
        }

        /* This pseudo element provides an invisible area that increases the touch
        target size of the track */
        [data-reach-slider-track]::before {
          content: '';
          position: absolute;
        }

        [data-reach-slider-track][data-orientation='horizontal']::before {
          width: 100%;
          height: 1.5rem;
          top: calc(-0.5rem - 1px);
          left: 0;
        }

        [data-reach-slider-track][data-orientation='vertical']::before {
          width: 1.5rem;
          height: 100%;
          top: 0;
          left: calc(-0.5rem - 1px);
        }

        [data-reach-slider-handle][aria-orientation='horizontal'] {
          top: 50%;
          transform: translateY(-50%);
        }

        [data-reach-slider-handle][aria-orientation='horizontal']:focus {
          transform: translateY(-50%);
        }

        [data-reach-slider-handle][aria-orientation='vertical'] {
          left: 50%;
          transform: translateX(-50%);
        }

        [data-reach-slider-range] {
          border-radius: inherit;
          background: #1159a6;
          left: 0;
          bottom: 0;
        }

        [data-reach-slider-range][data-orientation='horizontal'] {
          height: 100%;
        }

        [data-reach-slider-range][data-orientation='vertical'] {
          width: 100%;
        }

        [data-reach-slider-marker] {
          background: hsl(0, 0%, 50%);
          transform-origin: center;
        }

        [data-reach-slider-marker][data-orientation='horizontal'] {
          top: 50%;
          transform: translate(-50%, -50%);
          width: 3px;
          height: 0.75rem;
        }

        [data-reach-slider-marker][data-orientation='vertical'] {
          left: 50%;
          transform: translate(-50%, -50%);
          width: 0.75rem;
          height: 3px;
        }

        [data-reach-slider-marker][data-state='at-value'],
        [data-reach-slider-marker][data-state='under-value'] {
          /* */
        }

        /* TODO: Remove in 1.0 */
        [data-reach-slider-track-highlight] {
          border-radius: inherit;
          background: #1159a6;
          left: 0;
          bottom: 0;
        }

        [data-reach-slider-track-highlight][data-orientation='horizontal'] {
          height: 100%;
        }

        [data-reach-slider-track-highlight][data-orientation='vertical'] {
          width: 100%;
        }

        [data-reach-slider-input][data-orientation='horizontal'] {
          height: 100% !important;
        }

        [data-reach-slider-track][data-orientation='horizontal'] {
          background: transparent;
          height: 100% !important;
        }

        [data-reach-slider-range][data-orientation='horizontal'],
        [data-reach-slider-range][data-orientation='vertical'] {
          background: transparent !important;
        }

        [data-reach-slider-input][data-orientation='vertical'] {
          width: 100% !important;
          height: 100% !important;
          background: transparent !important;
        }

        [data-reach-slider-track][data-orientation='vertical'] {
          background: transparent !important;
        }
      `}
    >
      <HandleDecorationComponent value={sliderValue} />
      {orientation === 'horizontal' && (
        <React.Fragment>
          <div css={elementStyle}>
            {beforeComponent}
            <BeforeDecorationComponent value={sliderValue} />
          </div>
          <div css={elementStyle} style={{ clipPath }}>
            {afterComponent}
            <AfterDecorationComponent value={sliderValue} />
          </div>
        </React.Fragment>
      )}
      {orientation === 'vertical' && (
        <React.Fragment>
          <div css={elementStyle}>
            {afterComponent}
            <AfterDecorationComponent value={sliderValue} />
          </div>
          <div css={elementStyle} style={{ clipPath }}>
            {beforeComponent}
            <BeforeDecorationComponent value={sliderValue} />
          </div>
        </React.Fragment>
      )}
      <div
        css={css`
          position: absolute;
          z-index: 10;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        `}
      >
        <SliderInput
          min={0}
          max={100}
          value={sliderValue}
          onChange={handleChange}
          // @ts-ignore
          orientation={orientation}
        >
          <SliderTrack>
            <SliderRange />
            <SliderHandle as={ForwardedHandleComponent} />
          </SliderTrack>
        </SliderInput>
      </div>
    </div>
  );
};
