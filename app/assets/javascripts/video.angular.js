        var currentTime = 0;

        function videoPlayer(url) {
          console.log(url);
          //return function() {
            $('video').get(0).src = url;
            $('video').get(0).load();
          //};
        };

        $(function(){
          var myVideo = $('video').get(0);
          console.log(myVideo);

          myVideo.addEventListener('progress', function() {
            //not applicable to hls video
            console.log("progress");
            console.log(this.buffered.end(0));
            //var endBuf = this.buffered.end(0);
            //console.log(this.duration);
            //var soFar = parseInt(((endBuf / this.duration) * 100));
            //console.log(soFar);
            //document.getElementById("loadStatus").innerHTML =  soFar + '%';
          }, false);

          myVideo.addEventListener('canplaythrough', function() {
            console.log("canplaythrough");
          }, false);

          myVideo.addEventListener('loadedmetadata', function() {
            console.log("loadedmetadata");
            console.log(this.duration);
          }, false);
          myVideo.addEventListener('loadeddata', function() {
            console.log("loadeddata");
            this.currentTime = currentTime;
            this.webkitEnterFullscreen();
          }, false);

          myVideo.addEventListener("timeupdate", function() {
            currentTime = this.currentTime;
          }, false);

          myVideo.addEventListener('webkitbeginfullscreen', function() {
            console.log("webkitbeginfullscreen");
            this.play();
          }, false);
          myVideo.addEventListener('webkitendfullscreen', function() {
            console.log("webkitendfullscreen");
          }, false);
          myVideo.addEventListener('error', function() {
            console.log("error");
          }, false);
        });

 
