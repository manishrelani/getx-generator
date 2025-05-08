# 🚀 GetX Generator

![VS Code Version](https://img.shields.io/visual-studio-marketplace/v/ManishRelani.getxgenerator)
<!-- ![Downloads](https://img.shields.io/visual-studio-marketplace/d/ManishRelani.getxgenerator) -->
<!-- ![License](https://img.shields.io/github/license/ManishRelani/getxgenerator) -->

A simple VS Code extension that scaffolds **Binding–Controller–View (BCV)** structure for your Flutter projects using the [GetX](https://pub.dev/packages/get) package.

## 📦 What It Does

Generate a complete folder structure with boilerplate files for a new GetX feature.  
Given a class name like `Home`, it generates:

```
/home/
├── controller/
│   └── home_controller.dart
└── view/
    └── home_screen.dart
```

### `home_controller.dart`
```dart
import 'package:get/get.dart';

class HomeBinding extends Bindings {
  @override
  void dependencies() {
    Get.put(HomeController());
  }
}

class HomeController extends GetxController {}
```

### `home_screen.dart`
```dart
import 'package:get/get.dart';
import 'package:flutter/material.dart';

import '../controller/home_controller.dart';

class HomeScreen extends GetView<HomeController> {
  @override
  Widget build(BuildContext context) {
    return const Placeholder();
  }
}
```

## ✨ Features

- 📁 Creates controller/ and view/ folders automatically
- 🧾 Generates Binding, Controller, and Screen classes
- 🎯 Follows GetX naming conventions (snake_case for files, PascalCase for classes)
- ✅ Supports both context menu and command palette

## 🚀 How to Use

### 📁 Option 1: File Explorer (Right-click)
1. Right-click on a folder in VS Code
2. Select **GetX: Create Binding-Controller-View**
3. Enter your desired class name, e.g. `Login`

### ⌨️ Option 2: Command Palette
1. Open with `Ctrl+Shift+P` or `Cmd+Shift+P`
2. Search: **GetX: Create Binding-Controller-View**
3. Enter your class name

## ✅ Requirements

- VS Code v1.99.0+
- Flutter project using GetX

## 🛠 Installation

Install from the VS Code Marketplace.

Or:

1. Open Extensions (`Ctrl+Shift+X`)
2. Search for: **GetX Generator**
3. Click Install

## 🧑‍💻 Contributing

Feel free to submit issues or pull requests on GitHub.
Suggestions, bug reports, and improvements are welcome!

## 📄 License

This project is licensed under the MIT License.

---

Made with ❤️ by Manish Relani