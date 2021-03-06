const mongoose = require("mongoose");
const shortId = require("shortid");
const dayjs = require('dayjs')

const shortUrlSchmea = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },
  full: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
    default: shortId.generate,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
  click_history: [
    {
      ip: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      location: {
        type: [String],
        required: true,
      },
      timestamp: {
        type: String,
        required: true,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model("ShortUrl", shortUrlSchmea);
