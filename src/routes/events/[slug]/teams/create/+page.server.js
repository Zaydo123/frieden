import { pb } from "$lib/pocketbase"

export const actions = { 
    default: async ({params,request, locals})=> {
        // Create Event Group 
        try { 

            //event obj
            //event.user, locals, getClientAddress, cookies, params.slug, request
            if(locals?.user?.verified != true){
                return {status: 401, body: {error: "Unauthorized"}};
            }
            else if(locals?.user?.verified == true){

                if(locals?.user?.id){
                    let uid = locals?.user?.id;
                    let body = await request.formData();
                    
                    let groupName = body.get('group-name')
                    let groupLogo = body.get('group-logo')
                    let groupInviteOnlyCode = body.get('invite-only')

                    const data = {
                        "GroupName": groupName,
                        "Members": [
                            uid
                        ],
                        "Event": params.slug,
                        "InviteOnly": groupInviteOnlyCode != null ? true : false,
                        "InvitePin": groupInviteOnlyCode != null ? groupInviteOnlyCode : null,
                        "GroupLogo": groupLogo != null ? groupLogo : null, 
                        "Paid": false,
                        "GroupLeader": uid,
                    };
                    

                    let res = await pb.collection('EventGroups').create(data);

                    console.log("\n\n----------------------\n\n")
                    console.log(res);


            
                }

            } else {
                console.log("Error in event group create");
                return {status: 401, body: {error: "Unauthorized"}};
            }



        }
        catch(e) {
            console.log("\n\n\nError creating event group");
            console.log(e.originalError);
        }


    } 
}