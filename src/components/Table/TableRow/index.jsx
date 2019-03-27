import * as React from 'react';

const TableRow = props => {
    const className = props.className || '';
    return (
        <tr className={className}>
            {
                props.data.map(datum => 
                    <td>
                        {datum}
                    </td>
                )
            }
        </tr>
    )
}
export default TableRow;