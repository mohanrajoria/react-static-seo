/* eslint-disable import/first, import/no-dynamic-require */

const { setIgnorePath } = require('../utils/binHelper')

import path from 'path'

import { DefaultDocument } from './RootComponents'
import { poolAll, progress } from '../utils'
import exportRoute from './exportRoute'

export default async ({
  config,
  routes,
  siteData,
  clientStats,
  incremental,
}) => {
  const htmlProgress = progress(routes.length)
  // Use the node version of the app created with webpack

  setIgnorePath(config.paths.BUILD_ARTIFACTS)

  const Comp = require(path.resolve(
    config.paths.BUILD_ARTIFACTS,
    'static-app.js'
  )).default
  // Retrieve the document template
  const DocumentTemplate = config.Document || DefaultDocument
  const tasks = []
  for (let i = 0; i < routes.length; i++) {
    const route = routes[i]
    // eslint-disable-next-line
    tasks.push(async () => {
      await exportRoute({
        config,
        Comp,
        DocumentTemplate,
        route,
        siteData,
        clientStats,
        incremental,
      })
      console.log("-------------------------------------------------------------");
      console.log("In exporter : processing task: ", i, route.path);
      console.log("-------------------------------------------------------------");
      htmlProgress.tick()
    })
    console.log("-------------------------------------------------------------");
    console.log("In exporter : Task pushed: ", i, route.path);
    console.log("-------------------------------------------------------------");
  }
  await poolAll(tasks, Number(config.outputFileRate))
}
