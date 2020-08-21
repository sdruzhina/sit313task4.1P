const mongoose = require("mongoose")
const validator = require("validator")
const requesterSchema = new mongoose.Schema(
    {
        country: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            trim: true,
            required: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)){
                    throw new Error('Email is not valid!');
                }
            }
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 6,
            maxlength: 30
        },
        address1: {
            type: String,
            required: true,
            trim: true
        },
        address2: String,
        city: {
            type: String,
            trim: true,
            required: true
        },
        state: {
            type: String,
            required: true,
            validate: [
                function (value) {
                    const states = ['ACT', 'NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA'];
                    if (this.country === 'AU') {
                        return states.includes(value);
                    }
                    else {
                        return true;
                    }
                }
            ]
        },
        postcode: {
            type: String,
            trim: true
        },
        mobile: {
            type: String,
            trim: true
        }  
    }
)

requesterSchema.virtual('passwordConfirm')
.get(function() {
  return this._passwordConfirm;
})
.set(function(value) {
  this._passwordConfirm = value;
});

// Check that the password matches password confirmation
requesterSchema.path('password').validate(function(v) {
    if (this.password !== this.passwordConfirm) {
        this.invalidate('passwordConfirm', 'Passwords must match.');
    }
}, null);

module.exports  =  mongoose.model("Requester", requesterSchema)
