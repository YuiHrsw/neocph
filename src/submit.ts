/** Get the problem name ( like 144C ) for a given Codeforces URL string. */
export const getProblemName = (problemUrl: string): string => {
    const parts = problemUrl.split('/');
    let problemName: string;

    if (parts.find((x) => x == 'contest')) {
        // Url is like https://codeforces.com/contest/1398/problem/C
        problemName = parts[parts.length - 3] + parts[parts.length - 1];
    } else {
        // Url is like https://codeforces.com/problemset/problem/1344/F
        problemName = parts[parts.length - 2] + parts[parts.length - 1];
    }

    return problemName;
};
