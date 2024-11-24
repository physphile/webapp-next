import { Groups } from "@/components/Groups/Groups";
import { IGroup } from "@/models";

const Timetable: React.FC = async () => {
	const groups: { items: IGroup[] } = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/timetable/group/?limit=1000`
	).then(response => response.json());

	return (
		<>
			<Groups groups={groups.items} />
		</>
	);
};

export default Timetable;
