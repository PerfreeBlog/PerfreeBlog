FROM openjdk:8-jre-alpine
VOLUME /tmp
ENV LANG en_US.UTF-8
RUN apk add --update ttf-dejavu fontconfig && rm -rf /var/cache/apk/*
ARG PACKAGE_FILE
COPY ${PACKAGE_FILE} app.tar.gz
RUN tar -zxvf app.tar.gz
RUN mv perfree-web/* /
RUN rm -rf perfree-web
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/perfree-web.jar"]