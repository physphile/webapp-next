import { redirect } from "next/navigation";

const Home: React.FC = async () => {
	redirect("/timetable");
};

export default Home;
