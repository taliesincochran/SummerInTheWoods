export const parseQuery = (query, that) => {
    let queryString = query.split("?")[1];
    let queryParameters = queryString.split("+");
    queryParameters.forEach(parameter=> {
        let paramName = parameter.split("=")[0];
        console.log(paramName)
        let paramValue = parameter.split("=")[1];
        console.log(paramValue);
        let totalCostButtonHash, amountDueButtonHash, totalWeeks, totalCost, amountDue, name, email, childName, phone;
        if(paramName === 't'){
            totalCostButtonHash = paramValue;
        } else if(paramName === 'a'){
            amountDueButtonHash = paramValue;
        } else if (paramName === 'w') {
            totalWeeks = paramValue;
        } else if (paramName === 'c') {
            totalCost = paramValue;
        } else if (paramName === 'd') {
            amountDue = paramValue;
        } else if (paramName === 'n') {
            name = paramValue;
        } else if (paramName === 'e') {
            email = paramValue;
            console.log(this.state);
        } else if(paramName === 'cn') {
            childName = paramValue;
        } else if(paramName === 'p') {
            phone = paramValue
        }
        that.setState({totalCostButtonHash, amountDueButtonHash, totalWeeks, totalCost, amountDue, name, email, childName, phone});
    })
}
export const handleChange = (target, that) => {
    const { name, value } = target;
    that.setState({[name]: value});
}