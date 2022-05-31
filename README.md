# Backend (API)

## 프로젝트 개요

저희 서비스는 폐쇄형 자막을 제공해주는 배리어프리 자막 서비스입니다. **폐쇄형자막**은 웃음소리, 천둥소리 등 비언어 소리를 자막으로 표시합니다. 이런 폐쇄형 자막이 장애인들에게 필요하지만, 시간과 자원이 많이 필요해 제공하지 않는 경우가 대부분입니다. 

폐쇄형 자막은 장애인 뿐만 아니라 비장애인들도 선호하는데요. 놓치는 것 없이 볼 수 있고 외출 시 이어폰을 들고 나오지 않았을 경우 등 상황에 제약받지 않고 컨텐츠를 즐길 수 있는 장점이 있기 때문입니다. 현재는 폐쇄형 자막 중 비언어적 소리 역시 사람이 입력하여 시간이 오래 걸리는 문제점이 있기 때문에 저희 서비스는 AI를 이용한 자동화로 빠르게 폐쇄형자막을 제공하고자 합니다.



## 프로젝트 아키텍쳐

![image](https://user-images.githubusercontent.com/66551410/171229067-4a5bbd76-e863-4fd2-bb2a-b37e5de55801.png)



## 프로젝트 기술 스택

|                        Backend (API)                         |
| :----------------------------------------------------------: |
| ![Nestjs](https://img.shields.io/badge/nestjs-white?style=flat-square&logo=nestjs&color=E0234E) ![GoogleCloud](https://img.shields.io/badge/GoogleCloud-4285F4?style=flat-square&logo=GoogleCloud&logoColor=white) ![AWS](https://img.shields.io/badge/AWS-232F3E?style=flat&logo=amazon-aws&logoColor=white)  ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=Docker&logoColor=white) ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=white)  ![MySQL](https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white) ![Sentry](https://img.shields.io/badge/Sentry-362D59?style=flat-square&logo=Sentry&logoColor=white) |


# Backend (API)

## 사용한 기술

- Google OAuth2.0

- Kakao OAuth2.0 

- Passport.js, JWT

- Redis PUB/SUB  

- CloudWatch

- Sentry / Slack  

  

## Dev Server

https://api.so-woo-ju.com/api/v1



## API Documentation

https://api.so-woo-ju.com/api/v1/docs



## Getting Started

`node: 14.16.0`  
`npm: 6.14.11`

### 1. Cloning

```
$ git https://github.com/So-Woo-Ju/sowooju-api-server.git
$ cd sowooju-api-server
$ npm install
```

### 2. Setting dotenv at Root Directory

```
DB_HOST=<DB_HOST>
DB_PORT=<DB_PORT>
DB_USERNAME=<DB_USERNAME>
DB_PASSWORD=<DB_PASSWORD>
DB_NAME=<DB_NAME>
PORT=<PORT>
GMAIL_USER=<GMAIL_USER>
GMAIL_PASS=<GMAIL_PASS>
JWT_SECRET_KEY=<JWT_SECRET_KEY>
GOOGLE_CLIENT_ID=<GOOGLE_CLIENT_ID>
GOOGLE_SECRET=<GOOGLE_SECRET>
KAKAO_KEY=<KAKAO_KEY>
WEB_HOOK=<WEB_HOOK>
AWS_ACCESS_KEY_ID=<AWS_ACCESS_KEY_ID>
AWS_SECRET_ACCESS_KEY=<AWS_SECRET_ACCESS_KEY>
VIDEO_S3_BUCKET_NAME=<VIDEO_S3_BUCKET_NAME>
```

### 3. Run the MySQL with Docker

```
$ docker-compose -f "docker-compose.yml" up -d --build                                   
```

### 4. Start Local Server

```
$ npm run start             
```



## Architecture

### Server Architecture

![Untitled (1)](https://user-images.githubusercontent.com/66551410/171187998-d7af0312-55ea-47e4-9f85-9b9bf798aa04.png)



### CICD Architecture

![image](https://user-images.githubusercontent.com/66551410/152016992-cff6b052-35d7-416e-868c-b2702a3ef692.png)



### MySQL ERD


![image](https://user-images.githubusercontent.com/66551410/171187448-8a9ec925-6200-4eec-8ba3-40f8b4e692c5.png)



## Package

```bash
추가해야합니다.
```



## Contributors

|                 주효정                 |                  김소미                  |                    박소현                    |               Sunwoo Ho                |
| :------------------------------------: | :--------------------------------------: | :------------------------------------------: | :------------------------------------: |
| [@jhj2713](https://github.com/jhj2713) | [@somii009](https://github.com/somii009) | [@Sohyun-Dev](https://github.com/Sohyun-Dev) | [@hocaron](https://github.com/hocaron) |
|               React, AI                |               Backend, AI                |                 Backend, AI                  |              Backend, AI               |


