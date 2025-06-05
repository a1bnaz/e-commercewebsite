FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY . .

# Make sure the wrapper script is executable
RUN chmod +x ./mvnw

# Use the Maven Wrapper to build your app, skipping tests for speed
RUN ./mvnw clean package -DskipTests

# Run your built jar (replace with your actual jar name)
CMD ["java", "-jar", "target/spring-boot-0.0.1-SNAPSHOT.jar"]
