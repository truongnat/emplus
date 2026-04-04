/**
 * Home Feature
 * Dashboard and main landing screen
 */

// Components
export { HomeHeader } from "./components/HomeHeader";
export { HomeChromeNotificationButton } from "./components/HomeChromeNotificationButton";
export { HeroCard } from "./components/HeroCard";
export { QuickActions } from "./components/QuickActions";
export { FocusCard } from "./components/FocusCard";
export { UpcomingEvents } from "./components/UpcomingEvents";
export {
  HomeClock,
  NumberTicker,
  ClockTicker,
  useAlignedClockNow,
  type ClockTickerTone,
} from "./components/HomeClock";
export { PulseStar, RingingBell } from "./components/HomeDecorations";

// Styles (screen shell)
export { homeScreenStyles } from "./homeScreen.styles";

// Hooks
export { useHomeData } from "./hooks/useHomeData";

// Screen
// export { HomeScreen } from './screens/HomeScreen';
