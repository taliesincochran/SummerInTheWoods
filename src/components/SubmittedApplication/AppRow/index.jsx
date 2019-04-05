import * as React from 'react';
import TableRow from '../../../components/Table/TableRow';
import { fields } from '../../../constants/variables';

const AppRow = props => {
    const { application, className } = props;
    let rowClass = className || '';
    let applicationData = [];
    fields.forEach(key => applicationData.push(application[key]));
    return (
        <TableRow
            className = {rowClass}
            data={applicationData}
        />
    )
};

export default AppRow;
