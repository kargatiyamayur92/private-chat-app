function OTPGenerator(){
    const otp = Math.floor(200000+Math.random()*800000).toString()
    return otp
}

export default OTPGenerator