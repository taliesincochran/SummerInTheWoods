import * as React from 'react';

const AppRow = props => {
    const { application, className } = props;
    let rowClass = className || '';
    let app = application || {}
    let applicationData = [];
    // for (let applicationDatum in application) {
    //     if (application.hasOwnProperty(applicationDatum)) {
    //         applicationData.push([application[applicationDatum]]);
    //     }
    // }
    return (
        <TableRow
            data={applicationData}
        />
    )
};

export default AppRow;
