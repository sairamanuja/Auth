import nodemailer from 'nodemailer';
import {VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE,PASSWORD_RESET_REQUEST_TEMPLATE} from './template.js'
import dotenv from "dotenv"


dotenv.config();


const sendVerificationEmail = async (email, verificationPasswordToken) => {

    try {
        const verification = verificationPasswordToken;
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: process.env.NODEMAIL_USER,
            pass: process.env.NODEMAIL_PASS,
          },
        });
        
        transporter.sendMail({
          to: email,
          subject: 'Expanding our business',
          html: VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}', verification),
        })
          .then(() => {
            console.log('Email sent');
          })
          .catch(err => {
            console.error('Error occurred:', err);
          });
                
    } catch (error) {
        console.error('Error occurred:', error);    
    }

}



const sendResetPasswordEmail = async (email, resetURL) => {

    try {
       
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: process.env.NODEMAIL_USER,
            pass: process.env.NODEMAIL_PASS,
          },
        });
        
        transporter.sendMail({
          to: email,
          subject: 'Reset Password',
          html:PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}',resetURL),
        })
          .then(() => {
            console.log('Email sent');
          })
          .catch(err => {
            console.error('Error occurred:', err);
          });
                
    } catch (error) {
        console.error('Error occurred:', error);    
    }

}

const sendResetPasswordSuccessEmail = async (email) => {

  try {
     
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.NODEMAIL_USER,
            pass: process.env.NODEMAIL_PASS,
        },
      });
      
      transporter.sendMail({
        to: email,
        subject: 'Reset Password Successfully ',
        html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      })
        .then(() => {
          console.log('Email sent');
        })
        .catch(err => {
          console.error('Error occurred:', err);
        });
              
  } catch (error) {
      console.error('Error occurred:', error);    
  }

}

export { sendVerificationEmail, sendResetPasswordEmail, sendResetPasswordSuccessEmail };