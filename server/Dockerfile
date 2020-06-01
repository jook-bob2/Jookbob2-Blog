# Start with a base image containing Java runtime
FROM openjdk:8-jdk-alpine

# Add Author info
MAINTAINER Jinseok Kim"qwefk123@naver.com"

# Add a volume to /tmp
VOLUME /var/lib/datas

# Make port 8080 available to the world outside this container
EXPOSE 8081

# The application's jar file
ARG JAR_FILE=build/libs/*.jar

# Add the application's jar to the container
COPY ${JAR_FILE} app.jar

# Run the jar file
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]
