import React from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonGrid, IonRow, IonCol } from '@ionic/react';
import PatientItem from '../components/PatientItem';
import { Patient } from '../models/Patient';
import { Session } from '../models/Schedule';
import { connect } from '../data/connect';
import * as selectors from '../data/selectors';
import './PatientList.scss';

interface OwnProps { };

interface StateProps {
  patients: Patient[];
  patientSessions: { [key: string]: Session[] };
};

interface DispatchProps { };

interface PatientListProps extends OwnProps, StateProps, DispatchProps { };

const PatientList: React.FC<PatientListProps> = ({ patients, patientSessions }) => {

  return (
    <IonPage id="patient-list">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Patients</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Patients</IonTitle>
          </IonToolbar>
        </IonHeader>

          <IonGrid fixed>
            <IonRow>
              {patients.map(patient => (
                <IonCol size="12" size-md="6" key={patient.id}>
                  <PatientItem
                    key={patient.id}
                    patient={patient}
                    sessions={patientSessions[patient.name]}
                  />
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    patients: selectors.getPatients(state),
    patientSessions: selectors.getPatientSessions(state)
  }),
  component: React.memo(PatientList)
});