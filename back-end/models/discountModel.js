const pool = require('../db.js');

async function getDiscountByCode(code) {
  const result = await pool.query(
    `
      SELECT *
      FROM discounts
      WHERE code = $1
      AND active_flag = true
    `,
    [code]
  );

  if (result.rows.length === 0) {
    return null;
  }

  const row = result.rows[0];

  return {
    code: row.code,
    type: row.type,
    value: row.value,
  };
}

module.exports = {
  getDiscountByCode,
};
