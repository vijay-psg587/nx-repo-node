
ARG FUNCTION_DIR="/var/task"

FROM node:14.18-alpine3.15 as base-build

#Adding required packages for aws lambda ric
RUN apk add tar gzip curl-dev
RUN apk add autoconf m4 python3 automake
RUN apk add g++ make cmake unzip libtool libexecinfo-dev

# Include global arg in this stage of the build
ARG FUNCTION_DIR
ARG APP_NAME=${APP_NAME:-"sq-module"}
ARG APP_DIR=${APP_DIR:-"apps"}
ARG LIB_DIR=${LIB_DIR:-"libs"}
ARG NODE_LOCAL_ENV=${NODE_LOCAL_DEV:-"DEPLOYMENT"}
ENV NODE_LOCAL_ENV=${NODE_LOCAL_ENV}


RUN mkdir -p ${FUNCTION_DIR}/${LIB_DIR}
RUN mkdir -p ${FUNCTION_DIR}/${APP_DIR}/${APP_NAME}
# Let nx build you app -  it has the webpack already installed
COPY ${APP_DIR}/${APP_NAME}/ /${FUNCTION_DIR}/${APP_DIR}/${APP_NAME}/
COPY package*.json /${FUNCTION_DIR}/
COPY tsconfig*.json /${FUNCTION_DIR}/
COPY jest*.* /${FUNCTION_DIR}/
COPY workspace.json /${FUNCTION_DIR}/
COPY nx.json /${FUNCTION_DIR}/
COPY nest-cli.json /${FUNCTION_DIR}/
# THIS HAS TO BE REMOVED
COPY config/ /${FUNCTION_DIR}/

COPY libs/ ${FUNCTION_DIR}/${LIB_DIR}/
COPY dist/ ${FUNCTION_DIR}/dist
RUN ls -la ${FUNCTION_DIR}/

WORKDIR ${FUNCTION_DIR}



FROM node:14.18-alpine3.15 as runtime
#
##Alpine image needs the below for aws-lambda-ric to work
#
##    tar
##    gzip
##    autoconf
##    automake
##    libtool
#
#
## Include global arg in this stage of the build
ARG FUNCTION_DIR
ENV LAMBDA_TASK_ROOT="/var/task"
ENV LAMBDA_RUNTIME_DIR="/var/runtime"
## Create a group and user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
COPY --from=base-build ${FUNCTION_DIR} ${LAMBDA_TASK_ROOT}

WORKDIR ${LAMBDA_TASK_ROOT}
##Create an entry point -  Dont use npx because it is not available by default
ENTRYPOINT [ "/usr/local/bin/npx", "aws-lambda-ric" ]
CMD [ "${LAMBDA_TASK_ROOT}/dist/apps/sq-module/main.lambdaHandler" ]


