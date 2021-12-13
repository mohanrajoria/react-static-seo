import fetchSiteData from './fetchSiteData'
import fetchRoutes from './fetchRoutes'
import buildHTML from './buildHTML'

// Exporting route HTML and JSON happens here. It's a big one.
export default (async function exportRoutes({
  config,
  clientStats,
  incremental,
}) {
  // we modify config in fetchSiteData
  const siteData = await fetchSiteData(config)
  // we modify config in fetchRoutes

  const buildPartially = async (routesConfig) => {
    await fetchRoutes(routesConfig);
    await buildHTML({
      routesConfig,
      siteData,
      clientStats,
      incremental
    })
    console.log("////////////////////////////////////////////////////////////////");
    console.log('Build finished for routes length : ', routesConfig.routes.length);
    console.log("////////////////////////////////////////////////////////////////");
  }

  const routes = [...config.routes];
  const processRoutes = 1000;

  while(routes.length > 0) {
    console.log("||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
    console.log('Remaining routes length : ', routes.length);
    console.log("||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
    const routesConfig = {...config, routes: routes.splice(0, processRoutes)};
    await buildPartially(routesConfig);
  }
})
