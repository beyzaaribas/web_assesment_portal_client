"use client"
import MainContentTitle from "@/components/global/mainContent/MainContentTitle";
import Statistics from "@/components/statistics/Statistics";
import StatisticsAdmin from "@/components/statistics/StatisticsAdmin";
import { useUserContext } from "@/contexts/UserContext";

export default function Home() {

  const { user, setUser } = useUserContext();




  return (
    <main>
    <MainContentTitle title={"Home"}/>

    {user && user.userType == 1 ? <StatisticsAdmin/> : <Statistics/> }
    
    </main>
  );
}
