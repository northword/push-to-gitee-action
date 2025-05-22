# Push to Gitee

这是一个 GitHub Action，用于将 GitHub 仓库中的指定文件推送到 Gitee。

与常见的仓库或组织级别的镜像工具不同，本项目专注于**特定文件的同步**，适用于将部分资源镜像到 Gitee，以便作为大陆地区的分发渠道。

虽然现有项目似乎也能实现类似功能，但在某些情况下，GitHub 仓库中可能包含敏感词（如存在于提交历史或其他文件中），从而导致整个 Gitee 仓库被屏蔽。本项目通过**仅同步必要文件**，且仅保留一次提交（强制推送），可有效规避敏感内容带来的影响。

## 食用方法

```yml
name: release

on:
  push:
    branches:
      - main

jobs:
  sync:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v4
      - uses: northword/push-to-gitee@v4
        with:
          gitee_repo: git@gitee.com:zotero-chinese-x/styles.git
          gitee_token: ${{ secrets.SSH_PRIVATE_KEY }}
          files: ['**/*.csl']
```
