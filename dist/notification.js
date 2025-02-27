import * as github from '@actions/github';
export function generateNotification(input) {
    const { repo, owner } = github.context.repo;
    const { runId } = github.context;
    const url = `${input.github_server_url}/${owner}/${repo}/actions/runs/${runId.toString()}`;
    let status_word;
    if (input.status === 'success')
        status_word = 'succeeded';
    else if (input.status === 'failure')
        status_word = 'failed';
    else
        status_word = 'is cancelled';
    const title = input.title ?? 'Github Actions';
    const body = input.body ??
        `Actions #${github.context.runNumber.toString()} on ${repo} ${status_word}`;
    return {
        title,
        body,
        github_runs_url: url
    };
}
