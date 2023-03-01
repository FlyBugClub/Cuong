const URL = "https://digi27.azurewebsites.net/api/healthies";
var replace_email;
function btnSignIn_Click()
{
    alert(validate());
    if(validate())
    {
        searchByEmail();
    }
    
}
function validate(){
    var emailID = document.getElementById("txtEmail").value;
    atpos = emailID.indexOf("@");
    dotpos = emailID.lastIndexOf(".");
    if(document.getElementById("txtSignInEmail").value === "")
    {
        document.getElementById("txtSignInNote").innerHTML = "*Please enter your email";
        return false;
    }
    else if(atpos < 1 || ( dotpos - atpos < 2 ))
    {
        document.getElementById("txtSignInNote").innerHTML = "*Please enter the correct email format";
        return false;
    }
    else if(document.getElementById("txtSignInPassword").value === "")
    {
        document.getElementById("txtSignInNote").innerHTML = "*Please enter your password";
        return false;
    }
    else return true;
}
function searchByEmail() {
    replace_email = document.getElementById("txtSignInEmail").value.replace(/\./g,',');
    axios.get(URL + "/SearchByEmail/"+replace_email).then((response) =>{
        var healthies = response.data;
        for(var human of healthies )
        {
            if(human.Email === replace_email)
            {
                if(human.Pass === document.getElementById("txtSignInPassword").value)
                {
                    localStorage.clear();
                    clear();
                    sessionStorage.setItem('email', replace_email);
                    window.location.href = "../html/devicesHome.html ";
                }
                else
                {
                    document.getElementById("txtSignInNote").innerHTML = "*Wrong email or password";
                }
            }
            else
            {
                document.getElementById("txtSignInNote").innerHTML = "*Wrong email or password";
            }
        }
    });
}
function clear()
{
    document.getElementById("txtSignInEmail").value = "";
    document.getElementById("txtSignInPassword").value = "";
}