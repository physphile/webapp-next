"use client";

import { ThemeProvider } from "@gravity-ui/uikit";
import { PropsWithChildren } from "react";

export const GravityProvider: React.FC<PropsWithChildren> = ({ children }) => {
	return <ThemeProvider theme="dark">{children}</ThemeProvider>;
};
