import React from 'react';
import { Session } from '../models/Schedule';
import { Patient } from '../models/Patient';
import { IonCard, IonCardHeader, IonItem, IonLabel, IonAvatar, IonCardContent, IonList } from '@ionic/react';


interface PatientItemProps {
  patient: Patient;
  sessions: Session[];
}

const PatientItem: React.FC<PatientItemProps> = ({ patient, sessions }) => {
  return (
    <>
      <IonCard className="patient-card">
        <IonCardHeader>
          <IonItem button detail={false} lines="none" className="patient-item" routerLink={`/tabs/patients/${patient.id}`}>
            <IonAvatar slot="start">
              <img src={process.env.PUBLIC_URL + patient.profilePic} alt="Patient profile pic" />
            </IonAvatar>
            <IonLabel>
              <h2>{patient.name}</h2>
              <p>{patient.title}</p>
            </IonLabel>
          </IonItem>
        </IonCardHeader>

        <IonCardContent>
          <IonList lines="none">
            {sessions.map(session => (
              <IonItem detail={false} routerLink={`/tabs/patients/sessions/${session.id}`} key={session.name}>
                <IonLabel>
                  <h3>{session.name}</h3>
                </IonLabel>
              </IonItem>
            ))}
            <IonItem detail={false} routerLink={`/tabs/patients/${patient.id}`}>
              <IonLabel>
                <h3>About {patient.name}</h3>
              </IonLabel>
            </IonItem>
          </IonList>
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default PatientItem;