# react-comparison-slider

[![npm version](https://badge.fury.io/js/react-comparison-slider.svg)](https://badge.fury.io/js/react-comparison-slider)

https://react-comparison-slider.vercel.app/

React Comparison Slider is a fully customizable component for building bespoke, keyboard-accessible "before & after" sliders for the web. You bring the content and the visuals, and it'll handle the heavy lifting.

![ezgif-3-0cbdbb348e5a](https://user-images.githubusercontent.com/5148596/126052111-635805d1-6583-45f2-a9c1-76a154eb39a0.gif)

![ezgif-3-d3d224f0ae64](https://user-images.githubusercontent.com/5148596/126052875-9dd65770-b544-4618-af97-9a8c17fedde9.gif)

## Installation

```
yarn add react-comparison-slider
```

## The "Hello World" example

The key ingredients to this component are:

1. `aspectRatio`, expressed either numerically as a fraction (e.g., `16/9`), or as a string (e.g., `"16x9"` or `"16:9"`). Providing an aspect ratio ensures that the before and after "images" (or HTML elements, whatever you decide to provide) line up with one another.
2. `beforeComponent` of type `React.ReactNode` (read: virtually any valid JSX element)
3. `afterComponent` of type `React.ReactNode` (read: virtually any valid JSX element)
4. `defaultValue`, if you'd like to use the component in an uncontrolled fashion
5. `orientation`, where you can pass either `vertical` or `horizontal`. Horizontal sliders are the default.

```tsx
import { ComparisonSlider } from 'react-comparison-slider';

export const HelloWorldExample = () => {
  return (
    <ComparisonSlider
      defaultValue={50}
      beforeComponent={<div css={{ background: 'tomato' }}></div>}
      afterComponent={<div css={{ background: 'cornflowerblue' }}></div>}
      aspectRatio={16 / 9}
      orientation="horizontal"
    />
  );
};
```

## Customization

React Comparison Slider does ship with some **very** lightweight styling, but encourages you to bring your own styling (BYOS)™️. Customization is handled via a set of render props that expose all of the underlying components for your needs. There is a total of 4 of these visual elements

```ts
// For adding a vertical "bar" or "scrubber" behind the handle
handleDecorationComponent?: React.FC<DecorationRenderProps>;

// For adding a visual indicator or label on the "before" slide (e.g., the "Before" badge in the GIF above)
beforeDecorationComponent?: React.FC<DecorationRenderProps>;

// For adding a visual indicator or label on the "after" slide (e.g., the "After" badge in the GIF above)
afterDecorationComponent?: React.FC<DecorationRenderProps>;

// For customizing the slider handle itself
handleComponent?: React.FC<CustomSliderHandleProps>;
```

### `handleDecorationComponent`

This is a fairly generic render prop, but since it passes through the current `value` of the slider, it allows you to add visual indicators such as a scrubbing bar to the slider itself. In the example below, we add a thin white bar above and below the handle as shown in the screenshot below.

```tsx
import { ComparisonSlider } from 'react-comparison-slider';

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
```

<img width="543" alt="Screen Shot 2021-07-17 at 9 10 08 PM" src="https://user-images.githubusercontent.com/5148596/126052824-e6cc2745-d14e-4879-b223-90578317e85c.png">

### `beforeDecorationComponent` and `afterDecorationComponent`

Let's say you want to add an indicator to both the "before" and "after" elements themselves. A label makes sense, right? 👇 You can access the current `value` of the slider, should you need that in your visual design.

```tsx
import { ComparisonSlider } from 'react-comparison-slider';

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
```

<img width="405" alt="Screen Shot 2021-07-17 at 8 41 41 PM" src="https://user-images.githubusercontent.com/5148596/126052338-8908c8d0-6c2b-4eb0-af2a-cd099d69ae43.png">

### `handleComponent`

Of course, you can fully style the handle itself. You can make it bigger, add an icon, add fancy shadows... You name it! One caveat that you **must** heed is that you must wrap your component in `React.forwardRef<HTMLDivElement, ComparisonSliderHandleProps>()`. Under the hood, this `ref` is used to ensure that the handle component lines up in the dead center of the viewport. There's likely a better way to do this, and I welcome a PR to this end 😜

```tsx
import { ComparisonSlider } from 'react-comparison-slider';

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
```

<img width="409" alt="Screen Shot 2021-07-17 at 8 45 08 PM" src="https://user-images.githubusercontent.com/5148596/126052376-c48c9800-7297-4124-b6ad-f269ba2353a9.png">

## The API

Below is a high-level interface definition for the component. Note that because this component can be used in both a controlled and uncontrolled fashion, the first three props – `value`, `defaultValue`, and `onChange` are actually totally dynamic. That is to say, if you provide a `defaultValue` you won't be asked for `value` or `onChange`. In fact, you'll get a compilation error if you try to use them. Conversely, if you provide `value` and `onChange`, you won't be asked for `defaultValue` and will error out accordingly if you provide it.

```ts
// SPECIAL
value?: number;
onValueChange?: (value: number) => void;
defaultValue?: number;
// /SPECIAL

beforeComponent: React.ReactNode;
afterComponent: React.ReactNode;
aspectRatio: number | string;
handleDecorationComponent?: React.FC<DecorationRenderProps>;
beforeDecorationComponent?: React.FC<DecorationRenderProps>;
afterDecorationComponent?: React.FC<DecorationRenderProps>;
handleComponent?: React.FC<CustomSliderHandleProps>;
orientation?: 'vertical' | 'horizontal';
```
