const nodeMailer = require('nodema')
module.exports.SendVerificationCode = (code,email_to)=>{

    const transport = nodeMailer.createTransport({
        service: "gmail",
        auth:{
            user: process.env.FROM,
            pass: process.env.FROM_PASS
        }
    })

    const htmlMail = `
                    <section style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;background: linear-gradient(30deg, rgb(83, 175, 221),rgb(231, 105, 235));padding: 10px;color: #fff;">
                    <header>
                        <h2>ViiGram</h2>
                    </header>
                    <p>Thank you fo creating ViiGram account</p>
                    <p>Click the following link to activate your account</p>
                    
                    <a target="_blank" href="http://localhost:3000/auth/verfication?code=${code}">http://localhost:3000/auth/verfication?code=${code}</a>
                    </section>`

    const mailDetails = {
        from : process.env.FROM,
        to: email_to,
        subject: "ViiGram account activation",
        html: htmlMail
    }

    try {

        transport.sendMail(mailDetails)
        
    } catch (err) {
        console.log("error : " + err);
    }
}
