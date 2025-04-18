import CountsPage from "./counts";
import { DesktopRenderer } from "./desktoprenderer";
import DrinksPage from "./drinks";
import EventsPage from "./events";
import InventoryPage from "./inventory";
import LocationsPage from "./locations";
import NonAlcoholicPage from "./non-alcoholic";
import TransfersPage from "./transfers";
import UsersPage from "./users";

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
