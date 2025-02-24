import { usePathname, useRouter, useSearchParams } from "next/navigation";

/**
 * A custom hook for managing URL state without causing a full page reload
 *
 * @returns Object with functions to update and manage URL state
 */
export const useUrlState = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  /**
   * Updates a query parameter in the URL without causing a page reload
   *
   * @param key - The query parameter key
   * @param value - The query parameter value
   */
  const setQueryParam = (key: string, value: string) => {
    // Use history.pushState for a non-reloading URL update
    history.pushState(null, "", `${pathname}?${key}=${value}`);
  };

  /**
   * Updates multiple query parameters in the URL without causing a page reload
   *
   * @param params - Object containing key-value pairs to set in the URL
   */
  const setQueryParams = (params: Record<string, string>) => {
    const urlParams = new URLSearchParams(searchParams);

    Object.entries(params).forEach(([key, value]) => {
      urlParams.set(key, value);
    });

    history.pushState(null, "", `${pathname}?${urlParams.toString()}`);
  };

  /**
   * Updates a query parameter in the URL using Next.js router (causes rerender)
   *
   * @param key - The query parameter key
   * @param value - The query parameter value
   */
  const updateQueryParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    replace(`${pathname}?${params.toString()}`);
  };

  /**
   * Updates multiple query parameters in the URL using Next.js router
   *
   * @param params - Object containing key-value pairs to set in the URL
   */
  const updateQueryParams = (params: Record<string, string>) => {
    const urlParams = new URLSearchParams(searchParams);

    Object.entries(params).forEach(([key, value]) => {
      urlParams.set(key, value);
    });

    replace(`${pathname}?${urlParams.toString()}`);
  };

  /**
   * Removes a query parameter from the URL using Next.js router
   *
   * @param key - The query parameter key to remove
   */
  const removeQueryParam = (key: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete(key);
    replace(`${pathname}?${params.toString()}`);
  };

  /**
   * Gets the current value of a query parameter
   *
   * @param key - The query parameter key
   * @returns The value of the query parameter or null if not present
   */
  const getQueryParam = (key: string): string | null => {
    return searchParams.get(key);
  };

  /**
   * Gets all query parameters as an object
   *
   * @returns Object containing all query parameters
   */
  const getAllQueryParams = (): Record<string, string> => {
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  };

  return {
    setQueryParam,
    setQueryParams,
    updateQueryParam,
    updateQueryParams,
    removeQueryParam,
    getQueryParam,
    getAllQueryParams,
    pathname,
    searchParams,
  };
};
