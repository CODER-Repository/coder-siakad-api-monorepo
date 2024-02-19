module.exports = {
    plugins: ['commitlint-plugin-jira-rules'],
    extends: ['jira'],
    rules: {
        'jira-task-id-project-key' : [2, 'always', 'CSK'],
        'jira-task-id-max-length' : [0, 'always', 35],
        'jira-commit-status-case': [0, 'always', 'lower-case'],
        'jira-task-id-case': [0, 'always', 'upper-case'],
        'jira-task-id-separator' : [2, 'always', '-'],
    }
}