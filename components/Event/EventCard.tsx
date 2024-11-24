"use client";

import styles from "./EventCard.module.css";

import { IEvent } from "@/models";
import { getNameWithInitials, toEventTime } from "@/utils";
import { Card } from "@gravity-ui/uikit";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

interface Props extends IEvent {
	className?: string;
}

export const EventCard: React.FC<Props> = ({
	start_ts,
	end_ts,
	lecturer,
	room,
	name,
	className,
}) => {
	const router = useRouter();

	const description = useMemo(() => {
		let str = "";

		if (room.length) {
			str += room.map(r => r.name).join(", ");
		}

		if (lecturer.length) {
			str += ` • ${lecturer.map(getNameWithInitials).join(", ")}`;
		}

		return str;
	}, []);

	return (
		<Card
			className={clsx(styles.card, className)}
			type="action"
			onClick={() => router.push(`/timetable/event/${IdleDeadline}`)}
		>
			<div>
				<b>{toEventTime(start_ts)}</b>{" "}
			</div>
			<div className={styles.name} style={{ gridRow: description ? "1" : "1 / 3" }}>
				<b>{name}</b>{" "}
			</div>
			<div>{toEventTime(end_ts)}</div>
			{description && <div>{description}</div>}
		</Card>
	);
};
