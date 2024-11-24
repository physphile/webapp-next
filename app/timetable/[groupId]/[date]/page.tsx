import { IEvent, IGroup } from "@/models";
import { getDateOrigin, getWeekParity, toIsoDate } from "@/utils";
import { Text } from "@gravity-ui/uikit";
import styles from "./page.module.css";
import { redirect } from "next/navigation";
import { TimetableSlider } from "@/components/TimetableSlider/TimetableSlider";

interface Props {
	params: Promise<{
		groupId: string;
		date: string;
	}>;
}

const DayTimetable: React.FC<Props> = async ({ params }) => {
	const { groupId, date } = await params;

	if (!date) {
		redirect(`/timetable/${groupId}`);
	}

	const group: IGroup = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/timetable/group/${groupId}/`
	).then(response => response.json());

	const currentDate = new Date(date);

	const origin = getDateOrigin(8, 1);

	const parity = getWeekParity(origin, currentDate);

	const twoWeeksAhead = new Date(
		Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 14)
	);

	const events: { items: IEvent[] } = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/timetable/event/?start=${toIsoDate(
			currentDate
		)}&end=${toIsoDate(twoWeeksAhead)}&group_id=${groupId}`
	).then(response => response.json());

	const groupedEvents = events.items.reduce((acc, event, index, arr) => {
		const date = toIsoDate(
			new Date(
				Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + index)
			)
		);
		const events = arr.filter(({ start_ts }) => start_ts.includes(date));
		return [...acc, events];
	}, [] as IEvent[][]);

	return (
		<>
			<Text variant="header-1" className={styles.group}>
				Группа №{group.number}
			</Text>
			<Text variant="subheader-2" className={styles.date}>
				{new Date(currentDate).toLocaleDateString("ru-RU", { dateStyle: "full" })}
			</Text>
			<Text variant="subheader-1" className={styles.parity} color="secondary">
				{parity === "even" ? "Чётная" : "Нечётная"} неделя
			</Text>
			<TimetableSlider schedule={groupedEvents} />
		</>
	);
};

export default DayTimetable;
