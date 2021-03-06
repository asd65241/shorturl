const express = require("express");
const mongoose = require("mongoose");
const ShortUrl = require("./models/shortUrl");
const expressip = require("express-ip");
const getUrlTitle = require("get-url-title");
const extractDomain = require("extract-domain");
require("dotenv").config();
const app = express();

mongoose.connect(process.env.MONGODB_KEY, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(expressip().getIpInfoMiddleware);

app.get("/", async (req, res) => {
  const shortUrls = await ShortUrl.find();
  res.render("index", { shortUrls: shortUrls });
});

app.post("/shortUrls", async (req, res) => {
  const domain = extractDomain(req.body.fullUrl);
  const title = await getUrlTitle(req.body.fullUrl);
  await ShortUrl.create({
    full: req.body.fullUrl,
    title: title,
    domain: domain,
  });
  res.redirect("/");
});

app.get("/status/:shortUrl", async (req, res) => {
  // const data = await ShortUrl.aggregate([
  //   { $match: { short: req.params.shortUrl } },
  //   { $group: { _id: "$click_history.country", count: { $sum: "$click_history.country" } } },
  // ]);

  const data = await ShortUrl.findOne({
    short: req.params.shortUrl,
  });

  if (data == null) return res.sendStatus(404);

  // Country plot

  const arr = await data.click_history;

  const label = [];
  const value = [];

  for (i = 0; i < arr.length; i++) {
    const element = arr[i].country;
    if (label.indexOf(element) < 0) {
      label.push(element);
      value.push(1);
    } else {
      value[label.indexOf(element)] += 1;
    }
  }

  const plt = {
    datasets: [
      {
        data: value,
      },
    ],
    labels: label,
  };

  res.render("status", { data: data, plt: JSON.stringify(plt) });
});

app.get("/:shortUrl", async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
  if (shortUrl == null) return res.sendStatus(404);

  shortUrl.clicks++;

  res.redirect(shortUrl.full);

  if ("error" in req.ipInfo) {
    console.log(req.ipInfo.error);
  } else {
    await shortUrl.update({
      $addToSet: {
        click_history: {
          ip: req.ipInfo.ip,
          country: req.ipInfo.country,
          location: req.ipInfo.ll,
        },
      },
    });
    console.log(req.ipInfo)
  }

  shortUrl.save();
});

app.listen(process.env.PORT);
