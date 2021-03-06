const superagent = require('superagent');
const moment = require('moment');
const numberFormatter = require("number-formatter");

module.exports = {
    getIndexPage: (req,res) => {
        res.render('index');
    },

    getTestPage: (req,res) => {
        res.send('test');
    },

    getDashboardPage: async(req,res) => {

        let labels_arr_day = [];
        let labels_arr_week = [];
        let labels_arr_month = [];

        let case_data_arr_day = [];
        let death_data_arr_day = [];
        let rec_data_arr_day = [];
        let total_case_data_arr_day = [];
        let total_death_data_arr_day = [];
        let total_rec_data_arr_day = [];

        let case_data_arr_week = [];
        let death_data_arr_week = [];
        let rec_data_arr_week = [];
        let total_case_data_arr_week = [];
        let total_death_data_arr_week = [];
        let total_rec_data_arr_week = [];

        let case_data_arr_month = [];
        let death_data_arr_month = [];
        let rec_data_arr_month = [];
        let total_case_data_arr_month = [];
        let total_death_data_arr_month = [];
        let total_rec_data_arr_month = [];

        if(req.params.status=="false"){
            COUNTRY="All"
            ERRORMSG = req.params.country
            console.log('Redirecting to Default page.... ... .. .')
        } else {
            if(req.body.country==null) COUNTRY="All"
            else COUNTRY=req.body.country 
            ERRORMSG = "NONE"
        }

        if(COUNTRY==="Global") COUNTRY="All"

        api_run = async(COUNTRY,ERRORMSG) =>{
            NowDate = moment().format('YYYY/MM/DD');
            NowArray = NowDate.split("/")
            NowArray[1]=parseInt(NowArray[1]) - 1
            Now = moment(NowArray)
            Start = moment(['2020','0','21'])
            RANGE = Now.diff(Start, 'day')

            DAYS=RANGE
            LINK = `https://corona.lmao.ninja/v2/historical/${COUNTRY}?lastdays=${DAYS}`
            setTimeout(async() => {
                console.log(LINK)
                try{
                    let {body} = await superagent.get(LINK)
                    if(COUNTRY==="All"){
                        var Cases = Object.values(body.cases)
                        var Deaths = Object.values(body.deaths)
                        var Rec = Object.values(body.recovered)
                        var Dates = Object.keys(body.cases)
                        COUNTRY="Global"
                    } else {
                        var Cases = Object.values(body.timeline.cases)
                        var Deaths = Object.values(body.timeline.deaths)
                        var Rec = Object.values(body.timeline.recovered)
                        var Dates = Object.keys(body.timeline.cases)
                    }
                    counterRender = 0;

                    for(i=0;i<RANGE;i+=7){
                        if(Number.isNaN(parseInt(Cases[i+7]-Cases[i]))===false){
                            case_data_arr_week.push((parseInt(Cases[i+7]-Cases[i])))
                            death_data_arr_week.push((parseInt(Deaths[i+7]-Deaths[i])))
                            rec_data_arr_week.push((parseInt(Rec[i+7]-Rec[i])))
    
                            total_case_data_arr_week.push(Cases[i+7])
                            total_death_data_arr_week.push(Deaths[i+7])
                            total_rec_data_arr_week.push(Rec[i+7])
    
                            labels_arr_week.push(moment(Dates[i+7],'L').format('LL'))
                        }
                    }
                    WEEKS=labels_arr_week.length

                    for(i=0;i<RANGE;i+=30){
                        if(Number.isNaN(parseInt(Cases[i+30]-Cases[i]))===false){
                            case_data_arr_month.push((parseInt(Cases[i+30]-Cases[i])))
                            death_data_arr_month.push((parseInt(Deaths[i+30]-Deaths[i])))
                            rec_data_arr_month.push((parseInt(Rec[i+30]-Rec[i])))
    
                            total_case_data_arr_month.push(Cases[i+30])
                            total_death_data_arr_month.push(Deaths[i+30])
                            total_rec_data_arr_month.push(Rec[i+30])

                            labels_arr_month.push(moment(Dates[i+30],'L').format('LL'))
                        }
                    }
                    MONTHS=labels_arr_month.length

                    for(i=0;i<RANGE;i++){
                        if(Number.isNaN(parseInt(Cases[i+1]-Cases[i]))===false){
                            case_data_arr_day.push((parseInt(Cases[i+1]-Cases[i])))
                            death_data_arr_day.push((parseInt(Deaths[i+1]-Deaths[i])))
                            rec_data_arr_day.push((parseInt(Rec[i+1]-Rec[i])))
    
                            total_case_data_arr_day.push(Cases[i+1])
                            total_death_data_arr_day.push(Deaths[i+1])
                            total_rec_data_arr_day.push(Rec[i+1])
    
                            labels_arr_day.push(moment(Dates[i+1],'L').format('LL'))
                        }
                        ++counterRender;
                        
                        if(counterRender === RANGE){
                            res.render('dashboard',{
                                labels_arr_day,
                                labels_arr_week,
                                labels_arr_month,
                                case_data_arr_day,
                                case_data_arr_week,
                                case_data_arr_month,
                                death_data_arr_day,
                                death_data_arr_week,
                                death_data_arr_month,
                                rec_data_arr_day,
                                rec_data_arr_week,
                                rec_data_arr_month,
                                total_case_data_arr_day,
                                total_death_data_arr_day,
                                total_rec_data_arr_day,
                                total_case_data_arr_week,
                                total_death_data_arr_week,
                                total_rec_data_arr_week,
                                total_case_data_arr_month,
                                total_death_data_arr_month,
                                total_rec_data_arr_month,
                                RANGE,
                                DAYS,WEEKS,MONTHS,
                                COUNTRY,
                                ERRORMSG
                            });
                        }
                    }

                } catch(e) {
                    console.log(`ERROR: ${COUNTRY} data not available !!\n`)
                    if(req.params.status=="false") return res.send("404 Error MiMs")
                    else return res.redirect(`/dashboard/${COUNTRY}/false`)
                }
            },1500)
        }
        await api_run(COUNTRY,ERRORMSG)
    }
}