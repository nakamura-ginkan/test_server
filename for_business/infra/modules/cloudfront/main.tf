variable "s3-bucket" {}
variable "s3-origin-config-id" {}
variable "alias-domains" {}
variable "acm-edge-arn" {}

resource "aws_cloudfront_distribution" "forbiz-lp-cloudfront" {
  enabled = true

  aliases = var.alias-domains

  default_root_object = "index.html"
  is_ipv6_enabled = true

  default_cache_behavior {

    allowed_methods = ["GET", "HEAD"]
    cached_methods = ["GET", "HEAD"]
    target_origin_id = "S3-${var.s3-bucket}"
    viewer_protocol_policy = "redirect-to-https"

    default_ttl = 86400
    max_ttl = 31536000
    min_ttl = 0

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }

      headers = ["Authorization"]
    }
  }

  origin {
    domain_name = "${var.s3-bucket}.s3.amazonaws.com"
    origin_id = "S3-${var.s3-bucket}"

    s3_origin_config {
      origin_access_identity = "origin-access-identity/cloudfront/${var.s3-origin-config-id}"
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = false
    acm_certificate_arn = var.acm-edge-arn
    minimum_protocol_version = "TLSv1.1_2016"
    ssl_support_method = "sni-only"
  }

  lifecycle {
    # ステージングのみベーシック認証Lambdaを手動で設定している
    ignore_changes = [default_cache_behavior.0.lambda_function_association]
  }
}

output "forbiz-lp-cloudfront-id" {
  value = aws_cloudfront_distribution.forbiz-lp-cloudfront.id
}