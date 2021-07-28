const valid = ({username,fullname,email,password,confirmPassword}) =>{
    const err = {} 

    if(!fullname) {
        err.fullname = 'Please add you fullname'
    }else if(fullname.length > 25){
        err.fullname = "length should be less than 25 characters"
    }

    if(!username){
        err.username = "please add your username"
    }else if(username.replace(/ /g,'').length > 25){
        err.username = "length should be less than 25 characters"
    }

    if(!email){
        err.email = "please add your email"
    }else if(!validateEmail(email)){
        err.email = "Invalid Email format"
    }
    
    
    if(!password){
        err.password = "please add your password"
    }else if(password.length < 6){
        err.password = "length should be greater than 6 characters"
    }

    if(password !== confirmPassword){
        err.confirmPassword = "Password should be match "
    }
    
    return {
        errMsg:err,
        errLength: Object.keys(err).length
    }
}
 

function validateEmail(email) {
    // eslint-disable-next-line 
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export default valid;