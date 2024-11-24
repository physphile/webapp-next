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

	const groupedEvents = Array.from({ length: 14 }, (_, index) => {
		const date = toIsoDate(
			new Date(
				Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + index)
			)
		);
		return events.items.filter(({ start_ts }) => start_ts.includes(date));
	});

	const formattedDate = new Date(currentDate).toLocaleDateString("ru-RU", { dateStyle: "full" });

	return (
		<>
			<Text variant="header-1" className={styles.group}>
				Группа №{group.number}
			</Text>
			<Text variant="subheader-2" className={styles.date} id="date">
				{formattedDate}
			</Text>
			<Text variant="subheader-1" className={styles.parity} color="secondary" id="parity">
				{parity === "even" ? "Чётная" : "Нечётная"} неделя
			</Text>
			<TimetableSlider schedule={groupedEvents} initialDate={toIsoDate(currentDate)} />
		</>
	);
};

export default DayTimetable;
