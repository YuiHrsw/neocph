/* eslint no-var: off */
import TelemetryReporter from '@vscode/extension-telemetry';
import * as vscode from 'vscode';

/** Valid name for a VS Code preference section for the extension */
export type prefSection =
    | 'general.saveLocation'
    | 'general.defaultLanguage'
    | 'general.timeOut'
    | 'general.hideStderrorWhenCompiledOK'
    | 'general.ignoreSTDERROR'
    | 'general.firstTime'
    | 'general.useShortCodeForcesName'
    | 'general.menuChoices'
    | 'language.c.Args'
    | 'language.c.Command'
    | 'language.cpp.Args'
    | 'language.cpp.Command'
    | 'language.go.Args'
    | 'language.go.Command'
    | 'language.rust.Args'
    | 'language.rust.Command'
    | 'language.java.Args'
    | 'language.java.Command'
    | 'language.js.Args'
    | 'language.js.Command'
    | 'language.python.Args'
    | 'language.python.Command'
    | 'language.ruby.Args'
    | 'language.ruby.Command'
    | 'language.haskell.Args'
    | 'language.haskell.Command'
    | 'general.retainWebviewContext'
    | 'general.autoShowJudge'
    | 'general.defaultLanguageTemplateFileLocation';

export type Language = {
    name: LangNames;
    compiler: string;
    args: string[];
    skipCompile: boolean;
};

export type LangNames =
    | 'python'
    | 'ruby'
    | 'c'
    | 'cpp'
    | 'rust'
    | 'java'
    | 'js'
    | 'go'
    | 'hs';

export type TestCase = {
    input: string;
    output: string;
    id: number;
};

export type Problem = {
    name: string;
    url: string;
    interactive: boolean;
    memoryLimit: number;
    timeLimit: number;
    group: string;
    tests: TestCase[];
    srcPath: string;
    local?: boolean;
};

export type Case = {
    id: number;
    result: RunResult | null;
    testcase: TestCase;
};

export type Run = {
    stdout: string;
    stderr: string;
    code: number | null;
    signal: string | null;
    time: number;
    timeOut: boolean;
};

export type RunResult = {
    pass: boolean | null;
    id: number;
} & Run;

export type WebviewMessageCommon = {
    problem: Problem;
};

export type RunSingleCommand = {
    command: 'run-single-and-save';
    id: number;
} & WebviewMessageCommon;

export type RunAllCommand = {
    command: 'run-all-and-save';
} & WebviewMessageCommon;

export type OnlineJudgeEnv = {
    command: 'online-judge-env';
    value: boolean;
};

export type KillRunningCommand = {
    command: 'kill-running';
} & WebviewMessageCommon;

export type SaveCommand = {
    command: 'save';
} & WebviewMessageCommon;

export type DeleteTcsCommand = {
    command: 'delete-tcs';
} & WebviewMessageCommon;

export type GetInitialProblem = {
    command: 'get-initial-problem';
};

export type CreateLocalProblem = {
    command: 'create-local-problem';
};

export type OpenUrl = {
    command: 'url';
    url: string;
};

export type WebviewToVSEvent =
    | RunAllCommand
    | GetInitialProblem
    | CreateLocalProblem
    | RunSingleCommand
    | KillRunningCommand
    | SaveCommand
    | DeleteTcsCommand
    | OnlineJudgeEnv
    | OpenUrl;

export type RunningCommand = {
    command: 'running';
    id: number;
} & WebviewMessageCommon;

export type NotRunningCommand = {
    command: 'not-running';
};

export type ResultCommand = {
    command: 'run-single-result';
    result: RunResult;
} & WebviewMessageCommon;

export type CompilingStartCommand = {
    command: 'compiling-start';
};

export type CompilingStopCommand = {
    command: 'compiling-stop';
};

export type RunAllInWebViewCommand = {
    command: 'run-all';
};

export type NewProblemCommand = {
    command: 'new-problem';
    problem: Problem | undefined;
};

export type RemoteMessageCommand = {
    command: 'remote-message';
    message: string;
};

export type VSToWebViewMessage =
    | ResultCommand
    | RunningCommand
    | RunAllInWebViewCommand
    | CompilingStartCommand
    | CompilingStopCommand
    | NotRunningCommand
    | RemoteMessageCommand
    | NewProblemCommand;

export type CphEmptyResponse = {
    empty: true;
};

export type CphSubmitResponse = {
    url: string;
    empty: false;
    problemName: string;
    sourceCode: string;
    languageId: number;
};

export type WebViewpersistenceState = {
    dialogCloseDate: number;
};

declare global {
    var reporter: TelemetryReporter;
    var context: vscode.ExtensionContext;
    var remoteMessage: string | undefined;
}
