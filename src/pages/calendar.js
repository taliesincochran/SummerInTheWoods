import React from 'react';
import Helmet from 'react-helmet';
import BannerLanding from '../components/BannerLanding/'
import Selectable from '../components/Selectable'
const Calendar = (props) => {
    let year = props.location.state.year;
    let months = ["June", "July", "August"];
    let dates = months.map((month, i)=> new Date(year, i + 5, 1))
    let views = []
    for(var i = 0; i<months.length; i++) {
        let month = months[i];
        let date = dates[i];
        views.push({month,date})
    }
    console.log("Calendar views", views)
    return(
        <div>
            <Helmet>
                <title>Summer In The Woods</title>
                <meta name="description" content="Calendar Page" />
            </Helmet>
            <BannerLanding bannerClass="contactBanner" />
            <div id="main">
                <div className="inner">
                    {views.map(view=>
                        <Selectable {...props} title={view.month} defaultDate={view.date} />                        
                    )}
                </div>
            </div>
        </div>
    )
}

export default Calendar
