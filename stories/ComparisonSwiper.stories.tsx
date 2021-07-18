/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx, css } from '@emotion/react';
import React, { forwardRef, Fragment, useState } from 'react';
import { ComparisonSlider, ComparisonSliderHandleProps } from '../src';
import { BiMoveHorizontal, BiStar } from 'react-icons/bi';

export default {
  title: 'ComparisonSlider',
  component: ComparisonSlider,
};

const images = [
  [
    'https://m.media-amazon.com/images/I/71a8uPfldpL._AC_SR1400,1050_.jpg',
    'https://m.media-amazon.com/images/I/91h92SK1tEL._AC_SR1400,1050_.jpg',
  ],
  [
    'https://nyc3.digitaloceanspaces.com/bia/2020/05/Cobble-Hill-Kitchen-Before-1024x683.jpg',
    'https://nyc3.digitaloceanspaces.com/bia/2020/05/baltic-st-kitchen-2-1024x683.jpg',
  ],
];

export const Default = () => {
  return (
    <ComparisonSlider
      defaultValue={50}
      beforeComponent={<div css={{ background: 'tomato' }}></div>}
      afterComponent={<div css={{ background: 'cornflowerblue' }}></div>}
      aspectRatio={16 / 9}
    />
  );
};

export const CustomAspectRatios = () => {
  return (
    <div
      css={css`
        width: 400px;
      `}
    >
      <ComparisonSlider
        defaultValue={50}
        beforeComponent={<div css={{ background: 'tomato' }}></div>}
        afterComponent={<div css={{ background: 'cornflowerblue' }}></div>}
        aspectRatio={1}
      />
    </div>
  );
};

export const UncontrolledInitialValue = () => {
  return (
    <ComparisonSlider
      defaultValue={75}
      beforeComponent={<div css={{ background: 'tomato' }}></div>}
      afterComponent={<div css={{ background: 'cornflowerblue' }}></div>}
      aspectRatio={16 / 9}
    />
  );
};

export const FullyControlled = () => {
  const [value, setValue] = useState(50);
  return (
    <ComparisonSlider
      value={value}
      onValueChange={setValue}
      beforeComponent={<div css={{ background: 'tomato' }}></div>}
      afterComponent={<div css={{ background: 'cornflowerblue' }}></div>}
      aspectRatio={16 / 9}
    />
  );
};

const ConverseHandle = forwardRef<HTMLDivElement, ComparisonSliderHandleProps>(
  (props, ref) => {
    return (
      <div
        ref={ref}
        css={css`
          background: black;
          width: 48px;
          height: 48px;
          border-radius: 100%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 1);
          cursor: pointer;
        `}
        {...props}
      >
        <BiStar size={24} />
      </div>
    );
  }
);

const CustomHandleComponent = forwardRef<
  HTMLDivElement,
  ComparisonSliderHandleProps
>((props, ref) => {
  return (
    <div
      ref={ref}
      css={css`
        background: white;
        width: 48px;
        height: 48px;
        border-radius: 100%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: rgba(0, 0, 0, 0.5);
        cursor: pointer;

        &:hover {
          color: rgba(0, 0, 0, 1);
        }
      `}
      {...props}
    >
      <BiMoveHorizontal size={24} />
    </div>
  );
});

export const CustomHandle = () => {
  return (
    <ComparisonSlider
      defaultValue={50}
      beforeComponent={<div css={{ background: 'tomato' }}></div>}
      afterComponent={<div css={{ background: 'cornflowerblue' }}></div>}
      aspectRatio={16 / 9}
      handleComponent={CustomHandleComponent}
    />
  );
};

export const CustomHandleDecorations = () => {
  return (
    <ComparisonSlider
      defaultValue={50}
      beforeComponent={<div css={{ background: 'tomato' }}></div>}
      afterComponent={<div css={{ background: 'cornflowerblue' }}></div>}
      aspectRatio={16 / 9}
      handleDecorationComponent={({ value }) => {
        return (
          <Fragment>
            <div
              css={css`
                position: absolute;
                width: 4px;
                background: linear-gradient(
                  to top,
                  rgba(255, 255, 255, 1),
                  rgba(255, 255, 255, 0.2)
                );
                z-index: 10;
                pointer-events: none;
              `}
              style={{
                left: `calc(${value}% - 1px)`,
                height: `calc(50% - 0px)`,
              }}
            ></div>
            <div
              css={css`
                position: absolute;
                bottom: 0;
                width: 4px;
                background: linear-gradient(
                  to bottom,
                  rgba(255, 255, 255, 1),
                  rgba(255, 255, 255, 0.2)
                );
                z-index: 10;
                pointer-events: none;
              `}
              style={{
                left: `calc(${value}% - 1px)`,
                height: `calc(50% - 0px)`,
              }}
            ></div>
          </Fragment>
        );
      }}
    />
  );
};

export const CustomElementDecorations = () => {
  return (
    <ComparisonSlider
      defaultValue={50}
      beforeComponent={<div css={{ background: 'tomato' }}></div>}
      afterComponent={<div css={{ background: 'cornflowerblue' }}></div>}
      beforeDecorationComponent={({ value }) => (
        <div
          css={css`
            position: absolute;
            left: 16px;
            top: 16px;
            background: black;
            color: white;
            padding: 8px;
          `}
        >
          Before ({value}%)
        </div>
      )}
      afterDecorationComponent={({ value }) => (
        <div
          css={css`
            position: absolute;
            right: 16px;
            top: 16px;
            background: black;
            color: white;
            padding: 8px;
          `}
        >
          After ({value}%)
        </div>
      )}
      handleDecorationComponent={() => null}
      aspectRatio={16 / 9}
    />
  );
};

