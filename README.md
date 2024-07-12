## About / Overview

This is a full-stack Todo application. The focus of this project was Fullstack & DevOps experience.

This to-do application used the PERN stack (PostgreSQL, Express, React and Node.js) for development.

- Built a full-stack Todo app using TDD in AWS.
- Frontend hosted in an S3 bucket.
- CloudFront used as CDN service to cache website to localised nodes.
- Used Docker to configure and build a lightweight image.
- Deployed Docker image on ECR.
- Autoscaling ECS cluster to accommodate changes to traffic.
- Highly available by being deployed across multiple availability zones.
- Integrated a Load Balancer to manage traffic to any given node.
- RDS used to implement PostgreSQL database.
- Implemented an automated CI/CD pipeline using GitHub Actions, which
  deployed frontend assets to an S3 bucket, and built and deployed a new version
  of the backend image to ECS.
- Provisioned all the infrastructure in AWS as code using Terraform.
- Used a Postgres Test Container and Jest to learn integration testing.
- Used Playwright to learn end-to-end testing.

## Current

Currently, I have removed the deployed application and re-doing this step using Infrastructure as Code (Terraform). In parallel, I am also creating migration scripts to create the database on application launch.

## Difficulties?

### PROBLEM 1:

Container build would fail to execute on AWS.

### SOLUTION 1:

Failed exec was due to the way in which Docker images were being built. In my case, I was using an Apple Silicon M1 chip. By default Docker on M1 macbook would create linux/arm64 images, which would work only on the machines that are using ARM cpu architecture. But intel based machines use AMD architecture. As a result docker images built on M1 macbook might not work on intel based machines. So I needed to build docker images using linux/amd64 in order to deploy on AWS ECS.

**Check your CPU Architecture:**

```
uname -a
```

**Docker Build Command:**

```
docker buildx build --platform=linux/amd64 -t < image id >.dkr.< region >.amazonaws.com/< image name >:< tag > .
```

## Optimisations

The Dockerfile was designed with layer caching in mind for optimised / faster builds.

---

## Useful Commands (for reference)

### Pushing a Docker image [AWS Docs](https://docs.aws.amazon.com/AmazonECR/latest/userguide/docker-push-ecr-image.html)

**Authenticate your Docker client to the Amazon ECR registry to which you intend to push your image:**

```
aws ecr get-login-password --region region | docker login --username AWS --password-stdin aws_account_id.dkr.ecr.region.amazonaws.com
```

**Push the image using the docker push command:**

```
docker push aws_account_id.dkr.ecr.us-west-2.amazonaws.com/my-repository:tag
```
