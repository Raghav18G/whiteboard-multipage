if (!navigator.getDisplayMedia && !navigator.mediaDevices.getDisplayMedia) {
  var error = "Your browser does NOT support the getDisplayMedia API.";
  document.querySelector("h1").innerHTML = error;
  document.querySelector("video").style.display = "none";
  document.getElementById("btn-start-recording").style.display = "none";
  document.getElementById("btn-stop-recording").style.display = "none";
  throw new Error(error);
}

function invokeGetDisplayMedia(success, error) {
  var displaymediastreamconstraints = {
    video: {
      mediaSource: "screen",
      cursor: "always", // or 'motion' for cursor sharing
    },
    audio: true,
  };

  // above constraints are NOT supported YET
  // that's why overriding them
  // displaymediastreamconstraints = { audio: true, video: true };

  if (navigator.mediaDevices.getDisplayMedia) {
    navigator.mediaDevices
      .getDisplayMedia(displaymediastreamconstraints)
      .then(success)
      .catch(error);
  } else {
    navigator
      .getDisplayMedia(displaymediastreamconstraints)
      .then(success)
      .catch(error);
  }
}

function captureScreen(callback) {
  invokeGetDisplayMedia(
    function (screen) {
      document.getElementById("btn-start-recording").style.display = "none";
      document.getElementById("btn-stop-recording").style.display = "block";

      addStreamStopListener(screen, function () {
        document.getElementById("btn-stop-recording").click();
      });
      callback(screen);
    },
    function (error) {
      console.error(error);
      alert(
        "Unable to capture your screen. Please check console logs.\n" + error
      );
    }
  );
}

function stopRecordingCallback() {
  console.group("Stopped");
  getSeekableBlob(recorder.getBlob(), function (seekableBlob) {
    recorder.screen.stop();
    recorder.destroy();
    recorder = null;
    document.getElementById("btn-start-recording").disabled = false;
    document.getElementById("btn-start-recording").style.display = "block";
    document.getElementById("btn-stop-recording").style.display = "none";
    invokeSaveAsDialog(seekableBlob, "seekable-recordrtc.webm");
  });
}

var recorder; // globally accessible

document.getElementById("btn-start-recording").onclick = function () {
  this.disabled = true;

  captureScreen(function (screen) {
    const audioTracks = screen.getAudioTracks();
    const audioConstraints = {};

    if (audioTracks.length > 0) {
      audioConstraints.mandatory = {
        chromeMediaSource: "desktop",
        chromeMediaSourceId: audioTracks[0].getSettings().deviceId,
      };
    }

    recorder = RecordRTC(screen, {
      type: "video",
      recorderType: MediaStreamRecorder,
      mimeType: "video/webm",
      audio: audioConstraints,
    });

    recorder.startRecording();

    // release screen on stopRecording
    recorder.screen = screen;

    document.getElementById("btn-stop-recording").disabled = false;
  });
};

document.getElementById("btn-stop-recording").onclick = function () {
  this.disabled = true;
  recorder.stopRecording(stopRecordingCallback);
};

function addStreamStopListener(stream, callback) {
  stream.addEventListener(
    "ended",
    function () {
      callback();
      callback = function () {};
    },
    false
  );
  stream.addEventListener(
    "inactive",
    function () {
      callback();
      callback = function () {};
    },
    false
  );
  stream.getTracks().forEach(function (track) {
    track.addEventListener(
      "ended",
      function () {
        callback();
        callback = function () {};
      },
      false
    );
    track.addEventListener(
      "inactive",
      function () {
        callback();
        callback = function () {};
      },
      false
    );
  });
}
