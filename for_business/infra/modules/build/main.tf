variable "stage" {}
variable "aws-account-id" {}
variable "s3-bucket" {}
variable "cloudfront-id" {}
variable "github-target-branch" {}
variable "github_access_token" {}
variable "code-pipeline-bucket" {}

locals {
  identifier = var.stage == "stg" ? "-stg" : ""
  identifier2 = var.stage == "stg" ? "-dev" : ""
}

resource "aws_codebuild_project" "forbiz-lp-code-build" {
  name = "synchrolife4biz_lp${local.identifier}"
  service_role = aws_iam_role.forbiz-lp-build-role.arn

  source {
    type = "GITHUB"
    location = "https://github.com/Ginkan/synchrolife4biz_lp.git"
    report_build_status = false
    insecure_ssl = false
    git_clone_depth = 1
    buildspec = "buildspec.yaml"
  }

  artifacts {
    type = "NO_ARTIFACTS"
  }

  environment {
    compute_type = "BUILD_GENERAL1_SMALL"
    image = "aws/codebuild/amazonlinux2-x86_64-standard:2.0"
    type = "LINUX_CONTAINER"
    privileged_mode = false

    environment_variable {
      name = "STAGE"
      value = var.stage
    }

    environment_variable {
      name = "S3_BUCKET"
      value = var.s3-bucket
    }

    environment_variable {
      name = "CLOUDFRONT_DISTRIBUTION_ID"
      value = var.cloudfront-id
    }
  }
}

resource "aws_codepipeline" "forbiz-lp-code-pipeline" {
  name = "lp-business${local.identifier2}"
  role_arn = aws_iam_role.forbiz-lp-pipeline-role.arn

  artifact_store {
    location = var.code-pipeline-bucket
    type = "S3"
  }

  stage {
    name = "Source"

    action {
      category = "Source"
      name = "Source"
      owner = "ThirdParty"
      provider = "GitHub"
      version = 1
      output_artifacts = ["SourceArtifact"]

      configuration = {
        Owner = "Ginkan"
        Repo = "synchrolife4biz_lp"
        Branch = var.github-target-branch
        PollForSourceChanges = false
        // OAuthToken = var.github_access_token // 差分が出てしまうので
      }
    }
  }

  stage {
    name = "Deploy"

    action {
      name = "Deploy"
      category = "Build"
      owner = "AWS"
      provider = "CodeBuild"
      version = 1
      input_artifacts = ["SourceArtifact"]

      configuration = {
        ProjectName = aws_codebuild_project.forbiz-lp-code-build.id
      }
    }
  }
}