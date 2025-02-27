import axios from 'axios';
export async function request(input) {
    let url = input.server_url;
    if (!url.endsWith('/')) {
        url += '/';
    }
    url += 'push';
    const res = await axios.post(url, {
        title: input.title,
        body: input.body,
        device_key: input.device_key,
        category: 'category',
        level: input.level,
        badge: input.badge ?? null,
        automatically_copy: input.automatically_copy ?? null,
        copy: input.copy ?? null,
        sound: input.sound ?? null,
        icon: input.icon ?? null,
        group: input.group ?? null,
        is_archive: input.is_archive ?? null,
        url: input.url ?? input.github_runs_url
    });
    return res.data;
}
