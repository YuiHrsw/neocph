# neocph user guide

This document contains instructions on how to use this extension.

## UI explained

![Basic Usage](img/user-guide-image.png)

This image is outdated. Please refer to README for an updated UI. The button
actions remain the same.

## Usage

1. Open any folder in VS Code (Menu>File>Open Folder).

2. Write some code in any supported language ( .cpp, .c, .rs, .python).

3. Launch the extension: Press `Ctrl+R` to run them. Or, use the 'Run
   Testcases' button from the activity bar ( in the bottom).

4. Enter your testcases in the window opened to the side.

5. Then, you can run them.

## Use Competitive Companion to parse testcases

1. Install [Competitive Companion](https://github.com/jmerle/competitive-companion#readme)
   browser extension in your browser, using the instructions given in the link.

2. Use Companion by pressing the green plus (+) circle from the browser toolbar
   when visiting any problem page.

    ![Activate Companion](img/activate-companion.png)

## Environment

-   For C++, `DEBUG` is defined as a `#define` directive.

## Customizing preferences

Several options are available to customize the extension. Open VS Code settings
(From the gear icon on bottom-left) and go to the
'competitive-programming-helper' section. You can choose several settings like:

![Preferences](img/settings2.png)

### General Settings

\
![Preferences](img/generalSettings.png)

-   Default save location for generated meta-data.
-   Default language selected for new problems imported via Competitive
    Companion.
-   Language choices offered in menu when new problem imported via Competitive
    Companion.
-   Timeout for testcases.

### Language Settings (for each language)

\
![Preferences](img/languageSettings.png)

-   Additional compilation flags.
-   [Python] Command used to run python files. For eg. py, python3, pypy3, etc.

## Getting help

If you have trouble using the extension, find any bugs, or want to request a new
feature, please create an issue [here](https://github.com/YuiHrsw/neocph/issues).
