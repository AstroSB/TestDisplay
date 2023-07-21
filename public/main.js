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
const detailLenght = 45;
const generalLenght = 32
let successfullTests = 0;
let failedTests = 0
let warningTests = 0
let searchTerm = "";
let successTerm = "";
var newJSON = {};



/*----------------------------------------------------------------------------------*/
/*Startup Section*/
startup()
function startup() {
  console.log("loading with json " + "./data/results.json");
readJSONFile("./data/results.json")
//Wait for data
setTimeout(function () {
  console.log("logging data: ");
  console.log(jsonData);
  getFilters()
  generateResults(searchTerm, successTerm);
  var area = new AutoSuggestControl("searchbar");
  failDisplay.innerHTML += failedTests;
  successDisplay.innerHTML += successfullTests;
  warningDisplay.innerHTML += warningTests;
  autocomplete(searchbar, getAutoArray())
}, 400)
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
    console.log(" instances ran smooth");
    let colorOfSmoke = getColorOfSmoke(jsonData.ttTestCaseResults[i].lSuccess,checkTimeLimit(i));
    let nameOfError = getNameOfError(jsonData.ttTestCaseResults[i].cSuite, generalLenght);
    let descriptionofError = getNameOfLast(jsonData.ttTestCaseResults[i].cTest)
    if ((search == '' && checkSuccessError == '') || (successTerm == "both_TandF" && search == '')) {
      exportCode += `
      <div class="message_container" id="${i}_message" style="box-shadow: 0.2vw 1vw 2.2vw 0vw ${colorOfSmoke};">
      ${checkTimeLimit(i)}
      <div class="button_display">
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
      <div class="button_display">
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
        <div class="button_display">
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
        <div class="button_display">
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
        <div class="button_display">
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
      <div class="button_display">
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
      <div class="button_display">
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
      <div class="button_display">
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
        <div class="button_display">
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
        <div class="button_display">
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
        <div class="button_display">
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
  setTimeout(function () {
    failDisplay.innerHTML = "Failed Tests: "
    successDisplay.innerHTML = "Successfull Tests: "
    warningDisplay.innerHTML = "Warnings:  "
    failedTests = 0
    warningTests = 0
    successfullTests = 0
    getFilters()
    generateResults(searchTerm, successTerm)
    var area = new AutoSuggestControl("searchbar");
    autocomplete(searchbar, getAutoArray())
    failDisplay.innerHTML += failedTests;
    successDisplay.innerHTML += successfullTests;
    warningDisplay.innerHTML += warningTests;
  }, 400)
}


/*----------------------------------------------------------------------------------*/
/*Help Functions*/

// Function to read JSON file
function readJSONFile(adress) {
  fetch(adress)
    .then((response) => response.json())
    .then((json) => jsonData = json);
}
//Function to get the color of smoke based on a boolean[also calculates the number of failed successfull and warning Tests]
function getColorOfSmoke(state,warning) {
  let ExportcolorOfSmoke;
  if (state == true && warning == "") {
    ExportcolorOfSmoke = "var(--moveITSuccess)"
    successfullTests++;
  }
  else if(state == false && warning != ""){
    ExportcolorOfSmoke = "var(--moveITError)"
    failedTests++;
  }
  else if(state == false){
    ExportcolorOfSmoke = "var(--moveITError)"
    failedTests++;
  }
  else{
    ExportcolorOfSmoke = "var(--moveITWarning)"
    successfullTests++;
    warningTests++
  }
  return ExportcolorOfSmoke;
}
//Function to get the error name based on it´s length
function getNameOfError(name, length) {
  if (name != null) {
    let ExportnameOfError;
    if (name.length > length) {
      ExportnameOfError = name.substring(0, length - 3) + "..."
    }
    else {
      ExportnameOfError = name;
    }
    return ExportnameOfError;
  }
}
//Function used to convert html to string 
function escapeHTML(string) {
  if (string === null || string === undefined) {
    return "";
  }
  else {
    return string.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}
//gets the array of all the names for auto complete
function getAutoArray() {
  let exportArray = []
  let exportArray1 = []
  let exportArray2 = []
  let exportArray3 = []
  for (let i = 0; i < jsonData.ttTestCaseResults.length; i++) {
    exportArray1[i] = jsonData.ttTestCaseResults[i].cSuite
    exportArray2[i] = getNameOfLast(jsonData.ttTestCaseResults[i].cTest);
    exportArray3 = exportArray3.concat(getCamelCaseArray(getNameOfLast(jsonData.ttTestCaseResults[i].cTest)))
  }

  exportArray = exportArray1.concat(exportArray2)
  exportArray = exportArray.concat(exportArray3)
  var unique = exportArray.filter(onlyUnique);
  return unique
}
//reads the filecontent of a newly given JSON file
function readFileContent(file) {
  const reader = new FileReader();

  reader.onload = (event) => {
    jsonData = JSON.parse(event.target.result);
    console.log('', jsonData);
  };

  reader.onerror = (event) => {
    console.error('Error reading the file:', event.target.error);
  };

  reader.readAsText(file); // This will read the file as text, you can use other methods based on your needs (e.g., readAsDataURL, readAsArrayBuffer, etc.).

  Recall();
}
//gets the last one of the description and formats it 
function getNameOfLast(name) {
  let exportString

  let exportArray = name.split('.')
  exportString = exportArray[exportArray.length - 1]
  return getNameOfError(exportString, generalLenght);
}
//autocomplete for drop down
function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function (e) {
    var a, b, i, val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) { return false; }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function (e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
          /*close the list of autocompleted values,
          (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }
      else if (arr[i].toLowerCase().includes(val.toLowerCase())) {
        b = document.createElement("DIV");
        b.innerHTML = "<strong>" + arr[i] + "</strong>";
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        b.addEventListener("click", function (e) {
          inp.value = this.getElementsByTagName("input")[0].value;
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
      increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) { //up
      /*If the arrow UP key is pressed,
      decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}
//reduces an array to only unique values
function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}
//gets a camel case string and makes it an array
function getCamelCaseArray(string) {
  let array = []
  let positions = []
  let posCounter = 0
  for (let i = 0; i < string.length; i++) {
    if (string[i] == string[i].toUpperCase()) {
      positions[posCounter] = i
      posCounter++;
    }
  }
  for (let i = 0; i < positions.length; i++) {
    array[i] = string.substring(positions[i], positions[i + 1])
  }
  return array;
}
//checks time limit
function checkTimeLimit(i) {
  if (jsonData.ttTestCaseResults[i].cPerformanceAlert == '+') {
    return '<img src="./img/clock.png" class="clock_img">'
  }
  else{
    return ""
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