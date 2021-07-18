const aspectRatioRegex = new RegExp(/(\d+)(:|x)(\d+)/);

export function calculateAspectRatio(ratio: number | string) {
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
