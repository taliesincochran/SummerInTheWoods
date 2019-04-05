import * as React from 'react';
import AppRow from '../components/SubmittedApplication/AppRow'
import TableHeaders from '../components/Table/TableHeader';
import { compose } from 'recompose';
import {
    withAuthorization,
    withEmailVerification,
} from '../components/Session';
import * as ROLES from '../constants/roles';
import { fields } from '../constants/variables';
class ViewApplicationsBase extends React.Component {
    render () {
        const { applications } = this.props;
        return (
            <table>
                <TableHeaders
                    headerClass='firstRow'
                    headers={fields}
                />
                {
                    applications.forEach((application) => <AppRow application={application} />)
                }
            </table>
        )
    }
};

const condition = authUser =>
    authUser && authUser.roles.includes(ROLES.ADMIN);

const ViewApplications = compose(
    withEmailVerification,
    withAuthorization(condition),
)(ViewApplicationsBase);

export default ViewApplications;