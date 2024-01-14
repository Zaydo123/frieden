import { PB_URL } from "./lib/pbConnection";
import PocketBase from "pocketbase";

export const handle = async ({ event, resolve }) => {
    event.locals.pb = new PocketBase(PB_URL);
    const response = await resolve(event);
    return response;
}