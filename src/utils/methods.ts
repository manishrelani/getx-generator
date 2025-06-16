
import fs from 'fs';
import * as vscode from 'vscode';

export function createDirectoryIfNotExists(dirPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(dirPath)) {
            fs.mkdir(dirPath, { recursive: true }, (err) => (err ? reject(err) : resolve()));
        } else {
            resolve();
        }
    });
}

export async function resolveTargetDirectory(uri?: vscode.Uri): Promise<string | undefined> {
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