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
  const filePattern: string = getInput('files')
  const giteeRepo: string = getInput('gitee_repo')
  const sshKey: string = getInput('gitee_token')

  startGroup('📁 准备文件')
  // 清理 & 准备临时目录
  ensureDirSync(TEMP_DIR)
  info(`🔧 创建临时目录 ${TEMP_DIR}`)

  // 收集并复制文件
  const matchedFiles = await glob(filePattern)
  debug(`files: ${matchedFiles}`)
  if (matchedFiles.length === 0)
    throw new Error(`No files matched pattern: ${filePattern}`)

  for (const file of matchedFiles) {
    const dest = path.join(TEMP_DIR, file)
    copySync(file, dest)
    debug(`✅ 拷贝文件: ${file} -> ${dest}`)
  }
  info('✅ 待提交文件准备完成')
  endGroup()

  // 配置 SSH 信息
  startGroup('🔐 配置 SSH')
  const sshPath = path.join(process.env.HOME || process.cwd(), '.ssh')
  const keyPath = path.join(sshPath, 'id_rsa')
  outputFileSync(keyPath, `${sshKey}\n`, { mode: 0o600 })
  process.env.GIT_SSH_COMMAND = `ssh -i ${keyPath} -o StrictHostKeyChecking=no`
  debug('写入 SSH 私钥到  .ssh/id_rsa')
  endGroup()

  startGroup('📤 执行 Git')
  // 获取当前仓库信息
  const { stdout: hash } = await exec('git', ['rev-parse', 'HEAD'])
  const shortHash = hash.trim().slice(0, 6)
  const commitMsg = `Mirror from GitHub for ${shortHash} at ${nowDate()}`

  // 创建仓库并推送到 Gitee
  process.chdir(TEMP_DIR)
  await exec('git', ['init'], { throwOnError: true })
  await exec('git', ['config', 'user.name', 'github-actions'], { throwOnError: true })
  await exec('git', ['config', 'user.email', 'github-actions@github.com'], { throwOnError: true })
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
        setFailed(e.output?.stderr ?? e.message)
      }
      else {
        setFailed(e instanceof Error ? e : String(e))
      }
    })
}
