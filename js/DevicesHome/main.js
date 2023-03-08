const URL = "https://digi27.azurewebsites.net/api/healthies";
var email;
var PIDc = [];
var bang = [];
var count_bold = 0;
var count = 0;
var str;
var refresh;
var test;
var the = [];
var count_button = 0;
//===================== button info history =====================
var btn = document.createElement('button');
btn.type = 'button';


var btn_show = document.createElement('show');

//========= btn style =========
btn.style.backgroundColor = "transparent"
btn.style.border = "none";
btn.style.fontSize = "20px";
btn.style.color = "black"
btn.style.textDecoration = "none"

async function check() {
    email = sessionStorage.getItem('email');
    await axios.get(URL + "/SearchByEmail/" + email).then((response) => {
        var healthies = response.data;

        for (var human of healthies) {
            sessionStorage.setItem('UID', human.UID);
            sessionStorage.setItem('Nation', human.Nation);
            sessionStorage.setItem('Language', human.Language);
            sessionStorage.setItem('Hour_nose', human.Hour_nose);
            sessionStorage.setItem('UID_Main_Account', human.UID_Main_Account);
            sessionStorage.setItem('Is_Beneficiary_Account', human.Is_Beneficiary_Account);
            sessionStorage.setItem('Status', human.Status);
            sessionStorage.setItem('Purchase_Date', human.Purchase_Date);
            sessionStorage.setItem('Date', human.Date);
        }
    });
    GetParameter();
    // setTimeout(() => {
    //     GetParameter();
    //   }, 1);

}
async function GetParameter() {
    str = "";
    bang.length = 0;
    await axios.get(URL + "/SearchByUIDOwner/" + sessionStorage.getItem('UID')).then((response) => {
        var healthies = response.data;
        var i = 0;
        test = 0;
        count = 0;
        for (var human of healthies) {
            PIDc[i] = human.PID;
            i++;
        }
    });
    // setTimeout(async () => {
    for (var j = (PIDc.length - 1); j >= 0;) {
        var bien_parameter = [];
        j = j - 1;
        await axios.get(URL + "/SearchByPIDProduct/" + PIDc[j + 1]).then(async (response) => {
            var healthies = response.data;
            for (var human of healthies) {
                if (human.Is_read_file === "Y") {
                    if (PIDc[j + 1] === human.PID) {
                        break;
                    }
                }
                else if (human.Is_read_file === "N") {
                    //    //đọc trực tiếp       
                    if (PIDc[j + 1] === human.PID) {
                        if (count_button === 0) {
                            the.push(PIDc[j + 1]);
                        }
                        test = test + 1;
                        // alert(PIDc[j+1] + human.PID + "N");
                        await axios.get(URL + "/SearchByPIDParameterDR/" + PIDc[j + 1]).then((response) => {
                            var healthies = response.data;
                            for (var human1 of healthies) {
                                if (PIDc[j + 1] === human1.PID) {

                                    let slip_Current_Time = human1.Current_Time.split(" ");
                                    // let slip_Current_Time_date = slip_Current_Time[0].split("/");
                                    // let slip_Current_Time_time = slip_Current_Time[1].split(":");
                                    bien_parameter.push(human.PID);
                                    bien_parameter.push(human.PName);
                                    bien_parameter.push(human.Group);
                                    bien_parameter.push(human.Location);
                                    bien_parameter.push(slip_Current_Time[0]);
                                    bien_parameter.push(slip_Current_Time[1] + " " + slip_Current_Time[2]);

                                    bien_parameter.push(human1.Temperature);
                                    bien_parameter.push(human1.Humidity);
                                    bien_parameter.push(human1.Pressure);
                                    bien_parameter.push(human1.Speed);
                                    bien_parameter.push(human1.Speed_Of_Winds);
                                    bien_parameter.push(human1.Wind_Direction);
                                    bien_parameter.push(human1.Acceleration);

                                    for (var i = 0; i < 13; i++) {

                                        if (bien_parameter[i] === null) {
                                            bien_parameter[i] = "--/---";
                                        }
                                        // if(i >= 0 && i<=6 && bien_parameter[i] === null)
                                        // {
                                        //     bien_parameter[i] = "--/---";
                                        // }
                                    }
                                    bang.push(bien_parameter);

                                    break;
                                    // }
                                }
                            }

                        });



                    }
                }


            }

        })
        //Code here


    }
    AddTable(bang);
}

function AddTable(bien, bien_parameter) {
    for (var i = 0; i < test; i++) {
        str += "<tr id =" + i + " class = 'device'>";
        str += "<td class = 'cate'>" + bang[i][0] + "</td>";
        str += "<td>" + bang[i][1] + "</td>";
        str += "<td>" + bang[i][2] + "</td>";
        str += "<td>" + bang[i][3] + "</td>";
        str += "<td>" + bang[i][4] + "</td>";

        str += "<td class = 'cate'>" + bang[i][5] + "</td>";
        str += "<td>" + bang[i][6] + "</td>";
        str += "<td>" + bang[i][7] + "</td>";
        str += "<td>" + bang[i][8] + "</td>";
        str += "<td>" + bang[i][9] + "</td>";
        str += "<td>" + bang[i][10] + "</td>";
        str += "<td>" + bang[i][11] + "</td>";
        str += "<td>" + bang[i][12] + "</td>";
        str += "</tr>";

    }
    $("#hao").html(str);

    AddButton();
}

