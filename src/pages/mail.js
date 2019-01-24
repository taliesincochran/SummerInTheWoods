import React from 'react';

import { Redirect } from "react-router-dom"

const Mail = (props) => {
    let message = '';
    if(props.state) {
        let { 
                amountDue,
                localTimezoneOffset,
                Week0,
                Week1,
                Week2,
                Week3,
                Week4,
                Week5,
                Week6,
                Week7,
                Week8,
                Week9,
                childFirstName,
                childLastName,
                age,
                birthday,
                allergies,
                parent1Name,
                parent1Phone,
                parent1Email,
                parent2Name,
                parent2Phone,
                parent2Email,
                emergency1Name,
                emergency1Relationship,
                emergency1Phone,
                emergency2Name,
                emergency2Relationship,
                emergency2Phone,
                physicianName,
                physicianPhone,
                dentistName,
                dentistPhone,
                address
            } = this.props.state;    
        if(props.location.state) {
            message = parent1Name + "has filled out an application for your camp. Please email them at " + parent1Email + ". Send them the address so that they can mail thier check for the $" + amountDue + " and a paypal bill to confirm the hold.\n" +
                "amountDue:" + amountDue + "\n" + 
                "Week 1:" + Week0 + " days\n" + 
                "Week 2:" + Week1 + " days\n" + 
                "Week 3:" + Week2 + " days\n" + 
                "Week 4:" + Week3 + " days\n" + 
                "Week 5:" + Week4 + " days\n" + 
                "Week 6:" + Week5 + " days\n" + 
                "Week 7:" + Week6 + " days\n" + 
                "Week 8:" + Week7 + " days\n" + 
                "Week 9:" + Week8 + " days\n" + 
                "Week 10:" + Week9 + " days\n" + 
                "child's first name:" + childFirstName + "\n" + 
                "child's last name:" +  childLastName + "\n" + 
                "age:" + age + "\n" + 
                "birthday:" + birthday + "\n" + 
                "allergies:" + allergies + "\n" + 
                "parent name:" + parent1Name + "\n" + 
                "parent phone:" + parent1Phone + "\n" + 
                "parent email:" + parent1Email + "\n" + 
                "second parent name:" +  parent2Name + "\n" + 
                "second parent phone:" + parent2Phone + "\n" + 
                "second parent email:" + parent2Email + "\n" + 
                "emergency contact name:" + emergency1Name + "\n" + 
                "first emergency contact relationship:" + emergency1Relationship + "\n" + 
                "first emergency contact phone:" +    emergency1Phone + "\n" + 
                "second emergency contact name:" + emergency2Name + "\n" + 
                "second emergency contact relationship:" + emergency2Relationship + "\n" + 
                "second emergency contact phone:" +    emergency2Phone + "\n" + 
                "physician name:" +  physicianName + "\n" + 
                "physician phone:" + physicianPhone + "\n" + 
                "dentist name:" +    dentistName + "\n" + 
                "dentist phone:" +   dentistPhone + "\n" + 
                "address:" + address + "\n"
                "timezone offset:" + localTimezoneOffset + "\n" 
        }
    }
    const gotchaStyle = {
        display: 'none'
    } 
    return(
        !props.location.state?<Redirect to="/"/>:
        <div>
            <p>Once the application is submitted, we will email you a bill.</p>
            <div id="main">
                <div className="inner">
                    <section>
                        <form method="post" action="https://formspree.io/summerinthewoodscamp@gmail.com">
                            <div className="gotcha" style={gotchaStyle}>
                                <input type="text" name="_gotcha" style={gotchaStyle} className="gotcha" />
                                <input type="hidden" name="_next" value="/" />
                            </div>
                            <div className="field" style={{display:"none"}}>
                                <label htmlFor="message">Additional information</label>
                                <textarea name="message" id="message" rows="6">{message}</textarea>
                            </div>
                            <ul className="actions">
                                <li><input type="submit" value="Send" className="special" /></li>
                                <li><input type="reset" value="Clear" /></li>
                            </ul>
                        </form>
                    </section>
                    <section className="split">
                        <section>
                            <div className="contact-method">
                                <span className="icon alt fa-envelope"></span>
                                <h3>Email</h3>
                            {/*The long string of ASCII is to confuse scraping bots*/}
                                <a className="email" href="&#109;&#97;&#105;&#108;&#116;&#111;&#58;&#115;&#117;&#109;&#109;&#101;&#114;&#105;&#110;&#116;&#104;&#101;&#119;&#111;&#111;&#100;&#115;&#99;&#97;&#109;&#112;&#64;&#103;&#109;&#97;&#105;&#108;&#46;&#99;&#111;&#109;">&#115;&#117;&#109;&#109;&#101;&#114;&#105;&#110;&#116;&#104;&#101;&#119;&#111;&#111;&#100;&#115;&#99;&#97;&#109;&#112;&#64;&#103;&#109;&#97;&#105;&#108;&#46;&#99;&#111;&#109;</a>
                            </div>
                        </section>
                        <section>
                            <div className="contact-method">
                                <span className="icon alt fa-home"></span>
                                <h3>Location</h3>
                                <span>
                                    Located on 1.4 acres off of Hillsboro Road, near McDougal Elementary in Carrboro, North Carolina
                                </span>
                            </div>
                        </section>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Mail