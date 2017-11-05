var SS = SpreadsheetApp.openById("1Zgq9mWFOSMgVyf4H54r40ywnB-jIW9SGF-bBHId9hS4")
var dataSS = SpreadsheetApp.openById("1XgZzYR7xY6FVUWMEErCci_kmV19Npnyb0RkcowSQQZI")

var mainFolder = DriveApp.getFolderById("0B9b2ybGjWcqzRHNHM1NLcm1pRjg")
var dataFolder = DriveApp.getFolderById("0B9b2ybGjWcqzfk1VSVpHLVI2MWV1LVF6LTQxT05LcDh1ZjFtMGNPUDN5NlRTVGZSLUxfbGc")

function formSubmit(){
  
  var file = DriveApp.getFileById("0B9b2ybGjWcqzSHNnX1Z5OVp4cWc")
  var fileDate = new Date(file.getName().split(" ")[0])
  var csv = Utilities.parseCsv(file.getBlob().getDataAsString())
  
  var rows = getRow(fileDate)
  log(rows)
  
  var rawlist = []
  var maxpos = 0
  
  for(var i in csv){
    var c = csv[i]

    var mode = c[0]
    if(mode == "$RATIO"){
      
    }
    else if(mode =="$DATA"){
      var weight = c[2]
      var date = c[1]
      var area = c[5]
      var box = parseInt(c[8])
      var boxpos = parseInt(c[9])
      var b = box*2+boxpos-2
      if (b<0){b = 0}
      if (maxpos<b){maxpos = b}
      rawlist.push({"box": box, "boxpos": boxpos, "pos":b, "data": [date, weight, area]})
    }
  }
  
  //空のリストの準備代入
  var list = []
  for(var i = 0;i <= maxpos; i++){list.push([])}
  for(var i in rawlist){
    list[rawlist[i]["pos"]].push(rawlist[i])
  }
  log(" -------------- ")
  for(var i = 1; i <= maxpos; i++){
    var l = list[i]
    var box = l[0]["box"]
    var exsheet = dataSS.getSheetByName(rows[box])
    //一列の畝数をもとに一列を等分する
    //3，4，5の最小公倍数60を基準に一台を4なら15
    for (j in l){
      
      
    }
    //sheetへの出力
  }
  
  
  log("listlength = "+list.length)
  for(var i in list){
    log("i = "+i+" listlength = " + list[i].length)
  }
  //log(list)
}


function getRow(date){
  var sheet = SS.getSheetByName("収穫場所")
  var value = sheet.getRange(2, 1, sheet.getLastRow()-1, sheet.getLastColumn()-1).getValues()
  for(i in value){
    if(date.toDateString() == new Date(value[i][2]).toDateString()){
      log(date.toDateString() + "のデータです")
      return value[i][4].split(",")
    }
  }
  return false
}

function test(){
  var dir = DriveApp.getFolderById("0B9b2ybGjWcqzfk1VSVpHLVI2MWV1LVF6LTQxT05LcDh1ZjFtMGNPUDN5NlRTVGZSLUxfbGc")
  var files = dir.getFiles()
  var csv = []
  
  log("a", "b")
  while(files.hasNext()){
    var file = files.next()
    log(file.getMimeType() + " " + file.getName())
    if(file.getMimeType() != "text/csv")
      continue
    var str = file.getBlob().getDataAsString() 
    var c = Utilities.parseCsv(str)
    log(c.length)
    c.map(function(row){
      if(row[0] == "$DATA"){
        csv.push(row)
      }
    })
  }
  var out = csv.map(function(row){return row.join(",")}).join("\n")
  var outdata = Utilities.newBlob(out, "text/csv", "total.csv")
  var oldfile = mainFolder.getFilesByName("total.csv")
  if(oldfile.hasNext())
    mainFolder.removeFile(oldfile.next())
    
  mainFolder.createFile(outdata)
}



