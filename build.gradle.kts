import com.github.gradle.node.yarn.task.YarnTask
import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    id("org.springframework.boot") version "3.1.2"
    id("io.spring.dependency-management") version "1.1.2"
    kotlin("jvm") version "1.9.0"
    kotlin("plugin.spring") version "1.9.0"

    id("com.github.node-gradle.node") version "7.0.0"
}

group = "org.dndbase"
version = "0.0.1-SNAPSHOT"

java {
    sourceCompatibility = JavaVersion.VERSION_17
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-validation")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("io.github.microutils:kotlin-logging:3.0.5")
    implementation("org.slf4j:slf4j-api:2.0.7")
    implementation("ch.qos.logback:logback-classic:1.4.11")
    implementation("com.google.guava:guava:32.1.2-jre")
    implementation("org.apache.commons:commons-csv:1.10.0")
    implementation("com.github.vladimir-bukhtoyarov:bucket4j-core:7.6.0")

    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("io.strikt:strikt-core:0.34.1")

}

tasks.withType<KotlinCompile> {
    kotlinOptions {
        freeCompilerArgs += "-Xjsr305=strict"
        jvmTarget = "17"
    }
}

tasks.withType<Test> {
    useJUnitPlatform()
}

node {
    // download nodeJS if it's not present on the system
    download = true
    // specify the root directory for our client project (where "package.json" is located)
    nodeProjectDir = file("${project.projectDir}/client")
}

val buildClient = tasks.create<YarnTask>("buildClient") {
    // to build the client, the only argument we need to pass to "yarn" is the task
    // name to execute, which is "build". The final command will therefore be:
    //
    // yarn build
    //
    args = listOf("build")
}

tasks.bootJar.configure {
    dependsOn += buildClient
    this.metaInf {
        from("${project.projectDir}/client/build")
        into("resources")
    }
}
