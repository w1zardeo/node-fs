const path = require('path');
const dotenv = require('dotenv');

const statusCode = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNVALIABLE: 503
}

dotenv.config({path});

const temporaryAvatarsFolder = path.join(process.cwd(), process.env.UPLOAD_DIR || 'tmp');
const finalAvatarsFolder = path.join(
  process.cwd(),
  'public',
  process.env.AVATARS_FOLDER || 'avatar'
);

const MAX_AVATAR_SIZE=5000000;

module.exports = {
    statusCode,
    temporaryAvatarsFolder,
    finalAvatarsFolder,
    MAX_AVATAR_SIZE
}