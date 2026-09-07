const astroZikojs = (options = {}) => {
  const noExternal = options.noExternal || []

  return {
    name: "@zikojs/astro",

    hooks: {
      "astro:config:setup": async ({ addRenderer, updateConfig, config }) => {
        
        // 1. Register renderer
        addRenderer({
          name: "@zikojs/astro",
          serverEntrypoint: "@zikojs/astro/server",
          clientEntrypoint: "@zikojs/astro/client",
        })

        // 2. Merge noExternal
        const existing = config.vite?.ssr?.noExternal || []

        if (noExternal.length) {
          updateConfig({
            vite: {
              ssr: {
                noExternal: [
                  ...new Set([...existing, ...noExternal])
                ]
              }
            }
          })
        }
      }
    }
  }
}

export default astroZikojs