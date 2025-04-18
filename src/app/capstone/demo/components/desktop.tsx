import DrinksPage from "./desktop/drinks";
import EventsPage from "./desktop/events";
import LocationsPage from "./desktop/locations";
import { DesktopRenderer } from "./desktop/renderer/renderer";
import UsersPage from "./desktop/users";

export default function Desktop() {
  return (
    <div className={"w-full h-full bg-accent text-text flex flex-col"}>
      <DesktopRenderer
        toRender={{
          Events: <EventsPage key="Events" />,
          Users: <UsersPage key="Users" />,
          Locations: <LocationsPage key={"Locations"} />,
          Drinks: <DrinksPage key={"Drinks"} />,
        }}
      />
    </div>
  );
}
