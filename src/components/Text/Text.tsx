/*
 * Created on Wed Feb 01 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */
const textVariantClasses = {
  h1: "",
  h2: "",
  h3: "",
  h4: "",
  h5: "",
  h6: "",
  subtitle1: "",
  subtitle2: "",
};

interface TextProps {
  variant?: keyof typeof textVariantClasses;
}

const Text: React.FC<TextProps> = () => {
  return <></>;
};

export default Text;
