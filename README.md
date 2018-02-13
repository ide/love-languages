# Love Languages
An Expo app with a quiz to find out your love language: https://expo.io/@ide/love-languages

## How to run

You can install Expo on your Android or iOS phone and open this project: https://expo.io/@ide/love-languages.

If you want to run it from source, first familiarize yourself with [developing with Expo](https://docs.expo.io/). You should be able to install the dependencies for the project under `app` and run it like any other Expo project.

## Screenshots
<img src="https://user-images.githubusercontent.com/379606/36056609-a3bed2d2-0dba-11e8-977d-3f7a8be0bfa2.PNG" width="187.5" height="406" /> <img src="https://user-images.githubusercontent.com/379606/36056610-a3da54bc-0dba-11e8-9ed7-f28942a0133d.PNG" width="187.5" height="406" /> <img src="https://user-images.githubusercontent.com/379606/36056611-a3f56270-0dba-11e8-8f21-97610567309f.PNG" width="187.5" height="406" />

# Server

The server is an AWS Lambda function that generates an image of the person's results, uploads it to S3, and returns a URL they can share. It runs behind API Gateway. The entire AWS configuration is deployed with Terraform.

## Licenses

The source code of this project is released under the MIT license. The love languages and icons are credited in the app.
