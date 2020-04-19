const mongoose = require('mongoose')
var passportLocalMongoose = require('passport-local-mongoose');
const PatientFormSchema = new mongoose.Schema(

    {
    firstName :{
        type : String,
        require : true
    },         
    lastName :{
        type : String,
        require : true
    }, 
    idPatient :{
        type : String,
        require : true
    },
    birthday :{
        type : String,
        require : true
    },
    sexe :{
        type : String,
        require : true
    },
    cin :{
        type : String,
        require : true
    },
    gouvernerat :{
        type : String,
        require : true
    },
    delegation :{
        type : String,
        require : true
    },
    fievre :{
        type : String,
    },
    toux :{
        type : String,
    },
    respiratoire :{
        type : String,
    },
    diarrhee :{
        type : String,
    },
    maux_tete :{
        type : String,
    },
    doux_muscule :{
        type : String,
    },
    perte_adorat :{
        type : String,
    },
    perte_appetit :{
        type : String,
    },
    fatigue_inahbituelle :{
        type : String,
    },
    pas_sympthomes :{
        type : String,
    },
    percentage :{
        type : String,
    },
    image :{
        type : String,
    },
    date :{
        type : Date,
        default : Date.now
    }
    }
)

// plugin for passport-local-mongoose 
PatientFormSchema.plugin(passportLocalMongoose);
const PatientForm = mongoose.model('PatientFrom', PatientFormSchema)

module.exports = PatientForm
