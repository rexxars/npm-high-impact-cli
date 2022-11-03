#!/usr/bin/env node
import {spawnSync} from 'node:child_process'
import {fetch} from 'undici'
import {npmHighImpact} from 'npm-high-impact'

export async function getUserPackages(username) {
  const query = new URLSearchParams({size: '250', text: `maintainer:${username}`})

  const packages = []
  let total = null
  do {
    const body = await fetch(`https://registry.npmjs.org/-/v1/search?${query}`).then((res) =>
      res.json()
    )

    total = body.total
    packages.push(
      ...body.objects.map((pkg) => ({
        name: pkg.package.name,
        popularity: pkg.score.detail.popularity,
      }))
    )
    query.set('from', packages.length)
  } while (total === null || packages.length > total)

  return packages.sort((a, b) => b.popularity - a.popularity)
}

export async function getHighImpactMaintainerPackages(username) {
  const user = username || getCurrentNpmUser()
  if (!user) {
    throw new Error('Could not determine npm user, please provide one manually')
  }

  const packages = await getUserPackages(user)
  return packages.filter((pkg) => npmHighImpact.includes(pkg.name))
}

function getCurrentNpmUser() {
  return spawnSync('npm', ['whoami']).stdout.toString().trim()
}
