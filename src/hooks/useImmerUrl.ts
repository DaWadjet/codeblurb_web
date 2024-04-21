import qs from "qs";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useImmer } from "use-immer";

//persist immer state into the url
export const useImmerUrl = <T extends object>(initialState: T) => {
  const { search } = useLocation();

  const parsedSearch = qs.parse(search, {
    ignoreQueryPrefix: true,
  }) as Partial<T>;

  const [state, setState] = useImmer<T>({ ...initialState, ...parsedSearch });

  const params = qs.stringify(state);

  console.log(params, search);

  useEffect(() => {
    const newUrl = window.location.pathname + "?" + params;

    window.history.replaceState(window.history.state, "", newUrl);
  }, [params]);

  return [state, setState] as const;
};
