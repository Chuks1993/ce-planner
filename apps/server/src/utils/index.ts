import twilio from 'twilio'
import nodemailer from 'nodemailer'

import { MessageInfo } from '@src/types'

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const messagingServiceSid = process.env.TWILIO_MESSAGE_SERVICE_SID
const client = twilio(accountSid, authToken)

export async function scheduleTwilioSms({ sendTo, body, sendAt }: MessageInfo) {
  return await client.messages.create({
    body,
    messagingServiceSid,
    to: sendTo,
    scheduleType: 'fixed',
    sendAt
  })
}

export async function cancelTwilioSms(msgSid: string) {
  const res = client.messages(msgSid).update({ status: 'canceled' })
  console.log({ res })
}

export async function sendTwilioCode(to: string) {
  const { sid } = await client.verify.services.create({
    friendlyName: process.env.TWILIO_VERIFY_FRIENDLY_NAME
  })
  const data = await client.verify
    .services(sid)
    .verifications.create({ to, channel: 'sms' })
  return data.serviceSid
}

export async function verifyTwilioCode({
  sendTo,
  code,
  sid
}: {
  sendTo: string
  code: string
  sid: string
}) {
  const res = await client.verify
    .services(sid)
    .verificationChecks.create({ to: sendTo, code })
  return res
}

const transport = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  service: process.env.NODEMAILER_SERVICE,
  port: parseInt(process.env.NODEMAILER_PORT),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD
  }
})

export function activationEmail(token: string) {
  // Compose email
  return `Hi there,
    <br/>
    Thank you for registering, CE Planner!
    <br/><br/>
    Please verify your email by clicking the following link:
    <br/>
    On the following page:
    <a target="_blank" href="${process.env.CLIENT_URL}/activate-account/${token}">${process.env.CLIENT_URL}/activate-account/${token}</a>
    <br/><br/>
    Have a pleasant day.`
}

export function resetPassword(token: string) {
  const html = `
    Please use the following link to reset your password
    <a target="_blank" href="${process.env.CLIENT_URL}/reset-password/${token}">${process.env.CLIENT_URL}/reset-password/${token}</a>
    `
  return html
}

export async function sendEmail(
  from: string,
  to: string,
  subject: string,
  html: string
) {
  return new Promise((resolve, reject) => {
    transport.sendMail({ from, subject, to, html }, (err, info) => {
      if (err) reject(err)
      resolve(info)
    })
  })
}
