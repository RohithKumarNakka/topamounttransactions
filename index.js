// With this data: - Get all the transactions of last year's top earner. 
// This means find the employee with the highest sum total of amount within the prior calendar year. 
// Prior calendar year means, if it is currently 2022, we want only to consider transactions in 2021. 
// - With last year's top earner's transactions get the transactionIDs where the type is alpha.
const axios = require ('axios')

const formData = async () => {
    try {
        const res = await axios.get('https://interview.adpeai.com/api/v2/get-task')
        const transactions = res.data.transactions
        // take transactions of 2023 year
        // take each employees amount sum, transactions
        let transactionAmount = {}
        let trasactionNameMap = {}
        transactions.map(t => {
            if(t.timeStamp.split('-')[0] === `${new Date().getFullYear() - 1}`) {
                if(!transactionAmount[t.employee.name]) {
                    transactionAmount[t.employee.name] = t.amount
                    trasactionNameMap[t.employee.name] = new Array(t)
                } else {
                    transactionAmount[t.employee.name] += t.amount
                    trasactionNameMap[t.employee.name].push(t)
                }
            }
        })
        // console.log(transactionAmount)
        // console.log(trasactionNameMap)

        // take highest sum of amounts employeename 
        let maxAmount = -Infinity;
        let topAmountName 
        for(let name in transactionAmount) {
            if(transactionAmount[name] > maxAmount) {
                maxAmount = transactionAmount[name]
                topAmountName = name
            }
        }
        console.log(topAmountName)

        // find transactionids for that name for 2023 & type alpha
        let topAmountNameTransactionsIds = []
        const topAmountNameTransactions = trasactionNameMap[topAmountName]
        topAmountNameTransactions.forEach(t => {
            if(t.timeStamp.split('-')[0] === `${new Date().getFullYear() - 1}` && t.type === 'alpha') {
                topAmountNameTransactionsIds.push(t.transactionID)
            }
        })

        console.log(topAmountNameTransactionsIds)
    } catch(err) {
        console.log(err)
    }
}

formData()


