import Octokit from '@octokit/rest'

var createOctokitAuthClient = () => {
  let client_id = process.env.CLIENT_ID
  let client_secret = process.env.CLIENT_SECRET
  return new Octokit({
    auth: {
      clientId: client_id,
      clientSecret: client_secret
    }
  })
}

export default createOctokitAuthClient