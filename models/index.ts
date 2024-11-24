export interface IGroup {
	id: number;
	name: string;
	number: string;
}

export interface IRoom {
	id: number;
	name: string;
	building: string;
	building_url: string;
	direction: string;
}

export interface ILecturer {
	id: number;
	first_name: string;
	middle_name: string;
	last_name: string;
	avatar_id: number;
	avatar_link: string;
	description: string;
}

export interface IEvent {
	id: number;
	name: string;
	room: IRoom[];
	group: IGroup[];
	lecturer: ILecturer[];
	start_ts: string;
	end_ts: string;
}
