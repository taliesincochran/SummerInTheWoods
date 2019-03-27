import AppRow from '../components/SubmittedApplication/AppRow'
import TableHeaders from '../components/Table/TableHeader';

const ApplicationTable = props => {
    const { applications } = props;
    const fields = [
        'numberOfChildren',
        'childFirstName1',
        'childLastName1',
        'age1',
        'birthday1',
        'allergies1',
        'childFirstName2',
        'childLastName2',
        'age2',
        'birthday2',
        'allergies2',
        'childFirstName3',
        'childLastName3',
        'age3',
        'birthday3',
        'allergies3',
        'childFirstName4',
        'childLastName4',
        'age4',
        'birthday4',
        'allergies4',
        'parent1Name',
        'parent1Phone',
        'parent1Email',
        'parent2Name',
        'parent2Phone',
        'parent2Email',
        'emergency1Name',
        'emergency1Relationship',
        'emergency1Phone',
        'emergency2Name',
        'emergency2Relationship',
        'emergency2Phone',
        'physicianName',
        'physicianPhone',
        'dentistName',
        'dentistPhone',
        'address',
        'localTimezoneOffset',
        'chosenYear',
        'Week1',
        'Week2',
        'Week3',
        'Week4',
        'Week5',
        'Week6',
        'Week7',
        'Week8',
        'Week9',
        'WeekA',
        'WeekB',
        'paymentMethod',
        'key',
        'other',
        'website'
    ];
    <table>
        <TableHeaders
            headerClass='firstRow'
            headers={fields}
        />
        {applications.forEach(application => {
            <AppRow
                application={application}
            />
        })}            
    </table>
}