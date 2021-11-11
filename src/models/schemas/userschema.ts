import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { UserI } from '../interfaces';

const userCollection = 'userai';

const userSchema = new Schema<UserI>(
	{
		avatar: {type: String },
		avatar_id: {type: String},
		email: { type: String, required: true, unique: true, max: 100 },
		password: { type: String, required: true, max: 100 },
		name: { type: String, required: true, max: 100 },
		address: { type: String, required: true, max: 200 },
		age: { type: Number, required: true },
		phone: { type: String, required: true },
		isAdmin: { type: Boolean },
	},
	{ versionKey: false }
);

// Encrypt password
userSchema.pre('save', async function (next) {
	const user = this;
	const hash = await bcrypt.hash(user.password, 10);
	this.password = hash;
	next();
});

userSchema.pre('findOneAndUpdate', async function (next) {
	const user = this as any;
	if (user._update.$set.password) {
		const hash = await bcrypt.hash(user._update.$set.password, 10);
		user._update.$set.password = hash;
	}
	next();
});

// Compare if the password is valid with encrypted password stored in database.
userSchema.methods.isValidPassword = async function (password) {
	const user = this;
	const compare = await bcrypt.compare(password, user.password);
	return compare;
};

export const userModel = model<UserI>(userCollection, userSchema);
