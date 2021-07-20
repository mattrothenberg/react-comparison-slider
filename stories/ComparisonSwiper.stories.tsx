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
  [
    'https://nyc3.digitaloceanspaces.com/bia/2020/05/Cobble-Hill-Kitchen-Before-1024x683.jpg',
    'https://nyc3.digitaloceanspaces.com/bia/2020/05/baltic-st-kitchen-2-1024x683.jpg',
  ],
];

export const DOMElements = () => {
  return (
    <div className="max-w-lg border border-black">
      <ComparisonSlider
        defaultValue={50}
        handleBeforeComponent={<div className="bg-white w-1 h-full"></div>}
        handleAfterComponent={
          <div className="bg-white w-1 bottom-0 h-full"></div>
        }
        renderHandle={({ isFocused }) => {
          return (
            <div
              className={cc([
                'rounded-full w-8 h-8 bg-white',
                { ring: isFocused },
              ])}
            ></div>
          );
        }}
        beforeComponent={
          <div className="bg-red-200 flex items-center justify-center text-2xl">
            Before
          </div>
        }
        afterComponent={
          <div className="bg-blue-200 flex items-center justify-center text-2xl">
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
        handleAfterComponent={
          <div className="bg-white w-1 bottom-0 h-full"></div>
        }
        handleBeforeComponent={
          <div className="bg-white w-1 bottom-0 h-full"></div>
        }
        renderHandle={({ isFocused }) => {
          return (
            <div
              className={cc([
                'rounded-full w-8 h-8 border-4 border-white bg-transparent',
                { ring: isFocused },
              ])}
            ></div>
          );
        }}
        beforeComponent={
          <img
            className="w-full object-cover"
            src="https://res.cloudinary.com/dspq4okwt/image/upload/c_scale,q_auto:eco,w_1000/v1626805349/photo-1548041347-390744c58da6_mvsu0f.jpg"
          />
        }
        afterComponent={
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
  return (
    <div className="w-64">
      <ComparisonSlider
        defaultValue={50}
        beforeComponent={
          <div className="bg-red-200 flex items-center justify-center text-2xl">
            Before
          </div>
        }
        afterComponent={
          <div className="bg-blue-200 flex items-center justify-center text-2xl">
            After
          </div>
        }
        aspectRatio={1}
      />
    </div>
  );
};

export const CustomHandle = () => {
  return (
    <div className="max-w-lg border border-black">
      <ComparisonSlider
        defaultValue={50}
        handleAfterComponent={
          <div className="bg-black w-1 bottom-0 h-full"></div>
        }
        handleBeforeComponent={
          <div className="bg-black w-1 bottom-0 h-full"></div>
        }
        renderHandle={({ isFocused }) => {
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
        beforeComponent={
          <img className="w-full h-full object-cover" src={images[0][0]} />
        }
        afterComponent={
          <img className="w-full h-full object-cover" src={images[0][1]} />
        }
        aspectRatio={4 / 3}
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
        handleAfterComponent={
          <div className="bg-black h-1 w-full bottom-0"></div>
        }
        handleBeforeComponent={
          <div className="bg-black h-1 w-full bottom-0"></div>
        }
        renderHandle={({ isFocused }) => {
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
        beforeComponent={
          <img className="w-full h-full object-cover" src={images[0][0]} />
        }
        afterComponent={
          <img className="w-full h-full object-cover" src={images[0][1]} />
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
        beforeComponent={
          <img className="w-full h-full object-cover" src={images[0][0]} />
        }
        afterComponent={
          <img className="w-full h-full object-cover" src={images[0][1]} />
        }
        handleAfterComponent={
          <div className="bg-black w-1 bottom-0 h-full"></div>
        }
        handleBeforeComponent={
          <div className="bg-black w-1 bottom-0 h-full"></div>
        }
        aspectRatio={4 / 3}
        renderHandle={(props) => {
          return (
            <div
              onDoubleClick={() => {
                setValue(50);
              }}
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

export const OnlyHandleDraggable = () => {
  const [value, setValue] = useState(50);
  return (
    <div className="max-w-lg border border-black">
      <ComparisonSlider
        value={value}
        onValueChange={setValue}
        beforeComponent={
          <img className="w-full h-full object-cover" src={images[0][0]} />
        }
        afterComponent={
          <img className="w-full h-full object-cover" src={images[0][1]} />
        }
        handleAfterComponent={
          <div className="bg-black w-1 bottom-0 h-full"></div>
        }
        handleBeforeComponent={
          <div className="bg-black w-1 bottom-0 h-full"></div>
        }
        aspectRatio={4 / 3}
        onlyHandleDraggable
        renderHandle={(props) => {
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
