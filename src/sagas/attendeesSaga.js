import { call, put, takeEvery } from 'redux-saga/effects';
import {
  fetchAttendeesSuccess,
  fetchAttendeesFailed,
  updateTeamSuccess,
  updateTeamFail,
} from 'ACTION/attendeesAction';
import {
  FETCH_ATTENDEES_INITIATED,
  ADD_TEAM_MEMBER_INITIATED,
  CREATE_TEAM_INITIATED,
  UPDATE_TEAM_INITIATED,
} from 'UTILS/constants';
import RequestHandler from '../HTTP';

function* fetchAttendees(action) {
    try {
      const response = yield call(() => RequestHandler.get(
        `events/${action.payload}/teams`,
      ));
      yield put(fetchAttendeesSuccess(response));
    } catch (error) {
      yield put(fetchAttendeesFailed(error))
    }
  }
  
function* addTeamMember(action) {
  console.log('Executing Add Team Member Saga');
  try {
    const response = yield call(() => RequestHandler.post(
      `events/${action.payload.eventId}/teams/${action.payload.teamId}/team_members`,
      {emails: action.payload.emailIds} 
    ));
    const data = yield call(() => response.json.bind(response)());
    yield put(updateTeamSuccess(data))
  } catch(error) {
    yield put(updateTeamFail(error))
  }
}

function* createTeam(action) {
  try {
    const eventId = action.payload.eventId;
    delete action.payload.eventId;
    const response = yield call(() => RequestHandler.post(
      `events/${eventId}/teams`,
      action.payload,
    ))
    const data = yield call(() => response.json.bind(response)());
    yield put(updateTeamSuccess(data))
  } catch (error) {
    yield put(updateTeamFail(error))
  }
}

function* updateTeam(action) {
  try {
    const response = yield call(() => fetch(`http://intranet.joshsoftware.com/events/${action.payload.id}`, {
      method: 'PUT',
      body: JSON.stringify(action.payload),
    }));
    const data = yield call(() => response.json.bind(response)());
    yield put(updateTeamSuccess(data))
  } catch (error) {
    yield put(updateTeamFail(error))
  }
}

export default function* attendeesSaga() {
    yield takeEvery(FETCH_ATTENDEES_INITIATED, fetchAttendees)
    yield takeEvery(ADD_TEAM_MEMBER_INITIATED, addTeamMember)
    yield takeEvery(CREATE_TEAM_INITIATED, createTeam)
    yield takeEvery(UPDATE_TEAM_INITIATED, updateTeam)
}  
  