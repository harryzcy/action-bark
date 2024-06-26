# action-bark

Allow GitHub Actions to push iOS notifications via Bark

## Quick Start

```yaml
steps:
  - uses: harryzcy/action-bark@v1
    with:
        status: ${{ job.status }}
        device_key: ${{ secrets.BARK_DEVICE_KEY }}
        bark_server_url: ${{ secrets.BARK_SERVER_URL }}
    if: always() # Pick up events even if the job fails or is canceled.
```

## Advanced Usage

More controls over notifications:

```yaml
steps:
  - uses: harryzcy/action-bark@v1
    with:
        status: ${{ job.status }}
        on_status: failure, cancelled # only run on these status
        device_key: ${{ secrets.BARK_DEVICE_KEY }}
        level: passive # iOS notification level 'active', 'timeSensitive' or 'passive', default to 'active'
        bark_server_url: ${{ secrets.BARK_SERVER_URL }}
    if: always() # Pick up events even if the job fails or is canceled.
```

Custom title and body:

```yaml
steps:
  - uses: harryzcy/action-bark@v1
    with:
        status: ${{ job.status }}
        title: custom title
        body: custom body
        device_key: ${{ secrets.BARK_DEVICE_KEY }}
        level: passive # iOS notification level 'active', 'timeSensitive' or 'passive', default to 'active'
        bark_server_url: ${{ secrets.BARK_SERVER_URL }}
    if: always() # Pick up events even if the job fails or is canceled.
```

## Github Enterprise Users

```yaml
steps:
  - uses: harryzcy/action-bark@v1
    with:
        status: ${{ job.status }}
        device_key: ${{ secrets.BARK_DEVICE_KEY }}
        bark_server_url: ${{ secrets.BARK_SERVER_URL }}
        github_server_url: https://your.ghe.com # Specify your GHE
    if: always() # Pick up events even if the job fails or is canceled.
```

## Inputs

| Input | Description | Required |
| ----- | ----------- | -------- |
| `title` | Specify a custom title of the notification, required if status is set to custom | false |
| `body` | Specify a custom body of the notification, required if status is set to custom | false |
| `device_key` | Specify Bark device key of your device | true |
| `level` | Specify iOS notification level (default: active) | false |
| `badge` | The number displayed next to App icon | false |
| `automatically_copy` | Automatically copy the content to the clipboard (must be "1" if set) | false |
|`copy` | The content to be copied to the clipboard | false |
|`sound` | Sound to be played, value from <https://github.com/Finb/Bark/tree/master/Sounds> | false |
|`icon` | An url to the icon, available only on iOS 15 or later | false |
|`group` | The group of the notification | false |
|`is_archive` | Value must be "1". Whether or not should be archived by the app | false |
|`url` | The url to be opened when the notification is clicked (defaults to GitHub run URL) | false |
|`bark_server_url` | Specify your Bark server URL | true |
|`github_server_url` | Specify your GitHub Enterprise URL | false |
