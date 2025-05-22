import path from 'node:path'
import process from 'node:process'
import { debug, endGroup, error, getInput, info, setFailed, startGroup } from '@actions/core'
import { copySync, ensureDirSync, outputFileSync } from 'fs-extra/esm'
import { exec, NonZeroExitError } from 'tinyexec'
import { glob } from 'tinyglobby'

const TEMP_DIR = path.resolve('./gitee-mirror-temp')

function nowDate(): string {
  return new Date().toLocaleString()
}

export async function main() {
  const pattern: string | string[] = getInput('files')
  const giteeRepo: string = getInput('gitee_repo')
  const sshKey: string = getInput('gitee_token')

  startGroup('准备文件')
  // 清理 & 准备临时目录
  ensureDirSync(TEMP_DIR)
  info(`🔧 创建临时目录 ${TEMP_DIR}`)

  // 收集并复制文件
  const files = await glob(pattern)
  debug(`files: ${files}`)
  if (files.length === 0)
    throw new Error(`No files matched pattern: ${pattern}`)

  for (const file of files) {
    const dest = path.join(TEMP_DIR, file)
    copySync(file, dest)
  }
  info('待提交文件准备完成')
  endGroup()

  // 配置 SSH 信息
  startGroup('配置 SSH')
  const sshPath = path.join(process.env.HOME || process.cwd(), '.ssh')
  const keyPath = path.join(sshPath, 'id_rsa')
  debug('写入 .ssh/id_rsa')
  outputFileSync(keyPath, `${sshKey}\n`)
  process.env.GIT_SSH_COMMAND = `StrictHostKeyChecking=no`
  endGroup()

  startGroup('执行 Git')
  await exec('git', ['config', 'user.name', 'github-actions'])
  await exec('git', ['config', 'user.email', 'github-actions@github.com'])
  // 获取当前仓库信息
  const { stdout: hash } = await exec('git', ['rev-parse', 'HEAD'])
  const commitMsg = `Mirror from GitHub for ${hash.trim()} at ${nowDate()}`

  // 创建仓库并推送到 Gitee
  process.chdir(TEMP_DIR)
  await exec('git', ['init'], { throwOnError: true })
  await exec('git', ['remote', 'add', 'origin', giteeRepo], { throwOnError: true })
  await exec('git', ['add', '.'], { throwOnError: true })
  await exec('git', ['commit', '-m', commitMsg], { throwOnError: true })
  await exec('git', ['branch', '-M', 'main'], { throwOnError: true })
  await exec('git', ['push', '-f', 'origin', 'main'], { throwOnError: true })
  info('✅ 已完成 Gitee 镜像')
  endGroup()
}

export async function run() {
  await main()
    .catch((e) => {
      if (e instanceof NonZeroExitError) {
        console.error(e.output)
        error(e.output?.stderr ?? e.message)
        setFailed(e.output?.stderr ?? e.message)
      }
      else {
        setFailed(e instanceof Error ? e : String(e))
        console.error(e)
      }
    })
}
