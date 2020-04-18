import { Location } from '../../models/Location';
import { Speaker } from '../../models/Speaker';
import { Patient } from '../../models/Patient';
import { Schedule, Session } from '../../models/Schedule';
export interface ConfState {
  schedule: Schedule;
  sessions: Session[];
  speakers: Speaker[];
  patients: Patient[];
  favorites: number[];
  locations: Location[];
  filteredTracks: string[];
  searchText?: string;
  mapCenterId?: number;
  loading?: boolean;
  allTracks: string[];
  menuEnabled: boolean;
}
