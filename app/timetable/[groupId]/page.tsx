"use client";

import { toIsoDate } from "@/utils";
import { redirect, useParams } from "next/navigation";

const GroupTimetable: React.FC = () => {
	const { groupId } = useParams();

	redirect(`/timetable/${groupId}/${toIsoDate(new Date())}`);
};

export default GroupTimetable;
