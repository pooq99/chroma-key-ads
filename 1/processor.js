let processor = {
    timerCallback: function() {
      if (this.video.paused || this.video.ended) {
        return;
      }
      this.computeFrame();
      let self = this;
      setTimeout(function () {
          self.timerCallback();
        }, 0);
    },

    doLoad: function() {
      this.video = document.getElementById("video");
      this.c1 = document.getElementById("c1");
      this.ctx1 = this.c1.getContext("2d");
      this.c2 = document.getElementById("c2");
      this.ctx2 = this.c2.getContext("2d");
      this.c3 = document.getElementById("c3");
      this.ctx3 = this.c3.getContext("2d");
      let self = this;
      this.video.addEventListener("play", function() {
          self.width = self.video.videoWidth ;
          self.height = self.video.videoHeight ;
          self.timerCallback();
        }, false);
    },

    computeFrame: function() {
      this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
      let frame = this.ctx1.getImageData(0, 0, this.width, this.height);
          let l = frame.data.length / 4;

      for (let i = 0; i < l; i++) {
        let r = frame.data[i * 4];
        let g = frame.data[i * 4 + 1];
        let b = frame.data[i * 4 + 2];

        let tr = 66;
        let tg = 251;
        let tb = 0;
        //let greyColor = 150
        if (r <= 160 && g > 150 && b <= 160)
          frame.data[i * 4 + 3] = 0;
      }
      this.ctx2.putImageData(frame, 0, 0);
      this.ctx3.putImageData(frame, 0, 0);
      return;
    }
  };

document.addEventListener("DOMContentLoaded", () => {
  processor.doLoad();
});