export const WithImages = () => {
  return (
    <div
      css={css`
        width: 500px;
        border: 2px solid black;
      `}
    >
      <ComparisonSlider
        aspectRatio="4x3"
        defaultValue={50}
        handleComponent={ConverseHandle}
        handleDecorationComponent={({ value }) => {
          return (
            <Fragment>
              <div
                css={css`
                  position: absolute;
                  width: 2px;
                  background: black;
                  z-index: 10;
                  pointer-events: none;
                `}
                style={{
                  left: `calc(${value}% - 1px)`,
                  height: `calc(50% - 0px)`,
                }}
              ></div>
              <div
                css={css`
                  position: absolute;
                  bottom: 0;
                  width: 2px;
                  background: black;
                  z-index: 10;
                  pointer-events: none;
                `}
                style={{
                  left: `calc(${value}% - 1px)`,
                  height: `calc(50% - 0px)`,
                }}
              ></div>
            </Fragment>
          );
        }}
        beforeComponent={<img alt="Converse" src={images[0][0]} />}
        afterComponent={<img alt="Converse" src={images[0][1]} />}
      />
    </div>
  );
};

export const WithImagesParallax = () => {
  const [value, setValue] = useState(50);
  const beforeOffset = lerp(-10, 10, value / 100);

  return (
    <div
      css={css`
        width: 700px;
        border: 2px solid black;
        overflow: hidden;
      `}
    >
      <ComparisonSlider
        aspectRatio="4x3"
        value={value}
        onValueChange={setValue}
        handleComponent={CustomHandleComponent}
        handleDecorationComponent={({ value }) => {
          return (
            <Fragment>
              <div
                css={css`
                  position: absolute;
                  width: 2px;
                  background: black;
                  z-index: 10;
                  pointer-events: none;
                `}
                style={{
                  left: `calc(${value}% - 1px)`,
                  height: `calc(50% - 0px)`,
                }}
              ></div>
              <div
                css={css`
                  position: absolute;
                  bottom: 0;
                  width: 2px;
                  background: black;
                  z-index: 10;
                  pointer-events: none;
                `}
                style={{
                  left: `calc(${value}% - 1px)`,
                  height: `calc(50% - 0px)`,
                }}
              ></div>
            </Fragment>
          );
        }}
        beforeComponent={
          <div
            style={{
              backgroundImage: `url(${images[1][0]})`,
              backgroundSize: 'cover',
              backgroundPosition: `${beforeOffset}px 100%`,
            }}
          ></div>
        }
        afterComponent={
          <div
            style={{
              backgroundImage: `url(${images[1][1]})`,
              backgroundSize: 'cover',
              backgroundPosition: `${beforeOffset}px 100%`,
            }}
          ></div>
        }
      />
    </div>
  );
};

const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

function GooglyEye({ value }: { value: number }) {
  const offset = lerp(-60, 60, value / 100) * -1;

  return (
    <div
      css={css`
        background: white;
        height: 36px;
        width: 36px;
        border: 2px solid black;
        border-radius: 100%;
        position: relative;
      `}
    >
      <div
        css={css`
          position: absolute;
          bottom: 0px;
          left: 0;
          right: 0;
          margin: auto;
          background: black;
          width: 12px;
          height: 12px;
          border-radius: 100%;
          transform: rotate(${offset}deg);
          transform-origin: top center;
        `}
      ></div>
    </div>
  );
}

export const GooglyEyes = () => {
  return (
    <ComparisonSlider
      defaultValue={50}
      beforeComponent={<div css={{ background: 'tomato' }}></div>}
      afterComponent={<div css={{ background: 'cornflowerblue' }}></div>}
      aspectRatio={16 / 9}
      beforeDecorationComponent={({ value }) => (
        <div
          css={css`
            position: absolute;
            left: 8px;
            top: 8px;
            color: white;
          `}
        >
          <GooglyEye value={value} />
        </div>
      )}
      afterDecorationComponent={({ value }) => (
        <div
          css={css`
            position: absolute;
            right: 8px;
            top: 8px;
            color: white;
          `}
        >
          <GooglyEye value={value} />
        </div>
      )}
      handleComponent={CustomHandleComponent}
    />
  );
};

export const Vertical = () => {
  const [value, setValue] = useState(50);
  const [imageIndex, setImageIndex] = useState(0);

  const handleCycleImages = () => {
    setImageIndex((currIndex) => (currIndex + 1) % images.length);
  };

  return (
    <Fragment>
      <button onClick={handleCycleImages}>Cycle Images</button>
      {imageIndex}
      <div
        css={css`
          border: 2px solid black;
        `}
      >
        <ComparisonSlider
          value={value}
          onValueChange={setValue}
          orientation="vertical"
          beforeComponent={
            <img
              css={css`
                width: 100%;
                object-fit: cover;
              `}
              alt="Converse"
              src={images[imageIndex][0]}
            />
          }
          afterComponent={
            <img
              css={css`
                width: 100%;
                object-fit: cover;
              `}
              alt="Converse"
              src={images[imageIndex][1]}
            />
          }
          handleDecorationComponent={({ value }) => (
            <React.Fragment>
              <div
                style={{ bottom: `${value}%` }}
                css={css`
                  height: 2px;
                  background: black;
                  position: absolute;
                  left: 0;
                  right: 0;
                  z-index: 10;
                  width: 100%;
                `}
              ></div>
            </React.Fragment>
          )}
          handleComponent={ConverseHandle}
          aspectRatio={4 / 3}
        />
      </div>
    </Fragment>
  );
};
