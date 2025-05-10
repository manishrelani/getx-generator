import { CodeAction, CodeActionKind, CodeActionProvider, window } from "vscode";

export class WrapWithActionProvider implements CodeActionProvider {
    provideCodeActions(): CodeAction[] {


        const editor = window.activeTextEditor;
        if (!editor) {
            return [];
        }

        return [
            {
                command: "extension.wrap-obx-builder",
                title: "Wrap with ObxBuilder",
            },
            {
                command: "extension.wrap-obx",
                title: "Wrap with Obx",
            },
            {
                command: "extension.wrap-get-builder",
                title: "Wrap with GetBuilder",
            }

        ].map((c) => {
            const action = new CodeAction(c.title, CodeActionKind.Refactor);
            action.command = {
                command: c.command,
                title: c.title,
            };
            return action;
        });


    }
}