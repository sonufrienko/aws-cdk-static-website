import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import { CloudFrontWebDistribution, OriginProtocolPolicy } from '@aws-cdk/aws-cloudfront';

interface WebsiteProps extends cdk.StackProps {
  refererHeaderValue: string;
}

export default class WebsiteStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: WebsiteProps) {
    super(scope, id, props);
    
    const { refererHeaderValue } = props;
    let bucketWebsiteDomainName = "";

    /**
     * Create S3 Bucket as Static Website
     */
    const hostingBucket = new s3.Bucket(this, 'website', {
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html'
    });

    bucketWebsiteDomainName = hostingBucket.bucketWebsiteDomainName;

    const grant = hostingBucket.grantPublicAccess('*', 's3:GetObject');
    grant.resourceStatement!.addResources(hostingBucket.bucketArn);
    grant.resourceStatement!.sid = "AllowByRefererHeader";
    grant.resourceStatement!.addCondition("StringEquals", { "aws:Referer": refererHeaderValue });


    /**
     * Create CloudFront Web Distribution
     */
    const distribution = new CloudFrontWebDistribution(this, 'WebsiteDistribution', {
      originConfigs: [
        {
          customOriginSource: {
            domainName: bucketWebsiteDomainName,
            originProtocolPolicy: OriginProtocolPolicy.HTTP_ONLY
          },
          behaviors : [ {
            isDefaultBehavior: true,
            compress: true
          }],
          originHeaders: {
            'Referer': refererHeaderValue
          }
        },
      ]
    });
  }
}
