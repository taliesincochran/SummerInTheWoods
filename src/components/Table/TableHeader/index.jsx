import * as React from 'react';

const TableHeader = props => {
    const { headerClass, headers } = props;
    return (
        <thead>
            <tr className={headerClass}>
                {
                    headers.map((header) => {
                        if (typeof header === 'string') {
                            return(
                                <th>{header}</th>
                            )
                        } else if (typeof header === 'object' && !Array.isArray(header) && header.hasOwnProperty('name') && header.hasOwnProperty('class')) {
                            return (
                                <th className={header.class}>{header.name}</th>
                            )
                        } else {
                            return (
                                null
                            )
                        }
                    })
                }
            </tr>
        </thead>
    )
};

export default TableHeader;