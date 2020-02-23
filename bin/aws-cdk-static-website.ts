#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AwsCdkStaticWebsiteStack } from '../lib/aws-cdk-static-website-stack';

const app = new cdk.App();
new AwsCdkStaticWebsiteStack(app, 'AwsCdkStaticWebsiteStack');
