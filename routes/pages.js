const superagent = require('superagent');

module.exports = {
    getIndexPage: (req,res) => {
        res.render('index');
    },

    getDashboardPage: (req,res) => {
        res.render('dashboard');
    },

    getTestPage: async(req,res) => {
        COUNTRY="india"
        DAYS=5
        LINK = `https://corona.lmao.ninja/v2/historical/${COUNTRY}?lastdays=${DAYS}`
        let body = await superagent.get(LINK)

        try{
            console.log(body.response.timeline.cases)
        } catch(e) {
            console.log(e)
        }
        res.send(`TEST`);
    }
}