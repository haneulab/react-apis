import { type NextRouter } from "next/router";

export type UseRoute = (onRouteChange?: () => void) => NextRouter & {
  pathname: {
    current: string;
    previous: null | string;
  };
  isRoute: (_route: string) => {
    current: boolean;
    previous: boolean;
  };
};
