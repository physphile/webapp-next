import { PropsWithChildren } from "react";
import "./globals.css";
import "@gravity-ui/uikit/styles/fonts.css";
import "@gravity-ui/uikit/styles/styles.css";
import { GravityProvider } from "@/components/GravityProvider";
import styles from "./layout.module.css";
import { QueryProvider } from "@/components/QueryProvider";
import "swiper/css";

const RootLayout: React.FC<PropsWithChildren> = async ({ children }) => {
	return (
		<html lang="ru">
			<body>
				<GravityProvider>
					<QueryProvider>
						<div className={styles.container}>{children}</div>
					</QueryProvider>
				</GravityProvider>
			</body>
		</html>
	);
};

export default RootLayout;
