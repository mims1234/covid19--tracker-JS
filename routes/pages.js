
module.exports = {
    getIndexPage: (req,res) => {
        res.render('index');
    },

    getDashboardPage: (req,res) => {
        res.render('dashboard');
    }
}