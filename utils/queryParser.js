function parseNaturalQuery(query) {
    const filters = {}

    const q = query.toLowerCase().replace(/[^a-z0-9\s]/g, '')

    // Gender - check "male and female" first
    if (q.includes('male and female') || q.includes('female and male')) {
        // no gender filter - both genders
    } else if (/\bfemale\b/.test(q)) {
        filters.gender = 'female'
    } else if (/\bmale\b/.test(q)) {
        filters.gender = 'male'
    }

    // Age groups
    if (q.includes('child')) filters.age_group = 'child'
    if (q.includes('teenager')) filters.age_group = 'teenager'
    if (q.includes('adult')) filters.age_group = 'adult'
    if (q.includes('senior')) filters.age_group = 'senior'

    // Young maps to 16-24
    if (q.includes('young')) {
        filters.min_age = 16
        filters.max_age = 24
    }

    // Age ranges
    const aboveMatch = q.match(/above (\d+)/)
    if (aboveMatch) filters.min_age = parseInt(aboveMatch[1])

    const belowMatch = q.match(/below (\d+)/)
    if (belowMatch) filters.max_age = parseInt(belowMatch[1])

    // Countries
    const countryMap = {
        'nigeria': 'NG', 'kenya': 'KE', 'angola': 'AO',
        'benin': 'BJ', 'ghana': 'GH', 'uganda': 'UG',
        'tanzania': 'TZ', 'egypt': 'EG', 'south africa': 'ZA',
        'ethiopia': 'ET', 'cameroon': 'CM', 'senegal': 'SN',
        'mali': 'ML', 'sudan': 'SD', 'madagascar': 'MG',
        'mozambique': 'MZ', 'zambia': 'ZM', 'zimbabwe': 'ZW',
        'somalia': 'SO', 'tunisia': 'TN', 'morocco': 'MA',
        'algeria': 'DZ', 'rwanda': 'RW', 'chad': 'TD',
        'niger': 'NE', 'guinea': 'GN', 'congo': 'CG',
        'ivory coast': 'CI', 'burkina faso': 'BF',
        'united states': 'US', 'india': 'IN',
        'united kingdom': 'GB', 'france': 'FR',
        'namibia': 'NA', 'cape verde': 'CV',
        'dr congo': 'CD', 'malawi': 'MW'
    }

    for (const [country, code] of Object.entries(countryMap)) {
        if (q.includes(country)) {
            filters.country_id = code
            break
        }
    }

    return Object.keys(filters).length ? filters : null
}

module.exports = parseNaturalQuery