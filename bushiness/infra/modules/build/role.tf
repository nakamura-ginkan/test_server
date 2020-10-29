resource "aws_iam_role" "forbiz-lp-build-role" {
  name = "codebuild-synchrolife4biz_lp${local.identifier}-service-role"
  assume_role_policy = data.aws_iam_policy_document.forbiz-lp-build-assume-role.json
  path = "/service-role/"
}

data "aws_iam_policy_document" "forbiz-lp-build-assume-role" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type = "Service"
      identifiers = ["codebuild.amazonaws.com"]
    }
  }
}

resource "aws_iam_role_policy_attachment" "forbiz-lp-build-role-policy-0" {
  policy_arn = "arn:aws:iam::${var.aws-account-id}:policy/service-role/CodeBuildBasePolicy-synchrolife4biz_lp${local.identifier}-ap-northeast-1"
  role = aws_iam_role.forbiz-lp-build-role.name
}

resource "aws_iam_role_policy_attachment" "forbiz-lp-build-role-policy-1" {
  policy_arn = "arn:aws:iam::aws:policy/AWSLambdaFullAccess"
  role = aws_iam_role.forbiz-lp-build-role.name
}

resource "aws_iam_role_policy_attachment" "forbiz-lp-build-role-policy-2" {
  policy_arn = "arn:aws:iam::aws:policy/IAMFullAccess"
  role = aws_iam_role.forbiz-lp-build-role.name
}

resource "aws_iam_role_policy_attachment" "forbiz-lp-build-role-policy-3" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonS3FullAccess"
  role = aws_iam_role.forbiz-lp-build-role.name
}

resource "aws_iam_role_policy_attachment" "forbiz-lp-build-role-policy-4" {
  policy_arn = "arn:aws:iam::aws:policy/CloudFrontFullAccess"
  role = aws_iam_role.forbiz-lp-build-role.name
}

resource "aws_iam_role_policy_attachment" "forbiz-lp-build-role-policy-5" {
  policy_arn = "arn:aws:iam::aws:policy/CloudWatchLogsFullAccess"
  role = aws_iam_role.forbiz-lp-build-role.name
}

resource "aws_iam_role_policy_attachment" "forbiz-lp-build-role-policy-6" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonAPIGatewayAdministrator"
  role = aws_iam_role.forbiz-lp-build-role.name
}

resource "aws_iam_role_policy_attachment" "forbiz-lp-build-role-policy-7" {
  policy_arn = "arn:aws:iam::aws:policy/AWSCloudFormationFullAccess"
  role = aws_iam_role.forbiz-lp-build-role.name
}

resource "aws_iam_role" "forbiz-lp-pipeline-role" {
  name = "AWSCodePipelineServiceRole-ap-northeast-1-lp-business${local.identifier2}"
  assume_role_policy = data.aws_iam_policy_document.forbiz-lp-pipeline-assume-role.json
  path = "/service-role/"
}

data "aws_iam_policy_document" "forbiz-lp-pipeline-assume-role" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type = "Service"
      identifiers = ["codepipeline.amazonaws.com"]
    }
  }
}

resource "aws_iam_role_policy_attachment" "forbiz-lp-pipeline-role-policy-0" {
  policy_arn = "arn:aws:iam::${var.aws-account-id}:policy/service-role/AWSCodePipelineServiceRole-ap-northeast-1-lp-business${local.identifier2}"
  role = aws_iam_role.forbiz-lp-pipeline-role.name
}