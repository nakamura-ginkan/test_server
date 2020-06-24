variable "stage" {
  default = "stg"
}

variable "aws-account-id" {
  default = "692066701706"
}

variable "alias-domains" {
  default = [
    "lp-business-dev.synchrolife.jp",
    "agency-test.synchrolife.jp",
  ]
}

variable "s3-origin-config-id" {
  default = "E2R781HRG04DKG"
}

variable "github-target-branch" {
  default = "develop"
}

variable "code-pipeline-bucket" {
  default = "codepipeline-ap-northeast-1-350635547900"
}