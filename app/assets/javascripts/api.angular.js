angular.module('facetsKids.tagListService', ['ngResource'])
    .factory('TagListService', function ($resource) {
        return $resource('/api/videos?tag_list=:tag');
    });

angular.module('facetsKids.videoMarkerService', ['ngResource', 'ng-rails-csrf'])
    .factory('VideoMarkerService', function ($resource) {
        return $resource('/api/videos/:video_id/mark');
    });

angular.module('facetsKids.videoTaggingService', ['ngResource', 'ng-rails-csrf'])
    .factory('VideoTaggingService', function ($resource) {
        return $resource('/api/videos/:id/tags', {id: '@id'});
    });


