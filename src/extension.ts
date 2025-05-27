import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "autoDateFile.createNewDateFile",
    () => {
      createDateFileIfAllowed();
    }
  );

  context.subscriptions.push(disposable);

  // On startup, create file only if no date file exists
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (workspaceFolders && workspaceFolders.length > 0) {
    const workspaceFolder = workspaceFolders[0];
    const workspacePath = workspaceFolder.uri.fsPath;
    const datePrefix = getDatePrefix();

    const existingFiles = fs
      .readdirSync(workspacePath)
      .filter((file) => file.startsWith(datePrefix));
    if (existingFiles.length === 0) {
      createDateFileIfAllowed(); // only run once
    }
  }
}

function createDateFileIfAllowed() {
  const workspaceFolders = vscode.workspace.workspaceFolders;

  if (!workspaceFolders || workspaceFolders.length === 0) {
    vscode.window.showInformationMessage(
      "Auto Date File: Open a folder first."
    );
    return;
  }

  const workspaceFolder = workspaceFolders[0];
  const workspaceName = workspaceFolder.name;

  const config = vscode.workspace.getConfiguration("autoDateFile");
  const allowedWorkspaces: string[] = config.get("allowedWorkspaces") || [];
  const workSpaceExt = Object.fromEntries(
    allowedWorkspaces.map((item) => {
      const [key, value] = item.split(":");
      return [key.trim(), value.trim()];
    })
  );

  const listWorkSpace = Object.keys(workSpaceExt) || [];
  if (!listWorkSpace.includes(workspaceName)) {
    vscode.window.showInformationMessage(
      `Auto Date File: Workspace "${workspaceName}" not allowed.`
    );
    return;
  }

  const ext =
    Object.keys(workSpaceExt).length > 0
      ? workSpaceExt[workspaceName] || "txt"
      : "txt";

  const workspacePath = workspaceFolder.uri.fsPath;
  const datePrefix = getDatePrefix();

  let counter = 1;
  let fileName = `${datePrefix}-${counter}.${ext}`;
  let filePath = path.join(workspacePath, fileName);

  while (fs.existsSync(filePath)) {
    counter++;
    fileName = `${datePrefix}-${counter}.${ext}`;
    filePath = path.join(workspacePath, fileName);
  }

  fs.writeFileSync(filePath, "");
  vscode.workspace.openTextDocument(filePath).then((doc) => {
    vscode.window.showTextDocument(doc);
  });
}

function getDatePrefix(): string {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

export function deactivate() {}