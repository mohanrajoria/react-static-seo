import React from 'react'
import { pathJoin, makePathAbsolute } from '../../utils'

const REGEX_FOR_SCRIPT = /<(\/)?(script)/gi

// Not only do we pass react-helmet attributes and the app.js here, but
// we also need to  hard code site props and route props into the page to
// prevent flashing when react mounts onto the HTML.
export const makeBodyWithMeta = ({
  head,
  // This embeddedRouteInfo will be inlined into the HTML for this route.
  // It should only include the full props, not the partials.
  embeddedRouteInfo,
  clientScripts = [],
}) => ({ children, ...rest }) => (
  <body {...head.bodyProps} {...rest}>
    {children}
  </body>
)
