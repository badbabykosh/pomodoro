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

  xit("should stopall",function(){

  });

  xit("should ringAlarm",function(){

  });

  it("should stop running", function(){
    aTimer.stop();
    expect(aTimer.running).toEqual(false);
  });

  describe('count',function(){
    xit("should receive value of 25",function(){
      aTimer.count(25,5);

      expect(aTimer.sessiontime).toEqual(25);
    });
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
    xit('should receive value of 5',function(){
      aTimer.mybreak(5);

      expect(aTimer.breaklength).toEqual(5);
    });
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
    xit('should calculate time diff', function(){

    });
  });
  
});