import NumerologyReport from "../models/Report.js";
import { STATUS_CODE, MESSAGE } from "../config/constants.js";

// Helper function to calculate numerology
const calculateNumerology = (name, dob) => {
  const birthDate = dob.split(" ");
  const [day, month, year] = birthDate.map((str, index) => {
    if (index === 0) return parseInt(str);
    if (index === 1) return monthMap(str);
    return sumDigits(str);
  });

  const lifePathNumber = sumDigits(day + month + year);
  const expressionNumber = calculateExpressionNumber(name);
  const soulUrgeNumber = calculateSoulUrgeNumber(name);
  const personalityNumber = calculatePersonalityNumber(name);

  return {
    lifePathNumber,
    expressionNumber,
    soulUrgeNumber,
    personalityNumber,
  };
};

const sumDigits = (number) => {
  let sum = 0;
  while (number > 0) {
    sum += number % 10;
    number = Math.floor(number / 10);
  }
  return sum > 9 ? sumDigits(sum) : sum;
};

const monthMap = (month) => {
  const months = {
    January: 1, February: 2, March: 3, April: 4, May: 5, June: 6,
    July: 7, August: 8, September: 9, October: 10, November: 11, December: 12
  };
  return months[month];
};

const calculateExpressionNumber = (name) => {
  const letterValues = { 
    a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 1, 
    k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9, s: 1, t: 2, 
    u: 3, v: 4, w: 5, x: 6, y: 7, z: 8
  };
  const nameDigits = name.replace(/\s+/g, '').toLowerCase().split('');
  let total = 0;
  nameDigits.forEach((letter) => total += letterValues[letter] || 0);
  return sumDigits(total);
};

const calculateSoulUrgeNumber = (name) => {
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  let vowelSum = 0;
  name.replace(/\s+/g, '').toLowerCase().split('').forEach((char) => {
    if (vowels.includes(char)) {
      vowelSum += char.charCodeAt(0) - 96;
    }
  });
  return sumDigits(vowelSum);
};

const calculatePersonalityNumber = (name) => {
  const consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];
  let consonantSum = 0;
  name.replace(/\s+/g, '').toLowerCase().split('').forEach((char) => {
    if (consonants.includes(char)) {
      consonantSum += char.charCodeAt(0) - 96;
    }
  });
  return sumDigits(consonantSum);
};

// Controller function to create a numerology report
export const createReport = async (req, res) => {
  const { name, dob, createdBy } = req.body;

  if (!name || !dob) {
    return res.status(STATUS_CODE.BAD_REQ).json({ message: MESSAGE.ALL_FILEDS_REQ });
  }

  try {
    const numerology = calculateNumerology(name, dob);

    const report = new NumerologyReport({
      name,
      dob,
      lifePathNumber: numerology.lifePathNumber,
      expressionNumber: numerology.expressionNumber,
      soulUrgeNumber: numerology.soulUrgeNumber,
      personalityNumber: numerology.personalityNumber,
      createdBy,
    });

    const savedReport = await report.save();
    res.status(STATUS_CODE.NEW_CREATED).json(savedReport);
  } catch (error) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERR).json({ message: error.message });
  }
};

// Get reports by user with pagination
export const getReportsByUser = async (req, res) => {
  const { page = 1, limit = 2 } = req.query;
  try {
    const reports = await NumerologyReport.find({ createdBy: req.params.id })
      .limit(parseInt(limit))
      .skip((page - 1) * limit)
      .exec();

    const count = await NumerologyReport.countDocuments({ createdBy: req.params.id });

    res.json({
      reports,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
    });
  } catch (err) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERR).json({ message: err.message });
  }
};

// Get all reports
export const getAllReports = async (req, res) => {
  try {
    const reports = await NumerologyReport.find();
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
