import React, { Fragment, useState } from 'react';
import cc from 'classcat';

import { BiMoveHorizontal, BiStar } from 'react-icons/bi';
import { ComparisonSlider, ComparisonSliderHandleProps } from '../src';

export default {
  title: 'ComparisonSlider',
  component: ComparisonSlider,
};

const images = [
  [
    'https://m.media-amazon.com/images/I/71a8uPfldpL._AC_SR1400,1050_.jpg',
    'https://m.media-amazon.com/images/I/91h92SK1tEL._AC_SR1400,1050_.jpg',
  ],
];

export const DOMElements = () => {
  return (
    <div className="max-w-lg border border-black">
      <ComparisonSlider
        defaultValue={50}
        handleBefore={<div className="bg-white w-1 h-full"></div>}
        handleAfter={<div className="bg-white w-1 h-full"></div>}
        handle={({ isFocused }) => {
          return (
            <div
              className={cc([
                'rounded-full w-8 h-8 bg-white',
                { ring: isFocused },
              ])}
            ></div>
          );
        }}
        itemOne={
          <div className="bg-red-200 flex items-center justify-center text-2xl">
            <div className="absolute top-4 left-4">👍</div>
            Before
          </div>
        }
        itemTwo={
          <div className="bg-blue-200 flex items-center justify-center text-2xl">
            <div className="absolute top-4 right-4">👎</div>
            After
          </div>
        }
        aspectRatio={16 / 9}
      />
    </div>
  );
};

export const Images = () => {
  return (
    <div className="max-w-lg border border-black">
      <ComparisonSlider
        defaultValue={50}
        handleBefore={<div className="bg-white w-1 bottom-0 h-full"></div>}
        handleAfter={<div className="bg-white w-1 bottom-0 h-full"></div>}
        handle={({ isFocused }) => {
          return (
            <div
              className={cc([
                'rounded-full w-8 h-8 border-4 border-white bg-transparent',
                { ring: isFocused },
              ])}
            ></div>
          );
        }}
        itemOne={
          <img
            className="w-full object-cover"
            src="https://res.cloudinary.com/dspq4okwt/image/upload/c_scale,q_auto:eco,w_1000/v1626805349/photo-1548041347-390744c58da6_mvsu0f.jpg"
          />
        }
        itemTwo={
          <img
            className="w-full object-cover"
            src="https://res.cloudinary.com/dspq4okwt/image/upload/c_scale,e_grayscale,q_auto:eco,w_1000/v1626805349/photo-1548041347-390744c58da6_mvsu0f.jpg"
          />
        }
        aspectRatio={16 / 9}
      />
    </div>
  );
};

export const CustomAspectRatios = () => {
  const [ratio, setRatio] = useState(1 / 1);
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setRatio(1 / 1)}
          className="text-sm px-3 py-2 bg-gray-200 rounded font-medium"
        >
          1:1
        </button>
        <button
          onClick={() => setRatio(4 / 3)}
          className="text-sm px-3 py-2 bg-gray-200 rounded font-medium"
        >
          4:3
        </button>
        <button
          onClick={() => setRatio(16 / 9)}
          className="text-sm px-3 py-2 bg-gray-200 rounded font-medium"
        >
          16:9
        </button>
      </div>
      <div className="max-w-md">
        <ComparisonSlider
          aspectRatio={ratio}
          defaultValue={50}
          itemOne={
            <div className="bg-red-200 flex items-center justify-center text-2xl">
              Before
            </div>
          }
          itemTwo={
            <div className="bg-blue-200 flex items-center justify-center text-2xl">
              After
            </div>
          }
        />
      </div>
    </div>
  );
};

export const CustomHandle = () => {
  return (
    <div className="max-w-lg border border-black">
      <ComparisonSlider
        defaultValue={50}
        handleAfter={<div className="bg-black w-1 bottom-0 h-full"></div>}
        handleBefore={<div className="bg-black w-1 bottom-0 h-full"></div>}
        handle={({ isFocused }) => {
          return (
            <div
              className={cc([
                'rounded-full w-10 h-10 bg-black text-white flex items-center justify-center',
                { ring: isFocused },
              ])}
            >
              <BiStar size={24} />
            </div>
          );
        }}
        itemOne={
          <img className="w-full h-full object-cover" src={images[0][0]} />
        }
        itemTwo={
          <img className="w-full h-full object-cover" src={images[0][1]} />
        }
        aspectRatio={4 / 3}
      />
    </div>
  );
};

