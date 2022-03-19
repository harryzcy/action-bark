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

Custom formats:

```yaml
steps:
  - uses: harryzcy/action-bark@v1
    with:
        status: custom
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
