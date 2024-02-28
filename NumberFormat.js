const CurrencyFormat = (value) =>{
    const formated = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(value)
  
    return formated
}


module.exports = CurrencyFormat