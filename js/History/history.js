const URL = "https://digi27.azurewebsites.net/api/healthies";

function pageLoad() {
    //alert(localStorage.getItem("key")); 
    getDetails();
    
}

//alert(localStorage.getItem("key"));

async function getDetails() {
    alert("hehe");
    await axios.get(URL + "/SearchByPIDproduct/sp006"/* + localStorage.getItem("key"))*/).then((response) => {
        var Human = response.data;
        //alert(Human);
        for(var human1 of Human ){
            document.getElementById("txtID").innerHTML = human1.PID;
            document.getElementById("txtDevice").innerHTML = human1.PName;
            document.getElementById("txtLocal").innerHTML = human1.Location;
            document.getElementById("txtDate").innerHTML = human1.Weight;

        }
    
    });
}

// function renderHumanDetails(Human) {
//     document.getElementById("txtID").innerHTML = Human.PID;
//     document.getElementById("txtName").value = Human.Name;
//     document.getElementById("txtHeight").value = Human.Height;
//     document.getElementById("txtWeight").value = Human.Weight;
//     document.getElementById("txtBMI").value = Human.BMI;
// }