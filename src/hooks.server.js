import { pb } from '$lib/pocketbase';
 
export const handle = async ({ event, resolve }) => {

 	// get cookie from user and set cookie to pocketbase
	pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	try {
		// get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
		pb.authStore.isValid && (await pb.collection('users').authRefresh());
	} catch (_) {
		// clear the auth store on failed refresh
		pb.authStore.clear();
	}

	event.locals.pb = pb;
	event.locals.user = structuredClone(pb.authStore.model);
	// before
	const response = await resolve(event);
	// after request send response with cookie to user back

	if (event.url.pathname == "/logout" || pb.authStore.isValid) {
		const newCookie = event.locals.pb.authStore.exportToCookie({ httpOnly: false, secure: import.meta.env.PROD});
		response.headers.append('set-cookie', newCookie); // take out and send cookie back to user
	}
	if (event.url.pathname.indexOf("/admin/panel") > -1) {
		let allowed = false;
		//when i come back, search for the role id, get permission group, if permission group has panel access, then allow access
		if(event.locals.user!=null){
			let userRoles = await pb.collection("Roles").getList(1,50, {expand: `PermissionGroup`});
			userRoles = userRoles["items"];
			if(userRoles.length >0){
				
				for( let i = 0 ; i < userRoles.length; i++){

					if(userRoles[i].expand){

						if(userRoles[i].expand.PermissionGroup.PanelAccess){
							if(userRoles[i].expand.PermissionGroup.PanelAccess){
								allowed = true;
							}
						}

					}

				}
				
			}
			
		}

		if(!allowed){
			return new Response("You do not have access to this page", {status: 403});
		}

	}
	return response;
};