function SessionInit(){
  this.running  = false;
  this.totalSecs = '1';
}

increase = function(elementID){
  console.log(elementID);
  $("#"+elementID+"").val( Number($("#"+elementID+"").val()) + 1 );
  if(elementID == 'session'){
    document.getElementById("minutes").innerHTML = document.getElementById("session").value;
  }
};

decrease = function(elementID){
  console.log(elementID);
  $("#"+elementID+"").val( Number($("#"+elementID+"").val()) - 1 );
  if(elementID == 'session'){
    document.getElementById("minutes").innerHTML = document.getElementById("session").value;
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
  this.timelength = mysession * 60;
  this.breaklength = mybreak * 60;
  this.running = true;
  this.count(this.timelength,this.breaklength);
};

SessionInit.prototype.mybreak = function(sessiontime,breakvalue) {
  console.log('inside mybreak breakvalue: ' +breakvalue);
  var startDate2 = new Date();
  //set to false for one cycle
  var running = false;

  this.tictoc = setInterval(function(){self.pulse(breakvalue,sessiontime,startDate2,running)},1000);
  var self = this;
};

SessionInit.prototype.count = function(sessiontime,breaktime) {
  console.log('inside count');
  var startDate = new Date();
  var running = true;

  this.tictoc = setInterval(function(){self.pulse(sessiontime,breaktime,startDate,running)},1000);
  var self = this;
};



SessionInit.prototype.pulse = function(sessionvalue,breakvalue,startDate,running){
  console.log('inside pulse');
//TODO diff into minutes : seconds
  var diffsecs = sessionvalue - (((Date.now() - startDate)/1000)|0);
  //NOTE: this is a percentage of circle
  var diffmins = diffsecs / 60;
  var mins = Math.floor(diffmins);

  var remainder = diffmins % 1;
  var temp = remainder * 60;
  var secs = Math.round(temp);

  console.log('pulse totalsecs: ' + diffsecs);
  console.log('pulse remainder: ' + remainder);
  console.log('pulse mins: ' + mins);
  console.log('pulse secs: ' + secs);

  if (mins < 0 && secs < 0) {
    //call audio here
    this.ringAlarm();

    var self = this;

    if (running == true) {
      this.stop(self.tictoc);
      console.log('self.break ' + breakvalue);
      console.log(this.running);
      this.mybreak(sessionvalue,breakvalue);
      this.running = false;
    }else{
      this.stop(self.tictoc);
      this.count(breakvalue,sessionvalue);
    }
  } else {
    console.log(mins + ":" + secs);
    //TODO this next line breaks SOLID via timer
    var currentTime =":" + secs;
    //set global var totalSecs
    this.totalSecs = diffsecs.toLocaleString();
    document.getElementById("minutes").innerHTML = mins.toLocaleString();
    document.getElementById("seconds").innerHTML = currentTime.toLocaleString();
    var self = this;
    self.mins;
    self.currentTime;
  }

};