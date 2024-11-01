/**
 * Contains common configurations for use by the extension. Not modifiable by
 * the user.
 */

export default {
    telemetryKey: '',
    port: 27121, // companion listener server
    timeout: 10000, // for a testcase run
    extensions: {
        c: 'c',
        cpp: 'cpp',
        python: 'py',
        rust: 'rs',
        java: 'java',
        go: 'go',
    },
    compilers: {
        c: 'gcc',
        cpp: 'g++',
        python: 'python',
        rust: 'rustc',
        java: 'javac',
        go: 'go',
    },
    supportedExtensions: [
        'py',
        'cpp',
        'rs',
        'c',
        'java',
        'go',
    ],
    skipCompile: ['py', 'js', 'rb'],
};
