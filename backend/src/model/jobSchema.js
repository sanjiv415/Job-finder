import mongoose from "mongoose" 

const jobSchema = new mongoose.Schema({
    title : {
        type : String,
        requried : [true , "please provide us title "],
        minLength: [3, "Title must contain at least 3 Characters!"],
        maxLength: [30, "Title cannot exceed 30 Characters!"],
    },

    description : {
        type : String ,
        required : [true , "please provide us descripation "],
        minLength: [30, "descripation must contain at least 3 Characters!"],
        maxLength: [303, "descripation cannot exceed 30 Characters!"],
    },
     category : {
        type: String,
        required: [true, "Please provide a category."],
     },

     country : {
        type : String ,
        required : [true , "please provide us country name "]
     },

     city : {
        type : String ,
        required : [true , "please provide us city name "]
     },

     location : {
        type : String ,
        required : [true , " please provide us location     "]
     },

     fixedSalary: {
        type: Number,
        minLength: [4, "Salary must contain at least 4 digits"],
        maxLength: [9, "Salary cannot exceed 9 digits"],
      },
      salaryFrom: {
        type: Number,
        minLength: [4, "Salary must contain at least 4 digits"],
        maxLength: [9, "Salary cannot exceed 9 digits"],
      },
      salaryTo: {
        type: Number,
        minLength: [4, "Salary must contain at least 4 digits"],
        maxLength: [9, "Salary cannot exceed 9 digits"],
      },

      expired : {
        type : Boolean,
        default : false 
    },

    postedBy : {
        type : mongoose.Schema.ObjectId,
        ref : "User",
        required : true 
    }
})

export const Job = mongoose.model("Job",jobSchema)