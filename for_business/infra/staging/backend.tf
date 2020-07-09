terraform {
  required_version = "= 0.12.20"
  backend "s3" {
    region  = "ap-northeast-1"
    encrypt = true

    bucket = "synchrolife-dev-terraform"
    key    = "staging/synchrlife4biz_lp/terraform.tfstate"

    profile = "ginkan-dev"
  }
}

data "terraform_remote_state" "network" {
  backend = "s3"

  config = {
    bucket = "synchrolife-dev-terraform"
    key    = "staging/network/terraform.tfstate"
    region = "ap-northeast-1"

    profile = "ginkan-dev"
  }
}

variable "profile" {
  default = "ginkan-dev"
}

variable "github_access_token" {
  # 環境変数 TF_VAR_github_access_token
}

provider "aws" {
  version = "= 2.46.0"
  region  = "ap-northeast-1"
  profile = var.profile
}

provider "github" {
  organization = "Ginkan"
  token = var.github_access_token
}