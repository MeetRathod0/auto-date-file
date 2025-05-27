# Auto-Date-File

[![VS Code Marketplace](https://img.shields.io/visual-studio-marketplace/v/auto-date-file?label=VS%20Code%20Marketplace)](https://marketplace.visualstudio.com/)
[![GitHub](https://img.shields.io/badge/GitHub-MeetRathod0-181717?logo=github)](https://github.com/MeetRathod0)
[![License](https://img.shields.io/github/license/MeetRathod0/auto-date-file)](https://github.com/MeetRathod0/auto-date-file/blob/main/LICENSE)

**Created by [Meet Rathod](https://github.com/MeetRathod0)**

---

## 📌 About

**Auto-Date-File** is a Visual Studio Code extension that automatically creates a dated file when you open a workspace. It also lets you generate additional files manually using a simple shortcut. Ideal for note-taking, journaling, logging, or daily task tracking.

---

## ✨ Features

* 📁 Automatically creates a file once per day on workspace open.
* 🧠 File naming format: `DD-MM-YYYY-1.<extension>`, `DD-MM-YYYY-2.<extension>`, etc.
* 🔧 Supports per-workspace configuration with different file types.
* ⌨️ Create additional files with `Ctrl+D`.
* 💼 Lightweight and simple to use.

---

## ⚙️ Extension Settings 

Add your workspace configurations using the setting key:
`autoDateFile.workspaceSettings`

```json
"autoDateFile.workspaceSettings": [
  "my-space:txt",
  "myworkspace:md",
  "project-reports:log"
]
```

### Format

```
<workspace-folder-name>:<file-extension>
```

Each workspace supports only **one** file extension.

---

## 📁 File Creation Rules

### On Workspace Open

When you open a configured workspace in VS Code for the **first time in a day**, the extension creates:

```
DD-MM-YYYY-1.<extension>
```

Example:

```
27-03-2025-1.md
```

### On Manual Trigger

Press `Ctrl+D` to create additional dated files with incrementing numbers:

```
27-03-2025-2.md
27-03-2025-3.md
...
```

---

## 🧪 Example

If your settings include:

```json
"autoDateFile.workspaceSettings": [
  "notes:md"
]
```

Opening the `notes` folder will create:

* `27-03-2025-1.md` (on open)
* Pressing `Ctrl+D` will add:

  * `27-03-2025-2.md`
  * `27-03-2025-3.md`

---

## 👤 Author

Made with ❤️ by [**Meet Rathod**](https://github.com/MeetRathod0)

---

## 📬 Feedback & Contributions

Found a bug? Have a feature idea?
Feel free to open an issue or pull request at:
👉 [github.com/MeetRathod0/auto-date-file](https://github.com/MeetRathod0/auto-date-file)

---

