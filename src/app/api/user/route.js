import { connectdb } from '@/helper/db';
import { User } from '@/models/users';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { data } from 'autoprefixer';

export const POST = async (request) => {
  await connectdb();
  const data = await request.json();
  console.log('Data', data);
  const duplicateUser = await User.findOne({ email: data.email });
  if (duplicateUser) {
    if (duplicateUser.provider !== 'credentials') {
      return NextResponse.json(
        {
          message: `Already Registered with ${duplicateUser.provider}`,
        },
        { status: 401 }
      );
    }
    return NextResponse.json(
      {
        message: 'Email Already Registered',
      },
      { status: 401 }
    );
  }
  if (data.password.length < 8) {
    return NextResponse.json(
      {
        message: 'Please minimum 8 letter password',
      },
      { status: 401 }
    );
  }
  const hashedPassword = await bcrypt.hash(data.password, 10);
  try {
    const user = new User({
      ...data,
      password: hashedPassword,
      provider: 'credentials', //This is used to distinguish between if the user uses the same email id for the github login and credentials logins
    });
    await user.save();
    return NextResponse.json(
      {
        message: 'User Registered',
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log('Error From registration', error);
    return NextResponse.json(error, {
      message: 'Something went wrong!!!',
    });
  }
};

export const GET = async () => {
  try {
    const allUsers = await User.find();
    return NextResponse.json(allUsers, {
      status: 201,
    });
  } catch (error) {
    console.log('Error From registration', error);
    return NextResponse.json(error, {
      message: 'Something went wrong!!!',
    });
  }
};

//Updating users - Adding mobile no.
export const PUT = async (request) => {
  try {
    const data = await request.json();
    console.log('Data', data);
    const userData = await User.findById(data.id);
    userData.mobileno = data.mobileno;
    await userData.save();
    console.log('User Data', userData);
    return NextResponse.json(
      {
        message: 'Mobile no. added',
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log('Error From registration', error);
    return NextResponse.json(error, {
      message: 'Something went wrong!!!',
    });
  }
};
