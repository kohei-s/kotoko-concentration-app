FROM openjdk:20

ENV ENVIRONMENT=prod

LABEL maintainer="kicoyuz@gmail.com"

EXPOSE 8080

ADD backend/target/kotokoapp.jar app.jar

CMD [ "sh", "-c", "java -jar /app.jar" ]