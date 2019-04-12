class Form {
    constuctor(props) {
        this.handleYearSelect = this.props.handleYearSelect;
        this.handleWeekSelect = this.props.handleWeekSelect;
    }
    static getYearBoxes = (yearsArray) => {
        yearsArray.map(year => {
            return(
                <Checkbox
                                                                    name="year1"
                                                                    value={this.props.yearsArray[0]}
                                                                    onChange={this.handleYearSelect}
                                                                    checked={this.state.chosenYear === this.props.yearsArray[0]}
                                                                    className='float-left'
                                                                    onClick={() => this.handleYearSelect(this.props.yearsArray[0])}
                                                                    text={this.props.yearsArray[0]}
                                                                    />
            )
        })
    }
}