"use client";

import { IEvent } from "@/models";
import { SwiperSlide, Swiper } from "swiper/react";
import styles from "./TimetableSlider.module.css";
import { EventCard } from "../Event/EventCard";
import { History } from "@gravity-ui/illustrations";
import { getDateOrigin, getWeekParity, toIsoDate } from "@/utils";
import { useCallback, useState } from "react";
import { Keyboard } from "swiper/modules";

interface Props {
	schedule: IEvent[][];
	initialDate: string;
}

export const TimetableSlider: React.FC<Props> = ({ schedule, initialDate }) => {
	const [date, setDate] = useState(new Date(initialDate));

	const turn = useCallback(
		(delta: number) => {
			const dateElement = document.querySelector("#date");
			const parityElement = document.querySelector("#parity");
			if (!dateElement || !parityElement) {
				return;
			}

			const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + delta);

			const origin = getDateOrigin(8, 1);
			const parity = getWeekParity(origin, newDate);

			dateElement.textContent = newDate.toLocaleDateString("ru-RU", {
				dateStyle: "full",
			});

			parityElement.textContent = `${parity === "even" ? "Чётная" : "Нечётная"} неделя`;

			window.history.replaceState(null, "", toIsoDate(newDate));

			setDate(newDate);
		},
		[date]
	);

	return (
		<Swiper
			loop
			spaceBetween={32}
			className={styles.swiper}
			onSlideNextTransitionEnd={() => turn(1)}
			onSlidePrevTransitionEnd={() => turn(-1)}
			keyboard
			modules={[Keyboard]}
		>
			{schedule.map((daySchedule, index) => (
				<SwiperSlide className={styles.events} key={index}>
					{daySchedule.length ? (
						daySchedule.map(event => (
							<EventCard {...event} key={event.id} className={styles.event} />
						))
					) : (
						<History className={styles.illustration} />
					)}
				</SwiperSlide>
			))}
		</Swiper>
	);
};
