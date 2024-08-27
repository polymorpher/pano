import PouchDB from 'pouchdb'
import { defaultDbPath } from './config.js'
import { cmd } from './cmd.js'

const dbPath = (cmd.db ?? defaultDbPath) as string

export const db = new PouchDB(dbPath)