export const CustomHandleDecorations = () => {
  return (
    <div className="max-w-lg border border-black">
      <ComparisonSlider
        defaultValue={50}
        handleBefore={
          <div className="bg-gradient-to-t from-white to-transparent w-2 h-full"></div>
        }
        handleAfter={
          <div className="bg-gradient-to-b from-white to-transparent w-2 h-full"></div>
        }
        handle={({ isFocused }) => {
          return (
            <div
              className={cc([
                'rounded-full w-8 h-8 bg-white',
                { ring: isFocused },
              ])}
            ></div>
          );
        }}
        itemOne={
          <div className="bg-red-200 flex items-center justify-center text-2xl">
            <div className="absolute top-4 left-4">👍</div>
            Before
          </div>
        }
        itemTwo={
          <div className="bg-blue-200 flex items-center justify-center text-2xl">
            <div className="absolute top-4 right-4">👎</div>
            After
          </div>
        }
        aspectRatio={16 / 9}
      />
    </div>
  );
};

export const Vertical = () => {
  return (
    <div className="max-w-lg border border-black">
      <ComparisonSlider
        orientation="vertical"
        defaultValue={50}
        handleBefore={<div className="bg-black h-1 w-full bottom-0"></div>}
        handleAfter={<div className="bg-black h-1 w-full bottom-0"></div>}
        handle={({ isFocused }) => {
          return (
            <div
              className={cc([
                'rounded-full w-10 h-10 bg-black text-white flex items-center justify-center',
                { ring: isFocused },
              ])}
            >
              <BiStar size={24} />
            </div>
          );
        }}
        itemOne={
          <img className="w-full h-full object-cover" src={images[0][1]} />
        }
        itemTwo={
          <img className="w-full h-full object-cover" src={images[0][0]} />
        }
        aspectRatio={4 / 3}
      />
    </div>
  );
};

export const DoubleClickReset = () => {
  const [value, setValue] = useState(50);
  return (
    <div className="max-w-lg border border-black">
      <ComparisonSlider
        value={value}
        onValueChange={setValue}
        itemOne={
          <img className="w-full h-full object-cover" src={images[0][0]} />
        }
        itemTwo={
          <img className="w-full h-full object-cover" src={images[0][1]} />
        }
        handleAfter={<div className="bg-black w-1 bottom-0 h-full"></div>}
        handleBefore={<div className="bg-black w-1 bottom-0 h-full"></div>}
        aspectRatio={4 / 3}
        handle={(props) => {
          const { isFocused, ...rest } = props;
          return (
            <div
              onDoubleClick={() => {
                setValue(50);
              }}
              className="bg-black text-white h-10 w-10 rounded-full flex items-center justify-center"
              {...rest}
            >
              <BiMoveHorizontal size={24} />
            </div>
          );
        }}
      />
    </div>
  );
};

export const OnlyHandleDraggable = () => {
  const [value, setValue] = useState(50);
  return (
    <div className="max-w-lg border border-black">
      <ComparisonSlider
        value={value}
        onValueChange={setValue}
        itemOne={
          <img className="w-full h-full object-cover" src={images[0][0]} />
        }
        itemTwo={
          <img className="w-full h-full object-cover" src={images[0][1]} />
        }
        handleAfter={<div className="bg-black w-1 bottom-0 h-full"></div>}
        handleBefore={<div className="bg-black w-1 bottom-0 h-full"></div>}
        aspectRatio={4 / 3}
        onlyHandleDraggable
        handle={(props) => {
          return (
            <div
              className="bg-black text-white h-10 w-10 rounded-full flex items-center justify-center"
              {...props}
            >
              <BiMoveHorizontal size={24} />
            </div>
          );
        }}
      />
    </div>
  );
};
