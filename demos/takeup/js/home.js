V.init(function(){
    var App = new Vue({
        el: "body",
        data: (function(){
            var reportInit = {
                    fatRatio: 0,
                    valueBMI: 18.5,
                    calorieDelta: 0,
                    sportMsg: {
                        hours: 0,
                        kCal: 0,
                        total: 0
                    },
                    age: 20,
                    nutrition: {
                        total: 0,//kcal
                        carb: 0, //g
                        protein: 0, //g
                        fat: 0 //g
                    }
                };

            var birthday = V.storage("birthday", "1992-03-13"),
                height = V.storage("height", 175),
                gender = V.storage("gender", "male"),
                weight = V.storage("weight", 65),
                weist = V.storage("weist", 83),
                sport = V.storage("sport", 0),
                currentSport = V.storage("name","running"),
                // running: 0,bicycling: 1,swimming: 2
                habits = V.storage("habits", [{
                    start: V.date().calc("day", 0).format(),
                    last: V.date().calc("day", -1).format()
                }]),
                habitIndex = V.storage("habitIndex", 0),
                fatRatio = V.storage("fatRatio", 0),
                calorieDelta = V.storage('calorieDelta', 0),
                report = V.storage('report',reportInit);

            // console.log(V.date().calc("day", 0).format());
            // console.log(V.date().calc("day", -1).format());
            console.log(habits.data[0].start);
            console.log(habits.data[0].last);
            return {
                birthday: birthday,
                height: height,
                gender: gender,
                weight: weight,
                weist: weist,
                sport: sport,
                currentSport:currentSport,
                habits: habits,
                habitIndex: habitIndex,
                fatRatio: fatRatio,
                calorieDelta: calorieDelta,
                inputs: {
                    year: V.date(birthday.data).yearStr(),
                    month: V.date(birthday.data).monthStr(),
                    date: V.date(birthday.data).dateStr(),
                    height: height.data,
                    gender: gender.data,
                    weight: weight.data,
                    weist: weist.data,
                    sport: sport.data
                },
                status: {
                    setting: true,
                    baseSetting: true,
                    detailSetting: false,
                    takeup: false,
                    tipsPage: false,
                    tipsDetail0: false,
                    tipsDetail1: false,
                    tipsDetail2: false,
                    tipsDetail3: false,
                    tipsMove: false
                },
                report: report,
                statics: {
                    colors: [["#8CBDFA", "#fff577"], ["#ef6360", "#ffeb3b"]],
                    tips: ["i hate heat and fat !",
                            "let’s go for it !",
                            "oh ! it’s my precious !",
                            "my treasured, your coveted"
                            ],
                    fatRatioTargetMale: .10,
                    fatRatioTargetFemale: .17,
                    constMale: 44.74,
                    constFemale: 34.89,
                    weistRatio: .74,
                    weightRatio: .082,
                    burnParam1: .05,
                    burnParam2: .6,
                    calorieParam: 9000,
                    kgToLb: 2.2046226,
                    burn: {
                        running: 600,
                        swimming: 1000,
                        bicycling: 700
                    }
                }
            };
        })(),

        methods: {
            callTip: function(index) {
                var item = 'tipsDetail'+index;
                console.log(item);
                this.status[item] = true;
                this.status.tipsMove = true;
            },
            menuTip: function() {
                this.status.tipsMove = false;
                this.status.tipsDetail0 = false;
                this.status.tipsDetail1 = false;
                this.status.tipsDetail2 = false;
                this.status.tipsDetail3 = false;
            },
            save: function() {
                if (this.isBirthdayValid) {

                    this.birthday.set(this.inputDate);

                } else {

                    this.inputs.year = V.date(this.birthday.data).yearStr();
                    this.inputs.month = V.date(this.birthday.data).monthStr();
                    this.inputs.date = V.date(this.birthday.data).dateStr();
                }

                this.height.set(this.inputs.height);
                this.gender.set(this.inputs.gender);
                this.inputs.weight && this.weight.set(this.inputs.weight);
                this.inputs.weist && this.weist.set(this.inputs.weist);
                this.inputs.sport && this.sport.set(this.inputs.sport);
                switch(this.inputs.sport){
                    case 0:
                        this.currentSport = "RUNNING";
                        break;
                    case 1:
                        this.currentSport = "BICYCLING";
                        break;
                    case 2:
                        this.currentSport = "SWIMMING";
                        break;
                };
            },
            next: function() {

                this.status.baseSetting = false;
                this.status.detailSetting = true;
            },
            goback: function() {

                this.status.baseSetting = true;
                this.status.detailSetting = false;
            },
            calculate: function() {
                this.status.detailSetting = false;
                this.status.setting = false;
                this.status.tipsPage = true;

                //cal ratio
                var constParam = this.gender == "male" ? this.statics.constMale : this.statics.constFemale;
                var fatRatio = (this.inputs.weist*this.statics.weistRatio
                                        - this.inputs.weight*this.statics.weightRatio
                                        - constParam)/this.inputs.weight;
                var report ={
                    fatRatio: 0,
                    valueBMI: 0,
                    calorieDelta: 0,
                    sportMsg: {
                        hours: 0,
                        kCal: 0,
                        total: 0
                    },
                    age: 0,
                    nutrition: {
                        total: 0,//kcal
                        carb: 0, //g
                        protein: 0, //g
                        fat: 0 //g
                    }
                };
                report.fatRatio = fatRatio;
                this.fatRatio.set(fatRatio);
                //cal BMI
                report.valueBMI = this.inputs.weight/Math.pow((this.inputs.height/100),2);
                //cal calorie kcal/kg
                report.calorieDelta = fatRatio*this.inputs.weight*this.statics.calorieParam;
                this.calorieDelta.set(fatRatio*this.inputs.weight*this.statics.calorieParam);
                //cal sport
                var target = this.gender == "male" ? this.statics.fatRatioTargetMale: this.statics.fatRatioTargetFemale;
                if(this.isFat){
                    var needToburn = this.statics.burnParam1
                                    *this.inputs.weight
                                    *this.statics.burnParam2
                                    *this.statics.calorieParam;
                    report.sportMsg.hours = 1;
                    switch(this.inputs.sport){
                        case 0:
                            report.sportMsg.kCal = this.statics.burn.running;
                            report.sportMsg.total = (fatRatio - target)
                                                            *this.inputs.weight
                                                            *0.4*9000/(this.statics.burn.running);
                            break;
                        case 1:
                            report.sportMsg.kCal = this.statics.burn.bicycling;
                            report.sportMsg.total = (fatRatio - target)
                                                            *this.inputs.weight
                                                            *0.4*9000/(this.statics.burn.bicycling);
                            break;
                        case 2:
                            report.sportMsg.kCal = this.statics.burn.swimming;
                            report.sportMsg.total = (fatRatio - target)
                                                            *this.inputs.weight
                                                            *0.4*9000/(this.statics.burn.swimming);
                            break;
                    };
                }
                else{
                    report.sportMsg.hours = 0.5;
                    switch(this.inputs.sport){
                        case 0:
                            report.sportMsg.kCal = this.statics.burn.running;
                            break;
                        case 1:
                            report.sportMsg.kCal = this.statics.burn.bicycling;
                            break;
                        case 2:
                            report.sportMsg.kCal = this.statics.burn.swimming;
                            break;
                    };
                }
                //cal nurition
                report.age = this.calAge();
                var total = 0;
                if(this.gender == "male"){
                    if(report.age >=11 && report.age <=17){
                        total = this.inputs.weight * this.statics.kgToLb * 11;
                    }
                    else if(report.age >=18 && report.age <=30){
                        total = this.inputs.weight * this.statics.kgToLb * 7 + 680;
                    }
                    else if(report.age >=31 && report.age <=60){
                        total = this.inputs.weight * this.statics.kgToLb * 5 + 830;
                    }
                    else{
                        total = this.inputs.weight * this.statics.kgToLb * 6 + 490;
                    }
                }
                else{
                    if(report.age >=11 && report.age <=17){
                        total = this.inputs.weight * this.statics.kgToLb * 9;
                    }
                    else if(report.age >=18 && report.age <=30){
                        total = this.inputs.weight * this.statics.kgToLb * 6.5 + 450;
                    }
                    else if(report.age >=31 && report.age <=60){
                        total = this.inputs.weight * this.statics.kgToLb * 4 + 830;
                    }
                    else{
                        total = this.inputs.weight * this.statics.kgToLb * 5 + 600;
                    }
                }
                report.nutrition.total = total; //kcal
                report.nutrition.carb = total*0.7/4;//g
                report.nutrition.protein = total*0.14/4;//g
                report.nutrition.fat = total*0.16/9;//g
                this.report.set(report);


            },
            takeup: function() {

                this.status.tipsPage = false
                this.status.takeup = true;
            },
            getStreak: function(index) {
                var habit = this.habits.data[index];
                return V.date(habit.last).diff(habit.start) + 1;
            },
            accomplish: function() {
                console.log(this.accomplished);
                console.log(V.date().calc("day", 0).format());
                console.log(V.date().format())

                this.habits.data[this.habitIndex.data].last = this.accomplished ? V.date().calc("day", -1).format() : V.date().format()
                this.habits.save();
            },

            ifAccomplished: function(index) {
                var habit = this.habits.data[index];
                console.log(habit.last);
                return habit.last === V.date().format();

            },
            resetting: function() {
                this.status.setting = true;
                this.status.baseSetting = true;
                this.status.detailSetting = false;
                this.status.takeup = false;
                this.status.tipsPage = false;
                this.status.tipsMove = false;
                this.status.tipsDetail0 = false;
                this.status.tipsDetail1 = false;
                this.status.tipsDetail2 = false;
                this.status.tipsDetail3 = false;
            },
            calAge: function() {
                return (V.date().diff(this.birthday.data, "second") / (1000 * 60 * 60 * 24 * 365)).toFixed(9);
            }

        },

        computed: {
            colorParam: function() {
                return this.inputs.gender == "male" ? 0 : 1;
            },
            inputDate: function() {
                return this.inputs.year + "-" + this.inputs.month + "-" + this.inputs.date;
            },
            isBirthdayValid: function() {
                return V.date(this.inputDate).proto.toString() !== "Invalid Date";
            },
            streak: function() {
                return this.getStreak(this.habitIndex.data);
            },
            getCurrentHabit: function(){
                return this.habits.data[this.habitIndex.data];
            },
            accomplished: function() {
                return this.ifAccomplished(this.habitIndex.data);
            },
            isFat: function() {
                if(this.gender == "male"){
                    return this.report.data.fatRatio > this.statics.fatRatioTargetMale ? true:false;
                }
                return this.report.data.fatRatio > this.statics.fatRatioTargetFemale ? true:false;
            },
            showWarning: function() {
                return this.isFat ? 'you are fat !':'Skinny One !';
            }
        },
        filters: {

            pluralityCheck: function(val, number) {
                if (number > 1) {
                    return val + "s";
                } else {
                    return val;
                }
            },
            removeYear: function(val) {
                var sep = val.indexOf("/") === -1 ? "-" : "/";
                return val.split(sep)[1] + " / " + val.split(sep)[2];
            },
            toFixed: function(val,pos) {
                var num = new Number(val);
                var pos = pos || 2;
                return num.toFixed(pos);
            },
            toPercent: function(val) {
                var num = new Number(val*100);
                return num.toFixed(2)+ " % ";
            },
            ceil: function(val) {
                var num = new Number(val);
                return Math.ceil(num);
            }
        },
        ready: function() {
            if(this.report.data.fatRatio != 0){
                console.log(this.report.data.fatRatio);
                this.status.setting = false;
                this.status.takeup = true;
            }
            else{
                console.log(this.report.data.fatRatio);
                this.status.setting = true;
                this.status.takeup = false;
            }
        }
    });
                // status: {
                //     setting: true,
                //     baseSetting: true,
                //     detailSetting: false,
                //     takeup: false,
                //     tipsPage: false,
                //     tipsDetail0: false,
                //     tipsDetail1: false,
                //     tipsDetail2: false,
                //     tipsDetail3: false,
                //     tipsMove: false
                // },

    V.cordova.ready(function() {

        // var Misc = {

        //     fastclickInit: function() {

        //         FastClick.attach(V("body").el);

        //     }

        // };

        // Misc.fastclickInit();

        // V.cordova.back(function() {

        //     if (App.status.setting === false) {

        //         V.cordova.exit();

        //     }

        //     App.status.setting = false;

        // });

        // V.cordova.splashscreen.hide();
        V("body").appear();

    });
});
