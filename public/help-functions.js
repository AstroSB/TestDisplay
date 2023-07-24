/*----------------------------------------------------------------------------------*/
/*Help Functions*/

// Function to read JSON file
function readJSONFile(adress) {
    fetch(adress)
      .then((response) => response.json())
      .then((json) => {
   
        jsonData = json; 
        console.log("logging data: ");
        console.log(jsonData);
        getFilters()
        generateResults(searchTerm, successTerm);
        failDisplay.innerHTML += failedTests;
        successDisplay.innerHTML += successfullTests;
        warningDisplay.innerHTML += warningTests;
        startWorker()
        animatePopupInit()
      });
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
      exportArray2[exportArray2.length] = getNameOfLast(jsonData.ttTestCaseResults[i].cTest);
      exportArray2 = getCamelCaseArray(exportArray2[i], exportArray2)
    }
    exportArray = exportArray1.concat(exportArray2)
    var unique = exportArray.filter(onlyUnique);
    sort(unique, unique.length)
    return unique
  }
  //reads the filecontent of a newly given JSON file
  function readFileContent(file) {
    const reader = new FileReader();
  
    reader.onload = (event) => {
      jsonData = JSON.parse(event.target.result);
      console.log('', jsonData);
      Recall();
    };
  
    reader.onerror = (event) => {
      console.error('Error reading the file:', event.target.error);
    };
  
    reader.readAsText(file); // This will read the file as text, you can use other methods based on your needs (e.g., readAsDataURL, readAsArrayBuffer, etc.).
  
  
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
  function getCamelCaseArray(string, array) {
    let positions = []
    let posCounter = 0
    let arraylength = array.length
    for (let i = 0; i < string.length; i++) {
      if (string[i] == string[i].toUpperCase()) {
        positions[posCounter] = i
        posCounter++;
      }
    }
    for (let i = 0; i < positions.length; i++) {
      array[arraylength] = string.substring(positions[i], positions[i + 1])
     // console.log("position in array: " + arraylength);
     // console.log("string: "+ string.substring(positions[i], positions[i + 1]));
      arraylength++
     
    }
   // console.log("Array: ");
    //console.log(array);
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
  //sorts array based on lenght 
  function sort(s, n)
  {
      for (let i = 1 ; i < n; i++)
      {
          let temp = s[i];
  
          // Insert s[j] at its correct position
          let j = i - 1;
          while (j >= 0 && temp.length < s[j].length)
          {
              s[j + 1] = s[j];
              j--;
          }
          s[j + 1] = temp;
      }
  }
  //generates info <br> tags
  function generateInfo(string) {
  
  
      const stringWithoutNewlines = string.replace(/\n/g, '');  
      const parts = stringWithoutNewlines.split('#');
      const paragraph = document.createElement('p');
      for (let i = 0; i < parts.length; i++) {
        paragraph.appendChild(document.createTextNode(parts[i]));
    
        if (i < parts.length - 1) {
          paragraph.appendChild(document.createElement('br'));
        }
      }
      console.log(paragraph);
      return paragraph;
  
    
  }
  //starts worker
  function startWorker() {
    if(typeof(Worker) !== "undefined") {
      if(typeof(w) == "undefined") {
        w = new Worker("worker.js");
        w.postMessage(jsonData)
      }
      w.onmessage = function(event) {
        let results = event.data;
        sendData(results)
        var area = new AutoSuggestControl("searchbar");
        autocomplete(searchbar, results)
      };
    } else {
     console.log("browser error");;
    }
  }
  //ends worker
  function stopWorker() { 
    w.terminate();
    w = undefined;
  }