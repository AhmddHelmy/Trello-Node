import nodemailer from 'nodemailer'

export const sendEmail = async ({to, subject, html}) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user,
            pass
        }
    })

    const mailinfo = await transporter.sendMail({
        from: `"Trello Team"`,
        to,
        subject,
        html
    })
    return mailinfo
}