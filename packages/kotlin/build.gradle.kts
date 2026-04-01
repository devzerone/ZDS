plugins {
    kotlin("jvm") version "2.0.21"
    `maven-publish`
}

group = "dev.zerone.zds"
version = System.getenv("PACKAGE_VERSION") ?: "0.0.0-local"

repositories {
    mavenCentral()
}

kotlin {
    jvmToolchain(17)
}

sourceSets {
    main {
        kotlin.srcDirs("components", ".generated")
    }
}

tasks.test {
    enabled = false
}

publishing {
    publications {
        create<MavenPublication>("github") {
            from(components["java"])
            artifactId = "zds-kotlin"
            groupId = "dev.zerone.zds"
        }
    }
    repositories {
        maven {
            name = "GitHubPackages"
            url = uri("https://maven.pkg.github.com/devzerone/ZDS")
            credentials {
                username = System.getenv("GITHUB_ACTOR")
                password = System.getenv("GITHUB_TOKEN")
            }
        }
    }
}
