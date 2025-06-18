import express from 'express';
import quantycaList from './AMC_EVENT_IDs.json' with { type: "json" }

const app = express();
const port = 3000;

app.get('/processQuantycaList/:TransportOrdersEventID', (req, res) => {
    const TransportOrdersEventID = req.params.TransportOrdersEventID;

    const result = quantycaList.map((item) => {
        const isValid = TransportOrdersEventID !== item.GeneratingEventID
        return{
            ...item,
            isValid
        }
    })

    const summary = {
        total: result.length,
        validCount: result.filter(x => x.isValid).length,
        invalidCount: result.filter(x => !x.isValid).length
    }

    res.json(summary)
})

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`)
})