import ReactGA from "react-ga";
export const eventTracking = (args: ReactGA.EventArgs) => {
  ReactGA.event(args);
}
