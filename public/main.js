/*----------------------------------------------------------------------------------*/
/*Variables*/
let jsonData;
let main_container = document.getElementById("main_container")
let failDisplay = document.getElementById("failDisplay")
let successDisplay = document.getElementById("successDisplay")
let warningDisplay = document.getElementById("warningDisplay")
let searchbar = document.getElementById("searchbar")
let success_check = document.getElementById("success_check")
let fail_check = document.getElementById("fail_check")
let warning_check = document.getElementById("warning_check")
let file_input = document.getElementById("my-awesome-dropzone")
let message_popup = document.getElementById("message_popup")
let popup_container = document.getElementById("popup_container")
const detailLenght = 45;
const generalLenght = 32
let successfullTests = 0;
let failedTests = 0
let warningTests = 0
let searchTerm = "";
let successTerm = "";
var newJSON = {};
var w;


/*----------------------------------------------------------------------------------*/
/*Startup Section*/
startup()
function startup() {
  console.log("loading with json " + "./data/results.json");
readJSONFile("./data/results.json")
const fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', (event) => {
  const selectedFile = event.target.files[0];
  if (selectedFile) {
    // Perform actions with the selected file
    readFileContent(selectedFile); // Example function to read the file content
  }
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    Recall()
  }
});
}


/*----------------------------------------------------------------------------------*/
/*Main Functions*/

