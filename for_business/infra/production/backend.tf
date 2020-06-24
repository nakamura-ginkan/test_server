terraform {
  required_version = "= 0.12.20"
  backend "s3" {
    region  = "ap-northeast-1"
    encrypt = true

    bucket = "synchrolife-terraform"
    key    = "production/synchrlife4biz_lp/terraform.tfstate"

    profile = "ginkan"
  }
}

data "terraform_remote_state" "network" {
  backend = "s3"

  config = {
    bucket = "synchrolife-terraform"
    key    = "production/network/terraform.tfstate"
    region = "ap-northeast-1"

    profile = "ginkan"
  }
}

variable "profile" {
  default = "ginkan"
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