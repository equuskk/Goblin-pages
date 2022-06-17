import {Schedule} from "../../services/schedule";
import {Group} from "../../services/group";

export async function onRequest(context: any): Promise<Response> {
    const defaultHeaders = {
        'content-type': 'application/json'
    };
    // Contents of context object
    const {
        request, // same as existing Worker API
        env, // same as existing Worker API
        params, // if filename includes [id] or [[path]]
        waitUntil, // same as ctx.waitUntil in existing Worker API
        next, // used for middleware or to fetch assets
        data, // arbitrary space for passing data between middlewares
    } = context;

    let groupId = params.id;
    if (!groupId || isNaN(groupId)) {
        return new Response(JSON.stringify(["Нужно указать номер группы (например, 351017)"]), {
            headers: defaultHeaders
        });
    }

    let date = getDate(request);

    let group = await getGroup(groupId, env);
    if (!group) {
        const KV = env.Goblin as KVNamespace;
        let kvGroups = await KV.get('Groups');
        let narfuGroups = JSON.parse(kvGroups!) as Group[];
        return new Response(JSON.stringify(narfuGroups), {
            headers: defaultHeaders
        });
    }

    let schedule = new Schedule();
    let {isFromSite, responseLessons} = await schedule.getLessons(group, date);
    let response = {
        groupName: group.Name,
        groupId: group.RealId,
        lessons: responseLessons,
        webCalLink: schedule.generateLink(group, true, date),
        icsLink: schedule.generateLink(group, false, date),
        isFromSite: isFromSite
    }

    return new Response(JSON.stringify(response), {
        headers: defaultHeaders
    });
}

function getDate(request: any) {
    const {searchParams} = new URL(request.url);

    return searchParams.get("date") ??
        new Date().toLocaleDateString('ru', {
            year: "numeric",
            month: "2-digit",
            day: "numeric"
        });
}

async function getGroup(groupId: number, env: any) {
    const KV = env.Goblin as KVNamespace;
    let kvGroups = await KV.get('Groups');
    console.log(kvGroups);
    let narfuGroups = JSON.parse(kvGroups!) as Group[] || [] as Group[];
    return narfuGroups.find((x) => x.RealId == groupId);
}