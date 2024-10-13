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
        ruby: 'rb',
        rust: 'rs',
        java: 'java',
        js: 'js',
        go: 'go',
        hs: 'hs',
    },
    compilers: {
        c: 'gcc',
        cpp: 'g++',
        python: 'python',
        ruby: 'ruby',
        rust: 'rustc',
        java: 'javac',
        js: 'node',
        go: 'go',
        hs: 'hs',
    },
    supportedExtensions: [
        'py',
        'cpp',
        'rs',
        'c',
        'java',
        'js',
        'go',
        'hs',
        'rb',
    ],
    skipCompile: ['py', 'js', 'rb'],
};
