import * as React from 'react';

const AppRow = props => {
    const { application } = props;
    let rowClass = props.className || '';
    let applicationData = [];
    for (let applicationDatum in application) {
        if (application.hasOwnProperty(applicationDatum)) {
            applicationData.push([application[applicationDatum]]);
        }
    }
    return (
        <TableRow
            data={applicationData}
        />
    )
};

export default AppRow;
