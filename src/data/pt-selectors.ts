import { createSelector } from 'reselect';
import { Schedule, Session, ScheduleGroup } from '../models/Schedule';
import { AppState } from './state';

const getSchedule = (state: AppState) => {

  return state.data.schedule
};
export const getPatients = (state: AppState) => state.data.patients;
const getSessions = (state: AppState) => state.data.sessions;
const getFilteredTracks = (state: AppState) => state.data.filteredTracks;
const getFavoriteIds = (state: AppState) => state.data.favorites;
const getSearchText = (state: AppState) => state.data.searchText;

export const getFilteredSchedule = createSelector(
  getSchedule, getFilteredTracks,
  (schedule, filteredTracks) => {
    const groups: ScheduleGroup[] = [];
    schedule.groups.forEach(group => {
      const sessions: Session[] = [];
      group.sessions.forEach(session => {
        session.tracks.forEach(track => {
          if (filteredTracks.indexOf(track) > -1) {
            sessions.push(session);
          }
        })
      })
      if (sessions.length) {
        const groupToAdd: ScheduleGroup = {
          time: group.time,
          sessions
        }
        groups.push(groupToAdd);
      }
    });

    return {
      date: schedule.date,
      groups
    } as Schedule;
  }
);

export const getSearchedSchedule = createSelector(
  getFilteredSchedule, getSearchText,
  (schedule, searchText) => {
    if (!searchText) {
      return schedule;
    }
    const groups: ScheduleGroup[] = [];
    schedule.groups.forEach(group => {

      const sessions = group.sessions.filter(s => s.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
      if (sessions.length) {
        const groupToAdd: ScheduleGroup = {
          time: group.time,
          sessions
        }
        groups.push(groupToAdd);
      }
    });
    return {
      date: schedule.date,
      groups
    } as Schedule;
  }
)

export const getScheduleList = createSelector(
  getSearchedSchedule,
  (schedule) => schedule
);

export const getGroupedFavorites = createSelector(
  getScheduleList, getFavoriteIds,
  (schedule, favoriteIds) => {
    const groups: ScheduleGroup[] = [];
    schedule.groups.forEach(group => {
      const sessions = group.sessions.filter(s => favoriteIds.indexOf(s.id) > -1)
      if (sessions.length) {
        const groupToAdd: ScheduleGroup = {
          time: group.time,
          sessions
        }
        groups.push(groupToAdd);
      }
    });
    return {
      date: schedule.date,
      groups
    } as Schedule;
  }
);


const getIdParam = (_state: AppState, props: any) => {
  return props.match.params['id'];
}

export const getSession = createSelector(
  getSessions, getIdParam,
  (sessions, id) => {
    return sessions.find(s => s.id === id);
  }
);

export const getPatient = createSelector(
  getPatients, getIdParam,
  (patients, id) => patients.find(x => x.id === id)
);

export const getPatientSessions = createSelector(
  getSessions,
  (sessions) => {
    const patientSessions: { [key: string]: Session[] } = {};

    sessions.forEach(session => {
      session.patientNames && session.patientNames.forEach(name => {
        if (patientSessions[name]) {
          patientSessions[name].push(session);
        } else {
          patientSessions[name] = [session];
        }
      })
    });
    return patientSessions;
  }
);

export const mapCenter = (state: AppState) => {
  const item = state.data.locations.find(l => l.id === state.data.mapCenterId);
  if (item == null) {
    return {
      id: 1,
      name: 'Map Center',
      lat: 43.071584,
      lng: -89.380120
    };
  }
  return item;
}
