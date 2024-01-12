import { PB_URL } from "../lib/pbConnection";

export async function load() {
    return {
        PB_URL: PB_URL
    };
}