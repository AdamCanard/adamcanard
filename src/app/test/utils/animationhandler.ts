export const animationHandler = (
  initStyle: string,
  trueStyle: string,
  falseStyle: string,
  booleanState: boolean | undefined,
) => {
  if (booleanState === undefined) return initStyle;
  if (booleanState) {
    return trueStyle;
  } else {
    return falseStyle;
  }
};
