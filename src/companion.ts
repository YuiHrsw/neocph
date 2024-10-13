import http from 'http';
import config from './config';
import { Problem, CphSubmitResponse, CphEmptyResponse } from './types';
import { saveProblem } from './parser';
import * as vscode from 'vscode';
import { existsSync } from 'fs';
import { checkUnsupported, isCodeforcesUrl, randomId } from './utils';
import { getJudgeViewProvider } from './extension';
import { words_in_text } from './utilsPure';

const emptyResponse: CphEmptyResponse = { empty: true };
const savedResponse: CphEmptyResponse | CphSubmitResponse = emptyResponse;
const COMPANION_LOGGING = false;

export const setupCompanionServer = () => {
    try {
        const server = http.createServer((req, res) => {
            // const { headers } = req;
            let rawProblem = '';

            req.on('data', (chunk) => {
                COMPANION_LOGGING && console.log('Companion server got data');
                rawProblem += chunk;
            });
            req.on('close', function () {
                try {
                    if (rawProblem == '') {
                        return;
                    }
                    const problem: Problem = JSON.parse(rawProblem);
                    handleNewProblem(problem);
                    COMPANION_LOGGING &&
                        console.log('Companion server closed connection.');
                } catch (e) {
                    vscode.window.showErrorMessage(
                        `Error parsing problem from companion "${e}. Raw problem: '${rawProblem}'"`,
                    );
                }
            });
            res.write(JSON.stringify(savedResponse));
            res.end();
        });
        server.listen(config.port);
        server.on('error', (err) => {
            vscode.window.showErrorMessage(err.message);
        });
        console.log('Companion server listening on port', config.port);
        return server;
    } catch (e) {
        console.error('Companion server error :', e);
    }
};

export const getProblemFileName = (problem: Problem, ext: string) => {
    console.log(isCodeforcesUrl(new URL(problem.url)));

    const words = words_in_text(problem.name);
    if (words === null) {
        return `${problem.name.replace(/\W+/g, '_')}.${ext}`;
    } else {
        return `${words.join('_')}.${ext}`;
    }
};

/** Handle the `problem` sent by Competitive Companion, such as showing the webview, opening an editor, managing layout etc. */
const handleNewProblem = async (problem: Problem) => {
    // If webview may be focused, close it, to prevent layout bug.
    if (vscode.window.activeTextEditor == undefined) {
        getJudgeViewProvider().extensionToJudgeViewMessage({
            command: 'new-problem',
            problem: undefined,
        });
    }
    const folder = vscode.workspace.workspaceFolders?.[0].uri.fsPath;
    if (folder === undefined) {
        vscode.window.showInformationMessage('Please open a folder first.');
        return;
    }
    // const defaultLanguage = getDefaultLangPref();
    // let extn: string;

    // if (defaultLanguage == null) {
    //     const allChoices = new Set(Object.keys(config.extensions));
    //     const userChoices = getMenuChoices();
    //     const choices = userChoices.filter((x) => allChoices.has(x));
    //     const selected = await vscode.window.showQuickPick(choices);
    //     if (!selected) {
    //         vscode.window.showInformationMessage(
    //             'Aborted creation of new file',
    //         );
    //         return;
    //     }
    //     // @ts-ignore
    //     extn = config.extensions[selected];
    // } else {
    //     //@ts-ignore
    //     extn = config.extensions[defaultLanguage];
    // }
    let url: URL;
    try {
        url = new URL(problem.url);
    } catch (err) {
        console.error(err);
        return null;
    }
    if (url.hostname == 'open.kattis.com') {
        const splitUrl = problem.url.split('/');
        problem.name = splitUrl[splitUrl.length - 1];
    }
    // const problemFileName = getProblemFileName(problem, extn);
    // const srcPath = path.join(folder, problemFileName);

    const editor = vscode.window.activeTextEditor;

    if (editor === undefined) {
        checkUnsupported('');
        return;
    }
    const srcPath = editor.document.fileName;
    if (checkUnsupported(srcPath)) {
        return;
    }

    // Add fields absent in competitive companion.
    problem.srcPath = srcPath;
    problem.tests = problem.tests.map((testcase) => ({
        ...testcase,
        id: randomId(),
    }));
    if (!existsSync(srcPath)) {
        vscode.window.showErrorMessage(`File ${srcPath} does not exist.`);
        return;
    }
    saveProblem(srcPath, problem);
    const doc = await vscode.workspace.openTextDocument(srcPath);

    // if (defaultLanguage) {
    //     const templateLocation = getDefaultLanguageTemplateFileLocation();
    //     if (templateLocation !== null) {
    //         const templateExists = existsSync(templateLocation);
    //         if (!templateExists) {
    //             vscode.window.showErrorMessage(
    //                 `Template file does not exist: ${templateLocation}`,
    //             );
    //         } else {
    //             const templateContents =
    //                 readFileSync(templateLocation).toString();
    //             writeFileSync(srcPath, templateContents);
    //         }
    //     }
    // }

    await vscode.window.showTextDocument(doc, vscode.ViewColumn.One);
    getJudgeViewProvider().extensionToJudgeViewMessage({
        command: 'new-problem',
        problem,
    });
};
