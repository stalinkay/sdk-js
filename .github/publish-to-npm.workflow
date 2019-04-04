workflow "Publish to NPM" {
  on = "release"
  resolves = ["publish"]
}

action "if branch == master" {
  uses = "actions/bin/filter@3c98a2679187369a2116d4f311568596d3725740"
  args = "branch master"
}

action "build" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["if branch == master"]
  runs = "build"
}

action "publish" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["build"]
  secrets = ["NPM_AUTH_TOKEN"]
}
