/*
 * Created on Wed Feb 01 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import { Poppins } from "@next/font/google";

const PoppinsFont = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const FontProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <main className={PoppinsFont.className}>{children}</main>;
};

export default FontProvider;
