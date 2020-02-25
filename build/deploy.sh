#!/bin/bash
echo "---------------------------初始化-------------------------"

if [ -d "./deploy" ]; 
then rm -rf ./deploy
fi

echo "---------------------------构建前端资源-------------------------"

npm run build:dll
npm run build

echo "---------------------------生成Dockerfile文件，和nginx配置文件-------------------------"

mkdir deploy
cp -r ./dist/ ./deploy/dist 
cd deploy
echo "FROM nginx:latest" >> ./Dockerfile
echo "COPY ./dist /usr/share/nginx/html/"  >> ./Dockerfile
echo "COPY ./default.conf /etc/nginx/conf.d/"  >> ./Dockerfile
echo "EXPOSE 80" >>  ./Dockerfile

if [ -d "./default.conf" ]; 
then rm -rf ./default.conf;
fi
cat>> ./default.conf <<EOF
server {
listen 80;
server_name localhost;
location / {
    root   /usr/share/nginx/html/static;
    index  index.html index.htm;
    try_files \$uri \$uri/ /index.html;
  }
}
EOF
echo "---------------------------构建镜像-------------------------"


PROJECT_NAME=$(git remote  -v | head -1 | awk '{print $2}' |  sed 's/.*\///g' | awk -F '.' '{print $1}')

BRANCH_NAME=$(git symbolic-ref HEAD | cut -d "/" -f 3)

IMAGE_NAME=luojh007/${BRANCH_NAME}

docker build -t luojh007/${BRANCH_NAME} .

echo "---------------------------推送镜像-------------------------"

read -p "请输入dockerHub用户名和密码，用空格隔开：" userName password
docker login -u ${userName} -p ${password}

docker push ${IMAGE_NAME}

cmd="cd ~ && sh deploy.sh ${BRANCH_NAME}"

ssh root@47.100.108.25 "bash -c" \"${cmd}\"