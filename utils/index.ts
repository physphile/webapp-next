import { ILecturer } from "@/models";

export const getDaysBetween = (a: Date, b: Date) => {
	const MS_PER_DAY = 1000 * 60 * 60 * 24;
	const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
	const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

	return Math.round((utc2 - utc1) / MS_PER_DAY);
};

export const getWeekParity = (origin: Date, date: Date) => {
	const indexFromMonday = (origin.getDay() - 1 + 7) % 7;
	const delta = getDaysBetween(origin, date);
	const value = delta - (7 - indexFromMonday) + 14;

	return Math.trunc(value / 7) % 2 === 0 ? "odd" : "even";
};

export const lz = (n: number) => `0${n}`.slice(-2);

export const toIsoDate = (date: Date) => {
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();

	return `${year}-${lz(month)}-${lz(day)}`;
};

export const toEventTime = (date: string) =>
	new Date(date).toLocaleDateString("ru-RU", { hour: "numeric", minute: "2-digit" }).slice(12);

export const getNameWithInitials = (lecturer: ILecturer) =>
	`${lecturer.last_name} ${lecturer.first_name?.[0] ?? "x"}. ${lecturer.middle_name?.[0] ?? "x"}.`;

export const getFirstWeekdayFromOrigin = (origin: Date, weekday: number) =>
	new Date(
		origin.getFullYear(),
		origin.getMonth(),
		origin.getDate() + ((weekday - origin.getDay() + 7) % 7)
	);

export const getDateOrigin = (monthIndex: number, day: number) => {
	const now = new Date();
	const year = now.getFullYear();

	const originThisYear = new Date(year, monthIndex, day);

	return now > originThisYear ? originThisYear : new Date(year - 1, monthIndex, day);
};
