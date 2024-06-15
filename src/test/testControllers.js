const Test = require("./testModel");

exports.addTestString = async (req, res) => {
  try {
    const testString = await Test.create(req.body);
    res.status(200).send({ test: testString });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.getTestString = async (req, res) => {
  try {
    const testString = await Test.findOne({});

    res.status(200).send({ test: testString });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
