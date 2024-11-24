"use client";

import { IEvent } from "@/models";
import { SwiperSlide, Swiper } from "swiper/react";
import styles from "./TimetableSlider.module.css";
import { EventCard } from "../Event/EventCard";
import { History } from "@gravity-ui/illustrations";

interface Props {
	schedule: IEvent[][];
}

export const TimetableSlider: React.FC<Props> = ({ schedule }) => {
	return (
		<Swiper loop spaceBetween={32} className={styles.swiper}>
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
