#= require app

describe("VideoTaggingService:", function() {
  var videoTaggingService, $rootScope, $httpBackend;

  beforeEach(function() {
    module("facetsKids.videoTaggingService");
    inject(function(VideoTaggingService) {
      videoTaggingService = VideoTaggingService;
    });
  });
  beforeEach(inject(function(_$compile_, _$rootScope_, _$httpBackend_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
  }));

  it('gets existing tags', function() {
    var fixture = {id:1,user_emotion_list:["happy"],user_rating:"1_star"};
    var fixture_response = {id:1,user_emotion_list:["happy"],user_rating:"2_star"};

    expect(videoTaggingService).to.be.defined;

    $httpBackend.expectGET('/api/videos/1/tags');
    $httpBackend.whenGET('/api/videos/1/tags').respond(fixture);
    $httpBackend.expectPOST('/api/videos/1/tags');
    $httpBackend.whenPOST('/api/videos/1/tags').respond(fixture_response);
 
    var tagging = videoTaggingService.get({id: 1}, function() {
       expect(tagging.id).to.equal(1);
       expect(tagging.user_rating).to.equal("1_star");
       tagging.user_rating = "2_star";
       tagging.$save(function(u){
         expect(u.user_rating).to.equal("2_star");
       });
    });
    $httpBackend.flush();
  });


});

describe("VideoMarkerService:", function() {
  var videoMarkerService, $rootScope, $httpBackend;

  beforeEach(function() {
    module("facetsKids.videoMarkerService");
    inject(function(VideoMarkerService) {
      videoMarkerService = VideoMarkerService;
    });
  });
  beforeEach(inject(function(_$compile_, _$rootScope_, _$httpBackend_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
  }));

  it('gets existing marker', function() {
    var fixture = {view_id: 4, current_marker_seconds: 10, duration_seconds: null, video_id: 4, user_id: 2, video_duration_seconds: 723}; 
    var fixture_response = {view_id: 4, current_marker_seconds: 20, duration_seconds: null, video_id: 4, user_id: 2, video_duration_seconds: 723}; 
 
    expect(videoMarkerService).to.be.defined;
    $httpBackend.expectGET('/api/videos/4/mark');
    $httpBackend.whenGET('/api/videos/4/mark').respond(fixture);
    $httpBackend.expectPOST('/api/videos/mark');
    $httpBackend.whenPOST('/api/videos/mark').respond(fixture_response);
 
    var marker = videoMarkerService.get({video_id: 4}, function() {
       expect(marker.video_id).to.equal(4);
       marker.current_marker_seconds = 20;
       marker.$save(function(u){
         expect(u.current_marker_seconds).to.equal(20);
       });
    });
    $httpBackend.flush();
  });

  it('gets new marker', function() {
    $httpBackend.expectGET('/api/videos/4/mark');
    $httpBackend.whenGET('/api/videos/4/mark').respond(422, {error:"not found"});
    $httpBackend.expectPOST('/api/videos/mark');
    //$httpBackend.whenPOST('/api/videos/4/mark').respond({view_id:18,current_marker_seconds:null,duration_seconds:0,video_id:4,user_id:2,video_duration_seconds:723});
    $httpBackend.whenPOST('/api/videos/mark')
      .respond(function(method, url, data, headers){
        marker = angular.fromJson(data);
        return [200, {view_id:18,current_marker_seconds:null,duration_seconds:0,video_id:marker.video_id,user_id:2,video_duration_seconds:723}];
      });
    
    var marker = videoMarkerService.get({video_id: 4})
      .$promise.then(
        //success
        function( value ){
        },
        //error
        function( error ){
          console.log(error);
          new_marker = new videoMarkerService({video_id: 4});
          new_marker.$save(function(u){
            expect(u.view_id).to.equal(18);
            expect(u.video_id).to.equal(4);
          });
        }
      );

    $httpBackend.flush();
  });
});


describe("TagListService:", function() {
  var fixture     = [
    { id: 1, title: "Title 1", intro: "This is posting 1" },
    { id: 2, title: "Title 2", intro: "This is posting 2" }
  ]
  var tagListService, $rootScope, $httpBackend;

  beforeEach(function() {
    module("facetsKids.tagListService");
    inject(function(TagListService) {
      tagListService = TagListService;
    });
  });
  beforeEach(inject(function(_$compile_, _$rootScope_, _$httpBackend_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
  }));

  it('gets all age appropriate happy videos', function() {
    expect(tagListService).to.be.defined;
    $httpBackend.expectGET('/api/videos?tag_list=happy');
    $httpBackend.whenGET('/api/videos?tag_list=happy').respond(fixture);
 
    var videos = tagListService.query({tag: "happy"}, function() {
       expect(videos.length).to.equal(2);
    });
    $httpBackend.flush();
  });

});

