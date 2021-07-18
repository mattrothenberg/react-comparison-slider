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
import '@reach/slider/styles.css';
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
  onValueChange = () => {},
}) => {
  const [localValue, setLocalValue] = React.useState(defaultValue);
  const isControlled =
    typeof defaultValue === 'undefined' && typeof value !== 'undefined';

  const sliderValue = (isControlled ? value : localValue) as number;

  const padding = calculateAspectRatio(aspectRatio);
  const clipPath = `polygon(${sliderValue}% 0, 100% 0%, 100% 100%, ${sliderValue}% 100%)`;

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
        overflow: hidden;

        [data-reach-slider-input][data-orientation='horizontal'] {
          height: 100% !important;
        }

        [data-reach-slider-track][data-orientation='horizontal'] {
          background: transparent;
          height: 100% !important;
        }

        [data-reach-slider-range][data-orientation='horizontal'] {
          background: transparent;
        }
      `}
    >
      <HandleDecorationComponent value={sliderValue} />
      <div css={elementStyle}>
        {beforeComponent}
        <BeforeDecorationComponent value={sliderValue} />
      </div>
      <div css={elementStyle} style={{ clipPath }}>
        {afterComponent}
        <AfterDecorationComponent value={sliderValue} />
      </div>
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
