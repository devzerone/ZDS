// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "ZDSSwiftUI",
    platforms: [
        .iOS(.v17),
        .macOS(.v14)
    ],
    products: [
        .library(
            name: "ZDSSwiftUI",
            targets: ["ZDSSwiftUI"]
        )
    ],
    targets: [
        .target(
            name: "ZDSSwiftUI",
            path: "components"
        )
    ]
)
