variable "stage" {}
variable "s3-origin-config-id" {}

locals {
  identifier = var.stage == "stg" ? "-dev" : ""
}

resource "aws_s3_bucket" "forbiz-lp-bucket" {
  bucket = "synchrolife-lp-business${local.identifier}-contents"
  acl = "private"
  force_destroy = false
}

resource "aws_s3_bucket_policy" "forbiz-lp-bucket" {
  bucket = aws_s3_bucket.forbiz-lp-bucket.bucket
  policy = <<EOF
{
    "Version": "2008-10-17",
    "Id": "PolicyForCloudFrontPrivateContent",
    "Statement": [
        {
            "Sid": "1",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity ${var.s3-origin-config-id}"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::${aws_s3_bucket.forbiz-lp-bucket.bucket}/*"
        }
    ]
}
EOF
}

output "forbiz-lp-s3-bucket" {
  value = aws_s3_bucket.forbiz-lp-bucket.bucket
}