// TODO: Remove or rework cachedAPI calls. The mobile app should probably be caching data in a
//  database for proper persistence, not caching in TypeScript variables
import { apiFetch, APILoadError, Endpoint, TAPILoadError } from "../endpoints";
import { IUser } from "../users";
import { cachedAPIGet, cachedAPIHook, IAPICacheData } from "./cachedAPI";

const cache: IAPICacheData<IUser, undefined, TAPILoadError> = {
    doFetch: () => apiFetch(Endpoint.USER_CURRENT),
    transformData: (user: IUser) => user,
    promise: undefined,
    value: undefined,
    loadingValue: undefined,
    errorValue: APILoadError,
};

export const getCurrentUser = async () => cachedAPIGet(cache);
export const useCurrentUser = cachedAPIHook(cache);