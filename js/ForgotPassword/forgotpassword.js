const URL = "https://digiaw.azurewebsites.net/api/healthies";
var replace_email1;
var searchByEmail;
var real_email;
var validate,checkEmail;
const serviceID = "service_llvpnwi";
const templateID = "template_njqzjob";




function clickEvent(first,last){
    if(first.value.length){
      document.getElementById(last).focus();
    }
    
    if(document.getElementById("ist").value != "" 
    && document.getElementById("sec").value != ""
    && document.getElementById("third").value != ""
    && document.getElementById("fourth").value != ""
    && document.getElementById("fifth").value != ""
    && document.getElementById("sixth").value != ""
    && document.getElementById("seventh").value != ""
    && document.getElementById("eighth").value != ""
    )
    {
        btnOTPSubmit();
    }
  }
function btnOTPSubmit()
{
    var date = new Date();
    var month =date.getFullYear()+ "-" +(date.getMonth()+1) +"-" +(date.getDate());
    var time = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    var date2 = month +" "+time;
    Otp = document.getElementById("ist").value
    +document.getElementById("sec").value
    +document.getElementById("third").value
    +document.getElementById("fourth").value
    +document.getElementById("fifth").value
    +document.getElementById("sixth").value
    +document.getElementById("seventh").value
    +document.getElementById("eighth").value;
    if (Otp === real_email)
    {
        UpdatePassWord(document.getElementById("txtForgotPasswordEmail").value,date2,real_email);
    }
    else
    {
        document.getElementById("txtNote_fgpw").innerHTML = "*OTP aren't correct";
    }
}
function UpdatePassWord(password,date,email) {
    axios.post(URL + "updatepassword" , password,date,email).then((response) =>{
        var result = response.data;
        if(result){
            window.location.href = "../index.html ";
        }else
        {
            document.getElementById("txtNote").innerHTML = "*Error! An error occurred. Please try again later";
            
        }   
    });
}
function payload()
{
    sendEmail();
}
function sendEmail()
{
    RandomOTP();
    var params = {
        name : "DigiTechnology",
        email: document.getElementById("txtForgotPasswordEmail").value,
        message : real_email,
    }
    emailjs.send(serviceID,templateID,params).then((res) =>{
    }) 
    .catch((err) => console.log(err));
}


function RandomOTP() {

	var uniquechar = "";
	const randomchar = "0123456789";
	for (let i = 1; i < 9; i++) {
		uniquechar += randomchar.charAt(
			Math.random() * randomchar.length)
	}
	real_email = uniquechar;
}



function btnForgotPassword()
{
    searchByEmail();    
    setTimeout(() => {
        checkValidate();
        if(validate)
        {
            document.getElementById("cuong").style.display = "none";
            document.getElementById("cuong1").style.display = "block";
        }
    }
          , 800);
}
function checkValidate()
{
    var emailID = document.getElementById("txtForgotPasswordEmail").value;
        atpos = emailID.indexOf("@");
         dotpos = emailID.lastIndexOf(".");
    if(document.getElementById("txtForgotPasswordEmail").value == "")
    {
        document.getElementById("txtForgotPasswordNote").innerHTML = "*Please enter your email";
        validate =  false;
    }
    else if (atpos < 1 || ( dotpos - atpos < 2 )) {
        document.getElementById("txtForgotPasswordNote").innerHTML = "*Please enter the correct email format";
        validate =  false;
    }
    else if(checkEmail)
    {  
        document.getElementById("txtForgotPasswordNote").innerHTML = "*The email isn't exit";
        validate =  false;
    }
    else
    {
        validate =  true;
    }
}
function searchByEmail() {
    replace_email1 = document.getElementById("txtForgotPasswordEmail").value.replace(/\./g,',');
    var check = false;
    axios.get(URL + "/SearchByEmail/"+replace_email1).then((response) =>{
        var healthies = response.data;
        for(var human of healthies )
        {
            if(human.Email != replace_email1)
            {
                check = true;
            }
        }
    });
    setTimeout(() => {
        if (check)
    {
        checkEmail = true;
    }
    else checkEmail =  false;
      }, 1000);
}