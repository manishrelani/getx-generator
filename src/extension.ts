// extension.ts
import * as fs from 'fs';
import * as path from 'path';
import * as changeCase from 'string-ts';
import * as vscode from 'vscode';
import { wrapWithObx, wrapWithObxBuilder } from "./commands/widget_wrapper";
import { WrapWithActionProvider } from "./utils/provider";

export function activate(context: vscode.ExtensionContext) {
	console.log('Folder Generator Extension is now active!');

	const generateBCVCommand = vscode.commands.registerCommand(
		'extension.genereteBCV',
		async (uri?: vscode.Uri) => {
			const className = await promptForClassName();
			if (!className) return;

			const targetDir = await resolveTargetDirectory(uri);
			if (!targetDir) return;

			try {
				await generateBCVStructure(targetDir, className);
				vscode.window.showInformationMessage(`Generated folder structure for ${className}`);
			} catch (error) {
				vscode.window.showErrorMessage(`Error: ${error}`);
			}
		}
	);



	const wrapObxBuilderCommand = vscode.commands.registerCommand("extension.wrap-obx-builder", wrapWithObxBuilder);
	const wrapObxCommand = vscode.commands.registerCommand("extension.wrap-obx", wrapWithObx);

	const wrapActionProvider = vscode.languages.registerCodeActionsProvider(
		{ language: 'dart', scheme: 'file' },
		new WrapWithActionProvider()
	);


	context.subscriptions.push(
		generateBCVCommand,
		wrapObxBuilderCommand,
		wrapObxCommand,
		wrapActionProvider,
	);

}

async function promptForClassName(): Promise<string | undefined> {
	return vscode.window.showInputBox({
		placeHolder: 'Enter class name (e.g. Home)',
		prompt: 'This will generate controller and view folders with corresponding files',
	});
}

async function resolveTargetDirectory(uri?: vscode.Uri): Promise<string | undefined> {
	if (uri && fs.statSync(uri.fsPath).isDirectory()) {
		return uri.fsPath;
	}

	const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
	if (!workspaceFolder) {
		vscode.window.showErrorMessage('No workspace folder open!');
		return;
	}

	return workspaceFolder.uri.fsPath;
}

async function generateBCVStructure(basePath: string, className: string) {
	const baseDir = path.join(basePath, className.toLowerCase());
	await createDirectoryIfNotExists(baseDir);

	const controllerDir = path.join(baseDir, 'controller');
	const viewDir = path.join(baseDir, 'view');

	await createDirectoryIfNotExists(controllerDir);
	await createDirectoryIfNotExists(viewDir);

	await generateControllerFile(controllerDir, className);
	await generateViewFile(viewDir, className);
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

class ${pascalCase}Controller extends GetxController {}
`;

	const filePath = path.join(dir, `${snakeCase}_controller.dart`);
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
  @override
  Widget build(BuildContext context) {
    return const Placeholder();
  }
}
`;

	const filePath = path.join(dir, `${snakeCase}_screen.dart`);
	fs.writeFileSync(filePath, content.trim());
}

function createDirectoryIfNotExists(dirPath: string): Promise<void> {
	return new Promise((resolve, reject) => {
		if (!fs.existsSync(dirPath)) {
			fs.mkdir(dirPath, { recursive: true }, (err) => (err ? reject(err) : resolve()));
		} else {
			resolve();
		}
	});
}

export function deactivate() { }
