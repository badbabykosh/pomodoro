describe("sessionTimer",function() {
  var aTimer;


  beforeEach(function() {
    aTimer = new SessionInit(25,5);
    jasmine.clock().install();
    //set up DOM element?
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });

  it("should start running ", function() {
    aTimer.start();

    expect(aTimer.running).toEqual(true);
    expect(aTimer.count).toBeDefined();
  });

  it("should stopall",function(){
    aTimer.stopAll();
    expect(aTimer.running).toEqual(false);
  });

  it("should ringAlarm",function(){
    aTimer.ringAlarm();
    expect(aTimer.ringAlarm).toBeTruthy();
  });

  it("should stop running", function(){
    aTimer.stop();
    expect(aTimer.running).toEqual(false);
  });

  describe('count',function(){
    it("should define tictoc", function(){
      //jasmine.clock().install();
      var dummyElement = document.createElement('span');
      document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyElement);

      aTimer.count(25);
      jasmine.clock().tick(1002);
      expect(aTimer.tictoc).toEqual(1);
      //jasmine.clock().uninstall();
    });
    it("should activate function pulse", function(){
      //jasmine.clock().install();
      var dummyElement = document.createElement('span');
      document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyElement);

      aTimer.count(25);
      jasmine.clock().tick(1002);
      expect(aTimer.tictoc).toEqual(1);
      expect(document.getElementById("timer").innerHTML).toEqual(':25');
      //jasmine.clock().uninstall();
    });
  });

  describe('mybreak', function(){
    it('should define tictoc',function(){
      var dummyElement = document.createElement('span');
      document.getElementById =jasmine.createSpy('HTML Element').and.returnValue(dummyElement);

      aTimer.mybreak(5);
      jasmine.clock().tick(1002);
      expect(aTimer.tictoc).toEqual(1);
    });
    it('should activate function pulse as a thing', function(){
      var dummyElement = document.createElement('span');
      document.getElemetById = jasmine.createSpy('HTML Element').and.returnValue(dummyElement);

      aTimer.mybreak(5);
      jasmine.clock().tick(1002);
      expect(aTimer.tictoc).toEqual(1);
    });
  });

  describe('pulse', function(){
    it('should calculate time diff', function(){
      var startDate = new Date();
      aTimer.pulse(25,5,startDate,true);
      expect(aTimer.currentTime).toBeCloseTo(startDate);
    });
  });

});