#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import WebsiteStack from '../lib/aws-cdk-static-website-stack';

const app = new cdk.App();

new WebsiteStack(app, "GatsbyStack", {
  env: { region: "us-west-1" },
  refererHeaderValue: "Rbb860Z^"
});

new WebsiteStack(app, "ReactStack", {
  env: { region: "us-east-1" },
  refererHeaderValue: "0WeqI!U7"
});