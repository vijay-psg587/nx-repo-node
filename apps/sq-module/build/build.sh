#! /bin/bash

#echo "### Starting the build"
#
#ENV_DEV="dev"
#ENV_PROD="PROD"
#
#input_param_validate_fn() {
#    echo 'Number of parameters should be atleast 1. No value is passed'
#    exit 1
#}
#
#common_err_fn() {
#    echo 'Error occured ${1:- Unknown error}'
#    exit 1
#}
#
#build_fn() {
#    echo '###Getting value for build'
#
#        npm run build:sq-module
#
#}
#
#echo '### First installing the dependancies'
## npm install
#
#echo '### Now building the artifact'
# if [ '$#' ne 1 ]
# then
#     input_param_validate_fn
# else
#     echo '### Calling the build function'
#     echo '${NODE_ENV}'
#    build_fn
# fi
#
#echo '### Creating target folder and copying'
#
#if [ -d 'target' ]
#then
#    rm -rf target/
#    mkdir -p target
#else
#    mkdir target
#fi
#
#cp package*.json target/
#cp -r dist/ target/
#cp -r build target/sq-module/build
#
#
#echo '###Completed'
echo '###Starting build and generating docker###'
BUILD_ENV_DEV=dev
BUILD_ENV_PROD=prod
BUILD_ENV_TEST=test
IMG_NAME_DEF=sq-module-img
IMG_TAG_DEF=latest

validate_fail_no_params() {
  echo "###Requires only one param, but provided '$#' params ###"
  exit 1
}

build_sq() {
  echo "###Getting the input -  '$1'###"
  npm run prebuild:sq-module
  npm install aws-lambda-ric
  export NODE_LOCAL_ENV=$1
  # create a nx webpack build
  npm run build:nx:sq-module
  #Initiate docker build now
  docker build -t $IMG_NAME_DEF:$IMG_TAG_DEF --build-arg NODE_LOCAL_ENV=$NODE_LOCAL_ENV -f ./apps/sq-module/build/docker/Dockerfile .
}

env_val() {
  echo "###Provide either 'dev' or 'prod' as environment variable values ###"
  exit 1
}
# IMP it should have atleast one command line param
if [ -z $1 ];then
  validate_fail_no_params $@
elif [ $# -gt "1" ]; then
  validate_fail_no_params $@
else
  #Idea is to  create the environment variable and then call the necessary npm run script in docker
  # Calling the docker appropriately
  if [ -n $1 ]; then
    echo "###Printing input variable '$1' ###"
    if [ $1 = "$BUILD_ENV_DEV" ]; then
      #Docker build for local
      echo "###Initiating build for DEV/TEST###"
      export BUILD_ENV_VAR=${BUILD_ENV_DEV}
      build_sq $BUILD_ENV_VAR
    elif [ $1 = "$BUILD_ENV_PROD" ] || [ $1 = "$BUILD_ENV_TEST"]; then
      #Docker build for prod -  For now both builds have same execution steps -  modify according to needs
      echo "###Initiating build for PROD###"
      export BUILD_ENV_VAR=${BUILD_ENV_PROD}
      build_sq $BUILD_ENV_VAR
    else
      echo "Cannot create docker image"
    fi
  else
    echo "final else"
  fi
fi

echo '###Completed###'
