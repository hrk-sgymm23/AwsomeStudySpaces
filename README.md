# AwsomeStudySpaces

## イメージ

![localhost_3000_LocationPosts (2)](https://github.com/hrk-sgymm23/AwsomeStudySpaces/assets/78539910/f514c93b-f23d-4a7c-a261-40336de4defa)

## 使用技術

### フロント
- React.js
  - `18.2.0`
- TypeScript
  - `4.9.5`

### バックエンド
- Ruby
  - `3.2.2`

- Ruby on Rails
  - `7.0.8.1`

## ECSへのデプロイ

```bash
# authenticated
$ aws ecr get-login-password --region ap-northeast-1 | docker login --username AWS --password-stdin {account_number}.dkr.ecr.ap-northeast-1.amazonaws.com


# Rails
$ cd ass/backend

$ docker build --no-cache -f ./docker/staging/Dockerfile --platform linux/amd64  -t ass-rails-ecr-staging .

$ docker tag ass-rails-ecr-staging:latest {account_number}.dkr.ecr.ap-northeast-1.amazonaws.com/ass-rails-ecr-staging:stg

$ docker push {account_number}.dkr.ecr.ap-northeast-1.amazonaws.com/ass-rails-ecr-staging:stg


# Nginx
$ docker build --no-cache --platform linux/amd64 -t ass-nginx-ecr-staging .

$ docker tag ass-nginx-ecr-staging:latest {account_number}.dkr.ecr.ap-northeast-1.amazonaws.com/ass-nginx-ecr-staging:stg

$ docker push {account_number}.dkr.ecr.ap-northeast-1.amazonaws.com/ass-nginx-ecr-staging:stg
```