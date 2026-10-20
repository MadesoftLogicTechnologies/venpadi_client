import { HTTP_METHODS } from "~/utils/constants";

const useHttpRequest = async (url, method = HTTP_METHODS.GET, body) => {
  const config = useRuntimeConfig();
  const accessToken = useCookie("accessToken");
  return useFetch(url, {
    baseURL: config.public.API_URL,
    method: method,
    body: body,
    headers: {
      Accept: "application/json, text/plain, */*",
    },
    async onRequest({ request, options }) {
      if (accessToken.value) {
        options.headers["Authorization"] = `Bearer ${accessToken.value}`;
      }
    },
  });
};

export default useHttpRequest;
