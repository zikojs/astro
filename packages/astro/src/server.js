import { renderToString } from "@zikojs/server/server-only-utils"
import { isAsync } from "ziko/internal-utils/checkers"
function check(Component, attributes) {
    if (typeof Component !== "function") return false;
	return true
}
async function renderToStaticMarkup(Component, props, { default: children, ...slotted }, metadata) {
    const UI = isAsync(Component) ? await Component(props) : Component(props)
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