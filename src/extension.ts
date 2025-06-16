// extension.ts

import * as vscode from 'vscode';
import { generateBCVStructure } from './commands/bvc_folder_structure';
import { generateFeatureStructure } from './commands/feature_structure';
import * as widgetWrapper from "./commands/widget_wrapper";
import { WrapWithActionProvider } from "./utils/provider";

export function activate(context: vscode.ExtensionContext) {
	console.log('Folder Generator Extension is now active!');

	const generateBCVCommand = vscode.commands.registerCommand(
		'extension.genereteBCV',
		generateBCVStructure
	);

	const generateFeatureCommand = vscode.commands.registerCommand(
		'extension.genereteFeatureFolder',
		generateFeatureStructure);



	const wrapObxBuilderCommand = vscode.commands.registerCommand("extension.wrap-obx-builder", widgetWrapper.wrapWithObxBuilder);
	const wrapObxCommand = vscode.commands.registerCommand("extension.wrap-obx", widgetWrapper.wrapWithObx);
	const wrapGetBuilderCommand = vscode.commands.registerCommand("extension.wrap-get-builder", widgetWrapper.wrapWithGetBuilder);

	const wrapActionProvider = vscode.languages.registerCodeActionsProvider(
		{ language: 'dart', scheme: 'file' },
		new WrapWithActionProvider()
	);


	context.subscriptions.push(
		generateBCVCommand,
		generateFeatureCommand,
		wrapObxBuilderCommand,
		wrapObxCommand,
		wrapGetBuilderCommand,
		wrapActionProvider,
	);

}





export function deactivate() { }
