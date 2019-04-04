workflow "Publish to NPM" {
  on = "release"
  resolves = ["publish"]
}

action "build" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  runs = "build"
}

action "publish" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["build"]
  secrets = ["NPM_AUTH_TOKEN"]
}
