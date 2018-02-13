provider "aws" {
  region = "us-west-1"
  profile = "ide"
}

data "aws_caller_identity" "current" {}
data "aws_region" "current" {}

# Lambda

resource "aws_lambda_function" "image_generator_lambda" {
  function_name = "love-language-image-generator"
  handler = "src/function.handler"
  runtime = "nodejs6.10"
  filename = "function.zip"
  source_code_hash = "${base64sha256(file("function.zip"))}"
  role = "${aws_iam_role.lambda_execution_role.arn}"
  publish = true
}

# Lambda Archiving

resource "null_resource" "lambda_archive" {
  triggers {
    always = "${uuid()}"
  }

  provisioner "local-exec" {
    command = "rm -f function.zip && zip -r function.zip package.json src node_modules"
  }
}

# API Gateway

resource "aws_api_gateway_rest_api" "api" {
  name = "LoveLanguagesAPI"
  description = "The server API for the Love Languages app"
}

resource "aws_api_gateway_resource" "image_generator" {
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  parent_id = "${aws_api_gateway_rest_api.api.root_resource_id}"
  path_part = "generate-result-image"
}

resource "aws_api_gateway_method" "image_generator_post" {
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  resource_id = "${aws_api_gateway_resource.image_generator.id}"
  http_method = "POST"
  authorization = "NONE"
}

## API Gateway + Lambda

resource "aws_api_gateway_integration" "image_generator_lambda_integration" {
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  resource_id = "${aws_api_gateway_resource.image_generator.id}"
  http_method = "${aws_api_gateway_method.image_generator_post.http_method}"
  integration_http_method = "POST"
  type = "AWS_PROXY"
  uri = "arn:aws:apigateway:${data.aws_region.current.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.image_generator_lambda.arn}/invocations"
}

## API Gateway Deployment

resource "aws_api_gateway_deployment" "production" {
  depends_on = [
    "aws_lambda_permission.api_gateway_permission",
    "aws_api_gateway_method.image_generator_post",
    "aws_api_gateway_integration.image_generator_lambda_integration"
  ]
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  stage_name = "production"
}

resource "aws_lambda_permission" "api_gateway_permission" {
  statement_id = "AllowExecutionFromAPIGateway"
  action = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.image_generator_lambda.arn}"
  principal = "apigateway.amazonaws.com"
  source_arn = "arn:aws:execute-api:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:${aws_api_gateway_rest_api.api.id}/*/*"
}

output "production_api_url" {
  value = "https://${aws_api_gateway_deployment.production.rest_api_id}.execute-api.${data.aws_region.current.name}.amazonaws.com/${aws_api_gateway_deployment.production.stage_name}"
}

# IAM

resource "aws_iam_role" "lambda_execution_role" {
  name = "love-language-lambda-function"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}
