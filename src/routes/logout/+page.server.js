export async function load({ locals }) {
    locals.pb.authStore.clear();
    locals.user = null;
}
