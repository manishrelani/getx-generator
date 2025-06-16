
import * as path from 'path';
import * as vscode from 'vscode';
import * as methods from '../utils/methods';



export async function generateFeatureStructure(uri?: vscode.Uri) {
    try {

        const featureName = await vscode.window.showInputBox({
            placeHolder: 'Enter feature name',
            prompt: 'This will generate a folder structure for the feature',
        });

        if (!featureName) {
            return;
        }

        const targetDir = await methods.resolveTargetDirectory(uri);
        if (!targetDir) return;


        const baseDir = path.join(targetDir, featureName);

        const folderNames = [];

        const generatePresentation = await vscode.window.showQuickPick(['Yes', 'No'], {
            placeHolder: 'Do you want to generate presentation layer?',
        });
        if (generatePresentation === 'Yes') {
            folderNames.push('presentation');
        }

        const generateDomain = await vscode.window.showQuickPick(['Yes', 'No'], {
            placeHolder: 'Do you want to generate domain layer?',
        });
        if (generateDomain === 'Yes') {
            folderNames.push('domain');
        }

        const generateData = await vscode.window.showQuickPick(['Yes', 'No'], {
            placeHolder: 'Do you want to generate data layer?',
        });
        if (generateData === 'Yes') {
            folderNames.push('data');
        }


        folderNames.forEach(async (folderName) => {
            const dirPath = path.join(baseDir, folderName);
            await methods.createDirectoryIfNotExists(dirPath);
        });

        vscode.window.showInformationMessage(`Generated folder structure for ${featureName}`);
    } catch (error) {
        vscode.window.showErrorMessage(`Error: ${error}`);
    }
}