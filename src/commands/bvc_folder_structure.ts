
import * as fs from 'fs';
import * as path from 'path';
import * as changeCase from 'string-ts';
import * as vscode from 'vscode';
import * as methods from '../utils/methods';

export async function generateBCVStructure(uri?: vscode.Uri) {
    const data = await promptForClassName();
    if (!data) return;

    const targetDir = await methods.resolveTargetDirectory(uri);
    if (!targetDir) return;

    try {
        await generateStructure(targetDir, data.className, data.isControllerRequired, data.isArgumentModelRequired);
        vscode.window.showInformationMessage(`Generated folder structure for ${data.className}`);
    } catch (error) {
        vscode.window.showErrorMessage(`Error: ${error}`);
    }
}

async function promptForClassName(): Promise<{ className: string, isControllerRequired: boolean, isArgumentModelRequired: boolean } | undefined> {
    const className = await vscode.window.showInputBox({
        placeHolder: 'Enter class name (e.g. Home)',
        prompt: 'This will generate controller and view folders with corresponding files',
    });

    if (!className) {
        return;
    }



    const isControllerRequired = await vscode.window.showQuickPick(['Yes', 'No'], {
        placeHolder: 'Do you want to generate a controller?',
    });

    if (!isControllerRequired) {
        return;
    }

    if (isControllerRequired === 'No') {
        return { className: className, isControllerRequired: false, isArgumentModelRequired: false };
    }


    const isArgumentModelRequired = await vscode.window.showQuickPick(['Yes', 'No'], {
        placeHolder: 'Do you want to generate an argument model?',
        canPickMany: false,



    });

    if (!isArgumentModelRequired) {
        return;
    }

    return {
        className: className,
        isControllerRequired: isControllerRequired === 'Yes',
        isArgumentModelRequired: isArgumentModelRequired === 'Yes',
    };


}



async function generateStructure(basePath: string, className: string, isControllerRequired: boolean, isArgumentModelRequired: boolean) {
    const snackClassName = changeCase.snakeCase(className);
    const baseDir = path.join(basePath, snackClassName);
    await methods.createDirectoryIfNotExists(baseDir);

    const viewDir = path.join(baseDir, 'view');
    await methods.createDirectoryIfNotExists(viewDir);
    await generateViewFile(viewDir, className);


    if (isControllerRequired) {
        const controllerDir = path.join(baseDir, 'controller');
        await methods.createDirectoryIfNotExists(controllerDir);
        await generateControllerFile(controllerDir, className);
    }

    if (isArgumentModelRequired) {
        const argumentModelDir = path.join(baseDir, 'model');
        await methods.createDirectoryIfNotExists(argumentModelDir);
        await generateModelFile(argumentModelDir, className);
    }


}

async function generateModelFile(dir: string, className: string) {
    const snakeCase = changeCase.snakeCase(className);
    const pascalCase = changeCase.pascalCase(className);
    const content = `
		class ${pascalCase}Argument {

			//TODO: Define your model properties here
			const ${pascalCase}Argument();
		}
	`;
    const filePath = path.join(dir, `${snakeCase}_argument.dart`);
    fs.writeFileSync(filePath, content.trim());
}

async function generateControllerFile(dir: string, className: string) {

    const snakeCase = changeCase.snakeCase(className);
    const pascalCase = changeCase.pascalCase(className);

    const content = `
import 'package:get/get.dart';

		class ${pascalCase}Binding extends Bindings {
			@override
			void dependencies() {
				Get.put(${pascalCase}Controller());
			}
		}

		class ${pascalCase}Controller extends GetxController { }
		`;

    const filePath = path.join(dir, `${snakeCase} _controller.dart`);
    fs.writeFileSync(filePath, content.trim());
}

async function generateViewFile(dir: string, className: string) {
    const snakeCase = changeCase.snakeCase(className);
    const pascalCase = changeCase.pascalCase(className);

    const content = `
import 'package:get/get.dart';
import 'package:flutter/material.dart';
import '../controller/${className.toLowerCase()}_controller.dart';

class ${pascalCase}Screen extends GetView<${pascalCase}Controller> {
const ${pascalCase} Screen({super.key});
    @override
        Widget build(BuildContext context) {
		return const Placeholder();
	}
}
	`;

    const filePath = path.join(dir, `${snakeCase} _screen.dart`);
    fs.writeFileSync(filePath, content.trim());
}