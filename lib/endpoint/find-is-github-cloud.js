module.exports = findIsGitHubCloud

function findIsGitHubCloud (state) {
  if (state.gheVersion) {
    return
  }

  const githubCloudOnly = isGitHubCloud(state)

  state.results.forEach(result => {
    result.githubCloudOnly = githubCloudOnly
  })
}

function isGitHubCloud (state) {
  const routeBlocks = state.blocks.filter(block => block.type === 'route')
  const scimRoute = routeBlocks.find(routeBlock => /^\/scim\//.test(routeBlock.path))

  if (scimRoute) {
    return true
  }

  const description = state.blocks
    .filter(block => block.type === 'description')
    .map(block => block.text)
    .join('\n\n')

  const resultWithGitHubEnterpriseNote = /is available to organizations with GitHub Enterprise Cloud/.test(description)

  return !!resultWithGitHubEnterpriseNote
}
