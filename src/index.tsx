import React, { FC } from 'react';
import { Direction, Range } from 'react-range';
import { IThumbProps } from 'react-range/lib/types';
import { styled } from '@stitches/react';

import { calculateAspectRatio } from './util';

interface DecorationRenderProps {
  value: number;
}

export interface ComparisonSliderHandleProps extends IThumbProps {
  isFocused: boolean;
}

export type ComparisonSliderProps = ComparisonSliderStatefulProps &
  ComparisonSliderCommonProps;

interface ComparisonSliderCommonProps {
  beforeComponent: React.ReactNode;
  afterComponent: React.ReactNode;
  aspectRatio: number | string;
  renderBeforeDecoration?: (props: DecorationRenderProps) => JSX.Element;
  renderAfterDecoration?: (props: DecorationRenderProps) => JSX.Element;
  handleBeforeComponent?: React.ReactNode;
  handleAfterComponent?: React.ReactNode;
  renderHandle?: (props: ComparisonSliderHandleProps) => JSX.Element;
  orientation?: 'vertical' | 'horizontal';
  onlyHandleDraggable?: boolean;
}

type ComparisonSliderStatefulProps =
  | { defaultValue: number; value?: never; onValueChange?: never }
  | {
      value: number;
      onValueChange: (value: number) => void;
      defaultValue?: never;
    };

const PinnedDiv = styled('div', {
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  position: 'absolute',
});

const Track = styled(PinnedDiv, {
  background: 'transparent',
  zIndex: 10,
});

const RangeWrap = PinnedDiv;

const Element = styled(PinnedDiv, {
  '> *': {
    height: '100%',
  },

  '> *:not(style) + *': {
    height: 'unset',
  },
});

const Handle = styled('div', {
  width: 16,
  height: 16,
  background: 'white',
  borderRadius: '100%',
  border: '1px solid transparent',
  '&:focus': {
    outline: 'none',
    boxShadow: '0 0 0 2px rgba(0, 0, 0, 0.25)',
    borderColor: 'rgba(0, 0, 0, 1)',
  },
});

const AspectWrap = styled('div', {
  height: 0,
  position: 'relative',
});

const HandleDecoration = styled('div', {
  flex: '1 1 0%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'all',
});

const HandleCanvasWrap = styled('div', {
  display: 'flex',
  '&:focus': {
    outline: 'none',
  },
});

const HandleWrap = styled('div', {
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1,
});

const DefaultRenderHandle = (props: IThumbProps) => {
  return <Handle {...props}></Handle>;
};

export const ComparisonSlider: FC<ComparisonSliderProps> = ({
  beforeComponent,
  afterComponent,
  aspectRatio,
  defaultValue,
  value,
  renderHandle = DefaultRenderHandle,
  renderBeforeDecoration = () => null,
  renderAfterDecoration = () => null,
  handleBeforeComponent = () => null,
  handleAfterComponent = () => null,
  orientation = 'horizontal',
  onValueChange = () => {},
  onlyHandleDraggable = false,
}) => {
  const [focused, setFocused] = React.useState(false);
  const [localValue, setLocalValue] = React.useState(defaultValue);
  const isControlled =
    typeof defaultValue === 'undefined' && typeof value !== 'undefined';

  const isHorizontal = orientation === 'horizontal';

  const sliderValue = (isControlled ? value : localValue) as number;

  const padding = calculateAspectRatio(aspectRatio);
  const clipPath = isHorizontal
    ? `polygon(${sliderValue}% 0, 100% 0%, 100% 100%, ${sliderValue}% 100%)`
    : `polygon(0% 100%, 0% ${100 - sliderValue}%, 100% ${
        100 - sliderValue
      }%, 100% 100%)`;

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

  const direction = isHorizontal ? Direction.Right : Direction.Up;

  const slides = isHorizontal ? baseSlides : baseSlides.reverse();

  return (
    <AspectWrap style={{ paddingBottom: `${padding}%` }}>
      <React.Fragment>
        {slides.map((content, index) => {
          return (
            <Element
              style={{ clipPath: index === 1 ? clipPath : '' }}
              key={index}
            >
              {content}
            </Element>
          );
        })}
      </React.Fragment>

      <RangeWrap>
        <Range
          step={1}
          min={0}
          max={100}
          values={[sliderValue]}
          onChange={(values) => handleChange(values[0])}
          direction={direction}
          renderTrack={({ props, children }) => (
            <Track
              className=""
              {...props}
              style={{
                ...props.style,
                pointerEvents: onlyHandleDraggable ? 'none' : 'all',
              }}
            >
              {children}
            </Track>
          )}
          renderThumb={(params) => {
            let props: IThumbProps = {
              ...params.props,
              style: {
                ...params.props.style,
                pointerEvents: 'all',
              },
            };
            return (
              <HandleCanvasWrap
                {...params.props}
                style={{
                  ...params.props.style,
                  flexDirection: isHorizontal ? 'column' : 'row',
                  height: isHorizontal ? '100%' : 'auto',
                  width: isHorizontal ? 'auto' : '100%',
                }}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
              >
                <HandleDecoration>{handleBeforeComponent}</HandleDecoration>
                <HandleWrap>
                  {renderHandle({
                    ...props,
                    isFocused: focused,
                  })}
                </HandleWrap>
                <HandleDecoration>{handleAfterComponent}</HandleDecoration>
              </HandleCanvasWrap>
            );
          }}
        />
      </RangeWrap>
    </AspectWrap>
  );
};
