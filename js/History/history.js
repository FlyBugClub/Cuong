var UR = "https://digi27.azurewebsites.net/api/healthies";
function pageLoadd() {

    getDetails();
    GetParameter();

}

//alert(localStorage.getItem("key"));

async function getDetails() {

    await axios.get(UR + "/SearchByPIDProduct/" + sessionStorage.getItem("key")).then((response) => {
        var Human = response.data;
        for (var human1 of Human) {
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

async function GetParameter() {

    // await axios.get(URL + "/SearchByUIDOwner/"+sessionStorage.getItem('UID')).then((response) =>{
    //     var healthies = response.data;
    //      var i =0;
    //     test = 0;
    //     count_button_id_onclick = 0;
    //     count = 0;
    //      for(var human of healthies )
    //      {
    //          PIDc[i] =  human.PID;
    //         i++;
    //         alert(PIDc[i])
    //      }
    // });
    // // setTimeout(async () => {
    //     for(var j = (PIDc.length - 1);j >= 0 ;)
    //     {
    var bien = [];
    var bien_parameter = [];
    var check_parameter = [];
    // var bien = [" "," "," "," "," "," "," "];   
    //         j  = j -1 ;
    await axios.get(URL + "/SearchByPIDParameterDR/sp008"/*+PIDc[j+1])*/).then(async (response) => {
        var healthies = response.data;
        for (var human of healthies) {
           

                if (human.Acceleration === "Y") {
                    check_parameter.push("Acceleration");

                }
                if (human.Speed === "Y") {
                    check_parameter.push("Speed");

                }
                if (human.Temperature === "Y") {
                    check_parameter.push("Temperature");

                }
                if (human.Humidity === "Y") {
                    check_parameter.push("Humidity");
                }
                if (human.Pressure === "Y") {
                    check_parameter.push("Pressure");
                }
                if (human.Speed_Of_Winds === "Y") {
                    check_parameter.push("Speed_Of_Winds");

                }
                if (human.Wind_Direction === "Y") {
                    check_parameter.push("Wind_Direction");

                }
            }
        

        await axios.get(URL + "/SearchByPIDParameterDR/sp008").then((response) => {
            var healthies = response.data;
            for (var human1 of healthies) {




                for (var i = 0; i < check_parameter.length; i++) {
                    if (check_parameter[i] === "Temperature") {
                        bien.push(human1.Temperature);
            
                        document.getElementById("Temperature").innerHTML = human1.Temperature+"<sup>o</sup>C";
                    }
                    else //document.getElementById("Temperature").innerHTML = "--/---";
                     if (check_parameter[i] === "Humidity") {
                        document.getElementById("Humidity").innerHTML = human1.Humidity+"<sup>o</sup>F";
                    }
                    else //document.getElementById("Humidity").innerHTML = "--/---";
                     if (check_parameter[i] === "Speed") {
                        document.getElementById("Speed").innerHTML = human1.Speed;
                    } 
                    else //document.getElementById("Speed").innerHTML = "--/---";
                    if (check_parameter[i] === "Pressure") {
                        document.getElementById("Pressure").innerHTML = human1.Pressure;
                    }   
                    else //document.getElementById("Pressure").innerHTML = "--/---";
                    if (check_parameter[i] === "Acceleration") {
                        document.getElementById("Acceleration").innerHTML = human1.Acceleration;
                    }
                    else //document.getElementById("Acceleration").innerHTML = "--/---"; 
                    if (check_parameter[i] === "Wind_Direction") {
                        document.getElementById("WindD").innerHTML = human1.Wind_Direction;
                    }
                    else document.getElementById("WindD").innerHTML = "--/---"; 
                    if (check_parameter[i] === "Speed_Of_Winds") {
                        document.getElementById("WindS").innerHTML = human1.Speed_Of_Winds;
                    }
                }
                




            }
            for(var i = 0; i < check_parameter.length; i++)
                {
                    if(document.getElementsByClassName("#").value = "" )
                    {
                        document.getElementsByClassName("#").innerHTML = "--/---";
                    }
                }
        })
    }
    )
}