function DeleteTable() {
    var container = document.getElementById("cuong");
    var countRow = 0;
    var countColumn = 0;
    var tagTable = document.createElement("table");
    container.appendChild(tagTable)
}
function MakeTable() {
    var container = document.getElementById("cuong");
    var countRow = bang.length;
    var countColumn = 7;
    var tagTable = document.createElement("table");
    var count_button_id = 1;
    // countRow.


    tagTable.style.border = 1;
    // tagTable.style.width = "200px";
    // tagTable.style.height = "3px" ;

    tagTable.style.textAlign = "center";

    for (var i = 0; i < countRow; i++) {

        var tagRow = document.createElement("tr");
        tagRow.style.width = "fix-content";
        tagRow.style.fontSize = "16px";
        tagTable.appendChild(tagRow);

        for (var j = 0; j < countColumn; j++) {
            // var tagColumn = document.createElement("td");
            //   tagColumn.style.width = "fix-content";
            //     tagColumn.style.height = "3px";
            //     tagColumn.style.fontSize = "16px";
            //     tagColumn.style.backgroundColor = 'lightgray';
            //     var textNode = document.createTextNode(bang[i][j]);


            //     tagColumn.appendChild(textNode);

            //     tagRow.appendChild(tagColumn);
            //     count = count + 1 ;
            //     count_bold = count_bold + 1;
            //     count_button = count_button + 1;
            if (count_button === 6) {
                var tagColumn = document.createElement("td");
                tagColumn.style.width = "fix-content";
                tagColumn.style.height = "3px";
                tagColumn.style.fontSize = "16px";
                tagColumn.style.backgroundColor = 'lightgray';

                var textNode = document.createTextNode(btn + btn_show);
                tagColumn.appendChild(textNode);
                tagColumn.innerHTML = btn.outerHTML;
                tagColumn.innerHTML = btn_show.outerHTML;

                tagRow.appendChild(tagColumn);
                count = count + 1;
                count_bold = count_bold + 1;
                count_button = count_button + 1;
                count_button_id = count_button_id + 1;
            }
            else {
                var tagColumn = document.createElement("td");
                tagColumn.style.width = "fix-content";
                tagColumn.style.height = "3px";
                tagColumn.style.fontSize = "16px";
                tagColumn.style.backgroundColor = 'lightgray';
                var textNode = document.createTextNode(bang[i][j]);
                tagColumn.appendChild(textNode);
                tagRow.appendChild(tagColumn);
                count = count + 1;
                count_bold = count_bold + 1;
                count_button = count_button + 1;
            }
            if (count_button === 21) {
                count_button = 0;
            }
            if (i === 0) {
                tagColumn.style.color = 'white';
                tagColumn.style.backgroundColor = 'black';
                count = 0;
                count_bold = 0;
                count_button = 0;
            }
            if (count >= 8 && count <= 21) {
                tagColumn.style.backgroundColor = 'white';
                tagColumn.style.color = 'black';
                if (count === 21) {
                    count = 0;
                }
            }
            if (count_bold >= 8 && count_bold <= 14) {
                tagColumn.style.fontWeight = 'bold';
            }
            else if (count_bold === 21) {
                count_bold = 0;
            }
            //   else if(i === 1)
            //   {
            //     var textNode = document.createTextNode(bien_parameter[j]);
            //     tagColumn.style.color = 'black';
            //     tagColumn.style.backgroundColor = 'lightgray';
            //     tagColumn.appendChild(textNode);
            //     tagRow.appendChild(tagColumn);
            //   }
            //   else if(i === 2)
            //   {
            //     var textNode = document.createTextNode(check_parameter[j]);
            //     tagColumn.style.color = 'black';
            //     tagColumn.style.backgroundColor = 'white';

            //         tagColumn.appendChild(textNode);
            //         tagRow.appendChild(tagColumn);
            //   }
            //   else if(i === 3)
            //   {
            //     var textNode = document.createTextNode(bien[j]);
            //     tagColumn.style.color = 'black';
            //     tagColumn.style.backgroundColor = 'white';
            //     if(bien[j] === "")
            //     {
            //         break;
            //     }
            //     tagColumn.appendChild(textNode);
            //     tagRow.appendChild(tagColumn);
            //   }
        }
    }

    container.appendChild(tagTable);
    AddFunction();
}
function AddButton() {

    // for(var i = 1;i<=count_button_id_onclick;i++)
    // {
    //     document.getElementById(i).onclick = function ()
    //     {
    //         alert(this.id);
    //     };
    // }
    for (var i = 0; i < test; i++) (function (i) {
        document.getElementById(i).onclick = function () {
            sessionStorage.setItem("key", the[this.id]);
            window.location = "../html/history.html";
        }
    })(i);
    count_button = 1;
    refresh = 1;
    // var buttons = document.getElementById("1");
    // for (var i = 0; i <= count_button_id_onclick; i += 1) {
    // buttons[i].onclick = function(e) {
    //     alert(this.id);
    // };
    // }
}


setInterval(function newTable() {
    if (refresh === 1) {
        GetParameter();
        refresh = 0;
    }
}, 1000);


