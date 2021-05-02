export class AudioRecorder {
  private readonly recorder: MediaRecorder;

  private constructor(recorder: MediaRecorder) {
    this.recorder = recorder;
  }

  static initialize(onDataUpdate?: (data: Blob) => void): Promise<AudioRecorder | null> {
    return navigator.mediaDevices.getUserMedia({audio: true})
      .then(
        stream => {
          const recorder = new MediaRecorder(stream);
          if(!!onDataUpdate)
            recorder.ondataavailable = event => onDataUpdate(event.data);
          return new AudioRecorder(recorder);
        },
        reason => {
          console.log(`Could not initialize audio recorder: ${reason}`);
          return null;
        }
      )
  }

  startRecording() {
    if(!this.recorder)
      throw 'Recorder has not been initialized'

    this.recorder.start();
  }

  pauseRecording() {
    if(!this.recorder)
      throw 'Recorder has not been initialized'

    this.recorder.stop();
  }
}