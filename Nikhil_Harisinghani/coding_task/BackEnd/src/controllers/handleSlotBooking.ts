// Google API integration remaining + take care of date formatting
import { Context } from "hono";
import { db } from "..";
import { userBookedSlots, users } from "../db/schema";
import { eq } from "drizzle-orm";
import { handleMailScheduling } from "./handleMailScheduling";

function getEndTime(time: string) {
    let temp = Number(time.split(':')[0]) * 3600 + Number(time.split(':')[1]) * 60 + 30 * 60;
    let hrs = Math.floor(temp / 3600);
    let mins = (temp % 3600) / 60;

    let finalhrs: string;
    let finalmins: string;
    if (hrs < 10) finalhrs = "0" + hrs.toString()
    else finalhrs = hrs.toString();

    if (mins < 10) finalmins = "0" + mins.toString()
    else finalmins = mins.toString()

    const endTime = finalhrs + ":" + finalmins + ":00";
    console.log(endTime);
    return endTime;
}

export async function handleSlotBooking(ctx: Context) {
    try {
        const { payload }:
            { payload: { date: string, startTime: string, clientEmailId: string, slug: string } }
            = await ctx.req.json();

        const emailId = await db.select().from(users).where(eq(users.slug, payload.slug));
        
        if (emailId.length === 0) 
            return ctx.json({
                "message": "User does not exist",
                "success":false
            })
        
        const userId = emailId[0].userId;

        // const slotsBookedOnThatDay = await db.select().from(userBookedSlots).innerJoin(users,eq(userBookedSlots.userId,users.userId)).where(eq(userBookedSlots.bookedDate, payload.date));
                
        const endTime = getEndTime(payload.startTime);
        // let isFeasible: boolean = true
                
        // slotsBookedOnThatDay.forEach((tuple) => {
        //     if (payload.startTime === tuple.userBookedSlots.startTime) {
        //         isFeasible = false
        //     }
        // })
        
        // if (!isFeasible) {
        //     return ctx.json({
        //         "message": "User busy",
        //         "success": true
        //     })
        // }

        await db.insert(userBookedSlots).values({
            userId,
            startTime: payload.startTime,
            endTime,
            clientEmailId: payload.clientEmailId,
            bookedDate: payload.date
        })
            
            
        // google api TO DO will also need to handle 
            
        await handleMailScheduling(emailId[0].email, payload.clientEmailId, payload.date, payload.startTime);
            
        return ctx.json({
            "message": "successfull",
            "success":true
        })
            
        } catch (error) {
            console.log(error);
            
            return ctx.json({
                "message": "Something went wrong",
                "sucess": true
            })

    }
}


// later
// function doIntervalsIntersect(start1: string, end1: string, start2: string, end2: string) {
    //     const startTime1 = new Date(`1970-01-01T${start1}Z`);
    //     const endTime1 = new Date(`1970-01-01T${end1}Z`);
    //     const startTime2 = new Date(`1970-01-01T${start2}Z`);
    //     const endTime2 = new Date(`1970-01-01T${end2}Z`);
    
    //     const intersect = !(endTime1 < startTime2 || startTime1 > endTime2);
    
    //     return intersect;
    // }
    
    
    // const fs = require('fs').promises;
    // const path = require('path');
    // const process = require('process');
    // const { authenticate } = require('@google-cloud/local-auth');
    // const { google } = require('googleapis');
    
    // // If modifying these scopes, delete token.json.
    // const SCOPES = ['https://www.googleapis.com/auth/calendar'];
    // // The file token.json stores the user's access and refresh tokens, and is
    // // created automatically when the authorization flow completes for the first
    // // time.
    // const TOKEN_PATH = path.join(process.cwd(), 'token.json');
    // const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');
    
    // /**
    //  * Reads previously authorized credentials from the save file.
    //  *
    //  * @return {Promise<OAuth2Client|null>}
    //  */
    // async function loadSavedCredentialsIfExist() {
        //     try {
            //         const content = await fs.readFile(TOKEN_PATH);
            //         const credentials = JSON.parse(content);
            //         console.log(credentials);
            //         return google.auth.fromJSON(credentials);
            //     } catch (err) {
                //         return null;
                //     }
                // }
                
                // /**
                //  * Serializes credentials to a file compatible with GoogleAuth.fromJSON.
                //  *
                //  * @param {OAuth2Client} client
                //  * @return {Promise<void>}
                //  */
// async function saveCredentials(client) {
//     const content = await fs.readFile(CREDENTIALS_PATH);
//     const keys = JSON.parse(content);
//     const key = keys.installed || keys.web;
//     const payload = JSON.stringify({
    //         type: 'authorized_user',
    //         client_id: key.client_id,
    //         client_secret: key.client_secret,
    //         refresh_token: client.credentials.refresh_token,
    //     });
    //     await fs.writeFile(TOKEN_PATH, payload);
    // }
    
    // /**
    //  * Load or request or authorization to call APIs.
    //  *
    //  */
    // async function authorize() {
        //     let client = await loadSavedCredentialsIfExist();
        //     console.log(client)
        //     if (client) {
            //         return client;
            //     }
            //     client = await authenticate({
                //         scopes: SCOPES,
                //         keyfilePath: CREDENTIALS_PATH,
                //     });
                //     if (client.credentials) {
                    //         await saveCredentials(client);
                    //     }
                    //     return client;
                    // }
                    
                    // /**
                    //  * Lists the next 10 events on the user's primary calendar.
                    //  * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
                    //  */
                    // async function listEvents(auth) {
                        //     const calendar = google.calendar({ version: 'v3', auth });
                        //     const res = await calendar.events.list({
                            //         calendarId: 'primary',
                            //         timeMin: new Date().toISOString(),
                            //         maxResults: 10,
                            //         singleEvents: true,
                            //         orderBy: 'startTime',
//     });
//     const events = res.data.items;
//     if (!events || events.length === 0) {
    //         console.log('No upcoming events found.');
    //         return;
    //     }
    //     console.log('Upcoming 10 events:');
    //     events.map((event, i) => {
        //         const start = event.start.dateTime || event.start.date;
        //         console.log(`${start} - ${event.summary}`);
        //     });
        // }
        
        // authorize().then(listEvents).catch(console.error);
        // // send token from front-end 