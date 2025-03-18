import EventList from "@/components/EventList";

export default function Home() {
  return (
    <div>
      <h1>Calendar</h1>
      <div>
        <EventList />
      </div>
    </div>
  );
}



// import Auth from "@/components/Auth";
// // import Calendar from "@/components/Calendar";
// // import AddEvent from "@/components/AddEvent";
// import EventList from "@/components/EventList";

// export default function Home() {
//   // const [token, setToken] = useState<string | null>(null)

//   return (
//     <div>
//       <h1>Calendar</h1>
//       {/* <AddEvent /> */}
//       <EventList />
//       {/* {!token ? <Auth setToken={setToken} /> : <Calendar token={token} />} */}
//     </div>
//   );
// }

