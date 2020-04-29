import React from 'react'
import { pathJoin, makePathAbsolute } from '../../utils'

const REGEX_FOR_SCRIPT = /<(\/)?(script)/gi

// Not only do we pass react-helmet attributes and the app.js here, but
// we also need to  hard code site props and route props into the page to
// prevent flashing when react mounts onto the HTML.
export const makeBodyWithMeta = ({
  head,
  route,
  embeddedRouteInfo,
  clientScripts = []
}) => ({ children, ...rest }) => (
  <body {...head.bodyProps} {...rest}>
    {children}
    {!route.redirect && route.path === '404' &&
      clientScripts.map(script => (
        <script
          key={script}
          defer
          type="text/javascript"
          src={makePathAbsolute(
            pathJoin(process.env.REACT_STATIC_ASSETS_PATH, script)
          )}
        />
      ))}
  </body>
)
