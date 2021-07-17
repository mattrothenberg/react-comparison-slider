/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx, css } from '@emotion/react';
import { Fragment } from 'react';
import { ComparisonSwiper } from '../src';
import { useState } from '@storybook/addons';
import { BiMoveHorizontal, BiStar } from 'react-icons/bi';

export default {
  title: 'ComparisonSwiper',
  component: ComparisonSwiper,
};

export const Default = () => {
  return (
    <ComparisonSwiper
      defaultValue={50}
      beforeElement={<div css={{ background: 'tomato' }}></div>}
      afterElement={<div css={{ background: 'cornflowerblue' }}></div>}
      aspectRatio={16 / 9}
    />
  );
};

export const UncontrolledInitialValue = () => {
  return (
    <ComparisonSwiper
      defaultValue={75}
      beforeElement={<div css={{ background: 'tomato' }}></div>}
      afterElement={<div css={{ background: 'cornflowerblue' }}></div>}
      aspectRatio={16 / 9}
    />
  );
};

export const FullyControlled = () => {
  const [value, setValue] = useState(50);
  return (
    <ComparisonSwiper
      value={value}
      onValueChange={setValue}
      beforeElement={<div css={{ background: 'tomato' }}></div>}
      afterElement={<div css={{ background: 'cornflowerblue' }}></div>}
      aspectRatio={16 / 9}
      handleStyle={{
        background: 'white',
      }}
    />
  );
};

export const CustomHandle = () => {
  return (
    <ComparisonSwiper
      defaultValue={50}
      beforeElement={<div css={{ background: 'tomato' }}></div>}
      afterElement={<div css={{ background: 'cornflowerblue' }}></div>}
      aspectRatio={16 / 9}
      handleComponent={(props) => {
        return (
          <div
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
            ref={props.forwardedRef}
            {...props}
          >
            <BiMoveHorizontal size={24} />
          </div>
        );
      }}
    />
  );
};

export const CustomHandleDecorations = () => {
  return (
    <ComparisonSwiper
      defaultValue={50}
      beforeElement={<div css={{ background: 'tomato' }}></div>}
      afterElement={<div css={{ background: 'cornflowerblue' }}></div>}
      aspectRatio={16 / 9}
      handleDecorationComponent={({ value }) => {
        return (
          <Fragment>
            <div
              css={css`
                position: absolute;
                width: 2px;
                background: white;
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
                background: white;
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
    <ComparisonSwiper
      defaultValue={50}
      beforeElement={<div css={{ background: 'tomato' }}></div>}
      afterElement={<div css={{ background: 'cornflowerblue' }}></div>}
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
      <ComparisonSwiper
        aspectRatio="4x3"
        defaultValue={50}
        handleComponent={(props) => {
          return (
            <div
              css={css`
                background: black;
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
              ref={props.forwardedRef}
              {...props}
            >
              <BiStar color="white" size={24} />
            </div>
          );
        }}
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
        beforeElement={
          <img
            alt="Converse"
            src="https://m.media-amazon.com/images/I/71a8uPfldpL._AC_SR1400,1050_.jpg"
          />
        }
        afterElement={
          <img
            alt="Converse"
            src="https://m.media-amazon.com/images/I/91h92SK1tEL._AC_SR1400,1050_.jpg"
          />
        }
      />
    </div>
  );
};
