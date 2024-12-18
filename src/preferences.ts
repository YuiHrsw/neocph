import { workspace } from 'vscode';
import type { prefSection } from './types';
import fs from 'fs';
import * as vscode from 'vscode';

const getPreference = (section: prefSection): any => {
    const ret = workspace.getConfiguration('cp-tools').get(section);

    console.log('Read preference for ', section, ret);
    return ret;
};

export const updatePreference = (section: prefSection, value: any) => {
    return workspace.getConfiguration('cp-tools').update(section, value);
};

export const getAutoShowJudgePref = (): boolean =>
    getPreference('general.autoShowJudge');

export const getSaveLocationPref = (): string => {
    const pref = getPreference('general.saveLocation');
    const validSaveLocation = pref == '' || fs.existsSync(pref);
    if (!validSaveLocation) {
        vscode.window.showErrorMessage(
            `Invalid save location, reverting to default. path not exists: ${pref}`,
        );
        updatePreference('general.saveLocation', '');
        return '';
    }
    return pref;
};

export const getHideStderrorWhenCompiledOK = (): boolean =>
    getPreference('general.hideStderrorWhenCompiledOK');

export const getIgnoreSTDERRORPref = (): string =>
    getPreference('general.ignoreSTDERROR');

export const getTimeOutPref = (): number =>
    getPreference('general.timeOut') || 3000;

export const getRetainWebviewContextPref = (): boolean =>
    getPreference('general.retainWebviewContext');

export const getCppArgsPref = (): string[] =>
    getPreference('language.cpp.Args').split(' ') || [];

export const getCArgsPref = (): string[] =>
    getPreference('language.c.Args').split(' ') || [];

export const getPythonArgsPref = (): string[] =>
    getPreference('language.python.Args').split(' ') || [];

export const getRustArgsPref = (): string[] =>
    getPreference('language.rust.Args').split(' ') || [];

export const getJavaArgsPref = (): string[] =>
    getPreference('language.java.Args').split(' ') || [];

export const getGoArgsPref = (): string[] =>
    getPreference('language.go.Args').split(' ') || [];

export const getCCommand = (): string =>
    getPreference('language.c.Command') || 'gcc';
export const getCppCommand = (): string =>
    getPreference('language.cpp.Command') || 'g++';
export const getPythonCommand = (): string =>
    getPreference('language.python.Command') || 'python3';
export const getRustCommand = (): string =>
    getPreference('language.rust.Command') || 'rustc';
export const getJavaCommand = (): string =>
    getPreference('language.java.Command') || 'javac';
export const getGoCommand = (): string =>
    getPreference('language.go.Command') || 'go';
