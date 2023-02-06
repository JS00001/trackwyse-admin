/*
 * Created on Wed Feb 01 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */
import * as RadixIcons from "react-icons/rx";

interface Config {
  BUILD_ENV: string;
  TERMS_URL: string;
  PRIVACY_URL: string;
  SIDEBAR_ITEMS: {
    title: string;
    link: string;
    icon: keyof typeof RadixIcons;
  }[];
}

const Config: Config = {
  BUILD_ENV: process.env.BUILD_ENV || "development",
  TERMS_URL: process.env.TERMS_URL || "https://trackwyse.com/terms",
  PRIVACY_URL: process.env.PRIVACY_URL || "https://trackwyse.com/privacy",

  // Customizable Items
  SIDEBAR_ITEMS: [
    {
      title: "Dashboard",
      icon: "RxDashboard",
      link: "/dashboard",
    },
    {
      title: "Generate Labels",
      icon: "RxInput",
      link: "/dashboard/generate-labels",
    },
    {
      title: "Manage Premium",
      icon: "RxRocket",
      link: "/dashboard/premium",
    },
    {
      title: "Users",
      icon: "RxAvatar",
      link: "/dashboard/users",
    },
  ],
};

export default Config;
