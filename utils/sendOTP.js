const twilio = require('twilio');

const accountSid = process.env.TWILLo_ACCOUNT_SID
const authToken = process.env.TWILLO_AUTH_TOKEN

const client = twilio(accountSid, authToken);

// async function sendMessage() {
//   try {
//     const message = await client.messages.create({
//       body: 'Hello from twilio-node',
//       to: '+xxxxx', // Text your number
//       from: '+xxxxx', // From a valid Twilio number
//     });
//     console.log(message.sid);
//     return message.sid;
//   } catch (error) {
//     console.error('Error sending message:', error);
//     throw error;
//   }
// }

// module.exports = {
//   sendMessage, // Export the function to send a message
// };


exports.sendOTP = async(otp, number) => {
    try {
        const message = await client.messages.create({
            body: `Your OTP is ${otp}`,
            from: process.env.TWILLO_NUMBER,
            to: `${number}`
        })

        return message
    } catch (error) {
        throw error
    }
}