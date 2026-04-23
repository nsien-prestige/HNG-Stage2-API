const countryMap = {
    nigeria: 'NG',
    kenya: 'KE',
    angola: 'AO',
    benin: 'BJ',
    ghana: 'GH',
    uganda: 'UG',
    tanzania: 'TZ',
    egypt: 'EG',
    southafrica: 'ZA'
}

function parseNaturalQuery(query) {
    const filters = {}

    const q = query
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')

    // Gender (FIXED)
    if (/\bfemale\b/.test(q)) {
        filters.gender = 'female'
    } else if (/\bmale\b/.test(q)) {
        filters.gender = 'male'
    }

    // Age groups
    if (q.includes('child')) filters.age_group = 'child'
    if (q.includes('teenager')) filters.age_group = 'teenager'
    if (q.includes('adult')) filters.age_group = 'adult'
    if (q.includes('senior')) filters.age_group = 'senior'

    // Young
    if (q.includes('young')) {
        filters.min_age = 16
        filters.max_age = 24
    }

    // Age ranges
    const aboveMatch = q.match(/above (\d+)/)
    if (aboveMatch) filters.min_age = parseInt(aboveMatch[1])

    const belowMatch = q.match(/below (\d+)/)
    if (belowMatch) filters.max_age = parseInt(belowMatch[1])

    // Country (safer matching)
    if (q.includes('south africa') || q.includes('southafrica')) {
        filters.country_id = 'ZA'
    }

    if (q.includes('nigeria')) filters.country_id = 'NG'
    if (q.includes('kenya')) filters.country_id = 'KE'
    if (q.includes('angola')) filters.country_id = 'AO'
    if (q.includes('benin')) filters.country_id = 'BJ'
    if (q.includes('ghana')) filters.country_id = 'GH'
    if (q.includes('uganda')) filters.country_id = 'UG'
    if (q.includes('tanzania')) filters.country_id = 'TZ'
    if (q.includes('egypt')) filters.country_id = 'EG'

    return Object.keys(filters).length ? filters : null
}

module.exports = parseNaturalQuery