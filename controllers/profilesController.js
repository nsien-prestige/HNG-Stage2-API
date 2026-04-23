const pool = require('../db/db')

const getAllProfiles = async (req, res) => {
    const page = req.query.page || 1
    const limit = Math.min(req.query.limit || 10, 50)

    const offset = (page - 1) * limit

    try {
        const conditions = []
        const values = []

        if (req.query.gender) {
            conditions.push(`gender = $${conditions.length + 1}`)
            values.push(req.query.gender)
        }

        if (req.query.age_group) {
            conditions.push(`age_group = $${conditions.length + 1}`)
            values.push(req.query.age_group)
        }

        if (req.query.country_id) {
            conditions.push(`country_id = $${conditions.length + 1}`)
            values.push(req.query.country_id)
        }

        if (req.query.min_age) {
            conditions.push(`age >= $${conditions.length + 1}`)
            values.push(req.query.min_age)
        }

        if (req.query.max_age) {
            conditions.push(`age <= $${conditions.length + 1}`)
            values.push(req.query.max_age)
        }

        if (req.query.min_gender_probability) {
            conditions.push(`gender_probability >= $${conditions.length + 1}`)
            values.push(req.query.min_gender_probability)
        }

        if (req.query.min_country_probability) {
            conditions.push(`country_probability >= $${conditions.length + 1}`)
            values.push(req.query.min_country_probability)
        }

        // Join conditions with AND and prepend WHERE if there are any conditions
        const whereClause = conditions.length > 0 
            ? `WHERE ${conditions.join(' AND ')}` 
            : ''

        //Push limit and offset after all filters
        values.push(limit, offset)

        const result = await pool.query(
            `SELECT * FROM profiles ${whereClause} LIMIT $${values.length - 1} OFFSET $${values.length}`,
            values
        )

        const totalResult = await pool.query(
            `SELECT COUNT(*) FROM profiles ${whereClause}`,
            values.slice(0, -2) // Exclude limit and offset for count query
        )

        res.status(200).json({
            status: 'success',
            page: parseInt(page),
            limit: parseInt(limit),
            total: parseInt(totalResult.rows[0].count), 
            data: result.rows
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ "status": "error", "message": "Internal Server Error" })
    }
}

module.exports = {
    getAllProfiles
}