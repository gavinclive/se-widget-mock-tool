# StreamElements Widget Mocking Tool
---
![License](https://img.shields.io/github/license/gavinclive/se-widget-mock-tool)
![Version](https://img.shields.io/github/v/release/gavinclive/se-widget-mock-tool)

The **StreamElements Widget Mocking Tool** is a development utility designed to help developers create and test StreamElements widgets locally. Initially focused on chat widgets, this tool allows for the development and testing of widgets within a local environment, making it easier to iterate quickly without needing to deploy changes or rely on live environments. The tool also welcomes community contributions for mocking other events.

## 🚀 Features
- **Local Development**: Place your widgets inside the project and develop them locally without the need to deploy.
- **Event Mocking**: Initially supports chat widget events, open for contributions to add support for more events and features.
- **Fields Ready**: Custom variables are fully integrated with a dedicated control panel.

## ❓ Why This Project?
I built this tool because I wanted a better way to develop and test StreamElements widgets locally. I'm excited to see how the community can extend and improve this tool. Happy coding!

## 💻 Getting Started
### 📋 Prerequisites
- **Node.js**: Make sure you have Node.js installed on your machine. You can download it from [Node.js](https://nodejs.org).
- **Yarn**: Yarn is required to install dependencies. You can install Yarn by following the instructions [here](https://yarnpkg.com/getting-started/install).

### ⚙️ Installation
1. **Clone the Repository**:
```sh
git clone https://github.com/gavinclive/se-widget-mock-tool.git
cd se-widget-mock-tool
```

2. **Install Dependencies**:
```sh
yarn
```

3. **Run the Development Server**:
```sh
yarn dev
```

4. **Access the Tool**:
Open your browser and go to `http://localhost:5173` to start developing and testing your widgets.

## 📖 Usage
1. **Place Your Widget**:
Place your widget files (e.g., JavaScript, CSS, HTML, JSON) inside the `src/widget` directory within the project.

2. **Mock Events**:
The tool currently supports mocking chat widget events. You can extend or modify the mocked events according to your needs. The tool provides a UI to trigger various mock events, which will then interact with your widget as if they were real events from StreamElements.

3. **🔄 Manual Browser Refresh**:
Even though hot reload is enabled, some changes might still require a manual refresh in the browser to see the updates.

4. **🔧 Customizing and Extending**:
- The tool is open to customization and extensions. If you want to mock other events (e.g., community alerts, donation alerts), you can contribute by adding the necessary code to handle these events.
- Contributions from the community are welcome! See the [Contributing](#contributing) section for more details.

## 🗂️ File Structure
```
se-widget-mock-tool/
│
├── public/
│   ├── favicon.ico         # Favicon
│   ├── widget.js           # Transformed widget JavaScript file
│   └── widget.css          # Transformed widget CSS file
│
├── server/
│   └── index.js            # Server-side logic for updating widget's configuration JSON file
│
├── src/
│   ├── components/         # Vue components for the tool
│   │   ├── MockMenu.vue    # Component for the mock menu
│   │   └── SettingPanel.vue# Component for the setting panel
│   │
│   ├── plugins/            # Vite plugins
│   │   └── dynamicFileReplacementPlugin.js # Custom plugin for file replacement
│   │
│   ├── utils/              # Utility functions
│   │   ├── html.js         # HTML utilities
│   │   └── index.js        # General utilities
│   │
│   └── widget/             # Place your widget files here
│       ├── widget.js       # Your widget's JavaScript file
│       ├── widget.css      # Your widget's CSS file
│       ├── widget.html     # Your widget's HTML file
│       └── widget.json     # Your widget's configuration JSON file
│
├── .gitignore              # Git ignore rules
├── .eslintrc.cjs           # ESLint configuration
├── index.html              # Entry HTML file
├── jsconfig.json           # JavaScript configuration
├── package.json            # Project metadata and dependencies
├── postcss.config.js       # PostCSS configuration
├── README.md               # This readme file
├── style.css               # Global styles
├── tailwind.config.js      # Tailwind CSS configuration
├── vite.config.js          # Vite configuration
└── yarn.lock               # Yarn lock file for dependencies

```

## 🤝 Contributing
We welcome contributions from the community! Whether you want to add support for new events, improve existing functionality, or fix bugs, your help is appreciated.
1. **Fork the Repository**: Start by forking the repository to your GitHub account.
2. **Create a Branch**: Create a new branch for your feature or bug fix.
```sh
git checkout -b feature/your-feature-name
```
3. **Make Your Changes**: Develop your feature or fix in your branch.
4. **Commit Your Changes**: Commit your changes with a meaningful commit message.
```sh
git commit -m "feature: description of your feature"
```
5. **Push to Your Fork**:
```sh
git push origin feature/your-feature-name
```
6. **Create a Pull Request**: Open a pull request to merge your changes into the main repository. Please provide a detailed description of your changes and the reasoning behind them.

## ✉️ Contact
If you have any questions, suggestions, or feedback, feel free to open an issue or contact me directly through GitHub.