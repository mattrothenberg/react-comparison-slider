/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React, { FC } from 'react';
import { Direction, Range } from 'react-range';
import { IThumbProps } from 'react-range/lib/types';

import { calculateAspectRatio } from './util';

interface DecorationRenderProps {
  value: number;
}

export type ComparisonSliderProps = ComparisonSliderStatefulProps &
  ComparisonSliderCommonProps;

export interface ComparisonSliderHandleProps extends IThumbProps {}

interface ComparisonSliderCommonProps {
  beforeComponent: React.ReactNode;
  afterComponent: React.ReactNode;
  aspectRatio: number | string;
  renderBeforeDecoration?: (props: DecorationRenderProps) => JSX.Element;
  renderAfterDecoration?: (props: DecorationRenderProps) => JSX.Element;
  renderDecoration?: (props: DecorationRenderProps) => JSX.Element;
  renderHandle?: (props: IThumbProps) => JSX.Element;
  orientation?: 'vertical' | 'horizontal';
}

type ComparisonSliderStatefulProps =
  | { defaultValue: number; value?: never; onValueChange?: never }
  | {
      value: number;
      onValueChange: (value: number) => void;
      defaultValue?: never;
    };

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

const DefaultRenderHandle = (props: IThumbProps) => {
  return (
    <div
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
      {...props}
    ></div>
  );
};

export const ComparisonSlider: FC<ComparisonSliderProps> = ({
  beforeComponent,
  afterComponent,
  aspectRatio,
  defaultValue,
  value,
  renderHandle = DefaultRenderHandle,
  renderDecoration = () => null,
  renderBeforeDecoration = () => null,
  renderAfterDecoration = () => null,
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

  const HandleDecorationComponent = renderDecoration;
  const BeforeDecorationComponent = renderBeforeDecoration;
  const AfterDecorationComponent = renderAfterDecoration;

  const handleChange = (newValue: number) => {
    if (isControlled) {
      onValueChange(newValue);
    } else {
      setLocalValue(newValue);
    }
  };

  const baseSlides = [
    <React.Fragment>
      {beforeComponent}
      <BeforeDecorationComponent value={sliderValue} />
    </React.Fragment>,
    <React.Fragment>
      {afterComponent}
      <AfterDecorationComponent value={sliderValue} />
    </React.Fragment>,
  ];

  const direction =
    orientation === 'horizontal' ? Direction.Right : Direction.Up;

  const slides =
    orientation === 'horizontal' ? baseSlides : baseSlides.reverse();

  return (
    <div
      css={css`
        height: 0;
        padding-bottom: ${padding}%;
        position: relative;
      `}
    >
      <HandleDecorationComponent value={sliderValue} />

      <React.Fragment>
        {slides.map((content, index) => {
          return (
            <div
              css={elementStyle}
              style={{ clipPath: index === 1 ? clipPath : '' }}
              key={index}
            >
              {content}
            </div>
          );
        })}
      </React.Fragment>

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
        <Range
          step={1}
          min={0}
          max={100}
          values={[sliderValue]}
          onChange={(values) => handleChange(values[0])}
          direction={direction}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              css={css`
                background: transparent;
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
              {children}
            </div>
          )}
          renderThumb={(params) => renderHandle(params.props)}
        />
      </div>
    </div>
  );
};
