"use client";

import { useMemo } from "react";

import styles from "./Groups.module.css";
import { IGroup } from "@/models";
import { TextInput } from "@gravity-ui/uikit";
import { useForm } from "react-hook-form";
import { Group } from "../Group/Group";

const sortByNumber = (group1: IGroup, group2: IGroup) =>
	Number.parseInt(group1.number) - Number.parseInt(group2.number);

const numberRegex = /^\d+$/;

interface Props {
	groups: IGroup[];
}

export const Groups: React.FC<Props> = ({ groups }) => {
	const sortedGroups = useMemo(
		() => [
			...groups.filter(({ number }) => numberRegex.test(number)).sort(sortByNumber),
			...groups.filter(({ number }) => !numberRegex.test(number)).sort(sortByNumber),
		],
		[groups]
	);

	const { register, watch } = useForm<{ query: string }>({
		defaultValues: {
			query: "",
		},
	});

	const query = watch("query");

	const filteredGroups = useMemo(
		() => sortedGroups.filter(group => group.number.startsWith(query)),
		[sortedGroups, query]
	);

	return (
		<>
			<TextInput
				{...register("query")}
				label="Введите номер группы"
				autoComplete="off"
				className={styles.query}
				size="xl"
			/>
			<div className={styles.grid}>
				{filteredGroups.map(group => (
					<Group {...group} key={group.id} />
				))}
			</div>
		</>
	);
};
