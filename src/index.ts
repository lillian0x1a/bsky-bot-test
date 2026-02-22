import { Client } from '@atproto/lex'
import { PasswordSession } from '@atproto/lex-password-session'
import * as dotenv from 'dotenv'
import * as process from 'process'
import * as app from './lexicons/app'

dotenv.config()

// セッション生成
async function login() {
    const service = process.env.BOT_PDS!
    const identifier = process.env.BOT_HANDLE!
    const password = process.env.BOT_PASSWORD!
    const session = await PasswordSession.login({
        service, // eg 'https://bsky.social'
        identifier, // eg 'alice.bsky.social'
        password,
    })

    return session
}

// 投稿ロジック
async function makePost(session: PasswordSession) {
    const client = new Client(session)
    await client.create(app.bsky.feed.post, {
        text: '🙂\ttest bot',
        createdAt: new Date().toISOString(),
    })
    console.log('Just posted!')
}

async function main() {
    console.log('PDS:', process.env.BOT_PDS)
    const session = await login()
    await makePost(session)
}

main().catch(console.error)
