function SessionInit(timeLength,breakLength){
  //todo set to minutes not seconds
  // 1sec*60 = 1min
  this.timelength   = timeLength;
  this.breaklength  = breakLength;
  this.running      = false;

}

increase = function(elementID){
  console.log(elementID);
  $("#"+elementID+"").val( Number($("#"+elementID+"").val()) + 1 );
  if(elementID == 'session'){
    document.getElementById("timer").innerHTML = document.getElementById("session").value;
  }
};

decrease = function(elementID){
  console.log(elementID);
  $("#"+elementID+"").val( Number($("#"+elementID+"").val()) - 1 );
  if(elementID == 'session'){
    document.getElementById("timer").innerHTML = document.getElementById("session").value;
  }
};

SessionInit.prototype.stopAll = function(){
  clearInterval(this.tictoc);
};

SessionInit.prototype.ringAlarm = function(){
    var sound = new Audio("audio/sounds-882-solemn.mp3");
    sound.play();
    sound.currentTime=0;
};

SessionInit.prototype.stop = function(clockvalue){
  clearInterval(clockvalue);
};

SessionInit.prototype.start = function(mysession,mybreak){
  this.timelength = mysession;
  this.breaklength = mybreak;
  this.running = true;
  this.count(mysession);
};

SessionInit.prototype.mybreak = function(breakvalue) {
  console.log('inside mybreak breakvalue: ' +breakvalue);
  var startDate2 = new Date();
  //set to false for one cycle
  var running = false;
  this.breaklength = breakvalue;
  this.tictoc = setInterval(function(){self.pulse(self.breaklength,startDate2,running)},1000);
  var self = this;
};

SessionInit.prototype.count = function(timevalue) {
  console.log('inside count');
  var startDate = new Date();
  var running = true;
  this.timelength = timevalue;
  this.tictoc = setInterval(function(){self.pulse(self.timelength,startDate,running)},1000);
  var self = this;
};

SessionInit.prototype.pulse = function(timevalue,sDate,running){
  var startDate = sDate;

  var diff = timevalue - (((Date.now() - startDate)/1000)|0);
  console.log('diff in pulse= '+diff);
  if (diff < 0) {
    //call audio here
    this.ringAlarm();

    var self = this;

    if (running == true) {
      this.stop(self.tictoc);
      console.log('self.break ' + self.breaklength);
      console.log(this.running);
      this.mybreak(self.breaklength);
      this.running = false;
    }else{
      this.stop(self.tictoc);
      this.count(self.timelength);
    }
  } else {
    console.log(diff);
    //TODO this next line breaks SOLID via timer
    document.getElementById("timer").innerHTML = diff.toLocaleString();
  }
};