//Function to generate the test results
function generateResults(search, checkSuccessError) {
  console.log("The search Term is: " + search);
  console.log("The checker is: " + checkSuccessError);
  let exportCode = "";
 
  console.log("Length of json: " + jsonData.ttTestCaseResults.length);
  for (let i = 0; i < jsonData.ttTestCaseResults.length; i++) {
    let colorOfSmoke = getColorOfSmoke(jsonData.ttTestCaseResults[i].lSuccess,checkTimeLimit(i));
    let nameOfError = getNameOfError(jsonData.ttTestCaseResults[i].cSuite, generalLenght);
    let descriptionofError = getNameOfLast(jsonData.ttTestCaseResults[i].cTest)
    if ((search == '' && checkSuccessError == '') || (successTerm == "both_TandF" && search == '')) {
      exportCode += `
      <div class="message_container" id="${i}_message" style="box-shadow: 0.2vw 1vw 2.2vw 0vw ${colorOfSmoke};">
      ${checkTimeLimit(i)}
      <div class="button_display" ondblclick="generatePopup(${i})">
      <p class="button_text" title="${jsonData.ttTestCaseResults[i].cSuite}">${nameOfError}\n[${descriptionofError}]</p>
      </div>
      <img class="dropdown_arrow" src="./img/dropdown-pfeil.png" onclick="generateDetails(${i})">
      <div class="detail_container" id="${i}_detail">
      <!--cTest-->    <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cTest)}">${getNameOfError(jsonData.ttTestCaseResults[i].cTest, detailLenght)}</p>
      <!--cRuntime-->   <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cRunDescription)}">${getNameOfError(jsonData.ttTestCaseResults[i].cRunDescription, detailLenght)}</p>
      <!--ExitCode-->  <p title="${jsonData.ttTestCaseResults[i].iExitCode}">${getNameOfError(jsonData.ttTestCaseResults[i].iExitCode, detailLenght)}</p>
      <!--ExceptionMessage-->  <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cExceptionMessage)}">${getNameOfError(jsonData.ttTestCaseResults[i].cExceptionMessage, detailLenght)}</p>
      <!--cInfo-->  <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cInfoMessages)}">${escapeHTML(getNameOfError(jsonData.ttTestCaseResults[i].cInfoMessages, detailLenght))}</p>
      <!--Time-->  <p title="${jsonData.ttTestCaseResults[i].dTotalExecutionTime}">${getNameOfError(jsonData.ttTestCaseResults[i].dTotalExecutionTime, detailLenght)}</p>
      <!--Time-->  <p title="${jsonData.ttTestCaseResults[i].dTestCaseExecutionTime}">${getNameOfError(jsonData.ttTestCaseResults[i].dTestCaseExecutionTime, detailLenght)}</p>
      <!--Alert-->  <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cPerformanceAlert)}">${getNameOfError(jsonData.ttTestCaseResults[i].cPerformanceAlert, detailLenght)}</p>
      <!--PInfo-->  <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cPerformanceInfo)}">${getNameOfError(jsonData.ttTestCaseResults[i].cPerformanceInfo, detailLenght)}</p>
      </div>
      </div>`
    }
    else if (search == '' && checkSuccessError != '') {
      if (checkSuccessError == "success" && jsonData.ttTestCaseResults[i].lSuccess == true) {
        exportCode += `
        <div class="message_container" id="${i}_message" style="box-shadow: 0.2vw 1vw 2.2vw 0vw ${colorOfSmoke};">
        ${checkTimeLimit(i)}
        <div class="button_display" ondblclick="generatePopup(${i})">
        <p class="button_text" title="${jsonData.ttTestCaseResults[i].cSuite}">${nameOfError}\n[${descriptionofError}]</p>
        </div>
        <img class="dropdown_arrow" src="./img/dropdown-pfeil.png" onclick="generateDetails(${i})">
        <div class="detail_container" id="${i}_detail">
        <!--cTest-->    <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cTest)}">${getNameOfError(jsonData.ttTestCaseResults[i].cTest, detailLenght)}</p>
        <!--cRuntime-->   <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cRunDescription)}">${getNameOfError(jsonData.ttTestCaseResults[i].cRunDescription, detailLenght)}</p>
        <!--ExitCode-->  <p title="${jsonData.ttTestCaseResults[i].iExitCode}">${getNameOfError(jsonData.ttTestCaseResults[i].iExitCode, detailLenght)}</p>
        <!--ExceptionMessage-->  <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cExceptionMessage)}">${getNameOfError(jsonData.ttTestCaseResults[i].cExceptionMessage, detailLenght)}</p>
        <!--cInfo-->  <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cInfoMessages)}">${escapeHTML(getNameOfError(jsonData.ttTestCaseResults[i].cInfoMessages, detailLenght))}</p>
        <!--Time-->  <p title="${jsonData.ttTestCaseResults[i].dTotalExecutionTime}">${getNameOfError(jsonData.ttTestCaseResults[i].dTotalExecutionTime, detailLenght)}</p>
        <!--Time-->  <p title="${jsonData.ttTestCaseResults[i].dTestCaseExecutionTime}">${getNameOfError(jsonData.ttTestCaseResults[i].dTestCaseExecutionTime, detailLenght)}</p>
        <!--Alert-->  <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cPerformanceAlert)}">${getNameOfError(jsonData.ttTestCaseResults[i].cPerformanceAlert, detailLenght)}</p>
        <!--PInfo-->  <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cPerformanceInfo)}">${getNameOfError(jsonData.ttTestCaseResults[i].cPerformanceInfo, detailLenght)}</p>
        </div>
        </div>`
      }
      else if (checkSuccessError == "fail" && jsonData.ttTestCaseResults[i].lSuccess == false) {
        exportCode += `
        <div class="message_container" id="${i}_message" style="box-shadow: 0.2vw 1vw 2.2vw 0vw ${colorOfSmoke};">
        ${checkTimeLimit(i)}
        <div class="button_display" ondblclick="generatePopup(${i})">
        <p class="button_text" title="${jsonData.ttTestCaseResults[i].cSuite}">${nameOfError}\n[${descriptionofError}]</p>
        </div>
        <img class="dropdown_arrow" src="./img/dropdown-pfeil.png" onclick="generateDetails(${i})">
        <div class="detail_container" id="${i}_detail">
        <!--cTest-->    <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cTest)}">${getNameOfError(jsonData.ttTestCaseResults[i].cTest, detailLenght)}</p>
        <!--cRuntime-->   <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cRunDescription)}">${getNameOfError(jsonData.ttTestCaseResults[i].cRunDescription, detailLenght)}</p>
        <!--ExitCode-->  <p title="${jsonData.ttTestCaseResults[i].iExitCode}">${getNameOfError(jsonData.ttTestCaseResults[i].iExitCode, detailLenght)}</p>
        <!--ExceptionMessage-->  <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cExceptionMessage)}">${getNameOfError(jsonData.ttTestCaseResults[i].cExceptionMessage, detailLenght)}</p>
        <!--cInfo-->  <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cInfoMessages)}">${escapeHTML(getNameOfError(jsonData.ttTestCaseResults[i].cInfoMessages, detailLenght))}</p>
        <!--Time-->  <p title="${jsonData.ttTestCaseResults[i].dTotalExecutionTime}">${getNameOfError(jsonData.ttTestCaseResults[i].dTotalExecutionTime, detailLenght)}</p>
        <!--Time-->  <p title="${jsonData.ttTestCaseResults[i].dTestCaseExecutionTime}">${getNameOfError(jsonData.ttTestCaseResults[i].dTestCaseExecutionTime, detailLenght)}</p>
        <!--Alert-->  <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cPerformanceAlert)}">${getNameOfError(jsonData.ttTestCaseResults[i].cPerformanceAlert, detailLenght)}</p>
        <!--PInfo-->  <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cPerformanceInfo)}">${getNameOfError(jsonData.ttTestCaseResults[i].cPerformanceInfo, detailLenght)}</p>
        </div>
        </div>`
      }
      else if (checkSuccessError == "warning" && jsonData.ttTestCaseResults[i].lSuccess == true && checkTimeLimit(i) != "") {
        exportCode += `
      <div class="message_container" id="${i}_message" style="box-shadow: 0.2vw 1vw 2.2vw 0vw ${colorOfSmoke};">
      ${checkTimeLimit(i)}
      <div class="button_display" ondblclick="generatePopup(${i})">
      <p class="button_text" title="${jsonData.ttTestCaseResults[i].cSuite}">${nameOfError}\n[${descriptionofError}]</p>
      </div>
      <img class="dropdown_arrow" src="./img/dropdown-pfeil.png" onclick="generateDetails(${i})">
      <div class="detail_container" id="${i}_detail">
      <!--cTest-->    <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cTest)}">${getNameOfError(jsonData.ttTestCaseResults[i].cTest, detailLenght)}</p>
      <!--cRuntime-->   <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cRunDescription)}">${getNameOfError(jsonData.ttTestCaseResults[i].cRunDescription, detailLenght)}</p>
      <!--ExitCode-->  <p title="${jsonData.ttTestCaseResults[i].iExitCode}">${getNameOfError(jsonData.ttTestCaseResults[i].iExitCode, detailLenght)}</p>
      <!--ExceptionMessage-->  <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cExceptionMessage)}">${getNameOfError(jsonData.ttTestCaseResults[i].cExceptionMessage, detailLenght)}</p>
      <!--cInfo-->  <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cInfoMessages)}">${escapeHTML(getNameOfError(jsonData.ttTestCaseResults[i].cInfoMessages, detailLenght))}</p>
      <!--Time-->  <p title="${jsonData.ttTestCaseResults[i].dTotalExecutionTime}">${getNameOfError(jsonData.ttTestCaseResults[i].dTotalExecutionTime, detailLenght)}</p>
      <!--Time-->  <p title="${jsonData.ttTestCaseResults[i].dTestCaseExecutionTime}">${getNameOfError(jsonData.ttTestCaseResults[i].dTestCaseExecutionTime, detailLenght)}</p>
      <!--Alert-->  <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cPerformanceAlert)}">${getNameOfError(jsonData.ttTestCaseResults[i].cPerformanceAlert, detailLenght)}</p>
      <!--PInfo-->  <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cPerformanceInfo)}">${getNameOfError(jsonData.ttTestCaseResults[i].cPerformanceInfo, detailLenght)}</p>
      </div>
      </div>`
      
      }
      else if (checkSuccessError == "both_TandW" && jsonData.ttTestCaseResults[i].lSuccess == true) {
        console.log("generating warning");
        exportCode += `
        <div class="message_container" id="${i}_message" style="box-shadow: 0.2vw 1vw 2.2vw 0vw ${colorOfSmoke};">
        ${checkTimeLimit(i)}
        <div class="button_display" ondblclick="generatePopup(${i})">
        <p class="button_text" title="${jsonData.ttTestCaseResults[i].cSuite}">${nameOfError}\n[${descriptionofError}]</p>
        </div>
        <img class="dropdown_arrow" src="./img/dropdown-pfeil.png" onclick="generateDetails(${i})">
        <div class="detail_container" id="${i}_detail">
        <!--cTest-->    <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cTest)}">${getNameOfError(jsonData.ttTestCaseResults[i].cTest, detailLenght)}</p>
        <!--cRuntime-->   <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cRunDescription)}">${getNameOfError(jsonData.ttTestCaseResults[i].cRunDescription, detailLenght)}</p>
        <!--ExitCode-->  <p title="${jsonData.ttTestCaseResults[i].iExitCode}">${getNameOfError(jsonData.ttTestCaseResults[i].iExitCode, detailLenght)}</p>
        <!--ExceptionMessage-->  <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cExceptionMessage)}">${getNameOfError(jsonData.ttTestCaseResults[i].cExceptionMessage, detailLenght)}</p>
        <!--cInfo-->  <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cInfoMessages)}">${escapeHTML(getNameOfError(jsonData.ttTestCaseResults[i].cInfoMessages, detailLenght))}</p>
        <!--Time-->  <p title="${jsonData.ttTestCaseResults[i].dTotalExecutionTime}">${getNameOfError(jsonData.ttTestCaseResults[i].dTotalExecutionTime, detailLenght)}</p>
        <!--Time-->  <p title="${jsonData.ttTestCaseResults[i].dTestCaseExecutionTime}">${getNameOfError(jsonData.ttTestCaseResults[i].dTestCaseExecutionTime, detailLenght)}</p>
        <!--Alert-->  <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cPerformanceAlert)}">${getNameOfError(jsonData.ttTestCaseResults[i].cPerformanceAlert, detailLenght)}</p>
        <!--PInfo-->  <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cPerformanceInfo)}">${getNameOfError(jsonData.ttTestCaseResults[i].cPerformanceInfo, detailLenght)}</p>
        </div>
        </div>`
      
      }
    }
    else if (search != '' && checkSuccessError == '') {
      if (((nameOfError.toLowerCase()).includes(search.toLowerCase()) || (descriptionofError.toLowerCase()).includes(search.toLowerCase()))) {
        exportCode += `
        <div class="message_container" id="${i}_message" style="box-shadow: 0.2vw 1vw 2.2vw 0vw ${colorOfSmoke};">
        ${checkTimeLimit(i)}
        <div class="button_display" ondblclick="generatePopup(${i})">
        <p class="button_text" title="${jsonData.ttTestCaseResults[i].cSuite}">${nameOfError}\n[${descriptionofError}]</p>
        </div>
        <img class="dropdown_arrow" src="./img/dropdown-pfeil.png" onclick="generateDetails(${i})">
        <div class="detail_container" id="${i}_detail">
        <!--cTest-->    <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cTest)}">${getNameOfError(jsonData.ttTestCaseResults[i].cTest, detailLenght)}</p>
        <!--cRuntime-->   <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cRunDescription)}">${getNameOfError(jsonData.ttTestCaseResults[i].cRunDescription, detailLenght)}</p>
        <!--ExitCode-->  <p title="${jsonData.ttTestCaseResults[i].iExitCode}">${getNameOfError(jsonData.ttTestCaseResults[i].iExitCode, detailLenght)}</p>
        <!--ExceptionMessage-->  <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cExceptionMessage)}">${getNameOfError(jsonData.ttTestCaseResults[i].cExceptionMessage, detailLenght)}</p>
        <!--cInfo-->  <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cInfoMessages)}">${escapeHTML(getNameOfError(jsonData.ttTestCaseResults[i].cInfoMessages, detailLenght))}</p>
        <!--Time-->  <p title="${jsonData.ttTestCaseResults[i].dTotalExecutionTime}">${getNameOfError(jsonData.ttTestCaseResults[i].dTotalExecutionTime, detailLenght)}</p>
        <!--Time-->  <p title="${jsonData.ttTestCaseResults[i].dTestCaseExecutionTime}">${getNameOfError(jsonData.ttTestCaseResults[i].dTestCaseExecutionTime, detailLenght)}</p>
        <!--Alert-->  <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cPerformanceAlert)}">${getNameOfError(jsonData.ttTestCaseResults[i].cPerformanceAlert, detailLenght)}</p>
        <!--PInfo-->  <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cPerformanceInfo)}">${getNameOfError(jsonData.ttTestCaseResults[i].cPerformanceInfo, detailLenght)}</p>
        </div>
        </div>`
      }

    }
    else if (search != '' && checkSuccessError != '') {
      if (((nameOfError.toLowerCase()).includes(search.toLowerCase()) || (descriptionofError.toLowerCase()).includes(search.toLowerCase())) && checkSuccessError == "success" && jsonData.ttTestCaseResults[i].lSuccess == true) {
        exportCode += `
      <div class="message_container" id="${i}_message" style="box-shadow: 0.2vw 1vw 2.2vw 0vw ${colorOfSmoke};">
      ${checkTimeLimit(i)}
      <div class="button_display" ondblclick="generatePopup(${i})">
      <p class="button_text" title="${jsonData.ttTestCaseResults[i].cSuite}">${nameOfError}\n[${descriptionofError}]</p>
      </div>
      <img class="dropdown_arrow" src="./img/dropdown-pfeil.png" onclick="generateDetails(${i})">
      <div class="detail_container" id="${i}_detail">
      <!--cTest-->    <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cTest)}">${getNameOfError(jsonData.ttTestCaseResults[i].cTest, detailLenght)}</p>
      <!--cRuntime-->   <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cRunDescription)}">${getNameOfError(jsonData.ttTestCaseResults[i].cRunDescription, detailLenght)}</p>
      <!--ExitCode-->  <p title="${jsonData.ttTestCaseResults[i].iExitCode}">${getNameOfError(jsonData.ttTestCaseResults[i].iExitCode, detailLenght)}</p>
      <!--ExceptionMessage-->  <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cExceptionMessage)}">${getNameOfError(jsonData.ttTestCaseResults[i].cExceptionMessage, detailLenght)}</p>
      <!--cInfo-->  <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cInfoMessages)}">${escapeHTML(getNameOfError(jsonData.ttTestCaseResults[i].cInfoMessages, detailLenght))}</p>
      <!--Time-->  <p title="${jsonData.ttTestCaseResults[i].dTotalExecutionTime}">${getNameOfError(jsonData.ttTestCaseResults[i].dTotalExecutionTime, detailLenght)}</p>
      <!--Time-->  <p title="${jsonData.ttTestCaseResults[i].dTestCaseExecutionTime}">${getNameOfError(jsonData.ttTestCaseResults[i].dTestCaseExecutionTime, detailLenght)}</p>
      <!--Alert-->  <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cPerformanceAlert)}">${getNameOfError(jsonData.ttTestCaseResults[i].cPerformanceAlert, detailLenght)}</p>
      <!--PInfo-->  <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cPerformanceInfo)}">${getNameOfError(jsonData.ttTestCaseResults[i].cPerformanceInfo, detailLenght)}</p>
      </div>
      </div>`
      }
      else if (((nameOfError.toLowerCase()).includes(search.toLowerCase()) || (descriptionofError.toLowerCase()).includes(search.toLowerCase())) && checkSuccessError == "fail" && jsonData.ttTestCaseResults[i].lSuccess == false) {
        exportCode += `
        <div class="message_container" id="${i}_message" style="box-shadow: 0.2vw 1vw 2.2vw 0vw ${colorOfSmoke};">
        ${checkTimeLimit(i)}
        <div class="button_display" ondblclick="generatePopup(${i})">
        <p class="button_text" title="${jsonData.ttTestCaseResults[i].cSuite}">${nameOfError}\n[${descriptionofError}]</p>
        </div>
        <img class="dropdown_arrow" src="./img/dropdown-pfeil.png" onclick="generateDetails(${i})">
        <div class="detail_container" id="${i}_detail">
        <!--cTest-->    <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cTest)}">${getNameOfError(jsonData.ttTestCaseResults[i].cTest, detailLenght)}</p>
        <!--cRuntime-->   <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cRunDescription)}">${getNameOfError(jsonData.ttTestCaseResults[i].cRunDescription, detailLenght)}</p>
        <!--ExitCode-->  <p title="${jsonData.ttTestCaseResults[i].iExitCode}">${getNameOfError(jsonData.ttTestCaseResults[i].iExitCode, detailLenght)}</p>
        <!--ExceptionMessage-->  <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cExceptionMessage)}">${getNameOfError(jsonData.ttTestCaseResults[i].cExceptionMessage, detailLenght)}</p>
        <!--cInfo-->  <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cInfoMessages)}">${escapeHTML(getNameOfError(jsonData.ttTestCaseResults[i].cInfoMessages, detailLenght))}</p>
        <!--Time-->  <p title="${jsonData.ttTestCaseResults[i].dTotalExecutionTime}">${getNameOfError(jsonData.ttTestCaseResults[i].dTotalExecutionTime, detailLenght)}</p>
        <!--Time-->  <p title="${jsonData.ttTestCaseResults[i].dTestCaseExecutionTime}">${getNameOfError(jsonData.ttTestCaseResults[i].dTestCaseExecutionTime, detailLenght)}</p>
        <!--Alert-->  <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cPerformanceAlert)}">${getNameOfError(jsonData.ttTestCaseResults[i].cPerformanceAlert, detailLenght)}</p>
        <!--PInfo-->  <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cPerformanceInfo)}">${getNameOfError(jsonData.ttTestCaseResults[i].cPerformanceInfo, detailLenght)}</p>
        </div>
        </div>`
      }
      else if (((nameOfError.toLowerCase()).includes(search.toLowerCase()) || (descriptionofError.toLowerCase()).includes(search.toLowerCase())) && checkSuccessError == "both_TandF") {
        exportCode += `
        <div class="message_container" id="${i}_message" style="box-shadow: 0.2vw 1vw 2.2vw 0vw ${colorOfSmoke};">
        ${checkTimeLimit(i)}
        <div class="button_display" ondblclick="generatePopup(${i})">
        <p class="button_text" title="${jsonData.ttTestCaseResults[i].cSuite}">${nameOfError}\n[${descriptionofError}]</p>
        </div>
        <img class="dropdown_arrow" src="./img/dropdown-pfeil.png" onclick="generateDetails(${i})">
        <div class="detail_container" id="${i}_detail">
        <!--cTest-->    <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cTest)}">${getNameOfError(jsonData.ttTestCaseResults[i].cTest, detailLenght)}</p>
        <!--cRuntime-->   <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cRunDescription)}">${getNameOfError(jsonData.ttTestCaseResults[i].cRunDescription, detailLenght)}</p>
        <!--ExitCode-->  <p title="${jsonData.ttTestCaseResults[i].iExitCode}">${getNameOfError(jsonData.ttTestCaseResults[i].iExitCode, detailLenght)}</p>
        <!--ExceptionMessage-->  <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cExceptionMessage)}">${getNameOfError(jsonData.ttTestCaseResults[i].cExceptionMessage, detailLenght)}</p>
        <!--cInfo-->  <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cInfoMessages)}">${escapeHTML(getNameOfError(jsonData.ttTestCaseResults[i].cInfoMessages, detailLenght))}</p>
        <!--Time-->  <p title="${jsonData.ttTestCaseResults[i].dTotalExecutionTime}">${getNameOfError(jsonData.ttTestCaseResults[i].dTotalExecutionTime, detailLenght)}</p>
        <!--Time-->  <p title="${jsonData.ttTestCaseResults[i].dTestCaseExecutionTime}">${getNameOfError(jsonData.ttTestCaseResults[i].dTestCaseExecutionTime, detailLenght)}</p>
        <!--Alert-->  <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cPerformanceAlert)}">${getNameOfError(jsonData.ttTestCaseResults[i].cPerformanceAlert, detailLenght)}</p>
        <!--PInfo-->  <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cPerformanceInfo)}">${getNameOfError(jsonData.ttTestCaseResults[i].cPerformanceInfo, detailLenght)}</p>
        </div>
        </div>`
      }
      else if (((nameOfError.toLowerCase()).includes(search.toLowerCase()) || (descriptionofError.toLowerCase()).includes(search.toLowerCase())) && checkSuccessError == "warning" && jsonData.ttTestCaseResults[i].lSuccess == true && checkTimeLimit(i) != "") {
        exportCode += `
      <div class="message_container" id="${i}_message" style="box-shadow: 0.2vw 1vw 2.2vw 0vw ${colorOfSmoke};">
      ${checkTimeLimit(i)}
      <div class="button_display" ondblclick="generatePopup(${i})">
      <p class="button_text" title="${jsonData.ttTestCaseResults[i].cSuite}">${nameOfError}\n[${descriptionofError}]</p>
      </div>
      <img class="dropdown_arrow" src="./img/dropdown-pfeil.png" onclick="generateDetails(${i})">
      <div class="detail_container" id="${i}_detail">
      <!--cTest-->    <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cTest)}">${getNameOfError(jsonData.ttTestCaseResults[i].cTest, detailLenght)}</p>
      <!--cRuntime-->   <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cRunDescription)}">${getNameOfError(jsonData.ttTestCaseResults[i].cRunDescription, detailLenght)}</p>
      <!--ExitCode-->  <p title="${jsonData.ttTestCaseResults[i].iExitCode}">${getNameOfError(jsonData.ttTestCaseResults[i].iExitCode, detailLenght)}</p>
      <!--ExceptionMessage-->  <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cExceptionMessage)}">${getNameOfError(jsonData.ttTestCaseResults[i].cExceptionMessage, detailLenght)}</p>
      <!--cInfo-->  <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cInfoMessages)}">${escapeHTML(getNameOfError(jsonData.ttTestCaseResults[i].cInfoMessages, detailLenght))}</p>
      <!--Time-->  <p title="${jsonData.ttTestCaseResults[i].dTotalExecutionTime}">${getNameOfError(jsonData.ttTestCaseResults[i].dTotalExecutionTime, detailLenght)}</p>
      <!--Time-->  <p title="${jsonData.ttTestCaseResults[i].dTestCaseExecutionTime}">${getNameOfError(jsonData.ttTestCaseResults[i].dTestCaseExecutionTime, detailLenght)}</p>
      <!--Alert-->  <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cPerformanceAlert)}">${getNameOfError(jsonData.ttTestCaseResults[i].cPerformanceAlert, detailLenght)}</p>
      <!--PInfo-->  <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cPerformanceInfo)}">${getNameOfError(jsonData.ttTestCaseResults[i].cPerformanceInfo, detailLenght)}</p>
      </div>
      </div>`
      }
      else if (((nameOfError.toLowerCase()).includes(search.toLowerCase()) || (descriptionofError.toLowerCase()).includes(search.toLowerCase())) && checkSuccessError == "both_TandW" && jsonData.ttTestCaseResults[i].lSuccess == true) {
        exportCode += `
        <div class="message_container" id="${i}_message" style="box-shadow: 0.2vw 1vw 2.2vw 0vw ${colorOfSmoke};">
        ${checkTimeLimit(i)}
        <div class="button_display" ondblclick="generatePopup(${i})">
        <p class="button_text" title="${jsonData.ttTestCaseResults[i].cSuite}">${nameOfError}\n[${descriptionofError}]</p>
        </div>
        <img class="dropdown_arrow" src="./img/dropdown-pfeil.png" onclick="generateDetails(${i})">
        <div class="detail_container" id="${i}_detail">
        <!--cTest-->    <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cTest)}">${getNameOfError(jsonData.ttTestCaseResults[i].cTest, detailLenght)}</p>
        <!--cRuntime-->   <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cRunDescription)}">${getNameOfError(jsonData.ttTestCaseResults[i].cRunDescription, detailLenght)}</p>
        <!--ExitCode-->  <p title="${jsonData.ttTestCaseResults[i].iExitCode}">${getNameOfError(jsonData.ttTestCaseResults[i].iExitCode, detailLenght)}</p>
        <!--ExceptionMessage-->  <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cExceptionMessage)}">${getNameOfError(jsonData.ttTestCaseResults[i].cExceptionMessage, detailLenght)}</p>
        <!--cInfo-->  <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cInfoMessages)}">${escapeHTML(getNameOfError(jsonData.ttTestCaseResults[i].cInfoMessages, detailLenght))}</p>
        <!--Time-->  <p title="${jsonData.ttTestCaseResults[i].dTotalExecutionTime}">${getNameOfError(jsonData.ttTestCaseResults[i].dTotalExecutionTime, detailLenght)}</p>
        <!--Time-->  <p title="${jsonData.ttTestCaseResults[i].dTestCaseExecutionTime}">${getNameOfError(jsonData.ttTestCaseResults[i].dTestCaseExecutionTime, detailLenght)}</p>
        <!--Alert-->  <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cPerformanceAlert)}">${getNameOfError(jsonData.ttTestCaseResults[i].cPerformanceAlert, detailLenght)}</p>
        <!--PInfo-->  <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cPerformanceInfo)}">${getNameOfError(jsonData.ttTestCaseResults[i].cPerformanceInfo, detailLenght)}</p>
        </div>
        </div>`
      }
    }
    else {
      console.log("none were found");
    }

  }
  main_container.innerHTML = exportCode;
  console.log("DONE :)");
}
//Function to generate details
function generateDetails(id) {
  let message = document.getElementById(id + "_message")
  let detail = document.getElementById(id + "_detail")
  if (detail.style.display == "none") {
    animateDetail(detail,message,  true)
    detail.style.display = "grid"
    message.style.height = "25vw"
  }
  else {
    animateDetail(detail,message, false)
    setTimeout(function () {
      detail.style.display = "none"
    }, 60)


  }
}
//Function to get active Filters
function getFilters() {
  successTerm = ""
  searchTerm = searchbar.value;

  if (success_check.checked == true && fail_check.checked == false) {
    successTerm = "success"
  }
  else if (success_check.checked == true && fail_check.checked == true) {
    successTerm = "both_TandF"
  }
  else if (success_check.checked == false && fail_check.checked == true) {
    successTerm = "fail"
  }
  else if (warning_check.checked == true && success_check.checked == false && fail_check.checked == false) {
    successTerm = "warning"
  }
  else if (warning_check.checked == true && success_check.checked == true && fail_check.checked == false) {
    successTerm = "both_TandW"
  }
}
//Function to recall all startup functions
function Recall() {
    w.postMessage(jsonData)
    failDisplay.innerHTML = "Failed Tests: "
    successDisplay.innerHTML = "Successfull Tests: "
    warningDisplay.innerHTML = "Warnings:  "
    failedTests = 0
    warningTests = 0
    successfullTests = 0
    getFilters()
    generateResults(searchTerm, successTerm)
    
    
    failDisplay.innerHTML += failedTests;
    successDisplay.innerHTML += successfullTests;
    warningDisplay.innerHTML += warningTests;
}
//Function to generate a popup on double click
function generatePopup(i) {
  message_popup.style.top =  window.scrollY + 200+ "px"
  if (message_popup.style.display === 'none') {
    message_popup.innerHTML = `
    <div id="popup_container" ondblclick="generatePopup(${i})" >
        <!--cTest-->    <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cTest)}">${jsonData.ttTestCaseResults[i].cTest}</p>
        <!--cRuntime-->   <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cRunDescription)}">${jsonData.ttTestCaseResults[i].cRunDescription}</p>
        <!--ExitCode-->  <p title="${jsonData.ttTestCaseResults[i].iExitCode}">${jsonData.ttTestCaseResults[i].iExitCode}</p>
        <!--ExceptionMessage-->  <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cExceptionMessage)}">${jsonData.ttTestCaseResults[i].cExceptionMessage}</p>
        <!--cInfo--><div id="infoContainer"></div>
        <!--Time-->  <p title="${jsonData.ttTestCaseResults[i].dTotalExecutionTime}">${jsonData.ttTestCaseResults[i].dTotalExecutionTime}</p>
        <!--Time-->  <p title="${jsonData.ttTestCaseResults[i].dTestCaseExecutionTime}">${jsonData.ttTestCaseResults[i].dTestCaseExecutionTime}</p>
        <!--Alert-->  <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cPerformanceAlert)}">${jsonData.ttTestCaseResults[i].cPerformanceAlert}</p>
        <!--PInfo-->  <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cPerformanceInfo)}">${jsonData.ttTestCaseResults[i].cPerformanceInfo}</p>
        </div>
    `
    document.getElementById("infoContainer").appendChild(generateInfo(escapeHTML(jsonData.ttTestCaseResults[i].cInfoMessages)))
    message_popup.style.display = 'block'
    animatePopup(true)
  }
  else if (message_popup.style.display === 'block') {
   
    animatePopup(false)
   /setTimeout(function(){
      message_popup.style.display = 'none'
    },150)

  }
  else{
    message_popup.innerHTML = `
    <div id="popup_container" ondblclick="generatePopup(${i})">
        <!--cTest-->    <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cTest)}">${jsonData.ttTestCaseResults[i].cTest}</p>
        <!--cRuntime-->   <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cRunDescription)}">${jsonData.ttTestCaseResults[i].cRunDescription}</p>
        <!--ExitCode-->  <p title="${jsonData.ttTestCaseResults[i].iExitCode}">${jsonData.ttTestCaseResults[i].iExitCode}</p>
        <!--ExceptionMessage-->  <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cExceptionMessage)}">${jsonData.ttTestCaseResults[i].cExceptionMessage}</p>
        <!--cInfo--><div id="infoContainer"></div>
        <!--Time-->  <p title="${jsonData.ttTestCaseResults[i].dTotalExecutionTime}">${jsonData.ttTestCaseResults[i].dTotalExecutionTime}</p>
        <!--Time-->  <p title="${jsonData.ttTestCaseResults[i].dTestCaseExecutionTime}">${jsonData.ttTestCaseResults[i].dTestCaseExecutionTime}</p>
        <!--Alert-->  <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cPerformanceAlert)}">${jsonData.ttTestCaseResults[i].cPerformanceAlert}</p>
        <!--PInfo-->  <p title="${escapeHTML(jsonData.ttTestCaseResults[i].cPerformanceInfo)}">${jsonData.ttTestCaseResults[i].cPerformanceInfo}</p>
        </div>
    `
    document.getElementById("infoContainer").appendChild(generateInfo(escapeHTML(jsonData.ttTestCaseResults[i].cInfoMessages)))
    message_popup.style.display = 'block'
    animatePopup(true)
  }
 
}
/*----------------------------------------------------------------------------------*/
/**anime js*/

function animateDetail(detail,message, inAndOut) {

  if (inAndOut) {
    anime({
      targets: detail,
      bottom: 0,
      duration: 400,
      delay: 50
    });
    anime({
      targets: message,
      height: "25vw",
      duration: 400,
      delay: 50
    });
  } else {
    anime({
      targets: detail,
      bottom: 10,
      duration: 400,
      delay: 0
    });
    anime({
      targets: message,
      height: "4vw",
      duration: 400,
      delay: 0
    });
  }

}
function animatePopup(inAndOut) {
  console.log("animate");
  if(inAndOut){
    anime({
      targets: message_popup,
      scale: 1, 
      duration: 400,
      delay: 100
    });
  }
  else{
    console.log("animate back");
    anime({
      targets: message_popup,
      scale: 0, 
      duration: 200,
      delay: 100
    });
  }
}
function animatePopupInit() {
  anime({
    targets: message_popup,
    scale: 0, 
    duration: 400,
    delay: 0
  });
}