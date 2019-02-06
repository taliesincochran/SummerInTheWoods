import * as React from 'react';
import Helmet from 'react-helmet';
import BannerLanding from '../components/BannerLanding';
class PriceTable extends React.Component {
    render() {
        return (
            <div className="main">
                <Helmet>
                    <title>Summer In The Woods</title>
                    <meta name="description" content="Price Page" />
                </Helmet>
                <BannerLanding bannerClass="contactBanner" />
                <div className="inner">
                    <p>The cost of Summer in the Woods Camp is $180.00 per week.  If you sign up for more than four weeks, the price is $155.00 a week.  The amount due to reserve your childs space is the cost of the first week plue $25.00 for each additional week.</p>
                    <h3>Prices</h3>
                    <table class="priceTable">
                        <thead>
                            <tr class="firstrow">
                                <th>Number Of Weeks</th>
                                <th>Amount Due To Reserve</th>
                                <th>Total Cost for Camp</th>
                                <th>Cost per week</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1 Week</td>
                                <td>$180</td>
                                <td>$180</td>
                                <td>$180</td>
                            </tr>

                            <tr>
                                <td>2 Weeks</td>
                                <td>$205</td>
                                <td>$360</td>
                                <td>$180</td>
                            </tr>
                            <tr>
                                <td>3 Weeks</td>
                                <td>$230</td>
                                <td>$540</td>
                                <td>$180</td>
                            </tr>
                            <tr>
                                <td>4 Weeks</td>
                                <td>$230</td>
                                <td>$620</td>
                                <td>$155</td>
                            </tr>
                            <tr>
                                <td>5 Weeks</td>
                                <td>$255</td>
                                <td>$775</td>
                                <td>$155</td>
                            </tr>
                            <tr>
                                <td>6 Weeks</td>
                                <td>$280</td>
                                <td>$930</td>
                                <td>$155</td>
                            </tr>
                            <tr>
                                <td>7 Weeks</td>
                                <td>$305</td>
                                <td>$1085</td>
                                <td>$155</td>
                            </tr>
                            <tr>
                                <td>8 Weeks</td>
                                <td>$330</td>
                                <td>$1240</td>
                                <td>$155</td>
                            </tr>
                            <tr>
                                <td>9 Weeks</td>
                                <td>$355</td>
                                <td>$1395</td>
                                <td>$155</td>
                            </tr>
                            <tr>
                                <td>10 Weeks</td>
                                <td>$380</td>
                                <td>$1550</td>
                                <td>$155</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
export default PriceTable;