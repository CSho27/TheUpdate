export interface HomePageState {
  recordingState: RecordingState;
  recordedAudio: Blob | null;
}

export type HomePageStateAction =
| { type: 'startRecording' }
| { type: 'pauseRecording' }
| { type: 'updateRecordedAudio', recordedAudio: Blob }

export function HomePageStateReducer(state: HomePageState, action: HomePageStateAction): HomePageState {
  switch(action.type) {
    case 'startRecording':
      return {
        ...state,
        recordingState: 'recording'
      }
    case 'pauseRecording':
      return {
        ...state,
        recordingState: 'paused'
      }
    case 'updateRecordedAudio': {
      return {
        ...state,
        recordedAudio: action.recordedAudio
      }
    }
  }
}

export const HOME_PAGE_INITIAL_STATE: HomePageState = {
  recordingState: 'inactive',
  recordedAudio: null
}