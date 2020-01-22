import * as React from 'react';
import Helmet from 'react-helmet';
import TableRow from '../components/Table/TableRow';
import TableHeader from '../components/Table/TableHeader'
import BannerLanding from '../components/BannerLanding';

class PriceTable extends React.Component {
    render() {
        return (
            <div className="main">
                <Helmet>
                    <title>Summer In The Woods</title>
                    <meta name="description" content="Prices for Summer in the Woods Camp" />
                </Helmet>
                <BannerLanding bannerClass="contactBanner" />
                <div className="inner"> 
                    <table className="priceTable">
                        <TableHeader
                            headerClass="firstrow"
                            headers={['Number Of Weeks', 'Amount Due To Reserve', 'Total Cost for Camp', 'Cost Per Week']}
                        />
                        <tbody>
                            <TableRow
                                data={['1 Week', '$180', '$180', '$180']}
                            />
                            <TableRow
                                data={['2 Weeks', '$205', '$360', '$180']}
                            />
                            <TableRow
                                data={['3 Weeks', '$230', '$540', '$180']}
                            />
                            <TableRow
                                data={['4 Weeks', '$235', '$640', '$160']}
                            />
                            {/*<TableRow
                                data={['5 Weeks', '$255', '$755', '$155']}
                            />
                            <TableRow
                                data={['6 Weeks', '$280', '$930', '$155']}
                            />
                            <TableRow
                                data={['7 Weeks', '$305', '$1085', '$155']}
                            />
                            <TableRow
                                data={['8 Weeks', '$330', '$1240', '$155']}
                            />
                            <TableRow
                                data={['9 Weeks', '$355', '$1395', '$155']}
                            />
                            <TableRow
                                data={['10 Weeks', '$380', '$1550', '$155']}
                            />*/}
                        </tbody>
                    </table>                        
                </div>
            </div>
        )
    }
}
export default PriceTable;