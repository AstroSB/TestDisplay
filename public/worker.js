const generalLenght = 32
importScripts("./help-functions.js")
onmessage = (e) => {
    let jsonData = e.data
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

    postMessage(unique)
};
