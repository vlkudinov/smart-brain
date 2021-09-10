import {
  takeLatest, call, put, all, select,
} from 'redux-saga/effects';
import { RootState, ImagePayload } from 'src/model';
import * as api from 'src/api';
import {
  updateHistoryStart,
} from 'src/redux/history/history.reducer';
import {
  sendImageStart,
  sendImageSuccess,
  sendImageFailure,
} from './image.reducer';

function* sendImageWorker() {
  try {
    const input : string = yield select(({ image }: RootState) => image.input);
    const image: ImagePayload = yield call(api.post, 'http://localhost:5000/imageurl', { input });
    yield put(sendImageSuccess(image));
    yield put(updateHistoryStart());
  } catch (error) {
    yield put(sendImageFailure(error as Error));
  }
}

function* sendImageWatcher() {
  yield takeLatest(sendImageStart, sendImageWorker);
}

export function* imageSagas() {
  yield all([
    call(sendImageWatcher),
  ]);
}