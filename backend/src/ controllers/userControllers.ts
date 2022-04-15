/* eslint-disable @typescript-eslint/naming-convention */
import { USER } from '../models/userModel';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import JWT from 'jsonwebtoken';
import formidable, { File, Part } from 'formidable';
import { Request, Response } from 'express';
import path from 'path';

type UserLogin = {
  email: string;
  password: string;
};

type UserDetails = UserLogin & {
  _id: string;
  photoUrl?: string;
  name?: string;
  bio?: string;
  phoneNum?: string;
};

export const register = asyncHandler(async (req, res): Promise<void> => {
  const { email, password } = req.body as { email: string; password: string };

  if (!email || !password) {
    res.status(400);
    throw new Error('missing required field');
  }

  let user: UserDetails | null = await USER.findOne({ email: email });

  if (user) {
    res.status(409);
    throw new Error('User already exist');
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  user = (await USER.create({
    _id: randomUUID(),
    email: email,
    password: hashPassword,
  })) as UserDetails;

  if (user) {
    res.status(201).json({ token: generateToken(user._id), id: user._id });
  }
});

export const login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body as { email: string; password: string };

  if (!email || !password) {
    res.status(400);
    throw new Error('missing required field');
  }

  const user: UserDetails | null = await USER.findOne({ email: email });

  if (!user) {
    res.status(404);
    throw new Error('not found');
  }

  if (!(await bcrypt.compare(password, user.password))) {
    res.status(401);
    throw new Error('invalid login credential');
  }

  res.status(200).json({ token: generateToken(user._id), id: user._id, name: user.name, photoUrl: user.photoUrl });
});

export const getUserDetails = asyncHandler(async (req, res) => {
  const { id } = req.params as { id: string };

  const user = (await USER.findById(id)) as UserDetails;

  if (!user) {
    res.status(401);
    throw new Error('user not exist');
  }

  res.status(200).json({
    photoUrl: user.photoUrl,
    name: user.name,
    bio: user.bio,
    phoneNum: user.phoneNum,
    email: user.email,
  });
});

export const update = asyncHandler(async (req, res) => {
  const form = formidable({
    multiples: false,
    uploadDir: 'images',
    keepExtensions: true,
    filter: ({ originalFilename, mimetype }: Part): boolean => {
      // keep only images
      const filetypes = /jpeg|jpg|png|gif/;
      // Check ext
      const extname = filetypes.test(path.extname(originalFilename as string).toLowerCase());
      // Check mime
      const extmimetype = filetypes.test(mimetype as string);
      if (!extname || !extmimetype) {
        throw new Error('Type not supported');
      }

      return true;
    },
    maxFileSize: 1024 * 1024,
  });
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  form.parse(req, async (err, fields, files): Promise<void> => {
    if (err) {
      const error = err as Error;
      if (error.message === 'Type not supported') {
        res.status(400).json({ error: error.message });
        return;
      }

      if (error.message.includes('options.maxFileSize')) {
        res.status(400).json({ error: 'maxFilesize 5mb' });
        return;
      }

      res.status(500).json({ error: error.message || '"internal server error"' });
      return;
    }
    const { id } = req.params as { id: string };
    const { name, bio, phoneNum, email, password } = fields as {
      name: string;
      bio: string;
      phoneNum: string;
      email: string;
      password: string;
    };

    let hashPassword;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashPassword = await bcrypt.hash(password, salt);
    }

    let photoUrl;
    if (files.image) {
      const image = files.image as File;
      const index = image.filepath.indexOf('images');
      const path = image.filepath.slice(index);
      const host = req.header('host') as string;
      console.log(image.filepath.slice(index));
      photoUrl = `http://${host}/${path}`;
    }

    const user = (await USER.findByIdAndUpdate(
      id,
      { name, bio, phoneNum, email, password: hashPassword, photoUrl },
      { returnDocument: 'after' },
    )) as UserDetails;

    res.status(200).json({
      photoUrl: user.photoUrl,
      name: user.name,
      bio: user.bio,
      phoneNum: user.phoneNum,
      email: user.email,
    });
  });
});

const generateToken = (id: string): string => {
  return JWT.sign({ id: id }, process.env.JWT_SECRET || 'SuperSecret');
};
