import { renderToString } from "@zikojs/server/server-only-utils"
import { is_async } from "ziko/internal-utils/checkers"
function check(Component, attributes) {
    if (typeof Component !== "function") return false;
	return true
}
async function renderToStaticMarkup(Component, props, { default: children, ...slotted }, metadata) {
    const UI = is_async(Component) ? await Component(props) : Component(props).useClient()
    const html = renderToString(UI)
    console.log({metadata})
    return { 
        html,
        // hydration: {
        //     ...metadata,
        //     directive: "astro-zikojs",               
        //     // componentExport: "default",        
        //     // componentUrl: metadata.filePath,   
        // },
     };
}

export default {
    name : "astro-zikojs",
    check,
    renderToStaticMarkup
}