import { NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { type UseRoute } from "./useRoute.types";

const useRoute: UseRoute = (onRouteChange) => {
  const router = useRouter();
  const [current, setCurrent] = useState<string>(router.pathname);
  const [previous, setPrevious] = useState<null | string>(null);
  const [pathname, setPathname] = useState<{
    current: string;
    previous: null | string;
  }>({
    current: router.pathname,
    previous: null,
  });

  useEffect(() => {
    setPrevious(current);
    setCurrent(router.pathname);
  }, [router]);

  useEffect(() => {
    setPathname({
      current,
      previous,
    });
  }, [current, previous]);

  useEffect(() => {
    if (onRouteChange && typeof onRouteChange === "function") {
      onRouteChange();
    }
  }, [pathname]);

  return {
    ...router,
    pathname,
  } as NextRouter & {
    pathname: {
      current: string;
      previous: string | null;
    };
  };
};

export default useRoute;
