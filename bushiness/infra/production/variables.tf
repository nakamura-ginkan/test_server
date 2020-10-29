variable "stage" {
  default = "prd"
}

variable "aws-account-id" {
  default = "644862804909"
}

variable "alias-domains" {
  default = [
    "business.synchrolife.jp",
    "food-stadium.synchrolife.jp",
    "ryukyuasteeda.synchrolife.jp",
    "ag-dl.synchrolife.jp"
  ]
}

variable "s3-origin-config-id" {
  default = "EUBYDA7YMWRRE"
}

variable "github-target-branch" {
  default = "master"
}

variable "code-pipeline-bucket" {
  default = "codepipeline-ap-northeast-1-557439865911"
}