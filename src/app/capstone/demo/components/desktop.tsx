import CountsPage from "./desktop/counts";
import DrinksPage from "./desktop/drinks";
import EventsPage from "./desktop/events";
import InventoryPage from "./desktop/inventory";
import LocationsPage from "./desktop/locations";
import NonAlcoholicPage from "./desktop/non-alcoholic";
import { DesktopRenderer } from "./desktop/renderer/renderer";
import TransfersPage from "./desktop/transfers";
import UsersPage from "./desktop/users";

export default function Desktop() {
  return (
    <div className={"w-dvw h-dvh bg-accent text-text flex flex-row"}>
      <DesktopRenderer
        toRender={{
          Events: <EventsPage key="Events" />,
          Users: <UsersPage key="Users" />,
          Counts: <CountsPage key={"Counts"} />,
          Transfers: <TransfersPage key={"Transfers"} />,
          Locations: <LocationsPage key={"Locations"} />,
          Inventory: <InventoryPage key={"Inventory"} />,
          "Non-Alcoholic": <NonAlcoholicPage key={"Non-Alcoholic"} />,
          Drinks: <DrinksPage key={"Drinks"} />,
        }}
      />
    </div>
  );
}
