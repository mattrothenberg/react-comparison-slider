/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css, CSSObject } from '@emotion/react';
import React, { FC } from 'react';
import {
  SliderInput,
  SliderTrack,
  SliderRange,
  SliderHandle,
} from '@reach/slider';
import '@reach/slider/styles.css';

interface DecorationRenderProps {
  value: number;
}

export interface Props {
  beforeElement: React.ReactNode;
  afterElement: React.ReactNode;
  aspectRatio: number | string;
  initialValue?: number;
  handleStyle?: CSSObject;
  handleClass: string;
  handleDecorationComponent?: React.FC<DecorationRenderProps>;
  beforeDecorationComponent?: React.FC<DecorationRenderProps>;
  afterDecorationComponent?: React.FC<DecorationRenderProps>;
}

const aspectRatioRegex = new RegExp(/(\d+)(:|x)(\d+)/);

function calculateAspectRatio(ratio: number | string) {
  const asNumber = Number(ratio);
  const asString = String(ratio);

  const isNumber = !isNaN(asNumber);

  if (isNumber) {
    return (1 / asNumber) * 100;
  } else {
    const match = asString.match(aspectRatioRegex);
    if (!match)
      throw Error(
        'Please use a valid aspect ratio delimeter, either "x" or ":"'
      );

    const width = Number(match[1]);
    const height = Number(match[3]);
    return (height / width) * 100;
  }
}

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
`;

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

export const Thing: FC<Props> = ({
  beforeElement,
  afterElement,
  aspectRatio,
  initialValue = 50,
  handleStyle = {},
  handleClass = '',
  handleDecorationComponent = DefaultHandleDecorationComponent,
  beforeDecorationComponent = () => null,
  afterDecorationComponent = () => null,
}) => {
  const [value, setValue] = React.useState(initialValue);
  const padding = calculateAspectRatio(aspectRatio);
  const clipPath = `polygon(${value}% 0, 100% 0%, 100% 100%, ${value}% 100%)`;

  const HandleDecorationComponent = handleDecorationComponent;
  const BeforeDecorationComponent = beforeDecorationComponent;
  const AfterDecorationComponent = afterDecorationComponent;

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

        [data-reach-slider-handle] {
          ${handleStyle}
        }
      `}
    >
      <HandleDecorationComponent value={value} />
      <div css={elementStyle}>
        {beforeElement}
        <BeforeDecorationComponent value={value} />
      </div>
      <div css={elementStyle} style={{ clipPath }}>
        {afterElement}
        <AfterDecorationComponent value={value} />
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
        <SliderInput min={0} max={100} value={value} onChange={setValue}>
          <SliderTrack>
            <SliderRange />
            <SliderHandle className={handleClass} />
          </SliderTrack>
        </SliderInput>
      </div>
    </div>
  );
};
