import { User } from './../Entities/user';
import { Button } from  './../Components/button';
import { AudioRecorder } from '../AudioRecorder/audioRecorder';
import { useEffect, useReducer, useRef } from 'react';
import { HomePageStateReducer, HOME_PAGE_INITIAL_STATE } from './homePageState';

export interface HomePageProps {
  user: User;
}

export function HomePage(props: HomePageProps) {
  const [state, update] = useReducer(HomePageStateReducer, HOME_PAGE_INITIAL_STATE);

  const audioRecorder = useRef<AudioRecorder|null>();
  
  useEffect(() => {
    AudioRecorder.initialize(data => update({ type: 'updateRecordedAudio', recordedAudio: data }))
      .then(recorder => audioRecorder.current = recorder);
  }, [])
  
  const buttonText = state.recordingState === 'recording'
    ? 'Pause'
    : 'Record';

  const onRecordClick = () => {
    if(state.recordingState === 'recording' && !!audioRecorder.current){
      audioRecorder.current.pauseRecording();
      update({ type: 'pauseRecording'})
    } else if(!!audioRecorder.current) {
      audioRecorder.current.startRecording();
      update({ type: 'startRecording'})
    }
  }

  const onPlayClick = () => {
    if(!!state.recordedAudio){
      var audioContext = new AudioContext();

      var playDecodedAudio = (audioBuf: AudioBuffer) => {
        var source = audioContext.createBufferSource();
        source.buffer = audioBuf;
        source.connect(audioContext.destination);
        source.start();
      }

      state.recordedAudio.arrayBuffer()
        .then(arrayBuf => audioContext.decodeAudioData(arrayBuf, playDecodedAudio))
    }

  }

  return <div className='App'>
    <div>Welcome {props.user?.username}</div>
    <Button 
      text={buttonText}
      onClick={onRecordClick}
    />
    <Button
      text='Play'
      onClick={onPlayClick} />
  </div>
}