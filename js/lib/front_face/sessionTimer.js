function SessionTimer(timeLength,breakLength){
  //todo set to minutes not seconds
  // 1sec*60 = 1min
  this.timelength   = timeLength;
  this.breaklength  = breakLength;
  this.running      = false;

}

SessionTimer.prototype.change = function(elementid, value){
  $("#inc").click(function(){
    $("#session").val( Number($("#session").val()) + 1 );
  });
  $("#dec").click(function(){
    $("#session").val( Number($("#session").val()) - 1 );
  });
};

SessionTimer.prototype.stopAll = function(){
  clearInterval(this.tictoc);
};

SessionTimer.prototype.ringAlarm = function(){
    var sound = new Audio("audio/sounds-882-solemn.mp3");
    sound.play();
    sound.currentTime=0;
};

SessionTimer.prototype.stop = function(clockvalue){
  clearInterval(clockvalue);
};

SessionTimer.prototype.start = function(){
  this.running = true;
  this.count(this.timelength);
};

SessionTimer.prototype.mybreak = function(breakLength) {
  console.log('inside mybreak');
  var startDate2 = new Date();
  //set to false for one cycle
  var running = false;
  this.breaklength = breakLength;
  this.tictoc = setInterval(function(){self.pulse(self.breaklength,startDate2,running)},1000);
  var self = this;
};

SessionTimer.prototype.count = function(timeLength) {
  console.log('inside count');
  var startDate = new Date();
  var running = true;
  this.timelength = timeLength;
  this.tictoc = setInterval(function(){self.pulse(self.timelength,startDate,running)},1000);
  var self = this;
};

SessionTimer.prototype.pulse = function(timevalue,sDate,running){
  var startDate = sDate;

  var diff = timevalue - (((Date.now() - startDate)/1000)|0);
  console.log('diff in pulse= '+diff);
  if (diff < 0) {
    //call audio here
    this.ringAlarm();

    var self = this;

    if (running == true) {
      this.stop(self.tictoc);
      this.mybreak(self.breaklength);

    }else{
      this.stop(self.tictoc);
      this.count(self.timelength);
    }
  } else {
    console.log(diff);
    document.getElementById("timer").innerHTML = diff.toLocaleString();
  }
};