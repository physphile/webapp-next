"use client";

import { useRouter } from "next/navigation";
import styles from "./Group.module.css";

import { Card, Text } from "@gravity-ui/uikit";
import { IGroup } from "@/models";

export const Group: React.FC<IGroup> = ({ id, name, number }) => {
	const router = useRouter();

	return (
		<Card className={styles.card} type="action" onClick={() => router.push(`/timetable/${id}`)}>
			<Text variant="subheader-1">№{number}</Text>
			<br />
			<Text variant="caption-2">{name}</Text>
		</Card>
	);
};
