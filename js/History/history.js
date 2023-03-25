var UR = "https://digiaw.azurewebsites.net/api/healthies";
var Dat = [];
google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);
function pageLoadd() {

    getDetails();
    GetParameter();
    reportChart();
    // checkNull();
    //drawChart();
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
async function GetParameter() {
    var GetParameter = [];

    await axios.get(UR + "/SearchByPIDParameterDR/" + sessionStorage.getItem("key")).then((response) => {
        var Human = response.data;
        for (var human1 of Human) {
            GetParameter.push(human1.Temperature);
            GetParameter.push(human1.Humidity);
            GetParameter.push(human1.Speed);
            GetParameter.push(human1.Pressure);
            GetParameter.push(human1.Acceleration);
            GetParameter.push(human1.Wind_Direction);
            GetParameter.push(human1.Speed_Of_Winds);
        }


    });
    // for(var i = 0;i < 7;i++)
    // {                         
    //     alert(GetParameter[i]);                                 
    // }

    for (var i = 0; i < 7; i++) {
        if (GetParameter[i] === null) {
            GetParameter[i] = "--/---";
        }
    }
    // for(var i = 0;i < 7;i++)
    // {                         
    //     alert(GetParameter[i]);                                 
    // }


    document.getElementById("Temperature").innerHTML = GetParameter[0] + "<sup>o</sup>C";
    document.getElementById("Humidity").innerHTML = GetParameter[1] + "<sup>o</sup>F";
    document.getElementById("Speed").innerHTML = GetParameter[2];
    document.getElementById("Pressure").innerHTML = GetParameter[3];
    document.getElementById("Acceleration").innerHTML = GetParameter[4];
    document.getElementById("WindD").innerHTML = GetParameter[5];
    document.getElementById("WindS").innerHTML = GetParameter[6];

}


async function report() {
    Datetime = document.getElementById("datetimes").value.split(" - ");
    var url = UR + "/SearchByPIDParameterHistory2/" + sessionStorage.getItem("key") + "/" + Datetime[0].replace(/\//g, "-").replace(/ /g, ",").replace(":", ";") + "/" + Datetime[1].replace(/\//g, "-").replace(/ /g, ",").replace(":", ";");
    alert(Datetime);

    await axios.get(url).then((response) => {

        var Human = response.data;



        if (Human == "") {
            alert("ko có dư liệu");
        }
        else {
            const headers = Object.keys(Human[0]).join();
            const content = Human.map(value => Object.values(value).join());
            const csv = [headers].concat(content).join("\n");
            const element = document.createElement('a');
            element.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
            element.target = '_blank';
            element.download = 'report.csv';
            element.click();
        }



    })
}



// async function GetParameter() {

//     var bienn = [];
//     await axios.get(URL + "/SearchByPIDParameterDR/" + sessionStorage.getItem("key")).then((response) => {
//         var healthies = response.data;
//         for (var human1 of healthies) {

//             bienn.push(human1.Temperature);
//             bienn.push(human1.Humidity);
//             bienn.push(human1.Speed);
//             bienn.push(human1.Pressure);
//             bienn.push(human1.Acceleration);
//             bienn.push(human1.Wind_Direction);
//             bienn.push(human1.Speed_Of_Winds);
//         }

//         for (var i = 0; i < 7; i++) {
//             if (bienn[i] === null)
//             {
//                bienn[i] = "--/---";
//             }
//         }
//     });
//     addHistory();
// }

// function addHistory()
// {
//     for(var i = 0; i < 7; i++)
//     {
//         alert(bienn[i]);
//     }

//     document.getElementById("Temperature").innerHTML = bien[0];
//     document.getElementById("Humidity").innerHTML = bien[1];
//     document.getElementById("Speed").innerHTML = bien[2];
//     document.getElementById("Pressure").innerHTML = bien[3];
//     document.getElementById("Acceleration").innerHTML = bien[4];
//     document.getElementById("WindD").innerHTML = bien[5];
//     document.getElementById("WindS").innerHTML = bien[6];
// }



// for(var i = 0;i < 7;i++)
// {
//     // document.getElementById("Temperature").innerHTML = human1.Temperature;
//     // document.getElementById("Humidity").innerHTML = human1.Humidity;
//     // document.getElementById("Speed").innerHTML = human1.Speed;
//     // document.getElementById("Pressure").innerHTML = human1.Pressure;
//     // document.getElementById("Acceleration").innerHTML = human1.Acceleration;
//     // document.getElementById("WindD").innerHTML = human1.Wind_Direction;
//     // document.getElementById("WindS").innerHTML = human1.Speed_Of_Winds;
//     document.getElementById("Temperature").innerHTML = GetParameter[i];
// document.getElementById("Humidity").innerHTML = GetParameter[i];
// document.getElementById("Speed").innerHTML = GetParameter[i];
// document.getElementById("Pressure").innerHTML = GetParameter[i];
// document.getElementById("Acceleration").innerHTML = GetParameter[i];
// document.getElementById("WindD").innerHTML = GetParameter[i];
// document.getElementById("WindS").innerHTML = GetParameter[i];
// }


async function reportChart() {
    Datetime = document.getElementById("datetimes").value.split(" - ");
    var url = UR + "/SearchByPIDParameterHistory2/" + sessionStorage.getItem("key") + "/" + Datetime[0].replace(/\//g, "-").replace(/ /g, ",").replace(":", ";") + "/" + Datetime[1].replace(/\//g, "-").replace(/ /g, ",").replace(":", ";");
    
    var GetParameterr = [];
    
    await axios.get(url).then((response) => {

        var Human = response.data;



        if (Human == "") {
            alert("ko có dư liệu");
        }
        else {
            for (var human1 of Human) {
                GetParameterr.push(human1.Temperature);
                GetParameterr.push(human1.Humidity);
                GetParameterr.push(human1.Speed);
                GetParameterr.push(human1.Pressure);
                GetParameterr.push(human1.Acceleration);
                GetParameterr.push(human1.Wind_Direction);
                GetParameterr.push(human1.Speed_Of_Winds);
            }
        }
        for (var i = 0; i < GetParameterr.length; i++) {
            if (GetParameterr[i] === null) {
                GetParameterr[i] = "0";
            }
        }
        //var mang = [];
        //for (var i = 0; i < GetParameterr.length; i++) {
        //alert(GetParameterr[i]);
        //}


        //  for(i = 0; i < GetParameterr.length ; i++)
        //  {
        //     for(i = 0; i < 7; i++)
        //     {

        //     }
        //  }



            //for(i = 0; i < 7; i++)
        //alert(GetParameterr[i]);

        
        var data = google.visualization.arrayToDataTable([
            
            ['', ''],// sau dau , khong truyen bien duoc neu khong se bi loi
            ['Temperature', GetParameterr[0]],
            ['Humidity', GetParameterr[1]],
            ['Speed', GetParameterr[2]],
            ['Pressure', GetParameterr[3]],
            ['Acceleration', GetParameterr[4]],
            ['Speed_Of_Winds', GetParameterr[5]],
            ['Wind_Direction', GetParameterr[6]],
            ['', 0] // thay het tat ca la bien se bi loi
            
        ]);
        //}


        var options = {
            title: 'Company Performance',
            curveType: 'function',
            legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

        chart.draw(data, options);
    })
}




function drawChart() {

}
