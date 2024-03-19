## About / Overview

This is a full-stack Todo application. The focus of this project was Fullstack & DevOps experience.

This to-do application used the PERN stack (PostgreSQL, Express, React and Node.js) for development.

Client side is hosted on AWS.

CDN used to cache wesite to localised nodes.

Docker image configured and pushed to AWS.

Highly available and autoscaling container cluster implemented.

Integrated a load balancer to manage network traffic.

PostgreSQL database implemented using AWS RDS.

Configured an automated CI/CD pipeline using GitHub Actions, orchestrating client-side updates to AWS.

Note: The Bootstrap framework was used for the UI / UX. Why? Simply, because I hadn't used it before and utlimately allowed for the focus to remain the focus.

## AWS Focus

A Task was defined for multiple containers. This meant allocating cpu, memory, an image, networking type and IAM role.

A Service was used to group tasks as well as check and fix an unhealthy tasks.

A Cluster was created to logically group services (only one for this application) in my local region.

End-point created to satisy Load Balancer healthcheck on AWS.

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

The Dockerfile was desgied with layer caching in mind for optimised / faster builds.

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
