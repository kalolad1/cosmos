export function handleInputChange(event) {
    const name = event.target.name;
    this.setState({
        [name]: event.target.value
    });
}