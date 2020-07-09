module "forbiz-lp-s3" {
  source = "../modules/s3"
  s3-origin-config-id = var.s3-origin-config-id
  stage = var.stage
}

module "forbiz-lp-cloudfront" {
  source = "../modules/cloudfront"
  s3-bucket = module.forbiz-lp-s3.forbiz-lp-s3-bucket
  s3-origin-config-id = var.s3-origin-config-id
  alias-domains = var.alias-domains
  acm-edge-arn = data.terraform_remote_state.network.outputs.synchrolife-jp-certificate-edge-amzn-id
}

module "forbiz-lp-build" {
  source = "../modules/build"
  stage = var.stage
  aws-account-id = var.aws-account-id
  s3-bucket = module.forbiz-lp-s3.forbiz-lp-s3-bucket
  cloudfront-id = module.forbiz-lp-cloudfront.forbiz-lp-cloudfront-id
  github-target-branch = var.github-target-branch
  github_access_token = var.github_access_token
  code-pipeline-bucket = var.code-pipeline-bucket
}