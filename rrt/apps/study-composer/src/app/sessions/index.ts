import { db } from '../database'
import * as session from 'express-session';
import * as PGSimple from 'connect-pg-simple';
import * as dotenv from 'dotenv';
import { StudyInfo } from '../routes/studies';
dotenv.config();

const PGSession = PGSimple(session);
function newPGSessionStore() {
    return new PGSession({
        pool : db,
        schemaName : process.env.DB_NAME,             
        tableName : process.env.EXPRESS_SESSIONS_TABLE,
        pruneSessionInterval : false
    })
}

const sessionOptions: session.SessionOptions = {
    secret: process.env.EXPRESS_SESSION_SECRET,
    cookie: {},
    resave: true,
    saveUninitialized: true,
    store: newPGSessionStore()
}

declare module 'express-session' {
    export interface SessionData {
      user: { [key: string]: unknown };
      studies: { [key: string]: StudyInfo };
      views: number;
    }
  }

export const expSession = session(sessionOptions)