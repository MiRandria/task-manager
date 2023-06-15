import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


const calculateTimeDifference = (serverTime: Date, clientTime: Date) => {
  const timeDiff = Math.abs(serverTime.getTime() - clientTime.getTime());

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
};


export async function getServerSideProps() {
  const serverTime = new Date(); // Replace this with your server time retrieval logic

  return {
    props: {
      serverTime: serverTime.toString(),
    },
  };
}

export default function Home({ serverTime }: { serverTime: string }) {
  const router = useRouter();
  const [clientTime, setClientTime] = useState(new Date());
  const [timeDifference, setTimeDifference] = useState("");

  const moveToTaskManager = () => {
    router.push("/tasks");
  }
  useEffect(() => {
    const timer = setInterval(() => {
      setClientTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const diff = calculateTimeDifference(new Date(serverTime), clientTime);
    setTimeDifference(diff);
  }, [serverTime, clientTime]);
  
  return (
    <>
      <Head>
        <title>Web 2 - Exam TD</title>
        <meta name="description" content="Just an exam" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>The easiest exam you will ever find</h1>
        <div>
          {/* Display here the server time (DD-MM-AAAA HH:mm)*/}
          <p>
            Server time:<span className="serverTime">{serverTime}</span>
          </p>

          {/* Display here the time difference between the server side and the client side */}
          <p>
            Time diff: <span className="serverTime">{timeDifference}</span>
          </p>
        </div>

        <div>
          <button onClick={moveToTaskManager}>Go to task manager</button>
        </div>
      </main>
    </>
  );
}
