#!/usr/bin/env node
import meow from 'meow'
import {npmHighImpact} from 'npm-high-impact'
import {getHighImpactMaintainerPackages} from './high-impact.js'

const cli = meow(
  `
	Usage
	  $ npm-high-impact <username>

	Examples
    # Print high-impact modules the current npm user is maintainer of
	  $ npm-high-impact 

    # Print high-impact modules the user "wooorm" is maintainer of
    $ npm-high-impact wooorm
`,
  {
    importMeta: import.meta,
  }
)

function printResult(packages, username) {
  if (packages.length === 0) {
    console.error(
      `${username} is not a maintainer of any of the top ${npmHighImpact.length} high-impact packages on npm`
    )
    return
  }

  console.error(
    `${username} is the maintainer of ${packages.length} of the top ${npmHighImpact.length} high-impact packages on npm:\n`
  )
  packages.forEach((pkg) => console.log(pkg.name))
}

const username = cli.input[0]

getHighImpactMaintainerPackages(username)
  .then((pkgs) => printResult(pkgs, username))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
